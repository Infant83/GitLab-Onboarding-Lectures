import unittest

from src.permissions import can_use_sample_action


class RoleVisibilityTest(unittest.TestCase):
    def test_developer_does_not_see_sample_action(self):
        self.assertFalse(can_use_sample_action("Developer"))


if __name__ == "__main__":
    unittest.main()
