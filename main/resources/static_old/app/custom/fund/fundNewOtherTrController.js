angular
    .module('altairApp')
    .controller("fnewothertrCtrl",['$scope','$rootScope','orgs','mainService','$state','sweet','$cookies',
        function ($scope,$rootScope,orgs,mainService,$state,sweet,$cookies) {
            var aj=[{"text":"ROOT","value":"null"}];
            var forumType=[{"text":"inline","value":1},{"text":"pop-up","value":2},{"text":"batch","value":3},{"text":"custom","value":4}];
            $scope.domain="com.macro.dev.models.EgJournalInvDetail.";
            $scope.domainLocation="com.macro.dev.models.LnkLocationCompany.";
            $scope.domainCustomer="com.macro.dev.models.LnkCustomerCompany.";
            $scope.domainBank="com.macro.dev.models.LutBank.";

            $rootScope.toBarActive = true;

            $scope.$on('$destroy', function() {
                $rootScope.toBarActive = false;
            });
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
                        url: "/api/cmm/resource/LutBank?access_token="+$cookies.get('access_token'),
                    },
                    parameterMap: function(options) {
                        options.data=JSON.stringify( options)
                        return options;
                    }
                }
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
                    $scope.tr.bankid=data.id;
                });
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
                dataTextField: "name",
                dataValueField: "id",
                optionLabel: "Банк...",
                noDataTemplate: $("#noDataBankTemplate").html()
            };

            $scope.tr={
                receipttype:1
            }

            $scope.recieptDefault=true;
            $scope.receiptChange=function () {
                if($scope.tr.receipttype==1){
                    $scope.recieptDefault=true;
                }
                else{
                    $scope.recieptDefault=false;
                }
            }

            $scope.selectize_a_data = {
                options: [
                    {
                        id: 1,
                        title: "Автомат",
                        value: "1"
                    },
                    {
                        id: 2,
                        title: "Гараар",
                        value: "2"
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


            var modal_inventory = UIkit.modal("#modal_inventory");
            $scope.inventory = function(){
                // modal_inventory.show();
                $state.go('restricted.inv.');
            }

            $scope.back=function () {
                $state.go('restricted.fund.othertr');
            }

            var $maskedInput = $('.masked_input');
            if($maskedInput.length) {
                $maskedInput.inputmask();
            }

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

            $scope.pmenuGrid = {
                dataSource: {
                    autoSync:true,
                    transport: {
                        read:  {
                            url: "/api/core/list/EgJournalInvDetail?access_token="+$cookies.get('access_token'),
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
                        { field: "invTotal", aggregate: "sum" }],
                    pageSize: 8,
                    batch: true,
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
                sortable: true,
                resizable: true,
                /*	pageable: {
                 refresh: true,
                 pageSizes: true,
                 buttonCount: 5
                 },*/
                columns: [
                    {title: "#",template: "<span class='row-number'></span>", width:60},
                    { field:"invId", title: "Барааны нэр"},
                    { field:"measName", title: "Хэмжих нэгж", width: 150},
                    { field:"invCount", title: "Тоо хэмжээ", width: 150},
                    { field:"invPrise",template: '<span>#= invPrise #</span>', title: "Нэгжийн үнэ", width: 150 },
                    { field:"invTotal",template: '<span>#= invTotal #</span>', title: "Дүн", width: 150 ,aggregates: ["sum"],   footerTemplate: "Нийт : {{ aggregate.sum }}"},
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
                },

            };

            /*if($rootScope.ruptype==1){
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
             }*/

        }
    ]);
