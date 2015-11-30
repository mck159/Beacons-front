beaconsAdminApp.service('RulesService', ['$resource', '$http', 'serverUri', '$cookies', function($resource, $http, invoicesServiceUri, $cookies) {
    var RulesResource = $resource("http://localhost:3000/api/" + 'rule/:id',{id: "@_id"}, {update: {method : 'PUT'}});

    this.transformToJsonRule = function(rule, daysOfWeek) {
        var jsonDaysOfWeek = [];
        console.log(daysOfWeek);
        for(var key in daysOfWeek) {
            var value = daysOfWeek[key];
            jsonDaysOfWeek.push({
                'day_of_week' : key,
                'hour_from' : moment(value.from).format('hh:mm'),
                'hour_to' : moment(value.to).format('hh:mm')
            })
        }
        rule.rule.date_from = moment(rule.rule.date_from).format('YYYY-MM-DD');
        rule.rule.date_to = moment(rule.rule.date_to).format('YYYY-MM-DD');
        rule.rule.days = jsonDaysOfWeek;
        return rule;
    }

    this.newRule = function(rule, daysOfWeek) {
        var ruleJson = this.transformToJsonRule(rule, daysOfWeek);
        delete ruleJson.editable;
        delete ruleJson.new;
        ruleJson.$save();
    }

    this.getRules = function() {

    }

    this.addRule = function () {
        console.log($cookies);
        var result;
        var rules = BeaconResource.query(function() {
            console.log("a" + rules);
            result = rules;
        });

        return result;
    }
}]);