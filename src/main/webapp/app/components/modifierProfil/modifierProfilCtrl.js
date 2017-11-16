app.controller('modifierProfilCtrl', function($scope, $http, $uibModal, $log, $document) {


	$http.get("app/components/profil/profil.json").then(function(response){

                /* On stocke les données récupérées*/
            	$scope.profil = response.data;

            	/* On copie l'url de l'avatar pour ne pas qu'elle soit modifiee à la volée */
            	$scope.avatar = $scope.profil.avatar;

	});


 /* Gestion du modal*/

    $scope.animationsEnabled = true;

    $scope.open = function () {

        var parentElem = angular.element($document[0].querySelector('.myModalParent'));

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'modalInstCtrlProfil',
          appendTo: parentElem,
          resolve: {
            profilValues: function () {
              return $scope.profil;
            }
          }
    });

    modalInstance.result.then(function (selectedItem) {
			console.log("Succes");
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
          $scope.fermerConfirmation();
        });
    };

    $scope.openComponentModal = function () {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          component: 'modalComponent',
          resolve: {
            profilValues: function () {
              return $scope.profil;
            }

          }
    });

    modalInstance.result.then(function () {
			console.log("Succes");
        }, function () {
          $log.info('modal-component dismissed at: ' + new Date());
          $scope.fermerConfirmation();
        });
    };


    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('modalInstCtrlProfil', function ($scope, $http, $uibModalInstance, profilValues) {

	    $scope.profil = profilValues;

	$scope.ok = function () {

		/*TODO Remplacer uId:"1" par l'id de l'utilisateur connecte*/
		$scope.data = {	typeRequest:"setUserProfil",
						uId:"1",
						name:$scope.profil.lastName,
						firstname:$scope.profil.firstName,
						email:$scope.profil.email,
						address:$scope.profil.adresse,
						postalCode:$scope.profil.codePostal,
						city:$scope.profil.ville,
						avatar:$scope.profil.avatar,
						phoneNumber:$scope.profil.telephone,
						dciNumber:$scope.profil.DCI,
						facebook:$scope.profil.facebook,
						twitter:$scope.profil.twitter,
						password:$scope.password,
						newPassword:$scope.profil.newPassword};


		$scope.dataJSON = JSON.stringify($scope.data);
		console.log($scope.dataJSON);

	  /*  $http.post("/user", dataJSON).then(function(){
	        $uibModalInstance.close();
	    }); */
	     $uibModalInstance.close();
	    
	};

	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	    };
});