<template>
  <div v-if="availableParts" class="content">
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src">
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left">
            <img :src="selectedRobot.torso.src">
            <img :src="selectedRobot.rightArm.src" class="rotate-right">
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src">
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
    <div class="top-row">
      <div class="top part" :class="[saleBorderClass]">
        <PartSelector
          :parts="availableParts.heads"
          position="top"
          @partSelected="part => selectedRobot.head=part"
        />
      </div>
    </div>
    <div class="middle-row">
      <PartSelector
        :parts="availableParts.arms"
        position="left"
        @partSelected="part => this.selectedRobot.leftArm=part"
      />
      <PartSelector
        :parts="availableParts.torsos"
        position="center"
        @partSelected="part => this.selectedRobot.torso=part"
      />
      <PartSelector
        :parts="availableParts.arms"
        position="right"
        @partSelected="part => this.selectedRobot.rightArm=part"
      />
    </div>
    <div class="bottom-row">
      <PartSelector
        :parts="availableParts.bases"
        position="bottom"
        @partSelected="part => this.selectedRobot.base=part"
      />
    </div>
  </div>
</template>


<script>
  // import availableParts from "../data/parts";   // Before server, we were reading data from a JSON file; this is now a computed property below.
  import { mapActions } from 'vuex';
  import createdHookMixin from "./created-hook-mixin";
  import PartSelector from "./PartSelector.vue";
  import CollapsibleSection from "../shared/CollapsibleSection.vue";

  export default {
    name: "RobotBuilder",
    created() {
      // Instructs the store to invoke its getParts() action; this component will see the results through the new availableParts computed property which reads the store.
      // this.$store.dispatch('robots/getParts');   // Not needed after you ...mapActions of the robots module's store.
      this.getParts();
    },
    beforeRouteLeave(to, from, next) {
      // When building a route guard on a component, you have to include the word 'Route' -- so this is beforeRouteLeave
      // Warn the user if they try to leave the page without adding their robot to the card.
      if (this.addedToCart) {
        next(true);
      }
      else {
        const response = confirm(
          "You have no added your robot to your cart.   Are you sure you want to leave?"
        );
        next(response);
      }
    },
    components: { PartSelector, CollapsibleSection },
    mixins: [createdHookMixin],
    data() {
      return {
        // availableParts,
        addedToCart: false,
        cart: [],
        selectedRobot: {
          head: {},
          leftArm: {},
          rightArm: {},
          torso: {},
          base: {}
        }
      };
    },
    methods: {
      // Here, we are using mapActions create local methods (addToRobot(), getCart()) that, when called, 
      // dispatch actions to the robots module's actions of the same name.
      ...mapActions('robots', ['addRobotToCart', 'getParts']),
      async addToCart() {
        const robot = this.selectedRobot;
        const cost =
          robot.head.cost +
          robot.leftArm.cost +
          robot.rightArm.cost +
          robot.torso.cost +
          robot.base.cost;

        // Commit a change to the Vuex store.  The first parameter is the name of the mutation; the second is the data to be sent to the mutation.
        // After we added the server, we aren't doing this anymore; instead we are dispatching an action to the server.  See the addRobotToCart action in the store.
        // this.$store.commit("addRobotToCart", Object.assign({}, robot, { cost })); // Object.assign() is a form of _.extend into that first empty object.

        // Because the store's action addRobotToCart returns a promise, we can catch promise and when it is resolved, redirect the browser to the cart.
        await this.addRobotToCart(Object.assign({}, robot, { cost })); //Here, we are calling one of the methods created by the mapActions helper
        this.addedToCart = true;
        this.$router.push("/cart");
      }
    },
    computed: {
      headBorderStyle() {
        const border = this.selectedRobot.head.onSale ?
          "solid red 3px" :
          "solid #aaa 3px";
        return { border };
      },
      saleBorderClass() {
        return this.selectedRobot.head.onSale ? "sale-border" : "";
      },
      availableParts() {
        // This computed property will get updated whenever the store's state.parts value changes (including when the axios call finishes pulling data back from the server).
        return this.$store.state.robots.parts;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .part {
    position: relative;
    width: 165px;
    height: 165px;
    border: 3px solid #aaa;
  }

  .part {
    img {
      width: 165px;
    }
  }

  .top-row {
    display: flex;
    justify-content: space-around;
  }

  .middle-row {
    display: flex;
    justify-content: center;
  }

  .bottom-row {
    display: flex;
    justify-content: space-around;
    border-top: none;
  }

  .head {
    border-bottom: none;
  }

  .left {
    border-right: none;
  }

  .right {
    border-left: none;
  }

  .left img {
    transform: rotate(-90deg);
  }

  .right img {
    transform: rotate(90deg);
  }

  .bottom {
    border-top: none;
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

  .right .next-selector {
    right: -3px;
  }

  .robot-name {
    position: absolute;
    top: -25px;
    text-align: center;
    width: 100%;
  }

  .sale {
    color: red;
  }

  .content {
    position: relative;
  }

  .add-to-cart {
    position: absolute;
    width: 210px;
    padding: 3px;
    font-size: 16px;
  }

  .sale-border {
    border: solid red 3px;
  }

  .preview {
    position: absolute;
    top: -20px;
    right: 0;
    width: 210px;
    height: 210px;
    padding: 5px;
  }

  .preview-content {
    border: 1px solid #999;
  }

  .preview img {
    width: 50px;
    height: 50px;
  }

  .rotate-right {
    transform: rotate(90deg);
  }

  .rotate-left {
    transform: rotate(-90deg);
  }
</style>
