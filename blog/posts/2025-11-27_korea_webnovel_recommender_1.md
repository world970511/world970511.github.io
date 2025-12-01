---
title: "RAG를 활용한 웹소설 추천 시스템 구현하기(1)"
category: "project"
tags: ["Recommendations", "LLM", "RAG"]
excerpt: "개인 프로젝트 기록: fastAPI + Streamlit + langchain 활용기"
readTime: 5
---

# RAG를 활용한 웹소설 추천 시스템 구현하기(1) 

나는 웹 소설을 굉장히 좋아한다. 한달에 10만원 정도는 꾸준히 소설 사 보는데 쓰는 것 같다.  
그러다보니 어떻게 하면 돈을 괜찮은(=돈 써도 아깝지 않은)소설에 쓰는것에 신경쓰게 되었고(아무래도 한번에 10000~50000원씩 쓰다보니), 입소문부터 플랫폼 추천까지 다 써보다가 추천시스템에 관심을 갖게 되었다.  

현재 많이 알려진 추천 시스템은 2가지인데  
하나는 **협업 필터링 추천 시스템(Collaborative Filtering Recommender System (CF))**,  
다른 하나는 **콘텐츠 기반 추천 시스템(Content-Based Recommender System (CB))** 이다.  
그런데 사실 둘다 단점이 있어서(CF: 콜드 스타트(신규 사용자나 신규 상품처럼 충분한 데이터가 없는 경우, 시스템이 적절한 추천을 하지 못하는 현상)/ CB: 다양성을 보장하지 못함)  
요즘에는 이러한 단점들을 보완하기 위해 요즘에는 둘을 결합한 하이브리드 필터링을 사용한다.  

하지만 솔직히 결과가 마음에 든 적이 별로 없다...  
다른 사용자들이 읽었다고 해서 내가 그 소설을 즐겁게 읽을지 아닐지는 모를 일이고, 비슷한 장르라고 해서 내가 좋아할지 아닐지는 읽어보지 않고서야 알 수 없는 부분들이다.  
그래서 매번 '아 그냥 내가 뭐 보고 싶은지 치면 비슷한 내용들 있는 소설 추천해주면 좋겠다~' 하고 바라고 있었는데 해외 블로그에 [RAG를 활용한 도서 추천 시스템](https://jchiang1225.medium.com/book-recommendation-with-retrieval-augmented-generation-part-i-d1b415aff558) 을 보고 한번 구현해보기로 했다.

## ❓ 추천 시스템 구조는? 
참고한 블로그에 따르면 전체 아키텍트는 밑과 같은 구조를 가지고 있다.
```
    [사용자 쿼리] → [임베딩 변환] → [벡터 스토어 검색] → [유사 도서 검색] → [LLM 추천 생성]
```
쉽게 설명해보자면, 
1) 사용자가 좋아하는 책이나 원하는 내용을 입력
2) 해당 쿼리를 임베딩으로 변환 후 벡터 스토어에서 유사도 점수가 높은 도서들을 검색
3) LLM을 활용하여 유사한 도서들을 추천

이런 식으로 추천이 진행되고, 개인적인 이해로는 기존의 콘텐츠 기반 필터링에 백터 임베딩을 결합한 구조로 보면 될 것 같다.  
뭔 차이냐 라고 한다면...  

기존 방식
```
    "마법사 소년의 모험" → "마법", "소년", "모험" 키워드 매칭
```
벡터 방식
```
    "마법사 소년의 모험" → [0.23, -0.45, 0.12, ...] 벡터 변환
                     → 벡터 공간에서 가까운 책 검색
```
그러니까 이전에는 키워드(=단어) 매칭으로 추천을 해줬고, 지금 활용하려는 건 비슷한 의미/맥락을 가졌느냐 여부로 추천이 가능하다는 것?

