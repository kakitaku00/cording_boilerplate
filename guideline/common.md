## インデント

原則半角スペース2つ分を使用すること

## 画像倍率

SP・Retinaディスプレイを考慮するため、原則2倍のサイズで書き出して使用すること
srcsetなどで出し分けを行うことを想定し、2倍サイズで書き出したファイル名には`@2x`を付与すること
例: image.png / image@2x.png

## 画像の圧縮

納品時、画像は圧縮をかけて納品すること

### 推奨設定

- mozjpeg => Quality: 95
- pngquant => Quality:0.8 - 0.9
- gifsicle => デフォルト
- svgo => デフォルト

## 画像の使用

PC/SPで画像を切替える場合、不要なリソースの読み込みを防止するため`<picture>`タグを使用すること
https://developer.mozilla.org/ja/docs/Web/HTML/Element/picture

## Webフォント

Webフォントを利用する際は、パフォーマンス面で影響がある旨をクライアントに合意した上で利用を行ってください。
また、読み込む際は、非同期で読み込むよう以下の指定でフォントを読み込んでください。

```html
<link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
  as="style"
  onload="this.rel='stylesheet'"
/>
```

## Webフォント最適化

Webフォントの読み込みによるチラツキを抑制するため、`webfontloader`を用いて最適化を推奨しています。
クライアントの要件次第で以下の対応を行い、Webフォントの読み込みが完了するまで画面を表示させない等の対応を行ってください。

```js
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Noto Serif JP', 'Noto Sans JP'], // 読み込むWebフォントを指定
  },
})
```

```css
html.wf-active {
  visibility: visible;
}
```
