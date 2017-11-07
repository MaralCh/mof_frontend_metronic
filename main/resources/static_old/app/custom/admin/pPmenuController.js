angular
    .module('altairApp')
    	.controller("menuCtrl",['$rootScope','$scope','p_menu','action','mainService','$state','sweet','$cookies',
	        function ($rootScope,$scope,p_menu,action,mainService,$state,sweet,$cookies) {

	    		$scope.role=action;
                var forumType=[{"text":"inline","value":1},{"text":"pop-up","value":2},{"text":"batch","value":3},{"text":"custom","value":4}];
                $scope.domain="com.macro.dev.models.TcPgm.";
	        	$scope.selectize_uptype_options=forumType;
    			var $formValidate = $('#form_val');

                var aj=p_menu;
                var init={"text":"ROOT","value":"null"};
                aj.push(init);
	    		$formValidate
	            .parsley()
	            .on('form:validated',function() {
	               $scope.$apply();
	            })
	            .on('field:validated',function(parsleyField) {
	                if($(parsleyField.$element).hasClass('md-input')) {
	                   $scope.$apply();
	                }
	            });
	    		var modalUpdate = UIkit.modal("#modal_update");
	    	      $scope.isupdate = 0;
	    	      $scope.org = function(){
	    	    	  $scope.formdata={};
	    	    	//  $scope.formdata.id=null;
	    	    	//  $scope.formdata.parentid=0;
	    	    	  modalUpdate.show();
	    	      }

	    	      $scope.edit = function(id){
	    	    	  mainService.withdomain('get', '/api/core/api/LutMenu/'+id).
		    			then(function(data){
		    				$scope.formdata=data[0];
		    				modalUpdate.show();
		    			});
	    	      }

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

	    	      }
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
				  }

	    	         var isfile_data = $scope.selectize_isfile_options = aj;

	     			 $scope.selectize_isfile_config = {
	     	                plugins: {
	     	                    'remove_button': {
	     	                        label     : ''
	     	                    }
	     	                },
	     	                maxItems: 1,
	     	                minItems:1,
	     	                valueField: 'value',
	     	                labelField: 'text',
	     	                searchField: 'text',
	     	                create: false,
	     	                render: {
	     	                    option: function(isfile_data, escape) {
	     	                        return  '<div class="option">' +
	     	                            '<span class="title">' + escape(isfile_data.text) + '</span>' +
	     	                            '</div>';
	     	                    }
	     	                }
	     	            };

			$scope.pmenuGrid = {
				dataSource: {

					transport: {
						read:  {
							url: "/api/core/list/tc_pgm?access_token="+$cookies.get('access_token'),
							data: {"sort":[{field: 'pgm_id', dir: 'asc'}]},
							type: 'GET',
							dataType: "json"
						},
						update: {
							url: "/api/core/update/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                            dataType: "json",
							type:"POST",
							complete: function(e) {
								//$(".k-grid").data("kendoGrid").dataSource.read();
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
                            options.table="tc_pgm";
                            options.key="pgm_id";
                            options.model=$scope.domain;
                            return options;
                        }
					},
					schema: {
						data:"data",
						total:"total",
						 model: {
							 id: "pgm_id",
							 fields: {
                                 pgm_id: { editable: false,nullable: true},
                                 pgm_nm: { type: "string", validation: { required: true } },
                                 call_url: { type: "string", defaultValue:'#'},
                                 ui_icon: { type: "string"},
                                 parent_id: { type: "number"},
                                 update_type: { type: "number", defaultValue:1},
                                 order_id: { type: "number" }
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
				  	{ field:"pgm_nm", title: "Нэр /Mn/", width: 200 },
				  	{ field: "call_url", title:"URL", width: 200 },
				 	{ field: "ui_icon", title:"IKON", width: 150},
					{ field: "parent_id", values: aj, title:"Эцэг цэс", width: 200},
				  	{ field: "order_id", title:"Дараалал", width: 200 },
					{ field: "update_type", title:"форумын төрөл", width: 200,values:forumType }
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