## 💡 프로젝트 구조
일단 api 명세서와 사용할 기술 스택들을 정리한 후 claude 코드를 사용해서 프로젝트 구조를 잡았다.
작성한 api명세서는 밑과 같다
 <details>
 <summary>웹소설 추천 시스템 API 문서</summary>
    Base URL: https://api.webnovel-recommend.com/v1  
    인증: 현재 버전은 인증 없음  
    응답 형식: JSON  

    API 엔드포인트
    1. 소설 검색 (자연어 기반)
    POST /novels/search
    사용자가 입력한 자연어 설명을 기반으로 유사한 소설을 추천합니다.

    요청
    ```json
        {
        "query": "string (최대 140자)",
        "limit": "integer (기본값: 10, 최대: 50)"
        }
    ```

    응답
    ```json
        {
        "status": "success",
        "data": {
            "query": "주인공이 회귀해서 복수하는 스토리",
            "results": [
            {
                "id": 1,
                "title": "회귀자의 복수극",
                "author": "작가명",
                "description": "10년 전으로 돌아간 주인공이...",
                "platform": "카카오페이지",
                "url": "https://...",
                "similarity_score": 0.92,
                "keywords": ["회귀", "복수", "판타지"]
            }
            ],
            "total_results": 10,
            "search_id": "uuid"
            }
        }
    ```

    2. 소설 상세 정보 조회
    GET /novels/{novel_id}
    특정 소설의 상세 정보를 조회합니다.

    응답
    ```json
        {
        "status": "success",
        "data": {
            "id": 1,
            "title": "회귀자의 복수극",
            "author": "작가명",
            "description": "전체 줄거리...",
            "platform": "카카오페이지",
            "url": "https://...",
            "keywords": ["회귀", "복수", "판타지"],
            "created_at": "2024-01-01T00:00:00Z",
            "updated_at": "2024-01-01T00:00:00Z"
            }
        }
    ```

    3 검색 기록 저장
    POST /search-logs
    검색 기록을 저장합니다 (내부적으로 자동 호출).

    요청
    ```json
        {
        "query": "string",
        "results_count": "integer"
        }
    ```

    에러 응답 형식
    ```json
        {
        "status": "error",
        "error": {
            "code": "ERROR_CODE",
            "message": "에러 메시지",
            "details": {}
            }
        }
    ```

    에러 코드
    INVALID_QUERY: 쿼리가 비어있거나 140자를 초과
    NOT_FOUND: 요청한 리소스를 찾을 수 없음
    SERVER_ERROR: 서버 내부 오류
    RATE_LIMIT: API 요청 한도 초과

    구현 고려사항
    임베딩 처리: 검색 쿼리는 서버에서 임베딩으로 변환 후 PGVector에서 유사도 검색
 </details>

이를 claude 코드를 사용해서 프로젝트 구조를 밑과 같이 잡았다.  
 ```
    korea_webnovel_recommender/
    ├── backend/                # FastAPI 백엔드
    │   ├── app/
    │   │   ├── main.py        # FastAPI 앱 진입점
    │   │   ├── config.py      # 설정 관리
    │   │   ├── models.py      # Pydantic 모델
    │   │   ├── api/
    │   │   │   └── routes.py  # API 라우트
    │   │   └── services/
    │   │       ├── embedding.py   # 임베딩 서비스
    │   │       └── vector_db.py   # PostgreSQL + PGVector 서비스
    │   ├── init_db.py         # DB 초기화 스크립트
    │   └── requirements.txt
    ├── frontend/              # Streamlit 프론트엔드
    │   ├── app.py            # Streamlit 앱
    │   └── requirements.txt
    ├── data/
    │   └── sample_novels.json # 샘플 웹소설 데이터
    ├── docker-compose.yml     # PostgreSQL + PGVector Docker 설정
    ├── .env.example          # 환경 변수 템플릿
    ├── .gitignore
    ├── setup.sh              # 설치 스크립트
    ├── run_backend.sh        # 백엔드 실행 스크립트
    ├── run_frontend.sh       # 프론트엔드 실행 스크립트
    └── readme.md
 ```
사용한 웹 기술 스택은 FastAPI + Streamlit 으로 평소 사용하던 django는 admin 페이지가 필요한 서비스가 아니다 + 너무 무겁다 라는 판단 하에 FastAPI + Streamlit 으로 구현하였다.   
Streamlit은 이전부터 써 보고 싶었던 거기도 하고 굳이 react를 사용해야 할까 란 생각도 있어서 Streamlit을 선택했다.  
현재는 웹 페이지 작동하는 것을 확인 후 데이터 수집/전처리 자동화 쪽을 건드리고 있는데 이게 더 골 아프다.....










