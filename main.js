var app = angular.module('app', []);

app.controller('activityListController', ['$http', function($http) {
    var activityList = this;
    activityList.items = [];

    $http.get('data.json').then(function(response) {
        console.log(response.data);
        var recentActivities = response.data.data.recentActivities;
        if (response.data.success === true) {
            angular.forEach(recentActivities, function(value, key) {
                //console.log(key + ': ' + value);
                var typeStr = '';
                if (value.nodeTypeString === 'Comment') {
                    typeStr = "commented on the idea";
                } else if (value.nodeTypeString === 'Idea') {
                    typeStr = "posted an idea";
                } else if (value.nodeTypeString === 'Reply') {
                    typeStr = "replied to a comment on the idea";
                }
                activityList.items.push({
                    avatar: value.authorAvatar,
                    author: value.author,
                    title: value.title,
                    postDate: moment(value.postDate).fromNow(),
                    typeStr: typeStr
                });
            });
        }
    });

}]);
