package api

import (
	"encoding/json"
	"net/http"
)

//receive request
//check new message to DB
//if there is new message,
//send it back to client
//if there is no message, send back nothing

func ReceiveMessage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	response := map[string]interface{}{
		"status":  "success",
		"message": "Hello, world!",
	}
	json.NewEncoder(w).Encode(response)
}
