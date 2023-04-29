# ひらがなをローマ字に変換するよ

タイピングゲームが作れるよ ✌️

## 使い方サンプル

`npm install hiragana-parser` や `yarn add hiragana-parser` でパッケージを入れれます
Deno の場合は `npm:hiragana-parser` をインポートします

### サンプル 1

寿司打のようなタイピングゲームを作りたい場合は以下のように使えます

#### コード

```typescript
import { HiraganaParser } from "hiragana-parser";

// パースしたいひらがなを引数に渡してゲーム向けパーサーのインスタンスを作る
const parser = new HiraganaParser({ hiraganas: "きんにく" });
// ユーザーの入力した文字をパーサーに渡す
console.log(parser.input("k"));
console.log(parser.input("n"));
console.log(parser.input("i"));
// 入力が完了しているかチェックする
console.log(parser.isComplete());
// 入力済みの文字
console.log(parser.inputedRoma);
// 入力が終わっていない文字(いろんな組み合わせがあるので、その中から最短のもの)
console.log(parser.notInputedRoma);
// 入力済みのひらがな
console.log(parser.inputedHiragana);
// 入力が終わっていないひらがな
console.log(parser.notInputedHiragana);
```

#### 出力

```
true    // k は入力できるので受け付ける
false   // n は入力できないので拒否する
true    // i は入力できるので受け付ける
false   // 最後まで入力されていないのでfalse
ki      // ki まで入力済み
nnniku  // nnniku があと必要な入力
き      // ki まで入力済み
んにく   // nnniku があと必要な入力
```

### サンプル 2

ひらがなから入力できる全ローマ字入力パターンを取得することもできます

#### コード

```typescript
import { hiraganaToRomas } from "hiragana-parser";

console.log(hiraganaToRomas("ねっこ"));
```

#### 出力

```
[
  'nekko',    'necco',
  'neltuko',  'neltuco',
  'nextuko',  'nextuco',
  'neltsuko', 'neltsuco',
  'nextsuko', 'nextsuco'
]
```

### サンプル 3

ブラウザ標準 ESM

####

```javascript
<script type="module">
  import {hiraganaToRomas} from
  "https://packages.obake.land/hiragana-parser/index.min.js"
  console.log(hiraganaToRomas('やっほー'))
</script>
```

### キー配列のカスタム

キー配列をカスタマイズしたい場合(「ci」で「き」と入力みたいなの)は 第二引数に `KeyConfigs` を渡すとカスタマイズできます、詳細は型と初期値の`KEY_CONFIGS`を参照してください

# Lisence

This project is licensed under the MIT License, see the LICENSE.txt file for details
