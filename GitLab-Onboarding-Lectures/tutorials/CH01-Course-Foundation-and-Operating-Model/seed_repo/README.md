# Tutorial Collaboration Lab

특정 업무 도메인 없이 Git / GitLab 협업을 실습하기 위한 교육용 저장소다. 목적은 완성된 제품이 아니라 협업, review, approval, conflict, rollback, pipeline을 실습하기 쉬운 기준점을 만드는 것이다.

## 현재 범위

- 간단한 역할 기반 sample action visibility 규칙
- 공용 절차 문서
- 최소 테스트
- 이후 챕터에서 확장될 build / CI / capstone 기반

## 기본 역할 규칙

- `Owner`: 운영 최종 승인
- `Maintainer`: 저장소 운영과 merge 관리
- `Developer`: feature branch 작업과 MR 생성
- `Guest`: 열람 중심

## 빠른 점검

```bash
git status
git branch -vv
node --test
```
