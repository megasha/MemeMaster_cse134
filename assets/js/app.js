
    angular.module('demo', ['ui.listview'])
            .controller('DemoCtrl', ['$scope', function($scope){
                $scope.items = MyData;

                $scope.sortOptions = [
                    { name: 'Sort by: Meme Name', value: 'meme_name' },
                    { name: 'Sort by: Highest Rating', value: '-rating' },
                    { name: 'Sort by: Lowest Rating', value: 'rating' }
                ];

                $scope.selected = 'meme_name';

                $scope.setOrder = function (order) {
                    $scope.selected = order;
                }

                $scope.Add = function() {

                    //alert(document.getElementById("txtFile"));
                    var item = {
                        id: MyCountID++,
                        meme_name: $('#txtName').val(),
                        url: $('#txtURL').val(),
                        date: new Date(),
                        comment: $('#txtComment').val(),
                        tags: $('#txtTag_tagsinput').val(),
                        rating: $('#txtRating').val()
                    };

                    $scope.items.push(item);
                    $('#txtName').val('');
                    $('#txtURL').val('');
                    var tagList = $('#txtTag_tagsinput').val().split(',');
                    for (var i=0; i< tagList.length; i++)
                    {
                        $('#txtTag_tagsinput').removeTag(tagList[i]);
                    }
                    $('#txtComment').val('');
                    $('#txtRating').val('');

                    $('input.rating').rating('reset');
                    window.location.href = "#closeModalAdd";

                };

                $scope.Edit = function(myID) {
                    var i=0;
                    for (i=0; i < $scope.items.length; i++)
                    {
                        if ($scope.items[i].id == myID)
                        {
                            break;
                        }
                    }

                    $('#imgMeme').attr('src', $scope.items[i].url);
                    $('#txtNameEdit').val($scope.items[i].meme_name);
                    $('#txtIDEdit').val(myID);
                    $('#txtTagEdit').importTags($scope.items[i].tags.toString());
                    $('#txtCommentEdit').val($scope.items[i].comment);
                    $('#txtRatingEdit').rating('update', $scope.items[i].rating);

                    window.location.href = "#openModalEdit";
                };

                $scope.Save = function() {
                    var myID = $('#txtIDEdit').val();
                    var i=0;
                    for (i=0; i < $scope.items.length; i++)
                    {
                        if ($scope.items[i].id == myID)
                        {
                            break;
                        }
                    }

                    $scope.items[i].meme_name = $('#txtNameEdit').val();
                    $scope.items[i].comment = $('#txtCommentEdit').val();
                    $scope.items[i].tags = $('#txtTagEdit').val();
                    $scope.items[i].rating = $('#txtRatingEdit').val().toString();

                    var tagList = $('#txtTagEdit').val().split(',');
                    for (var i=0; i< tagList.length; i++)
                    {
                        $('#txtTagEdit').removeTag(tagList[i]);
                    }

                    $('input.rating').rating('reset');
                    window.location.href = "#closeModalEdit";

                };

                $scope.Delete = function(myID) {

                    if (confirm("Are you sure?") == true)
                    {
                        var i=0;
                        for (i=0; i < $scope.items.length; i++)
                        {
                            if ($scope.items[i].id == myID)
                            {
                                break;
                            }
                        }

                        $scope.items.splice(i, 1);

                    }


                };

                $scope.uploadCloud = function(){
                    window.sessionStorage.data = JSON.stringify($scope.items);
                    alert("Data was saved to sessionStorage");
                    alert(window.sessionStorage.data);
                }

            }]);

    angular.module('ui.listview', [])
            .directive("listview", ['$compile', '$interpolate','$templateCache', function($compile, $interpolate, $templateCache) {
                return {
                    restrict: "EA",
                    transclude: false,
                    scope: {
                        listviewId:"@listview",
                        items: "=",
                        methods: "="
                    },
                    templateUrl: function(element, attrs) {
                        if(!attrs.template && !attrs.templateBase) return 'listview.html';
                        attrs.template = attrs.template || 'listview.html';
                        if(!attrs.templateBase) return attrs.template;
                        var path = attrs.templateBase;
                        if (path.substr(path.length - 1, 1) != "/") path += "/";
                        path += attrs.template;
                        return path;
                    },
                    link: function(scope, element, attrs){
                        attrs.$observe('columns', function(val){
                            scope.columns = val.replace(/ /g,'').split(',');
                        });
                    },
                    controller: function($scope, $interpolate, $compile, $templateCache){


                    }
                };
            }])
            .filter('capitalize', function () {
                "use strict";
                return function (input) {
                    return input.charAt(0).toUpperCase() + input.slice(1);
                }
            });
