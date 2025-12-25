# **フロントエンド開発ガイドライン**

## **1\. 開発環境構成 (WSL2 \+ Docker)**

WSL2 環境下でのファイルシステム同期パフォーマンスと、ホットリロード（HMR）の安定性を重視した構成です。

### **1.1. Dockerfile**

node:20-slim をベースとし、パッケージマネージャーとして pnpm を使用します。

Dockerfile

\# /docker/Dockerfile  
FROM node:20\-slim  
\# pnpm のセットアップ  
ENV PNPM_HOME="/pnpm"  
ENV PATH="$PNPM\_HOME:$PATH"  
RUN corepack enable  
WORKDIR /app  
\# 開発用ライブラリのインストール（git 等が必要な場合）  
RUN apt-get update && apt-get install \-y git && rm \-rf /var/lib/apt/lists/\*  
\# ホストのファイルをコピー（初期設定用）  
COPY . .  
EXPOSE 3000  
\# 開発サーバー起動コマンド  
CMD \["sh", "-c", "pnpm install && pnpm dev"\]

### **1.2. docker-compose.yml**

WSL2 特有の「node_modules の同期遅延」を避けるため、名前付きボリュームを利用します。

YAML

\# docker-compose.yml  
services:  
 app:  
 build:  
 context: .  
 dockerfile: docker/Dockerfile  
 volumes:  
 \- .:/app  
 \- node_modules:/app/node_modules  
 ports:  
 \- "3000:3000"  
 environment:  
 \- HOST=0.0.0.0  
 \- NODE_ENV=development  
 \# WSL2 で HMR が効かない場合は以下を有効化  
 \- WATCHPACK_POLLING=true  
 tty: true  
 stdin_open: true  
volumes:  
 node_modules:

## ---

**2\. プロジェクト構造 (Nuxt Layers)**

共通基盤と各サブシステムを分離し、疎結合な構成を維持します。

Plaintext

repository-root/  
├── layers/  
│ ├── base/ \# 【共通基盤レイヤー】  
│ │ ├── components/  
│ │ │ └── base/ \# 再利用可能な最小部品 (Presentational)  
│ │ ├── assets/scss/ \# デザイナー管理の外部 CSS  
│ │ ├── types/ \# 共通型定義 (Entity/Domain)  
│ │ └── utils/ \# 共通ユーティリティ  
│ └── sub-system-a/ \# 【サブシステムレイヤー】  
│ ├── components/ \# 業務ロジックを持つ部品 (Container)  
│ ├── pages/ \# 画面エントリー  
│ ├── stores/ \# Pinia ストア  
│ └── types/ \# サブシステム専用の型定義  
├── docker/ \# Dockerfile 管理  
├── nuxt.config.ts \# Extends 設定  
└── pnpm-workspace.yaml

## ---

**3\. コンポーネント設計指針**

### **3.1.**

Container / Presentational パターン

#### **Presentational Components (base/ 配下)**

- **責務:** UI の「見た目」と「汎用的な振る舞い」のみ。

- **制約:** Pinia ストア、API 通信 (useFetch)、Nuxt 固有の副作用 (useRoute 等) に依存してはならない。

- **通信:** 全て props で受け取り、emit でイベントを通知する。

#### **Container Components (sub-system/ 配下)**

- **責務:** ビジネスロジック、データ取得、状態管理。

- **実装:** Pinia ストアからデータを取得し、Presentational Components へ流し込む。

### **3.2. 自動インポート (Auto-imports) の活用**

Nuxt の Conventions に従い、以下の要素は明示的に import せず、自動インポートを利用します。

- **Vue Core:** `ref`, `computed`, `watch`, `onMounted` 等
- **Nuxt Composables:** `useRouter`, `useRoute`, `useHead` 等
- **Components:** `components/` 配下のコンポーネント（レイヤー間の import も含む）
- **Icons:** `nuxt-lucide-icons` により、`Lucide` プレフィックス付きで自動利用（例: `<LucideHome />`）。スクリプト内で使用する場合は文字列として扱うか、動的コンポーネント解決を利用する。

**禁止:** `import { ref } from 'vue'` や `import { BaseButton } from '#components'` のような記述は原則禁止とします。

### **3.3. コンポーネントカタログの更新**

`layers/base/components` 配下に新しい共通コンポーネント（Presentational Component）を追加、または既存コンポーネントの仕様を変更した場合は、必ず `catalog.vue` を更新し、変更内容が視覚的に確認できるようにしてください。

## ---

**4\. CSS / スタイリング規約 (外部 CSS & BEM)**

デザイナーとの分業を最適化するため、Vue ファイル内へのスタイル記述は禁止します。

### **4.1. 外部ファイル管理**

- すべてのスタイルは assets/scss/ 配下の独立した .scss ファイルに記述する。

- Vue コンポーネントからは \<style src="..."\> で読み込む。

### **4.2. BEM 記法とプレフィックス**

クラス名の衝突を防ぎ、役割を明確にするため以下のプレフィックスを付与します。

| プレフィックス | 役割                             | 命名例                |
| :------------- | :------------------------------- | :-------------------- |
| l-             | Layout (ヘッダー、サイドバー等)  | .l-header\_\_inner    |
| c-             | Component (ボタン、入力欄等)     | .c-button--primary    |
| p-             | Project (特定の業務画面固有要素) | .p-user-list\_\_card  |
| is-            | State (JS で制御される状態)      | .is-active, .is-error |

### **4.3. レスポンシブデザイン**

- モバイルファーストで記述する。

