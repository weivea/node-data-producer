//handlebars的helper函数
var blocks = {};
module.exports = {
	foo: function (value) { return 'FOO!'; },
    bar: function (value) { return 'BAR!'; },
    htmldom: function(value) {
        return value.replace(/&amp;/g,'&')
            .replace(/&lt;/g,'<')
            .replace(/&gt;/g,'>')
            .replace(/&#92;/g,'\\')
            .replace(/&quot;/g,'"')
            .replace(/&#39;/g,"'");
    },
	extend: function(name, context) {
	    var block = blocks[name];
	    if (!block) {
	        block = blocks[name] = [];
	    }

	    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
	},
	block: function(name) {
	    var val = (blocks[name] || []).join('\n');
	    // clear the block
	    blocks[name] = [];
	    //console.log(val);
	    return val;
	}
};
