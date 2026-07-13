# Screen: Signup — 完全な画面合成用fixture

出典: fileKey `cobQGyPNOOx3MyrDicL75d`, node `2:4`(signup screen)。2026-07-11に`get_design_context`で取得済み(追加のFigma呼び出しは発生していない)。
画像アセットは同一ディレクトリに保存済み:
- `background.png`(元画像名 `fear-of-god-essentials-summer-2020-15 1`、797×1039相当で配置、`object-fit: cover`)
- `logo.png`(元画像名 `Logo`、133×130で配置)

## キャンバスサイズ
375×812(iPhone比率)

## レイアウト(位置・サイズは375×812キャンバス内の絶対座標)

```jsx
<div className="bg-white relative size-full" data-name="signup screen">
  {/* 背景写真(全面, object-cover) */}
  <div className="absolute h-[1039px] left-[-52px] top-[-60px] w-[797px]">
    <img className="object-cover size-full" src="background.png" />
  </div>

  {/* ロゴ(円環デザイン, 背景の上に重なる) */}
  <div className="absolute h-[130px] left-[121px] top-[61px] w-[133px]">
    <img className="object-cover size-full" src="logo.png" />
  </div>

  {/* Full Name input */}
  <label className="absolute left-[48px] top-[348px] text-[13px] text-black">Full Name</label>
  <div className="absolute bg-[rgba(255,255,255,0.65)] backdrop-blur-[4px] border-[0.5px] border-[rgba(217,217,217,0.96)] rounded-[6px] h-[43px] left-[48px] top-[373px] w-[288px]">
    <span className="text-[13px] text-black">Reggie James</span> {/* placeholder相当 */}
  </div>

  {/* Email input */}
  <label className="absolute left-[48px] top-[432px] text-[13px] text-black">Email</label>
  <div className="absolute bg-[rgba(255,255,255,0.65)] backdrop-blur-[4px] border-[0.5px] border-[rgba(217,217,217,0.96)] rounded-[6px] h-[43px] left-[48px] top-[457px] w-[288px]">
    <span className="text-[13px] text-black">reggiejames001@website.com</span>
  </div>

  {/* Password input (右にhideトグル) */}
  <label className="absolute left-[48px] top-[528px] text-[13px] text-black">Password</label>
  <div className="absolute bg-[rgba(255,255,255,0.65)] backdrop-blur-[4px] border-[0.5px] border-[rgba(217,217,217,0.96)] rounded-[6px] h-[43px] left-[48px] top-[553px] w-[288px]">
    <span className="text-[13px] text-black">theBirdiSth3W0rD</span>
    <span className="absolute right-[24px] text-[13px] text-[rgba(0,0,0,0.44)]">hide</span>
  </div>

  {/* Create Accountボタン(Primary, 中央寄せ) */}
  <div className="absolute bg-[rgba(21,21,21,0.65)] backdrop-blur-[4px] border-[0.5px] border-[rgba(217,217,217,0.8)] rounded-[6px] h-[43px] left-[72px] top-[648px] w-[240px]">
    <span className="text-[13px] text-white">Create Account</span>
  </div>

  {/* サブテキスト */}
  <p className="absolute left-[98px] top-[701px] text-[13px] text-black">
    Already have an account <b>Sign In</b>
  </p>
  <p className="absolute left-[147px] top-[768px] text-[13px] text-black">Privacy Policy</p>
</div>
```

## 実装方針
- 既存の `AppInput`/`Input`(default state)と `AppButton`/`Button`(primary variant)コンポーネントをそのまま使い、上記座標・背景写真・ロゴを組み合わせて **1枚の完成した画面**として組み立てる。
- 各スタックのカタログ(Widgetbook/Storybook)には、既存のコンポーネント単位のUseCase/Storyに加えて、**「Screens > Signup」という1つの新しいUseCase/Storyを追加**し、この画面全体をプレビューできるようにする。
- 背景写真・ロゴは `background.png`/`logo.png` をそのまま各プロジェクトのアセットとしてコピーして使用する。
- フォントは既存方針通りSF Pro Display→システムフォントへのフォールバックを踏襲。
