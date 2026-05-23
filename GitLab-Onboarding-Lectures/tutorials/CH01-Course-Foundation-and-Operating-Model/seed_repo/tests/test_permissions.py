import unittest

from src.permissions import can_use_sample_action, describe_role


class PermissionTest(unittest.TestCase):
    def test_owner_and_maintainer_allowed(self):
        self.assertTrue(can_use_sample_action("Owner"))
        self.assertTrue(can_use_sample_action("Maintainer"))

    def test_developer_and_guest_blocked(self):
        self.assertFalse(can_use_sample_action("Developer"))
        self.assertFalse(can_use_sample_action("Guest"))

    def test_role_description_is_plain_text(self):
        self.assertIn("merge", describe_role("Maintainer"))


if __name__ == "__main__":
    unittest.main()
