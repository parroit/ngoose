/*
 * ngoose
 * https://github.com/parroit/ngoose
 *
 * Copyright (c) 2013 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var _ = require("lodash"),
    functionName = require('fn-name');

function isNgoose(value) {
    return _.isFunction(value) && functionName(value) === "ngooseModel";
}
function checkField(value, key) {
    function errField() {
        var type = _.isFunction(value) ? functionName(value) : value;
        throw new Error("Invalid field " + key + ":" + type + ". Fields must be type constructors, array or objects.");
    }

    if (!value)
        errField();

    if (_.isFunction(value)) {

        if (value !== String &&
            value !== Number &&
            value !== Boolean &&
            value !== Date &&
            !isNgoose(value)
            ) {

            errField();
        }
    } else {
        if (!_.isObject(value) || _.isRegExp(value) || _.isDate(value)) {
            errField();
        }

        if (_.isObject(value)) {
            if (_.isArray(value)) {

                if (value.length < 1)
                    errField();


                checkField(value[0], key);
            } else {
                checkFields(value);
            }

        }
    }
}
function checkFields(definition) {
    _(definition).forEach(function (value, key) {
        checkField(value, key);


    });
}

function buildFieldWithDefault(FieldDefinition, instance, fieldName) {
    var defaultValue = FieldDefinition[1];
    var FieldType = FieldDefinition[0];
    if (FieldType === Date)
        instance[fieldName] = new FieldType(defaultValue);
    else if (_.isObject(FieldType) && !_.isArray(FieldType) && !_.isFunction(FieldType)) {

        instance[fieldName] = buildInstance(FieldType, defaultValue);

    } else {
        instance[fieldName] = FieldType(defaultValue);
    }

}
function buildField(FieldType, instance, fieldName) {
    if (_.isObject(FieldType) && !_.isArray(FieldType) && !_.isFunction(FieldType)) {
        instance[fieldName] = buildInstance(FieldType);
    } else if (_.isArray(FieldType) && FieldType.length == 1) {
        buildArrayField(FieldType, instance, fieldName, []);
    } else {

        instance[fieldName] = FieldType();
    }
}
function buildArrayField(FieldType, instance, fieldName, arrayData) {
    var values = [];

    arrayData.forEach(function (item) {

        var fieldType = FieldType[0];

        if (isNgoose(fieldType))
            fieldType = fieldType.definition;
        values.push(buildInstance(fieldType, item));
    });
    instance[fieldName] = values;
}
function buildInstance(definition, data) {
    var instance = {};

    _(definition).forEach(function (FieldType, key) {
        if (data && key in data) {

            if (_.isArray(FieldType) && FieldType.length == 1) {
                buildArrayField(FieldType, instance, key, data[key]);
            } else if (_.isObject(data[key]) && _.isObject(FieldType) || isNgoose(FieldType)){
                var fieldType = FieldType;

                if (isNgoose(fieldType))
                    fieldType = fieldType.definition;
                instance[key] = buildInstance(fieldType, data[key]);
            } else {
                instance[key] = data[key];
            }
        } else {

            if (_.isArray(FieldType) && FieldType.length > 1) {
                buildFieldWithDefault(FieldType, instance, key);
            } else {
                buildField(FieldType, instance, key);
            }


        }
    });

    return  instance;
}
function model(definition) {
    function errArgument() {
        throw new Error("You must provide a definition of model as first argument");
    }

    if (!definition) {
        errArgument();
    }

    if (!_.isObject(definition) || _.isArray(definition) || _.isRegExp(definition)) {
        errArgument();
    }

    checkFields(definition);

    var factory = function ngooseModel(data) {
        return buildInstance(definition, data);
    };
    factory.definition = definition;
    return  factory;
}

module.exports = model;
