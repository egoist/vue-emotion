import { serializeStyles } from "@emotion/serialize";

function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert("", serialized, cache.sheet, true);
  }
}

export const createGlobalStyle = (...styles) => ({
  inheritAttrs: false,
  inject: {
    $emotionCache: {
      default: null,
    }
  },
  render({ $parent, $attrs, $props }) {
    const cache = $parent.$emotionCache || this.$emotionCache;
    const mergedProps = { ...$props, ...$attrs };
    const serialized = serializeStyles(styles, cache.registered, mergedProps);
    insertWithoutScoping(cache, serialized);
  },
});
