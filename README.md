# stock_server

## 프로젝트 개요

`stock_server`는 주식 데이터의 수집, 머신러닝 모델 학습 및 저장, 그리고 API를 통한 데이터 및 예측 결과 제공을 목표로 하는 프로젝트입니다.  
Nuxt 기반의 서버 환경에서 데이터 파이프라인과 다양한 기능을 제공합니다.

### 주요 기능
- 주식 데이터 자동 수집 및 저장
- 머신러닝 모델 학습 및 예측 결과 제공
- RESTful API 제공
- 향후 웹 프론트엔드 및 대시보드 연동 예정

## 폴더/파일 구조

> 아래 구조는 대표적인 예시이며, 최신 구조는 [GitHub 저장소](https://github.com/inpiniti/stock_server)에서 확인하세요.

```
stock_server/
├── api/                # API 라우터 및 핸들러
├── components/         # Nuxt 컴포넌트
├── server/             # 서버 관련 코드 (예: 데이터 수집, DB 연동)
├── models/             # 머신러닝 모델, 데이터 모델 등
├── utils/              # 유틸리티 함수
├── package.json
├── nuxt.config.ts
└── README.md
```

## API 엔드포인트 예시

| 메서드 | 엔드포인트         | 설명                  |
|--------|-------------------|---------------------|
| GET    | /api/stocks       | 주식 데이터 조회        |
| POST   | /api/train        | 모델 학습 트리거         |
| GET    | /api/predict      | 모델 예측 결과 반환       |

> 실제 엔드포인트는 코드 및 라우터 구현에 따라 다를 수 있으며, 상세 구현은 `/api` 폴더 내에서 확인하세요.

### 데이터 흐름
1. **데이터 수집**: 외부 API 또는 크롤러를 통해 주식 데이터를 수집합니다.
2. **DB 저장**: 수집된 데이터를 PostgreSQL 등 데이터베이스에 저장합니다.
3. **모델 학습**: 저장된 데이터를 기반으로 머신러닝 모델을 학습합니다.
4. **API 제공**: 학습된 모델을 통해 예측 결과 및 데이터 조회 API를 제공합니다.

## 실행 방법

### 1. 프로젝트 초기화 및 패키지 설치

```bash
npx nuxi@latest init stock_server
npm i drizzle-orm postgres
npm i -D drizzle-kit
npm install --save-dev nuxt-scheduler
npm i @tensorflow/tfjs
```

### 2. 환경 변수 및 설정

- 환경 변수 및 DB 연결 설정은 `nuxt.config.ts` 또는 `.env` 파일을 참고하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. API 테스트

- Postman, curl 등으로 위 예시 엔드포인트를 호출해 테스트할 수 있습니다.

## 참고

- 최신 커밋 및 전체 코드: [inpiniti/stock_server GitHub](https://github.com/inpiniti/stock_server)
- 문의 및 기여: [Issues](https://github.com/inpiniti/stock_server/issues)에 남겨주세요.
