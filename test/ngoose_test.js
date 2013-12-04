'use strict';

var expect = require("expect.js");
var ngoose = require("../lib/ngoose");


describe("ngoose", function () {
    it("is defined", function () {
        expect(ngoose).to.be.an('object');
    });
});
