/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "ngCookies"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
  }]);


/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout3',
    };

    $rootScope.settings = settings;

    return settings;
}]);

MetronicApp.factory('utils', [
    function () {
        return {
            // Util for finding an object by its 'id' property among an array
            findByItemId: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].item_id == id) return a[i];
                }
                return null;
            },
            findById: function findById(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == id) return a[i];
                }
                return null;
            },
            // serialize form
            serializeObject: function (form) {
                var o = {};
                var a = form.serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            },
            // high density test
            isHighDensity: function () {
                return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
            },
            // touch device test
            isTouchDevice: function () {
                return !!('ontouchstart' in window);
            },
            // local storage test
            lsTest: function () {
                var test = 'test';
                try {
                    localStorage.setItem(test, test);
                    localStorage.removeItem(test);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            // show/hide card
            card_show_hide: function (card, begin_callback, complete_callback, callback_element) {
                $(card)
                    .velocity({
                        scale: 0,
                        opacity: 0.2
                    }, {
                        duration: 400,
                        easing: [0.4, 0, 0.2, 1],
                        // on begin callback
                        begin: function () {
                            if (typeof begin_callback !== 'undefined') {
                                begin_callback(callback_element);
                            }
                        },
                        // on complete callback
                        complete: function () {
                            if (typeof complete_callback !== 'undefined') {
                                complete_callback(callback_element);
                            }
                        }
                    })
                    .velocity('reverse');
            }
        };
    }]
);

MetronicApp.service('mainService', function ($http, $q,$httpParamSerializer) {
	var master= {};
	
    this.add=function(item){    	
    	master= angular.copy(item);
    	return master;
    }
    this.view=function(){    
    	
    	return master;
    }
    
    this.getDetail=function(curl){
		var deferred = $q.defer();

        $http({
			method:'GET',
        	url:curl
        })
        .then(function (response) {
            if (response.status == 200) {
                deferred.resolve(response.data);
            }
            else {
                deferred.reject('Error getting');
            }
        });

        return deferred.promise;
	}
    
    this.withdomain=function(method,url){
    	var deferred = $q.defer();
        $http({
            method:method,           
            url:url           
        })
        .then(function (response) {
        	 deferred.resolve(response.data);
        });

        return deferred.promise;
    }
    
    this.withdata=function(method,url,data){
    	var deferred = $q.defer();

        $http({
             headers: {"Content-type": "application/x-www-form-urlencoded; charset=utf-8"},
        	 method:method,
             url:url,
            // dataType: "json",
             data: data
        })
        .then(function (response) {
            if (response.status == 200) {
                deferred.resolve(response.data);
            }
            else {
            	deferred.reject('Error occured doing action withdata');
            }
        });

        return deferred.promise;
    }
    
    this.http=function(method,url){
    	var deferred = $q.defer();

        $http({
            method:method,
            url:url
        })
        .then(function (response) {
            if (response.status == 200) {
                deferred.resolve(response.data);
            }
            else {
                deferred.reject('Error occured doing action withoutdata');
            }
        });

        return deferred.promise;
    }
    
    this.http=function(method,url,data){
    	var deferred = $q.defer();

        $http({
        	 method:method,
             url:url,
            data: data
        })
        .then(function (response) {
            if (response.status == 200) {
                deferred.resolve(response.data);
            }
            else {
            	deferred.reject('Error occured doing action withdata');
            }
        });

        return deferred.promise;
    }
});

