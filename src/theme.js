function getThemeValues(name, values, ctx) {
  const key = ctx.injections.theme[name]
  return values[key]
}

function theme(name, values) {
  return (props, ctx) => {
    return getThemeValues(name, values, ctx)
  }
}

// eslint-disable-next-line no-multi-assign
theme.variants = theme.withProp = (prop, name, values) => {
  return (props, ctx) => {
    const actualValues = values(props[prop])
    return getThemeValues(name, actualValues, ctx)
  }
}

export default theme
