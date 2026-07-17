# Figma UI Transfer — Figma→コード変換の技術比較研究

Figmaのデザインを、Claude Code + Figma MCP(Model Context Protocol)経由で読み取り、**Flutter / React / React Native** の3つの技術スタックへ変換した際の、実装しやすさ・忠実度・カタログツール(Storybook/Widgetbook)の使い勝手を比較した社内研究プロジェクトです。

> **非エンジニアの方へ**: 専門用語を噛み砕いた解説 → [docs/how-we-did-it.md](docs/how-we-did-it.md)

## 成果物デモ(ブラウザでそのまま見られます)

| スタック | 公開URL(Vercel) |
|---|---|
| React + Storybook | https://figma-ui-transfer-react-storybook.vercel.app |
| React Native + Storybook(Web版) | https://figma-ui-transfer-rn-storybook.vercel.app |
| Flutter + Widgetbook(Web版) | https://figma-ui-transfer-flutter-widgetboo.vercel.app |

各サイトの左メニューから「Screens > Signup」で組み立てた画面全体、「Button / Input / Card」で部品カタログが見られます。

## 参照したFigmaファイル

| ファイル | URL | 用途 |
|---|---|---|
| Shopping App UI Kit(Figma Community、複製元) | https://www.figma.com/community/file/1005735282905530510 | 比較用サンプルデザインの元ファイル |
| 上記を複製した実ファイル(読み取り対象) | https://www.figma.com/design/cobQGyPNOOx3MyrDicL75d/Shopping-App-UI-Kit-1.0--Community- | ここから `whoami`/`get_metadata`/`get_design_context` で実際にデータを取得 |
| Figma Drafts(コード→Figma逆変換の取り込み先) | https://www.figma.com/design/zd6oOjMxLqgzE1Y667sPeB?node-id=1-2 | 実装したReactの画面を`generate_figma_design`でFigmaに取り込んだ結果 |

Figma Communityのファイルは複製(Duplicate)しないとMCP経由で読み取れない仕様のため、一度自分のアカウントに複製してから作業しています。

## Figma MCP接続後の作業フロー

Claude Code (Claude AI) にFigma MCPサーバーを接続した状態から、以下の順番で進めました。

1. **`whoami`(疎通確認・アカウント確認)**
   Figma MCPが認証済みで使える状態かを確認。同時に、使用しているFigmaアカウントのプラン(seat/tier)も分かる。ここで **「View seat / Starterプラン」** であることが判明し、Figmaからの読み取りが**月6回まで**という制約があることが分かった。

2. **`get_metadata`(画面一覧の構造把握)**
   複製したFigmaファイルの中身(全10画面: ログイン・サインアップ・商品一覧・購入画面など)の構造(レイヤー名・座標)を1回の呼び出しで取得。

3. **`get_design_context`(コンポーネント抽出、月6回中2回使用)**
   全10画面のうち「サインアップ画面」と「商品詳細画面」の2画面だけを詳細取得し、そこから**ボタン・入力欄・商品カード**という3つの再利用可能な部品を抜き出した。読み取り回数を節約するため、以降のフェーズではFigmaへの再アクセスは行わず、この時に取得したデータ(fixture)だけを使い回す方針にした。

4. **共通ルールの整備**
   抽出した色・角丸・余白・フォントなどを「design-system-rules.md」という1つのルール文書にまとめ、3スタックが同じ基準で実装できるようにした。

5. **3スタック並行実装(独立したAIエージェントに分担)**
   Flutter(Widgetbook)・React(Storybook)・React Native(Storybook)の3つを、互いのコードを見せない状態で並行して実装。各スタックで部品(ボタン/入力欄/カード)のカタログを構築し、ビルド・型チェック・自動テストまで実施して全て合格を確認。

6. **実際の画面(サインアップ画面)を1枚組み立てて再検証**
   部品単体の確認だけでは実際のアプリに近い状態が伝わらないと判断し、3スタックすべてで「サインアップ画面」を1つの完成画面として組み立て直した。手順4で取得済みのデータを再利用したため、追加のFigma呼び出しは発生していない。

7. **コード→Figmaの逆変換(`generate_figma_design`)**
   実装したReact版の画面を、Figmaの新規ファイル(Drafts)に自動で取り込む機能を検証。この機能はレート制限の対象外で、Viewプランでも利用できることを確認した。

## わかったこと・結果

- 3スタックとも、同じFigmaデザインを一貫した見た目で再現できることを実機/ブラウザで確認できた。
- 開発のしやすさ(体感時間)は **React Native が最速(30〜40分)**、**Flutterが最も時間がかかった**(セットアップの手間が多い)。
- カタログツールの向き不向き: **すぐに見た目を確認したい用途はReact/Web系が有利**、**実機に近い挙動まで見たい用途はFlutter(Widgetbook)・React Native(Native Storybook)が有利**。
- 現在のFigmaプラン(View/Starter)では、月6回までしか読み取りができず、以下は今回検証できなかった:
  - Figma上でのコンポーネント自動生成(`use_figma`によるコンポーネント作成、Full seat必須)
  - コードとFigmaを紐付ける「Code Connect」機能(Organization/Enterpriseプラン必須)
  - コード→Figma変換後の、Figmaコンポーネントとしての再構築

## リポジトリ構成

```
docs/                        調査ログ・比較結果・共通ルール
  ├─ run-log.md              Figma MCP呼び出しログ・環境情報
  ├─ comparison.md           3スタック比較の総括
  ├─ design-system-rules.md  共通デザイントークン・変換規約
  └─ figma-fixtures/         Figmaから抽出した生データ(fixture)
flutter-widgetbook/          Flutter + Widgetbookトラック
react-storybook/             React + Storybookトラック
rn-storybook/                React Native + Storybookトラック
```

詳細な作業ログ・数値・所要時間は [docs/run-log.md](docs/run-log.md)、比較結果の総括は [docs/comparison.md](docs/comparison.md) を参照してください。
