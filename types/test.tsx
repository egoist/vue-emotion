import styled, { flush, ThemedVueEmotionInterface } from './'

let Component
let mount

/*
 * Inference HTML Tag Props
 */
Component = styled.div({ color: 'red' })
mount = <Component onClick={(event: any) => event} />

Component = styled('div')({ color: 'red' })
mount = <Component onClick={(event: any) => event} />

Component = styled.div`
  color: red;
`
mount = <Component onClick={(event: any) => event} />

Component = styled('div')`
  color: red;
`
mount = <Component onClick={(event: any) => event} />

Component = styled.a({ color: 'red' })
mount = <Component href="#" />

Component = styled('a')({ color: 'red' })
mount = <Component href="#" />

/*
 * Passing custom props
 */
interface CustomProps {
  lookColor: string
}

Component = styled.div<CustomProps>(
  { color: 'blue' },
  props => ({
    background: props.lookColor
  }),
  props => ({
    border: `1px solid ${props.lookColor}`
  })
)
mount = <Component lookColor="red" />

Component = styled<CustomProps, 'div'>('div')({ color: 'blue' }, props => ({
  background: props.lookColor
}))
mount = <Component lookColor="red" />

const anotherColor = 'blue'
Component = styled<CustomProps, 'div'>('div')`
  background: ${props => props.lookColor};
  color: ${anotherColor};
`
mount = <Component lookColor="red" />

/*
 * With explicit theme
 */

interface Theme {
  color: {
    primary: string
    secondary: string
  }
}

const _styled = styled as ThemedVueEmotionInterface<Theme>

Component = _styled.div`
  color: ${props => props.theme.color.primary}
`
mount = <Component onClick={(event: any) => event} />

/*
 * withComponent
 */

interface CustomProps3 {
  bgColor: string
}

Component = styled.div<CustomProps3>(props => ({
  bgColor: props.bgColor
}))

const Link = Component.withComponent('a')
mount = <Link href="#" bgColor="red" />

const Button = Component.withComponent('button')
mount = <Button type="submit" bgColor="red" />

/*
 * Can use emotion helpers importing from vue-emotion
 */

flush()
