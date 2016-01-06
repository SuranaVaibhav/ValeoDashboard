var deliveryMaster = null;
sap.ui.controller("ValeoDashboard.view.deliveryMaster2", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf bar.Master2
	 */
	onInit : function() {
		deliveryMaster = this;
		var model = new sap.ui.model.json.JSONModel("util/data/chartData.json");
		sap.ui.getCore().setModel(model, "model");
		this.getView().setModel(model);
		window.setTimeout(function() {
			deliveryMaster.setFirstItem();
		}, 1000);
	},
	setFirstItem : function(oEvent) {
		var Model = sap.ui.getCore().getModel("model");
		var item = this.getView().byId("id").getItems();
		this.getView().byId("supid").setText("Products(" + Model.oData.length + ")");
		// item[0].setSelected(true);
		var context = item[0].getBindingContext();
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("master", "todetail", {
			listItem : context
		});
	},
	handleSearch : function(evt) {
		var aFilters = [];
		// var model=sap.ui.getCore().getModel("model");
		var key = this.getView().byId("searchField").getValue();
		if (key.length <= 0) {

			key = evt.oSource.getValue();
		}

		if (key.length > 0) {

			filters = new sap.ui.model.Filter("Inbound delivery", sap.ui.model.FilterOperator.Contains, key);
			aFilters.push(filters);

		}

		var list = this.getView().byId("id");
		var binding = list.getBinding("items");
		binding.filter(aFilters, "Application");
	},

	onPress : function(evt) {
		// evt.getSource().setSelected(true);
		var context = evt.getSource().getBindingContext();
		// this.nav.to("detail", context);
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("master", "todetail", {
			listItem : context
		});
	},
	handleHomeSelect : function() {
		app.back();
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf bar.Master2
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf bar.Master2
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf bar.Master2
 */
// onExit: function() {
//
// }
});