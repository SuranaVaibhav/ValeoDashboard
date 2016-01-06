jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("ValeoDashboard.util.messages");
var app;
var mainApp;
var mainThis;
sap.ui.core.mvc.Controller.extend("ValeoDashboard.view.Main", {
	
	onInit : function() {
		mainThis = this;
		app = mainThis.getView().byId("fioriContent2");
		mainApp = app;
		//app.setDefaultTransitionNameMaster("show");
		//app.setDefaultTransitionNameDetail("show");
		// if (sap.ui.Device.support.touch === false) {
		// this.getView().addStyleClass("sapUiSizeCompact");
		// }
		//		
		// ValeoDashboard.util.messages.moment();
		var model = new sap.ui.model.json.JSONModel("util/data/popover.json");
		sap.ui.getCore().setModel(model, "model");
		mainThis.oPopover = sap.ui.xmlfragment("ValeoDashboard.view.popover", this);
		mainThis.oPopover.setModel(model);
		mainThis.getView().addDependent(this.oPopover);
		window.setInterval(function(){
			var bigFont = mainThis.getView().byId("bigFont");
			var date=new Date()
			var hours=date.getHours();
			var min=date.getMinutes();
			var sec=date.getSeconds();
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern : "hh:mm:ss"
			});
			bigFont.setText(oDateFormat.format(date))
			
		},1000);
		
	},
	variantDrop : function(oEvent) {
		if (!this._oPopover) {
			this._oPopover = sap.ui.xmlfragment("ValeoDashboard.view.popover",
					this);
			this.getView().addDependent(this._oPopover);
		}
		var oButton = oEvent.getSource();
		jQuery.sap.delayedCall(0, this, function() {
			this._oPopover.openBy(oButton);
		});
	},
	handlePress : function() {
		this._oPopover.close();
	},

	setTime:function(time){
		
		
	},
	handleSelectionChange : function(oEvent) {
		var changedItem = oEvent.getParameter("changedItem");
		var isSelected = oEvent.getParameter("selected");
		
		var state = "Selected";
		if (!isSelected) {
			state = "Deselected"
		}
	},
	
	moneyPress:function(){
		
	var moneyBtn=	mainThis.getView().byId("money")
	moneyBtn.tooltip('You saved money')
		
	},
	leafPress:function(){
		
		var leafBtn=	mainThis.getView().byId("leaf")
		leafBtn.tooltip("Think Green.There is no planet B")
		
	},
	handleSelectionFinish : function(oEvent) {
		
	},
