import Discount from './../js/discount';
import assert from 'assert';

describe('Discount', function() {
    var discount = new Discount({ thresholdItems: 3, freeItems: 1 });

    describe('#value()', function() {
        it('should get one item for free', function() {
            assert.equal(-5, discount.value(5, 3));
        });

        it('should get no free items', function() {
            assert.equal(0, discount.value(5, 2));
        })
    });
});
