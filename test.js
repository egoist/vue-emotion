import { mount } from '@vue/test-utils'
import styled from './src'

const props = {
  display: {
    type: String,
    default: 'block'
  },
  padding: {
    type: String,
    default: '10px'
  },
  valid: {
    type: Boolean,
    default: false
  }
}

const StyledBox = styled('div', { props })`
  text-align: center;
  display: block;
  padding: ${props => props.padding};
  color: ${props => (props.valid ? 'green' : 'red')};
  background-color: ${props => (props.theme === 'light' ? 'white' : 'blue')};
`

const Box = {
  name: 'Box',
  render() {
    return <StyledBox valid>Hello</StyledBox>
  }
}

test('it should apply styles to a component', () => {
  const wrapper = mount(StyledBox, {
    context: {
      scopedSlots: {
        default: 'Hello World'
      },
      props: {
        display: 'block'
      }
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

const StyledFlex = styled(StyledBox)`
  display: flex;
  color: black;
`

test('it should be able to overrides styles of a component', () => {
  const wrapper = mount(StyledFlex, {
    context: {
      props: {
        padding: '20px'
      }
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})
