var SuppplierMaster;
sap.ui.controller("ValeoDashboard.view.supplierMaster1", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf bar.Master1
	 */
	onInit : function() {
		SuppplierMaster = this;
		var model = new sap.ui.model.json.JSONModel("util/data/chartData.json");
		sap.ui.getCore().setModel(model, "model");
		this.getView().setModel(model);
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("Evt", "SetSearchField", function(evt, channel, data) {
			selectedSupplier = data.selectedSupplier;

			window.setTimeout(function() {
				SuppplierMaster.getView().byId("searchField").setValue(selectedSupplier);
				SuppplierMaster.handleSearch();
				var context = SuppplierMaster.getView().byId("supplierMasterList").getItems()[0].getBindingContext();
				
				var bus = sap.ui.getCore().getEventBus();
				bus.publish("master", "todetail", {
					listItem : context
				});
			}, 500);

			/*
			 * thisPage.getView().setBindingContext(thisPage.listInfo);
			 * thisPage.getView().byId("Supplier").setBindingContext(thisPage.listInfo);
			 */
			
			// sap.m.MessageToast.show(listInfo);
		});
	},
	handleSearch : function(evt) {
		var aFilters = [];

		var key = SuppplierMaster.getView().byId("searchField").getValue();

		if (key.length > 0) {

			filters = new sap.ui.model.Filter("SupplierName", sap.ui.model.FilterOperator.Contains, key);
			aFilters.push(filters);

		}

		var list = SuppplierMaster.getView().byId("supplierMasterList");
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
		/* window.history.go(-1); */
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf bar.Master1
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf bar.Master1
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf bar.Master1
 */
// onExit: function() {
//
// }
});