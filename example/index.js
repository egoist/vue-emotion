import Vue from 'vue'
import styled from 'vue-emotion'

const Button = styled('button')`
  color: ${props => props.theme.color};
  font-size: 1rem;
`

const BlueButton = styled(Button)`
  color: blue;
  font-size: 33px;
  background: yellow;
`

const Container = styled('div')`
  ${BlueButton.toString()} {
    color: orange;
  }
`

new Vue({
  el: '#app',
  data: {
    count: 0
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
      <Container>
        <Button onClick={() => this.count++}>{this.count}</Button>
        <BlueButton onClick={() => this.count++}>{this.count}</BlueButton>
      </Container>
    )
  }
})
