# 開発方針

このプロジェクト(Figmaアプリ開発研究)では、モデルを役割ごとに使い分ける。

- **プランニング(設計・計画立案)**: Fable 5 (`claude-fable-5`) を使用する
  - 例: `Plan` エージェントや `brainstorming`/`writing-plans` スキル、`Workflow` の設計フェーズでは `model: "fable"` を指定する
- **実装(コーディング作業)**: Sonnet 5 (`claude-sonnet-5`) を使用する
  - 例: 実装系の `Agent` 呼び出しや `Workflow` の実装フェーズでは `model: "sonnet"` を指定する(省略時のデフォルトでも可)

参考: https://platform.claude.com/docs/en/managed-agents/multi-agent (Managed Agents APIのcoordinator/multiagent構成で、役割ごとに異なるモデルを割り当てるパターンに準拠)
