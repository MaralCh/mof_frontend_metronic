angular
    .module('altairApp')    	
    	.controller("roleCtrl",['$scope','mainService','$state','p_menu','sections','$cookies',
	        function ($scope,mainService,$state,p_menu,sections,$cookies) {
    		
    		 $scope.sections="";

			 $scope.donelist=sections;
			 console.log(sections);
			 $scope.selectize_menu = {
				 options: $scope.donelist.options
			 };
			 $scope.sections=$scope.donelist.options;


	        
	          	
	        	$scope.domain="com.macro.dev.models.TcRole.";
	        	
        		$scope.proleGrid = {
    	                dataSource: {
    	                   
    	                    transport: {
                                read:  {
                                    url: "/api/core/list/tc_role?access_token="+$cookies.get('access_token'),
                                    data: {"sort":[{field: 'role_id', dir: 'desc'}]},
                                    type: 'GET',
                                    dataType: "json"
                                },
    	                        update: {
    	                            url: "/api/core/update/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                                    dataType: "json",
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
    	                            	$(".k-grid").data("kendoGrid").dataSource.read(); 
    	                    		}
    	                        },
                                parameterMap: function(options) {
                                    options.data=JSON.stringify( options);
                                    options.table="tc_role";
                                    options.key="role_id";
                                    options.model=$scope.domain;
                                    return options;
                                }
    	                    },
    	                    schema: {
    	                     	data:"data",
    	                     	total:"total",
    	                     	 model: {                                	
    	                             id: "role_id",
    	                             fields: {
                                         role_id: { editable: false,nullable: true, defaultValue:0},
                                         role_nm: { type: "string", validation: { required: true } },
                                         role_nm_eng: { type: "string", validation: { required: true }},
                                         access_id: { type: "number", nullable: true}
    	                              }
    	                         }
    	                     },
    	                    pageSize: 8,
    	                    serverPaging: true,
    	                    serverSorting: true
    	                },
    	                toolbar: kendo.template($("#add").html()),
    	                filterable:{
			                	 mode: "row"
			                },
    	                sortable: true,
    	                pageable: {
    	                    refresh: true,
    	                    pageSizes: true,
    	                    buttonCount: 5
    	                },
    	                columns: [
    	                	  {title: "#",template: "<span class='row-number'></span>", width:"60px"},
	                          { field:"role_nm", title: "Эрх (mn)" },
	                          { field:"role_nm_eng", title: "Эрх (en)" },
	                          { field:"access_id", title: "Нэвтрэх хуудас", values: p_menu},
	                          { 
                          	  template: kendo.template($("#update").html()),  width: "240px" 
                                
                           }],
                           dataBound: function () {
  	   		                var rows = this.items();
  	   		                  $(rows).each(function () {
  	   		                      var index = $(this).index() + 1 
  	   		                      + ($(".k-grid").data("kendoGrid").dataSource.pageSize() * ($(".k-grid").data("kendoGrid").dataSource.page() - 1));;
  	   		                      var rowLabel = $(this).find(".row-number");
  	   		                      $(rowLabel).html(index);
  	   		                  });
  	   		  	           }
	            };



                var original;


                var $formValidate = $('#roleform');

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


                var $ts_pager_filter = $("#ts_pager_filter"),
                    $ts_align = $('#ts_align');

                // select/unselect table rows
                $('.ts_checkbox_all')
                    .iCheck({
                        checkboxClass: 'icheckbox_md',
                        radioClass: 'iradio_md',
                        increaseArea: '20%'
                    })
                    .on('ifChecked',function() {
                        $ts_pager_filter
                            .find('.ts_checkbox')
                            // check all checkboxes in table
                            .prop('checked',true)
                            .iCheck('update')
                            // add highlight to row
                            .closest('tr')
                            .addClass('row_highlighted');
                    })
                    .on('ifUnchecked',function() {
                        $ts_pager_filter
                            .find('.ts_checkbox')
                            // uncheck all checkboxes in table
                            .prop('checked',false)
                            .iCheck('update')
                            // remove highlight from row
                            .closest('tr')
                            .removeClass('row_highlighted');
                    });

                $('.ts_read_all')
                    .iCheck({
                        checkboxClass: 'icheckbox_md',
                        radioClass: 'iradio_md',
                        increaseArea: '20%'
                    })
                    .on('ifChecked',function() {
                        $ts_pager_filter
                            .find('.ts_read_checkbox')
                            // check all checkboxes in table
                            .prop('checked',true)
                            .iCheck('update')
                            // add highlight to row
                            .closest('tr')
                            .addClass('row_highlighted');
                    })
                    .on('ifUnchecked',function() {
                        $ts_pager_filter
                            .find('.ts_read_checkbox')
                            // uncheck all checkboxes in table
                            .prop('checked',false)
                            .iCheck('update')
                            // remove highlight from row
                            .closest('tr')
                            .removeClass('row_highlighted');
                    });

                $('.ts_update_all')
                    .iCheck({
                        checkboxClass: 'icheckbox_md',
                        radioClass: 'iradio_md',
                        increaseArea: '20%'
                    })
                    .on('ifChecked',function() {
                        $ts_pager_filter
                            .find('.ts_update_checkbox')
                            // check all checkboxes in table
                            .prop('checked',true)
                            .iCheck('update')
                            // add highlight to row
                            .closest('tr')
                            .addClass('row_highlighted');
                    })
                    .on('ifUnchecked',function() {
                        $ts_pager_filter
                            .find('.ts_update_checkbox')
                            // uncheck all checkboxes in table
                            .prop('checked',false)
                            .iCheck('update')
                            // remove highlight from row
                            .closest('tr')
                            .removeClass('row_highlighted');
                    });

                $('.ts_delete_all')
                    .iCheck({
                        checkboxClass: 'icheckbox_md',
                        radioClass: 'iradio_md',
                        increaseArea: '20%'
                    })
                    .on('ifChecked',function() {
                        $ts_pager_filter
                            .find('.ts_delete_checkbox')
                            // check all checkboxes in table
                            .prop('checked',true)
                            .iCheck('update')
                            // add highlight to row
                            .closest('tr')
                            .addClass('row_highlighted');
                    })
                    .on('ifUnchecked',function() {
                        $ts_pager_filter
                            .find('.ts_delete_checkbox')
                            // uncheck all checkboxes in table
                            .prop('checked',false)
                            .iCheck('update')
                            // remove highlight from row
                            .closest('tr')
                            .removeClass('row_highlighted');
                    });

                $('.ts_export_all')
                    .iCheck({
                        checkboxClass: 'icheckbox_md',
                        radioClass: 'iradio_md',
                        increaseArea: '20%'
                    })
                    .on('ifChecked',function() {
                        $ts_pager_filter
                            .find('.ts_export_checkbox')
                            // check all checkboxes in table
                            .prop('checked',true)
                            .iCheck('update')
                            // add highlight to row
                            .closest('tr')
                            .addClass('row_highlighted');
                    })
                    .on('ifUnchecked',function() {
                        $ts_pager_filter
                            .find('.ts_export_checkbox')
                            // uncheck all checkboxes in table
                            .prop('checked',false)
                            .iCheck('update')
                            // remove highlight from row
                            .closest('tr')
                            .removeClass('row_highlighted');
                    });

                $scope.selectize_a_config = {
                    create: false,
                    maxItems: 1,
                    placeholder: 'Сонголт...',
                    optgroupField: 'parent_id',
                    optgroupLabelField: 'title',
                    optgroupValueField: 'ogid',
                    valueField: 'value',
                    labelField: 'title',
                    searchField: 'title'
                };

                var planets_data = $scope.selectize_planets_options = [
                    {id: 1, title: 'Харах', url: ''},
                    {id: 2, title: 'Нэмэх', url: ''},
                    {id: 3, title: 'Засах', url: ''},
                    {id: 4, title: 'Устгах', url: ''},
                    {id: 5, title: 'Хэвлэх', url: ''}
                ];
	          
	            
	            $scope.roleid=0;
	            
	            $scope.row_create ={
	            		menuid:0,
	            		ids:[]
	            }
	            $scope.row_read ={
	            		menuid:0,
	            		ids:[]
	            }
	            $scope.row_update ={
	            		menuid:0,
	            		ids:[]
	            }
	            $scope.row_delete ={
	            		menuid:0,
	            		ids:[]
	            }
	            $scope.row_export ={
	            		menuid:0,
	            		ids:[]
	            }
	          
	            
	            $scope.role = {
	            		 "roleauth": '',
		                "rolename": '',	    		           
		                "accessid": 0
	            };
	            
	            $scope.res=function(){	 	            	
	            	$scope.accessid=0,
	            	$scope.role.rolename="",
	            	$scope.role.roleauth="",
	            	$scope.role.selectize_a=[],
	            	$scope.row_create.ids=[];
	            	$scope.row_read.ids=[];
	            	$scope.row_update.ids=[];
	            	$scope.row_delete.ids=[];
	            	$scope.row_export.ids=[];	
	            	$scope.createAll=false;
	            	$scope.readAll=false;
	            	$scope.updateAll=false;
	            	$scope.deleteAll=false;
	            	$scope.exportAll=false;

	    		}        
	            
	            $scope.update=function(vdata){	  

	            	$scope.res();
	    			$scope.roleid=vdata.id;    	
	    		    $scope.role = {
	    		                "roleauth": vdata.role_nm_eng,
	    		                "rolename": vdata.role_nm,
	    		                "accessid": vdata.access_id
	    		            };


	    			mainService.withdomain('get','/api/core/read/tc_role_pgm/role_id/'+vdata.role_id)
	    			.then(function(data){
	    				console.log(data);
	    				$scope.data = data;
	    		        angular.forEach($scope.data, function(value, key){
	    		         if(value.create===1){
	    		        	 $scope.row_create.ids[value.menuid]=true;
	    		         }
	    		         if(value.read===1){
	    		        	 $scope.row_read.ids[value.menuid]=true;
	    		         }
	    		         if(value.update===1){
	    		        	 $scope.row_update.ids[value.menuid]=true;
	    		         }
	    		         if(value.delete===1){
	    		        	 $scope.row_delete.ids[value.menuid]=true;
	    		         }
	    		         if(value.export===1){
	    		        	 $scope.row_export.ids[value.menuid]=true;
	    		         } 
	    		        });    				
	    			});	   		
	    			    	    	
	    		};
	            
	            $scope.delMe=function(i){
		   	    	 mainService.withdomain('get','/api/core/action/delete/'+$scope.domain+'/'+i)
		   			.then(function(){
		   				$(".k-grid").data("kendoGrid").dataSource.read(); 
		   			});			
		   		}
	            
	            var vm = this;
	        	vm.selected = ['sdssc']; 
	        	
	            $scope.submitForm=function(){

	         		var phrases = [];
	         		
					var ss=[];
					var menuid;
					var ids=[];
					var role = {
							    "menuid": menuid,
							    "ids": ids 
							}
					 
					
					$('.uk-table-align-vertical').each(function(){
					    $(this).find('tbody tr').each(function(){
	         		      var current = $(this);
	         		    
	         		      var foo = []; 
	         		      
	         		
	         		      if ($(this).find('td').find('.ts_checkbox:checked').is(":checked")){
	         		    	  foo.push(1);
		         		  }
	         		      if ($(this).find('td').find('.ts_read_checkbox:checked').is(":checked")){
	         		    	  foo.push(2);
		         		  }
	         		      if ($(this).find('td').find('.ts_update_checkbox:checked').is(":checked")){
	         		    	  foo.push(3);
		         		  }
	         		      if ($(this).find('td').find('.ts_delete_checkbox:checked').is(":checked")){
	         		    	  foo.push(4);
		         		  }
		         		  if ($(this).find('td').find('.ts_export_checkbox:checked').is(":checked")){
	         		    	  foo.push(5);
		         		  }

		         		  if(foo.length>0){
		         			 role = {
		           					    "menuid": $(this).find('td').find('.menu').val(),
		           					    "ids":foo
		           					}
		       					ss.push(role);  
		         		  }
	         		             			      		       
	         		    }); 
					}); 
					

	                 var data = [];  
	                 var rrr= $scope.roleid;
	                 if(ss.length>0){
	                	 var obj = { 
	            			 roleid: rrr,
	            			 rolename: $scope.role.rolename,
	            			 roleauth: $scope.role.roleauth,
	            			 accessid: $scope.role.accessid,
	            			 ilist: ss
        			    };
	                 }
	            	
	            	 
	                data.push(obj);
	                
	              	jQuery.ajax({
	              		url:"/api/core/rolesubmit",
	        			type:'POST',
	        			dataType:'json',
	        			data:JSON.stringify(data),
	        		
	                 	complete: function(r){
	        				var data=r.responseText.trim();
	        				if(data=='true'){ 			
	        					$('#closemodal').trigger('click');
	        					$(".k-grid").data("kendoGrid").dataSource.read(); 
	        					 $scope.rolename = null;
	        	         		 $scope.definition =null;
	        	         		 $scope.roleid =0;
	        	         		 $scope.res();
	        				}
	        			}
	        		});
	                

	             }
	        }
    ]);
