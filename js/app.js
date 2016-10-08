'use strict';

import riot from 'riot';
import './tags';
import ShoppingCart from  './shopping_cart';
import Vent from './vent';

const vent = new Vent();
const cart = new ShoppingCart(vent);

cart.on(ShoppingCart.PRODUCT_ADDED, function(product, quantity) {
    vent.trigger(Vent.CART_PRODUCT_ADDED, product, quantity);
});

var products = [
    {
        id: 1,
        name: "Apple",
        price: 0.25
    }, {
        id: 2,
        name: "Orange",
        price: 0.30
    }, {
        id: 3,
        name: "Banana",
        price: 0.15
    }, {
        id: 4,
        name: "Papaya",
        price: 0.50,
        discounts: [
            { description: "three for the price of two!", thresholdItems: 3, freeItems: 1 }
        ]
    }
];

riot.mount('product-list', { data: products, vent: vent });
riot.mount('shopping-cart', { cart: cart });
riot.mount('notification-bar', { vent: vent });
