import { h } from 'vue'
import { styled } from '@egoist/vue-emotion'

const Button = styled('button')`
  border: 2px solid pink;
  padding: 10px;
  font-size: 1rem;
`

export default {
  render() {
    return h('div', {}, [
      h(Button, {}, ['Hello'])
    ])
  }
}
