/*  Setup Logout Controller  */

angular.module('MetronicApp').controller('LogoutController', ['$rootScope', '$location', '$scope', function($rootScope, $location, $scope) {
    $scope.$on('$viewContentLoaded', function() {
        window.localStorage.removeItem('users');
        $location.path('/login');
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);