package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/redis/go-redis/v9"
)

func DoesUserExist(w http.ResponseWriter, r *http.Request) {
	var info UserInfo
	err := json.NewDecoder(r.Body).Decode(&info)
	if err != nil {
		panic(err)
	}
	log.Println(info.Username)

	opt, err := redis.ParseURL("redis://default:@localhost:6379")
	if err != nil {
		panic(err)
	}
	client := redis.NewClient(opt)
	ctx := context.Background()

	doesUsernameExists, err := client.Exists(ctx, "username:"+info.Username).Result()
	log.Println("username is :", info.Username)
	if err != nil {
		panic(err)
	}
	if doesUsernameExists == 1 {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode("Sorry, user already exists")
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("You can use the user name!!!")
}
