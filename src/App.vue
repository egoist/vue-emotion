<template>
  <div>
    <StyledInput type="number" block/>
  </div>
</template>

<script>
import styled from "./";

const props = {
  type: String,
  block: Boolean
};

const StyledInput = styled("input", { props })({
  backgroundColor: "black"
});

export default {
  name: "App",
  components: {
    StyledInput
  }
};
</script>
