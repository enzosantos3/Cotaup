#!/bin/bash
set -e

PROJECT_DIR="/C/Users/CDX/Documents/Cotaup/mvp"
TARGET_DIR="$PROJECT_DIR/target"
JAR_NAME="mvp-0.0.1-SNAPSHOT.jar"

VPS_USER="root"
VPS_HOST="cotaup.com.br"
VPS_DIR="/home/cotaup/backend/"

echo "🚀 Enviando JAR para a VPS..."

cd "$TARGET_DIR"

if [ ! -f "$JAR_NAME" ]; then
  echo "❌ JAR não encontrado: $JAR_NAME"
  exit 1
fi

scp "$JAR_NAME" "$VPS_USER@$VPS_HOST:$VPS_DIR"

echo "✅ Deploy finalizado com sucesso"
