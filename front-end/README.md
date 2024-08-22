## Files

### package.json

 - vercel-build<br>
 Vercel runs this command when it builds app.

### .env.example

 - VITE_BACKEND_RECEIVE<br>
 An endpoint to receive data from Redis.

 - VITE_BACKEND_SEND<br>
 An endpoint to send data to Redis.


## Commands

Redis CLI: 
SET/GET : only takes key/value. <br>
SADD/SMEMBERS : takes key/value. but one key can have multiple values, with no order. <br>
ZADD/ZRANGE : takes key/value and score(=definition of order). one key has multiple values with order. <br>
HSET/HGET,HGETALL : takes key/field-value(=map) pairs. can get value by key+field definition, can get all field-value pairs by key.<br>

## Tech Stack - Front End

###

## Other Things


I thought using firebase, but it seems it needs to upload secret-key to github for authorization of access to firestore from vercel.
So I deceided not to use firebase because of security concern.


