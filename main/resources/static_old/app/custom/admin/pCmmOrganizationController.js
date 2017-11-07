angular
    .module('altairApp')
    	.controller("cmmOrgCtrl",['$rootScope','$scope','p_org','action','mainService','$state','sweet','$cookies',
	        function ($rootScope,$scope,p_org,action,mainService,$state,sweet,$cookies) {
				$scope.role=action;

				var yesno=[{"text":"tiim","value":1},{"text":"ugui","value":0}];
                $scope.domain="com.macro.dev.models.TcOrg.";
				$scope.pmenuGrid = {
					dataSource: {

						transport: {
                            read:  {
                                url: "/api/core/list/tc_org?access_token="+$cookies.get('access_token'),
                                data: {"sort":[{field: 'org_cd', dir: 'desc'}]},
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
                                options.data=JSON.stringify( options);
                                options.table="tc_org";
                                options.key="org_cd";
                                options.model=$scope.domain;
                                return options;
                            }
						},
						schema: {
							data:"data",
							total:"total",
							 model: {
								 id: "org_cd",
								 fields: {
									 org_cd: { editable: false,nullable: true},
									 addr_dtl: { type: "string", validation: { required: true } },
									 addr1_cd: { type: "string"},
									 aply_dt: { type: "string"},
									 clse_dt: { type: "string"},
									 fax_no: { type: "string"},
									 mod_dtm: { type: "string"},
									 mod_id: { type: "string"},
									 org_div_cd: { type: "string"},
									 org_hdcf_nm: { type: "string"},
									 org_lv_cd: { type: "string"},
									 org_nm: { type: "string"},
									 org_nm_eng: { type: "string"},
									 org_ord: { type: "number", default:0},
									 reg_dtm: { type: "string"},
									 reg_id: { type: "string"},
									 tel_no: { type: "string"},
									 uppr_org_cd: { type: "string"},
									 use_yn: { type: "number"}
								 }
							 }
						 },
						pageSize: 8,
						serverFiltering: true,
						serverPaging: true,
						serverSorting: true
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
					    {title: "#",template: "<span class='row-number'></span>", width:"60px"},
					    { field:"org_nm", title: "Нэр /Mn/" , width: "200px"},
					    { field: "tel_no", title:"URL" , width: "200px"},
					    { field: "uppr_org_cd", title:"IKON", width: "200px"},
					    { field: "addr_dtl", title:"Эцэг цэс", width: "200px"},
					    { field: "fax_no", title:"Дараалал", width: "200px" },
                        { field: "use_yn", values:yesno,title:"Дараалал", width: "200px" }
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

                if($scope.role.ruptype===1){
                    $scope.pmenuGrid.editable="inline";
                    if($scope.role.rcreate===1){
                        $scope.pmenuGrid.toolbar= ["create"];
                    }
                    if($scope.role.rupdate===1 && $scope.role.rdelete===1){
                        $scope.pmenuGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: "250px" });
                    }
                    else if($scope.role.rupdate===1 && $scope.role.rdelete===0){
                        $scope.pmenuGrid.columns.push({ command: ["edit"], title: "&nbsp;", width: "140px" });
                    }
                    else if($scope.role.rupdate===0 && $scope.role.rdelete===1){
                        $scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: "140px" });
                    }
                    if($scope.role.rexport===1){
                        $scope.pmenuGrid.toolbar.push("excel");
                        $scope.pmenuGrid.toolbar.push("pdf");
                    }

                }
                if($scope.role.ruptype===2){
                    $scope.pmenuGrid.editable="popup";
                    if($scope.role.rcreate===1){
                        $scope.pmenuGrid.toolbar= ["create"];
                    }
                    if($scope.role.rupdate===1 && $scope.role.rdelete===1){
                        $scope.pmenuGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: "250px" });
                    }
                    else if($scope.role.rupdate===1 && $scope.role.rdelete===0){
                        $scope.pmenuGrid.columns.push({ command: ["edit"], title: "&nbsp;", width: "140px" });
                    }
                    else if($scope.role.rupdate===0 && $scope.role.rdelete===1){
                        $scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: "140px" });
                    }
                    if($scope.role.rexport===1){
                        $scope.pmenuGrid.toolbar.push("excel");
                        $scope.pmenuGrid.toolbar.push("pdf");
                    }
                }
                if($scope.role.ruptype===3){
                    $scope.pmenuGrid.editable=true;

                    if($scope.role.rcreate===1){
                        if($scope.role.rupdate===1){
                            $scope.pmenuGrid.toolbar= ["create", "save", "cancel"];
                        }
                        else{
                            $scope.pmenuGrid.toolbar= ["create"];
                        }
                    }
                    if($scope.role.rdelete===1){
                        $scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: "140px" });
                    }
                    if($scope.role.rexport===1){
                        $scope.pmenuGrid.toolbar.push("excel");
                        $scope.pmenuGrid.toolbar.push("pdf");
                    }
                }
                if($scope.role.ruptype===4){
                    $scope.pmenuGrid.toolbar= kendo.template($("#add").html());
                    $scope.pmenuGrid.editable="popup";
                    $scope.pmenuGrid.columns.push({template: kendo.template($("#update").html()), width: "200px"});
                }

		}
    ]);
