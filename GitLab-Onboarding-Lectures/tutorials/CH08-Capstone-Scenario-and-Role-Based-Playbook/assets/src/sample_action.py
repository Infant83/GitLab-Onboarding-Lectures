from src.permissions import can_use_sample_action


def get_sample_action_state(role, feature_flags):
    feature_enabled = feature_flags.get("sample_action", False)
    has_role_access = can_use_sample_action(role)

    return {
        "role": role,
        "feature_enabled": feature_enabled,
        "has_role_access": has_role_access,
        "visible": feature_enabled and has_role_access,
    }
