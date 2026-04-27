const SAMPLE_ACTION_ROLES = new Set(["Owner", "Maintainer"]);

export function canUseSampleAction(role) {
  return SAMPLE_ACTION_ROLES.has(role);
}

export function describeRole(role) {
  switch (role) {
    case "Owner":
      return "운영 정책과 rollback 승인까지 포함하는 최상위 권한";
    case "Maintainer":
      return "저장소 운영과 merge 관리 책임을 가진 권한";
    case "Developer":
      return "샘플 기능 구현과 MR 중심 협업 권한";
    default:
      return "열람 중심 또는 제한된 권한";
  }
}
