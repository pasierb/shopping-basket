import ShoppingCart from './../js/shopping_cart';
import assert from 'assert';

describe('ShoppingCart', function() {
    var basket = new ShoppingCart();
    var apple = {
        id: 1,
        name: "Apples",
        price: 0.25
    };
    var orange = {
        id: 2,
        name: "Orange",
        price: 0.30
    };
    var papaya = {
        name: "Papaya",
        price: 0.50,
        discounts: [
          { thresholdItems: 3, freeItems: 1}
        ]
    };

    beforeEach(function () {
        basket.clear();
    });

    describe('#totalValue()', function() {
        it('should sum up items prices', function() {
            basket.addProduct(apple, 2);
            basket.addProduct(orange, 1);
            assert.equal(0.80, basket.totalValue());
        });
    });

    describe('#totalValueWithDiscounts()', function() {
        it('should sum up items prices including discounts', function() {
            basket.addProduct(apple, 2); // 2 * 0.25 = 0.5
            basket.addProduct(papaya, 6); // (6 * 0.5) - (2 * 0.5) = 2
            assert.equal(2.5, basket.totalValueWithDiscounts());
        });
    });

    describe('#totalDiscount()', function() {
        it('should return 0 if no discouts apply', function () {
            basket.addProduct(apple, 30);
            assert.equal(0, basket.totalDiscount());
        });

        it('should return sum total of discounts', function () {
            basket.addProduct(papaya, 6);
            assert.equal(-1, basket.totalDiscount());
        });
    });

    describe('#itemValue()', function() {
        it('should sum up product items', function() {
            assert.equal(0.75, basket.itemValue({ product: apple, quantity: 3}))
        });
    });

    describe('#clear()', function() {
        it('should empty items', function() {
            basket.addProduct(apple, 3);
            basket.clear();
            assert.equal(0, basket.items.length);
        });
    });

    describe('#addProduct()', function() {
        beforeEach(function() {
            basket.addProduct(apple, 2);
        });

        it('should put product into basket', function() {
            assert.equal(1, basket.items.length);
            assert.equal(2, basket.items[0].quantity);
        });

        it('should update quantity when adding product already in cart', function() {
            basket.addProduct(apple);
            assert.equal(1, basket.items.length);
            assert.equal(3, basket.items[0].quantity);
        });

        it('should reduce quantity if negative quantity provided', function() {
            basket.addProduct(apple, -1);
            assert.equal(1, basket.items[0].quantity);
        });

        it('should remove product if quantity <= 0', function() {
            basket.addProduct(apple, -2);
            assert.equal(0, basket.items);
        });
    });
});
