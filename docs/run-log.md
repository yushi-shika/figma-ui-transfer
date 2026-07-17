# Run Log

## Phase 0 — 環境セットアップ

| 項目 | バージョン/状態 | 確認日時(記載時点) |
|---|---|---|
| macOS | 26.4 (25E246), darwin-arm64 | 2026-07-11 |
| Flutter | 3.44.6 (stable channel) | 2026-07-11 |
| Dart | 3.12.2 | 2026-07-11 |
| Xcode | 26.4 (Build 17E192) | 2026-07-11 |
| CocoaPods | 1.16.2 | 2026-07-11 |
| Node.js | 24.5.0 | 2026-07-11 |
| npm | 11.5.1 | 2026-07-11 |
| Chrome | 150.0.7871.102 | 2026-07-11 |
| Figma MCP (`plugin:figma:figma`) | 認証済み・ツール検出済み(`mcp__plugin_figma_figma__*`) | 2026-07-11 |
| Figma plugin (Claude Code) | v2.0.2 (`figma@claude-plugins-official`, user scope) | 2026-07-11 |

**flutter doctor結果**: iOS toolchain / macOS desktop / Chrome web / Network resources すべて緑。Android toolchainは今回のスコープ外(macOS/Web上でWidgetbookを動かすため)として意図的に未対応。

## MCP呼び出しログ

### `whoami`(2026-07-11)

```json
{
  "handle": "yushi_deer",
  "email": "yushi6577@gmail.com",
  "plans": [
    {
      "name": "yushi_deerのチーム",
      "seat": "View",
      "tier": "starter",
      "key": "team::1618976129784794710",
      "seat_type": "view"
    }
  ]
}
```

**⚠️ 権限上のブロッカー**: 現在のseatは **View / starter tier**。計画の前提条件(Phase 0)と照合すると:
- 読み取り系(`get_design_context`/`get_metadata`/`get_variable_defs`): View seatでも利用可能だが**全プラン共通で月6回まで**。3スタック分のfixture抽出・研究用途には明らかに不足。
- `use_figma`によるネイティブ書き込み(Phase 1のコンポーネント作成、Phase 7-B): **Full seat必須** — 現状不可。
- Code Connect(Phase 6): **Organization/EnterpriseプランのDev or Full seat必須** — 現状不可(tierもstarterで不足)。
- `generate_figma_design`(Phase 7-A)はDraftsへの取り込みであればどのseatでも可 — これは実施可能。

→ ユーザーに確認の上で対応方針を決定(記録待ち)。

**ユーザー決定(2026-07-11)**: seatアップグレードはせず、スコープを縮小して続行。Figma Communityの既存デザイン(Shopping App UI Kit)から代表的なUI要素(Button/Input/Card)を抜き出してfixture化し、Phase 1(`use_figma`によるコンポーネント自作)・Phase 6(Code Connect)・Phase 7-B(`use_figma`再構築)はスキップ。Phase 7-A(`generate_figma_design`)はレート制限対象外・View seatで実施可能なため引き続き実施予定。

### `get_metadata` / `get_design_context`(2026-07-11、Shopping App UI Kit)

| # | ツール | 対象 | 結果 | 累計消費(月6回中) |
|---|---|---|---|---|
| 1 | `get_metadata` | fileKey `cobQGyPNOOx3MyrDicL75d`, node `0:1` | 成功(10画面一覧取得) | 1/6 |
| 2 | `get_design_context` | node `2:4`(signup screen) | 成功(Input/Button抽出) | 2/6 |
| 3 | `get_design_context` | node `6:29`(product screen) | 成功(Card/Button抽出) | 3/6 |

詳細・ノード対応表は `docs/figma-fixtures/manifest.md` を参照。`get_variable_defs`は本キットにFigma Variables定義が見当たらないため未使用。残り枠3/6は以降のPhase 7-A等のトラブルシュート用に温存。

## モデル・エージェント呼び出しログ(Phase 3〜5用)

### React + Storybookトラック(完了 2026-07-11)

