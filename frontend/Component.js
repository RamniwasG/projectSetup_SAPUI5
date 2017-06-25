sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("pbc.sap.ui.sapTest.Component", {

		metadata : {
			rootView : "pbc.sap.ui.sapTest.view.test",
			dependencies : {
				libs : [
					"sap.m",
					"sap.ui.layout"
				]
			},
			config : {
				sample : {
					files : [
						"test.view.xml",
						"test.controller.js",
						//"Formatter.js"
					]
				}
			}
		}
	});
	console.log("Component initialized");
	return Component;

});
