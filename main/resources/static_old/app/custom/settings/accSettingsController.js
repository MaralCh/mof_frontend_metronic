angular
    .module('altairApp')
    	.controller("accSettingsCtrl",['$rootScope','$stateParams','$scope','mainService','$state','sweet','$cookies',
	        function ($rootScope,$stateParams,$scope,mainService,$state,sweet,$cookies) {
	    		var aj=[{"text":"ROOT","value":"null"}];
                var forumType=[{"text":"inline","value":1},{"text":"pop-up","value":2},{"text":"batch","value":3},{"text":"custom","value":4}];

                $scope.domain="com.macro.dev.models.SettingsAccount.";

                $scope.domain1="com.macro.dev.models.SettingsAccountDetail.";

                $scope.pmenuGrid = {
                    dataSource: {
                        transport: {
                            read:  {
                                url: "/api/core/list/SettingsAccount?access_token="+$cookies.get('access_token'),
                                data: {"sort":[{field: 'id', dir: 'asc'}]},
                                type: 'GET',
                                dataType: "json"
                            },
                            update: {
                                url: "/api/core/update/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                                dataType: "json",
                                type:"POST",
                                complete: function(e) {
                                    $(".k-grid").data("kendoGrid").dataSource.read();
                                }
                            },
                            destroy: {
                                url: "/api/core/delete/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                                dataType: "json",
                                type:"POST"
                            },
                            create: {
                                url: "/api/core/create/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                                dataType: "json",
                                type:"POST",
                                complete: function(e) {
                                    $(".k-grid").data("kendoGrid").dataSource.read();
                                }
                            },
                            parameterMap: function(options) {
                                options.data=JSON.stringify( options)
                                return options;
                            }
                        },
                        schema: {
                            data:"data",
                            total:"total",
                            model: {
                                id: "id",
                                fields: {
                                    id:  { nullable: false, type: "number"},
                                    code: { type: "string"},
                                    name: { type: "string"},
                                }
                            }
                        },
                        pageSize: 8,
                        serverPaging: true,
                        serverFiltering: true,
                        serverSorting: true
                    },
                    sortable: true,
                    pageable: {
                        refresh: true,
                        pageSizes: true,
                        buttonCount: 5
                    },
                    filterable:{
                        mode: "row"
                    },
                    dataBound: function () {

                        var grid =this;
                        grid.element.delegate("tbody>tr", "dblclick", function () {
                            grid.expandRow($(this));
                        });
                    },
					/*  dataBound: function() {
					 this.expandRow(this.tbody.find("tr.k-master-row").first());
					 },*/
                    columns: [
                        { field: "code", title: "Дансны код", width:150 },
                        { field: "name", title:"Дансны нэр" },
                    ]
                };

                var aj=[{"text":"Тийм","value":1},{"text":"Үгүй","value":0},{"text":"Үл хамаарах","value":2}];

                $scope.ordersGridOptions = function(dataItem) {
                    return {
                        dataSource: {
                         //   autoSync: true,
                            transport: {
                                read:  {
                                    url: "/api/core/list/SettingsAccountDetail?access_token="+$cookies.get('access_token'),
                                    data: {"sort":[{field: 'id', dir: 'asc'}]},
                                    type: 'GET',
                                    dataType: "json"
                                },
                                update: {
                                    url: "/api/core/update/"+$scope.domain1+"?access_token="+$cookies.get('access_token'),
                                    dataType: "json",
                                    type:"POST",
                                    complete: function(e) {
                                        $(".dgrid .k-grid").data("kendoGrid").dataSource.read();
                                    }
                                },
                                destroy: {
                                    url: "/api/core/delete/"+$scope.domain1+"?access_token="+$cookies.get('access_token'),
                                    dataType: "json",
                                    type:"POST"
                                },
                                create: {
                                    url: "/api/core/create/"+$scope.domain1+"?access_token="+$cookies.get('access_token'),
                                    dataType: "json",
                                    type:"POST",
                                    complete: function(e) {
                                        $(".dgrid .k-grid").data("kendoGrid").dataSource.read();
                                    }
                                },
                                parameterMap: function(options) {
                                    options.data=JSON.stringify( options)
                                    return options;
                                }
                            },
                            schema: {
                                data:"data",
                                total:"total",
                                model: {
                                    id: "id",
                                    fields: {
                                        id:  { nullable: false, type: "number"},
                                        code: { type: "string"},
                                        name: { type: "string"},
                                        parentcode: { type: "string" ,defaultValue:dataItem.code,editable:false},
                                    }
                                }
                            },
                            serverPaging: true,
                            serverSorting: true,
                            serverFiltering: true,
                            pageSize: 50,
                            filter: { field: "parentcode", operator: "eq", value: dataItem.code }
                        },
						toolbar:["create"],
                        scrollable: true,
                        sortable: true,
                        pageable: {
                            refresh: true,
                            pageSizes: true,
                            buttonCount: 5
                        },
                        columns: [
                            {title: "#",template: "<span class='row-number'></span>", width:60},
                            { field: "code", title:"Дансны код"},
                            { field: "name", title:"Дансны нэр"},
                            { field: "parentcode", title:"Харьялагдах дансны код"},
                            { command: ["edit","destroy"], title: "&nbsp;", width:270 }
                        ],
                        dataBound: function () {
                            var rows = this.items();
                            $(rows).each(function () {
                                var index = $(this).index() + 1
                                    + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
                                var rowLabel = $(this).find(".row-number");
                                $(rowLabel).html(index);
                            });
                        },
                        editable: "inline"
                    };
                };
	      
/*			$scope.pmenuGrid = {
				dataSource: {

					transport: {
						read:  {
							url: "/api/core/list/LutMenu?access_token="+$cookies.get('access_token'),
							data: {"sort":[{field: 'id', dir: 'asc'}]},
							type: 'GET',
							dataType: "json"
						},
						update: {
							url: "/api/core/update/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                            dataType: "json",
							type:"POST",
							complete: function(e) {
								$(".k-grid").data("kendoGrid").dataSource.read();
							}
						},
						destroy: {
							url: "/api/core/delete/"+$scope.domain+"",
							contentType:"application/json; charset=UTF-8",
							type:"POST"
						},
						create: {
							url: "/api/core/create/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                            dataType: "json",
							type:"POST",
							complete: function(e) {
								$(".k-grid").data("kendoGrid").dataSource.read();
							}
						},
                        parameterMap: function(options) {
                            options.data=JSON.stringify( options)
                            return options;
                        }
					},
					schema: {
						data:"data",
						total:"total",
						 model: {
							 id: "id",
							 fields: {
								 id: { editable: false,nullable: true},
								 menuname: { type: "string", validation: { required: true } },
								 stateurl: { type: "string", defaultValue:'#'},
								 uicon: { type: "string"},
								 parentid: { type: "number"},
                                 uptype: { type: "number"},
								 orderid: { type: "number" }
							 }
						 }
					 },
					pageSize: 8,
					serverFiltering: true,
					serverPaging: true,
					serverSorting: true
				},
                excel: {
                    fileName: "Export.xlsx",
                    proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                    filterable: true,
                    allPages: true,
                },
                pdf: {
                    allPages: true,
                    avoidLinks: true,
                    paperSize: "A4",
                    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    landscape: true,
                    repeatHeaders: true,
                    template: $("#page-template").html(),
                    scale: 0.8
                },
                pdfExport: function(e) {
                    e.sender.hideColumn(7);
                    e.promise
                        .progress(function(e) {
                            if (e.pageNumber > 1) {
                                e.page.options.pdf = {
                                    landscape: true
                                };
                            }
                        });
                },
				filterable:{
						 mode: "row"
					},
				sortable: true,
				resizable: true,
				pageable: {
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				},
				columns: [
				  	{title: "#",template: "<span class='row-number'></span>", width:60},
				  	{ field:"menuname", title: "Нэр /Mn/", width: 200 },
				  	{ field: "stateurl", title:"URL", width: 200 },
				  	{ field: "uicon", title:"IKON", width: 150},
				  	{ field: "parentid", values: aj, title:"Эцэг цэс", width: 200},
				  	{ field: "orderid", title:"Дараалал", width: 200 },
					{ field: "uptype", title:"форумын төрөл", width: 200,values:forumType }
				],
				dataBound: function () {
				var rows = this.items();
				  $(rows).each(function () {
					  var index = $(this).index() + 1
					  + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
					  var rowLabel = $(this).find(".row-number");
					  $(rowLabel).html(index);
				  });
			   },

			};*/

			if($rootScope.ruptype==1){
				$scope.pmenuGrid.editable="inline";
                if($rootScope.rcreate==1){
                    $scope.pmenuGrid.toolbar= ["create"];
				}
                if($rootScope.rupdate==1 && $rootScope.rdelete==1){
                    $scope.pmenuGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: "270px" });
                }
				else if($rootScope.rupdate==1 && $rootScope.rdelete==0){
                    $scope.pmenuGrid.columns.push({ command: ["edit"], title: "&nbsp;", width: "140px" });
				}
				else if($rootScope.rupdate==0 && $rootScope.rdelete==1){
                    $scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: "140px" });
                }
                if($rootScope.rexport==1){
                    $scope.pmenuGrid.toolbar.push("excel");
                    $scope.pmenuGrid.toolbar.push("pdf");
                }

			}
			if($rootScope.ruptype==2){
				$scope.pmenuGrid.editable="popup";
                if($rootScope.rcreate==1){
                    $scope.pmenuGrid.toolbar= ["create"];
                }
                if($rootScope.rupdate==1 && $rootScope.rdelete==1){
                    $scope.pmenuGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: "250px" });
                }
                else if($rootScope.rupdate==1 && $rootScope.rdelete==0){
                    $scope.pmenuGrid.columns.push({ command: ["edit"], title: "&nbsp;", width: "140px" });
                }
                else if($rootScope.rupdate==0 && $rootScope.rdelete==1){
                    $scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: "140px" });
                }
                if($rootScope.rexport==1){
                    $scope.pmenuGrid.toolbar.push("excel");
                    $scope.pmenuGrid.toolbar.push("pdf");
                }
			}
			if($rootScope.ruptype==3){
                $scope.pmenuGrid.editable=true;

                if($rootScope.rcreate==1){
                    if($rootScope.rupdate==1){
                        $scope.pmenuGrid.toolbar= ["create", "save", "cancel"];
					}
					else{
                        $scope.pmenuGrid.toolbar= ["create"];
					}
                }
                if($rootScope.rdelete==1){
                    $scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: "140px" });
                }
                if($rootScope.rexport==1){
                    $scope.pmenuGrid.toolbar.push("excel");
                    $scope.pmenuGrid.toolbar.push("pdf");
                }
			}
			if($rootScope.ruptype==4){
				$scope.pmenuGrid.toolbar= kendo.template($("#add").html());
				$scope.pmenuGrid.editable="popup";
				$scope.pmenuGrid.columns.push({template: kendo.template($("#update").html()), width: "200px"});
			}
	        
		}
    ]);
