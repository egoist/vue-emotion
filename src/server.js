import { extractCritical } from "@emotion/server";

export const renderStyle = (html) => {
  const { css, ids } = extractCritical(html);
  return `<style data-emotion-${cache.key}="${ids.join(" ")}">${css}</style>`;
};
