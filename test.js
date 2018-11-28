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
  display: ${props => props.display};
  padding: ${props => props.padding};
  color: ${props => (props.valid ? 'green' : 'red')};
  background-color: ${props => (props.theme === 'light' ? 'white' : 'blue')};
`

const Box = {
  name: 'Box',
  extends: StyledBox
}

test('it should apply styles to a component with custom classes and props', () => {
  const wrapper = mount(Box, {
    attrs: {
      class: 'testing'
    },
    propsData: {
      display: 'flex',
      padding: '4rem'
    }
  })
  expect(wrapper.element).toMatchSnapshot()
})

test('"as" attribute should work as expected', () => {
  const wrapper = mount(Box, {
    propsData: {
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
    propsData: {
      theme: 'light'
    }
  })

  expect(wrapper.element).toMatchSnapshot()
})

// const StyledFlex = styled(Box)`
//   display: flex;
//   color: black;
// `

// const Flex = {
//   name: 'Flex',
//   props,
//   render() {
//     return <StyledFlex>Hello</StyledFlex>
//   }
// }

// test('it should be able to overrides styles of a component', () => {
//   const wrapper = mount(Flex, {
//     propsData: {
//       padding: '20px'
//     }
//   })
//   expect(wrapper.element).toMatchSnapshot()
// })
