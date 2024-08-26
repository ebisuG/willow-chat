package api

import (
	"crypto/rand"
	"crypto/sha512"
	"encoding/hex"
	"log"
)

type UserInfo struct {
	Username string
	Password string
}

const SaltSize int16 = 16

func generateRandomSalt(saltSize int) []byte {
	var salt = make([]byte, saltSize)
	_, err := rand.Read(salt[:])

	if err != nil {
		panic(err)
	}
	log.Println("salt is :", salt)
	return salt
}

func hashPassword(password string, salt []byte) string {
	var passwordBytes = []byte(password)
	var sha512Hasher = sha512.New()
	var passwordAndSalt = append(passwordBytes, salt...)
	sha512Hasher.Write(passwordAndSalt)
	var hashedPassword = sha512Hasher.Sum(nil)
	log.Println("hashedPassword is :", hashedPassword)
	var hashedPasswordHex = hex.EncodeToString(hashedPassword)
	log.Println("hashedPasswordHex is :", hashedPasswordHex)
	return hashedPasswordHex
}

func doPasswordsMatch(hashedPassword, currentPassword string, salt []byte) bool {
	var currentPasswordHash = hashPassword(currentPassword, salt)
	return hashedPassword == currentPasswordHash
}
