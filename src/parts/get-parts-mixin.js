export default {
  created() {
    this.$store.dispatch('robots/getParts');
  },
  computed: {
    parts() {

      // If the parts are not in the store, return a reasonable default object.
      return this.$store.state.robots.parts || {
        heads: [],
        arms: [],
        torsos: [],
        bases: [],
      };
    }
  }


}
