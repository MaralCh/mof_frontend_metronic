angular.module('MetronicApp').controller('DashboardController', function($rootScope, $scope, $http, $timeout, $location) {
  
    if (window.localStorage.getItem('users')) {
      $timeout(function () {
        $scope.$on('$viewContentLoaded', function() {   
          App.initAjax();
        });
      }, 2000);
    }else{
      $location.path('/login');
    }

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});