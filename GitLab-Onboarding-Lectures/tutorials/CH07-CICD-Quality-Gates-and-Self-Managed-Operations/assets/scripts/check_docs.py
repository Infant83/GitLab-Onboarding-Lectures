from pathlib import Path


required = [
    Path("README.md"),
    Path("docs/process.md"),
    Path("docs/feature-flags.md"),
    Path("public/index.html"),
]

missing = [str(path) for path in required if not path.exists()]
if missing:
    raise SystemExit(f"missing required files: {', '.join(missing)}")

print("docs check passed")
