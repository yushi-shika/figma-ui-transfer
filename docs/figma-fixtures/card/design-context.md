# Card — design-context (raw, get_design_context出力より)

出典: fileKey `cobQGyPNOOx3MyrDicL75d`, node `6:29`(product screen)。2026-07-11抽出。
画像アセットは `./product-hero.png` としてローカル保存済み(元URLは7日で失効するため)。

## Product Card(node `6:64` 画像 + `6:65` タイトル)

```jsx
<div
  className="absolute border-[0.5px] border-[rgba(217,217,217,0.96)] border-solid h-[264px] left-[25px] rounded-[8px] top-[53px] w-[327px]"
  data-node-id="6:64"
>
  <img className="... object-cover rounded-[8px] size-full" src={product-hero.png相当} />
</div>
<p className="font-['SF_Pro_Display:Medium'] text-[14px] text-black ..." data-node-id="6:65">
  Air Jordan 1 Retro High OG 'University Blue'
</p>
```

- 画像エリア: 327×264、角丸8px、ボーダー0.5px `rgba(217,217,217,0.96)`、`object-fit: cover`
- タイトル: black, 14px, SF Pro Display Medium(画像の下、余白あり)
- 画像自体: `product-hero.png`(644×608、正方形に近いアスペクト。カード表示時は327×264にクロップ)

## Default / Selected variantについて
Figma上には**Selected(選択状態)の見た目は存在しない**(Default表示のみ)。Selected variantは各スタックで「ボーダー色をアクセントカラーに変える」等、design-system-rules.mdのトークンから外挿して実装する(Visual state・外挿である旨を明記)。

## 実装方針(3スタック共通)
- 画像はローカル保存した `product-hero.png` を各スタックのアセットとしてコピーして使用する(外部URLに依存しない)。
- タイトルテキストのみを必須要素とし、価格・説明文・レコメンド行など画面固有の要素はCardコンポーネントのスコープ外とする(Cardは「画像+タイトル」の最小構成として扱う)。
