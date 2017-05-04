(function () {
"use strict";

angular.module('public')
.component('user', {
  templateUrl: 'src/public/sign-up/user.html',
  bindings: {
    user: '<',
    item: '<'
  },
  controller: UserController
});

UserController.$inject = ['ApiPath'];
function UserController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
}

})();
