'use strict';

var expect = require("expect.js"),
    _ = require("lodash"),
    model = require("../lib/ngoose");


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
            coudlBe("multielement array with default values",[Number,12]);
			
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
				name: String,
                cool: Boolean
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

        it("model instance has default properties", function () {
            var expectedValue = {
                age:0,
                name:"",
                cool:false
            };
            //console.dir(instance);
            expect(_.isEqual(instance,expectedValue)).to.be.equal(true);
        });

        it("supplied properties values are kept", function () {
            var u = user({age:42});
            expect(u.age).to.be.equal(42);
        });

        it("undefined supplied properties values are removed", function () {
            var u = user({notDefined:42});
            var expectedValue = {
                age:0,
                name:"",
                cool:false
            };
            expect(_.isEqual(u,expectedValue)).to.be.equal(true);
        });
	});


    describe("use defaults provided", function () {
        var user=model({
                age: [Number,42],
                name: [String,"unknown"],
                born: [Date,new Date(1976,1,3)],
                cool: [Boolean,true]
            }),
            instance = user();

        before(function(){
            instance = user();
        });


        it("use default for numbers", function () {

            expect(instance.age).to.be.equal(42);
        });

        it("use default for strings", function () {

            expect(instance.name).to.be.equal("unknown");
        });

        it("use default for dates", function () {

            expect(instance.born.getTime()).to.be.equal(new Date(1976,1,3).getTime());
        });

        it("use default for boolean", function () {

            expect(instance.cool).to.be.equal(true);
        });


    });


    describe("model composition", function () {
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

        it("create inlined objects", function () {
            var expectedValue = {
                terms:"",
                days:30

            };

            expect(_.isEqual(instance.payment,expectedValue)).to.be.equal(true);
        });

        it("create other models", function () {
            var expectedValue = {
                name:"unknown",
                cool:true

            };

            expect(_.isEqual(instance.customer,expectedValue)).to.be.equal(true);
        });
    });
});