- 使用モデル: Sonnet 5(Agent tool、新規サブエージェント、他スタックのコード非公開)
- バージョン: Node `v24.5.0` / npm `11.5.1` / Vite `8.1.4` / React `19.2.7` / TypeScript `6.0.3` / Storybook `10.5.0`
- 手順: `npm create vite@latest -- --template react-ts` → `npx storybook@latest init`。トークンは`src/tokens.css`(CSS変数)。Button/Input/Card をプレーンCSS Modulesで実装、CSF3ストーリー、Visual/Interactive stateを分離(play関数でuserEvent発火)。
- 品質チェック: `npm run lint`(oxlint)pass / `npm run build` pass / `npm run build-storybook` pass(mdxファイル無しの情報メッセージのみ、非致命的)
- 所要時間感: 60〜75分。詰まった点: `storybook init`が非対話環境でPlaywrightインストール確認プロンプトを出したため`yes ""`で通した。`@storybook/addon-vitest`経由のplay関数実行は追加設定が必要で範囲外とした。
- 指摘: design-system-rulesの`size.button.height`(43px/47px)とs/m/lサイズバリエーションの関係が曖昧だったため、「mは実測値保持、s/lはスケール外挿」と解釈(コードコメントに明記)。
- **セキュリティメモ**: 作業中に`.claude/launch.json`をブラウザプレビュー確認用に一時作成し、作業後に削除。ホスト側フックにより自己修正領域として警告が出たが、確認の結果react-storybook配下に該当ファイルは残っておらず、実害なし。

### React Native + Storybookトラック(完了 2026-07-11)

- 使用モデル: Sonnet 5(Agent tool、新規サブエージェント、他スタックのコード非公開)
- バージョン: Node `v24.5.0` / npm `11.5.1` / Expo CLI `57.0.6` / Expo SDK `57.0.4` / React Native `0.86.0` / React `19.2.3` / Storybook `10.5.0`(`@storybook/react-native` ^10.4.7、`@storybook/react-native-web-vite` ^10.5.0) / TypeScript `6.0.3`
- 手順: `create-expo-app@latest --template blank-typescript` → `npm create storybook@latest`(実体は`create-storybook@10.5.0`)。CLIがMetro設定・reanimated等のバージョン固有事項を自動対応(手動調整不要)。`theme/tokens.ts`にJSオブジェクトでトークン実装、StyleSheetベースでButton/Input/Card実装。Visual state(args)とInteractive state(`Interactive`という名のstoryで実際のonPress/onFocus)を分離。
- 品質チェック: `npx tsc --noEmit` pass / `npx expo-doctor` 20/20 pass / iOS Simulator(iPhone 17, iOS 26.4)でNative Storybook実機表示を確認(スクリーンショット取得)。Web版(`@storybook/react-native-web-vite`)も別途構築し起動確認。
- 所要時間感: 30〜40分(3トラック中最速。CLIの自動化度が高かったため)。
- 指摘: design-system-rulesに`backdrop-blur`相当のRN対応トークンがなく(`expo-blur`が必要)、今回は意図的に省略。Buttonの固定幅(240×43等)について、再利用コンポーネントとしてflexible/fixedいずれの幅方針を取るかルール文書に規定がなく外挿が必要だった。

### Flutter + Widgetbookトラック(完了 2026-07-12、途中セッション上限で中断→再開)

- 使用モデル: Sonnet 5(Agent tool、新規サブエージェント、他スタックのコード非公開)。1回目の実行がAPIセッション上限で中断したため、同一サブエージェントをSendMessageで再開して完了。
- バージョン: Flutter `3.44.6` / Dart `3.12.2` / widgetbook `3.25.0` / widgetbook_annotation `3.11.0` / widgetbook_generator `3.24.0` / build_runner `2.15.1`
- 構成: `app/`(実体パッケージ)+ `widgetbook/`(ワークスペース、path依存)の2パッケージ構成。`app/lib/theme/tokens.dart`にトークン、`app/lib/widgets/`にAppButton/AppInput/AppCard、`app/lib/widgetbook/`にUseCase(Visual state)+Playground(knobsでInteractive state)。`widgetbook/lib/main.dart`はMaterialThemeAddon/DeviceFrameAddon/AlignmentAddon構成。
- 品質チェック: `build_runner build` pass / `flutter test` 5件pass / `dart format --set-exit-if-changed` pass(差分なし)/ `flutter analyze` は"No issues found!"(ただし**プロジェクトパスに日本語+スペースが含まれるためanalysis_server(LSP)がクラッシュする既知の環境バグに遭遇** — ASCIIパスにコピーして切り分け・検証し、コード自体に問題がないことを確認済み)/ `flutter build macos` pass(ビルド後.app起動しプロセス生存確認)。
- 所要時間感: 初回実行+再開の合計で相当時間(セッション上限中断あり)。指摘: fixture/design-system-rules.mdへの追加指摘なし。
- **既知の環境問題**: 本プロジェクトディレクトリ名(`Figma アプリ開発研究`、日本語+スペース)が原因で、Flutter/Dartのanalysis_server(LSP)がクラッシュする場合がある。`flutter analyze`/`dart analyze`が正常に動かない場合はこれが原因の可能性が高く、ASCIIパスでの検証で切り分けること。

## Phase 7-A — React → Figma(`generate_figma_design`、2026-07-12)

