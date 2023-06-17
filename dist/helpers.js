"use strict";
module.exports = {
    compare: function (price, options) {
        var fnTrue = options.fn, fnFalse = options.inverse;
        return price > 0 ? fnTrue(this) : fnFalse(this);
    }
};
