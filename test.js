import { mount } from '@vue/test-utils'
import styled from './src'

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
    return <div>Hello</div>
  }
}

const StyledBox = styled(Box)`
  display: ${props => props.display};
  padding: ${props => props.padding};
  color: ${props => (props.valid ? 'green' : 'red')};
  background-color: ${props => (props.theme === 'light' ? 'white' : 'blue')};
`

test('should render html with the correct styles', () => {
  const wrapper = mount(StyledBox, {
    propsData: {
      display: 'flex'
    },
    attrs: {
      theme: 'light'
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('withComponent works as expected', () => {
  const StyledBoxSection = StyledBox.withComponent('section')

  const wrapper = mount(StyledBoxSection, {
    propsData: {
      padding: '2em',
      valid: true,
      theme: 'light'
    }
  })

  expect(wrapper.element).toMatchSnapshot()
})
