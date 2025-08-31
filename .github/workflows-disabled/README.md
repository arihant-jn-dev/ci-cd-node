# Disabled Workflows

This directory contains GitHub Actions workflows that are intentionally disabled.

## Files in this directory:

- `ci-cd-fail.yml` - Demo workflow with failing tests for educational purposes

## To re-enable a workflow:
Move the `.yml` file back to the `.github/workflows/` directory:

```bash
mv .github/workflows-disabled/ci-cd-fail.yml .github/workflows/
```

## Why disable workflows?
- Keep demo/example workflows for reference without running them
- Temporarily disable workflows during development
- Archive old workflow versions
