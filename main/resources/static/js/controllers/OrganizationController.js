/* Setup Organization page controller */
angular.module('MetronicApp').controller('OrganizationController', ['$rootScope', '$scope', 'settings', '$http', '$location', function($rootScope, $scope, settings, $http, $location) {
    
        var url_a = 'http://43.231.113.232:60081/esystem_server/organizations';
        var config = {headers: {
            'Authorization': 'token'
          }
        };

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        
        var vm = this;
        vm.mydata = [];

        $http.get(url_a, config)
            .then(function(result) {
              vm.mydata = result.data;
              $scope.mydata = result.data;
             });    

        $scope.edit = function(index, id) {
            // alert('edited' + index);
            $scope.index = index;
            $scope.id = id;
            $location.path('/editOrganization/' + id + '/');
        }

        $scope.delete = function(index, id) {
            // console.log($scope.mydata);
            var x = confirm("Are you sure want to delete this Organization?");
            if(x == true){
                $http.delete(url_a+'/'+ id, config).then(function(result) {
                    $scope.mydata.splice(index, 1);
                });
            }
        }

        $scope.create = function(){
            $location.path('/createOrganization');
        }
    });


}]);
