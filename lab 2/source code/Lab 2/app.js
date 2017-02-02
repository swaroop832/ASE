var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

animateApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'mainController'
        })
        .when('/Register', {
            templateUrl: 'Register.html',
            controller: 'aboutController'
        })
        .when('/Login', {
            templateUrl: 'Login.html',
            controller: 'contactController'
        });

});

animateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'home';
});

animateApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'Register';
});

animateApp.controller('contactController', function($scope) {
    $scope.pageClass = 'Login';
});

$scope.registerUser = function(firstname,lastname,username,password,emailid,sex)
{

    if (password === cnf_password){
        localStorage.setItem('First Name',firstname);
        localStorage.setItem('Last Name',lastname);
        localStorage.setItem('User Name',username);
        localStorage.setItem('Password',password);
        localStorage.setItem('email',emailid);
        alert(localStorage.getItem('emailid'));
        localStorage.setItem('Are you male or female?',sex);
        window.location = "home.html";
    }
    else {
        alert("saiteja" + localStorage.getItem('username'));
    }

};

$scope.validateuser = function(username,password)
{

    if ( localStorage.getItem(' User Name') === username){

        if ( localStorage.getItem('Password') === password){
            window.location = "Login.html";
        }
        else{
            alert("wrong password enter again" + localStorage.getItem('emailid'));
        }
    }
    else {
        alert("wrong username enter again" + localStorage.getItem('emailid'));
    }

};
