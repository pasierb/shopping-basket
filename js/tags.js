'use strict';

import riot from 'riot';

riot.tag('product-list',

    `<table>
        <tbody>
            <tr each="{product in opts.data}">
                <td>
                    <span>{ product.name }</span>
                    <span each="{discount in product.discounts}">(!!! { discount.description } !!!)</span>
                </td>
                <td>{ product.price }</td>
                <td class="text-right">
                    <button onclick="{addToBasket(product)}">+</button>
                </td>
            </tr>
        </tbody>
    </table>`,

    function (opts) {
        this.addToBasket = function(product) {
            return () => {
                opts.vent.trigger('addProductToBasket', product);
            }
        }
    }
);

riot.tag('shopping-cart',

    `<table>
        <tbody>
            <tr each="{ item in opts.cart.items }">
                <td class="text-right">{ item.quantity }</td>
                <td>{ item.product.name }</td>
                <td class="text-right">({ item.product.price })</td>
                <td class="text-right">$</td>
                <td class="text-right">{ parent.opts.cart.itemValue(item) }</td>
                <td class="text-right">
                    <button onclick="{ alterQuantity(item.product, 1) }">+</button>
                    <button onclick="{ alterQuantity(item.product, -1) }">-</button>
                    <button onclick="{ alterQuantity(item.product, -item.quantity) }">x</button>
                </td>
            </tr>
        </tbody>
    </table>

    <table>
        <tbody>
            <tr>
                <td>Subtotal:</td>
                <td class="text-right">$</td>
                <td class="text-right">{ opts.cart.totalValue() }</td>
            </tr>
            <tr>
                <td>Discounts:</td>
                <td class="text-right">$</td>
                <td class="text-right">{ opts.cart.totalDiscount() }</td>
            </tr>
            <tr>
                <td>
                    <strong><u>Total:</u></strong>
                </td>
                <td class="text-right">$</td>
                <td class="text-right">
                    <strong>{ opts.cart.totalValueWithDiscounts() }</strong>
                </td>
            </tr>
        </tbody>
    </table>`,

    function(opts) {
        opts.cart.on('productAddedToBasket', () => this.update());

        this.alterQuantity = function(product, quantity) {
            return () => {
                opts.cart.addProduct(product, quantity);
            }
        }
    }
)
