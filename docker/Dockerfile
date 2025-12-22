# /docker/Dockerfile
FROM node:20-slim
# pnpm のセットアップ
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
# 開発用ライブラリのインストール（git 等が必要な場合）
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
# ホストのファイルをコピー（初期設定用）
COPY . .
EXPOSE 3000
# 開発サーバー起動コマンド
CMD ["sh", "-c", "pnpm install && pnpm dev"]
