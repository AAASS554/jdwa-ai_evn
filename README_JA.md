# JDWA 记得晚安

JDWA 记得晚安 は、AI コーディングのワークフローを整理するデスクトップ管理ツールです。Claude Code、ChatGPT、Gemini、Hermes、OpenClaw のプロバイダー設定、MCP、プロンプト、Skills、セッション関連機能を 1 つの入口で扱えます。

![JDWA 记得晚安](src/assets/brand/jdwa-wordmark.png)

## コンセプト

- **プロジェクト納品**: 新規プロジェクトの立ち上げ、既存プロジェクトの引き継ぎ、設定移行、納品確認の流れを標準化します。
- **信頼できる実装**: SQLite、アトミック書き込み、バックアップ、明確なデータ境界で重要な設定を守ります。
- **効率の標準化**: 複数ツールのプロバイダー切り替え、MCP、プロンプト、Skills 管理を 1 つのデスクトップアプリに集約します。

## 対応ツール

- Claude Code
- ChatGPT
- Gemini
- Hermes
- OpenClaw

## ローカルデータ

JDWA はデフォルトで `~/.jdwa` をローカル設定ディレクトリとして使用します。

- `~/.jdwa/jdwa.db`: SQLite メインデータベース
- `~/.jdwa/settings.json`: デバイス単位の設定
- `~/.jdwa/backups/`: データベースバックアップ
- `~/.jdwa/skills/`: JDWA が管理する Skills のメインコピー

初回起動時に旧版の `~/.cc-switch/cc-switch.db`、`config.json`、`settings.json`、Skills / バックアップディレクトリが見つかった場合、JDWA はそれらを `~/.jdwa` にコピーします。旧ディレクトリは削除しません。

## 開発

```bash
pnpm install
pnpm run dev
```

よく使うチェック:

```bash
pnpm run typecheck
pnpm run build:renderer
```

## リリース

GitHub Releases は Tauri updater 用の `latest.json` を生成します。

```text
https://github.com/AAASS554/jdwa-ai_evn/releases/latest/download/latest.json
```

最初の macOS 版は Apple Developer ID による署名と公証を行いません。早期テストや手動インストール向けです。一般公開する前に Apple 署名と公証フローを追加することを推奨します。
