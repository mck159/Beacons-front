beaconsAdminApp.service('RulesService', ['$resource', '$http', 'serverUri', '$cookies', function($resource, $http, invoicesServiceUri, serverUri, $cookies) {
    var RulesResource = $resource(serverUri + 'rule/:id',{id: "@_id"}, {update: {method : 'PUT'}});

    this.transformToJsonRule = function(rule, daysOfWeek) {
        var jsonDaysOfWeek = [];
        console.log(daysOfWeek);
        for(var key in daysOfWeek) {
            console.log(daysOfWeek[key]);
            console.log(key);
            if(!daysOfWeek[key].enabled) {
                continue;
            }
            var value = daysOfWeek[key];
            if(daysOfWeek[key].allDay) {
                jsonDaysOfWeek.push({
                    'day_of_week': key
                })
            } else {
                jsonDaysOfWeek.push({
                    'day_of_week': key,
                    'hour_from': moment(value.from).format('HH:mm'),
                    'hour_to': moment(value.to).format('HH:mm')
                })
            }
        }
        rule.rule.date_from = moment(rule.rule.date_from).format('YYYY-MM-DD');
        rule.rule.date_to = moment(rule.rule.date_to).format('YYYY-MM-DD');
        rule.rule.days = jsonDaysOfWeek;
        return rule;
    }

    this.transformAllFromJsonRules = function(rules) {
        console.log(rules);
        var daysOfWeek = {}

        for(i = 0 ; i < rules.length ; i++) {
            var rule = rules[i];
            //rule.rule = JSON.parse(rule.rule);
            rule.rule.date_from = new Date(rule.rule.date_from);
            rule.rule.date_to = new Date(rule.rule.date_to);
            var days = rule.rule.days;
            for(j = 0 ; j < days.length ; j++) {
                var day = days[j];
                if(day == undefined) {
                    continue;
                }
                daysOfWeek[day.day_of_week] = {
                    from: day.hour_from,
                    to: day.hour_to
                }
            }
        }
        return rules;
    }

    this.newRule = function(rule, daysOfWeek) {
        var ruleJson = this.transformToJsonRule(rule, daysOfWeek);
        delete ruleJson.editable;
        delete ruleJson.new;
        return ruleJson.$save();
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