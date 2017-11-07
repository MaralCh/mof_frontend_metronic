/* Setup blank page controller */
angular.module('MetronicApp').controller('EditOrganizationController', ['$rootScope', '$scope', 'settings', '$window', '$http', function($rootScope, $scope, settings, $window, $http) {
  if (window.localStorage.getItem('users')) {  

    var url_a = 'http://43.231.113.232:60081/esystem_server/organizations/';
    var config = {headers: {
        'Authorization': 'token'
      }
    };

    

    $scope.$on('$viewContentLoaded', function(id) {   
        // initialize core components
        App.initAjax();

        $http.get(url_a, config)
                    .then(function(result) {
                      console.log(result.data);
                      $scope.mydata = result.data;
                     });
        // set default layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
    console.log("RootScope: ");
    console.log();

    
    $scope.save = function(){
      alert('save');
    }

    $scope.back = function(){
      $window.location.href = '#/organization';
    }

  }else{
    $window.location.href = '#/login';
  }
}]);
