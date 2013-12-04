'use strict';

var expect = require("expect.js");
var ngoose = require("../lib/ngoose");


describe("ngoose", function () {
    it("is defined", function () {
        expect(ngoose).to.be.an('object');
    });

    describe("model", function () {
	    it("is defined", function () {
	       expect(ngoose.model).to.be.an('function');
	    });

	    it("return a model object", function () {
	       expect(ngoose.model({})).to.be.an('object');
	    });



	    it("throws with undefined definition", function () {
	    	expect(function(){
	    		ngoose.model()
	    	}).to.throwError();
	    });

	    it("throws with null definition", function () {
	    	expect(function(){
	    		ngoose.model(null)
	    	}).to.throwError();
	    });

	    it("throws with numeric definition", function () {
	    	expect(function(){
	    		ngoose.model(12)
	    	}).to.throwError();
	    });

	    it("throws with string definition", function () {
	    	expect(function(){
	    		ngoose.model("test")
	    	}).to.throwError();
	    });

	    it("throws with regexp definition", function () {
	    	expect(function(){
	    		ngoose.model(/test/)
	    	}).to.throwError();
	    });

	    it("throws with array definition", function () {
	    	expect(function(){
	    		ngoose.model([])
	    	}).to.throwError();
	    });

	    it("throws with array definition", function () {
	    	expect(function(){
	    		ngoose.model([])
	    	}).to.throwError();
	    });

	    describe("definition fields",function(){
	    	function coudlBe(def,value){
				it("could be " +def, function () {
			    	expect(ngoose.model({field1:value}).definition.field1)
			    		.to.be.equal(value);
			    });
			}	

			function throwsWith(def,value){
				it("throws with " +def, function () {
			    	expect(function(){
			    		ngoose.model({field1:value})
			    	}).to.throwError();
			    });
			}	

			coudlBe("String",String);
			coudlBe("Date",Date);
			coudlBe("Number",Number);
			coudlBe("Array of types",[Number]);
			coudlBe("Object",{f:Number});
			throwsWith("undefined",undefined);
			throwsWith("null",null);
			throwsWith("regexp",/aregexp/);
			throwsWith("string","/astring/");
			throwsWith("number",42);
			throwsWith("Date instance",new Date());
			throwsWith("function",function(){});
			
			throwsWith("unvalid subobject",{f:""});
			throwsWith("unvalid array",[""]);
			throwsWith("empty array",[]);
			throwsWith("multielement array",[Number,String]);
			
	    });
	    

	    it("save model definition", function () {
	       expect(ngoose.model({a:Number}).definition.a).to.be.equal(Number);
	    });
	});

	describe("create", function () {
		var model=ngoose.model({
				age: Number,
				name: String 
			}),
			instance;
		
		before(function(){
			instance = model.create();
		});

		it("is defined", function () {
	       
	       expect(model.create).to.be.an("function");
	    });

		it("return model instance", function () {
	       
	       expect(instance).to.be.an("object");
	    });
	});
});
