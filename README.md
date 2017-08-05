# emotion-vue

[![NPM version](https://img.shields.io/npm/v/emotion-vue.svg?style=flat)](https://npmjs.com/package/emotion-vue) [![NPM downloads](https://img.shields.io/npm/dm/emotion-vue.svg?style=flat)](https://npmjs.com/package/emotion-vue) [![CircleCI](https://circleci.com/gh/egoist/emotion-vue/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/emotion-vue/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

*[emotion](https://github.com/tkh44/emotion) is the Next Generation of CSS-in-JS.*

## Install

```bash
yarn add emotion emotion-vue
```

## Usage

Add the babel plugin first:

```json
{
  "plugins": [
    "emotion/babel"
  ]
}
```

Then create your styled component:

```js
import styled from 'emotion-vue'

const Button = styled('button')`
  font-size: 15px;
`

const PinkButton = styled(Button)`
  color: pink
`

new Vue({
  render() {
    return (
      <div>
        <Button>normal button</Button>
        <PinkButton>pink button</PinkButton>
      </div>
    )
  }
})
```

Refer to https://github.com/tkh44/emotion for more docs.

## Theming

Basically it works like [styled-theming](https://github.com/thejameskyle/styled-theming):

```js
import styled, { theme } from 'emotion-vue'

const color = theme('mode', {
  light: 'black',
  dark: 'white'
})

const backgroundColor = theme('mode', {
  light: 'white',
  dark: 'black'
})

const Button = styled('button')`
  color: ${color};
  background-color: ${backgroundColor};
  border: 1px solid ${color};
  padding: 10px 20px;
`

new Vue({
  data: {
    theme: {
      mode: 'light'
    }
  },

  provide() {
    return {
      theme: this.theme
    }
  },

  render() {
    return <Button>hi</Button>
  }
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**emotion-vue** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/emotion-vue/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
