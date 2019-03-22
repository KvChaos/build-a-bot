<template>
  <div class="part" :class="position">
    <!-- How to navigate with params from javascript code. -->
    <!-- <img :src="selectedPart.src" @click="showPartInfo()"> -->
    <!-- How to navigate with params using :to binding; note the router-link surrounding the image -->
    <router-link
      :to="{ 
      name: 'Parts', 
      params: { id: this.selectedPart.id, partType: this.selectedPart.type } 
      }"
    >
      <img :src="selectedPart.src">
    </router-link>
    <button @click="selectPreviousPart()" class="prev-selector"></button>
    <button @click="selectNextPart()" class="next-selector"></button>
    <span v-pin="{top: '10px', left: '5px'}" class="sale" v-show="selectedPart.onSale">Sale!</span>
  </div>
</template>

<script>
  // import pinDirective from '../shared/pin-directive';   // How to import a non-global directive; it must also be declared in the directives block in <script>

  function getPreviousValidIndex(index, length) {
    const deprecatedIndex = index - 1;
    return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
  }

  function getNextValidIndex(index, length) {
    const incrementedIndex = index + 1;
    return incrementedIndex > length - 1 ? 0 : incrementedIndex;
  }

  export default {
    // directives: { pin: pinDirective }, // We have to import any custom directive and give it a name 'pin'.  To use it, pre-prend it with 'v-' to become 'v-pin'.
    props: {
      parts: { type: Array, required: true },
      position: {
        type: String,
        required: true,
        validator(value) {
          // Custom validator for the position property
          return ["left", "right", "top", "bottom", "center"].includes(value);
        }
      }
    },
    data() {
      return { selectedPartIndex: 0 };
    },
    computed: {
      selectedPart() {
        return this.parts[this.selectedPartIndex];
      }
    },
    created() {
      this.emitSelectedPart();
    },
    updated() {
      this.emitSelectedPart();
    },
    methods: {
      emitSelectedPart() {
        this.$emit("partSelected", this.selectedPart);
      },
      selectNextPart() {
        this.selectedPartIndex = getNextValidIndex(
          this.selectedPartIndex,
          this.parts.length
        );
      },
      selectPreviousPart() {
        this.selectedPartIndex = getPreviousValidIndex(
          this.selectedPartIndex,
          this.parts.length
        );
      },
      showPartInfo() {
        // Navigate in code.  Tap into the router.   You can either push a String path or an object; if you're passing params, you have to use the object.
        // this.$router.push("/parts");   // Can't pass parameters using this form; have to use the object form (see next line).
        this.$router.push({
          name: "Parts",
          params: { id: this.selectedPart.id, partType: this.selectedPart.type }
        });
      }
    }
  };
</script>

<style scoped>
  .part {
    position: relative;
    width: 165px;
    height: 165px;
    border: 3px solid #aaa;
  }

  .sale {
    color: white;
    background-color: red;
    padding: 3px;
  }

  .part-title {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: red;
    padding-top: 5px;
    top: -25px;
  }

  .part img {
    width: 165px;
    cursor: pointer;
  }

  .top {
    border-bottom: none;
  }

  .left {
    border-right: none;
  }

  .right {
    border-left: none;
  }

  .bottom {
    border-top: none;
  }

  .left img {
    transform: rotate(-90deg);
  }

  .right img {
    transform: rotate(90deg);
  }

  .prev-selector {
    position: absolute;
    z-index: 1;
    top: -3px;
    left: -28px;
    width: 25px;
    height: 171px;
  }

  .next-selector {
    position: absolute;
    z-index: 1;
    top: -3px;
    right: -28px;
    width: 25px;
    height: 171px;
  }

  .left .prev-selector:after,
  .right .prev-selector:after {
    content: "\25B2";
  }

  .left .next-selector:after,
  .right .next-selector:after {
    content: "\25BC";
  }

  .top .prev-selector:after,
  .bottom .prev-selector:after,
  .center .prev-selector:after {
    content: "\25C4";
  }

  .top .next-selector:after,
  .bottom .next-selector:after,
  .center .next-selector:after {
    content: "\25BA";
  }

  .center .prev-selector,
  .center .next-selector {
    opacity: 0.8;
  }

  .left .prev-selector {
    top: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }

  .left .next-selector {
    top: auto;
    bottom: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }

  .right .prev-selector {
    top: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }

  .right .next-selector {
    top: auto;
    bottom: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }

  .highlight {
    border: 1px solid red;
  }
</style>
