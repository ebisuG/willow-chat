package api

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

type message struct {
	From    string `json:"from"`
	Date    string `json:"date"`
	Message string `json:"message"`
	RoomId  string `json:"roomId"`
}

func (m message) MarshalBinary() ([]byte, error) {
	data, err := json.Marshal(m)
	return data, err
}

func SendeMessage(w http.ResponseWriter, r *http.Request) {
	if method := r.Method; method != "POST" {
		w.WriteHeader(405)
		fmt.Fprintf(w, "Only accept POST")
		return
	}
	var messageFromResponse message
	err := json.NewDecoder(r.Body).Decode(&messageFromResponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)

	redisUrl := os.Getenv("REDIS_URL")
	log.Println("redisUrl : ", redisUrl)

	opt, err := redis.ParseURL(redisUrl)
	if err != nil {
		panic(err)
	}
	opt.TLSConfig = &tls.Config{
		MinVersion: tls.VersionTLS12,
	}
	log.Println("opt : ", opt)
	client := redis.NewClient(opt)
	ctx := context.Background()
	log.Println("Client info : ", client.Info(ctx))
	log.Println("Connection established")
	log.Println("Request is :", messageFromResponse)

	score, err := time.Parse(time.RFC3339, messageFromResponse.Date)
	if err != nil {
		panic(err)
	}
	addData, err := messageFromResponse.MarshalBinary()
	if err != nil {
		panic(err)
	}

	err = client.ZAdd(ctx, messageFromResponse.RoomId, redis.Z{Member: addData, Score: float64(time.Time.Unix(score))}).Err()
	if err != nil {
		panic(err)
	}
	latestHistory, err := client.ZRangeByScore(ctx, messageFromResponse.RoomId, &redis.ZRangeBy{Min: "-inf", Max: "+inf", Offset: 0, Count: 10}).Result()
	if err != nil {
		panic(err)
	}
	log.Println("Use ZrangeByScore")
	log.Println("latesthistory is :", latestHistory)

	response := map[string]interface{}{
		"latestHistory": latestHistory,
	}
	json.NewEncoder(w).Encode(response)
}
