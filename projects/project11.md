---
id: project11
year: 2023
company: Posicube 
blog: https://world970511.github.io/blog/posts/2025-12-30-ocr-c2.html
title:
  ko: robi V 학습용 데이터 파이프라인 구축 및 관리
  en: robi V Training Data Pipeline Construction
tech:
  ko: Python, Data management, Data pipeline
  en: Python, Data management, Data pipeline
---

## 💡 Motivation

**[ko]**
2023년부터 2025년 8월까지 OCR 솔루션인 robi V의 데이터 기획부터 수집·정제·검수·전달까지 전 과정을 담당하며, 모델 성능과 직접 연결되는 데이터 품질 관리를 주요 책임으로 수행했습니다.  
또한, 오류 케이스 분석을 통한 신규 데이터 추가 및 데이터 품질 개선을 통해 데이터 품질을 지속적으로 개선하였습니다.   
2023년 초부터 퇴사 전까지 담당하며 파이프라인 및 데이터를 지속적으로 개선하였습니다.
상단 블로그 링크에서 자세한 내용 확인이 가능합니다.

**[en]**
From 2023 to August 2025, I managed the entire data lifecycle for the OCR solution 'robi V', covering data planning, collection, refinement, inspection, and delivery. My primary responsibility was data quality management, which is directly linked to model performance.  
I also continuously improved data quality by incorporating new data through error case analysis and refining existing datasets.  
You can check the details at the blog link above.


## ✨ Features

**[ko]**
- python과 머신러닝, 비동기 처리를 사용한 대용량 데이터 처리 자동화
- 모델 오탐지 분석을 통한 취약 케이스 데이터 보강 및 품질 개선

**[en]**
- Python and machine learning, asynchronous processing to automate large-scale data processing
- Data reinforcement and quality improvement through model error analysis


## 📊 Results

**[ko]**
- 분류 파이프라인 자동화: 수작업에서 자동화. ML 모델을 사용한 신분증 자동 분류 및 검수를 통해 반복 수작업 비율 90% 이상 감소
- 라벨링 데이터 검수 및 수정 자동화: 수작업에서 자동화. JSON 정합성 검사, 좌표 오류 탐지 스크립트 등을 고도화하여 데이터 오류율을 기존 약 5%에서 0.5% 미만으로 감소
- ML 기반 자동 마스킹 툴 개발: 수작업에서 자동화. 외부 라벨링 인력 및 영업용 데이터 제공을 위해 개인정보를 포함한 이미지의 특정 영역을 자동으로 마스킹하도록 구현
- OCR 엔진을 사용한 GT 자동 생성 스크립트 작성: 수작업에서 자동화. 라벨링하기 어려운 베트남어 등을 OCR 엔진을 사용하여 자동으로 GT를 생성하도록 구현
- 모델 오탐지 분석을 통한 취약 케이스 데이터 보강 및 품질 개선: 신분증 인식 정확도 개선

**[en]**
- Classification Pipeline Automation: Transitioned from manual to automated. Reduced repetitive manual work by over 90% through automated ID classification and inspection using ML models.
- Labeling Data Inspection and Correction Automation: Transitioned from manual to automated. Reduced data error rates from approximately 5% to less than 0.5% by enhancing JSON consistency checks and coordinate error detection scripts.
- ML-based Auto-Masking Tool Development: Transitioned from manual to automated. Implemented automatic masking of specific areas in images containing personal information for external labeling work and sales data provision.
- GT Auto-Generation Script using OCR Engine: Transitioned from manual to automated. Implemented automatic Ground Truth (GT) generation using OCR engines for languages difficult to label manually, such as Vietnamese.
- Data Reinforcement and Quality Improvement through Model Error Analysis: Improved ID recognition accuracy.

