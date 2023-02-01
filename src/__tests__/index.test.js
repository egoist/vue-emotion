import { render, waitFor } from '@testing-library/vue'
import { VueEmotion, createGlobalStyle, styled } from '../index'

describe('VueEmotion', () => {
  it('createGlobalStyle', () => {
    const GlobalStyle = createGlobalStyle`
      body {
        background: red;
      }
    `
    const { container } = render({
      mixins: [VueEmotion],
      template: `
        <div>
          <GlobalStyle />
        </div>
      `,
      components: {
        GlobalStyle,
      }
    })

    const args = document.querySelectorAll('[data-emotion="css"]')
    expect(args[0].innerHTML).toMatchSnapshot()

    expect(container).toMatchSnapshot()
  })

  it('styled', () => {
    const Button = styled('button')`
      font-size: 15px;
    `

    const { container } = render({
      mixins: [VueEmotion],
      template: `
        <div>
          <Button class="emotion-vue">test</Button>
        </div>
      `,
      components: {
        Button,
      }
    })

    const args = document.querySelectorAll('[data-emotion="css"]')
    expect(args[1].innerHTML).toMatchSnapshot()

    expect(container).toMatchSnapshot()
  })
})
