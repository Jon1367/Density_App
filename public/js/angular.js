// .config(function ($interpolateProvider) {
//         $interpolateProvider.startSymbol('{[{');
//         $interpolateProvider.endSymbol('}]}');})

// start foundation 
$(document).foundation();

$( "#SignIn" ).click(function() {

$('#myModal').foundation('reveal', 'close');

});
$( "#SignUp" ).click(function() {

$('#signUp').foundation('reveal', 'close');

});

// ============  Angular ===========
var app = angular.module("destinyApp", ["firebase"]);


// ============  Firebase Auth ===========

app.controller("AuthCtrl", ["$scope", "$firebaseAuth",
  function($scope, $firebaseAuth) {
	var ref = new Firebase("https://destinyapp.firebaseio.com/");

    auth = $firebaseAuth(ref);

    $scope.signIn = function() {

	var ref = new Firebase("https://destinyapp.firebaseio.com/");
		ref.authWithPassword({
		  "email": $scope.email,
		  "password": $scope.password
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		  }
		});

    };
  }
]);

// ============  Add Firebase User ===========

app.controller("addUser", ["$scope", "$firebaseAuth",
  	function($scope, $firebaseAuth) {
		var ref = new Firebase("https://destinyapp.firebaseio.com/");

	    $scope.signUp = function() {

			ref.createUser({
			  email: $scope.email,
			  password: $scope.password
			}, function(error, userData) {
			  if (error) {
			    switch (error.code) {
			      case "EMAIL_TAKEN":
			        console.log("The new user account cannot be created because the email is already in use.");
			        break;
			      case "INVALID_EMAIL":
			        console.log("The specified email is not a valid email.");
			        break;
			      default:
			        console.log("Error creating user:", error);
			    }
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			  }
			});
		};
	}
]);

