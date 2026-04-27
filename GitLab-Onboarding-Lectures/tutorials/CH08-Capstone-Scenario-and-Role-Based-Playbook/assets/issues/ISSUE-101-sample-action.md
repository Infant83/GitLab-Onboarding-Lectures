# ISSUE-101 Sample Action Visibility

## Background

실습용 저장소에서 역할별 샘플 동작 버튼 노출 여부를 명확히 확인하고 싶다.

## Requirements

- `Owner`, `Maintainer`에게만 샘플 동작을 노출한다.
- `Developer`, `Guest`는 버튼을 보지 못해야 한다.
- feature flag로 기능 on/off가 가능해야 한다.
- 테스트와 MR evidence가 함께 제출되어야 한다.

## Excluded

- 실제 업무 기능 구현
- 외부 API 연동

## Rollback Trigger

- 권한 없는 역할에 샘플 동작 노출이 확인될 때
- pipeline은 성공했지만 운영 정책과 다른 동작이 확인될 때
