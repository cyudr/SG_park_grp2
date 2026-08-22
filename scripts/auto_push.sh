#!/bin/bash
# Auto git push script for SG Park Weather App

# Check if there are changes to commit
if [[ -n $(git status --porcelain) ]]; then
  echo "Changes detected. Staging, committing and pushing..."
  git add -A
  COMMIT_MSG="Auto-update: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
  git commit -m "$COMMIT_MSG"
else
  echo "Working tree clean, syncing to remote..."
  git push origin main
fi
