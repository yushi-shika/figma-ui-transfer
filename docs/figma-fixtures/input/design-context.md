# Input — design-context (raw, get_design_context出力より)

出典: fileKey `cobQGyPNOOx3MyrDicL75d`, node `2:4`(signup screen)。2026-07-11抽出。

## Default Input(3フィールド: Full Name / Email / Password)

```jsx
<div className="absolute backdrop-blur-[4px] bg-[rgba(255,255,255,0.65)] border-[0.5px] border-[rgba(217,217,217,0.96)] border-solid h-[43px] left-[48px] rounded-[6px] top-[373px] w-[288px]" data-node-id="2:7" />
<p ... text-black ...>Full Name</p>  <!-- ラベル -->
<p ... text-black ...>Reggie James</p>  <!-- 入力値サンプル -->
```

- サイズ: 288×43
- 背景: `rgba(255,255,255,0.65)` + `backdrop-blur(4px)`
- ボーダー: 0.5px `rgba(217,217,217,0.96)`
- 角丸: 6px
- ラベル: black, 13px, SF Pro Display Regular(フィールド上部に別テキストとして配置)
- 入力値テキスト: black, 13px, SF Pro Display Regular
- PasswordフィールドのみサブテキストとしてグレーTextの"hide"(表示切替用ラベル、`rgba(0,0,0,0.44)`)が右寄せで存在 → Password variantの手がかりとして扱う

## 実装方針(3スタック共通)
- Figma上にあるのは実質 **Default状態のみ**(3フィールドとも同一スタイル)。
- **Focus / Error / Disabled** はFigmaからの抽出値ではなく、design-system-rules.mdのトークン(ボーダー色・背景色の変化パターン)から外挿して各スタックで実装する。この点は評価時に「Visual state(外挿)」であることを明記し、Figma忠実度の採点対象からは除外する。
- Passwordの「hide」トグルテキストは、実装上は各スタックの標準的なpassword表示切替UIとして解釈してよい(Interactive stateの対象)。
