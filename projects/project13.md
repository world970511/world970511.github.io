---
id: project13
year: 2026
github: https://github.com/world970511/DataBridge_V0
title:
  ko: "DataBridge — AI 기반 데이터 관리 플랫폼"
  en: "DataBridge — AI-Powered Data Management Platform"
tech:
  ko: Python, Streamlit, PostgreSQL, ChromaDB, Ollama, LangChain, LangGraph, PyTorch, DINOv2, watchdog, Docker
  en: Python, Streamlit, PostgreSQL, ChromaDB, Ollama, LangChain, LangGraph, PyTorch, DINOv2, watchdog, Docker
---

## 💡 Motivation

**[ko]**
AI의 발전으로 데이터 수집·관리의 필요성은 커졌지만, 대부분의 솔루션이 수천만~억 단위 빅데이터를 전제로 설계되어 있습니다. 하지만 현실에서는 전담 데이터 엔지니어 없이 공유 폴더와 엑셀로 데이터를 관리하는 조직이 훨씬 많고, 아직까지도 보안을 위해 AI를 활용하지 못하는 회사가 많은 상황입니다.  
빅데이터는 아니지만 사람이 수작업으로 다루기엔 이미 벅찬 규모의 데이터를, 자연어 AI로 쉽게 관리할 수 있으면 좋겠다는 생각에서 출발했습니다. 특히 폐쇄망·온프레미스 환경에서도 사용할 수 있도록 Ollama 기반 로컬 LLM을 기본으로 지원합니다.

**[en]**
As AI advances, the need for data collection and management has grown, but most solutions are designed for massive-scale big data. In reality, many organizations manage data with shared folders and spreadsheets without dedicated data engineers, and many companies still cannot leverage AI due to security concerns.
This project was born from the idea that data too large for manual handling—but not quite "big data"—should be manageable through natural language AI. It supports Ollama-based local LLMs by default, enabling use in air-gapped and on-premises environments.

## ✨ Features

**[ko]**
- 자동 파일 감시: 공유 폴더에 파일을 넣으면 watchdog이 자동 분류하여 DB 적재, 문서 검색 등록, 이미지 AI 분석까지 수행
- AI 자연어 조회: 채팅으로 데이터 조회(SQL 자동 생성), 문서 검색(RAG), 이미지 유사 검색, 복합 질의를 처리하는 멀티 에이전트 시스템
- 이미지 AI 분석: DINOv2 임베딩 기반 유사 이미지 검색, 자동 그룹핑, 중복 탐지, EXIF 메타데이터 추출
- 데이터 마트 구축: 자연어로 분석용 테이블 생성 요청 → LLM이 SQL 생성 → 관리자 승인 후 실행
- 배치 작업 관리: 크론 기반 반복 SQL 작업 등록·스케줄링·실행 이력 관리
- 삭제 승인 시스템: 데이터 삭제 시 관리자 승인 필수 (Human-in-the-Loop)
- 알림 시스템: 파일 처리, 마트 생성, 승인 요청 등 이벤트 발생 시 Webhook/Slack/Teams 알림
- 멀티 LLM 지원: Ollama(폐쇄망) + OpenAI, Anthropic, HuggingFace(상용) 동시 지원

**[en]**
- Auto file watch: Files dropped in shared folders are automatically classified by watchdog — loaded into DB, registered for document search, or analyzed by image AI
- AI natural language queries: Multi-agent system handling data queries (auto SQL generation), document search (RAG), image similarity search, and composite queries via chat
- Image AI analysis: DINOv2 embedding-based similar image search, auto clustering, duplicate detection, EXIF metadata extraction
- Data mart builder: Request analytical tables in natural language → LLM generates SQL → admin approval before execution
- Batch job management: Cron-based recurring SQL job registration, scheduling, and execution history tracking
- Delete approval system: Admin approval required for data deletion (Human-in-the-Loop)
- Notification system: Webhook/Slack/Teams alerts for events like file processing, mart creation, and approval requests
- Multi-LLM support: Simultaneous support for Ollama (air-gapped) + OpenAI, Anthropic, HuggingFace (commercial)

## 📊 Results

**[ko]**
- Excel, CSV, PDF, HWP, 이미지 등 15종 이상 파일 형식 자동 분류 및 적재
- 자연어 질의로 SQL 작성 없이 데이터 조회·분석 가능
- DINOv2 기반 이미지 유사도 검색 및 중복 탐지 파이프라인 구현
- 승인 레이어를 통한 안전한 데이터 변경 (SELECT만 자동 실행, 나머지는 승인 필요)
- Docker Compose로 서버 1대에 전체 시스템 구동 가능

**[en]**
- Automatic classification and ingestion of 15+ file formats including Excel, CSV, PDF, HWP, and images
- Data querying and analysis through natural language without writing SQL
- Image similarity search and duplicate detection pipeline using DINOv2 embeddings
- Safe data modification through approval layer (only SELECT runs automatically; all others require approval)
- Entire system deployable on a single server via Docker Compose
