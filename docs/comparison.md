# 比較まとめ

対象: Figma Community「Shopping App UI Kit」から抜き出したButton/Input/Cardの3コンポーネントを、Flutter+Widgetbook・React+Storybook・React Native+Storybookの3スタックで実装し比較した(Badgeはソースに存在せず対象外)。前提のFigma seatはView/starter(月6回の読み取り制限)のため、`use_figma`によるコンポーネント自作(Phase 1)・Code Connect(Phase 6)・`use_figma`再構築(Phase 7-B)はスキップし、既存デザインの読み取り実装(Phase 3-5)とレンダリング取り込み(Phase 7-A)のみを実施した。詳細ログは `docs/run-log.md`、入力データは `docs/figma-fixtures/` を参照。

## セットアップ摩擦・所要時間

| トラック | 所要時間感 | 詰まった点 |
|---|---|---|
| Flutter + Widgetbook | 最も長い(セッション上限で1回中断・再開を挟む) | 別パッケージ構成(app + widgetbook workspace)のセットアップ手順が多い。`flutter analyze`が日本語+スペースを含むパス名でLSPクラッシュする既知の環境バグに遭遇(コード起因ではない) |
| React + Storybook | 60〜75分 | `storybook init`が非対話環境でPlaywrightインストール確認を出し手動対応が必要だった |
| React Native + Storybook | 30〜40分(3トラック中最速) | ほぼ詰まりなし。Storybook CLIがMetro設定・reanimated等のバージョン固有事項を自動吸収した |

## Figma MCPツール呼び出しパターン

- **fixture抽出(共通、Phase 2)**: `whoami`(制限対象外)→ `get_metadata` ×1 → `get_design_context` ×2(signup screen / product screen)。月6回中3回消費。
- **Phase 3〜5(3スタック実装)**: 追加のFigma MCP呼び出しなし(fixtureのみを入力に実装、計画通り)。
- **Phase 7-A(React→Figma)専用**: `create_new_file` ×1(制限対象外)、`generate_figma_design` ×2(初回+ポーリング完了、制限対象外)、`get_metadata` ×1(忠実度確認用、月6回中4回目消費)。**Drafts作成・code-to-canvas系ツールはレート制限対象外**であることが実地で確認できた。

## 生成コードの忠実度・ビルド品質

| 項目 | Flutter | React | React Native |
|---|---|---|---|
| ビルド/型チェック | `flutter analyze`(環境問題はあるがコードはNo issues) / `flutter test` 5件pass / `dart format` pass | `npm run lint` pass / `npm run build` pass | `tsc --noEmit` pass |
| 追加チェック | `flutter build macos` pass、.app起動確認 | `npm run build-storybook` pass | `expo-doctor` 20/20 pass、iOS Simulator実機表示確認 |
| Warning数 | DeviceFrameAddon非推奨infoが1件のみ | mdxファイル無しの情報メッセージのみ(非致命的) | なし |
| 修正なしで動いたコンポーネント数 | 3/3(Button/Input/Card) | 3/3 | 3/3 |
| ★(Figma由来)/☆(外挿)の扱い | tokens.dart/widget/usecaseにコメント明記 | tokens.css/コンポーネント/JSDoc/argTypesに明記 | tokens.ts/コンポーネント/story JSDocに明記 |

3スタックとも「修正なしでビルド・チェックが通る」水準まで到達した。Figma由来(★)の値(色・角丸・寸法・タイポグラフィのDefault状態)は3スタックで一致した実装になっており、外挿(☆)が必要だったFocus/Error/Disabled/Selected/サイズバリエーションの解釈にも大きな食い違いはなかった(各トラックが同じdesign-system-rules.mdを参照したため)。

## カタログDX(Widgetbook vs Storybook vs Storybook-RN Native/Web)

- **Widgetbook**: UseCase(固定Visual state)とknobsによるPlayground(Interactive state)を分離しやすい。DeviceFrameAddonで複数デバイスサイズの見た目を同時比較できるのが強み。ビルド・起動確認(`flutter build macos`)はできたが、GUI描画の目視確認はheadless環境の制約で未実施。
- **Storybook(React)**: CSF3のargs/argTypesでVisual stateを表現し、`play`関数で実際のuserEvent(click/tab/type)によるInteractive stateも同一ファイル内で検証できる。`build-storybook`で静的サイトとして書き出せるため配布・レビューが容易。
- **Storybook(React Native)**: NativeとWeb(`@storybook/react-native-web-vite`)を別物として比較。**Native**はiOS Simulatorで実際のTouchableOpacity挙動込みで確認できる一方、起動にMetro経由の`STORYBOOK_ENABLED`環境変数切り替えが必要。**Web**はブラウザで即座に確認でき最も速いイテレーションだが、RN専用API(実機ジェスチャー等)の差異は検証できない。

総じて、**素早い視覚確認と配布のしやすさはWeb系(Storybook React / Storybook-RN Web)が有利**、**実機に近い挙動確認はWidgetbookのDeviceFrameとStorybook-RN Nativeが有利**という棲み分けが見られた。

## Code Connect比較(Phase 6)

**未実施**。Organization/EnterpriseプランのDev/Full seatが必要な機能だが、現アカウントはStarter/View seatのため実施不可。プラン制約により未検証。

## Code→Figma忠実度(Phase 7)

- **7-A(`generate_figma_design`によるレンダリング取り込み)**: 実施済み。View seatでもDraftsへの取り込みは問題なく完了(レート制限対象外)。レイヤーはSection/Button/Input/Card/Label/Text Input等、HTML構造から意味のある名前で分割され、テキストは編集可能なtextノードとして再現された。一方で**variant(primary/secondary等)やコンポーネントの意味情報は失われ**、単なる見た目のフレームとして取り込まれる(想定通りの結果)。
- **7-B(`use_figma`によるComponent Set再構築)**: **未実施**。Full seatが必須のため、プラン制約により未検証。

## 総括

- Figma seatの制約(View/starter)は、当初計画のうちComponent自作(Phase 1書き込み)・Code Connect(Phase 6)・Component再構築(Phase 7-B)を丸ごとブロックした。一方で「既存デザインの読み取り→3スタック実装」「レンダリング取り込みによるCode→Figma」は、fixture化(1回だけ読み取り、以降は再利用)とcode-to-canvas系ツールのレート制限除外という2つの仕組みのおかげで、月6回という厳しい制限内でも実施できた。
- 3スタックの実装品質・ビルド健全性には大きな差はなく、差が出たのは主に「セットアップの摩擦」(RN最速・Flutter最も手間)と「カタログの用途特性」(Web系は速さ、Native/DeviceFrame系は実機再現性)だった。
- 今後Full seat/Organizationプランへのアップグレードが可能であれば、Phase 1(自作コンポーネントでの比較)・Phase 6(Code Connect)・Phase 7-B(Component再構築)を追加実施することで、より完全な比較研究になる。
