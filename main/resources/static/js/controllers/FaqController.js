angular
    .module('MetronicApp')
    	.controller("faqCtrl",['$rootScope','$scope','mainService','$state','$cookies',
	        function ($rootScope,$scope,mainService,$state,$cookies) {
    			console.log("::::::::::::::::::::::::");
	    		$scope.variable = "Var";
		}
    ]);
