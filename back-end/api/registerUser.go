package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/redis/go-redis/v9"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	var info UserInfo
	err := json.NewDecoder(r.Body).Decode(&info)
	if err != nil {
		panic(err)
	}
	log.Println(info.Username)
	log.Println(info.Password)

	var salt = generateRandomSalt(int(SaltSize))
	var hashedPassword = hashPassword(info.Password, salt)

	opt, err := redis.ParseURL("redis://default:@localhost:6379")
	if err != nil {
		panic(err)
	}
	client := redis.NewClient(opt)
	ctx := context.Background()
	err = client.Set(ctx, "username:"+info.Username, "password:"+hashedPassword, 0).Err()
	if err != nil {
		panic(err)
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Register successed")
}
