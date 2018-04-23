import { IntrinsicElementAttributes } from 'vue-tsx-support/types/dom'

declare module 'vue-emotion' {
  const styled: IntrinsicElementAttributes
  export default styled
  export const css: any
  export const injectGlobal: any
}
