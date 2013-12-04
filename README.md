# ngoose 
[![Build Status](https://secure.travis-ci.org/parroit/ngoose.png?branch=master)](http://travis-ci.org/parroit/ngoose)  [![Npm module](https://badge.fury.io/js/ngoose.png)](https://npmjs.org/package/ngoose) [![Code Climate](https://codeclimate.com/github/parroit/ngoose.png)](https://codeclimate.com/github/parroit/ngoose)

models done like mongoose, but storage agnostics.
ngoose does just one think: instantiate new objects based on a schema definition.

## Getting Started
Install the module with: `npm install ngoose --save`

Then use like this:

```javascript
var model = require("../lib/ngoose");
var user=model({
				age: [Number,42],
				name: String
		}),
		instance=user();

```

instance will contains:

```javascript
{
    age: 42,
    name: ""
}
```

You can supply data to the factory method:
```javascript

var instance=user({
    name: "Garibaldi"
});

```
instance will contains:

```javascript
{
    age: 42,
    name: "Garibaldi"
}
```

Supplied fields that are not defined in schema are not inserted in created instance:

```javascript

var instance=user({
    name: "Garibaldi",
    address: "somewhere"
});

```
instance will contains:

```javascript
{
    age: 42,
    name: "Garibaldi"
}
```



## Examples
See test folder for usage examples

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.


## License
Copyright (c) 2013 Andrea Parodi  
Licensed under the MIT license.
