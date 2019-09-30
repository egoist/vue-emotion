# vue-emotion

[![NPM version](https://img.shields.io/npm/v/@egoist/vue-emotion.svg?style=flat)](https://npmjs.com/package/@egoist/vue-emotion) [![NPM downloads](https://img.shields.io/npm/dm/@egoist/vue-emotion.svg?style=flat)](https://npmjs.com/package/@egoist/vue-emotion) [![CircleCI](https://circleci.com/gh/egoist/vue-emotion/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/vue-emotion/tree/master) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://patreon.com/egoist)

_[emotion](https://github.com/tkh44/emotion) is the Next Generation of CSS-in-JS._

## Install

```bash
yarn add @egoist/vue-emotion
```

## Table of Contents

<!-- toc -->

- [Usage](#usage)
  * [Theming](#theming)
  * [Global styles](#global-styles)
- [Caveats](#caveats)
  * [Component selector doesn't work](#component-selector-doesnt-work)
- [Contributing](#contributing)
- [Author](#author)

<!-- tocstop -->

## Usage

Create your styled component:

```js
import { styled } from '@egoist/vue-emotion'

const Button = styled('button')`
  font-size: 15px;
`

const PinkButton = styled(Button)`
  color: pink;
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

Refer to https://emotion.sh for more docs.

### Theming

Using `provide/inject`:

```js
new Vue({
  provide() {
    return {
      theme: this.theme
    }
  },
  data() {
    return {
      theme: 'dark'
    }
  },
  render() {
    const Button = styled.button`
      color: ${props => (props.theme === 'dark' ? 'white' : 'black')};
    `
    return <Button>Hello</Button>
  }
})
```

I do know that `provide/inject` is NOT recommended in generic application code, but before we find a better solution, use it as a work-around.

### Global styles

```js
import { Global, css } from '@egoist/vue-emotion'

<Global styles={[
  css`
    body {
      margin: 0;
    }
  `
]} />
```

## Caveats

### Component selector doesn't work

```js
const Container = styled.div`
  ${Button} {
    color: red;
  }
`
```

Component selector (as seen above) requires `babel-plugin-emotion` which only works for React.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**vue-emotion** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/vue-emotion/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@\_egoistlily](https://twitter.com/_egoistlily)
