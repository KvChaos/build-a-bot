
/**
This is a mixin file; we'll just export a default object that contains the created() lifecycle hook; 
You include this in a component by importing this file, then creating a mixins property on the 
component and including the import of this file in an array (you could use multiple mixins 
by including them in the array).

e.g., inside a component -- import this file then use it.
  import createdHookMixin from './created-hook-mixin';

  export default {
    name: "RobotBuilder",
    ...
    mixins: [createdHookMixin],
    ...
**/


export default { 

    created() {
      // In here, you could fetch data to populate a component...
      console.log('RobotBuilder component created');
    }
    
    
}