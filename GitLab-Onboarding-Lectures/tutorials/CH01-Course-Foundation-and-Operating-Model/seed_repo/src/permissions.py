ALLOWED_SAMPLE_ACTION_ROLES = {"Owner", "Maintainer"}


def can_use_sample_action(role):
    return role in ALLOWED_SAMPLE_ACTION_ROLES


def describe_role(role):
    descriptions = {
        "Owner": "운영 정책과 rollback 승인까지 포함하는 최상위 권한",
        "Maintainer": "저장소 운영과 merge 관리 책임을 가진 권한",
        "Developer": "샘플 기능 구현과 MR 중심 협업 권한",
    }
    return descriptions.get(role, "열람 중심 또는 제한된 권한")
