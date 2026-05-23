import unittest

from src.sample_action import get_sample_action_state


class SampleActionTest(unittest.TestCase):
    def test_owner_sees_enabled_action(self):
        state = get_sample_action_state("Owner", {"sample_action": True})
        self.assertTrue(state["visible"])

    def test_developer_does_not_see_action(self):
        state = get_sample_action_state("Developer", {"sample_action": True})
        self.assertFalse(state["visible"])


if __name__ == "__main__":
    unittest.main()
