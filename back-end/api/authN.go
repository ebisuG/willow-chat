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

func Authentication(w http.ResponseWriter, r *http.Request) {
	//get user info
	//check user info with db
	//if user is registered, issue token and register expiration date
	//return token
	var username string = r.Body

	// var roomId string
	// urlPath := r.URL
	// sliceUrl := strings.Split(urlPath, "/")
	var roomId string = r.URL.Query().Get("roomId")
	// log.Println("urlPath : ", urlPath)
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

	latestHistory, err := client.ZRangeByScore(ctx, roomId, &redis.ZRangeBy{Min: "-inf", Max: "+inf", Offset: 0, Count: 10}).Result()
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
