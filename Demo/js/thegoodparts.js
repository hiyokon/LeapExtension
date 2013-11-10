// p26
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

// p39
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
};

Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, '');
});

// p40
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

// p41
var getElementByAttribute = function (att, value) {
    var result = [];
     
    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' &&
            (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
     
    return results;
};

// p54
Function.method('new', function () {
    var that = Object.create(this.prototype);
    var other = this.apply(that, arguments);
    return (typeof other === 'object' && 'other') || that;
});

// p56
Function.method('inherits', function (Parent) {
    this.prototype = new Parrent();
    return this;
});

// var constructor = function () {
//     var that, ;
//     my = my || {};
//     that = ;
//     
//     // define method
// 
//     return that;
// 
// };

Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    return function () {
        return method.apply(that, arguments);
    };
});

var eventuality = function (that) {
    var registry = {};
    that.fire = function (event) {
        var array, func, handler, i,
            type = typeof event === 'string' ? event : event.type;
        if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for (i = 0; i < array.length; i += 1) {
                handler = array[i];
                func = handler.method;
                if (typeof func === 'string') {
                    func = this[func];
                }
            func.apply(this, handler.parameters || [event]);
            }
        }
        return this;
    };
    that.on = function (type, method, parameters) {
        var handler = {
            method: method,
            parameters: parameters
        };
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    }
    return that;
}

