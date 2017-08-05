import Vue from 'vue'
import styled, { theme } from '../src'

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

const Controls = styled('div')`
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
`

const App = {
  name: 'app',

  data() {
    return {
      theme: {
        mode: 'light'
      }
    }
  },

  provide() {
    return {
      theme: this.theme
    }
  },

  methods: {
    updateMode(e) {
      this.theme.mode = e.target.value
    }
  },

  render() {
    return (
      <div>
        <Controls>
          <select onChange={this.updateMode}>
            <option
              value="light"
              selected={this.theme.mode === 'light'}>
              Light
            </option>
            <option
              value="dark"
              selected={this.theme.mode === 'dark'}>
              Dark
            </option>
          </select>
        </Controls>
        <Button class="foo">Button</Button>
      </div>
    )
  }
}

new Vue({
  el: '#app',
  render: h => h(App)
})
