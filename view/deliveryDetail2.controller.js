sap.ui.controller("ValeoDashboard.view.deliveryDetail2", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf bar.Detail2
*/
	onInit: function() {
		var model = new sap.ui.model.json.JSONModel("util/data/chartData.json");
		sap.ui.getCore().setModel(model, "model");
		this.getView().setModel(model);
		
		 var bus = sap.ui.getCore().getEventBus();
		 var thisPage = this
		 bus.subscribe("master", "todetail", function(evt, channel, data) {
				thisPage.listInfo = data.listItem;
				thisPage.getView().setBindingContext(thisPage.listInfo);
				console.log("asd");
			});
	},
	NavBack : function(evt) {
		splitApp2.backDetail();
	}
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf bar.Detail2
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf bar.Detail2
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf bar.Detail2
*/
//	onExit: function() {
//
//	}

});