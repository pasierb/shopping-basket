'use strict';

import Discount from './discount';
import riot from 'riot';

// price value calculations involve "multiply by 100, divide by 100" trick
// to workaround floating point precision "feature"

export default class ShoppingCart {
    constructor (vent) {
        this.vent = vent;
        this.clear();
        riot.observable(this);

        vent && vent.on('addProductToBasket', product => {
            this.addProduct(product);
            this.trigger('productAddedToBasket', product);
        });
    }

    totalDiscount () {
        return this.items.map(item => {
            return Math.round(this.itemDiscount(item) * 100);
        }).reduce(function(sum, value) {
            return sum + value;
        }, 0) / 100;
    }

    totalValue () {
        return this.items.map(item => {
            return Math.round(this.itemValue(item) * 100);
        }).reduce((sum, value) => {
            return sum + value;
        }, 0) / 100;
    }

    totalValueWithDiscounts () {
        var itemsValue = Math.round(this.totalValue() * 100);
        var discountValue = Math.round(this.totalDiscount() * 100);

        return (itemsValue + discountValue) / 100;
    }

    itemDiscount (item) {
        return (item.product.discounts || []).map(config => {
            var discount = new Discount(config);

            return Math.round(discount.value(item.product.price, item.quantity) * 100);
        }).reduce((sum, discount) => { return sum + discount }, 0) / 100;
    }

    itemValue (item) {
        return (item.quantity * Math.round(item.product.price * 100)) / 100;
    }

    clear () {
        this.items = [];
    }

    addProduct (product, quantity = 1) {
        var item = this.items.find(entry => entry.product.id === product.id);

        if (!item) {
            item = { product: product, quantity: 0 };
            this.items.push(item);
        }

        item.quantity += quantity;

        if (item.quantity <= 0) {
            this.items = this.items.filter(entry => entry.product.id !== product.id);
        }

        return this.items;
    }
}
