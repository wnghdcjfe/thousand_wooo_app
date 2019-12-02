# Things to do at the start
## Install dependencies
`npm install`

## Create DB
1)  mongo shell을 구동합니다.
2)  memo데이타베이스로 이동 `use memo` 
3)  데이터베이스 확인 : `show dbs` 아직 memo가 생성되지 않았습니다.
4)  데이타베이스 생성 : `db.memo.insert({"kundol" : 1})`
5)  데이터베이스 확인 : `show dbs` memo DB가 생성되었습니다! 

## Create User
```js
db.createUser({  
 user:"dabin",
 pwd:"dabin12010",
 roles:["readWrite"],
 mechanisms:[  
  "SCRAM-SHA-1"
 ]
})
```

## 사용된 HTTP Status Code
 - 400 Bad Request(잘못된 요청)
 - 401 허가되지 않음
 - 403 forbidden(서버가 요청을 거부)
 - 404 요청한 페이지를 찾을 수 음슴
 - 409 Conflict : 사용자가 다시 요청을 보내야 할 때, 아이디 중복입력