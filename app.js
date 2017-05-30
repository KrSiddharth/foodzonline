(function() {
 'use strict';
 angular.module('app', [
 "ui.router","ngMessages"
 ])
 .config(function($stateProvider, $urlRouterProvider) {
	 $urlRouterProvider.otherwise("/");
	 $stateProvider.state("order", {
	 url: "/",
	 templateUrl: "/views/order/order.html",
	 controller: "orderController"
	 }).state("checkout", {
	 url: "/checkout",
	 templateUrl: "/views/order/checkout.html",
	 controller: "orderController"
	 }).state("thankyou", {
	 url: "/thankyou",
	 templateUrl: "/views/order/thankyou.html",
	 controller: "orderController"
	 });
 });
})();