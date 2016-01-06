jQuery.sap.require("sap.ca.ui.model.type.Date");
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.ca.ui.model.format.AmountFormat");
var detailThis;
sap.ui.core.mvc.Controller.extend("ValeoDashboard.view.Details", {
	_oItemTemplate: null,
	_oNavigationTable: null,
	_sItemPath: "",
	_sNavigationPath: "",

	onInit: function() {
		detailThis=this;
		// this._oView = this.getView();
		// this._oComponent = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this._oView));
		// this._oRouter = this._oComponent.getRouter();
		// this._oNavigationTable = this.byId("navigationTable");
		// this._oItemTemplate = this.byId("navigationListItem").clone();

		// Get Context Path for Page 2 Screen
		// this._oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
	},

	// Bind Review Table using oData Reviews Entity
	_bindNavigationTable: function(sURL) {
		this._oNavigationTable.bindItems({
			path: sURL,
			template: this._oItemTemplate
		});
	},
	
	
	switchChange:function(){
if(masterThis.getView().byId("switch2").getState()==false){

			
			if (app.getPage("tableView") == null) {
 				var page = sap.ui.xmlview("tableView", "ValeoDashboard.view.Details"); 			
 				app.addPage(page);
			}    
		app.to("tableView", "slide");
 			return;
			
		}
		
		if(detailThis.getView().byId("switch2").getState()==false){

			
			if (app.getPage("sideContentContainer") == null) {
				var page = sap.ui.xmlview("sideContentContainer", "ValeoDashboard.view.Master");
				app.addPage(page);
			}    
			app.to("sideContentContainer", "flip");
			masterThis.getView().byId("switch").setState(false);
			return;
			
		}
		
},
navigate:function(){
	detailThis.getView().byId("backButton").setVisible(true);
	detailThis.getView().byId("navigationTable").setVisible(false);
	detailThis.getView().byId("secondTable").setVisible(true);
},
backButton:function(){
	detailThis.getView().byId("secondTable").setVisible(false);
	detailThis.getView().byId("navigationTable").setVisible(true);
	detailThis.getView().byId("backButton").setVisible(false);
	
},
	_onRoutePatternMatched: function(oEvent) {
		if (oEvent.getParameter("name") !== "details") {
			return;
		}

		this._sItemPath = "/" + oEvent.getParameters().arguments.entity;
		this._sNavigationPath = this._sItemPath + "/" + "";

		// Bind Object Header and Form using oData
		this.byId("DetailsPage").bindElement({
			path: this._sItemPath
		});

		// Bind Review Table using oData Reviews Entity
		this._bindNavigationTable(this._sNavigationPath);
	},

	onNavBack: function() {
		window.history.go(-1);
	}
});