(function() {
 'use strict';
 
 angular
 .module('app')
 .controller('orderController', Controller);
 
 Controller.$inject = ['$scope', '$rootScope', 'orderService', '$state', '$stateParams','$location'];
 
 function Controller($scope, $rootScope, orderService, $state, $stateParams, $location) {
 $scope.user = {};
 $scope.savedOrder={};
 $scope.checkoutClicked = false;
 $scope.confirmClicked = false;
 $scope.invalidForm = false;
 $rootScope.orderLink = false;
 $rootScope.showLinks = true;

 
 if ($state.current.name == "order") {
	 orderService.getMenu().then(function(res) {
	 		$scope.menu = res.data;
	 		$scope.order = res.data;
	 		$scope.order.totalItems=0;
 			$scope.order.totalAmount=0;
	 		for (var i = 0; i < $scope.order.southIndian.length; i++) {
	 			$scope.order.southIndian[i].count=0;
			    console.log($scope.order.southIndian[i].count);
			}
	 		for (var i = 0; i < $scope.order.northIndian.length; i++) {
	 			$scope.order.northIndian[i].count=0;
			}

	 }).catch(function(err) {
	 		console.log(err);
	 });
 }

 if($state.current.name == "checkout"){
 	$scope.order = orderService.getOrder();
 	$rootScope.orderLink = true;
 	console.log($rootScope.orderLink);
 }

 if($state.current.name == "thankyou"){
 	$rootScope.showLinks = false;
 	// console.log($scope.showLinks);
 	$scope.user = orderService.getUser();
 	$scope.order = orderService.getOrder();
 }

  $scope.addItem = function(item) {
  	if(item.quantity>0){
	    item.quantity--;
	    item.count++;
	    $scope.order.totalItems++;
	    $scope.order.totalAmount+=item.price;
	}else{
		console.log("Out of Stock!");
		alert(item.name+" is out of stock!");
	}
  };
  $scope.removeItem = function(item) {
  	if (item.count > 0) {
    	item.quantity++;
    	item.count--;
    	$scope.order.totalItems--;
	    $scope.order.totalAmount-=item.price;
    }
  };
  $scope.saveOrder = function() {
  	if($scope.order.totalAmount!=0){
  		console.log($scope.order);
  		orderService.createOrder($scope.order);
  		$location.path('/checkout');
  	}
  		$scope.checkoutClicked = true;
  };

  $scope.confirmOrder = function() {
  	if ($scope.userForm.$valid) {
  		orderService.createOrder($scope.order);
  		orderService.createUser($scope.user);
    	$location.path('/thankyou');
	}
		$scope.confirmClicked = true;
  };
}
})();