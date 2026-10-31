#!/bin/bash
# audio2user.sh - Quick TTS announcements to user via t2u
# Usage: ./audio2user.sh "Your message here" [app_id]

set -euo pipefail

if [ -z "${1:-}" ]; then
    echo "Usage: $0 \"message text\""
    exit 1
fi

MESSAGE_TEXT="${1}"
APP_ID_OVERRIDE="${2:-}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_CANDIDATES=(
  "${PWD}/.env"
  "${PWD}/StoryMaster26/backend/.env"
  "${SCRIPT_DIR}/.env"
  "${SCRIPT_DIR}/../.env"
  "${SCRIPT_DIR}/backend/.env"
  "${SCRIPT_DIR}/../backend/.env"
  "${SCRIPT_DIR}/StoryMaster26/backend/.env"
)

if [ -z "${T2U_APP_ID:-}" ] || [ -z "${T2U_URL:-}" ]; then
  for env_file in "${ENV_CANDIDATES[@]}"; do
    if [ -f "${env_file}" ]; then
      set -a
      # shellcheck disable=SC1090
      . "${env_file}"
      set +a
      break
    fi
  done
fi

T2U_URL="${T2U_URL:-https://t2u.mctdev.de}"
if [ -n "${APP_ID_OVERRIDE}" ]; then
    T2U_APP_ID="${APP_ID_OVERRIDE}"
fi

if [ -z "${T2U_APP_ID:-}" ]; then
    echo "T2U_APP_ID missing. Set it in a .env file or export it before calling audio2user.sh."
    exit 1
fi

curl -fsS -X POST "${T2U_URL}/api/messages" \
  -H 'Content-Type: application/json' \
  -d "{\"app_id\":\"${T2U_APP_ID}\",\"text\":\"${MESSAGE_TEXT}\"}" \
  >/dev/null 2>&1 < /dev/null &
