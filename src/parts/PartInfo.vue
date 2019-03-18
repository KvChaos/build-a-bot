<template>
  <div>
    <h1>{{part.title}}</h1>
    <div>{{part.description}}</div>
  </div>
</template>

<script>
// import parts from "../data/parts";
import getPartsMixin from "./get-parts-mixin";

export default {
  name: "PartInfo",
  // See routes file; note that the path to this component has props:true set; this breaks the coupling
  // of this component with the router.  Route params are passed in as properties.
  mixins: [getPartsMixin],
  props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validate(value) {
        return Number.isInteger(Number(value));
      }
    }
  },
  computed: {
    part() {
      const { partType, id } = this; // use this keyword to read the props off this component.
      return this.parts[partType].find(part => part.id == Number(id));
    }
  }
};
</script>

<style>
</style>
