;(function(context){
  "use strict";
  // Create a new module.
  // Define the namespace and runs the specified callback.
  // By default, the last namespace component will be defined as
  // as function. You can create a regular object by setting the
  // third argument to anything you want.
  //
  //     Module("Todo.Application", function(Application){
  //       Application.fn.initialize = function(){};
  //     });
  //
  // The module's prototype will be defined as a shortcut called `Module#fn`.
  // Any initialization must be performed on the `Module#initialize()` function.
  function Module(namespace, callback, object) {
    var components = namespace.split(".")
      , scope = context
      , component
      , last
    ;

    if (typeof callback !== "function") {
      object = callback;
      callback = null;
    }

    object = object || build();

    // Process all components but the last, which will store the
    // specified object attribute.
    for (var i = 0, count = components.length; i < count; i++) {
      last = (i == count - 1);
      scope[components[i]] = (last ? object : scope[components[i]] || {});
      scope = scope[components[i]];
    }

    if (callback) {
      callback.call(scope, scope);
    }
  }

  // Build a new module with the correct attributes and methods.
  function build() {
    var args, constructor;

    constructor = function() {
      // Make sure the constructor works with or without the
      // `new` keyword.
      if (!(this instanceof constructor)) {
        args = arguments;
        return new constructor();
      }

      // Initialize the object.
      this.initialize.apply(this, args || arguments);
    };

    // Save some typing and make an alias to the prototype.
    constructor.fn = constructor.prototype;

    // Define a noop initializer.
    constructor.fn.initialize = function() {};

    return constructor;
  }

  // Expose the module function.
  context.Module = Module;
})(window);

