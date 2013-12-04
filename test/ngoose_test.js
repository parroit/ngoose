'use strict';

var expect = require("expect.js");
var model = require("../lib/ngoose");


describe("ngoose model", function () {


    describe("model", function () {
	    it("is defined", function () {
	       expect(model).to.be.an('function');
	    });

	    it("return a model factory", function () {
	       expect(model({})).to.be.an('function');
	    });



	    it("throws with undefined definition", function () {
	    	expect(function(){
	    		model()
	    	}).to.throwError();
	    });

	    it("throws with null definition", function () {
	    	expect(function(){
	    		model(null)
	    	}).to.throwError();
	    });

	    it("throws with numeric definition", function () {
	    	expect(function(){
	    		model(12)
	    	}).to.throwError();
	    });

	    it("throws with string definition", function () {
	    	expect(function(){
	    		model("test")
	    	}).to.throwError();
	    });

	    it("throws with regexp definition", function () {
	    	expect(function(){
	    		model(/test/)
	    	}).to.throwError();
	    });

	    it("throws with array definition", function () {
	    	expect(function(){
	    		model([])
	    	}).to.throwError();
	    });

	    it("throws with array definition", function () {
	    	expect(function(){
	    		model([])
	    	}).to.throwError();
	    });

	    describe("definition fields",function(){
	    	function coudlBe(def,value){
				it("could be " +def, function () {
			    	expect(model({field1:value}).definition.field1)
			    		.to.be.equal(value);
			    });
			}	

			function throwsWith(def,value){
				it("throws with " +def, function () {
			    	expect(function(){
			    		model({field1:value})
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
	       expect(model({a:Number}).definition.a).to.be.equal(Number);
	    });

        it("each model has its definition", function () {
            var model1 = model({a: String});
            var model2 = model({a: Number});
            expect(model1.definition.a).to.be.equal(String);
            expect(model2.definition.a).to.be.equal(Number);
        });
	});

	describe("create instance", function () {
		var user=model({
				age: Number,
				name: String 
			}),
			instance;
		
		before(function(){
			instance = user();
		});

		it("is defined", function () {
	       
	       expect(user).to.be.an("function");
	    });

		it("return model instance", function () {
	       
	       expect(instance).to.be.an("object");
	    });

        it("model instance has default property ", function () {

            expect(instance).to.be.an("object");
        });
	});
});
