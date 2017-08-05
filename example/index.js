import Vue from 'vue'
import styled from '../src'

const PinkButton = styled('button')`
  background-color: pink;
  border: 1px solid pink;
  padding: 10px 20px;
`

const PinkRoundButton = styled(PinkButton)`
  border-radius: 5px;
`

const App = {
  render() {
    return (
      <div>
        <PinkButton>Pink Button</PinkButton>{' '}
        <PinkRoundButton>Pink Round Button</PinkRoundButton>
      </div>
    )
  }
}

new Vue({
  el: '#app',
  render: h => h(App)
})
