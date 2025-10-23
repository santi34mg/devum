#!/usr/bin/env bash

set -euo pipefail

if [ -f .env ]; then
  # export lines like KEY=VALUE (ignores comments). Be careful with complex values.
  export $(grep -v '^\s*#' .env | xargs)
fi

project_id="${SUPABASE_PROJECT_ID:-${PROJECT_ID:-${SUPABASE_REF:-${PROJECT_REF:-}}}}"

if [ -z "$project_id" ]; then
  echo "ERROR: SUPABASE_PROJECT_ID or PROJECT_ID (or SUPABASE_REF/PROJECT_REF) not set in .env" >&2
  exit 1
fi

mkdir -p src/types
npx supabase gen types typescript --project-id "$project_id" --schema public > src/types/supabase.ts
echo "Generated src/types/supabase.ts"