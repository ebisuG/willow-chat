package api

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/redis/go-redis/v9"
)

func ReceiveMessage(w http.ResponseWriter, r *http.Request) {
	var roomId string = r.URL.Query().Get("roomId")
	log.Println("roomId : ", roomId)
	w.Header().Set("Content-Type", "application/json")
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

	//get last 10 messages in one room
	log.Println("Set : ", err)

	latestHistory, err := client.ZRevRangeByScore(ctx, roomId, &redis.ZRangeBy{Min: "-inf", Max: "+inf", Offset: 0, Count: 10}).Result()
	if err != nil {
		panic(err)
	}
	var sortedHistory []string
	for i := len(latestHistory) - 1; i > -1; i-- {
		sortedHistory = append(sortedHistory, latestHistory[i])
	}
	log.Println("Use ZrangeByScore")
	log.Println("sortedHistory is :", sortedHistory)

	response := map[string]interface{}{
		"sortedHistory": sortedHistory,
	}
	json.NewEncoder(w).Encode(response)
}
