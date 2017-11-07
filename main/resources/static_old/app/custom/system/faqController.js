angular
    .module('altairApp')
    	.controller("faqCtrl",['$rootScope','$scope','action','mainService','$state','sweet','$cookies',
	        function ($rootScope,$scope,action,mainService,$state,sweet,$cookies) {

	    		$scope.role=action;
                var forumType=[{"text":"inline","value":1},{"text":"pop-up","value":2},{"text":"batch","value":3},{"text":"custom","value":4}];
                $scope.domain="com.macro.dev.models.TcPgm.";


				$scope.edit = function(id){
				  mainService.withdomain('get', '/api/core/api/LutMenu/'+id).
					then(function(data){
						$scope.formdata=data[0];
						modalUpdate.show();
					});
				};

				$scope.submitForm = function($event){

					if($scope.formdata.id==null){
					  mainService.withdata('POST', '/api/core/create/'+$scope.domain,  $scope.formdata).
						then(function(data){
							modalUpdate.hide();
							$event.preventDefault();
							sweet.show('Мэдээлэл', 'Үйлдэл амжилттай.', 'success');
							$(".k-grid").data("kendoGrid").dataSource.read();
						});
					}else{
					  mainService.withdata('POST', '/api/core/update/'+$scope.domain,  $scope.formdata).
						then(function(data){
							modalUpdate.hide();
							$event.preventDefault();
							sweet.show('Мэдээлэл', 'Үйлдэл амжилттай.', 'success');
							$(".k-grid").data("kendoGrid").dataSource.read();
						});
					}

				};
				$scope.deleteO = function(id){

					sweet.show({
						   title: 'Баталгаажуулалт',
						text: 'Та устгахдаа итгэлтэй байна уу?',
						type: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#DD6B55',
						confirmButtonText: 'Тийм',
						cancelButtonText: 'Үгүй',
						closeOnConfirm: false,
						closeOnCancel: false

					}, function(inputvalue) {
						 if (inputvalue) {
							 $scope.formdata = {};
							 $scope.formdata.id = id;

							 mainService.withdomain('get','/api/core/action/delete/'+$scope.domain+'/'+id)
								 .then(function(){
									 $(".k-grid").data("kendoGrid").dataSource.read();
									 sweet.show('Анхаар!', 'Амжилттай устлаа.', 'success');
								 });
						}else{
							sweet.show('Анхаар!', 'Устгах үйлдэл хийгдсэнгүй!!!', 'error');
						}
					});
				};

				$scope.pmenuGrid = {
					dataSource: {

						transport: {
							read:  {
								url: "/api/faq/list?access_token="+$cookies.get('access_token'),
								//data: {"sort":[{field: 'pgm_id', dir: 'asc'}]},
								type: 'GET',
								dataType: "json"
							},
							update: {
								url: "/api/faq/update?access_token="+$cookies.get('access_token'),
								dataType: "json",
								type:"POST"
							},
							destroy: {
								url: "/api/faq/delete?access_token="+$cookies.get('access_token'),
								dataType: "json"
							},
							create: {
								url: "/api/faq/create?access_token="+$cookies.get('access_token'),
								dataType: "json",
								type:"POST",
								complete: function(e) {
									$(".k-grid").data("kendoGrid").dataSource.read();
								}
							},
							parameterMap: function(options) {
								options.data=JSON.stringify( options);
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
                                     answer: { type: "string", validation: { required: true } },
                                     question: { type: "string"},
                                     rank: { type: "number"}
								 }
							 }
						 },
						pageSize: 5,
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
						{ field:"answer", title: "answer"},
						{ field: "question", title:"question"},
						{ field: "rank", title:"rank", width: 150}
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
						$scope.pmenuGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: 270 });
					}
					else if($scope.role.rupdate===1 && $scope.role.rdelete===0){
						$scope.pmenuGrid.columns.push({ command: ["edit"], title: "&nbsp;", width: 140 });
					}
					else if($scope.role.rupdate===0 && $scope.role.rdelete===1){
						$scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: 140 });
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
						$scope.pmenuGrid.columns.push({ command: ["edit", "destroy"], title: "&nbsp;", width: 260 });
					}
					else if($scope.role.rupdate===1 && $scope.role.rdelete===0){
						$scope.pmenuGrid.columns.push({ command: ["edit"], title: "&nbsp;", width: 140 });
					}
					else if($scope.role.rupdate===0 && $scope.role.rdelete===1){
						$scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: 140});
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
						$scope.pmenuGrid.columns.push({ command: ["destroy"], title: "&nbsp;", width: 140 });
					}
					if($scope.role.rexport===1){
						$scope.pmenuGrid.toolbar.push("excel");
						$scope.pmenuGrid.toolbar.push("pdf");
					}
				}
				if($scope.role.ruptype===4){
					$scope.pmenuGrid.toolbar= kendo.template($("#add").html());
					$scope.pmenuGrid.editable="popup";
					$scope.pmenuGrid.columns.push({template: kendo.template($("#update").html()), width: 200});
				}
	        
		}
    ]);
