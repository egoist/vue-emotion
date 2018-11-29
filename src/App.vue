<template>
  <div>
    <StyledDiv tabindex="0" title="Testing">Hello World</StyledDiv>
    <StyledDiv display="inline-block" as="span">Hello World</StyledDiv>
    <StyledMain>Hello</StyledMain>
    <OverrideStyles as="aside" display="flex">Hello World</OverrideStyles>
  </div>
</template>

<script>
import styled from "./";

const props = {
  display: {
    type: String,
    default: "block"
  }
};

const StyledDiv = styled("div", { props })`
  background-color: black;
  color: white;
  padding: 1em;
  display: ${props => props.display};
`;

const StyledMain = StyledDiv.withComponent("main");

const OverrideStyles = styled(StyledDiv)`
  background-color: red;
`;

export default {
  name: "App",
  components: {
    StyledDiv,
    StyledMain,
    OverrideStyles
  }
};
</script>
