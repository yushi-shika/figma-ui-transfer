# Button — design-context (raw, get_design_context出力より)

出典: fileKey `cobQGyPNOOx3MyrDicL75d`, node `2:4`(signup screen)内 + node `6:29`(product screen)内。
2026-07-11抽出。詳細は `../manifest.md` を参照。

## Primary Button(signup screen, node `2:13`+`2:14`)

```jsx
<div
  className="absolute backdrop-blur-[4px] bg-[rgba(21,21,21,0.65)] border-[0.5px] border-[rgba(217,217,217,0.8)] border-solid h-[43px] left-[72px] rounded-[6px] top-[648px] w-[240px]"
  data-node-id="2:13"
/>
<p
  className="... font-['SF_Pro_Display:Regular'] text-[13px] text-white ..."
  data-node-id="2:14"
>
  Create Account
</p>
```

- サイズ: 240×43
- 背景: `rgba(21,21,21,0.65)` + `backdrop-blur(4px)`
- ボーダー: 0.5px `rgba(217,217,217,0.8)`
- 角丸: 6px
- テキスト: white, 13px, SF Pro Display Regular, 中央揃え

## Secondary(セグメント型)Button(product screen, node `6:66`/`6:71` + `6:69`/`6:70`)

```jsx
<div className="absolute backdrop-blur-[4px] bg-[#151515] h-[47px] left-[calc(25%+59.25px)] rounded-[6px] top-[374px] w-[198px]" data-node-id="6:66" />
<div className="absolute backdrop-blur-[4px] bg-[#151515] h-[47px] left-[25px] rounded-[6px] top-[374px] w-[108px]" data-node-id="6:71" />
<p ... text-white ...>Size 12M</p>
<p ... text-white ...>Buy for $338</p>
```

- サイズ: 108×47 / 198×47(2つ並んだセグメント)
- 背景: `#151515` + `backdrop-blur(4px)`
- 角丸: 6px
- テキスト: white, 14px, SF Pro Display Medium

## 実装方針(3スタック共通)
- **Primary** / **Secondary** の2 variantとして扱う(共通トークンでは背景の濃さ・フォントウェイトの違いのみ)。
- **Size(S/M/L)・Disabled variantはFigma上にサンプルが存在しないため、design-system-rules.mdのトークンから外挿する**(Visual stateとして明記)。
- 画像・カスタムフォント依存なし(SF Pro Displayは各スタックでシステムフォント/汎用フォントに置換して問題ない)。
