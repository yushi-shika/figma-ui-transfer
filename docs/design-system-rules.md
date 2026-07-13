# Design System Rules

3スタック(Flutter/Widgetbook、React/Storybook、React Native/Storybook)で共通に使う、Figma fixture(`docs/figma-fixtures/`)からの変換規約。**Phase 3〜5の実装ではこの文書とfixtureのみを入力とし、Figma MCPは再呼び出ししない。**

## 1. トークン定義

出典: `docs/figma-fixtures/{button,input,card}/design-context.md`。値はソースの Shopping App UI Kit から抽出したもの(★=Figmaから直接抽出、☆=Figmaにサンプルがなく本書で外挿)。

### カラー

| トークン名 | 値 | 用途 | 出典 |
|---|---|---|---|
| `color.surface.input` | `rgba(255,255,255,0.65)` | Input背景 | ★ |
| `color.border.default` | `rgba(217,217,217,0.96)` | Input/Cardボーダー | ★ |
| `color.border.muted` | `rgba(217,217,217,0.80)` | Primary Buttonボーダー | ★ |
| `color.button.primary.bg` | `rgba(21,21,21,0.65)` | Primary Button背景 | ★ |
| `color.button.secondary.bg` | `#151515` | Secondary Button背景 | ★ |
| `color.text.primary` | `#000000` | 通常テキスト(black) | ★ |
| `color.text.onDark` | `#FFFFFF` | ボタン内テキスト(white) | ★ |
| `color.text.muted` | `rgba(0,0,0,0.44)` | 補助テキスト("hide"等) | ★ |
| `color.accent` | `#151515` | Focus/Selectedの強調色(Secondary Buttonの色を流用) | ☆ |
| `color.error` | `#D64545` | Inputのエラー状態 | ☆(一般的なエラーレッドを採用) |
| `opacity.disabled` | `0.4` | Disabled状態の全体不透明度 | ☆ |

### 形状・余白

| トークン名 | 値 | 用途 |
|---|---|---|
| `radius.sm` | `6px` | Button / Input |
| `radius.md` | `8px` | Card |
| `size.button.height` | `43px`(Primary) / `47px`(Secondary) |
| `size.input.height` | `43px` |
| `size.card.image` | `327×264px` |
| `border.width.default` | `0.5px` |
| `border.width.focusOrSelected` | `1.5px`(☆) |

### タイポグラフィ

| トークン名 | 値 | 出典 |
|---|---|---|
| `font.family` | ソースは `SF Pro Display`。iOS専用フォントのため3スタック共通では **システムフォント/汎用サンセリフにフォールバック**(Flutter: プラットフォームデフォルト、React: `-apple-system, "Segoe UI", Roboto, sans-serif`、RN: `System`) | ★(フォント名)/☆(フォールバック方針) |
| `font.size.body` | `13px` | ★ |
| `font.size.medium` | `14px` | ★ |
| `font.weight.regular` | 400 | ★ |
| `font.weight.medium` | 500 | ★ |

## 2. コンポーネントAPI(3スタック共通の抽象仕様)

### Button
- `variant`: `primary` | `secondary`(★どちらもFigmaに実例あり)
- `size`: `s` | `m` | `l`(☆ Figmaは1サイズのみ。`m`をFigma実測値とし、`s`/`l`はスケール外挿)
- `disabled`: `bool`(☆ `opacity.disabled`を適用)

### Input
- `state`: `default`(★) | `focus`(☆ボーダー色→`color.accent`、幅→`border.width.focusOrSelected`) | `error`(☆ボーダー色→`color.error`) | `disabled`(☆`opacity.disabled`)

### Card
- `state`: `default`(★) | `selected`(☆ボーダー色→`color.accent`、幅→`border.width.focusOrSelected`)
- 構成: 画像(`size.card.image`、`object-fit: cover`、`radius.md`) + タイトルテキスト(`font.size.medium`, `font.weight.medium`)

**Visual state vs Interactive state**: 上記`state`/`disabled`はStorybook argsやWidgetbook knobsで強制表示する**Visual state**。実際のクリック・フォーカス・タップに伴う**Interactive state**(hover、実際のtext input編集、実際のフォーカスリング等)は別途、各スタックの標準的な実装(CSS `:focus`、Flutter `FocusNode`、RN `onFocus`等)に委ねる。

## 3. スタック別実装マッピング

| トークン種別 | Flutter | React | React Native |
|---|---|---|---|
| カラー | `ThemeData.extension`または`Color`定数(`lib/theme/tokens.dart`) | CSS変数(`:root { --color-... }`) | `StyleSheet`定数(`theme/tokens.ts`のJSオブジェクト) |
| 角丸 | `BorderRadius.circular(n)` | `border-radius: npx` | `borderRadius: n` |
| フォント | `TextTheme`経由、`fontFamily: null`(プラットフォームデフォルト) | `font-family` CSS変数 | `fontFamily: undefined`(System) |
| 不透明度(disabled) | `Opacity`ウィジェットまたは`AnimatedOpacity` | CSS `opacity` | `style={{opacity}}` |

## 4. 画像アセット
`docs/figma-fixtures/card/product-hero.png` を各スタックのアセットディレクトリにコピーして使用する(外部URL・ネットワーク依存を避ける)。

## 5. 実装時の注意
- ☆マークの値(Disabled/Focus/Error/Selected/サイズバリエーション)は**Figmaからの抽出ではなく本書での外挿**である。比較評価(`docs/evaluation-rubric.md`)では、★の要素(Default状態の色・角丸・寸法・タイポグラフィ)のみを「Figma忠実度」の採点対象とし、☆の要素は「一貫性・実装品質」の観点でのみ評価する。
- Badge相当のコンポーネントはソースデザインに存在しないため、今回の3スタック比較の対象外(Button/Input/Cardの3種)。
