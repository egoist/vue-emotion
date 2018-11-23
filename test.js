import { mount } from '@vue/test-utils'
import styled from './src'

const StyledDiv = styled('div')`
  background-color: black;
  color: white;
`

const Box = {
  name: 'Box',
  props: {
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
  },
  render() {
    return <div>Hello world</div>
  }
}

const StyledBox = styled(Box)`
  display: ${props => props.display};
  padding: ${props => props.padding};
  color: ${props => (props.valid ? 'green' : 'red')};
  background-color: ${props => (props.theme === 'light' ? 'white' : 'blue')};
`

test('it should apply styles to a regular html element', () => {
  const wrapper = mount(StyledDiv)
  expect(wrapper.element).toMatchSnapshot()
})

test('it should apply styles to a component', () => {
  const wrapper = mount(StyledBox, {
    propsData: {
      display: 'flex'
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('withComponent works as expected', () => {
  const StyledBoxSection = StyledBox.withComponent('section')

  const wrapper = mount(StyledBoxSection, {
    slots: {
      default: 'Hello world'
    },
    propsData: {
      padding: '2em',
      valid: true
    }
  })

  expect(wrapper.element).toMatchSnapshot()
})
