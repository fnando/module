module("module.js", {setup: function(){
  window.A = undefined;
}});

test("root namespace", function(){
  var options = {};

  Module("A", function(inner){
    options.inner = inner;
    options.context = this;
  });

  equal(typeof A, "function");
  equal(options.inner, A);
  equal(options.context, A);
});

test("composed namespace", function(){
  var options = {};

  Module("A.B.C", function(inner){
    options.inner = inner;
    options.context = this;
  });

  equal(typeof A.B.C, "function");
  equal(options.inner, A.B.C);
  equal(options.context, A.B.C);
});

test("composed namespace with colon", function(){
  var options = {};

  Module("A::B::C", function(inner){
    options.inner = inner;
    options.context = this;
  });

  equal(typeof A.B.C, "function");
  equal(options.inner, A.B.C);
  equal(options.context, A.B.C);
});

test("pass the prototype as second argument", function(){
  var options = {};

  Module("A::B::C", function(inner, fn){
    options.fn = fn;
  });

  equal(options.fn, A.B.C.prototype);
});

test("custom object also receives the prototype as second argument", function(){
  var options = {};

  Module("A::B::C", function(inner, fn){
    options.fn = fn;
  }, "CUSTOM");

  equal(options.fn, A.B.C.prototype);

  // Only functions have the prototype property.
  // So, other objects must receive undefined.
  equal(options.fn, undefined);
});

test("custom object", function(){
  var options = {};

  Module("A.B", function(inner){
    options.inner = inner;
    options.context = this;
  }, "CUSTOM");

  equal(A.B, "CUSTOM");
  equal(options.inner, "CUSTOM");
  equal(options.context, "CUSTOM");
});

test("initializes object", function(){
  var called, object, context;

  Module("A.B", function(B){
    B.fn.initialize = function() {
      called = true;
      context = this;
    };
  });

  object = new A.B();
  ok(called);
  ok(object instanceof A.B);
  equal(object, context);
});

test("initializes without new keyword", function(){
  var called, object;

  Module("A.B", function(B){
    B.fn.initialize = function() {
      called = true;
    };
  });

  object = A.B();
  ok(called);
  ok(object instanceof A.B);
});

test("passes arguments to initializer", function(){
  var args, object;

  Module("A.B", function(B){
    B.fn.initialize = function(a, b, c) {
      args = {a: a, b: b, c: c};
    };
  });

  object = new A.B(1, 2, 3);
  equal(args.a, 1);
  equal(args.b, 2);
  equal(args.c, 3);
});

test("passes object to initializer", function(){
  var attrs, actual, object;

  attrs = {name: "John Doe", email: "john@exmaple.org"};

  Module("A", function(A){
    A.fn.initialize = function(attributes) {
      actual = attributes;
    };
  });

  // without new keyword
  object = A(attrs);
  equal(actual, attrs);

  // with new keyword
  object = new A(attrs);
  equal(actual, attrs);

  // with a totally different argument.
  object = new A(undefined);
  equal(actual, undefined);
});

test("passes arguments to initializer without new keyword", function(){
  var args, object;

  Module("A.B", function(B){
    B.fn.initialize = function(a, b, c) {
      args = {a: a, b: b, c: c};
    };
  });

  object = A.B(1, 2, 3);
  equal(args.a, 1);
  equal(args.b, 2);
  equal(args.c, 3);
});

test("namespace without callback", function(){
  Module("A.B", "CUSTOM");
  equal(A.B, "CUSTOM");
});

test("returns module", function(){
  var b;
  var module = Module("A.B", function(B){ b = B; });

  deepEqual(module, b);
});

test("fetches existing module", function(){
  var module = Module("A.B");
  deepEqual(module, Module.fetch("A.B"));
});

test("returns null for missing module", function(){
  equal(Module.fetch("Invalid.Module"), null);
});

test("runs existing module", function(){
  var called = false;

  Module("A.B", function(B){
    B.fn.initialize = function() { called = true; };
  });

  Module.run("A.B");

  ok(called);
});

test("runs existing module with given arguments", function(){
  var args;

  Module("A.B", function(B){
    B.fn.initialize = function(a, b, c) { args = [a, b, c]; };
  });

  Module.run("A.B", [1, 2, 3]);

  deepEqual(args, [1, 2, 3]);
});

test("doesn't raise when running missing module", function(){
  equal(Module.run("Invalid"), null);
});

test("doesn't raise when running missing module with childs defined", function(){
  Module("A.B", function(B){
  });

  equal(Module.run("A"), null);
});

test("define a wrapper", function(){
  Module.wrapper("A.B", function(namespace, callback){
    Module("A.B." + namespace, function(mod){
      mod.fn.initialize = function(e){
        this.d = "D";
        this.e = e;
      };
    });
  });

  A.B("C");

  equal(typeof A.B, "function");
  equal(A.B.C().d, "D");
  equal(A.B.C("E").e, "E");
});

test("define a wrapper which receives custom arguments", function(){
  var options, callback;

  Module.wrapper("A.B", function(opts, callback){
    options = opts;
  });

  A.B({c: "C"});

  deepEqual({c: "C"}, options);
});
