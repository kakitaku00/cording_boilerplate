## CSS設計

BEMの概念を取り入れ、メンテナンス性と再利用性を考慮したCSS設計を行う。

## セレクター指定

セレクターによる詳細度を低くし、単一セレクターによる記述を基本とする。

### 推奨

```css
.block__element {
}
```

### 非推奨

```css
div.block ul.block__element {
}
```

## Charset

原則UTF-8とする。

## ベンダープレフィックス

対処環境に応じて、適切なベンダープレフィックスを付与すること。

```css
.block {
  -ms-animation: fadeIn 0.3s;
  -moz-animation: fadeIn 0.3s;
  -webkit-animation: fadeIn 0.3s;
  animation: fadeIn 0.3s;
}
```

## 宣言の終止符

宣言の後ろに毎回セミコロンを付けること。

### 推奨

```css
.test {
  height: 100px;
}
```

### 非推奨

```css
.test {
  height: 100px;
}
```

## id

idを参照しスタイルは適用しないこと。

## 命名規則

BEMの記法に則って命名すること。
なお、ネストされたelementの命名には階層構造を命名に含めないこと。

### 非推奨

```html
<div class="block">
  <div class="block__element-a">
    <div class="block__element-a__element-b"></div>
  </div>
</div>
```

### 推奨

```html
<div class="block">
  <div class="block__element-a">
    <div class="block__element-b"></div>
  </div>
</div>
```

### 接頭詞

既存ページのCSSを読み込んだ改修など、class名の重複が発生する可能性がある環境で作業を行う場合は、class名にPJに応じた接頭詞を付与すること。

```css
.sm-block {
}
.sm-block__element {
}
```

## タイプセレクター

タイプセレクターを使用するのは避けること。

### 非推奨

```
ul#example {}
div.error {}
```

## minify

納品を行う際は、基本的にminify化を行うこと。

## フォーマット

原則以下の指定順でプロパティを定義してください。

1. Positioning: ポジショニングとボックスモデルに関連するプロパティ。（position, top, right, bottom, left, z-index, display, float, width, heightなど。）
2. Box Model: ボックスモデルに直接関連するプロパティ。（margin, border, paddingなど。）
3. Typographic: テキストとフォントに関連するプロパティ。（font, line-height, text-align, text-transformなど。）
4. Visual: 色や背景、リスト、テーブルなどのビジュアルに関連するプロパティ。（color, background, list-styleなど。）
5. Misc: その他のプロパティで、上記のどのカテゴリにも属さないもの。（overflow, cursor, user-selectなど。）

## 大文字・小文字

すべて小文字で統一すること

### 非推奨

```html
.example { color: #E5E5E5; }
```
