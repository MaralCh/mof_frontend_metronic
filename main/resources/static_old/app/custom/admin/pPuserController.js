angular
    .module('altairApp')
    	.controller("userCtrl",['$cookies','$scope','p_role','p_org','action','mainService','$state','sweet',
	        function ($cookies,$scope,p_role,p_org,action,mainService,$state,sweet) {

    			$scope.domain="com.macro.dev.models.TcUser.";

                var yesno=[{"text":"tiim","value":1},{"text":"ugui","value":0}];
    			$scope.selectize_a_data=p_org;
    			$scope.selectize_b_data= [];
			    var planets_data = $scope.selectize_role = p_role;

			    console.log(p_role);

                $scope.ud={
                    user_id:0
				};
    				
				$scope.addUser = function() {
					 var mdl = UIkit.modal("#modal_update_user");
  	    		     mainService.withdata('PUT','/api/core/user/add/'+$scope.ud.user_id, $scope.ud)
	  		   			.then(function(data){
	  		   				mdl.hide();
	  		   				
	  		   				$(".k-grid").data("kendoGrid").dataSource.read(); 
	  		   				if(data.re==1){
	  		   					sweet.show('Мэдээлэл', 'Амжилттай засагдлаа.', 'success');
	  		   				}  		   				
	  		   				if(data.re==0){
	  		   					sweet.show('Мэдээлэл', 'Амжилттай хадгаллаа.', 'success');
	  		   				}		   				
	  		   			});	 
                         
               };
				
    			$scope.selectize_a_config = {
    	                plugins: {
    	                    'disable_options': {
    	                        disableOptions: ["c1","c2"]
    	                    }
    	                },
    	                create: false,
    	                maxItems: 1,
    	                placeholder: 'Сонгох...',
    	                optgroupField: 'parent_id',
    	                optgroupLabelField: 'title',
    	                optgroupValueField: 'ogid',
    	                valueField: 'value',
    	                labelField: 'text',
    	                searchField: 'title',	                	
    	            };
    			
    			 $scope.selectize_planets_config = {
	                plugins: {
	                    'remove_button': {
	                        label     : ''
	                    }
	                },
	                maxItems: null,
	                valueField: 'value',
	                labelField: 'text',
	                searchField: 'text',
	                create: false,
	                render: {
	                    option: function(planets_data, escape) {
	                        return  '<div class="option">' +
	                            '<span class="title">' + escape(planets_data.text) + '</span>' +
	                            '</div>';
	                    },
	                    item: function(planets_data, escape) {
	                        return '<div class="item"><a href="' + escape(planets_data.url) + '" target="_blank">' + escape(planets_data.text) + '</a></div>';
	                    }
	                }
	            };
                
			$scope.update=function(vdata){
                mainService.withdomain('get','/api/core/user/roles/'+vdata.id)
                    .then(function(data){
                        $scope.ud = {
						"user_id": vdata.user_id,
						"org_cd": vdata.org_cd,
						"cell_no": vdata.cell_no,
						"user_pw": vdata.user_pw,
						"use_yn": vdata.use_yn,
						"user_nm": vdata.user_nm,
						roles: data
					};
				});
			};

       	    $scope.puserGrid = {
				dataSource: {
					transport: {
						read:  {
							url: "/api/core/list/tc_user?access_token="+$cookies.get('access_token'),
                            type: 'GET',
                            data: {"sort":[{field: 'user_id', dir: 'asc'}]},
                            dataType: "json"
						},
						update: {
							url: "/api/core/update/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
							contentType:"application/json; charset=UTF-8",
							  complete: function(e) {
								UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
								$(".k-grid").data("kendoGrid").dataSource.read();
							},
							type:"POST"
						},
						destroy: {
							url: "/api/core/delete/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                            dataType: "json",
							type:"POST"
						},
						create: {
							url: "/api/core/create/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
							contentType:"application/json; charset=UTF-8",
							type:"POST",
							complete: function(e) {
                                UIkit.notify("Амжилттай хадгаллаа.", {status:'success'});
								$(".k-grid").data("kendoGrid").dataSource.read();
							}
						},
                        parameterMap: function(options) {
                            options.data=JSON.stringify( options);
                            options.table="tc_user";
                            options.key="user_id";
                            options.model=$scope.domain;
                            return options;
                        }
					},
					schema: {
						data:"data",
						total:"total",
						 model: {
							 id: "user_id",
							 fields: {
                                 user_id: { type: "number", editable: false,nullable: false},
                                 email: { type: "string",  validation: { required: true } },
                                 org_cd: { type: "number",validation: { required: true}},
                                 cell_no: { type: "number"},
                                 user_pw: { type: "string",validation: { required: true}},
                                 use_yn: { type: "string",default:"1"},
                                 user_nm: { type: "string",validation: { required: true}}
							 }
						 }

					 },
					pageSize: 8,
					serverPaging: true,
					serverSorting: true,
					serverFiltering: true
				},
				toolbar: [{template: $("#add").html()},"excel","pdf"],
				filterable:{
					 mode: "row"
				},
				excel: {
					fileName: "Organization Export.xlsx",
					proxyURL: "//demos.telerik.com/kendo-ui/service/export",
					filterable: true,
					allPages: true
				},
				sortable: true,
				resizable: true,
				columnMenu:true,
				pageable: {
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				},
				columns: [
					 { title: "#",template: "<span class='row-number'></span>",  width:70},
                     { field:"org_cd", title: "Байгууллага",values:p_org},
					 { field:"email", title: "E-mail"},
					 { field:"cell_no", title: "Утас"},
                     { field:"user_nm", title: "Нэвтрэх нэр",width: 150},
					 { field:"user_pw", title: "Нууц үг",width: 150},
					// { field:"roleid", title: "Эрх" ,width: 150},
					 { field:"use_yn", values:yesno,title: "Идэвхитэй эсэх" ,width: 150},
					 { template: kendo.template($("#update").html()),  width: 250}
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
				editable: "popup"
			}
		}
    ]);
