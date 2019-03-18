import axios from 'axios';

// Remember that in a modules file, you are only exporting an object with all the necessary state, mutations, getters, actions, etc...  Not actually creating a second Vuex store.

export default {

  namespaced: true,
  state: {
    // All data objects must be initialized with a default value...so Vue can perform change detection
    cart: [],
    parts: null,
  },
  mutations: {
    // All changes to the store must take place through a mutation
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },
    updateParts(state, parts) {
      state.parts = parts;
    },
  },
  getters: {
    // Write a getter that returns only those items in the where the head is on sale; and expose with a getter.
    cartSaleItems(state) {
      return state.cart.filter(item => item.head.onSale);
    }
  },
  actions: {
    // First parameter to an action is a context object.  This action will get called by the RobotBuilder component when it is created; see RobotBuilder's created() hook.
    getParts(context) {
      const {
        commit
      } = context;

      // See vue.config.js; when in development, we will use a proxy to hit our development server on localhost:8081
      // When this axios request completes, we want it to alter our parts collection in state, but that has to be done through a mutation.  See updateParts().
      // Axios returns a result object with a data attribute.
      axios.get('/api/parts')
        .then(result => commit('updateParts', result.data))
        .catch(console.error);
    },

    addRobotToCart({
      commit,
      state
    }, robot) {
      // This action is to update the cart on the server.
      // In first parameter of this function, the parameter is still state, but we are using object deconstruction to pull out commit and state.
      // We are sending an array that contains the current cart here in the store plus the robot we are adding to the cart; but we don't want to update the 
      //     store's copy of the state until the axios call completes successfully.
      const cart = [...state.cart, robot];

      // When the axios call does complete successfully, we update the store's cart by calling a mutation; we do that using commit.  The return here returns the promise returned by post().
      return axios.post('/api/cart', cart)
        .then(() => commit('addRobotToCart', robot));
    }
  }


};
