beaconsAdminApp.controller('ContentsCtrl', ['$scope', '$resource', '$state', 'serverUri', '$http', 'Page', function ContentsCtrl($scope, $resource, $state, serverUri, $http, Page) {
    Page.setTitle("Contents");
    var ContentsResource = $resource(serverUri + 'content/:id',{id: "@_id"}, {update: {method : 'PUT'}});


    $scope.getContents = function() {
        var contents = ContentsResource.query(function() {
            $scope.contents = contents;
        });
    }

    $scope.getContents();
    $scope.deleteContent = function(content) {
        content.$delete({id: content.content_id}).then(
            function(data) {
                $scope.getContents();
            }
        );
        var contents = ContentsResource.query(function() {
            $scope.contents = contents;
        });
        $scope.getContents();
    }

    $scope.saveContent = function(content) {
        delete  content.editable;
        content.$update({id: content.content_id}, content).then(
            function(data) {
                $scope.getContents();
            }
        );

    }

    $scope.cancelEdit = function() {
        $scope.getContents();
    }

    $scope.addContent = function() {
        var c = new ContentsResource();
        c.editable = true;
        c.new = true;
        $scope.contents.push(c);
    }

    $scope.newContent = function(content) {
        delete  content.editable;
        delete  content.new;
        content.user_id = 1;
        content.$save(content).then(
            function(data) {
                $scope.getContents();
            },
            function(error) {
                alert("Invalid data provided");
            }
        );

    }
}]);
