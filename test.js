import { mount } from '@vue/test-utils'
import styled, { css } from './src'

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

const displayStyles = ({ display }) => css`
  display: ${display};
`

const paddingStyles = ({ padding }) => css`
  padding: ${padding};
`

const StyledBox = styled('div', { props })`
  text-align: center;
  ${displayStyles};
  ${paddingStyles};
  color: ${props => (props.valid ? 'green' : 'red')};
  background-color: ${props => (props.theme === 'light' ? 'white' : 'blue')};
`

const Box = {
  name: 'Box',
  render() {
    return (
      <StyledBox {...{ props: this.$props, attrs: this.$attrs }}>
        Hello
      </StyledBox>
    )
  }
}

test('it should apply styles to a component with custom classes and props', () => {
  const wrapper = mount(Box, {
    attrs: {
      display: 'flex',
      as: 'main'
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('"as" attribute should work as expected', () => {
  const wrapper = mount(Box, {
    attrs: {
      as: 'section'
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('withComponent should work as expected', () => {
  const wrapper = mount(StyledBox.withComponent('aside'))
  expect(wrapper.element).toMatchSnapshot()
})

test('theme injection should work as expected', () => {
  const wrapper = mount(Box, {
    provide: {
      theme: 'light'
    }
  })

  expect(wrapper.element).toMatchSnapshot()
})

test('can set the theme via an attribute', () => {
  const wrapper = mount(Box, {
    attrs: {
      theme: 'light'
    }
  })

  expect(wrapper.element).toMatchSnapshot()
})
