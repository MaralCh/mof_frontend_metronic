/* Setup blank page controller */
angular.module('MetronicApp').controller('CreateOrganizationController', ['$rootScope', '$scope', 'settings', '$window', '$http', function($rootScope, $scope, settings, $window, $http) {
  if (window.localStorage.getItem('users')) {  
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });

    $scope.back = function() {
        $window.location.href = '#/organization';
    }

    $scope.submit = function() {
      var config = {headers: {
            'Authorization': 'token'
          }
      };

      var rootUrl = "http://43.231.113.232:60081/esystem_server";
      var org = {
        "org_cd" : $scope.code,
        "org_nm" : $scope.name,
        "tel_no" : $scope.phone,
        "addr1_cd" : $scope.address,
        "org_nm_eng":"",
        "org_div_cd":"",
        "org_lv_cd":"",
        "uppr_org_cd":"",
        "aply_dt":"",
        "clse_dt":"",
        "use_yn":"",
        "org_ord":"",
        "fax_no":"",
        "addr2_cd":"",
        "addr_dtl":"",
        "org_hdcf_nm":"",
        "reg_id":"",
        "reg_dtm":"",
        "mod_id":"",
        "mod_dtm":""
      }

      
      return $http.post(rootUrl + '/organizations', org, config).then(handleSuccess, handleError('Error creating user'));

      function handleSuccess(res) {
        $window.location.href = '#/organization';
        return res.data;
      }

      function handleError(error) {
          return function () {
              return { success: false, message: error };
          };
      }

        
    }
  }else{
      $window.location.href = '#/login';
  }

}]);
