import Vue from 'vue'
import { styled } from 'vue-emotion'

const Button = styled('button')`
  color: ${props => props.theme.color};
  font-size: 1rem;
`

const BlueButton = styled(Button)`
  color: blue;
  font-size: 33px;
  background: yellow;
`

const Input = styled('input')`
  border: 1px solid #e2e2e2;
  padding: 10px;
  font-size: 1rem;
`

new Vue({
  el: '#app',
  data: {
    count: 0,
    initialInput: 'some text'
  },
  provide() {
    return {
      theme: {
        color: 'green'
      }
    }
  },
  render() {
    return (
      <div>
        <Button onClick={() => this.count++}>{this.count}</Button>
        <BlueButton onClick={() => this.count++}>{this.count}</BlueButton>
        <hr />
        <Input value={this.initialInput} />
      </div>
    )
  }
})
