var csv = 'name,color\nmaodka,pink\nhomura,black';
var array = _(csv.split('\n')).map(function (str) { return str.split(',') });

var key = _.first(array); // [name,color]
var vals = _.rest(array); // [['madoka',pink'],['homura',black']]

// _.map([_.first,_.rest]), function (fun) { return fun(array) }
// -> [key,vals]
// ie [[name,color],[['madoka',pink'],['homura',black']]]

obj = _(vals).map(function (val) { return _.object(key,val); });
// ie _.map(vals,function (val) { returun _.object(key,val); });
// -> [{name:'madoka',color:'pink'},{name:'homura',color:'bck'}]

array = [x,y,z]
function fun(x,y,z){..;};
fun(array[0],array[1],array[2]);

appry(fun, array);
// ie appry(fun, [x,y,z]);
// -> fun(x)(y)(z)();

// Javascript pattern
function schonfinkelize(fn) {
    var slice = Array.prototype.slice,
        stored_args = slice.call(arguments, 1);
    return function(){
       var new_args = slice.call(arguments),
           args = stored_args.concat(new_args);
       return fn.apply(null, args);
    };
}

function appry(fun, ary) {
    if (_(ary).isEmpty()) {
        return fun();
    } else {
        return appry(schonfinkelize(fun, _.first(ary)),
            _.rest(ary));
    }
};

