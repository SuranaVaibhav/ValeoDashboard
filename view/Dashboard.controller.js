jQuery.sap.require("sap.ca.ui.model.type.Date");
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.ca.ui.model.format.AmountFormat");
var dashboardThis;
var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var firstDonutChart = null;
var secondDonutChart = null;
var thirdDonutChart = null;
var fourthDonutChart = null; 
var fifthDonutChart = null;
var color = d3.scale.ordinal().range([ "#ff6600", "#cc0000", "#f27d47", "#ff6600", "#cc0000", "#f27d47" ]);

sap.ui.core.mvc.Controller.extend("ValeoDashboard.view.Dashboard", {
	_oItemTemplate : null,
	_oNavigationTable : null,
	_sItemPath : "",
	_sNavigationPath : "",
	dataOfDelayedPromises : [],
	dataOfDelayedDelivery : [],
	dataOfDelayedPickups : [],

	chartTableFragment : null,

	onInit : function() {
		dashboardThis = this;

		dashboardThis.chartTableFragment = sap.ui.xmlfragment("ValeoDashboard.view.chartTable", dashboardThis);
		dashboardThis.getView().byId("NumberDelayedPromises").setContent(new sap.m.VBox({
			items : [ new sap.m.Label({
				text : "Number of Delayed Promises "
			}).addStyleClass('chartLabel'), new sap.m.VBox("chart1", {
				height : "380px",
				
				alignItems : "Center"
			}).addStyleClass('first').addStyleClass('bottom2rem'), ]
		}))
		dashboardThis.getView().byId("LatePickUp").setContent(new sap.m.VBox({
			items : [ new sap.m.Label({
				text : "Number of Late Pickups "
			}).addStyleClass('chartLabel'), new sap.m.VBox("chart2", {
				height : "380px",
				alignItems : "Center"
			}).addStyleClass('latePickup').addStyleClass('bottom2rem'), ]
		}));
		dashboardThis.getView().byId("LateDeliveries").setContent(new sap.m.VBox({
			items : [ new sap.m.Label({
				text : "Number of Delayed Deliveries"
			}).addStyleClass('chartLabel'), new sap.m.VBox("chart66", {
				height : "380px",
				alignItems : "Center"
			}).addStyleClass('delayesDeliveries').addStyleClass('bottom2rem'), ]
		}));
		dashboardThis.getView().byId("PromiseConfirmationRate").setContent(new sap.m.VBox({
			items : [ new sap.m.Label({
				text : "Promise Confirmation Rate"
			}).addStyleClass('chartLabel'), new sap.m.VBox("chart3", {
				height : "380px",
				alignItems : "Center"
			}).addStyleClass('promiseConfirmation').addStyleClass('bottom2rem'), ]
		}));
		dashboardThis.getView().byId("DeliveryProgressRate").setContent(new sap.m.VBox({
			items : [ new sap.m.Label({
				text : "Delivery Progress Rate "
			}).addStyleClass('chartLabel'), new sap.m.VBox("chart4", {
				height : "380px",
				alignItems : "Center"
			}).addStyleClass('deliveryProgress').addStyleClass('bottom2rem'), ]
		}));
		dashboardThis.getView().byId("ReceptionEffort").setContent(new sap.m.VBox({
			items : [ new sap.m.Label({
				text : "Reception Effort"
			}).addStyleClass('chartLabel'), new sap.m.VBox("chart5", {
				height : "380px"
			}).addStyleClass('multiseries').addStyleClass('bottom2rem'), ]
		}));

		window.setTimeout(function() {
			d3.json("util/data/chartData.json", function(error, d) {
				var color = d3.scale.ordinal().range([ "#ff6600", "#cc0000", "#f27d47", "#ff6600", "#cc0000", "#f27d47" ]);
				dashboardThis.dataOfDelayedPromises = dashboardThis.getData(d, "PromisedStatus");
				firstDonutChart = new donutChart.createDonutChart(".first", dashboardThis.dataOfDelayedPromises["all"], dashboardThis.dataOfDelayedPromises["all"][0]["itemValue"],color);
				
				var color = d3.scale.ordinal().range([ "#ff6600", "#cc0000", "#f27d47", "#ff6600", "#cc0000", "#f27d47" ]);
				dashboardThis.dataOfDelayedPickups = dashboardThis.getData(d, "PickupStatus");
				secondDonutChart = new donutChart.createDonutChart(".latePickup", dashboardThis.dataOfDelayedPickups["all"], dashboardThis.dataOfDelayedPickups["all"][0]["itemValue"],color);
				
				var color = d3.scale.ordinal().range([ "#ff6600", "#cc0000", "#f27d47", "#ff6600", "#cc0000", "#f27d47" ]);
				dashboardThis.dataOfDelayedDelivery = dashboardThis.getData(d, "DeliveryStatus");
				thirdDonutChart = new donutChart.createDonutChart(".delayesDeliveries", dashboardThis.dataOfDelayedDelivery["all"], dashboardThis.dataOfDelayedDelivery["all"][0]["itemValue"],color);
				
				var color = d3.scale.ordinal().range([ "#95d238" ]);
				dashboardThis.dataOfDelayedPickups = dashboardThis.getData(d, "PickupStatus");
				fourthDonutChart = new donutChart.createDonutChart(".promiseConfirmation", dashboardThis.dataOfDelayedPickups["all"], dashboardThis.dataOfDelayedPickups["all"][0]["itemValue"]+"%",color);
				
				var color = d3.scale.ordinal().range([ "#ff6600" ]);
				dashboardThis.dataOfDelayedDelivery = dashboardThis.getData(d, "DeliveryStatus");
				fifthDonutChart = new donutChart.createDonutChart(".deliveryProgress", dashboardThis.dataOfDelayedDelivery["all"], dashboardThis.dataOfDelayedDelivery["all"][0]["itemValue"]+"%",color);
			
			});

		}, 2000);

		var chart5 = $('#chart5');
		window.setTimeout(function() {
			var tooltip = d3.select(".tooltip");
			var $container = $('.multiseries');
			var pie = 2 * Math.PI, width = $container.width(), height = $container.height(), innerRadius = Math.min(width, height) / 4,
			// innerRadius = (outerRadius/4)*3,
			fontSize = (Math.min(width, height) / 4);

			var dataset = {
				weeks : [ 1, 1 ],
				trimester : [ 1, 1, 1 ],
				trimestr : [ 1, 1, 4 ],
				fourth : [ 1 ]
			};

			var currentWeek = 23;

			var seriesNames = [ "Vecka", "Trimester" ];

			var color = d3.scale.ordinal().range([ "#CDC9C9" ]);

			var pie = d3.layout.pie().sort(null);

			var arc = d3.svg.arc();

			var svg = d3.select('.multiseries').append("svg").attr("width", '470px').attr("height", '470px')
			// .attr('viewBox','0 0
			// '+Math.min(width,height) +'
			// '+Math.min(width,height) )
			.attr('preserveAspectRatio', 'xMinYMin').append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			var gs = svg.selectAll("g").data(d3.values(dataset)).enter().append("g").attr("class", "arc");

			var path = gs.selectAll("path").data(function(d) {
				return pie(d);
			}).enter().append("path").attr("fill", function(d, i) {
				return color(i);
			}).attr("d", function(d, i, j) {
				return arc.innerRadius(innerRadius + (18 * j)).outerRadius(innerRadius + 18 + (18 * j))(d);
			}).attr("class", function(d, i, j) {
				if (i >= currentWeek && j < 1)
					return "passed";
			}).on("mousemove", function(d, i, j) {
				tooltip.style("left", d3.event.pageX + 10 + "px");
				tooltip.style("top", d3.event.pageY - 25 + "px");
				tooltip.style("display", "inline-block");
				tooltip.select("span").text(seriesNames[j] + " " + (i + 1));
			}).on("mouseout", function() {
				tooltip.style("display", "none");
			}).on("click", function(d, j) {
				var thisWeek = j + 1;

			});

		}, 2000)
		// End of Graph for rate Delivery Reception Effort(Multi Series)

		// Graph for Reception Planned vs Actual(Column)

		dashboardThis.getView().byId("ReceptionPlannedActual").setContent(new sap.m.VBox({

			items : [

			new sap.m.Label({
				text : "Reception Planned Vs Actual"

			}), new sap.m.VBox("chart7", {

				height : "320px"
			}).addStyleClass('bar'),

			]

		}))

		window.setTimeout(function() {
			var chart7 = new CanvasJS.Chart("chart7", {
				theme : "theme3",
				animationEnabled : true,
				title : {
					text : " ",
					fontSize : 30
				},
				toolTip : {
					shared : true
				},
				axisY : {

				},
				axisY2 : {
					title : " "
				},
				data : [ {
					type : "column",
					name : "ForeCast",
					legendText : "ForeCast",
					showInLegend : true,
					dataPoints : [ {
						label : "26/11/2015 6:00",
						y : 262
					}, {
						label : "26/11/2015 8:30",
						y : 211
					}, {
						label : "26/11/2015 10:00",
						y : 175
					}, {
						label : "26/11/2015 11:30",
						y : 137
					}, {
						label : "26/11/2015 13:00",
						y : 115
					}, {
						label : "26/11/2015 14:30",
						y : 104
					}, {
						label : "26/11/2015 16:00",
						y : 97.8
					}, {
						label : "26/11/2015 17:30",
						y : 60
					}, {
						label : "26/11/2015 19:00",
						y : 23.3
					}, {
						label : "26/11/2015 20:30",
						y : 20.4
					}

					]
				}, {
					type : "column",
					name : "Reception",
					legendText : "Reception",
					axisYType : "secondary",
					showInLegend : true,
					dataPoints : [ {
						label : " 6:00",
						y : 11.15
					}, {
						label : " 8:30",
						y : 2.5
					}, {
						label : "10:00",
						y : 3.6
					}, {
						label : " 11:30",
						y : 4.2
					}, {
						label : "13:00",
						y : 2.6
					}, {
						label : "14:30",
						y : 2.7
					}, {
						label : " 16:00",
						y : 3.1
					}, {
						label : " 17:30",
						y : 10.23
					}, {
						label : " 19:00",
						y : 10.3
					}, {
						label : " 20:30",
						y : 4.3
					}

					]
				}

				],
				legend : {
					cursor : "pointer",
					itemclick : function(e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						} else {
							e.dataSeries.visible = true;
						}
						chart7.render();
					}
				},
			});

			chart7.render();
		}, 2000)
		// End of Graph for Reception Planned vs Actual(Column)
	},

	getData : function(d, parameter) {
		var data = [];
		var supplierList = [];
		var allDelayedPromises = 0;
		var delays = {};
		for (var i = 0; i < d.length; i++) {

			if (d[i][parameter] == "C") {
				if (delays[d[i].SupplierName]) {
					delays[d[i].SupplierName]++;
				} else {
					delays[d[i].SupplierName] = 1;
					supplierList.push({
						"SupplierName" : d[i].SupplierName
					});
				}
				allDelayedPromises++;
			}

		}
		var intermediaries = [];
		for (var i = 0; i < supplierList.length; i++) {

			var tempObjectForIntermediary = {};
			tempObjectForIntermediary.itemValue = delays[supplierList[i].SupplierName];
			tempObjectForIntermediary.itemLabel = supplierList[i].SupplierName;
			intermediaries.push(tempObjectForIntermediary);

			var tempObjectForSupplier = {};
			tempObjectForSupplier.itemLabel = supplierList[i].SupplierName;
			tempObjectForSupplier.itemValue = delays[supplierList[i].SupplierName];
			data[supplierList[i].SupplierName] = [ tempObjectForSupplier ];

		}

		var chartData = new sap.ui.model.json.JSONModel();
		chartData.setData(supplierList);
		dashboardThis.getView().byId("select3").setModel(chartData);
		dashboardThis.getView().byId("select3").setSelectedKey(supplierList[0].SupplierName)

		var forNone = [];
		var tempObjectForNone = {};
		tempObjectForNone.itemLabel = "Number of Delayed Promises";
		tempObjectForNone.itemValue = allDelayedPromises;

		forNone.push(tempObjectForNone);

		data["intermediaries"] = intermediaries;
		data["all"] = forNone;
		return data;
	},
	chartTable : function() {

		/* dashboardThis.chartTableFragment.open(); */
		// sap.ui.core.UIComponent.getRouterFor(this).navTo("TileAddButtonSplitApp");
		if (app.getPage("TileAddButtonSplitApp") == null) {
			var page = sap.ui.xmlview("TileAddButtonSplitApp", "ValeoDashboard.view.TileAddButtonSplitApp");
			app.addPage(page);
		}
		app.to("TileAddButtonSplitApp", "flip");
		var selectedSupplier='';
		if(this.getView().byId("select1").getSelectedKey()=="None"||this.getView().byId("select1").getSelectedKey()=="Intermediary"){
			selectedSupplier="";
		}
		else{
			selectedSupplier = this.getView().byId("select3").getSelectedKey();
		}
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("Evt", "SetSearchField", {
			selectedSupplier : selectedSupplier
		});

	},
	variantDrop : function(oEvent) {
		if (!this._oPopover) {
			this._oPopover = sap.ui.xmlfragment("ValeoDashboard.view.filterPopOver", this);
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
	onChangeFilter : function(evt) {

		var selectedSupplier = dashboardThis.getView().byId("select3").getSelectedKey();
		var text = evt.oSource.getSelectedItem().getText();
		var svg = d3.select('.first').attr("width", '0px').attr("height", '0px');
		if (text == "Supplier") {
			this.getView().byId("supplier").setVisible(true);
			this.getView().byId("select").setVisible(true);

			firstDonutChart.update(dashboardThis.dataOfDelayedPromises[selectedSupplier], dashboardThis.dataOfDelayedPromises[selectedSupplier][0]["itemValue"])
			secondDonutChart.update(dashboardThis.dataOfDelayedPickups[selectedSupplier], dashboardThis.dataOfDelayedPickups[selectedSupplier][0]["itemValue"])
			thirdDonutChart.update(dashboardThis.dataOfDelayedDelivery[selectedSupplier], dashboardThis.dataOfDelayedDelivery[selectedSupplier][0]["itemValue"])

		} else if (text == "Intermediary") {
			firstDonutChart.update(dashboardThis.dataOfDelayedPromises["intermediaries"], dashboardThis.dataOfDelayedPromises["all"][0]["itemValue"])
			secondDonutChart.update(dashboardThis.dataOfDelayedPickups["intermediaries"], dashboardThis.dataOfDelayedPickups["all"][0]["itemValue"])
			thirdDonutChart.update(dashboardThis.dataOfDelayedDelivery["intermediaries"], dashboardThis.dataOfDelayedDelivery["all"][0]["itemValue"])
			this.getView().byId("supplier").setVisible(false);
			this.getView().byId("select").setVisible(true);

		} else {
			firstDonutChart.update(dashboardThis.dataOfDelayedPromises["all"], dashboardThis.dataOfDelayedPromises["all"][0]["itemValue"])
			secondDonutChart.update(dashboardThis.dataOfDelayedPickups["all"], dashboardThis.dataOfDelayedPickups["all"][0]["itemValue"])
			thirdDonutChart.update(dashboardThis.dataOfDelayedDelivery["all"], dashboardThis.dataOfDelayedDelivery["all"][0]["itemValue"])

			this.getView().byId("supplier").setVisible(false);
			this.getView().byId("select").setVisible(true);
			
		}

	},

	handleOkPressDialog : function() {
		dashboardThis.chartTableFragment.close();

	},
	onSupplierSelect : function(evt) {
		var selectedSupplier = evt.oSource.getSelectedKey();
		var d = evt.oSource.getModel().oData;
		firstDonutChart.update(dashboardThis.dataOfDelayedPromises[selectedSupplier], dashboardThis.dataOfDelayedPromises[selectedSupplier][0]["itemValue"])
		secondDonutChart.update(dashboardThis.dataOfDelayedPickups[selectedSupplier], dashboardThis.dataOfDelayedPickups[selectedSupplier][0]["itemValue"])
		thirdDonutChart.update(dashboardThis.dataOfDelayedDelivery[selectedSupplier], dashboardThis.dataOfDelayedDelivery[selectedSupplier][0]["itemValue"])

	}

});