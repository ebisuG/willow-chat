package api

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/redis/go-redis/v9"
)

// receive request
// check new message to DB
// if there is new message,
// send it back to client
// if there is no message, send back nothing

func ReceiveMessage(w http.ResponseWriter, r *http.Request) {
	// var roomId string
	urlPath := r.URL.Path
	sliceUrl := strings.Split(urlPath, "/")
	roomId := sliceUrl[len(sliceUrl)-1:][0]
	log.Println("urlPath : ", urlPath)
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
