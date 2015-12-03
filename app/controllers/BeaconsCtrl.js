beaconsAdminApp.controller('BeaconsCtrl', ['$scope', '$resource', '$state', 'serverUri', '$http', 'BeaconsService', 'RulesService', 'Page', function BeaconsCtrl($scope, $resource, $state, serverUri, $http, BeaconsService, RulesService, Page) {
    var d = new Date();
    d.setDate(d.getDate()-7);
    $scope.initDateFrom = new Date(d);
    Page.setTitle("Beacons");
    var BeaconResource = $resource(serverUri + 'beacon/:id',{id: "@_id"}, {update: {method : 'PUT'}});
    var RulesResource = $resource(serverUri + 'rule/:id',{id: "@_id"}, {update: {method : 'PUT'}});
    var beacons = BeaconResource.query(function() {
        $scope.beacons = beacons;
    });
    var ContentsResource = $resource(serverUri + 'content/:id',{id: "@_id"}, {update: {method : 'PUT'}});
    var contents = ContentsResource.query(function() {
        $scope.contents = contents;
    });

    $scope.ruleDaysOfWeek = {}
    $scope.dateFromOpened = {}
    $scope.dateToOpened = {}
    $scope.addRuleMode = false;
    $scope.editRuleMode = false;


    $scope.refreshBeacons = function() {
        var beacons = BeaconResource.query(function() {
            $scope.beacons = beacons;
        });
    }

    $scope.deleteBeacon = function(beacon) {
        beacon.$delete({id: beacon.beacon_id}).then(
            function() {
                $scope.refreshBeacons();
            },
            function() {
                alert('invalid data');
            }
        );

    }

    $scope.saveBeacon = function(beacon) {
        delete  beacon.editable;
        beacon.$update({id: beacon.beacon_id}, beacon, function(data) {console.log(data)}).$promise.then(
            function() {
                $scope.refreshBeacons();
            },
            function() {
                alert('invalid data');
            }
        );
    }

    $scope.addBeacon = function() {
        var b = new BeaconResource();
        b.editable = true;
        b.new = true;
        $scope.beacons.push(b)
    }

    $scope.newBeacon = function(beacon) {
        delete  beacon.editable;
        delete  beacon.new;
        console.log("SAVING BEACON");
        beacon.$save(beacon).then(
            function() {
                $scope.refreshBeacons();
            },
            function() {
                alert('invalid data');
            }
        );
    }

    $scope.setDates = function(dayOfWeek) {
        $scope.ruleDaysOfWeek[dayOfWeek] = {};
        $scope.ruleDaysOfWeek[dayOfWeek].from = new Date();
        $scope.ruleDaysOfWeek[dayOfWeek].to = new Date();
    }

    $scope.setModal = function(beacon) {
        RulesResource.query({beacon_id: beacon.beacon_id}).$promise.then(
            function(rules) {
                console.log(rules);
                $scope.rules = RulesService.transformAllFromJsonRules(rules);
            },
            function(error) {
                alert('error');
            }
        );
        $scope.currentBeacon = beacon;
        $scope.addRuleMode = false;
    }



    $scope.deleteRule = function(rule) {
        rule.$delete({id: rule.rule_id}).then(
            function() {
                $scope.setModal($scope.currentBeacon);
            },
            function() {}
        );
    }

    $scope.submitRuleForm = function() {
        alert('a');
    }

    //$scope.saveRule = function(rule) {
    //    delete  rule.editable;
    //    rule.$update({id: rule.rule_id}, rule, function(data) {console.log(data)});
    //    $scope.addRuleMode = false;
    //}

    $scope.addRule = function() {
        $scope.setDaysOfWeekDates();
        var r = new RulesResource();
        r.rule = {}
        var now = new Date();
        var d = new Date(now.getFullYear(), now.getMonth()+1, 1);
        d.setDate(d.getDate() + 30);
        r.rule.date_to = new Date();
        r.rule.date_from = Date.today().addMonths(1);
        r.editable = true;
        r.new = true;
        $scope.rules.push(r)
        $scope.addRuleMode = true;

    }

    $scope.newRule = function(rule) {
        rule.beacon_id = $scope.currentBeacon.beacon_id;
        RulesService.newRule(rule, $scope.ruleDaysOfWeek).then(
            function(data) {
                $scope.addRuleMode = false;
                $scope.editRuleMode = false;
            }, function(error) {
                rule.editable = true;
                rule.new = true;
                alert('Invalid data provided');
            }
        );
    }

    $scope.cancelEdit = function() {
        $scope.refreshBeacons();
    }

    $scope.editRule = function(rule) {
        rule.editable = true;
        $scope.editRuleMode = true;
    }
    $scope.cancelEditRule = function(rule) {
        rule.editable = false;
        $scope.editRuleMode = false;
    }

    $scope.dateToOpen = function(rule) {
        $scope.dateToOpened[rule] = !$scope.dateToOpened[rule];
    }

    $scope.dateFromOpen = function(rule) {
        $scope.dateFromOpened[rule] = !$scope.dateFromOpened[rule];
    }

    $scope.daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    $scope.setDaysOfWeekDates = function() {
        $scope.ruleDaysOfWeek = {};
        for(i = 0 ; i < $scope.daysOfWeek.length ; i++) {
            $scope.ruleDaysOfWeek[$scope.daysOfWeek[i]] = {}
            console.log(Date.today().at({hour: 18, minute: 0}));
            $scope.ruleDaysOfWeek[$scope.daysOfWeek[i]].to = Date.today().at({hour: 18, minute: 0});
            $scope.ruleDaysOfWeek[$scope.daysOfWeek[i]].from = Date.today().at({hour: 8, minute: 0});
        }
    }
}]);
