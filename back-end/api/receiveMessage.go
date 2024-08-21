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

//receive request
//check new message to DB
//if there is new message,
//send it back to client
//if there is no message, send back nothing

func ReceiveMessage(w http.ResponseWriter, r *http.Request) {
	// var roomId string

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

	err = client.Set(ctx, "foo", "sampleMessage", 0).Err()
	if err != nil {
		panic(err)
	}

	log.Println("Set : ", err)

	val2, err := client.Get(ctx, "foo").Result()
	if err != nil {
		panic(err)
	}
	log.Println("Simple string")
	log.Println("foo", val2)

	err = client.ZAdd(ctx, "zadd-key", redis.Z{Member: "member1", Score: 1}).Err()
	if err != nil {
		panic(err)
	}
	log.Println(err)
	err = client.ZAdd(ctx, "zadd-key", redis.Z{Member: "member2", Score: 2}).Err()
	if err != nil {
		panic(err)
	}
	log.Println(err)
	err = client.ZAdd(ctx, "zadd-key", redis.Z{Member: "member3", Score: 3}).Err()
	if err != nil {
		panic(err)
	}
	log.Println(err)
	log.Println(err)

	val6, err := client.ZRangeByScore(ctx, "zadd-key", &redis.ZRangeBy{Min: "-inf", Max: "+inf", Offset: 0, Count: 5}).Result()
	if err != nil {
		panic(err)
	}
	log.Println("Use ZrangeByScore")
	log.Println(val6)

	// val, err := client.ZRangeByScore(ctx, roomId, &redis.ZRangeBy{Offset: 10, Count: 5}).Result()
	// if err != nil {
	// 	panic(err)
	// }

	response := map[string]interface{}{
		"username":            "sample",
		"message":             "Hello, world!",
		"redisResultByGet":    val2,
		"redisResultByZrange": val6,
	}
	json.NewEncoder(w).Encode(response)
}