- ブレイクポイントは共通の \_variables.scss で管理し、mixin を使用して適用する。

## ---

**5\. TypeScript & 状態管理 (Pinia)**

### **5.1. 型定義の厳格化**

- strict: true 設定。any の使用は原則禁止。

- **Entity 型:** API のデータ構造。

- **UI 型:** 画面固有の状態（開閉フラグ、ローディング状態等）。

### **5.2. Pinia ストア運用**

- **分割:** ドメインごとにストアを分割する。

- **アクセス:** コンポーネントが直接 State を加工せず、actions または getters を経由してデータ操作を行う。

## ---

**6\. テスト戦略**

### **6.1. Unit / Component Test (Vitest)**

- base コンポーネントの全 props / emit の挙動。

- 共通ユーティリティや Pinia のロジック。

### **6.2. E2E / Visual Regression Test (Playwright)**

- **VRT:** デザイナーによる CSS 変更時に、意図しないレイアウト崩れが起きていないかをスクリーンショット比較で検証する。

- **シナリオテスト:** 主要な業務フローの担保。

### **6.3. テストコード実装ポリシー (追加)**

#### **6.4. テストファイルの配置**

テストファイルはソースファイルと同じ階層には置かず、各レイヤー内の `tests` ディレクトリにソースコード構成をミラーリングして配置します。

例:
- ソース: `layers/base/components/base/SideMenu.vue`
- テスト: `layers/base/tests/components/base/SideMenu.spec.ts`

テストコードの可読性と保守性を統一するため、以下の記述ルールを遵守してください。

#### **1\. AAA パターン (Arrange-Act-Assert)**

テストメソッド内は 3 つのフェーズに明確に区切り、コメント等で可視化します。

- **Arrange (準備):** テストデータの生成、モックの定義、コンポーネントのマウント。
- **Act (実行):** テスト対象メソッドの実行、ユーザー操作（クリック等）のイベント発火。
- **Assert (検証):** 実行結果の検証、DOM の状態確認、メソッド呼び出し回数の確認。

TypeScript

test('ユーザーが削除ボタンをクリックすると削除イベントが発火する', async () \=\> {  
 // Arrange  
 const user \= UserBuilder.default().withName('Test User').build();  
 const wrapper \= mount(UserCard, { props: { user } });

// Act  
 await wrapper.find('.c-button--delete').trigger('click');

// Assert  
 expect(wrapper.emitted('delete')).toBeTruthy();  
});

#### **2\. Builder パターンによるテストデータ生成**

巨大なオブジェクトリテラルや重複したデータを防ぐため、Entity ごとに Builder（Factory）を用意します。

- **実装:** デフォルト値を持つファクトリメソッドを提供し、テストケースに必要な差分のみをチェーンメソッドで上書きします。
- **メリット:** 型安全性の担保と、テストコードの意図（どのパラメータが重要か）の明確化。

TypeScript

// 使用例  
const adminUser \= UserBuilder.default()  
 .withId(100)  
 .withRole('admin') // 必要な差分のみ指定  
 .build();

#### **3\. テストケースの分類**

describe ブロック等を用いて、以下の 3 つの観点を網羅・分類して記述します。

- **正常系 (Normal):** 基本的なユースケースが成功するパターン。
- **準正常系 (Semi-normal):** 境界値（0, Max）、空データ、権限不足など、業務ルール上の特異点やバリデーションエラー。
- **異常系 (Abnormal):** サーバー 500 エラー、通信タイムアウト、例外スロー時のハンドリング確認。

## ---

**7\. 禁止事項 (アンチパターン)**

- **インラインスタイル / Scoped 外スタイル:** スタイルは必ず外部 SCSS に記述すること。

- **Presentational 層での副作用:** base コンポーネントでストアを import してはならない。

- **マジックナンバー:** 色、余白、ブレイクポイントはすべて \_variables.scss を参照すること。

- **不適切な型変換:** as any による型チェックの回避。

- **手動インポート:** Vue コア機能、Nuxt 機能、コンポーネント、アイコンの手動 import は禁止。

## ---

**次のステップ**

- **GitHub リポジトリへの初期コミット:** 上記の Dockerfile とディレクトリ構造を反映。

- **デザイナー向け SCSS ディレクトリの初期化:** foundation, layout, object の各フォルダを作成。

- **Vitest/Playwright の初期設定:** 最初のテストケース（ポリシーに則った Builder とサンプルテスト）を作成。

# All PRs SHALL adhere to one of the following categories and comply with the respective rules.

1. Feature Update
   - SHALL include only functional changes (e.g., adding, modifying, or removing features).
   - SHALL NOT include any non-functional changes, such as:
     - Removing comments
     - Changing access modifiers (e.g., public/private)
     - Exposing local/internal functions
     - Modifying or removing #pragma or other compiler directives
     - Pure formatting or whitespace changes
2. Security Update
   - SHALL include only security-related fixes or improvements.
3. Optimization
   - SHALL include performance or resource usage improvements that DO NOT alter functionality.
   - SHALL ensure that the optimized code is already covered by existing tests.
     1. If NOT covered by tests, DO NOT create an optimization PR.
     2. Instead, first submit a test coverage update PR with no optimization changes included.
4. Other Changes
   - Covers all other types of changes that do not fit the above categories (e.g., documentation, refactoring).
   - SHOULD be submitted in separate PRs and clearly labeled.

NOTE:

- If your changes span multiple categories, split them into separate PRs according to category.
- Clearly state the category in the PR title (e.g., [Feature] Add user login feature, [Security] Fix token validation).
