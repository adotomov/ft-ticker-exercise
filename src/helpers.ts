module.exports = {
  compare: function(price: any, options: any) {
    var fnTrue = options.fn,
        fnFalse = options.inverse

    return price > 0 ? fnTrue(this) : fnFalse(this)
  }
}