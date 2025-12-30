# biz-tool-proto

Biz Tool Prototype Project.

## 開発環境立ち上げ手順

本プロジェクトでは、Docker を使用した開発環境と、ローカルマシン上での直接実行の両方をサポートしています。
推奨環境は Docker です。

### 1. Docker 環境での立ち上げ (推奨)

WSL2 (Windows) または Mac/Linux 環境での手順です。

#### 前提条件
- Docker Desktop / Docker Engine がインストールされていること
- Windows の場合、WSL2 バックエンドが有効になっていること

#### 実行手順

1. リポジトリをクローンします。
   ```bash
   git clone <repository-url>
   cd biz-tool-proto
   ```

2. コンテナをビルド・起動します。
   ```bash
   docker compose up -d --build
   ```

3. ブラウザでアクセスします。
   - http://localhost:3000

#### 終了手順
```bash
docker compose down
```

### 2. ローカル環境での立ち上げ

Docker を使用せず、ローカルマシンで直接実行する手順です。

#### 前提条件
- Node.js v20 以上
- pnpm (パッケージマネージャー)

#### 実行手順

1. リポジトリをクローンします。
   ```bash
   git clone <repository-url>
   cd biz-tool-proto
   ```

2. 依存関係をインストールします。
   ```bash
   pnpm install
   ```

3. 開発サーバーを起動します。
   ```bash
   pnpm dev
   ```

4. ブラウザでアクセスします。
   - http://localhost:3000
