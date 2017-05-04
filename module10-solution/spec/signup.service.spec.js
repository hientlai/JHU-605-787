describe('check menu item exists', function () {

  var signUpService;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    module('public');

    inject(function ($injector) {
      signUpService = $injector.get('SignUpService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  xit('should return a true', function() {
    $httpBackend.whenGET('https://hientlai-course5.herokuapp.com/menu_items/L3.json').respond({"id":195,"short_name":"L3","name":"Chicken Cashewnuts","description":"diced chicken with waterchestnuts, green peppers, and celery, and cashewnuts; white meat by request: for pint $1 extra, for large $2 extra","price_small":null,"price_large":9.75,"small_portion_name":null,"large_portion_name":null,"created_at":"2017-05-04T00:39:46.923Z","updated_at":"2017-05-04T00:39:46.923Z","category_short_name":"L","image_present":true});
    signUpService.validateFavoriesDish().then(function(response) {
      expect(response.data.name).toEqual("Chicken Cashewnuts");
    });
    $httpBackend.flush();
  });

});
