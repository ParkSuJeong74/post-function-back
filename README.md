<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# 게시판 서비스 프로젝트 📋

게시판 잠금과 업로드 당시 날씨 제공 등의 기능을 가진 게시판 서비스

> 배포 도메인: 준비 중입니다.

## 1. 프로젝트 소개

### 1-1) 요구사항 분석

사용자는 게시글을 올릴 수 있다.

게시글을 올릴때 비밀번호를 설정하고 이후 비밀번호가 일치하는 경우만 수정, 삭제를 할 수 있다.

한 페이지 내에서 모든 게시글을 최신 글 순서로 확인한다.

게시글 개수가 많을 때 스크롤을 내릴때마다 계속 로드된다.

외부 API를 활용하여 날씨가 게시글에 포함된다.

### 1-2) 개발 과정

- Modeling으로 User와 Posts Entity를 생성하였습니다. (아래 ERD를 먼저 설계)

- 사용자를 생성하는 API를 만드는 것으로 시작하였습니다. 간단하게 name만을 이용하여 만들었습니다.

- 게시글의 제목과 본문 모두 `이모지`가 포함되게 하기 위해, DB를 docker compose로 실행시키며 `utf8mb4`로 인코딩하는 옵션을 주었습니다.

![image](https://user-images.githubusercontent.com/71163016/188588374-f0a73a74-ce59-4f9e-920b-9204e464d99e.png)

(실제 게시글 생성시 이모지가 삽입되는 것을 확인할 수 있습니다.)

업로드 당시의 날씨를 https://www.weatherapi.com 를 사용하여 함께 저장합니다. 위에서는 Partly cloudy입니다.

- 게시글을 올릴 때 비밀번호를 설정합니다. bcrypt를 사용하여 비밀번호를 암호화하여 데이터베이스에 저장합니다.

- 게시글을 수정/삭제할 때는 비밀번호를 확인합니다. 비밀번호가 틀리다면 403 error를 반환합니다.

- 게시글을 조회할 때는 모든 게시글을 최신 글 순서로 확인합니다. createdAt을 내림차순으로 정렬하여 나타내며, page를 입력받아 api를 호출할때 페이지를 쿼리로 받을 수 있습니다.

### 1-3) 관련 문서

- API Docs (swagger)

👉 https://app.swaggerhub.com/apis-docs/ParkSuJeong74/post-service-back/1.0.0

- ERD

![thingsflow (2)](https://user-images.githubusercontent.com/71163016/188589260-4d3a5461-c5bd-48f0-a0af-e39780d786e6.png)

## 2. 사용된 기술스택

| 파트   | 기술                                                      |
| ------ | --------------------------------------------------------- |
| **BE** | Nest.js, MySQL, Prisma, GCP Compute Engine, swagger, Jest |

## 3. 서비스 실행 방법

레포지토리를 clone 받아야합니다!

```shell
$ git clone
$ cd
```

@ParkSuJeong 에게 `*.env`를 요청해주세요!

```shell
$ cd back
$ npm install
$ npm run start:dev
```

## 버전

- version 1.0.0

## FAQ

- 자주 받는 질문 정리

## License

Nest is [MIT licensed](LICENSE).
