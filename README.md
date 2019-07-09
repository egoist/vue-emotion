# vue-emotion

[![NPM version](https://img.shields.io/npm/v/vue-emotion.svg?style=flat)](https://npmjs.com/package/vue-emotion) [![NPM downloads](https://img.shields.io/npm/dm/vue-emotion.svg?style=flat)](https://npmjs.com/package/vue-emotion)

*[Emotion](https://emotion.sh/docs) is the Next Generation of CSS-in-JS.*

## Install

```bash
yarn add emotion vue-emotion
```

## Table of Contents

<!-- toc -->

- [Usage](#usage)
- [Contributing](#contributing)
- [Author](#author)

<!-- tocstop -->

## Usage


Create your styled component:

```js
import styled from 'vue-emotion'

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

Refer to https://emotion.sh/docs for more docs.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**vue-emotion** © [Sky Foundry](https://github.com/sky-foundry/vue-emotion), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Sky Foundry with help from [contributors](https://github.com/sky-foundry/vue-emotion/contributors).

> [https://skyfoundry.agency](https://skyfoundry.agency) · Website [github.com/sky-foundry/vue-emotion](https://github.com/sky-foundry/vue-emotion) · GitHub 
