describe('main', function() {
    it('Test', function() {
        var sample = {};
        expect((sample.hasOwnProperty('bars') ? sample.hasOwnProperty('buttons') ? sample.hasOwnProperty('limit') ? true : false : false : false) && sample.bars.length > 0 && sample.buttons.length > 0).toBe(false);
    });

    it('Test1', function() {
        var sample1 = { bars: [], buttons: [23, -32, -32, 4], limit: 220 };


        expect((sample1.hasOwnProperty('bars') ? sample1.hasOwnProperty('buttons') ? sample1.hasOwnProperty('limit') ? true : false : false : false) && sample1.bars.length > 0 && sample1.buttons.length > 0).toBe(false);
    });

    it('Test2', function() {
        var sample2 = { bars: [2, 2, 22, 2], buttons: [], limit: 220 };

        expect((sample2.hasOwnProperty('bars') ? sample2.hasOwnProperty('buttons') ? sample2.hasOwnProperty('limit') ? true : false : false : false) && sample2.bars.length > 0 && sample2.buttons.length > 0).toBe(false);
    });

    it('Test3', function() {
        var sample3 = { bars: [2, 2, 22, 2], buttons: [23, -32, -32, 4] };

        expect((sample3.hasOwnProperty('bars') ? sample3.hasOwnProperty('buttons') ? sample3.hasOwnProperty('limit') ? true : false : false : false) && sample3.bars.length > 0 && sample3.buttons.length > 0).toBe(false);
    });

    it('Test4', function() {
        var sample4 = { buttons: [23, -32, -32, 4] ,limit:800};

        expect((sample4.hasOwnProperty('bars') ? sample4.hasOwnProperty('buttons') ? sample4.hasOwnProperty('limit') ? true : false : false : false) && sample4.bars.length > 0 && sample4.buttons.length > 0).toBe(false);
    });

    it('Test4', function() {
        var sample4 = {bars: [2, 2, 22, 2], buttons: [23, -32, -32, 4] ,limit:800};

        expect((sample4.hasOwnProperty('bars') ? sample4.hasOwnProperty('buttons') ? sample4.hasOwnProperty('limit') ? true : false : false : false) && sample4.bars.length > 0 && sample4.buttons.length > 0).toBe(true);
    });
});
