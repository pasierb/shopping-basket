import riot from 'riot';

export default class Vent {
    static get CART_PRODUCT_ADDED() { return "shoppingCart:productAdded"; }
    static get ADD_PRODUCT_TO_CART() { return "product:addToCart"; }

    constructor () {
        riot.observable(this);
    }
}
