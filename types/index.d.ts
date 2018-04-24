// TypeScript Version: 2.3
// tslint:disable-next-line:no-implicit-dependencies
import Vue from 'vue'
import { TsxComponent } from 'vue-tsx-support/lib/api'
import { Interpolation as EmotionInterpolation } from 'emotion'

export * from 'emotion'

export type InterpolationFn<Props = {}> = (
  props: Props
) => EmotionInterpolation | InterpolationFn<Props>

export type InterpolationTypes<Props = {}> =
  | InterpolationFn<Props>
  | EmotionInterpolation

export type Interpolation<Props = {}> =
  | InterpolationTypes<Props>
  | Array<InterpolationTypes<Props>>

export interface Options {
  string?: string
}

type ElementProps<
  Tag extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[Tag]

export interface StyledComponent<Props, IntrinsicProps>
  extends TsxComponent<Vue, Props & IntrinsicProps> {
  withComponent<Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag
  ): StyledComponent<Props, ElementProps<Tag>>

  withComponent(component: any): StyledComponent<Props, {}>

  displayName: string
  __emotion_styles: string[]
  __emotion_base: string | {}
  __emotion_real: ThemedVueEmotionInterface
}

export type ObjectStyleAttributes =
  | object
  | object[]
  | { [key: string]: ObjectStyleAttributes }

export interface CreateStyled<Props, IntrinsicProps> {
  // overload for template string as styles
  (
    strings: TemplateStringsArray,
    ...vars: Array<Interpolation<Props & IntrinsicProps>>
  ): StyledComponent<Props, IntrinsicProps>

  // overload for object as styles
  (
    ...styles: Array<
      | ObjectStyleAttributes
      | ((props: Props & IntrinsicProps) => ObjectStyleAttributes)
    >
  ): StyledComponent<Props, IntrinsicProps>
}

type ShorthandsFactories = {
  [Tag in keyof JSX.IntrinsicElements]: {
    // overload for template string as styles
    <Props = {}>(
      strings: TemplateStringsArray,
      ...vars: Array<Interpolation<Props & JSX.IntrinsicElements[Tag]>>
    ): StyledComponent<Props, ElementProps<Tag>>

    // overload for object as styles
    <Props = {}>(
      ...styles: Array<
        | ObjectStyleAttributes
        | ((props: Props & JSX.IntrinsicElements[Tag]) => ObjectStyleAttributes)
      >
    ): StyledComponent<Props, ElementProps<Tag>>
  }
}

export interface ThemedVueEmotionInterface extends ShorthandsFactories {
  // overload for dom tag
  <Props, Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: Options
  ): // tslint:disable-next-line:no-unnecessary-generics
  CreateStyled<Props, ElementProps<Tag>>

  // overload for component
  <Props, CustomProps>(
    component: any,
    options?: Options
  ): // tslint:disable-next-line:no-unnecessary-generics
  CreateStyled<Props & CustomProps, {}>
}

export interface ThemedVueEmotionModule {
  default: ThemedVueEmotionInterface
}

declare const styled: ThemedVueEmotionInterface
export default styled
