# ngoose 
[![Build Status](https://secure.travis-ci.org/parroit/ngoose.png?branch=master)](http://travis-ci.org/parroit/ngoose)  [![Npm module](https://badge.fury.io/js/ngoose.png)](https://npmjs.org/package/ngoose) [![Code Climate](https://codeclimate.com/github/parroit/ngoose.png)](https://codeclimate.com/github/parroit/ngoose)

models done like mongoose, but storage agnostics.
ngoose does just one think: instantiate new objects based on a schema definition.

## Getting Started
Install the module with: `npm install ngoose --save`

###Then use like this:

```javascript
var model = require("../lib/ngoose");

var user=model({
    age: Number,
    name: String
}),

instance=user();

```

instance will contains:

```javascript
{
    age: 0,
    name: ""
}
```

###You can supply data to the factory method:
```javascript

var instance=user({
    name: "Garibaldi"
});

```
instance will contains:

```javascript
{
    age: 0,
    name: "Garibaldi"
}
```

###Supplied fields that are not defined in schema are not inserted in created instance:

```javascript

var instance=user({
    name: "Garibaldi",
    address: "somewhere"
});

```
instance will contains:

```javascript
{
    age: 0,
    name: "Garibaldi"
}
```



###You can specify default values in schema:

```javascript

var user=model({
    address: [String,"somewhere"],
    name: [String,"Garibaldi"]
}),

var instance=user();

```
instance will contains:

```javascript
{
    address: "somewhere",
    name: "Garibaldi"
}
```

###You can compose models with other models or with inlined objects:

```javascript
        var user = model({
                name: [String,"unknown"],
                cool: [Boolean,true]
            }),
            bill = model({
                customer: user,
                payment: {
                    terms:String,
                    days:[Number,30]
                }
            }),
            instance = bill();
```
instance will contains:

```javascript
{
    customer: {
        name: 'unknown',
        cool: true
    },
    payment: { terms: '', days: 30 }
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
