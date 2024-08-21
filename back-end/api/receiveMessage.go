package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

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

	opt, err := redis.ParseURL("redis://default:@localhost:6379")
	if err != nil {
		panic(err)
	}
	client := redis.NewClient(opt)
	ctx := context.Background()

	//get last 10 messages in one room

	result := client.Set(ctx, "foo", "sampleMessage", 0).Err()
	fmt.Println("Set : ", result)

	val2, err := client.Get(ctx, "foo").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("Simple string")
	fmt.Println("foo", val2)

	val3 := client.ZAdd(ctx, "zadd-key", redis.Z{Member: "member1", Score: 1})
	val4 := client.ZAdd(ctx, "zadd-key", redis.Z{Member: "member2", Score: 2})
	val5 := client.ZAdd(ctx, "zadd-key", redis.Z{Member: "member3", Score: 3})
	fmt.Println(val3, val4, val5)

	val6, err := client.ZRangeByScore(ctx, "zadd-key", &redis.ZRangeBy{Min: "-inf", Max: "+inf", Offset: 0, Count: 5}).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("Use ZrangeByScore")
	fmt.Println(val6)

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
