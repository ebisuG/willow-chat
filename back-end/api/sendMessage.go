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

// Check roomid
// insert message to room with roomId
type message struct {
	from    string
	date    string
	message string
	roomId  string
}

func SendeMessage(w http.ResponseWriter, r *http.Request) {
	// var roomId string
	if method := r.Method; method != "POST" {
		w.WriteHeader(405)
		fmt.Fprintf(w, "Only accept POST")
		return
	}
	var messageFromResponse *message
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

	//add client message to redis
	score, err := time.Parse("2006-01-02T15:04:05-0700", messageFromResponse.date)
	if err != nil {
		panic(err)
	}
	// err = json.Unmarshal(messageFromResponse).Encode(messageToRedis)
	// err = json.NewEncoder(messageFromResponse).Encode(messageToRedis)
	err = client.ZAdd(ctx, messageFromResponse.roomId, redis.Z{Member: messageFromResponse, Score: float64(time.Time.Unix(score))}).Err()
	if err != nil {
		panic(err)
	}
	latestHistory, err := client.ZRangeByScore(ctx, "zadd-key", &redis.ZRangeBy{Min: "-inf", Max: "+inf", Offset: 0, Count: 10}).Result()
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
