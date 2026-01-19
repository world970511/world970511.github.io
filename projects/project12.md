---
id: project12
year: 2026
github: https://github.com/world970511/ai-image-filter
title:
  ko: AI 이미지 필터
  en: AI Image Filter
tech:
  ko: python, huggingface, streamlit, fastAPI, DinoV2
  en: python, huggingface, streamlit, fastAPI, DinoV2
---

## 💡 Motivation

**[ko]**
ai로 생성된 이미지의 경우 일반 디지털 사진에 있는 카메라 모델, 렌즈 유형, 셔터 속도, GPS 위치 정보 등 EXIF 데이터가 존재하지 않는다는 부분과 Provenance Detection for AI-Generated Images: Combining Perceptual Hashing, Homomorphic Encryption, and AI Detection Models에 제시된 내용을 바탕으로 현재 해시 - 메타데이터 - 오픈소스 탐지 모델 이렇게 3Layer를 사용하여 이미지 데이터의 오염을 예방하는 것이 가능한지 테스트해보기 위해 진행하였습니다.  
[huggingface](https://huggingface.co/spaces/nepark/ai-image-filter)에서 테스트해볼 수 있습니다.  

**[en]**
This project was conducted to test the feasibility of preventing image data contamination using a 3-layer system—hashing, metadata, and open-source detection models. This approach is based on the absence of EXIF data (camera model, lens type, shutter speed, GPS, etc.) in AI-generated images compared to standard digital photos, as well as the research presented in "Provenance Detection for AI-Generated Images: Combining Perceptual Hashing, Homomorphic Encryption, and AI Detection Models.    
You can test it at [huggingface](https://huggingface.co/spaces/nepark/ai-image-filter).

## ✨ Features

**[ko]**
- 빠른 분석: 단일 이미지 최소 1분 내 분석 완료
- 배치 처리: 최대 50개 이미지 동시 분석
- 상세 리포트: 각 Layer별 분석 결과 및 판정 근거 제공

**[en]**
- Fast analysis: Single image analysis completed in 1 minute
- Batch processing: Maximum of 50 images processed simultaneously
- Detailed report: Analysis results and justification for each layer

## 📊 Results

**[ko]**
- 허깅스페이스에서 배치/단일 처리 테스트 가능
- 성능 관련 테스트 진행.[Blog](https://world970511.github.io/blog/posts/2026-01-19-3-layers-image-filter.html)에서 확인가능

**[en]**
- Batch and single processing testing is possible on Huggingface
- Performance related tests are being conducted. [Blog](https://world970511.github.io/blog/posts/2026-01-19-3-layers-image-filter.html) for more details

