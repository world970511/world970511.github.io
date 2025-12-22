---
id: project7
github: https://github.com/world970511/korea_webnovel_recommender
title:
  ko: AI 웹소설 추천 시스템
  en: AI Web Novel Recommendation System
tech:
  ko: FastAPI, Python, Streamlit, PostgreSQL, PGVector, RAG, Podman
  en: FastAPI, Python, Streamlit, PostgreSQL, PGVector, RAG, Podman
---

## 💡 Motivation

**[ko]**
현재 웹소설 플랫폼에서 사용되는 추천 알고리즘/ 검색 시스템에 대해 원하는 내용의 소설을 찾기 힘들다는 불만이 있어 이를 RAG를 사용하면 개선할 수 있을 것 같아 시작했습니다.  
[RAG를 활용한 도서 추천 시스템](https://jchiang1225.medium.com/book-recommendation-with-retrieval-augmented-generation-part-i-d1b415aff558)을 참고하여 이를 실제 서비스로 적용해보고자 하였습니다.  
블로그에 관련 내용을 진행하면서 배운 점과 내용을 같이 정리했습니다.

**[en]**
I started this project to address the frustration of finding the desired content on current web novel platforms. I decided to apply RAG (Retrieval-Augmented Generation) to improve the recommendation and search systems. I also included my learnings and insights from the blog post.

## ✨ Features

**[ko]**
- RAG (Retrieval-Augmented Generation) 기반 추천
- PGVector를 활용한 벡터 유사도 검색
- FastAPI 백엔드 + Streamlit 프론트엔드
- PostgreSQL 데이터베이스 연동

**[en]**
- RAG-based recommendation
- Vector similarity search using PGVector
- FastAPI backend + Streamlit frontend
- PostgreSQL database integration

## 📊 Results

**[ko]**
- End-to-End 파이프라인 구현
- 실시간 자연어 쿼리 처리

**[en]**
- Implemented End-to-End pipeline
- Real-time natural language query processing
