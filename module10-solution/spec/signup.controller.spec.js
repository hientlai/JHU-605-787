describe("SignUpController", function() {

  var $componentController;
  beforeEach(module('public'));
  beforeEach(function () {
    module(function ($provide) {
      $provide.service('SignUpServiceErrorMock', function () {
        var service = this;
        service.validateFavoriesDish = function (shortname) {
          return false;
        };

      });
    });

    module('public');
  });

  var $controller;
  var signUpController;

  beforeEach(inject(function (_$controller_, SignUpServiceErrorMock) {
    $controller = _$controller_;

    signUpController =
      $controller('SignUpController',
                  {SignUpService: SignUpServiceErrorMock});

  }));

  xit("should change error message in controller", function() {
    signUpController.submit();
    expect(signUpController.badItem).toBe(true);
  });

});
