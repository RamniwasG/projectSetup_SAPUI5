sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/odata/ODataModel',
	'sap/ui/model/json/JSONModel'
	], function(jquery, Controller, ODataModel, JSONModel){
		"use strict";
		return Controller.extend('pbc.sap.ui.sapTest.test',{
			onInit:function() {
				console.log("controller initialized");
			},

			onPressReject: function(event) {
				console.log("onPress called");
			},

			onPressDefault: function(event) {
				console.log("onPress called");
			}
		}); 
	});