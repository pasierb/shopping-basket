'use strict';

import riot from 'riot';

riot.tag('product-list',

    `<table>
        <tbody>
            <tr each="{product in opts.data}">
                <td>
                    <span>{ product.name }</span>
                    <em each="{discount in product.discounts}" class="discount">
                        <i class="fa fa-exclamation"></i>
                        { discount.description }
                        <i class="fa fa-exclamation"></i>
                    </em>
                </td>
                <td class="text-right">
                    <i class="fa fa-dollar"></i>
                </td>
                <td class="text-right">{ product.price.toFixed(2) }</td>
                <td class="text-right">
                    <a onclick="{addToBasket(product)}" title="Add product to basket">
                        <i class="fa fa-cart-plus"></i>
                    </a>
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
                <td class="text-right">({ item.product.price.toFixed(2) })</td>
                <td class="text-right">
                    <i class="fa fa-dollar"></i>
                </td>
                <td class="text-right">{ parent.opts.cart.itemValue(item).toFixed(2) }</td>
                <td class="text-right">
                    <button onclick="{ alterQuantity(item.product, 1) }" title="Add more products to basket">
                        <i class="fa fa-plus"></i>
                    </button>
                    <button onclick="{ alterQuantity(item.product, -1) }" title="Remove product from basket">
                        <i class="fa fa-minus"></i>
                    </button>
                    <button onclick="{ alterQuantity(item.product, -item.quantity) }" title="Remove all products">
                        <i class="fa fa-remove"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

    <table>
        <tbody>
            <tr>
                <td>Subtotal:</td>
                <td class="text-right">
                    <i class="fa fa-dollar"></i>
                </td>
                <td class="text-right">{ opts.cart.totalValue().toFixed(2) }</td>
            </tr>
            <tr>
                <td>Discounts:</td>
                <td class="text-right">
                    <i class="fa fa-dollar"></i>
                </td>
                <td class="text-right">{ opts.cart.totalDiscount().toFixed(2) }</td>
            </tr>
            <tr class="text-size-xl">
                <td>
                    <strong><u>Total:</u></strong>
                </td>
                <td class="text-right">
                    <i class="fa fa-dollar"></i>
                </td>
                <td class="text-right">
                    <strong><u>{ opts.cart.totalValueWithDiscounts().toFixed(2) }</u></strong>
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
