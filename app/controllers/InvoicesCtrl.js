//beaconsAdminApp.controller('InvoicesCtrl', ['$scope', '$resource', '$state', 'InvoicesService', 'invoicesServiceUri', function InvoicesCtrl($scope, $resource, $state, InvoicesService, invoicesServiceUri) {
//    console.log('invoicesCtrl');
//    var InvoiceResource = $resource(invoicesServiceUri + 'invoice/:id',{id: "@_id"}, {update: {method : 'PUT'}});
//    console.log(InvoiceResource.query());
//    var invoices = InvoiceResource.query();
//    for(i = 0 ; i < invoices.length ; i++) {
//        invoices[i].editable=false;
//    }
//    $scope.invoices = invoices;
//
//    $scope.deleteInvoice = function(invoice) {
//        invoice.$delete({id: invoice.id});
//        console.log('reload state');
//        $state.forceRefresh();
//    }
//    $scope.submitEdit = function(invoice) {
//        console.log(invoice);
//        console.log(invoice.$update);
//        invoice.$update({id: invoice.id}, invoice);
//        alert('todo');
//    }
//    $scope.addInvoice = function() {
//        var inv = new InvoiceResource();
//        inv.editable = true;
//        inv.new = true;
//        inv.items=[];
//        $scope.invoices.push(inv)
//
//    }
//    $scope.saveInvoice = function(invoice) {
//        console.log("SAVING INVOICE");
//        invoice.$save({id: invoice.id}, invoice);
//    }
//}]);
