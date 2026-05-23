from pathlib import Path


process_doc = Path("docs/process.md").read_text(encoding="utf-8")
feature_doc = Path("docs/feature-flags.md").read_text(encoding="utf-8")

if "1." not in process_doc or "4." not in process_doc:
    raise SystemExit("process steps must keep numbered structure")

if "sample_action" not in feature_doc:
    raise SystemExit("feature flag document must mention sample_action")

print("smoke check passed")
