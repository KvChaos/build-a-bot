<template>
  <div>
    <h1>Cart</h1>
    <table>
      <thead>
        <tr>
          <th class="robot-title">Robot</th>
          <th class="cost">Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(robot, index) in cart" :key="index">
          <td class="robot-title">{{robot.head.title}}</td>
          <td class="cost">{{robot.cost | currency('£') }}</td>
        </tr>
      </tbody>
    </table>
    <h2 class="saleItems">You saved money on these robots:</h2>
    <table>
      <thead>
        <tr>
          <th class="robot-title">Robot</th>
          <th class="cost">Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(robot, index) in cartSaleItems" :key="index">
          <td class="robot-title">{{robot.head.title}}</td>
          <td class="cost">{{robot.cost | currency('£') }}</td>  <!-- Using the currency filter -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  // import currencyFilter from '../shared/currency-filter';  // How timport a filter for this component alone; disabled since we took it global (see main.js)

  export default {
    name: "Cart",
    // filters: { currency: currencyFilter },    // How to use a filter in this component alone; disabled since we took it global (see main.js)
    computed: {
      cart() {
        // Use a computed property to access the cart property from the Vuex store.  Note that in a read-only situation, we can reach directly into the store's state to read the cart.
        return this.$store.state.robots.cart;
      },
      cartSaleItems() {
        // Note that we accessed this with a getter -- the getter is a function, but we only reference it, not call it.
        return this.$store.getters['robots/cartSaleItems'];
      }
    }
  };
</script>

<style scoped>
  td,
  th {
    padding: 5px;
  }

  .robot-title {
    text-align: left;
    padding-right: 200px;
  }

  .cost {
    text-align: right;
  }

  .saleItems {
    margin-top: 50px;
    font-size: 18px;
    color: red;
  }
</style>
