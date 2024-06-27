# LikeLion12th_FE_TestServer
멋쟁이 사자처럼 12기 프론트엔드 과제 테스트용 서버

#### BASE_URL : http://yangzzago.kro.kr:3000

- 개발: @yangchef1
- 테스트: @cjy3458
- AWS 계정 제공: @gominzip

### /signup `POST`

요청 body

```json
{
  "id": "yangchef1",
  "pw": "1234",
  "name": "양셰프",
  "age": 20
}
```

응답

```json
{
  "status": 200,
  "message": "회원가입 성공"
}
```

### /login `POST`

요청 body

```json
{
  "id": "yangchef1",
  "pw": "1234"
}
```

응답

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlhbmdjaGVmMyIsIm5hbWUiOiLslpHshbDtlIQzIiwiYWdlIjoyMiwiaWF0IjoxNzE5MjgzOTU1fQ.F0JJg-eGuUu7CJW2QTF36lggjklJrM73HkZvGaZQJwI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlhbmdjaGVmMyIsImlhdCI6MTcxOTI4Mzk1NX0.Pj_-fSwd-9mIxUg2Vp2_FTddTnphtTq3Dz5--uS11ro"
}
```

응답 실패 `**400 Bad Request**`

```json
{
    "message": "회원 정보가 없습니다.",
    "error": "Bad Request",
    "statusCode": 400
}
```

### /mypage `GET`

headers.Authorization 필수

응답

```json
{
  "name": "양셰프",
  "age": 20
}
```

응답 실패 `**401 Unauthotized**`

```json
//JWT가 유효하지 않은 경우
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

### /refresh `POST`

headers.Authorization 필수

요청 body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlhbmdjaGVmMyIsImlhdCI6MTcxOTI4Mzk1NX0.Pj_-fSwd-9mIxUg2Vp2_FTddTnphtTq3Dz5--uS11ro"
}
```

응답

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlhbmdjaGVmMyIsIm5hbWUiOiLslpHshbDtlIQzIiwiYWdlIjoyMiwiaWF0IjoxNzE5MjgzOTU1fQ.F0JJg-eGuUu7CJW2QTF36lggjklJrM73HkZvGaZQJwI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlhbmdjaGVmMyIsImlhdCI6MTcxOTI4Mzk1NX0.Pj_-fSwd-9mIxUg2Vp2_FTddTnphtTq3Dz5--uS11ro"
}
```

응답 실패 `**401 Unauthorized**`

```json
{
    "message": "유효하지 않은 refresh token입니다.",
    "error": "Unauthorized",
    "statusCode": 401
}
```