- `create_new_file`でDrafts新規ファイル作成(`Figma比較研究 - React Code Capture`, fileKey `zd6oOjMxLqgzE1Y667sPeB`)。**Drafts作成・`generate_figma_design`自体はレート制限対象外**、View seatで実施。
- `react-storybook`に装飾なしの比較ページ`/figma-capture`(`src/FigmaCapture.tsx`)を追加。Button(primary/secondary × s/m/l/disabled)、Input(default/focus/error/disabled、Visual stateとして強制表示)、Card(default/selected)の全variantを配置。`index.html`にcapture.jsスクリプトタグを追加(ユーザーから削除依頼がない限り残す方針)。
- `npm run dev`でローカルサーバー起動 → ブラウザで`http://localhost:5173/figma-capture#figmacapture=...`(ハッシュ付きURL)を開き、キャプチャツールバーから自動送信 → captureId をポーリングして`completed`を確認。
- 取り込み後、`get_metadata`で構造を確認(月6回中4回目使用、残り2回)。

### 忠実度の評価
- **レイヤー分割**: 良好。Section/Button/Input/Card/Label/Text Input/Paragraph等、HTML構造から意味のある名前で分割されている。
- **テキストの編集可能性**: 全テキストが独立したtextノードとして分離されており、編集可能。
- **Variant/トークンの意味情報**: 想定通り失われている。「Button」という名前のフレームが4つ並ぶだけで、`variant=primary/secondary`や`size=s/m/l`といったプロパティ情報はキャプチャに反映されない(ただの見た目のフレーム)。Figma Variables/Component Variantとしては再構築されない。
- **Auto Layout / Shadow / Border**: `get_metadata`はXML構造(位置・サイズ)のみを返すため詳細確認は`get_design_context`が必要だが、月6回の残り枠温存のため今回は見送り。ブラウザスクリーンショットとの目視比較では、色・角丸・レイアウト位置は元のReact実装と一致しているように見える。
- **結論**: 7-Aは「見た目の忠実な取り込み」には有効だが、意味情報(variant/token)は失われるという計画の前提通りの結果。7-B(`use_figma`によるComponent Set再構築)はFull seat不足のため未実施(計画通りスキップ)。

## デプロイ(2026-07-13、上司共有依頼を受けて実施)

- **React Storybook**: https://figma-ui-transfer-react-storybook.vercel.app (Vercel, `react-storybook/storybook-static`を静的デプロイ。プロジェクト: `yushis-projects-30e6e68e/figma-ui-transfer-react-storybook`)
- **React Native Storybook(Web版)**: https://figma-ui-transfer-rn-storybook.vercel.app (Vercel, `rn-storybook/storybook-static`を静的デプロイ。プロジェクト: `yushis-projects-30e6e68e/figma-ui-transfer-rn-storybook`)
- **Flutter Widgetbook(Web版)**: https://figma-ui-transfer-flutter-widgetboo.vercel.app (Vercel, `flutter-widgetbook/widgetbook/build/web`を静的デプロイ。プロジェクト: `yushis-projects-30e6e68e/figma-ui-transfer-flutter-widgetbook`。Widgetbookワークスペースは`--platforms=macos,web`で作成済みのためWeb版ビルドが可能だった)
- Figma Drafts(Phase 7-A成果物): `Figma比較研究 - React Code Capture` (fileKey `zd6oOjMxLqgzE1Y667sPeB`) — https://www.figma.com/design/zd6oOjMxLqgzE1Y667sPeB — Draftsファイルのためユーザー本人のFigmaアカウントでログインが必要。

## カタログツールの見た目差異に関する所見(2026-07-13)

デプロイ後のユーザーレビューで「WidgetbookのボタンがStorybookより低い位置に見える」との指摘。調査の結果、**実装コードは完全一致**(`signup_screen.dart`と`SignupScreen.module.css`ともに`left:72/top:648`、ボタン高さも`tokens.dart`の`buttonHeightPrimary=43`と`tokens.css`の`--size-button-height-primary:43px`で一致)。

原因は`flutter-widgetbook/widgetbook/lib/main.dart`の`DeviceFrameAddon(devices: [Devices.ios.iPhone13, ...])`設定。Widgetbookは全use-caseをiPhone13の実機フレーム(390×844、ノッチ/ステータスバー付き)で包んで表示するのに対し、Storybookはコンポーネントを枠なしでそのまま表示する。SignupScreenは375×812固定サイズのため、iPhone13フレーム内に収まる際に余白/ステータスバー分だけ画面全体が視覚的に下にずれる。

→ **実装の忠実度問題ではなく、カタログツール自体のデフォルト表示挙動の違い**(Widgetbook=デバイスフレームでラップ / Storybook=素の表示)。比較研究の観点としては「カタログDX」の軸に記録すべき差異(Widgetbookはデバイスプレビューが標準機能として強い、Storybookは素のコンポーネント確認に向く、という trade-off)。
