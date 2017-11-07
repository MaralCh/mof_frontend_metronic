angular
    .module('altairApp')
    	.controller("invincomeCtrl",['$scope','$rootScope','orgs','mainService','$state','sweet','$cookies',
	        function ($scope,$rootScope,orgs,mainService,$state,sweet,$cookies) {
	    		var aj=[{"text":"ROOT","value":"null"}];
                var forumType=[{"text":"inline","value":1},{"text":"pop-up","value":2},{"text":"batch","value":3},{"text":"custom","value":4}];
                $scope.domain="com.macro.dev.models.EgJournal.";

                $rootScope.toBarActive = true;

                $scope.$on('$destroy', function() {
                    $rootScope.toBarActive = false;
                });

                $scope.cs={
                	orgId:$cookies.get("orgid")
				};

                $scope.inventory = function(){
                    mainService.withdata('POST', '/api/cmm/inv/create/'+$scope.domain,  $scope.cs).
                    then(function(data){
                        $state.go('restricted.inv.newincome',{id:data.id});
                    });
                };

				$scope.pmenuGrid = {
					dataSource: {

						transport: {
							read:  {
								url: "/api/core/list/EgJournal?access_token="+$cookies.get('access_token'),
								data: {"custom":"where orgId="+$cookies.get('orgid')+"","sort":[{field: 'id', dir: 'asc'}]},
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
									 id: { editable: false,nullable: true},
                                     code: { type: "string", validation: { required: true } },
									 orgid: { type: "number", validation: { required: true } },
									 mean: { type: "string",validation: { required: true } },
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
                        { field:"orgid", title: "Огноо"},
                        { field:"orgid", title: "Баримт №"},
                        { field:"orgid", title: "Баримтын төрөл" },
                        { field:"orgid", title: "Байршил"},
						{ field:"code",  title: "Харилцагчийн нэр"},
						{ field: "mean", title:"Гүйлгээний утга"},
                        { field: "mean", title:"Худалдан авалтын дүн"},
                        { field: "mean", title:"Төлбөрийн хэлбэр"},
                        { field: "mean", title:"Төлбөр төлөлт"},
                        { field: "mean", title:"Төлөгдөөгүй дүн"}
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

				};

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
                   // $scope.pmenuGrid.toolbar.push("excel");
                   // $scope.pmenuGrid.toolbar.push("pdf");
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
			//	$scope.pmenuGrid.toolbar= kendo.template($("#add").html());
				$scope.pmenuGrid.editable="popup";
				$scope.pmenuGrid.columns.push({template: kendo.template($("#update").html()), width: "200px"});
			}
	        
		}
    ]);
