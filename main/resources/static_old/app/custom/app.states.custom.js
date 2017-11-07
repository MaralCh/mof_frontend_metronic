altairApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',        
        '$httpProvider',
        function ($stateProvider, $urlRouterProvider,$httpProvider) {

           $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    	   $stateProvider

               .state("restricted.system", {
                   url: "/system",
                   template: '<div ui-view autoscroll="false" ng-class="{ \'uk-height-1-1\': page_full_height }"/>',
                   abstract: true,
                   ncyBreadcrumb: {
                       label: 'Системийн удирдлага'
                   }
               })

               .state("restricted.system.faq", {
                   url: "/faq",
                   templateUrl: 'app/custom/system/faqView.html',
                   controller: 'faqCtrl',
                   resolve: {
                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                           return $ocLazyLoad.load(['lazy_KendoUI',
                               'lazy_parsleyjs',
                               'app/custom/system/faqController.js'
                           ]);
                       }],
                       action: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/rjson/0/restricted.system.faq."'})
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       }
                   },
                   data: {
                       pageTitle: 'FAQ удирдлага'
                   }
               })

               .state("restricted.pages.cmmorganization", {
                   url: "/organization",
                   templateUrl: 'app/custom/admin/pCmmOrganizationView.html',
                   controller: 'cmmOrgCtrl',
                   resolve: {
                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                           return $ocLazyLoad.load(['lazy_KendoUI',
                               'lazy_parsleyjs',
                               'app/custom/admin/pCmmOrganizationController.js'
                           ]);
                       }],
                       p_org: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/resource/LutCmmOrganization' })
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       },
                       action: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/rjson/0/restricted.pages.cmmorganization."'})
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       }

                   },
                   data: {
                       pageTitle: 'Байгууллага'
                   }
               })

               .state("restricted.pages.puser", {
                   url: "/user",
                   templateUrl: 'app/custom/admin/pPuserView.html',
                   controller: 'userCtrl',
                   resolve: {
                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                           return $ocLazyLoad.load([
                               'lazy_KendoUI',
                               'app/custom/admin/pPuserController.js'
                           ]);
                       }],
                       p_org: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/resource/LutCmmOrganization' })
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                                   $state.reload();
                               });
                       },
                       p_role: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/resource/LutRole' })
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                                   $state.reload();
                               });
                       },
                       action: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/rjson/0/restricted.pages.puser."'})
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       }
                   },
                   data: {
                       pageTitle: 'Хэрэглэгч'
                   }
               })

               .state("restricted.pages.prole", {
                   url: "/role",
                   templateUrl: 'app/custom/admin/pProleView.html',
                   controller: 'roleCtrl',
                   resolve: {
                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                           return $ocLazyLoad.load([
                               'lazy_KendoUI',
                               'lazy_parsleyjs',
                               'app/custom/admin/pProleController.js'
                           ]);
                       }],
                       p_menu: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/resource/LutMenu' })
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       },
                       sections: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/parentmenus' })
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       },
                       action: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/rjson/0/restricted.pages.prole."'})
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       }
                   },
                   data: {
                       pageTitle: 'Эрх'
                   }
               })

               .state("restricted.pages.pmenu", {
                   url: "/menu",
                   templateUrl: 'app/custom/admin/pPmenuView.html',
                   controller: 'menuCtrl',
                   resolve: {
                       deps: ['$ocLazyLoad', function($ocLazyLoad) {
                           return $ocLazyLoad.load(['lazy_KendoUI',
                               'lazy_parsleyjs',
                               'app/custom/admin/pPmenuController.js'
                           ]);
                       }],
                       p_menu: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/resource/LutMenu' })
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       },
                       action: function($http,$state){
                           return $http({ method: 'GET', url: '/api/core/rjson/0/restricted.pages.pmenu."'})
                               .then(function (data) {
                                   return data.data;
                               })
                               .catch(function(response) {
                                   $state.go("login");
                               });
                       }
                   },
                   data: {
                       pageTitle: 'Цэс'
                   }
               })
        }
    ]);
