beaconsAdminApp.controller('ContentsCtrl', ['$scope', '$resource', '$state', 'serverUri', '$http', function ContentsCtrl($scope, $resource, $state, serverUri, $http) {
    var ContentsResource = $resource("http://localhost:3000/" + 'content/:id',{id: "@_id"}, {update: {method : 'PUT'}});
    var contents = ContentsResource.query(function() {
        $scope.contents = contents;
    });
    $scope.deleteContent = function(content) {
        content.$delete({id: content.content_id});
        var contents = ContentsResource.query(function() {
            $scope.contents = contents;
        });
    }

    $scope.saveContent = function(content) {
        delete  content.editable;
        content.$update({id: content.content_id}, content, function(data) {console.log(data)});
    }

    $scope.addContent = function() {
        var c = new ContentsResource();
        c.editable = true;
        c.new = true;
        $scope.contents.push(c)

    }

    $scope.newContent = function(content) {
        delete  content.editable;
        delete  content.new;
        content.user_id = 1;
        content.$save(content);
    }
}]);
