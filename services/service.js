(function() {
 'use strict';
 
 angular
 .module('app')
 .factory('orderService', Service);
 
 Service.$inject = ['$http'];
 
 function Service($http) {
	 var url = "";
	 var savedOrder={};
	 var savedUser={};
	 return {
	 getMenu: function() {
	 return $http.get("http://localhost:8080/menu.json");
	 },
	 getOrder: function() {
	 return savedOrder;
	 },
	 createOrder: function(order) {
	 	savedOrder = order;
	 },
	 createUser: function(user) {
	 	savedUser = user;
	 },
	getUser: function() {
		return savedUser;
	 }
	 };
 }
})();