# Module.js

Define namespaces as constructor functions (or any object).

## Usage

Create a new module.

    Module("Todo.Application", function(Application){
      Application.fn.initialize = function() {
        // execute something when initializing the object.
      };
    });

    var app = new Todo.Application();
        app = Todo.Application(); // the new keyword is optional.

Define namespace with custom objects.

    Module("Todo.config", function(config){
      config.assets = "/assets";
    }, {});

## Maintainer

- Nando Vieira - <http://nandovieira.com.br>

## Contributing

Once you've made your great commits:

1. [Fork](http://help.github.com/forking/) I18n.js
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. [Create an Issue](http://github.com/fnando/i18n-js/issues) with a link to your branch
5. That's it!

Please respect the indentation rules and code style.
And use 2 spaces, not tabs. And don't touch the versioning thing.

## Running tests

Just open the file `test/tests.html` in your target browser.

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