MetronicApp.service('sessionService',[
	   '$rootScope',
	   '$http',
	   '$location',
	   function($rootScope,$http,$location,$state) {
		   

	    var session = {};
	    session.login = function(data) {
	        return $http.post("/login", "username=" + data.username +
	        "&password=" + data.password, {
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	        } ).then(function(data) {
	        	var success=data.data;
	        	if(success!=false){
	        		// alert("hooo noo success");
	        		 $rootScope.authenticated = true;
	        		 localStorage.setItem("session", {});
	        	}
	        	else{
	        		  $rootScope.authenticated = false;
	        	}
	        }, function(data) {
	           // alert("error logging in");
	        });
	    };

	    session.logout = function() {
	   		  $http.post("/logout", {}).success(function() {
	   		    $rootScope.authenticated = false;
	   		    $location.path("/login");
	   		    localStorage.setItem("session", false);
	   		  }).error(function(data) {
	   		    $rootScope.authenticated = false;
	   		  });
	   		};

	    session.isLoggedIn = function() {
	        return localStorage.getItem("session") !== null;
	    };
	    return session;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', [
    '$timeout',
    '$scope',
    '$rootScope',
    '$http',
    '$cookies',
    '$state',
    'sessionService',
    'mainService',
    function ($timeout,$scope,$rootScope,$http,$cookies,$state,sessionService,mainService) {

        $scope.$on('onLastRepeat', function (scope, element, attrs) {
            $timeout(function() {
                if(!$rootScope.miniSidebarActive) {
                    // activate current section
                    $('#sidebar_main').find('.current_section > a').trigger('click');
                } else {
                    // add tooltips to mini sidebar
                    var tooltip_elem = $('#sidebar_main').find('.menu_tooltip');
                    tooltip_elem.each(function() {
                        var $this = $(this);

                        $this.attr('title',$this.find('.menu_title').text());
                        UIkit.tooltip($this, {
                            pos: 'right'
                        });
                    });
                }
            })
        });
        
        $scope.logout = function() {
            logout($scope.loginData);
        }
        
        function logout(params) {
            var req = {
                method: 'DELETE',
                url: "oauth/token"
            }
            $http(req).then(
                function(data){
                    $cookies.remove("access_token");
                    $cookies.remove("remember");
                    $cookies.remove("orgid");
                    $state.go("login");
                },function(){
                    console.log("error");
                }
            );
        }

        $scope.role = function(item){
            $rootScope.rupdate=item.update;
            $rootScope.rcreate=item.create;
            $rootScope.rdelete=item.delete;
            $rootScope.rexport=item.export;
            $rootScope.ruptype=item.uptype;
        }

        mainService.withdomain('get','/api/mjson?access_token='+ $cookies.get('access_token'))
			.then(function(data){
				$scope.sections =  data.mjson;
		});
        
        // language switcher
        $scope.langSwitcherModel = 'gb';
        var langData = $scope.langSwitcherOptions = [
            {id: 1, title: 'English', value: 'gb'},
            {id: 2, title: 'French', value: 'fr'},
            {id: 3, title: 'Chinese', value: 'cn'},
            {id: 4, title: 'Dutch', value: 'nl'},
            {id: 5, title: 'Italian', value: 'it'},
            {id: 6, title: 'Spanish', value: 'es'},
            {id: 7, title: 'German', value: 'de'},
            {id: 8, title: 'Polish', value: 'pl'}
        ];
        $scope.langSwitcherConfig = {
            maxItems: 1,
            render: {
                option: function(langData, escape) {
                    return  '<div class="option">' +
                        '<i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i>' +
                        '<span>' + escape(langData.title) + '</span>' +
                        '</div>';
                },
                item: function(langData, escape) {
                    return '<div class="item"><i class="item-icon flag-' + escape(langData.value).toUpperCase() + '"></i></div>';
                }
            },
            valueField: 'value',
            labelField: 'title',
            searchField: 'title',
            create: false,
            onInitialize: function(selectize) {
                $('#lang_switcher').next().children('.selectize-input').find('input').attr('readonly',true);
            }
        };

       // $scope.sections =  menu_data;

    }
])
;

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar($state); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/login");  
    
    $stateProvider
    
	    // Login Page
	    .state('login', {
	        url: "/login",
	        templateUrl: "views/login.html",            
	        data: {pageTitle: 'Login Page Template'},
	        controller: "LoginController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
	                    files: [
	                          'js/controllers/LoginController.js',
	                          'lazy_iCheck',
	                          'lazy_parsleyjs',
	                          'lazy_uikit'
	                    ]
	                });
	            }]
	        }
	    })
	
	
	    // Logout
	    .state('logout', {
	        url: "/logout",
	        controller: "LogoutController",
	        resolve: {
	            deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                return $ocLazyLoad.load({
	                    name: 'MetronicApp',
	                    insertBefore: '#ng_load_plugins_before',
	                    files: [
	                        'js/controllers/LogoutController.js'
	                    ]
	                });
	            }]
	        }
	    })

        .state('restricted', {
            abstract: true,
            template: "<ui-view/>"
          })

        .state('restricted.system', {
            url: '',
            templateUrl: 'main.html'
        })
        
        .state('restricted.pages', {
            url: '',
            templateUrl: 'main.html'
        })

        // Dashboard
        .state('restricted.pages.dashboard', {
            url: "/dashboard",
            templateUrl: "tpl/page-head.html",            
            data: {pageTitle: 'Admin Dashboard Template'},
//            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                            'assets/pages/scripts/dashboard.min.js',
                            'js/controllers/DashboardController.js',
                        ] 
                    });
                }]
            }
        })
        
        .state('restricted.system.faq', {
            url: "/faq",
            templateUrl: "views/faqView.html",            
            data: {pageTitle: 'FAQ удирдлага'},
            controller: "faqCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'js/controllers/FaqController.js',
                        ] 
                    });
                }]
            }
            })
          

        // Blank Page
        .state('restricted.pages.pquestion', {
            url: "/blank",
            templateUrl: "views/blank.html",            
            data: {pageTitle: 'Blank Page Template'},
            controller: "BlankController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'js/controllers/BlankController.js'
                        ] 
                    });
                }]
            }
        })
}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);