// A custom filter; it's just a function.
// Always has a minimum of one parameter.

export default function(amount, currencySymbol) {

    return `${currencySymbol}${amount.toFixed(2)}`; // For amount==46, returns $46.00

}
