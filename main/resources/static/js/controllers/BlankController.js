/* Setup blank page controller */
angular.module('MetronicApp').controller('BlankController', ['$rootScope', '$scope', 'settings', '$window', function($rootScope, $scope, settings, $window) {
  if (window.localStorage.getItem('users')) {    
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
  }else{
    $window.location.href = '#/login';
  }
}]);