//	variantDrop : function(oEvent) {
//		if (!this._oPopover) {
//			this._oPopover = sap.ui.xmlfragment("ValeoDashboard.view.popover", this);
//			this.getView().addDependent(this._oPopover);
//		}
//		var oButton = oEvent.getSource();
//		jQuery.sap.delayedCall(0, this, function() {
//			this._oPopover.openBy(oButton);
//		});
//	},
	handlePress : function() {
		this._oPopover.close();
	},
	// showPopOver : function(evt) {
	//
	// var msg = new sap.m.ResponsivePopover({
	// placement:"Bottom",
	// contentWidth:"20%",
	// contentHeight:"40%",
	// content : [ new sap.m.ObjectHeader({
	// icon:"sap-icon://goal",
	// title:"MQB2:",
	// attributes: new sap.m.ObjectAttribute({
	// text:"Current Production Delay:0"
	// })
	// }), new sap.m.ObjectHeader({
	// icon:"sap-icon://goal",
	// title:"MQB2:",
	// attributes: new sap.m.ObjectAttribute({
	// text:"Current Production Delay:5"
	// })
	// }),new sap.m.ObjectHeader({
	// icon:"sap-icon://goal",
	// title:"MQB2:",
	// attributes: new sap.m.ObjectAttribute({
	// text:"Current Production Delay:4"
	// })
	// }), new sap.m.ObjectHeader({
	// icon:"sap-icon://goal",
	// title:"MQB2:",
	// attributes: new sap.m.ObjectAttribute({
	// text:"Current Production Delay:0"
	// })
	// })]
	// })
	// msg.openBy(evt.getSource());
	//
	// },
	onAfterRendering : function() {
		ValeoDashboard.util.messages.moment();
		
	},
	onChange : function(evt) {
		var text = evt.oSource.getSelectedItem().getText();
		
		if (text == "Supplier") {
			this.getView().byId("supplier").setVisible(true);// filterItem2
			// this.getView().byId("mainPage").getContent()[0].getContent()[0].getFilterItems()[1].setLabel("Supplier");
			// this.getView().byId("filterItem2").setVisible(true);
		} else if (text == "Intermediatary") {
			this.getView().byId("select").setVisible(true);
			// this.getView().byId("mainPage").getContent()[0].getContent()[0].getFilterItems()[2].setLabel("Select");
		} else {
			this.getView().byId("supplier").setVisible(false);
			this.getView().byId("select").setVisible(false);
		}
		
	},
	showPopOver : function(oEvent) {
		
	
		
		var oButton = oEvent.getSource();
		jQuery.sap.delayedCall(0, this, function() {
			mainThis.oPopover.openBy(oButton);
		});
		
	},
	onPress : function(evt) {
		var aFilters = [];
		var model = sap.ui.getCore().getModel("model");
		var key = evt.oSource.getIcon();
		var key1 = evt.oSource.getText();
		for (var i = 0; i < model.oData.popover.length; i++) {
			if (key == model.oData.popover[i].icon) {
				
				filters = new sap.ui.model.Filter("icon", sap.ui.model.FilterOperator.Contains, key);
				aFilters.push(filters);
				
			}
		}
		
		var list = this.oPopover.getContent()[0];
		var binding = list.getBinding("items");
		binding.filter(aFilters, "Application");
		
		if (key1 == "All") {
			this.oPopover.setModel(sap.ui.getCore().getModel("model"));
		}
		
	},
	
	/*
	 * switchChange : function() { if (mainThis.getView().byId("switch").getState() == true) { if (app.getDetailPage("tableView") == null) { var page = sap.ui.xmlview("tableView", "ValeoDashboard.view.Details"); app.addDetailPage(page); } app.toDetail("tableView", "flip"); //
	 * app.getView().byId("switch2").setState(true); return; } if (mainThis.getView().byId("switch").getState() == false) { app.backDetail(); window.setTimeout(function(){ chart = new CanvasJS.Chart("chart1", { animationEnabled: true, data: [ { type: "doughnut", startAngle: 60,
	 * toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>", showInLegend: true, dataPoints: [ {y: 65899660, legendText: "Delayed Promises " } ] } ] }) chart.render(); },500) window.setTimeout(function(){ var chart = new CanvasJS.Chart("chart2", { animationEnabled:
	 * true, data: [ { type: "doughnut", startAngle: 60, toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>", showInLegend: true, dataPoints: [ {y: 65899660, legendText: "Late PickUp" } ] } ] }) chart.render(); },500) window.setTimeout(function(){ var chart = new
	 * CanvasJS.Chart("chart3", { animationEnabled: true, data: [ { type: "doughnut", startAngle: 60, toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>", showInLegend: true, dataPoints: [ {y: 65899660, legendText: "Confirmed" }, {y: 60929152, legendText:
	 * "Remaining" }, ] } ] }) chart.render(); },500) window.setTimeout(function(){ var chart = new CanvasJS.Chart("chart4", { animationEnabled: true, data: [ { type: "doughnut", startAngle: 60, toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>", showInLegend:
	 * true, dataPoints: [ {y: 65899660, legendText: "Delivered" }, {y: 65899660, legendText: " " }, {y: 60929152, legendText: "Remaining" } ] } ] }) chart.render(); },500) window.setTimeout(function(){ var chart = new CanvasJS.Chart("chart5", { animationEnabled: true, data: [ {
	 * type: "doughnut", startAngle: 60, toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>", showInLegend: true, dataPoints: [ {y: 65899660, legendText: "Remaining" }, {y: 65899660, legendText: " " }, ] } ] }) chart.render(); },500) window.setTimeout(function(){
	 * var chart = new CanvasJS.Chart("chart66", { animationEnabled: true, data: [ { type: "doughnut", startAngle: 60, toolTipContent: "{legendText}: {y} - <strong>#percent% </strong>", showInLegend: true, dataPoints: [ {y: 65899660, legendText: "Late Deliveries" } ] } ] })
	 * chart.render(); },500) window.setTimeout(function(){ var chart7 = new CanvasJS.Chart("chart7", { theme: "theme3", animationEnabled: true, title:{ text: " ", fontSize: 30 }, toolTip: { shared: true }, axisY: { }, axisY2: { title: " " }, data: [ { type: "column", name:
	 * "ForeCast", legendText: "ForeCast", showInLegend: true, dataPoints:[ {label: "26/11/2015 6:00", y: 262}, {label: "26/11/2015 8:30", y: 211}, {label: "26/11/2015 10:00", y: 175}, {label: "26/11/2015 11:30", y: 137}, {label: "26/11/2015 13:00", y: 115}, {label: "26/11/2015
	 * 14:30", y: 104}, {label: "26/11/2015 16:00", y: 97.8}, {label: "26/11/2015 17:30", y: 60}, {label: "26/11/2015 19:00", y: 23.3}, {label: "26/11/2015 20:30", y: 20.4} ] }, { type: "column", name: "Reception", legendText: "Reception", axisYType: "secondary", showInLegend:
	 * true, dataPoints:[ {label: "Reception Planned for 6:00", y: 11.15}, {label: "Reception Planned for 8:30", y: 2.5}, {label: "Reception Planned for 10:00", y: 3.6}, {label: "Reception Planned for 11:30", y: 4.2}, {label: "Reception Planned for 13:00", y: 2.6}, {label:
	 * "Reception Planned for 14:30", y: 2.7}, {label: "Reception Planned for 16:00", y: 3.1}, {label: "Reception Planned for 17:30", y: 10.23}, {label: "Reception Planned for 19:00", y: 10.3}, {label: "Reception Planned for 20:30", y: 4.3} ] } ], legend:{ cursor:"pointer",
	 * itemclick: function(e){ if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) { e.dataSeries.visible = false; } else { e.dataSeries.visible = true; } chart7.render(); } }, }); chart7.render(); },500) } },
	 */

	// switchChange : function() {
	// 	//	$(#__text3).css('color','#95d238');
	// 	//		$(#__text3).css('color','grey');
	// //	sap.ui.core.UIComponent.getRouterFor(this).navTo("SplitApp1");
	// 	if (mainApp.getPage("TileAddButtonSplitApp") == null) {
		
	// 		var page = sap.ui.xmlview("TileAddButtonSplitApp", "ValeoDashboard.view.TileAddButtonSplitApp");
	// 		mainApp.addPage(page);
	// 	}
	// 	mainApp.to("TileAddButtonSplitApp", "flip");
	// 	if (mainApp.getPage("DashboardView") == null) {
	// 	var page = sap.ui.xmlview("DashboardView", "ValeoDashboard.view.Dashboard");
	// 		mainApp.back()
		
	// 	}
	// 	mainApp.to("DashboardView", "flip");
		
	// },
	switchChange : function(evt) {

if(evt.oSource.getState()){
	$('#__text3').css('color','grey')
		$('#__text2').css('color','lightgrey')
if (app.getPage("TileAddButtonSplitApp") == null) {
var page = sap.ui.xmlview("TileAddButtonSplitApp", "ValeoDashboard.view.TileAddButtonSplitApp");
app.addPage(page);
}
app.to("TileAddButtonSplitApp", "flip");
}
else {
	$('#__text2').css('color','grey')
		$('#__text3').css('color','lightgrey')
app.backToTop();
}
},
	
	notifications : function() {
		
		if (mainThis.getView().byId("splitApp").getMode() == "HideMode") {
			window.setTimeout(function() {
				mainThis.getView().byId("splitApp").setMode("ShowHideMode");
				app.setDefaultTransitionNameMaster("show");
				app.setDefaultTransitionNameDetail("show");
			}, 1000);
			$('.display').css("background-color", "lightgreen");
			mainThis.getView().byId("splitApp").setMode("ShowHideMode");
			app.setDefaultTransitionNameMaster("show");
			app.setDefaultTransitionNameDetail("show");
			return;
		}
		if (mainThis.getView().byId("splitApp").getMode() == "ShowHideMode") {
			mainThis.getView().byId("splitApp").setMode("HideMode");
			$('.display').css("background-color", "lightgrey")
			app.setDefaultTransitionNameMaster("show");
			app.setDefaultTransitionNameDetail("show");
			return;
		}
		
	}
});