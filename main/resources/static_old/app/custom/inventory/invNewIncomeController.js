angular
    .module('altairApp')
    	.controller("newincomeCtrl",['$scope','$rootScope','$stateParams','companyProduct','egJournal','mainService','$state','sweet','$cookies',
	        function ($scope,$rootScope,$stateParams,companyProduct,egJournal,mainService,$state,sweet,$cookies) {
	    		var aj=[{"text":"ROOT","value":"null"}];
                var forumType=[{"text":"inline","value":1},{"text":"pop-up","value":2},{"text":"batch","value":3},{"text":"custom","value":4}];
                $scope.domain="com.macro.dev.models.LnkInventoryCompany.";
                $scope.domainLocation="com.macro.dev.models.LnkLocationCompany.";
                $scope.domainCustomer="com.macro.dev.models.LnkCustomerCompany.";
                $scope.domainBank="com.macro.dev.models.LnkBankCompany.";
                $scope.domainJournal="com.macro.dev.models.EgJournal.";
                $scope.domainLutInventory="com.macro.dev.models.LutInventoryCompany.";
                var invGroup=[{"name":"Бараа материал","id":"Бараа материал"},{"name":"Түүхий эд материал","id":"Түүхий эд материал"},{"name":"Хангамжийн материал","id":"Хангамжийн материал"},{"name":"Бусад материал","id":"Бусад материал"}];
                var measItem=[{"text":"Ширхэг","value":1},{"text":"Килограмм","value":2},{"text":"Тонн","value":3},{"text":"литр","value":4},{"text":"сав","value":5},{"text":"боодол","value":6},{"text":"Уут","value":7},{"text":"Хайрцаг","value":8},{"text":"Метр","value":9},{"text":"метр куб","value":10},{"text":"Метр квадрат","value":11},{"text":"Га","value":12}];
                $rootScope.toBarActive = true;
                $scope.tr=egJournal;
                $scope.$on('$destroy', function() {
                    $rootScope.toBarActive = false;
                });
                var $maskedInput = $('.masked_input');
                if($maskedInput.length) {
                    $maskedInput.inputmask();
                }
                var modal_bank = UIkit.modal("#modal_bank");
                var $formValidateBank = $('#form_val_bank');
                var modal_inventory = UIkit.modal("#modal_inventory");
                $formValidateBank
                    .parsley()
                    .on('form:validated',function() {
                        $scope.$apply();
                    })
                    .on('field:validated',function(parsleyField) {
                        if($(parsleyField.$element).hasClass('md-input')) {
                            $scope.$apply();
                        }
                    });

                var modal_location = UIkit.modal("#modal_location");
                var $formValidateLocation = $('#form_val_location');
                $formValidateLocation
                    .parsley()
                    .on('form:validated',function() {
                        $scope.$apply();
                    })
                    .on('field:validated',function(parsleyField) {
                        if($(parsleyField.$element).hasClass('md-input')) {
                            $scope.$apply();
                        }
                    });

                $scope.formdataLocation={};

                var d = new Date();
                d.setMonth( d.getMonth( ) + 1 );
                var currDate = d.getDate();
                var currMonth = d.getMonth();
                var currYear = d.getFullYear();
                $scope.tr.date = currDate+"."+currMonth+"."+currYear;
                $scope.bankDefault=true;



                $scope.newLocation = function(x,y){
                    $scope.formdataLocation.name=y;
                    $scope.formdataLocation.orgid=$cookies.get("orgid");
                    modal_location.show();
                };

                var modal_customer = UIkit.modal("#modal_customer");
                var $formValidateInventory = $('#form_val_inventory');
                $formValidateInventory
                    .parsley()
                    .on('form:validated',function() {
                        $scope.$apply();
                    })
                    .on('field:validated',function(parsleyField) {
                        if($(parsleyField.$element).hasClass('md-input')) {
                            $scope.$apply();
                        }
                    });
                var $formValidateCustomer = $('#form_val_customer');
                    $formValidateCustomer
                    .parsley()
                    .on('form:validated',function() {
                        $scope.$apply();
                    })
                    .on('field:validated',function(parsleyField) {
                        if($(parsleyField.$element).hasClass('md-input')) {
                            $scope.$apply();
                        }
                    });

                $scope.cs={};
                $scope.newCustomer = function(x,y){
                    $scope.cs.name=y;
                    $scope.cs.orgid=$cookies.get("orgid");
                    modal_customer.show();
                };
                $scope.bk={};
                $scope.newBank = function(x,y){
                    $scope.bk.name=y;
                    $scope.bk.orgid=$cookies.get("orgid");
                    modal_bank.show();
                };

                $scope.inv={};
                $scope.newInventory = function(y){
                    $scope.inv.name=y;
                    $scope.inv.orgId=$cookies.get("orgid");
                    modal_inventory.show();
                };

                var customerDataSource = new kendo.data.DataSource({
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: "/api/cmm/resource/LnkCustomerCompany?access_token="+$cookies.get('access_token'),
                        },
                        parameterMap: function(options) {
                            options.data=JSON.stringify( options)
                            return options;
                        }
                    }
                });

                var locationDataSource = new kendo.data.DataSource({
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: "/api/cmm/resource/LnkLocationCompany?access_token="+$cookies.get('access_token'),
                        },
                        parameterMap: function(options) {
                            options.data=JSON.stringify( options)
                            return options;
                        }
                    }
                });

                var bankDataSource = new kendo.data.DataSource({
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: "/api/cmm/resource/LnkBankCompany?access_token="+$cookies.get('access_token'),
                        },
                        parameterMap: function(options) {
                            options.data=JSON.stringify( options)
                            return options;
                        }
                    }
                });

                var inventoryDataSource = new kendo.data.DataSource({
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: "/api/cmm/resource/LutInventoryCompany?access_token="+$cookies.get('access_token'),
                            data: {"custom":"where orgId = " + $cookies.get("orgid"),"sort":[{field: 'id', dir: 'asc'}],"filter":{}},
                            complete:function(e){

                            }
                        },
                        parameterMap: function(options) {
                            options.data=JSON.stringify( options)
                            return options;
                        }
                    },
                    group: { field: "groupName" }
                });

                $scope.submitCustomer = function(){
                    mainService.withdata('POST', '/api/cmm/action/create/'+$scope.domainCustomer,  $scope.cs).
                    then(function(data){
                        customerDataSource.read();
                        modal_customer.hide();
                        $scope.tr.customerId=data.id;
                    });
                }

                $scope.submitFormLocation = function(){
                    mainService.withdata('POST', '/api/cmm/action/create/'+$scope.domainLocation,  $scope.formdataLocation).
                    then(function(data){
                        modal_location.hide();
                        locationDataSource.read();
                        $scope.tr.locationId=data.id;
                    });
                };

                $scope.submitFormBank = function(){
                    mainService.withdata('POST', '/api/cmm/action/create/'+$scope.domainBank,  $scope.bk).
                    then(function(data){
                        modal_bank.hide();
                        bankDataSource.read();
                        $scope.tr.bankId=data.id;
                    });
                };


                $scope.submitJournalForm = function(){
                    mainService.withdata('POST', '/api/cmm/action/update/'+$scope.domainJournal,  $scope.tr).
                    then(function(data){
                        UIkit.notify({
                            message : "Амжилттай бүртгэлээ...",
                            status  : 'info',
                            timeout : 3000,
                            pos     : 'top-right'
                        });
                        $state.go('restricted.inv.income');
                    });
                };

                $scope.invAlertMeas=false;
                $scope.invAlertGroup=false;
                $scope.submitFormInventory = function(){
                    if($scope.inv.measId==undefined){
                        $scope.invAlertMeas=true;
                    }
                    else{
                        $scope.invAlertMeas=false;
                    }
                    if($scope.inv.groupName==undefined){
                        $scope.invAlertGroup=true;
                    }
                    else{
                        $scope.invAlertGroup=false;
                    }
                    if($scope.inv.groupName!=undefined && $scope.inv.measId!=undefined){
                        mainService.withdata('POST', '/api/cmm/action/create/'+$scope.domainLutInventory,  $scope.inv).
                        then(function(data){
                            modal_inventory.hide();
                            companyProduct.push(data);
                            $state.reload();
                        });
                    }

                };

                $scope.categoryDropDownEditor = function(container, options) {
                    var editor = $('<input kendo-drop-down-list ng-model=\"dataItem.invId\" k-data-text-field="\'name\'" k-data-value-field="\'id\'"  k-options="invOptions" data-bind="value:' + options.field + '"/>')
                        .appendTo(container);
                };

                $scope.locationEditor = function(container, options) {
                    var editor = $('<input kendo-drop-down-list k-options="locationOptions" data-bind="value:' + options.field + '"/>')
                        .appendTo(container);
                };


                $scope.groupOptions = {
                    filter: "startswith",
                    dataSource: invGroup,
                    dataTextField: "name",
                    dataValueField: "id",
                    optionLabel: "Бараа материалын бүлэг..."
                };
                $scope.measOptions = {
                    filter: "startswith",
                    dataSource: measItem,
                    dataTextField: "text",
                    dataValueField: "value",
                    optionLabel: "Хэмжих нэгж..."
                };

                $scope.invOptions = {
                    filter: "startswith",
                    dataSource: inventoryDataSource,
                    dataTextField: "name",
                    dataValueField: "id",
                    optionLabel: "Бараа материал...",
                    noDataTemplate: $("#noDataInventoryTemplate").html()
                };

                $scope.customerOptions = {
                    filter: "startswith",
                    dataSource: customerDataSource,
                    dataTextField: "name",
                    dataValueField: "id",
                    optionLabel: "Харилцагч...",
                    noDataTemplate: $("#noDataCustomerTemplate").html()
                };
                $scope.locationOptions = {
                    filter: "startswith",
                    dataSource: locationDataSource,
                    dataTextField: "name",
                    dataValueField: "id",
                    optionLabel: "Байршил...",
                    noDataTemplate: $("#noDataLocationTemplate").html()
                };

                $scope.bankOptions = {
                    filter: "startswith",
                    dataSource: bankDataSource,
                    index: 1,
                    dataTextField: "name",
                    dataValueField: "id",
                    optionLabel: "Банк...",
                    value:0,
                    noDataTemplate: $("#noDataBankTemplate").html()
                };


                $scope.recieptDefault=true;
                $scope.receiptChange=function () {
                    if($scope.tr.invoiceType==0){
                        $scope.recieptDefault=true;
                        $scope.tr.invoiceNo=$scope.tr.id;
                    }
                    else{
                        $scope.recieptDefault=false;
                    }
                };

                $scope.selectize_a_data = {
                    options: [
                        {
                            id: 1,
                            title: "Автомат",
                            value: "0"
                        },
                        {
                            id: 2,
                            title: "Гараар",
                            value: "1"
                        }
                    ]
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
                    valueField: 'value',
                    labelField: 'title',
                    searchField: 'title'
                };


              //  var modal_inventory = UIkit.modal("#modal_inventory");

                $scope.back=function () {
                    $state.go('restricted.inv.income');
                };

                var $formValidate = $('#form_val');
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

                var gridDataSource = new kendo.data.DataSource({
                    autoSync:true,
                    transport: {
                        read:  {
                            url: "/api/core/list/LnkInventoryCompany?access_token="+$cookies.get('access_token'),
                            data: {"custom":"where egId = " + $stateParams.id,"sort":[{field: 'id', dir: 'asc'}]},
                            type: 'GET',
                            dataType: "json",
                            complete: function(e) {
                                var aggregates = gridDataSource.aggregates();
                                $scope.tr.cashValue=($scope.tr.bankValue+$scope.tr.creditValue-aggregates.invTotal.sum)*(-1);
                                $scope.pmenuGrid.getTotal = function(){
                                    return aggregates.invTotal.sum ;
                                }
                            }
                        },
                        update: {
                            url: "/api/cmm/update/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                            dataType: "json",
                            type:"POST",
                            complete: function(e) {
                                $(".k-grid").data("kendoGrid").dataSource.read();
                                if(e.responseText=="true"){
                                    $scope.pmenuGrid.getTotal = function(){
                                        var aggregates = gridDataSource.aggregates();
                                        $scope.tr.cashValue=($scope.tr.bankValue+$scope.tr.creditValue-aggregates.invTotal.sum)*(-1);
                                        return aggregates.invTotal.sum ;
                                    }
                                }
                                else{
                                    UIkit.notify({
                                        message : "Бараа материалаа сонгоно уу",
                                        status  : 'danger',
                                        timeout : 3000,
                                        pos     : 'top-right'
                                    });
                                }
                            }
                        },
                        destroy: {
                            url: "/api/cmm/action/delete/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                            dataType: "json",
                            type:"POST",
                            complete: function(e) {
                                $(".k-grid").data("kendoGrid").dataSource.read();
                                $scope.pmenuGrid.getTotal = function(){
                                    var aggregates = gridDataSource.aggregates();
                                    $scope.tr.cashValue=($scope.tr.bankValue+$scope.tr.creditValue-aggregates.invTotal.sum)*(-1);
                                    return aggregates.invTotal.sum ;
                                }
                            }
                        },
                        create: {
                            url: "/api/cmm/create/"+$scope.domain+"?access_token="+$cookies.get('access_token'),
                            dataType: "json",
                            data: {"egId": $stateParams.id,"orgId":$cookies.get("orgid")},
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
                                invId: { type: "number", validation: { required: true } },
                                invName: { type: "string",editable:false, validation: { required: true } },
                                measName: { type: "string",editable:false, validation: { required: true } },
                                measId: { type: "number",editable:false, validation: { required: true } },
                                invCount: { type: "number",defaultValue:1, validation: { required: true } },
                                invPrise: { type: "number", validation: { required: true } },
                                invTotal: { type: "number",validation: { required: true } }
                            }
                        }
                    },
                    aggregate: [
                        { field: "invTotal", aggregate: "sum" },
                        { field: "invPrise", aggregate: "sum" },
                        { field: "invCount", aggregate: "sum" }
                    ],
                    pageSize: 8,
                    batch: true,
                    serverFiltering: true,
                    serverPaging: true,
                    serverSorting: true
                });

				$scope.pmenuGrid = {
					dataSource: gridDataSource,
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
                    toolbar: kendo.template($("#add").html()),
					sortable: true,
					resizable: true,
					columns: [
						{title: "#",template: "<span class='row-number'></span>", width:60},
                        { field:"invId", values:companyProduct,editor: $scope.categoryDropDownEditor,title: "Барааны нэр"},
                        { field:"measId", values:measItem, title: "Хэмжих нэгж", width: 150},
                        { field:"invCount", title: "Тоо хэмжээ", width: 150},
                        { field:"invPrise", title: "Нэгжийн үнэ", width: 150 },
                        { field:"invTotal",title: "Дүн", width: 150 ,aggregates: ["sum"],  format: "{0:n}",  footerTemplate: "Нийт: <span ng-bind='pmenuGrid.getTotal() | currency:&quot;₮&quot;'>"},
                        { command: ["destroy"], title: "&nbsp;", width: 140}
					],
                    editable:true,
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



                $scope.pmenuGrid.getTotal = function(){
                    var aggregates = gridDataSource.aggregates();
                    $scope.tr.cashValue=($scope.tr.bankValue+$scope.tr.creditValue-aggregates.invTotal.sum)*(-1);
                    return aggregates.invTotal.sum ;
                };

                $scope.BankChange = function(){
                    if($scope.tr.bankValue != 0){
                        $scope.bankDefault=false;
                    }
                    else{
                        $scope.bankDefault=true;
                    }
                    var a=$scope.tr.cashValue;
                    var b=$scope.tr.bankValue;
                    var c=$scope.tr.creditValue;

                    var aggregates = gridDataSource.aggregates();
                    if($scope.tr.cashValue!=0) {
                        $scope.tr.cashValue = aggregates.invTotal.sum - $scope.tr.bankValue - $scope.tr.creditValue;
                    }
                };

                $scope.durationDefault=true;
                $scope.CreditChange = function(){
                    if($scope.tr.creditValue != 0){
                        var dr = new Date();
                        dr.setMonth( d.getMonth( ) );
                        dr.setDate( dr.getDate() + 14 );
                        var dcurrDate = dr.getDate();
                        var dcurrMonth = dr.getMonth();
                        var dcurrYear = dr.getFullYear();
                        $scope.durationDefault=false;
                        $scope.tr.payTime  = dcurrDate+"."+dcurrMonth+"."+dcurrYear;
                    }
                    else{
                        $scope.durationDefault=true;
                    }
                    var aggregates = gridDataSource.aggregates();
                    if($scope.tr.cashValue!=0){
                        $scope.tr.cashValue=aggregates.invTotal.sum-($scope.tr.bankValue+$scope.tr.creditValue);
                    }
                };
		}
    ]);
