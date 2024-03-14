## バリデーション

HTML Living Standardに沿ったコーディングを行い、エラーがない事を確認してください。

## ドキュメントタイプ

HTML5を使用してください。

```html
<!doctype html>
```

## 文字コード

原則UTF-8とする。
なお文字コードは`<title>`より前に書くこと。

```html
<meta charset="UTF-8" /> <title>タイトル</title>
```

## viewport

viewportは原則以下のように設定すること。

### レスポンシブの場合

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
```

### 固定幅の場合

```html
<meta name="viewport" content="width=1080" />
```

## canonical

別途指示がない限り、原則記載するページのURLを絶対パスで設定してください。
index.htmlは省略してください。
プロトコルは省略しないでください。

## 引用符

属性値の引用符は、ダブルクオーテーションを使用すること。

## 画像

### alt属性

alt属性は必ず指定してください。代替えテキストがない場合は`alt=""`を指定してください。

### width/height属性

レイアウトシフト防止の為、width・height属性はできる限り指定を行ってください。

## 大文字・小文字

すべて小文字で統一すること

### 非推奨

```html
<a href="/sample/"><img src="sampleImage.png" alt="Sample" /></a>
```
