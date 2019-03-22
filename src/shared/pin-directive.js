// This code would go in a bind() or update() lifecycle... Keeping it from an earlier stage in the course.
// Keep this code for demo purposes when using the directive using modifiers... e.g., v-pin:position.top.right
// For the modifiers passed in, set their style classes to 5 px (so v-pin:position.top.right would have binding.modifier entries for top and right)
// if (binding.arg !== 'position') return;
// Object.keys(binding.modifiers).forEach(key => {
//     element.style[key] = '5px';
// });



/**
 * The bind and update hooks are the most common; so common that there is a shorthand syntax; 
 * just export a default function that takes element and binding; the function will then get 
 * called for both bind() and update() lifecycle hooks.
 ***/
export default function(element, binding) {

    // Custom directive to pin a span to a parent element (red text overlay).

    // Use this code when you pass an object into the directive... e.g., v-pin="{bottom: '10px', right: '5px'}"
    Object.keys(binding.value).forEach(position => {

        // here, position will be 'bottom' and 'right'... and binding.value[position] will be '10px'.
        element.style[position] = binding.value[position];
    });

    element.style.position = 'absolute';

};
