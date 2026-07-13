# Figma Fixture Manifest

## ソース
- Figma Community File: "Shopping App UI Kit 1.0" (Community)
  - Community URL: https://www.figma.com/community/file/1005735282905530510
  - 複製後の実ファイルURL: https://www.figma.com/design/cobQGyPNOOx3MyrDicL75d/Shopping-App-UI-Kit-1.0--Community-
  - fileKey: `cobQGyPNOOx3MyrDicL75d`
- **注記**: このキットはButton/Input/Card/BadgeがVariant付きコンポーネントとして構造化されたデザインシステムではなく、「画面まるごと」(loading/signup/login/main product/product/purchase/thank you/stories/cart/account の10画面)で構成されている。比較研究用に、各画面から代表的なUI要素を抜き出してfixture化した。

## 使用アカウント/seat(抽出時点)
- Figmaアカウント: yushi_deer (yushi6577@gmail.com)
- チーム: yushi_deerのチーム / **Starter tier / View seat**
- 読み取りレート制限: 全プラン共通で月6回まで(`get_metadata`/`get_design_context`/`get_variable_defs`が対象。`whoami`/`generate_figma_design`/`add_code_connect_map`は対象外)

## 抽出日時・呼び出しログ
| # | 日時 | ツール | 対象ノード | 用途 | 結果 |
|---|---|---|---|---|---|
| 1 | 2026-07-11 | `get_metadata` | `0:1`(canvasルート) | 画面一覧の構造把握 | 成功(10画面のフレーム一覧取得) |
| 2 | 2026-07-11 | `get_design_context` | `2:4`(signup screen) | Input/Button抽出 | 成功 |
| 3 | 2026-07-11 | `get_design_context` | `6:29`(product screen) | Card/Button(セグメント型)抽出 | 成功 |

**月6回の枠のうち3回を使用済み(残り3回)。** 以降のPhase 3〜5では本fixtureのみを入力とし、Figma MCPは再呼び出ししない方針(計画Phase 2準拠)。`get_variable_defs`は本キットにFigma Variablesの定義が見当たらなかった(色は全てハードコードされたhex/rgba値)ため呼び出しを省略した。

## コンポーネント対応表

| Fixture上の名称 | 出典ノード | 出典画面 | 備考 |
|---|---|---|---|
| Button / Primary | `2:13` + `2:14`("Create Account") | signup screen (`2:4`) | 背景 `rgba(21,21,21,0.65)` + blur、角丸6px、幅240×高43 |
| Button / Secondary(セグメント型) | `6:66`/`6:71` + `6:69`/`6:70`("Buy for $338" / "Size 12M") | product screen (`6:29`) | 背景 `#151515`、角丸6px、高47。2つ並んだセグメント風ボタンとして扱う |
| Input / Default | `2:7`, `2:9`, `2:11`(Full Name/Email/Password欄) | signup screen (`2:4`) | 背景 `rgba(255,255,255,0.65)` + blur、ボーダー `rgba(217,217,217,0.96)` 0.5px、角丸6px、高43 |
| Card / Product | `6:64`(画像) + `6:65`(タイトル) | product screen (`6:29`) | ボーダー `rgba(217,217,217,0.96)` 0.5px、角丸8px、幅327×高264の画像 + タイトル行。画像は `product-hero.png` として保存済み |

## 状態(state)についての注記
このソースデザインには **Focus/Error/Disabled等のInteractive/Visual stateのバリエーションが存在しない**(すべてDefault状態のみ)。したがって:
- **Visual state**(Widgetbook UseCase / Storybook argsで強制表示する見た目)は、Default以外は本fixtureの色トークンから合理的に外挿(interpolation)したものであり、Figmaから直接抽出した値ではない。この点をdesign-system-rules.mdおよび各トラックの実装で明記する。
- Badgeに相当する要素はキット内に見当たらなかったため、今回の比較対象からは除外する(Button/Input/Cardの3種のみで比較)。

## 未使用のアセット
signup screenの背景写真(`imgFearOfGodEssentialsSummer2020151`)・ロゴ(`imgLogo`)、product screenのステータスバー/アイコン類は、コンポーネント本体ではなく画面装飾のためfixture化・ダウンロードの対象外とした。
