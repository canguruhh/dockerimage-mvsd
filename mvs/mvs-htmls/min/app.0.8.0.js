'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  'use strict';

  angular.module('app', ['ui.router', 'ngCookies', 'LocalStorageModule', 'pascalprecht.translate', 'angularUtils.directives.dirPagination', 'ngDialog', 'ngFileSaver']).config(config).filter('assetformat', function () {
    return function (input, asset_type) {
      if (typeof asset_type === 'undefined') asset_type = 8;
      return bigDecimal.getPrettyValue(bigDecimal.divide(input, Math.pow(10, asset_type), parseInt(asset_type)));
    };
  }).config(['$compileProvider', function ($compileProvider) {
    //$compileProvider.debugInfoEnabled(false);
  }]).config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('mvs.live');
  }]).config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'lang/',
      suffix: '.0.8.0.json'
    });
    $translateProvider.registerAvailableLanguageKeys(['en', 'de', 'zh'], {
      'en-US': 'en',
      'en-UK': 'en',
      'de-DE': 'de',
      'zh-ZH': 'zh'
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    $translateProvider.preferredLanguage('zh_ZH');
  }]).constant('appName', 'Metaverse').run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
      url: "/login",
      templateUrl: "login/login.view.0.8.0.html",
      controller: 'LoginController',
      controllerAs: 'vm'
    }).state('register', {
      url: "/register",
      templateUrl: "register/register.view.0.8.0.html",
      controller: 'RegisterController',
      controllerAs: 'vm'
    }).state('home', {
      abstract: true,
      templateUrl: "home/index.view.0.8.0.html",
      controller: 'HomeController',
      controllerAs: 'vm'
    }).state('home.account', {
      abstract: true,
      templateUrl: "home/account/index.view.0.8.0.html",
      controller: 'AccountController',
      controllerAs: 'vm'
    }).state('home.account.details', {
      url: "/account/details",
      templateUrl: "home/account/details.view.0.8.0.html",
      controller: 'AccountController',
      controllerAs: 'vm'
    }).state('home.account.privatekey', {
      url: "/account/privatekey",
      templateUrl: "home/account/privatekey.view.0.8.0.html",
      controller: 'AccountController',
      controllerAs: 'vm'
    }).state('home.account.export', {
      url: "/account/export",
      templateUrl: "home/account/export.view.0.8.0.html",
      controller: 'AccountController',
      controllerAs: 'vm'
    }).state('home.addresses', {
      templateUrl: "home/addresses/index.view.0.8.0.html",
      controller: 'AddressesController'
    }).state('home.addresses.myaddresses', {
      url: "/addresses/myaddresses",
      templateUrl: "home/addresses/myaddresses.view.0.8.0.html",
      controller: 'AddressesController',
      controllerAs: 'vm'
    })

    /*.state('home.addresses.multisigaddresses', {
        url: "/addresses/multisignatureaddresses",
        templateUrl: "home/addresses/multisigaddresses.view.0.8.0.html",
        controller: 'AddressesController',
        controllerAs: 'vm'
    })*/

    .state('home.home', {
      url: "/home",
      templateUrl: "home/home.view.0.8.0.html",
      controller: 'AssetsController',
      controllerAs: 'vm'
    }).state('home.explorer', {
      templateUrl: "home/explorer/index.view.0.8.0.html",
      controller: 'ExplorerController'
    }).state('home.explorer.search', {
      url: "/explorer/search/:search",
      templateUrl: "home/explorer/search.view.0.8.0.html",
      controller: 'ExplorerController'
    }).state('home.explorer.transaction', {
      url: "/explorer/tx/:hash",
      templateUrl: "home/explorer/transaction.view.0.8.0.html",
      controller: 'ExplorerController'
    }).state('home.explorer.address', {
      url: "/explorer/adr/:address",
      templateUrl: "home/explorer/address.view.0.8.0.html",
      controller: 'ExplorerController'
    }).state('home.explorer.block', {
      url: "/explorer/blk/:block",
      templateUrl: "home/explorer/block.view.0.8.0.html",
      controller: 'ExplorerController'
    }).state('home.explorer.noresult', {
      url: "/explorer/noresult/:search",
      templateUrl: "home/explorer/noresult.view.0.8.0.html",
      controller: 'ExplorerController'
    }).state('home.asset', {
      abstract: true,
      templateUrl: "home/assets/index.view.0.8.0.html"
    }).state('home.asset.alldetails', {
      url: "/asset/all",
      templateUrl: "home/assets/all.view.0.8.0.html",
      controller: 'ShowAllAssetsController',
      controllerAs: 'vm'
    }).state('home.asset.myassets', {
      url: "/asset/myassets",
      templateUrl: "home/assets/myassets.view.0.8.0.html",
      controller: 'ShowAssetsController',
      controllerAs: 'vm'
    }).state('home.asset.mymits', {
      url: "/asset/mymits",
      templateUrl: "home/assets/mymits.view.0.8.0.html",
      controller: 'ShowMITsController',
      controllerAs: 'vm'
    }).state('home.asset.details', {
      url: "/asset/details/:symbol",
      templateUrl: "home/assets/details.view.0.8.0.html",
      controller: 'AssetDetailController',
      controllerAs: 'vm'
    }).state('home.asset.secondaryissue', {
      url: "/asset/secondaryissue/:symbol",
      templateUrl: "home/assets/secondaryissue.view.0.8.0.html",
      controller: 'AssetSecondaryIssueController',
      controllerAs: 'vm'
    }).state('home.asset.create', {
      url: "/asset/create",
      templateUrl: "home/assets/create.view.0.8.0.html",
      controller: 'CreateAssetController',
      controllerAs: 'vm'
    }).state('home.asset.createmit', {
      url: "/asset/createmit",
      templateUrl: "home/assets/createmit.view.0.8.0.html",
      controller: 'CreateMITController',
      controllerAs: 'vm'
    }).state('home.transferasset', {
      url: "/transfer/asset/:symbol",
      templateUrl: "home/transfer/transferasset.view.0.8.0.html",
      controller: 'TransferAssetController',
      controllerAs: 'vm'
    }).state('home.transferetp', {
      url: "/transfer/ETP",
      templateUrl: "home/transfer/transferetp.view.0.8.0.html",
      controller: 'ETPController',
      controllerAs: 'vm'
    }).state('home.transfermit', {
      url: "/transfer/mit/:symbol",
      templateUrl: "home/transfer/transfermit.view.0.8.0.html",
      controller: 'TransferMITController',
      controllerAs: 'vm'
    }).state('home.multisignature', {
      url: "/transfer/multisignature/:symbol",
      templateUrl: "home/transfer/multisignature.view.0.8.0.html",
      controller: 'TransferMultiSignController',
      controllerAs: 'vm'
    }).state('home.sign', {
      url: "/transfer/sign/:symbol",
      templateUrl: "home/transfer/sign.view.0.8.0.html",
      controller: 'SignMultiSignController',
      controllerAs: 'vm'
    }).state('home.createmultisignature', {
      url: "/addresses/newmultisignature",
      templateUrl: "home/addresses/createmultisignature.view.0.8.0.html",
      controller: 'NewMultiSignController',
      controllerAs: 'vm'
    }).state('home.deposit', {
      url: "/deposit/:symbol",
      templateUrl: "home/deposit.view.0.8.0.html",
      controller: 'DepositController',
      controllerAs: 'vm'
    }).state('home.console', {
      url: "/advanced",
      templateUrl: "home/console.view.0.8.0.html",
      controller: 'ConsoleController'
    }).state('home.profile', {
      templateUrl: "home/avatar/index.view.0.8.0.html",
      controller: 'ProfileController'
    }).state('home.profile.myprofile', {
      url: "/avatar/myavatars/:avatar",
      templateUrl: "home/avatar/myavatars.view.0.8.0.html",
      controller: 'ProfileController'
    }).state('home.profile.create', {
      url: "/avatar/create",
      templateUrl: "home/avatar/create.view.0.8.0.html",
      controller: 'CreateProfileController'
    }).state('home.profile.all', {
      url: "/avatar/all",
      templateUrl: "home/avatar/all.view.0.8.0.html",
      controller: 'AllProfilesController'
    }).state('home.profile.modifyaddress', {
      url: "/avatar/modifyaddress/:didsymbol",
      templateUrl: "home/avatar/modifyaddress.view.0.8.0.html",
      controller: 'ModifyAddressController'
    }).state('home.profile.transfercert', {
      url: "/avatar/transfercert/:symboltype",
      templateUrl: "home/avatar/transfercert.view.0.8.0.html",
      controller: 'TransferCertController'
    }).state('home.profile.issuecert', {
      url: "/avatar/issuecert/:symbol",
      templateUrl: "home/avatar/issuecert.view.0.8.0.html",
      controller: 'IssueCertController'
    });

    $urlRouterProvider.otherwise("/login");
  };

  run.$inject = ['$rootScope', '$location', 'localStorageService', '$translate', 'FileSaver', 'Blob'];

  function run($rootScope, $location, $localStorageService, $translate) {

    if ($localStorageService.get('language') != undefined) {
      $translate.use($localStorageService.get('language'));
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;
      var loggedIn = $localStorageService.get('credentials') != undefined;
      if (restrictedPage && !loggedIn) {
        $location.path('/login');
      }
    });
  }
})();

(function () {
  'use strict';

  angular.module('app').factory('FlashService', FlashService);

  FlashService.$inject = ['$rootScope'];
  function FlashService($rootScope) {
    var service = {};

    service.Success = Success;
    service.Error = Error;
    service.Info = Info;
    service.Warning = Warning;
    service.CloseFlashMessage = CloseFlashMessage;

    initService();

    return service;

    function initService() {
      $rootScope.$on('$locationChangeStart', function () {
        clearFlashMessage();
      });

      function clearFlashMessage() {
        var flash = $rootScope.flash;
        if (flash) {
          if (!flash.keepAfterLocationChange) {
            delete $rootScope.flash;
          } else {
            // only keep for a single location change
            flash.keepAfterLocationChange = false;
          }
        }
      }
    }

    function CloseFlashMessage() {
      delete $rootScope.flash;
    }

    function Success(message, keepAfterLocationChange, hash, link) {
      $rootScope.flash = {
        message: message,
        type: 'success',
        keepAfterLocationChange: keepAfterLocationChange,
        hash: hash,
        link: link
      };
    }

    function Error(message, keepAfterLocationChange, hash, link) {
      $rootScope.flash = {
        message: message,
        type: 'error',
        keepAfterLocationChange: keepAfterLocationChange,
        hash: hash,
        link: link
      };
    }

    function Info(message, keepAfterLocationChange, hash, link) {
      $rootScope.flash = {
        message: message,
        type: 'info',
        keepAfterLocationChange: keepAfterLocationChange,
        hash: hash,
        link: link
      };
    }

    function Warning(message, keepAfterLocationChange, hash, link) {
      $rootScope.flash = {
        message: message,
        type: 'warning',
        keepAfterLocationChange: keepAfterLocationChange,
        hash: hash,
        link: link
      };
    }
  }
})();

(function () {
  'use strict';

  HomeController.$inject = ['MetaverseService', '$rootScope', '$scope', 'localStorageService', '$interval', '$translate', '$location', '$filter', '$http', 'FlashService'];
  MenuController.$inject = ['$location', '$rootScope'];
  ConsoleController.$inject = ['MetaverseService', '$rootScope', 'FlashService', '$translate', '$scope', '$window'];
  AddressesController.$inject = ['MetaverseHelperService', 'MetaverseService', '$translate', '$rootScope', '$scope', 'FlashService', '$location', 'localStorageService', '$window'];
  AccountController.$inject = ['MetaverseService', '$translate', '$rootScope', '$scope', '$http', 'FlashService', '$location', 'localStorageService', '$window', 'FileSaver', 'Blob'];
  TransferAssetController.$inject = ['MetaverseService', '$stateParams', '$rootScope', '$scope', '$translate', '$location', 'localStorageService', 'FlashService', '$window', '$filter'];
  CreateAssetController.$inject = ['MetaverseService', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$location', '$translate', '$window', 'ngDialog', '$filter'];
  AssetSecondaryIssueController.$inject = ['MetaverseService', '$rootScope', '$scope', '$location', 'localStorageService', 'FlashService', '$translate', '$window', 'ngDialog', '$filter'];
  AssetsController.$inject = ['MetaverseHelperService', 'MetaverseService', '$rootScope', '$scope', '$location', '$translate', 'FlashService', '$window'];
  ShowAssetsController.$inject = ['MetaverseService', '$rootScope', '$scope', 'localStorageService', 'FlashService', '$translate', '$stateParams', '$location', '$window', 'ngDialog', '$filter'];
  AssetDetailController.$inject = ['MetaverseService', '$rootScope', '$scope', 'localStorageService', 'FlashService', '$translate', '$stateParams', '$location', '$window', 'ngDialog', '$filter'];
  ShowAllAssetsController.$inject = ['MetaverseService', '$rootScope', '$scope', '$location', 'FlashService', '$translate', '$stateParams', '$window'];
  ETPController.$inject = ['MetaverseService', 'MetaverseHelperService', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window', '$filter'];
  SignMultiSignController.$inject = ['MetaverseService', 'MetaverseHelperService', '$filter', '$location', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window'];
  TransferMultiSignController.$inject = ['MetaverseService', 'MetaverseHelperService', '$location', '$filter', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window'];
  NewMultiSignController.$inject = ['MetaverseService', 'MetaverseHelperService', '$filter', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window'];
  DepositController.$inject = ['MetaverseService', 'MetaverseHelperService', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window', '$location', '$filter'];
  ExplorerController.$inject = ['MetaverseService', 'MetaverseHelperService', '$location', '$stateParams', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window'];
  ProfileController.$inject = ['MetaverseHelperService', 'MetaverseService', '$scope', '$location', '$translate', '$window', 'localStorageService', 'FlashService'];
  CreateProfileController.$inject = ['MetaverseHelperService', 'MetaverseService', 'localStorageService', '$scope', '$translate', '$window', 'FlashService', 'ngDialog', '$location', '$rootScope', '$filter'];
  AllProfilesController.$inject = ['MetaverseHelperService', 'MetaverseService', 'localStorageService', '$scope', '$translate', '$window', 'FlashService', 'ngDialog', '$location'];
  ModifyAddressController.$inject = ['MetaverseHelperService', 'MetaverseService', 'localStorageService', '$scope', '$translate', '$window', 'FlashService', 'ngDialog', '$location', '$rootScope', '$filter'];
  TransferCertController.$inject = ['MetaverseHelperService', 'MetaverseService', '$scope', '$filter', '$rootScope', '$location', '$translate', '$window', 'localStorageService', 'FlashService'];
  IssueCertController.$inject = ['MetaverseHelperService', 'MetaverseService', '$scope', '$filter', '$rootScope', '$location', '$translate', '$window', 'localStorageService', 'FlashService'];
  ShowMITsController.$inject = ['MetaverseHelperService', 'MetaverseService', '$scope', '$translate', '$window', 'localStorageService', 'FlashService'];
  CreateMITController.$inject = ['MetaverseHelperService', 'MetaverseService', 'localStorageService', '$scope', '$translate', '$window', 'FlashService', 'ngDialog', '$location', '$rootScope', '$filter'];
  TransferMITController.$inject = ['MetaverseHelperService', 'MetaverseService', 'localStorageService', '$scope', '$translate', '$window', 'FlashService', 'ngDialog', '$location', '$rootScope', '$filter'];
  angular.module('app').controller('HomeController', HomeController).controller('MenuController', MenuController).controller('ConsoleController', ConsoleController).controller('AddressesController', AddressesController).controller('AccountController', AccountController).controller('TransferAssetController', TransferAssetController).controller('CreateAssetController', CreateAssetController).controller('AssetSecondaryIssueController', AssetSecondaryIssueController).controller('AssetsController', AssetsController).controller('ShowAssetsController', ShowAssetsController).controller('AssetDetailController', AssetDetailController).controller('ShowAllAssetsController', ShowAllAssetsController).controller('ETPController', ETPController).controller('SignMultiSignController', SignMultiSignController).controller('TransferMultiSignController', TransferMultiSignController).controller('NewMultiSignController', NewMultiSignController).controller('DepositController', DepositController).controller('ExplorerController', ExplorerController).controller('ProfileController', ProfileController).controller('CreateProfileController', CreateProfileController).controller('AllProfilesController', AllProfilesController).controller('ModifyAddressController', ModifyAddressController).controller('TransferCertController', TransferCertController).controller('IssueCertController', IssueCertController).controller('ShowMITsController', ShowMITsController).controller('CreateMITController', CreateMITController).controller('TransferMITController', TransferMITController).directive('bsTooltip', function () {
    return {
      restrict: 'A',
      link: function link(scope, element, attrs) {
        $(element).hover(function () {
          // on mouseenter
          $(element).tooltip('show');
        }, function () {
          // on mouseleave
          $(element).tooltip('hide');
        });
      }
    };
  }).directive('z', ['$compile', '$timeout', function ($compile, $timeout) {
    return function (scope, element) {
      $(element).popover();
      $('body').on('click', function (e) {
        //Hide the popover after click somewhere else, only for buttons
        if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('.popover.in').length === 0) {
          $(element).popover('hide');
        }
      });
    };
  }]).directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function link(scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          };
          reader.readAsText(changeEvent.target.files[0]);
        });
      }
    };
  }]).directive('checkImage', function () {
    return {
      link: function link(scope, element, attrs) {
        element.bind('error', function () {
          element.attr('src', 'icon/default.png'); // set default image
        });
      }
    };
  }).filter('convertfortx', function () {
    return function (input, asset_type) {
      if (typeof asset_type === 'undefined') asset_type = 8;
      /*input += '';
      asset_type = parseInt(asset_type);
      1: no decimals, 2: correct number of decimals, 3: more decimals than allowed (asset_type)
      return input.indexOf('.') < 0 ? input + '0'.repeat(asset_type) :
        asset_type - (input.length - (input.indexOf('.') + 1)) >= 0 ? input.slice(0, input.indexOf('.')) + input.slice(input.indexOf('.') + 1) + '0'.repeat(asset_type - (input.length - (input.indexOf('.') + 1))) :
        input.slice(0, input.indexOf('.')) + input.slice(input.indexOf('.') + 1, input.indexOf('.') + 1 + asset_type)*/
      return bigDecimal.multiply(input, Math.pow(10, asset_type));
    };
  }).filter('converttodisplay', function () {
    return function (input, asset_type) {
      if (typeof asset_type === 'undefined') asset_type = 8;
      return bigDecimal.divide(input, Math.pow(10, asset_type));
    };
  });

  function MenuController($location, $rootScope) {

    function setMenu() {
      $rootScope.selectedMenu = {
        main: $location.path().split('/')[1]
      };
    }
    setMenu();
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      setMenu();
    });
  }

  function ExplorerController(MetaverseService, MetaverseHelperService, $location, $stateParams, $rootScope, $scope, FlashService, localStorageService, $translate, $window) {

    $window.scrollTo(0, 0);
    $scope.typeSearch = $location.path().split('/')[2];
    $scope.search = $location.path().split('/')[3];

    $scope.transactionsAddressSearch = [];
    $scope.searchAddressloadTransactions = searchAddressloadTransactions;
    $scope.searchAddressloadMore = searchAddressloadMore;
    $scope.page = 2; //by default we load the first page only
    $scope.stopLoad = false;
    $scope.showqr = showqr;

    $scope.transaction_count = 0;
    $scope.assets = [];
    $scope.exists = false;
    $scope.noResult = false;
    $scope.transactionInputsValues = [];

    $scope.asset = '';

    //define if the research is a Hash, a Transaction, a Block or an Asset
    function defineTypeSearch() {
      if ($scope.typeSearch == '' || $scope.typeSearch == 'noresult' || $scope.typeSearch == 'search') {
        //nothing to do
      } else if ($scope.typeSearch === 'tx') {
        searchTransaction();
      } else if ($scope.typeSearch === 'adr') {
        searchAddress();
      } else if ($scope.typeSearch === 'blk') {
        blockInfo();
      } else {
        //an error happenned or the user typed the URL manually
        $location.path('/explorer');
      }
    }

    defineTypeSearch();

    //Used if we search an Address
    function searchAddress() {
      if (typeof $scope.search !== 'undefined') {
        searchAddressloadTransactions(1, 2);
        //showqr($scope.search);
      }
    }

    function searchAddressloadTransactions(min, max) {
      var page = min;
      for (; page < max && !$scope.stopLoad; page++) {
        NProgress.start();
        MetaverseService.ListTxsAddress($scope.search, page).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success && response.data != undefined) {
            if (response.data.total_page == response.data.current_page && !isNaN(response.data.total_page)) {
              //All the transactions have been loaded
              $scope.stopLoad = true;
            }

            response.data.transactions.forEach(function (e) {
              var transaction = {
                "height": e.height,
                "hash": e.hash,
                "timestamp": new Date(e.timestamp * 1000)
                //"direction": e.direction,
                //"recipents": [],
                //"value": 0
              };
              $scope.transactionsAddressSearch.push(transaction);
              $scope.exists = true;
            });
          } else {
            $translate('MESSAGES.NO_LISTED_TRANSACTIONS').then(function (data) {
              FlashService.Error(data);
              //$location.path('/explorer');
              $scope.noResult = true;
            });
          }
          NProgress.done();
        });
      }
    }

    //Shows the QRCode
    function showqr(address) {
      angular.element(document).ready(function () {
        var qrcode = new QRCode(document.getElementById("qrcode"), {
          text: address,
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      });
    }

    function searchAddressloadMore() {
      if (!$scope.stopLoad) {
        $scope.page = $scope.page + 1;
        searchAddressloadTransactions($scope.page - 1, $scope.page);
      }
    }

    //Used if we search a Transaction
    function searchTransaction() {
      var transaction_hash = $scope.search;
      if (typeof transaction_hash !== 'undefined') {
        NProgress.start();
        MetaverseService.FetchTx(transaction_hash).then(function (response) {
          if (typeof response == 'undefined' || typeof response.success == 'undefined' || response.success == false) {
            $translate('MESSAGES.TRANSACTION_NOT_FOUND').then(function (data) {
              FlashService.Error(data);
            });
            $scope.noResult = true;
            $window.scrollTo(0, 0);
          } else {
            $scope.transaction = response.data.transaction;
            $scope.exists = true;
            var first = true;

            $scope.transaction.inputs.forEach(function (e) {
              e.display = false;
              if (first) {
                e.first = true;
                first = false;
              } else {
                e.first = false;
              }
            });

            $scope.transaction.outputs.forEach(function (e) {
              e.display = false;
              if (e.attachment.type == 'asset-transfer' || e.attachment.type == 'asset-issue') {
                loadasset(e.attachment.symbol);
              }
              //var script = e.script;
              //var occurence = script.match('[' + (/[a-z]|[A-Z]|[0-9]| /g) + '] numequalverify dup hash160 ['+ (/[a-z]|[A-Z]|[0-9]| /g) + '] equalverify checksig');

              //var occurence = script.match(\[([\\w| ]+)\] numequalverify dup hash160 \[[\\w| ]+\] equalverify checksig);
              /*var occurences = phraseToSend.match(/[a-z]|[A-Z]| /g);
              if(phraseToSend.length != occurences.length){
                $translate('MESSAGE.WRONG_PRIVATE_KEY').then( (data) => FlashService.Error(data) );
                $window.scrollTo(0,0);
                return;*/
            });

            //Search for the value of the input and put it in $scope.transactionInputsValues
            $scope.transactionInputsValues = [];
            /*response.data.transaction.inputs.forEach(function(e) { Removed, too slow
              if (e.previous_output.hash != '0000000000000000000000000000000000000000000000000000000000000000') {
                searchInputValue(e.previous_output.hash, e.address, e.previous_output.index);
              } else {
                //It's coming from Deposit interests or Mining
              }
            });*/
          }
          NProgress.done();
        });
      }
    }

    //Loads a given asset
    function loadasset(symbol) {
      MetaverseService.GetAsset(symbol).then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.asset = response.data.assets[0];
        } else {
          //Asset could not be loaded
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
        }
      });
    }

    //Used to find the value of an Input
    /*function searchInputValue(transaction_hash, address, index) {
      if ( typeof transaction_hash !== 'undefined') {
        MetaverseService.FetchTx(transaction_hash)
        .then( (response) => {
          if (typeof response.success == 'undefined' || response.success == false) {
            $scope.noResult = true;
            $translate('MESSAGES.TRANSACTION_NOT_FOUND').then( (data) => {
              FlashService.Error(data);
            });
            $window.scrollTo(0,0);
          } else {
            response.data.transaction.outputs.forEach(function(e) {
              if(e.address == address && e.index == index) {
                if(e.attachment.type=='etp') {
                  var input = {
                    "address" : address,
                    "value" : e.value,
                    "hash" : transaction_hash,
                    "index" : e.index,
                    "type" : e.attachment.type
                  }
                } else {
                  //loadasset(e.attachment.symbol); //already calculated when this asset is an output
                  var input = {
                    "address" : address,
                    "value" : e.value,
                    "hash" : transaction_hash,
                    "index" : e.index,
                    "type" : e.attachment.type,
                    "quantity" : e.attachment.quantity,
                    "symbol" : e.attachment.symbol,
                    "decimal_number" :  $scope.asset.decimal_number
                  }
                }
                $scope.transactionInputsValues.push(input);
              }
            });
          }
        });
      }
    }*/

    //Used if we search a Block
    function blockInfo() {
      var blockHeight = $scope.search;
      $scope.blockInfos = [];

      if (typeof blockHeight !== 'undefined') {
        NProgress.start();
        MetaverseService.FetchHeader(blockHeight).then(function (response) {
          if (typeof response == 'undefined' || typeof response.success == 'undefined' || response.success == false) {
            $scope.noResult = true;
            $translate('MESSAGES.BLOCK_NOT_FOUND').then(function (data) {
              FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
          } else {
            blockInfoTxs(response.data.result.hash);
            $scope.exists = true;
            $scope.blockInfos = {
              "hash": response.data.result.hash,
              "timestamp": new Date(response.data.result.time_stamp * 1000),
              //"transaction_count": response.data.result.transaction_count always display 0, we count the number of txs instead
              "nonce": response.data.result.nonce,
              "mixhash": response.data.result.mixhash,
              "version": response.data.result.version,
              "merkle_tree_hash": response.data.result.merkle_tree_hash,
              "previous_block_hash": response.data.result.previous_block_hash
            };
          }
          NProgress.done();
        });
      }
    }

    //Also used if we search a Block, to display the list of transactions
    function blockInfoTxs(hash) {
      $scope.transactionsPerBlock = [];

      MetaverseService.GetBlock(hash).then(function (response) {
        if (typeof response == 'undefined' || typeof response.success == 'undefined' || response.success == false) {
          $translate('MESSAGES.TRANSACTION_NOT_FOUND').then(function (data) {
            FlashService.Error(data);
            $location.path('/explorer');
          });
        } else {
          response.data.txs.transactions.forEach(function (e) {
            $scope.transaction_count++;
            var transaction = {
              "hash": e.hash
            };
            $scope.transactionsPerBlock.push(transaction);
          });
        }
        NProgress.done();
      });
    }
  }

  function DepositController(MetaverseService, MetaverseHelperService, $rootScope, $scope, FlashService, localStorageService, $translate, $window, $location, $filter) {

    $window.scrollTo(0, 0);
    $scope.symbol = $filter('uppercase')($location.path().split('/')[2]);
    $scope.deposit = deposit;

    $scope.assetsIssued = [];
    $scope.balance = [];
    $scope.availableBalance = 0;
    $scope.sendAll = sendAll;
    $scope.error = [];
    $scope.option = [];

    $scope.confirmation = false;
    $scope.checkInputs = checkInputs;

    function init() {
      $scope.deposit_address = '';
      $scope.password = '';
      $scope.value = '';
      $scope.transactionFee = 0.0001;
      $scope.confirmation = false;
      $scope.period_select = '';
      $scope.submittable = false;
    }

    MetaverseService.ListAssets().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (response.data.assets != "") {
          //if the user has some assets
          response.data.assets.forEach(function (e) {
            if (e.status == 'unspent') {
              $scope.assetsIssued.push({
                "symbol": e.symbol
              });
              if (e.symbol == $scope.symbol) {
                $scope.balance['total-unspent'] = e.quantity, $scope.balance['total-frozen'] = e.quantity, $scope.decimal_number = e.decimal_number;
              }
            }
          });
        } else {//if the user has 0 asset

        }
      } else {
        $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      if ($scope.symbol == 'ETP') {
        loadEtpBalance();
      }
    });

    //[effective interest rate, annual interest rate, period, nbr blocks]
    $scope.deposit_options = {
      "DEPOSIT.PERIOD.WEEK": [0.0009589, 0.05, 7, 25200],
      "DEPOSIT.PERIOD.MONTH": [0.0066667, 0.08, 30, 108000],
      "DEPOSIT.PERIOD.QUARTER": [0.032, 0.128, 90, 331200],
      "DEPOSIT.PERIOD.HALF_YEAR": [0.08, 0.16, 182, 655200],
      "DEPOSIT.PERIOD.YEAR": [0.2, 0.2, 365, 1314000]
    };

    $scope.setDepositPeriod = setDepositPeriod;

    //Set the deposit period to use
    function setDepositPeriod(period) {
      $scope.period_select = period;
    }

    function checkInputs() {
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    function deposit(value, transactionFee, period_select, password) {
      //var deposit_value = ("" + value * Math.pow(10,$scope.decimal_number)).split(".")[0];
      //var fee_value = ("" + transactionFee * Math.pow(10,$scope.decimal_number)).split(".")[0];
      var deposit_value = $filter('convertfortx')(value, $scope.decimal_number);
      var fee_value = $filter('convertfortx')(transactionFee, $scope.decimal_number);

      if (password != localStorageService.get('credentials').password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        var SendPromise = $scope.symbol == 'ETP' ? MetaverseService.Deposit($scope.deposit_options[period_select][2], deposit_value, fee_value, password, $scope.address_option ? $scope.deposit_address : undefined) : MetaverseService.FrozenAsset($scope.deposit_options[period_select][2], deposit_value, fee_value, password, $scope.symbol, $scope.address_option ? $scope.deposit_address : undefined);
        SendPromise.then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success) {
            //Transaction was successful
            $translate('MESSAGES.DEPOSIT_SUCCESS').then(function (data) {
              return FlashService.Success(data, false, response.data.result.transaction.hash);
            });
            $window.scrollTo(0, 0);
            init();
          } else {
            //Transaction problem
            $translate('MESSAGES.DEPOSIT_ERROR').then(function (data) {
              if (response.message.message != undefined) {
                FlashService.Error(data + " " + response.message.message);
              } else {
                FlashService.Error(data);
              }
            });
            $window.scrollTo(0, 0);
            $scope.password = '';
          }
        });
      }
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      if ($scope.address_option && $scope.option.deposit_address_incorrect) {
        $scope.submittable = false;
        return;
      }
      $scope.submittable = true;
    }

    //Check if the certification symbol is valid
    $scope.$watch('value', function (newVal, oldVal) {
      /*var fee = $filter('convertfortx')($scope.transactionFee, 8);
      var max_send = parseInt($scope.availableBalance) - parseInt(fee);
      var value_tx = $filter('convertfortx')(newVal, 8);*/
      $scope.error.value_empty = newVal == undefined || newVal == '' || newVal < 0;
      $scope.error.value_not_enough_balance = newVal != undefined && newVal != '' ? newVal > ($scope.availableBalance - $scope.transactionFee * 100000000) / 100000000 : false;
      $scope.error.value_not_a_number = newVal != undefined && newVal != '' ? isNaN(newVal) : false;
      checkready();
    });

    //Check if the certification type is valid
    $scope.$watch('period_select', function (newVal, oldVal) {
      $scope.error.period_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the new address is valid
    $scope.$watch('deposit_address', function (newVal, oldVal) {
      $scope.option.deposit_address_empty = newVal == undefined || newVal == '';
      $scope.option.deposit_address_incorrect = newVal != undefined && newVal != '' ? !(($rootScope.network == 'testnet' && newVal.charAt(0) == 't' || $rootScope.network == 'mainnet' && newVal.charAt(0) == 'M' || newVal.charAt(0) == '3') && newVal.length == 34 && newVal.match(/^[0-9A-Za-z]+$/)) : false;
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      $scope.error.fee_not_a_number = newVal != undefined ? isNaN(newVal) : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
      checkready();
    });

    //Load users ETP balance
    function loadEtpBalance() {
      MetaverseHelperService.GetBalance(function (err, balance, message) {
        if (err) {
          FlashService.Error(message);
          $window.scrollTo(0, 0);
        } else {
          $scope.balance = balance;
          $scope.decimal_number = 8;
          $scope.availableBalance = balance['total-available'];
        }
      });
    }

    function availBalance(address) {
      if (address == '') {
        $scope.availableBalance = $scope.balance['total-available'];
      } else {
        $scope.addresses.forEach(function (a) {
          if (a.address == address) {
            $scope.availableBalance = a.balance - a.frozen;
          }
        });
      }
    }

    function sendAll() {
      $scope.value = ($scope.availableBalance - $scope.transactionFee * 100000000) / 100000000;
      /*var fee = $filter('convertfortx')($scope.transactionFee, 8);
      var max_send = parseInt($scope.availableBalance) - parseInt(fee);
      $scope.value = $filter('converttodisplay')(max_send, 8);*/
    }

    init();
  }

  /**
  * The ETP Controller provides ETP transaction functionality.
  */
  function ETPController(MetaverseService, MetaverseHelperService, $rootScope, $scope, FlashService, localStorageService, $translate, $window, $filter) {

    $window.scrollTo(0, 0);
    //Start loading animation
    NProgress.start();

    $scope.transfer = transfer;
    $scope.typeTransaction = "simple", $scope.getBalance = getBalance;
    $scope.listAddresses = [];
    $scope.symbol = 'ETP';

    $scope.availBalance = availBalance;
    $scope.availableBalance = 0;
    $scope.sendAll = sendAll;

    $scope.checkRecipent = checkRecipent;
    $scope.checkAmount = checkAmount;
    $scope.allDids = [];
    $scope.allDidsAddresses = [];
    $scope.checkInputs = checkInputs;
    $scope.didFromAddress = [];

    // Initializes all transaction parameters with empty strings.
    function init() {
      getBalance();
      $scope.sendfrom = '';
      $scope.sendto = '';
      $scope.fee = '';
      $scope.message = '';
      $scope.value = '';
      $scope.password = '';
      $scope.transactionFee = 0.0001;
      $scope.memo = '';
      $scope.confirmation = false;
      $scope.error = [];
      $scope.option = [];
      $scope.option.memo_empty = true;
      $scope.recipientOK = [];
      $scope.amountOK = [];
      $scope.recipents = [];
      $scope.recipents.push({ 'index': 1, 'address': '', 'value': '', 'correctEtpAddress': false, 'correctAvatar': false, 'burnAddress': false, 'emptyAmount': true, 'wrongAmount': false, 'notEnough': false });
    }

    function getBalance() {
      //Load users ETP balance
      MetaverseHelperService.GetBalance(function (err, balance, message) {
        if (err) {
          FlashService.Error(message);
          $window.scrollTo(0, 0);
        } else {
          $scope.balance = balance;
          $scope.availableBalance = balance['total-available'];
        }
      });
    }

    getBalance();

    MetaverseService.ListAllDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allDids = response.data.result.dids;
        $scope.allDidsSymbols = [];
        if (typeof $scope.allDids != 'undefined' && $scope.allDids != null) {
          $scope.allDids.forEach(function (did) {
            $scope.allDidsSymbols.push(did.symbol);
            $scope.allDidsAddresses[did.address] = did.symbol;
            $scope.didFromAddress[did.symbol] = did.address;
          });
        } else {
          $scope.allDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_ALL_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      //Once all the DIDs have been loaded, we look for the one entered by the user
      checkRecipent($scope.recipents[0].address, 1);
      checkAmount('', 1);
    });

    function checkRecipent(input, index) {
      if (typeof input == 'undefined' || '') {
        $scope.recipents[index - 1].correctEtpAddress = false;
        $scope.recipents[index - 1].correctAvatar = false;
        $scope.recipents[index - 1].burnAddress = false;
        $scope.recipientOK[index - 1] = false;
      } else if (($rootScope.network == 'testnet' && input.charAt(0) == 't' || $rootScope.network == 'mainnet' && input.charAt(0) == 'M' || input.charAt(0) == '3') && input.length == 34 && input.match(/^[0-9A-Za-z]+$/)) {
        $scope.recipents[index - 1].correctEtpAddress = true;
        $scope.recipents[index - 1].correctAvatar = false;
        $scope.recipents[index - 1].burnAddress = false;
        $scope.recipientOK[index - 1] = true;
      } else if ($scope.allDidsSymbols.indexOf(input) > -1) {
        $scope.recipents[index - 1].correctEtpAddress = false;
        $scope.recipents[index - 1].correctAvatar = true;
        $scope.recipents[index - 1].burnAddress = false;
        $scope.recipientOK[index - 1] = true;
      } else if (input == MetaverseService.burnAddress || $filter('lowercase')(input) == MetaverseService.burnAddress_short) {
        $scope.recipents[index - 1].correctEtpAddress = false;
        $scope.recipents[index - 1].correctAvatar = false;
        $scope.recipents[index - 1].burnAddress = true;
        $scope.recipientOK[index - 1] = true;
      } else {
        $scope.recipents[index - 1].correctEtpAddress = false;
        $scope.recipents[index - 1].correctAvatar = false;
        $scope.recipents[index - 1].burnAddress = false;
        $scope.recipientOK[index - 1] = false;
      }
      checkready();
    }

    function checkAmount(input, index) {
      if (typeof input == 'undefined' || input === '') {
        $scope.recipents[index - 1].emptyAmount = true;
        $scope.recipents[index - 1].wrongAmount = false;
        $scope.recipents[index - 1].notEnough = false;
        $scope.amountOK[index - 1] = false;
      } else if (input < 0) {
        $scope.recipents[index - 1].emptyAmount = false;
        $scope.recipents[index - 1].wrongAmount = true;
        $scope.recipents[index - 1].notEnough = false;
        $scope.amountOK[index - 1] = false;
      } else if (input > $scope.availableBalance / 100000000 - $scope.transactionFee) {
        $scope.recipents[index - 1].emptyAmount = false;
        $scope.recipents[index - 1].wrongAmount = false;
        $scope.recipents[index - 1].notEnough = true;
        $scope.amountOK[index - 1] = false;
      } else {
        $scope.recipents[index - 1].emptyAmount = false;
        $scope.recipents[index - 1].wrongAmount = false;
        $scope.recipents[index - 1].notEnough = false;
        $scope.amountOK[index - 1] = true;
      }
      checkready();
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      for (var recipient in $scope.recipientOK) {
        if (!$scope.recipientOK[recipient]) {
          $scope.submittable = false;
          return;
        }
      }
      for (var amount in $scope.amountOK) {
        if (!$scope.amountOK[amount]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the send from address is valid
    $scope.$watch('sendfrom', function (newVal, oldVal) {
      $scope.error.sendfrom = newVal == undefined;
      checkAmount($scope.recipents[0].value, 1);
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the memo is valid TODO check char
    $scope.$watch('memo', function (newVal, oldVal) {
      $scope.option.memo_empty = newVal == undefined || newVal == '';
      $scope.error.memo_wrong_char = newVal != undefined ? false : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
      checkready();
    });

    $scope.addRecipent = function () {
      $scope.recipents.push({ 'index': $scope.recipents.length + 1, 'address': '', 'value': '', 'correctEtpAddress': false, 'correctAvatar': false, 'burnAddress': false, 'emptyAmount': true, 'wrongAmount': false, 'notEnough': false });
      $scope.sendfrom = '';
      $scope.recipientOK.push(false);
      $scope.amountOK.push(false);
      availBalance('');
      checkready();
    };

    $scope.removeRecipent = function () {
      $scope.recipents.splice($scope.recipents.length - 1, 1);
      $scope.recipientOK.splice($scope.recipientOK.length - 1, 1);
      $scope.amountOK.splice($scope.recipientOK.length - 1, 1);
      checkAmount($scope.recipents[0].value, 1);
      availBalance('');
      checkready();
    };

    //Check Inputs
    function checkInputs(sendfrom, recipents, transactionFee, memo, password) {
      //var transactionOK = true;
      //Check for unimplemented parameters
      /*recipents.forEach( (e) => {
        if (!e.correctEtpAddress && !e.correctAvatar && !e.burnAddress) { //Check for recipent address
          $translate('TRANSFER.INCORRECT_RECIPIENT').then( (data) =>
            $translate('TRANSFER_RECIPENT_ADDRESS').then( (data2) => FlashService.Error(data + ' (' + data2 + ' ' + e.index + ')' ))
          );
          $window.scrollTo(0,0);
          transactionOK = false;
        } else if (typeof e.value == 'undefined' || e.value === '') { //Check for transaction value
          $translate('MESSAGES.TRANSACTION_VALUE_NEEDED').then( (data) => FlashService.Error(data) );
          $window.scrollTo(0,0);
          transactionOK = false;
        } else if (e.value > ($scope.availableBalance/100000000 - transactionFee)) { //Check for transaction value
          $translate('MESSAGES.TRANSACTION_AMOUNT_NOT_ENOUGH').then( (data) => FlashService.Error(data) );
          $window.scrollTo(0,0);
          transactionOK = false;
        }
      });
      if (transactionOK === false) {
        //error already handle
      } else if (transactionFee < 0.0001) { //Check for empty password
        $translate('MESSAGES.TOO_LOW_FEE').then( (data) => FlashService.Error(data) );
        $window.scrollTo(0,0);
      } else if (password === '') { //Check for empty password
        $translate('MESSAGES.PASSWORD_NEEDED').then( (data) => FlashService.Error(data) );
        $window.scrollTo(0,0);
      } else */
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    //Transfers ETP
    function transfer(sendfrom, recipents, transactionFee, memo, password) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        if (recipents.length == 1) {
          //Start transaction for 1 recipent
          transferOne(sendfrom, recipents, transactionFee, memo, password);
        } else {
          //Start transaction with more than 1 recipent
          transferMore(sendfrom, recipents, transactionFee, memo, password);
        }
        $window.scrollTo(0, 0);
        $scope.password = '';
      }
    }

    function transferOne(sendfrom, recipents, transactionFee, memo, password) {
      NProgress.start();
      var value = recipents[0].value;
      var sendTo = recipents[0].address;
      var sendFromAvatar = false;
      //var fee = transactionFee * 100000000;
      //value *= 100000000;
      //value = Math.round(value);
      var fee = $filter('convertfortx')(transactionFee, 8);
      value = $filter('convertfortx')(value, 8);
      //Update send from it is from an avatar
      if ($scope.allDidsAddresses[sendfrom]) {
        sendfrom = $scope.allDidsAddresses[sendfrom];
        sendFromAvatar = true;
      }
      if (recipents[0].correctEtpAddress && !sendFromAvatar) {
        var SendPromise = sendfrom ? MetaverseService.SendFrom(sendfrom, sendTo, value, fee, memo, password) : MetaverseService.Send(sendTo, value, fee, memo, password);
      } else if (recipents[0].burnAddress) {
        var SendPromise = sendfrom ? MetaverseService.DidSendFrom(MetaverseService.burnAddress, sendTo, value, fee, memo, password) : MetaverseService.DidSend(MetaverseService.burnAddress, value, fee, memo, password);
      } else {
        var SendPromise = sendfrom ? MetaverseService.DidSendFrom(sendfrom, sendTo, value, fee, memo, password) : MetaverseService.DidSend(sendTo, value, fee, memo, password);
      }
      SendPromise.then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          //Transaction was successful
          $translate('MESSAGES.TRANSFER_SUCCESS').then(function (data) {
            return FlashService.Success(data, false, response.data.result.transaction.hash);
          });
          $window.scrollTo(0, 0);
          init();
        } else {
          //Transaction problem
          $translate('MESSAGES.TRANSFER_ERROR').then(function (data) {
            $scope.confirmation = false;
            if (response.message.message != undefined) {
              FlashService.Error(data + " " + response.message.message);
            } else {
              FlashService.Error(data);
            }
          });
          $window.scrollTo(0, 0);
          $scope.password = '';
        }
      });
    }

    function transferMore(sendfrom, recipents, transactionFee, memo, password) {
      NProgress.start();
      var recipentsQuery = []; //data that will be used for the query
      var fee = transactionFee * 100000000;

      recipents.forEach(function (e) {
        var value = e.value;
        value *= 100000000;
        value = Math.round(value);
        if (e.burnAddress) {
          e.address = MetaverseService.burnAddress;
        }
        recipentsQuery.push({
          "address": e.address,
          "value": value
        });
      });

      var SendPromise = MetaverseService.DidSendMore(recipentsQuery, fee, password);
      SendPromise.then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          //Transaction was successful
          $translate('MESSAGES.TRANSFER_SUCCESS').then(function (data) {
            return FlashService.Success(data, false, response.data.result.transaction.hash);
          });
          $window.scrollTo(0, 0);
          init();
        } else {
          //Transaction problem
          $scope.confirmation = false;
          $translate('MESSAGES.TRANSFER_ERROR').then(function (data) {
            if (response.message.message != undefined) {
              FlashService.Error(data + " " + response.message.message);
            } else {
              FlashService.Error(data);
            }
          });
          $window.scrollTo(0, 0);
          $scope.password = '';
        }
      });
    }

    function availBalance(address) {
      if (address == '') {
        $scope.availableBalance = $scope.balance['total-available'];
      } else {
        $scope.availableBalance = $scope.addresses[address].available;
      }
      checkAmount($scope.recipents[0].value, 1);
    }

    function sendAll() {
      $scope.recipents[0].value = ($scope.availableBalance - 100000000 * $scope.transactionFee) / 100000000;
      checkAmount($scope.recipents[0].value, 1);
    }

    function listMultiSign() {
      NProgress.start();
      //Load users ETP balance
      //Load the addresses and their balances
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach(function (e) {
            var name = "New address";
            if (localStorageService.get(e.balance.address) != undefined) {
              name = localStorageService.get(e.balance.address);
            }
            $scope.addresses[e.balance.address] = {
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen,
              "type": "single"
            };
            $scope.listAddresses.push({
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address
            });
          });

          //After loading the balances, we load the multisig addresses
          MetaverseService.ListMultiSig().then(function (response) {
            if (typeof response.success !== 'undefined' && response.success) {
              if (response.data.multisig != "") {
                //if the user has some assets
                response.data.multisig.forEach(function (e) {
                  $scope.addresses[e.address].type = "multisig";
                });
              } else {
                //The account has no multi-signature address
              }
            } else {
                //Fail
              }
          });
        }
      });
      NProgress.done();
    }

    listMultiSign();

    //Initialize
    init();
    NProgress.done();
  }

  /**
  * The ETPMultiSign Controller provides ETP multi-signatures transaction functionality.
  */
  function SignMultiSignController(MetaverseService, MetaverseHelperService, $filter, $location, $rootScope, $scope, FlashService, localStorageService, $translate, $window) {

    $scope.transferSuccess = false;
    $scope.signMultisigTx = signMultisigTx;
    $scope.lastTx = false;
    $scope.symbol = $filter('uppercase')($location.path().split('/')[3]);

    // Initializes all transaction parameters with empty strings.
    function init() {
      $scope.resultSignTx = '';
      $scope.error = [];
      $scope.transaction = '';
    }

    function signMultisigTx(message, password, lastTx) {
      if (password == undefined || localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        MetaverseService.SignMultisigTx(message, password, lastTx).then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success) {
            //Transaction was successful
            if (lastTx) {
              $translate('MESSAGES.SIGN_AND_BROADCAST_SUCCESS').then(function (data) {
                return FlashService.Success(data);
              });
              $window.scrollTo(0, 0);
            } else {
              $translate('MESSAGES.SIGN_SUCCESS').then(function (data) {
                return FlashService.Success(data);
              });
              $window.scrollTo(0, 0);
            }
            init();
            $scope.transferSuccess = true;
            $scope.resultSignTx = response.data.result;
          } else {
            //Transaction problem
            $translate('MESSAGES.SIGN_ERROR').then(function (data) {
              if (response.message != undefined && response.message.message != undefined) {
                FlashService.Error(data + " " + response.message.message);
              } else {
                FlashService.Error(data);
              }
            });
            $window.scrollTo(0, 0);
          }
        });
      }
    }

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });

    //Initialize
    init();
  }

  /**
  * The ETPMultiSign Controller provides ETP multi-signatures transaction functionality.
  */
  function TransferMultiSignController(MetaverseService, MetaverseHelperService, $location, $filter, $rootScope, $scope, FlashService, localStorageService, $translate, $window) {

    $window.scrollTo(0, 0);
    //Start loading animation
    NProgress.start();
    $scope.symbol = $filter('uppercase')($location.path().split('/')[3]);

    $scope.sendAllMultisig = sendAllMultisig;
    $scope.transactionFee = 0.0001;
    $scope.listAddresses = []; //List of addresses

    $scope.listMultiSig = [];
    $scope.listAssetMultiSig = [];
    $scope.createMultisigTx = createMultisigTx;
    $scope.transferSuccess = false; //Change to True after a successful transaction
    $scope.resultCreateTx = '';
    $scope.checkRecipent = checkRecipent;
    $scope.allDids = [];
    $scope.allDidsSymbols = [];
    $scope.checkInputs = checkInputs;
    $scope.didFromAddress = [];
    $scope.allDidsAddresses = [];
    $scope.availBalance = availBalance;
    $scope.availBalanceAsset = availBalanceAsset;
    $scope.assetAddresses = [];

    // Initializes all transaction parameters with empty strings.
    function init() {
      $scope.sendfrom = '';
      $scope.sendto = '';
      $scope.fee = '';
      $scope.message = '';
      $scope.value = '';
      $scope.password = '';
      $scope.availableBalance = 0;
      $scope.error = [];
      $scope.transferSuccess = false;
      $scope.resultCreateTx = '';
      $scope.correctEtpAddress = false;
      $scope.correctAvatar = false;
      $scope.burnAddress = false;
      $scope.confirmation = false;
    }

    MetaverseHelperService.GetBalance(function (err, balance, message) {
      if (err) {
        FlashService.Error(message);
        $window.scrollTo(0, 0);
      } else {
        $scope.balance = balance;
      }
    });

    NProgress.start();
    //Load users ETP balance
    //Load the addresses and their balances
    MetaverseService.ListBalances().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.addresses = [];
        response.data.balances.forEach(function (e) {
          var name = "New address";
          if (localStorageService.get(e.balance.address) != undefined) {
            name = localStorageService.get(e.balance.address);
          }
          $scope.addresses[e.balance.address] = {
            "balance": parseInt(e.balance.unspent),
            "available": parseInt(e.balance.available),
            "address": e.balance.address,
            "name": name,
            "frozen": e.balance.frozen,
            "type": "single"
          };
          $scope.listAddresses.push({
            "balance": parseInt(e.balance.unspent),
            "available": parseInt(e.balance.available),
            "address": e.balance.address
          });
        });

        //After loading the balances, we load the multisig addresses
        MetaverseService.ListMultiSig().then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            if (response.data.multisig != "") {
              //if the user has some assets
              response.data.multisig.forEach(function (e) {
                $scope.addresses[e.address].type = "multisig";
                var name = "New address";
                if (localStorageService.get(e.address) != undefined) {
                  name = localStorageService.get(e.address);
                }
                var balance = '';
                $scope.listMultiSig.push({
                  "index": e.index,
                  "m": e.m,
                  "n": e.n,
                  "selfpublickey": e["self-publickey"],
                  "description": e.description,
                  "address": e.address,
                  "name": name,
                  "balance": $scope.addresses[e.address].balance,
                  "available": $scope.addresses[e.address].available,
                  "publicKeys": e["public-keys"]
                });
              });
            } else {
              //The account has no multi-signature address
            }
          } else {
              //Fail
            }
        });
      }
      NProgress.done();
    });

    if ($scope.symbol != 'ETP') {
      MetaverseService.GetAccountAsset($scope.symbol).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.assetAddresses = response.data.result.assets;
          if ($scope.assetAddresses) {
            $scope.decimal_number = $scope.assetAddresses[0].decimal_number;
            $scope.assetAddresses.forEach(function (address) {
              var balance = '';
              if (address.address.charAt(0) == '3') {
                $scope.listAssetMultiSig[address.address] = address;
              }
            });
          }
        } else {
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
    } else {
      $scope.decimal_number = 8;
    }

    MetaverseService.ListAllDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allDids = response.data.result.dids;
        if (typeof $scope.allDids != 'undefined' && $scope.allDids != null) {
          $scope.allDids.forEach(function (did) {
            $scope.allDidsSymbols.push(did.symbol);
            $scope.allDidsAddresses[did.address] = did.symbol;
            $scope.didFromAddress[did.symbol] = did.address;
          });
        } else {
          $scope.allDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_ALL_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      //Once all the DIDs have been loaded, we look for the one entered by the user
      checkRecipent($scope.sendTo);
    });

    function checkInputs() {
      //Since multi sig to did is not available, we replace it by the address
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    function createMultisigTx(sendFrom, sendTo, quantity, transactionFee, password) {
      if ($scope.burnAddress) {
        sendTo = MetaverseService.burnAddress;
      } else if ($scope.correctAvatar) {
        //if send to avatar
        sendTo = $scope.didFromAddress[sendTo];
      }
      if ($scope.didFromAddress[sendFrom]) {
        //if send from avatar
        sendFrom = $scope.didFromAddress[sendFrom];
      }
      //var quantityToSend = ("" + quantity * Math.pow(10,8)).split(".")[0];
      var quantityToSend = $filter('convertfortx')(quantity, $scope.decimal_number);
      //var transactionFeeToSend = ("" + transactionFee * Math.pow(10,8)).split(".")[0];
      var transactionFeeToSend = $filter('convertfortx')(transactionFee, 8);
      var SendPromise = $scope.symbol == 'ETP' ? MetaverseService.CreateMultisigTx(sendFrom, sendTo, quantityToSend, transactionFeeToSend, password) : MetaverseService.CreateAssetMultisigTx($scope.symbol, sendFrom, sendTo, quantityToSend, transactionFeeToSend, password);
      SendPromise.then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          //Transaction was successful
          $translate('MESSAGES.CREATE_MULTISIGNATURE_SUCCESS').then(function (data) {
            return FlashService.Success(data);
          });
          $window.scrollTo(0, 0);
          init();
          $scope.transferSuccess = true;
          $scope.resultCreateTx = response.data.result;
        } else {
          //Transaction problem
          $translate('MESSAGES.CREATE_MULTISIGNATURE_ERROR').then(function (data) {
            if (response.message != undefined && response.message.message != undefined) {
              FlashService.Error(data + " " + response.message.message);
              $window.scrollTo(0, 0);
            } else {
              FlashService.Error(data);
              $window.scrollTo(0, 0);
            }
          });
          $scope.password = '';
        }
      });
    }

    function sendAllMultisig() {
      $scope.quantity = $scope.symbol == 'ETP' ? ($scope.availableBalance - $scope.transactionFee * 100000000) / 100000000 : parseFloat($filter('converttodisplay')($scope.availableBalance, $scope.decimal_number));
      if ($scope.quantity < 0) $scope.quantity = 0;
    }

    function checkRecipent(input) {
      if (typeof input == 'undefined' || input == '') {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = false;
        $scope.burnAddress = false;
        $scope.correctMutliSignAddress = false;
      } else if (($rootScope.network == 'testnet' && input.charAt(0) == 't' || $rootScope.network == 'mainnet' && input.charAt(0) == 'M' || input.charAt(0) == '3') && input.length == 34 && input.match(/^[0-9A-Za-z]+$/)) {
        $scope.correctEtpAddress = true;
        $scope.correctAvatar = false;
        $scope.burnAddress = false;
        $scope.correctMultiSignAddress = false;
      } else if ($scope.allDidsSymbols.indexOf(input) > -1) {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = true;
        $scope.burnAddress = false;
        $scope.correctMultiSignAddress = false;
      } else if (input == MetaverseService.burnAddress || $filter('lowercase')(input) == MetaverseService.burnAddress_short) {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = false;
        $scope.burnAddress = true;
        $scope.correctMultiSignAddress = false;
      } else {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = false;
        $scope.burnAddress = false;
        $scope.correctMultiSignAddress = false;
      }
      checkready();
    }

    function availBalance(address) {
      $scope.availableBalance = $scope.addresses[address].available;
      $scope.error.quantity_not_enough_ETP_balance = $scope.quantity != undefined && $scope.quantity != '' && $scope.symbol == 'ETP' ? parseInt($filter('convertfortx')($scope.quantity, 8)) > parseInt($scope.availableBalance) - parseInt($filter('convertfortx')($scope.transactionFee, 8)) : false;
    }

    function availBalanceAsset(address) {
      $scope.assetAddresses.forEach(function (a) {
        if (a.address == address) {
          $scope.availableBalance = a.quantity - a.locked_quantity;
        }
      });
      $scope.error.quantity_not_enough_balance = $scope.quantity != undefined && $scope.quantity != '' && $scope.symbol != 'ETP' ? parseInt($filter('convertfortx')($scope.quantity, $scope.decimal_number)) > parseInt($scope.availableBalance) : false;
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      if (!$scope.correctEtpAddress && !$scope.correctAvatar && !$scope.burnAddress) {
        $scope.submittable = false;
        return;
      }
      $scope.submittable = true;
    }

    //Check if the send from address is valid
    $scope.$watch('sendfrom', function (newVal, oldVal) {
      $scope.error.sendfrom = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the recipient is valid
    $scope.$watch('sendTo', function (newVal, oldVal) {
      $scope.error.sendTo_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the amount is valid
    $scope.$watch('quantity', function (newVal, oldVal) {
      $scope.error.quantity_empty = newVal == undefined;
      $scope.error.quantity_not_enough_ETP_balance = $scope.quantity != undefined && $scope.quantity != '' && $scope.symbol == 'ETP' ? parseInt($filter('convertfortx')($scope.quantity, 8)) > parseInt($scope.availableBalance) - parseInt($filter('convertfortx')($scope.transactionFee, 8)) : false;
      $scope.error.quantity_not_enough_balance = $scope.quantity != undefined && $scope.quantity != '' && $scope.symbol != 'ETP' ? parseInt($filter('convertfortx')($scope.quantity, $scope.decimal_number)) > parseInt($scope.availableBalance) : false;
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });

    //Initialize
    init();
  }

  /**
  * Create new multi-signature address
  */
  function NewMultiSignController(MetaverseService, MetaverseHelperService, $filter, $rootScope, $scope, FlashService, localStorageService, $translate, $window) {

    $window.scrollTo(0, 0);
    //Start loading animation
    NProgress.start();
    $scope.displayEmptyAdresses = false;
    $scope.recipents = [];
    $scope.buttonCopyToClipboard = new Clipboard('.btn');
    $scope.getPublicKey = getPublicKey;
    $scope.publicKey = '';
    $scope.cosigners = [];
    $scope.getNewMultisign = getNewMultisign;
    $scope.nbrCosignersRequired = 0;

    $scope.listAddresses = []; //List of addresses
    $scope.listMultiSig = [];
    $scope.error = [];
    $scope.checkHash = checkHash;

    // Initializes all transaction parameters with empty strings.
    function init() {
      $scope.sendfrom = '';
      $scope.publicKey = '';
      $scope.cosigners = [];
      $scope.cosigners.push({ 'index': 1, 'publicKey': '' });
      $scope.cosignersError = [];
      $scope.cosignersError.push(true);
      $scope.nbrCosignersRequired = '';
      $scope.transferSuccess = false;
      $scope.resultCreateTx = '';
      $scope.submittable = false;
    }

    NProgress.start();
    //Load users ETP balance
    //Load the addresses and their balances
    MetaverseService.ListBalances().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.addresses = [];
        response.data.balances.forEach(function (e) {
          var name = "New address";
          if (localStorageService.get(e.balance.address) != undefined) {
            name = localStorageService.get(e.balance.address);
          }
          $scope.addresses[e.balance.address] = {
            "balance": parseInt(e.balance.unspent),
            "available": parseInt(e.balance.available),
            "address": e.balance.address,
            "name": name,
            "frozen": e.balance.frozen,
            "type": "single"
          };
          $scope.listAddresses.push({
            "balance": parseInt(e.balance.unspent),
            "available": parseInt(e.balance.available),
            "address": e.balance.address
          });
        });

        //After loading the balances, we load the multisig addresses
        MetaverseService.ListMultiSig().then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            if (response.data.multisig != "") {
              //if the user has some assets
              response.data.multisig.forEach(function (e) {
                $scope.addresses[e.address].type = "multisig";
                var name = "New address";
                if (localStorageService.get(e.address) != undefined) {
                  name = localStorageService.get(e.address);
                }
                var balance = '';
                $scope.listMultiSig.push({
                  "index": e.index,
                  "m": e.m,
                  "n": e.n,
                  "selfpublickey": e["self-publickey"],
                  "description": e.description,
                  "address": e.address,
                  "name": name,
                  "balance": $scope.addresses[e.address].balance,
                  "available": $scope.addresses[e.address].available,
                  "publicKeys": e["public-keys"]
                });
              });
            } else {
              //The account has no multi-signature address
            }
          } else {
              //Fail
            }
        });
      }
      NProgress.done();
    });

    function getPublicKey(address) {
      NProgress.start();
      MetaverseService.GetPublicKey(address).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.publicKey = response.data['public-key'];
        } else {
          $translate('MESSAGES.ADDRESS_NOT_FOUND').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
      NProgress.done();
    }

    $scope.addCoSigner = function () {
      $scope.cosigners.push({ 'index': $scope.cosigners.length + 1, 'publicKey': '', 'error': true });
      $scope.cosignersError.push(true);
    };

    $scope.removeCoSigner = function () {
      $scope.cosigners.splice($scope.cosigners.length - 1, 1);
      $scope.cosignersError.splice($scope.cosignersError.length - 1, 1);
    };

    //Used to dynamically update the number of signature required
    $scope.getNumber = function (num) {
      return new Array(num);
    };

    function getNewMultisign() {
      NProgress.start();
      var SendPromise = MetaverseService.GetNewMultiSig($scope.nbrCosignersRequired, $scope.cosigners.length + 1, $scope.publicKey, $scope.cosigners);
      SendPromise.then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          //Creation was successful
          $translate('MESSAGES.CREATE_MULTISIGNATURE_SUCCESS').then(function (data) {
            return FlashService.Success(data + " : " + response.data.result.address);
          });
          $window.scrollTo(0, 0);
          init();
        } else {
          //Transaction problem
          $translate('MESSAGES.CREATE_MULTISIGNATURE_ERROR').then(function (data) {
            if (response.message != undefined && response.message.message != undefined) {
              FlashService.Error(data + " : " + response.message.message);
              $window.scrollTo(0, 0);
            } else {
              FlashService.Error(data);
              $window.scrollTo(0, 0);
            }
          });
        }
        NProgress.done();
      });
    }

    function checkHash(publicKey, index) {
      if ((typeof publicKey === 'undefined' ? 'undefined' : _typeof(publicKey)) == undefined || publicKey == '' || publicKey.length != 66 || !publicKey.match(/^[0-9A-Za-z]+$/)) {
        $scope.cosignersError[index - 1] = true;
      } else {
        $scope.cosignersError[index - 1] = false;
      }
      checkready();
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      for (var cosigner in $scope.cosignersError) {
        if ($scope.cosignersError[cosigner]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the send from address is valid
    $scope.$watch('sendfrom', function (newVal, oldVal) {
      $scope.error.sendfrom = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the send from hash is valid
    $scope.$watch('publicKey', function (newVal, oldVal) {
      $scope.error.publicKey = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the send from hash is valid
    $scope.$watch('nbrCosignersRequired', function (newVal, oldVal) {
      $scope.error.nbrCosignersRequired = newVal == undefined || newVal == '';
      checkready();
    });

    //Initialize
    init();
  }

  function AddressesController(MetaverseHelperService, MetaverseService, $translate, $rootScope, $scope, FlashService, $location, localStorageService, $window) {

    $window.scrollTo(0, 0);
    $scope.addresses = [];
    $scope.addressesFiltered = [];
    $scope.addressesDisplay = [];
    $scope.displayEmpty = displayEmpty;
    $scope.hideEmpty = hideEmpty;
    $scope.getnewaddress = getnewaddress;
    $scope.showqr = showqr;
    $scope.buttonCopyToClipboard = new Clipboard('.btn');

    $scope.enableEditAddressName = enableEditAddressName;
    $scope.endEditAddressName = endEditAddressName;
    $scope.cancelEditAddressName = cancelEditAddressName;
    $scope.newName = 'New Address';
    $scope.myDidsAddresses = [];
    $scope.myDidsSymbols = [];

    $scope.balance = {};

    function init() {
      if ($location.path().split('/')[2] == 'multisignatureaddresses') {
        //listMultiSign();
      } else if ($location.path().split('/')[2] == 'myaddresses') {
        listBalances();
      }
    }

    init();

    //Shows a modal of the address incl. a qr code
    function showqr(address) {
      $('#showqrmodal').modal();
      $("#modal_address").html(address);
      $('#modal_qr').html('');
      var qrcode = new QRCode(document.getElementById("modal_qr"), {
        text: address,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      $('#showqrmodal').modal('show');
    }

    //Enable the edition of the Address Name
    function enableEditAddressName(address) {
      $scope.addresses.forEach(function (e) {
        if (e.address == address) {
          e.newName = e.name;
          e.edit = true;
        }
      });
    }

    //Save the edited name in the local storage
    function endEditAddressName(address, newName) {
      localStorageService.set(address, newName);
      $scope.addresses.forEach(function (e) {
        if (e.address == address) {
          e.name = newName;
          e.edit = false;
        }
      });
    }

    //Cancel the edition
    function cancelEditAddressName(address) {
      $scope.addresses.forEach(function (e) {
        if (e.address == address) {
          e.newName = e.name;
          e.edit = false;
        }
      });
    }

    //Load the addresses and their balances
    function listBalances() {
      NProgress.start();
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach(function (e, i) {
            var name = localStorageService.get(e.balance.address);
            if (name == undefined) {
              name = "New Address";
            }
            $scope.addresses.push({
              "balance": parseInt(e.balance.unspent),
              "address": e.balance.address,
              "frozen": e.balance.frozen,
              "name": name,
              "edit": false,
              "index": response.data.balances.length - i
            });
          });
          $scope.addressesDisplay = $scope.addresses;
          $scope.addressesFiltered = [];
          $scope.addresses.forEach(function (a) {
            if (a.balance != 0) {
              $scope.addressesFiltered.push(a);
            }
          });
        }
        NProgress.done();
      });
    }

    function displayEmpty() {
      $scope.addressesDisplay = $scope.addresses;
    }

    function hideEmpty() {
      $scope.addressesDisplay = $scope.addressesFiltered;
    }

    function getnewaddress() {
      MetaverseService.GetNewAddress().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          //FlashService.Success('Created new address: ' + response.data);
          $translate('MESSAGES.CREATED_ADDRESS').then(function (data) {
            return FlashService.Success(data);
          });
          $window.scrollTo(0, 0);
          listBalances();
        }
      });
    }

    function listMultiSign() {
      NProgress.start();
      if ($scope.sendfrom == '') {
        FlashService.Error('Please select an address');
        $window.scrollTo(0, 0);
      } else if ($scope.password === '') {
        //Check for empty password
        $translate('MESSAGES.PASSWORD_NEEDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        MetaverseService.ListMultiSig().then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            if (response.data.multisig != "") {
              //if the user has some assets
              response.data.multisig.forEach(function (e) {
                var name = localStorageService.get(e.address);
                if (name == undefined) {
                  name = "New Address";
                }
                $scope.addresses.push({
                  "index": e.index,
                  "m": e.m,
                  "n": e.n,
                  "selfpublickey": e["self-publickey"],
                  "description": e.description,
                  "address": e.address,
                  "name": name,
                  "publicKeys": e["public-keys"],
                  "edit": false
                });
              });
            } else {
              //The account has no multi-signature address
            }
          } else {
              //Fail
            }
        });
      }
      NProgress.done();
    }

    //Load users ETP balance
    MetaverseHelperService.GetBalance(function (err, balance, message) {
      if (err) {
        FlashService.Error(message);
        $window.scrollTo(0, 0);
      } else {
        $scope.balance = balance;
      }
    });

    MetaverseService.ListMyDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.myDids = response.data.result.dids;
        $scope.balancesLoaded = true;
        if (typeof $scope.myDids != 'undefined' && $scope.myDids != null) {
          $scope.myDids.forEach(function (did) {
            //$scope.myDidsSymbols.push(did.symbol);
            $scope.myDidsAddresses[did.address] = did.symbol;
          });
        } else {
          $scope.myDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });
  }

  function AccountController(MetaverseService, $translate, $rootScope, $scope, $http, FlashService, $location, localStorageService, $window, FileSaver, Blob) {

    $window.scrollTo(0, 0);
    $scope.showprivatekey = showprivatekey;
    $scope.changepassword = changepassword;
    $scope.exportAccount = exportAccount;
    $scope.accountname = localStorageService.get('credentials').user;
    $scope.debugState = MetaverseService.debug;
    $scope.path = "";
    $scope.download = download;
    $scope.showqr = showqr;
    $scope.empty = '';
    $scope.addressesNbr = 0;

    $scope.setDeugger = setDeugger;

    function showprivatekey(password, last_word) {
      if (password == undefined) {
        $translate('MESSAGES.PASSWORD_NEEDED_FOR_PRIVATE_KEY').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        NProgress.start();
        MetaverseService.GetAccount(last_word).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            $scope.privatekey = response.data['mnemonic-key'];
          } else {
            //Show mnemonic load error
            $translate('SETTINGS.MNEMONIC_LOAD_ERROR').then(function (data) {
              return FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
          }
          NProgress.done();
        });
      }
    }

    function changepassword(password, new_password, new_password_repeat) {
      if (password == undefined || localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if (new_password == undefined || new_password.length < 6) {
        $translate('MESSAGES.PASSWORD_SHORT').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if (new_password != new_password_repeat) {
        $translate('MESSAGES.PASSWORD_NOT_MATCH').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        NProgress.start();
        MetaverseService.ChangePassword(new_password).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            //Show success message
            $translate('MESSAGES.CHANGE_PASSWORD_SUCCESS').then(function (data) {
              FlashService.Success(data, true);
              $location.path('/login');
            });
          } else {
            //Show change password error
            $translate('SETTINGS.CHANGE_PASSWORD_ERROR').then(function (data) {
              return FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
          }
          NProgress.done();
        });
      }
    }

    function setDeugger(state) {
      MetaverseService.debug = state == 1;
      $scope.debugState = MetaverseService.debug;
    }

    new Blob(['text'], { type: 'text/plain;charset=utf-8' });

    function download(text, fileName) {
      var jsonse = JSON.stringify(text);
      var data = new Blob([jsonse], { type: "application/json" });
      FileSaver.saveAs(data, fileName + '.' + $scope.empty + 'json');
    };

    //Shows a modal of the address incl. a qr code
    function showqr(text, password) {
      var mnemonic = text.mnemonic;
      var index = text.index;
      $scope.addressesNbr = index;

      var decryptedmnemonic = JSON.parse(CryptoJS.AES.decrypt(mnemonic, password).toString(CryptoJS.enc.Utf8));
      var seed = bip39.mnemonicToSeed(decryptedmnemonic, MetaverseService.MetaverseNetwork[$rootScope.network]);
      var encseed = CryptoJS.AES.encrypt(JSON.stringify(seed.toString('hex')), password).toString();

      var display = encseed + "&" + $rootScope.network.charAt(0) + "&" + index;

      $('#showqrmodal').modal();
      $('#modal_account').html(localStorageService.get('credentials').user);
      $('#modal_qr').html('');
      var qrcode = new QRCode(document.getElementById("modal_qr"), {
        text: display,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      $('#showqrmodal').modal('show');
    }

    function exportAccount(password, last_word, toFile) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
        /*} else if (path.split(" ").length > 1) {
          $translate('MESSAGES.CONTAINS_SPACE').then( (data) => FlashService.Error(data) );
          $window.scrollTo(0,0);*/
      } else {
        NProgress.start();
        //MetaverseService.ExportAccountAsFile(password, last_word)
        MetaverseService.DumpKeyFile(password, last_word).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            if (toFile) {
              download(response.data.result, 'mvs_keystore_' + localStorageService.get('credentials').user);
              $translate('MESSAGES.EXPORT_ACCOUNT_FILE_SUCCESS').then(function (data) {
                return FlashService.Success(data);
              });
            } else {
              showqr(response.data.result, password);
            }
            $window.scrollTo(0, 0);
          } else {
            //Show export error
            $translate('MESSAGES.EXPORT_ACCOUNT_FILE_ERROR').then(function (data) {
              if (response.message != undefined) {
                FlashService.Error(data + " " + response.message.message);
              } else {
                FlashService.Error(data);
              }
            });
            $window.scrollTo(0, 0);
          }
          NProgress.done();
        });
      }
    }
  }

  function TransferAssetController(MetaverseService, $stateParams, $rootScope, $scope, $translate, $location, localStorageService, FlashService, $window, $filter) {

    $window.scrollTo(0, 0);
    //$scope.symbol = $stateParams.symbol;
    $scope.symbol = $filter('uppercase')($location.path().split('/')[3]);
    $scope.sendasset = sendasset;

    $scope.assetsIssued = [];

    $scope.assetAddresses = []; //Contrain the asset balance of each address

    $scope.availBalance = availBalance;
    $scope.availableBalance = 0;
    $scope.sendAll = sendAll;
    $scope.checkRecipent = checkRecipent;
    $scope.allDids = [];
    $scope.allDidsAddresses = [];
    $scope.checkInputs = checkInputs;
    $scope.didFromAddress = [];
    $scope.updateUnlockNumber = updateUnlockNumber;
    $scope.checkready = checkready;

    // Initializes all transaction parameters with empty strings.
    function init() {
      $scope.sendfrom = '';
      $scope.sendto = '';
      $scope.message = '';
      $scope.quantity = undefined;
      $scope.password = '';
      $scope.correctEtpAddress = false;
      $scope.correctAvatar = false;
      $scope.burnAddress = false;
      $scope.confirmation = false;
      $scope.transactionFee = 0.0001;
      $scope.error = [];
      $scope.errorDeposit = [];
      $scope.unlockNumber = 1;
      $scope.unlockNumberString = '1';
      $scope.interestRate = '0';
      $scope.model = '0';
      $scope.model2ToSend = [];
      $scope.model2Displayed = 1;
      for (var i = 0, value = { "index": i, "number": "", "quantity": "" }, size = 100, array = new Array(100); i < size; i++, value = { "index": i, "number": "", "quantity": "" }) {
        array[i] = value;
      }$scope.model2 = array;
    }

    MetaverseService.ListAssets().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (response.data.assets != "") {
          //if the user has some assets
          response.data.assets.forEach(function (e) {
            if (e.status == 'unspent') {
              $scope.assetsIssued.push({
                "symbol": e.symbol,
                "quantity": e.quantity,
                "available": e.quantity - e.locked_quantity,
                "decimal_number": e.decimal_number
              });
            }
          });
          loadasset($scope.symbol);
        } else {//if the user has 0 asset

        }
      } else {
        $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    MetaverseService.GetAccountAsset($scope.symbol).then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.assetAddresses = response.data.result.assets;
      } else {
        $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    MetaverseService.ListAllDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allDids = response.data.result.dids;
        $scope.allDidsSymbols = [];
        if (typeof $scope.allDids != 'undefined' && $scope.allDids != null) {
          $scope.allDids.forEach(function (did) {
            $scope.allDidsSymbols.push(did.symbol);
            $scope.allDidsAddresses[did.address] = did.symbol;
            $scope.didFromAddress[did.symbol] = did.address;
          });
        } else {
          $scope.allDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_ALL_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      //Once all the DIDs have been loaded, we look for the one entered by the user
      checkRecipent($scope.sendto);
    });

    //Loads a given asset
    function loadasset(symbol) {
      MetaverseService.GetAsset(symbol).then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.asset = response.data.assets[0];
          $scope.assetsIssued.forEach(function (a) {
            if (a.symbol == symbol) {
              $scope.asset.quantity = a.quantity;
              $scope.asset.available = a.available;
              $scope.availableBalance = a.available;
            }
          });
        } else {
          //Asset could not be loaded
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
        }
      });
    }

    function checkInputs(quantityLocked, model2) {
      if ($scope.frozen_option && $scope.model == 2) {
        var inputOK = true;
        $scope.unlockNumber = parseInt($scope.unlockNumberString);
        $scope.model2ToSend = model2.slice(0, $scope.unlockNumber);
        var sumNumber = 0;
        var sumQuantity = 0;
        $scope.model2ToSend.forEach(function (period) {
          sumNumber += period.number;
          sumQuantity += period.quantity;
          period.quantityToSend = $filter('convertfortx')(period.quantity, $scope.asset.decimal_number);
          if (period.number == '' || period.quantity == '') {
            inputOK = false;
            $translate('MESSAGES.SECONDARY_ISSUE_MODEL2_MISSING_PERIOD_INPUT').then(function (data) {
              return FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
          }
        });
        $scope.periodLocked = sumNumber;
        $scope.quantityLocked = sumQuantity;
        if ($scope.quantityLocked > $scope.quantity) {
          inputOK = false;
          $translate('MESSAGES.SECONDARY_ISSUE_MODEL2_LOCKED_HIGHER_ISSUED').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        if (inputOK == true) {
          $scope.confirmation = true;
          delete $rootScope.flash;
        }
      } else {
        //Default model
        $scope.confirmation = true;
        delete $rootScope.flash;
      }
    }

    function sendasset(sendfrom, sendto, symbol, quantity, transactionFee, password) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        NProgress.start();
        //Update send from it is from an avatar
        if ($scope.allDidsAddresses[sendfrom]) {
          sendfrom = $scope.allDidsAddresses[sendfrom];
        }
        //Modify number to fit to number of decimals defined for asset
        //quantity *= Math.pow(10,$scope.asset.decimal_number);
        //quantity = Math.round(quantity);
        quantity = $filter('convertfortx')(quantity, $scope.asset.decimal_number);
        var quantityLockedToSend = $filter('convertfortx')($scope.quantityLocked, $scope.asset.decimal_number);
        var fee_value = $filter('convertfortx')(transactionFee, 8);
        $scope.model = $scope.frozen_option ? $scope.model : '-1';

        if ($scope.burnAddress) {
          var SendPromise = sendfrom ? MetaverseService.DidSendAssetFrom(sendfrom, MetaverseService.burnAddress, symbol, quantity, $scope.model, $scope.unlockNumber, quantityLockedToSend, $scope.periodLocked, $scope.model2ToSend, $scope.interestRate, fee_value, password) : MetaverseService.DidSendAsset(MetaverseService.burnAddress, symbol, quantity, $scope.model, $scope.unlockNumber, quantityLockedToSend, $scope.periodLocked, $scope.model2ToSend, $scope.interestRate, fee_value, password);
        } else {
          var SendPromise = sendfrom ? MetaverseService.DidSendAssetFrom(sendfrom, sendto, symbol, quantity, $scope.model, $scope.unlockNumber, quantityLockedToSend, $scope.periodLocked, $scope.model2ToSend, $scope.interestRate, fee_value, password) : MetaverseService.DidSendAsset(sendto, symbol, quantity, $scope.model, $scope.unlockNumber, quantityLockedToSend, $scope.periodLocked, $scope.model2ToSend, $scope.interestRate, fee_value, password);
        }

        SendPromise.then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success) {
            $translate('MESSAGES.ASSETS_TRANSFER_SUCCESS').then(function (data) {
              FlashService.Success(data, true, response.data.result.transaction.hash);
              //Redirect user to the assets page
              $location.path('/asset/myassets');
            });
          } else {
            //Show asset load error
            $scope.confirmation = false;
            $translate('MESSAGES.ASSETS_TRANSFER_ERROR').then(function (data) {
              return FlashService.Error(data + " " + response.message.message);
            });
            $window.scrollTo(0, 0);
          }
          $scope.password = '';
        });
      }
    }

    function availBalance(address) {
      if (address == '') {
        $scope.availableBalance = $scope.asset.available;
      } else {
        $scope.assetAddresses.forEach(function (a) {
          if (a.address == address) {
            $scope.availableBalance = a.quantity - a.locked_quantity;
          }
        });
      }
      $scope.error.quantity_not_enough_balance = $scope.quantity != undefined && $scope.quantity != '' && typeof $scope.asset.decimal_number != 'undefined' ? parseInt($filter('convertfortx')($scope.quantity, $scope.asset.decimal_number)) > parseInt($scope.availableBalance) : false;
    }

    function updateUnlockNumber(unlockNumber) {
      if (unlockNumber == undefined || unlockNumber == '') {
        $scope.model2Displayed = 0;
      } else {
        $scope.model2Displayed = unlockNumber;
      }
    }

    function checkRecipent(input) {
      if (typeof input == 'undefined' || input == '') {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = false;
        $scope.burnAddress = false;
      } else if (($rootScope.network == 'testnet' && input.charAt(0) == 't' || $rootScope.network == 'mainnet' && input.charAt(0) == 'M' || input.charAt(0) == '3') && input.length == 34 && input.match(/^[0-9A-Za-z]+$/)) {
        $scope.correctEtpAddress = true;
        $scope.correctAvatar = false;
        $scope.burnAddress = false;
      } else if (input.charAt(0) == '3' && input.length == 34 && input.match(/^[0-9A-Za-z]+$/)) {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = false;
        $scope.burnAddress = false;
      } else if ($scope.allDidsSymbols.indexOf(input) > -1) {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = true;
        $scope.burnAddress = false;
      } else if (input == MetaverseService.burnAddress || $filter('lowercase')(input) == MetaverseService.burnAddress_short) {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = false;
        $scope.burnAddress = true;
      } else {
        $scope.correctEtpAddress = false;
        $scope.correctAvatar = false;
        $scope.burnAddress = false;
      }
      checkready();
    }

    function sendAll() {
      //$scope.quantity = $scope.availableBalance/$scope.asset.decimal_number;
      //$scope.quantity = parseFloat($scope.availableBalance)/Math.pow(10,$scope.asset.decimal_number);
      $scope.quantity = parseFloat($filter('converttodisplay')($scope.availableBalance, $scope.asset.decimal_number));
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      if (!$scope.correctEtpAddress && !$scope.correctAvatar && !$scope.burnAddress) {
        $scope.submittable = false;
        return;
      }
      if ($scope.frozen_option) {
        if ($scope.model == 0 && $scope.errorDeposit.periodLocked_empty) {
          $scope.submittable = false;
          return;
        } else if (($scope.model == 1 || $scope.model == 3) && ($scope.errorDeposit.unlock_number_empty || $scope.errorDeposit.quantityLocked_empty || $scope.errorDeposit.quantityLocked_lower_quantity || $scope.errorDeposit.periodLocked_empty)) {
          $scope.submittable = false;
          return;
        } else if ($scope.model == 2 && $scope.errorDeposit.unlockNumber_empty) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the send from address is valid
    $scope.$watch('sendfrom', function (newVal, oldVal) {
      $scope.error.sendfrom = newVal == undefined;
      checkready();
    });

    //Check if the new recipient is valid
    $scope.$watch('sendto', function (newVal, oldVal) {
      $scope.error.sendto_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the amount is valid
    $scope.$watch('quantity', function (newVal, oldVal) {
      $scope.error.quantity_empty = newVal == undefined;
      $scope.error.quantity_not_enough_balance = newVal != undefined && newVal != '' && typeof $scope.asset.decimal_number != 'undefined' ? parseInt($filter('convertfortx')(newVal, $scope.asset.decimal_number)) > parseInt($scope.availableBalance) : false;
      $scope.errorDeposit.quantityLocked_lower_quantity = newVal != undefined ? $scope.quantityLocked > newVal : false;
      checkready();
    });

    //Check if the number of periods is valid
    $scope.$watch('unlockNumber', function (newVal, oldVal) {
      $scope.errorDeposit.unlock_number_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the total locked quantity is valid
    $scope.$watch('quantityLocked', function (newVal, oldVal) {
      $scope.errorDeposit.quantityLocked_empty = newVal == undefined || newVal == '';
      $scope.errorDeposit.quantityLocked_lower_quantity = newVal != undefined ? newVal > $scope.quantity : false;
      checkready();
    });

    //Check if the total locked period is valid
    $scope.$watch('periodLocked', function (newVal, oldVal) {
      $scope.errorDeposit.periodLocked_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });

    init();
  }

  function ShowAllAssetsController(MetaverseService, $rootScope, $scope, $location, FlashService, $translate, $stateParams, $window) {

    $window.scrollTo(0, 0);
    $scope.symbol = $stateParams.symbol;
    $scope.assets = [];
    $scope.assetsOriginal = [];
    $scope.assetsSecondaryIssue = [];
    $scope.icons = MetaverseService.hasIcon;

    //Load assets
    NProgress.start();
    MetaverseService.ListAllAssets().then(function (response) {
      NProgress.done();
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.assets = [];
        $scope.assets = response.data.assets;
        //All the details are hidden at the loading
        if ($scope.assets != '') {
          $scope.assets.forEach(function (asset) {
            asset.details = false;
            asset.icon = $scope.icons.indexOf(asset.symbol) > -1 ? asset.symbol : 'default';
            if (asset.is_secondaryissue == 'false') {
              asset.maximum_supply = parseInt(asset.maximum_supply);
              $scope.assetsOriginal.push(asset);
            } else {
              if (typeof $scope.assetsSecondaryIssue[asset.symbol] == 'undefined') {
                $scope.assetsSecondaryIssue[asset.symbol] = parseInt(asset.maximum_supply);
              } else {
                $scope.assetsSecondaryIssue[asset.symbol] += parseInt(asset.maximum_supply);
              }
            }
          });
        } //else, there is no asset on the blockchain
      } else {
        $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
          //Show asset load error
          FlashService.Error(data);
        });
      }
    });
  }

  function ShowAssetsController(MetaverseService, $rootScope, $scope, localStorageService, FlashService, $translate, $stateParams, $location, $window, ngDialog, $filter) {

    $window.scrollTo(0, 0);
    $scope.symbol = $stateParams.symbol;
    $scope.assets = [];
    $scope.issue = issue;
    $scope.deleteAsset = deleteAsset;

    //$scope.listAssetBalances = listAssetBalances;
    $scope.buttonCopyToClipboard = new Clipboard('.btn');
    $scope.icons = MetaverseService.hasIcon;
    $scope.assetsLoaded = false;
    $scope.assets = [];

    //Load assets
    NProgress.start();
    MetaverseService.ListAssets().then(function (response) {
      if (response.data.assets != "") {
        //if the user has some assets
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.assets = response.data.assets;
          $scope.assets.forEach(function (asset) {
            asset.icon = $scope.icons.indexOf(asset.symbol) > -1 ? asset.symbol : 'default';
          });
          //If asset is defined -> load it
          if ($scope.symbol != undefined && $scope.symbol != "") {
            NProgress.start();
            loadasset($scope.symbol);
          }
        } else {
          //Show asset load error
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
        }
      } else {
        if ($scope.symbol != undefined && $scope.symbol != "") {
          NProgress.start();
          loadasset($scope.symbol);
        }
      }
      NProgress.done();
      $scope.assetsLoaded = true;
    });

    function issue(symbol) {
      NProgress.start();
      MetaverseService.Issue(symbol).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $translate('MESSAGES.ASSETS_ISSUE_SUCCESS').then(function (data) {
            return FlashService.Success(data, false, response.data.result.transaction.hash);
          });
          $window.scrollTo(0, 0);
        } else {
          $translate('MESSAGES.ASSETS_ISSUE_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        NProgress.done();
      });
    }

    //Delete a not issued Asset
    function deleteAsset(symbol) {
      MetaverseService.Delete(symbol).then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          $translate('MESSAGES.ASSETS_DELETE_SUCCESS').then(function (data) {
            return FlashService.Success(data, true);
          });
          $window.scrollTo(0, 0);
          $location.path('/home');
        } else {
          //Asset could not be delete
          $translate('MESSAGES.ASSETS_DELETE_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
    }

    //Close the pop-up after asset creation
    $scope.closeAll = function () {
      ngDialog.closeAll();
    };
  }

  function AssetDetailController(MetaverseService, $rootScope, $scope, localStorageService, FlashService, $translate, $stateParams, $location, $window, ngDialog, $filter) {

    $scope.symbol = $stateParams.symbol;
    $scope.asset = [];
    $scope.assets = [];
    $scope.enableEditAddressName = enableEditAddressName;
    $scope.endEditAddressName = endEditAddressName;
    $scope.cancelEditAddressName = cancelEditAddressName;

    $scope.showqr = showqr;
    $scope.buttonCopyToClipboard = new Clipboard('.btn');
    $scope.assetsLoaded = false;
    $scope.assetOriginal = 0;
    $scope.assetSecondaryIssue = 0;
    $scope.assetAddresses = [];
    $scope.getAssetBalance = [];
    $scope.myDidsAddresses = [];

    //Shows a modal of the address incl. a qr code
    function showqr(address) {
      $('#showqrmodal').modal();
      $("#modal_address").html(address);
      $('#modal_qr').html('');
      var qrcode = new QRCode(document.getElementById("modal_qr"), {
        text: address,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      $('#showqrmodal').modal('show');
    }

    //Loads a given asset, used in the page asset/details
    MetaverseService.GetAsset($scope.symbol).then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (response.data.assets != "") {
          //if the user has some assets
          $scope.assets = response.data.assets;
          $scope.asset = response.data.assets[0];
          $scope.assets.forEach(function (asset) {
            if (asset.is_secondaryissue == 'false') {
              $scope.assetOriginal = parseInt(asset.maximum_supply);
            } else {
              $scope.assetSecondaryIssue += parseInt(asset.maximum_supply);
            }
          });
        } else {
          //The user has no Assets
        }
      } else {
        //Asset could not be loaded
        $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      NProgress.done();
    });

    MetaverseService.GetAccountAsset($scope.symbol).then(function (response) {
      if (typeof response.success !== 'undefined' && response.success && response.data.result.assets != null) {
        //If the address doesn't contain any asset, we don't need it
        $scope.assetAddresses = response.data.result.assets;
        $scope.assetAddresses.forEach(function (address) {
          var name = "New address";
          if (localStorageService.get(address.address) != undefined) {
            name = localStorageService.get(address.address);
          }
          address.name = name;
          address.edit = false;
          $scope.getAssetBalance[address.address] = address.quantity;
        });
      }
    });

    MetaverseService.ListMyDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.myDids = response.data.result.dids;
        $scope.balancesLoaded = true;
        $scope.myDidsSymbols = [];
        if (typeof $scope.myDids != 'undefined' && $scope.myDids != null) {
          $scope.myDids.forEach(function (did) {
            //$scope.myDidsSymbols.push(did.symbol);
            $scope.myDidsAddresses[did.address] = did.symbol;
          });
        } else {
          $scope.myDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    //Load the addresses and their balances
    NProgress.start();
    MetaverseService.ListBalances().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.addressIndex = [];
        response.data.balances.forEach(function (e, i) {
          $scope.addressIndex[e.balance.address] = response.data.balances.length - i;
        });
      }
      NProgress.done();
    });

    //Enable the edition of the Address Name
    function enableEditAddressName(address) {
      $scope.assetAddresses.forEach(function (e) {
        if (e.address == address) {
          e.newName = e.name;
          e.edit = true;
        }
      });
    }

    //Save the edited name in the local storage
    function endEditAddressName(address, newName) {
      localStorageService.set(address, newName);
      $scope.assetAddresses.forEach(function (e) {
        if (e.address == address) {
          e.name = newName;
          e.edit = false;
        }
      });
    }

    //Cancel the edition
    function cancelEditAddressName(address) {
      $scope.assetAddresses.forEach(function (e) {
        if (e.address == address) {
          e.newName = e.name;
          e.edit = false;
        }
      });
    }
  }

  function AssetSecondaryIssueController(MetaverseService, $rootScope, $scope, $location, localStorageService, FlashService, $translate, $window, ngDialog, $filter) {

    $scope.symbol = $filter('uppercase')($location.path().split('/')[3]);
    $scope.listAddresses = [];
    $scope.listMultiSig = [];
    $scope.secondaryIssue = secondaryIssue;
    $scope.checkInputs = checkInputs;
    $scope.myAsset = [];
    $scope.myAssets = [];
    $scope.updateQuantity = updateQuantity;
    $scope.availBalance = availBalance;
    $scope.myDids = [];
    $scope.myDidsSymbols = [];
    $scope.myDidsAddresses = [];
    $scope.popupSecondaryIssue = popupSecondaryIssue;
    $scope.updateUnlockNumber = updateUnlockNumber;
    $scope.assetAddresses = [];
    $scope.getAssetBalance = [];
    $scope.checkready = checkready;
    $scope.updateSymbol = updateSymbol;
    $scope.getAsset = getAsset;
    $scope.getAccountAsset = getAccountAsset;
    $scope.avatarsLoaded = false;

    function init() {
      $scope.didAddress = '';
      $scope.confirmation = false;
      $scope.transactionFee = 0.0001;
      $scope.model = '';
      $scope.assetOriginal = 0;
      $scope.assetSecondaryIssue = 0;
      $scope.issueCertOwner = false;
      $scope.myCertsLoaded = false;
      $scope.availableBalance = 0;
      $scope.balancesLoaded = false;
      $scope.recipientAvatar = '';
      $scope.avatar = '';
      $scope.availableBalanceAsset = 0;
      $scope.model2Displayed = 1;
      $scope.unlockNumber = 1;
      $scope.unlockNumberString = '1';
      $scope.interestRate = '0';
      $scope.error = [];
      $scope.errorDeposit = [];
      $scope.model2ToSend = [];
      for (var i = 0, value = { "index": i, "number": "", "quantity": "" }, size = 100, array = new Array(100); i < size; i++, value = { "index": i, "number": "", "quantity": "" }) {
        array[i] = value;
      }$scope.model2 = array;
      getAsset($scope.symbol);
      getAccountAsset($scope.symbol);
    }

    function listAddresses() {
      NProgress.start();
      //Load users ETP balance
      //Load the addresses and their balances
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach(function (e) {
            $scope.addresses[e.balance.address] = {
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen,
              "type": "single"
            };
            $scope.listAddresses.push({
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address
            });
          });

          //After loading the balances, we load the multisig addresses
          MetaverseService.ListMultiSig().then(function (response) {
            if (typeof response.success !== 'undefined' && response.success) {
              if (response.data.multisig != "") {
                //if the user has some assets
                response.data.multisig.forEach(function (e) {
                  $scope.addresses[e.address].type = "multisig";
                });
              } else {
                //The account has no multi-signature address
              }
            } else {
                //Fail
              }
          });
        }
      });
      NProgress.done();
    }

    listAddresses();

    MetaverseService.ListMyDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.myDids = response.data.result.dids;
        //$scope.address = $scope.myDids[0].address;
        //availBalance($scope.address);
        $scope.balancesLoaded = true;
        $scope.myDidsSymbols = [];
        if (typeof $scope.myDids != 'undefined' && $scope.myDids != null) {
          $scope.myDids.forEach(function (did) {
            $scope.myDidsSymbols.push(did.symbol);
            $scope.myDidsAddresses[did.address] = did.symbol;
          });
        } else {
          $scope.myDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    function getAsset(symbol) {
      //Loads a given asset, used in the page asset/details
      MetaverseService.GetAsset(symbol).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          if (response.data.assets != "") {
            //if the user has some assets
            $scope.assets = response.data.assets;
            $scope.assetSecondaryIssue = 0;
            $scope.assets.forEach(function (asset) {
              if (asset.is_secondaryissue == 'false') {
                $scope.assetOriginal = parseInt(asset.maximum_supply);
              } else {
                if (typeof $scope.assetSecondaryIssue == 0) {
                  $scope.assetSecondaryIssue = parseInt(asset.maximum_supply);
                } else {
                  $scope.assetSecondaryIssue += parseInt(asset.maximum_supply);
                }
              }
            });
          } else {
            //The user as no Assets
          }
        } else {
          //Asset could not be loaded
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        NProgress.done();
        $scope.error.address_not_enough_asset = $scope.address != undefined && $scope.myAsset != undefined && $scope.myAsset.secondaryissue_threshold != 127 && $scope.myAsset.secondaryissue_threshold != 0 ? $scope.getAssetBalance[$scope.address] / ($scope.assetOriginal + $scope.assetSecondaryIssue) * 100 < $scope.myAsset.secondaryissue_threshold || $scope.getAssetBalance[$scope.address] == undefined : false;
        checkready();
      });
    }

    function getAccountAsset(symbol) {
      $scope.getAssetBalance = [];
      $scope.loadingAvatars = true;
      MetaverseService.GetAccountAsset(symbol).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success && response.data.result.assets != null) {
          //If the address doesn't contain any asset, we don't need it
          $scope.assetAddresses = response.data.result.assets;
          $scope.assetAddresses.forEach(function (address) {
            $scope.getAssetBalance[address.address] = address.quantity;
          });
          availBalance($scope.address);
          $scope.error.address_not_enough_asset = $scope.address != undefined && $scope.myAsset != undefined && $scope.myAsset.secondaryissue_threshold != 127 && $scope.myAsset.secondaryissue_threshold != 0 ? $scope.getAssetBalance[$scope.address] / ($scope.assetOriginal + $scope.assetSecondaryIssue) * 100 < $scope.myAsset.secondaryissue_threshold || $scope.getAssetBalance[$scope.address] == undefined : false;
          checkready();
        }
        $scope.avatarsLoaded = true;
      });
    }

    //Load assets
    NProgress.start();
    MetaverseService.ListAssets().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success && response.data.assets != "") {
        $scope.myAssetsBalances = response.data.assets;
        //If asset is defined -> load it
        if (typeof $scope.symbol != 'undefined' && $scope.symbol != "") {
          $scope.myAssetsBalances.forEach(function (asset) {
            if (asset.symbol == $scope.symbol) $scope.myAsset = asset;
          });
        }
      } else {
        //Show asset load error
        $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
      }
      NProgress.done();
      $scope.assetsLoaded = true;
    });

    MetaverseService.AccountAssetCert().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (response.data.result.assetcerts != null) {
          $scope.myCerts = response.data.result.assetcerts;
          $scope.myCerts.forEach(function (cert) {
            if (cert.symbol == $scope.symbol && cert.cert == 'issue') $scope.issueCertOwner = true;
          });
        } else {
          $scope.myCerts = [];
        }
        $scope.myCertsLoaded = true;
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_CERTS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    function updateSymbol(symbol) {
      $scope.avatarsLoaded = false;
      getAsset(symbol);
      getAccountAsset(symbol);
      $scope.myAssetsBalances.forEach(function (asset) {
        if (asset.symbol == symbol) $scope.myAsset = asset;
      });
      $scope.issueCertOwner = false;
      $scope.myCerts.forEach(function (cert) {
        if (cert.symbol == symbol && cert.cert == 'issue') $scope.issueCertOwner = true;
      });
      $scope.error.address_not_enough_etp = $scope.address != undefined && $scope.addresses != undefined && $scope.addresses[$scope.address] != undefined ? $scope.addresses[$scope.address].available < $scope.transactionFee : false;
      checkready();
    }

    function updateQuantity(quantity) {
      $scope.toTxConvertedQuantity = parseInt($filter('convertfortx')(quantity, $scope.myAsset.decimal_number));
    }

    function updateUnlockNumber(unlockNumber) {
      if (unlockNumber == undefined || unlockNumber == '') {
        $scope.model2Displayed = 0;
      } else {
        $scope.model2Displayed = unlockNumber;
      }
    }

    function checkInputs(address, quantityLocked, model2) {
      $scope.recipientAvatar = $scope.myDidsAddresses[address];
      if ($scope.model == 2) {
        var inputOK = true;
        $scope.unlockNumber = parseInt($scope.unlockNumberString);
        $scope.model2ToSend = model2.slice(0, $scope.unlockNumber);
        var sumNumber = 0;
        var sumQuantity = 0;
        $scope.model2ToSend.forEach(function (period) {
          sumNumber += period.number;
          sumQuantity += period.quantity;
          period.quantityToSend = $filter('convertfortx')(period.quantity, $scope.myAsset.decimal_number);
          if (period.number == '' || period.quantity == '') {
            inputOK = false;
            $translate('MESSAGES.SECONDARY_ISSUE_MODEL2_MISSING_PERIOD_INPUT').then(function (data) {
              return FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
          }
        });
        $scope.periodLocked = sumNumber;
        $scope.quantityLocked = sumQuantity;
        if ($scope.quantityLocked > $scope.quantity) {
          inputOK = false;
          $translate('MESSAGES.SECONDARY_ISSUE_MODEL2_LOCKED_HIGHER_ISSUED').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        if (inputOK == true) {
          $scope.confirmation = true;
          delete $rootScope.flash;
        }
      } else {
        //Default model
        $scope.confirmation = true;
        delete $rootScope.flash;
      }
    }

    function secondaryIssue() {
      NProgress.start();
      var fee_value = $filter('convertfortx')($scope.transactionFee, 8);
      var quantityLockedToSend = $filter('convertfortx')($scope.quantityLocked, $scope.myAsset.decimal_number);
      var SendPromise = MetaverseService.SecondaryIssue($scope.recipientAvatar, $scope.symbol, $scope.toTxConvertedQuantity, $scope.model, $scope.unlockNumber, quantityLockedToSend, $scope.periodLocked, $scope.model2ToSend, $scope.interestRate, fee_value, $scope.password);

      SendPromise.then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $translate('MESSAGES.SECONDARY_ISSUE_SUCCESS').then(function (data) {
            return FlashService.Success(data, true, response.data.result.transaction.hash);
          });
          $location.path('/avatar/myavatars/');
        } else {
          $translate('MESSAGES.ERROR_SECONDARY_ISSUE').then(function (data) {
            $scope.confirmation = false;
            if (response.message.message != undefined) {
              FlashService.Error(data + " : " + response.message.message);
            } else {
              FlashService.Error(data);
            }
            $window.scrollTo(0, 0);
          });
        }
        NProgress.done();
        $scope.password = '';
      });
    }

    function availBalance(address) {
      $scope.availableBalance = address != '' && $scope.addresses != undefined && $scope.addresses[address] != undefined ? $scope.addresses[address].available : 0;
      $scope.availableBalanceAsset = address != '' && $scope.getAssetBalance != undefined && $scope.getAssetBalance[address] != undefined ? $scope.getAssetBalance[address] : 0;
      checkready();
    }

    $scope.closeAll = function () {
      ngDialog.closeAll();
    };

    function popupSecondaryIssue(password) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        ngDialog.open({
          template: 'secondaryIssue',
          scope: $scope
        });
      }
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      if (!$scope.issueCertOwner) {
        $scope.submittable = false;
        return;
      }
      if ($scope.myAsset.secondaryissue_threshold == 0 || $scope.myAsset.secondaryissue_threshold != 127 && $scope.availableBalanceAsset / ($scope.assetOriginal + $scope.assetSecondaryIssue) * 100 < $scope.myAsset.secondaryissue_threshold) {
        $scope.submittable = false;
        return;
      }
      if (!$scope.availableBalance >= 10000) {
        $scope.submittable = false;
        return;
      }
      if (($scope.model == 1 || $scope.model == 3) && ($scope.errorDeposit.unlock_number_empty || $scope.errorDeposit.quantityLocked_empty || $scope.errorDeposit.quantityLocked_lower_quantity || $scope.errorDeposit.periodLocked_empty)) {
        $scope.submittable = false;
        return;
      } else if ($scope.model == 2 && $scope.errorDeposit.unlockNumber_empty) {
        $scope.submittable = false;
        return;
      }
      $scope.submittable = true;
    }

    //Check if symbol
    $scope.$watch('symbol', function (newVal, oldVal) {
      $scope.error.symbol_empty = newVal == undefined || newVal == '';
      $scope.error.symbol_no_secondary_issue = newVal != undefined && $scope.myAsset != undefined ? $scope.myAsset.secondaryissue_threshold == 0 : false;
      checkready();
    });

    //Check if the avatar is valid
    $scope.$watch('address', function (newVal, oldVal) {
      $scope.error.address_empty = newVal == undefined || newVal == '';
      $scope.error.address_not_enough_etp = newVal != undefined && $scope.addresses != undefined && $scope.addresses[newVal] != undefined ? $scope.addresses[newVal].available < $scope.transactionFee : false;
      $scope.error.address_not_enough_asset = newVal != undefined && $scope.myAsset != undefined && $scope.myAsset.secondaryissue_threshold != 127 && $scope.myAsset.secondaryissue_threshold != 0 ? $scope.getAssetBalance[newVal] / ($scope.assetOriginal + $scope.assetSecondaryIssue) * 100 < $scope.myAsset.secondaryissue_threshold || $scope.getAssetBalance[newVal] == undefined : false;
      checkready();
    });

    //Check if the quantity is valid
    $scope.$watch('quantity', function (newVal, oldVal) {
      $scope.error.quantity = newVal == undefined || newVal == '';
      $scope.errorDeposit.quantityLocked_lower_quantity = newVal != undefined ? $scope.quantityLocked > newVal : false;
      checkready();
    });

    //Check if the number of periods is valid
    $scope.$watch('unlockNumber', function (newVal, oldVal) {
      $scope.errorDeposit.unlock_number_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the total locked quantity is valid
    $scope.$watch('quantityLocked', function (newVal, oldVal) {
      $scope.errorDeposit.quantityLocked_empty = newVal == undefined || newVal == '';
      $scope.errorDeposit.quantityLocked_lower_quantity = newVal != undefined ? newVal > $scope.quantity : false;
      checkready();
    });

    //Check if the total locked period is valid
    $scope.$watch('periodLocked', function (newVal, oldVal) {
      $scope.errorDeposit.periodLocked_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
      checkready();
    });

    init();
  }

  function CreateAssetController(MetaverseService, $rootScope, $scope, FlashService, localStorageService, $location, $translate, $window, ngDialog, $filter) {

    $window.scrollTo(0, 0);
    //Function to create a new asset
    $scope.createasset = createasset;
    $scope.popupIssue = popupIssue;
    $scope.issue = issue;

    $scope.checkInputs = checkInputs;
    $scope.myDids = [];
    $scope.noDids = false;
    $scope.selectedDid = "";
    $scope.assets = [];
    $scope.listAllAssets = [];

    //Initialize form data
    function init() {
      $scope.symbol = '';
      $scope.description = '';
      $scope.max_supply = '';
      $scope.secondary_offering = 0;
      $scope.decimals = '';
      $scope.password = '';
      $scope.confirmation = false;
      $scope.secondaryissue_rate = 0;
      //This object contains all form errors
      $scope.error = [];
    }

    init();

    MetaverseService.ListMyDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (response.data.result.dids) {
          $scope.noDids = false;
          $scope.myDids = response.data.result.dids;
        } else {
          $scope.noDids = true;
          $scope.selectedDid = "nodid";
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    MetaverseService.ListAllAssets().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.assets = response.data.assets;
        //All the details are hidden at the loading
        if ($scope.assets != '') {
          $scope.assets.forEach(function (asset) {
            $scope.listAllAssets.push(asset.symbol);
          });
        } //else, there is no asset on the blockchain
      } else {
          //error while loading assets
        }
    });

    MetaverseService.ListBalances().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.addresses = [];
        response.data.balances.forEach(function (e) {
          $scope.addresses[e.balance.address] = {
            "balance": parseInt(e.balance.unspent),
            "available": parseInt(e.balance.available),
            "address": e.balance.address,
            "name": name,
            "frozen": e.balance.frozen
          };
        });
      }
    });

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the symbol is valid
    $scope.$watch('symbol', function (newVal, oldVal) {
      $scope.error.symbol_empty = newVal == undefined || newVal === '';
      $scope.error.symbol_too_long = newVal != undefined ? !(newVal.length < 65) : false;
      $scope.error.symbol_wrong_char = newVal != undefined && newVal != '' ? !newVal.match(/^[0-9A-Za-z.]+$/) : false;
      $scope.error.symbol_already_exist = newVal != undefined ? $scope.listAllAssets.indexOf($filter('uppercase')(newVal)) > -1 : false;
      checkready();
    });

    //Check if the avatar is valid
    $scope.$watch('selectedDid', function (newVal, oldVal) {
      $scope.error.avatar = newVal == undefined || newVal === '' || newVal == 'nodid';
      checkready();
    });

    //Check if the max_supply is valid
    $scope.$watch('max_supply', function (newVal, oldVal) {
      $scope.error.max_supply_empty = newVal == undefined || !(newVal == parseInt(newVal)) || newVal == 0;
      $scope.error.max_supply_decimals_too_high = newVal != undefined ? newVal * Math.pow(10, $scope.decimals) > 10000000000000000000 : false;
      checkready();
    });

    //Check if the decimals is valid
    $scope.$watch('decimals', function (newVal, oldVal) {
      $scope.error.decimals_empty = newVal == undefined || !(newVal >= 0 && newVal <= 8) || newVal === '';
      $scope.error.max_supply_decimals_too_high = newVal != undefined ? $scope.max_supply * Math.pow(10, newVal) > 10000000000000000000 : false;
      checkready();
    });

    //Check if the description is valid
    $scope.$watch('description', function (newVal, oldVal) {
      $scope.error.description_empty = newVal == undefined || !(newVal.length > 0);
      $scope.error.description_too_long = newVal != undefined ? !(newVal.length < 65) : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });

    function checkInputs() {
      $scope.symbol = $filter('uppercase')($scope.symbol);
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    //Create asset function
    function createasset() {
      if (localStorageService.get('credentials').password != $scope.password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        var quantity = $filter('convertfortx')($scope.max_supply, $scope.decimals);
        NProgress.start();
        //Let Metaverse create an local asset
        MetaverseService.CreateAsset($scope.symbol, $scope.selectedDid, quantity, $scope.secondary_offering, $scope.decimals, $scope.description, $scope.secondaryissue_rate).then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success) {
            //Show success message
            popupIssue($scope.symbol);
            $translate('MESSAGES.ASSET_CREATED_LOCAL_SUCCESS').then(function (data) {
              FlashService.Success(data, true);
              //Redirect user to the assets page
            });
            $window.scrollTo(0, 0);
          } else {
            $translate('MESSAGES.ASSETS_CREATE_ERROR').then(function (data) {
              return FlashService.Error(data + ' ' + response.message.message);
            });
            $window.scrollTo(0, 0);
          }
        });
        $scope.password = '';
      }
    }
    $scope.closeAll = function () {
      ngDialog.closeAll();
    };

    function popupIssue(symbol) {
      $scope.symbol = symbol;
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
    }

    function issue(symbol) {
      NProgress.start();
      MetaverseService.Issue(symbol).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $translate('MESSAGES.ASSETS_ISSUE_SUCCESS').then(function (data) {
            return FlashService.Success(data, false, response.data.result.transaction.hash);
          });

          $window.scrollTo(0, 0);
        } else {
          $translate('MESSAGES.ASSETS_ISSUE_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        NProgress.done();
      });
    }
  }

  function AssetsController(MetaverseHelperService, MetaverseService, $rootScope, $scope, $location, $translate, FlashService, $window) {

    $window.scrollTo(0, 0);
    $scope.assets = [];
    $scope.balance = {};
    $scope.transactions = [];
    $scope.transactionsFiltered = [];

    $scope.showDates = false;

    $scope.startDate = new Date(new Date() - 7 * 86400000); //By default, display 1 week
    $scope.endDate = new Date();
    $scope.startDateUpdated = new Date();
    $scope.endDateUpdated = new Date();

    $scope.assetType = 'ALL';

    $scope.loadTransactions = loadTransactions;
    $scope.loadMore = loadMore;
    $scope.stopLoad = false;
    $scope.page = 3; //By default, we load the 2 first pages
    $scope.icons = MetaverseService.hasIcon;
    $scope.filterTransactions = filterTransactions;

    function filterTransactions(asset) {
      $scope.assetType = asset;
      $scope.transactionsFiltered = [];
      if (asset == 'ALL') {
        $scope.transactionsFiltered = $scope.transactions;
        /*} else if  (asset == 'Avatars') {
          $scope.transactions.forEach(function(e) {
            if (e.direction=='did-issue' || e.direction=='did-transfer') {
              $scope.transactionsFiltered.push(e);
            }
          });
        } else if  (asset == 'Certs') {
          $scope.transactions.forEach(function(e) {
            if (e.direction=='cert') {
              $scope.transactionsFiltered.push(e);
            }
          });*/
      } else {
        $scope.transactions.forEach(function (e) {
          if (e.type == asset) {
            $scope.transactionsFiltered.push(e);
          }
        });
      }
    }

    //Load users ETP balance
    MetaverseHelperService.GetBalance(function (err, balance, message) {
      if (err) FlashService.Error(message);else {
        $scope.balance = balance;
      }
    });

    MetaverseService.ListAssets().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (typeof response.data.assets != 'undefined' && response.data.assets != "") {
          //if the user has some assets
          $scope.assets = response.data.assets;
          $scope.assets.forEach(function (asset) {
            asset.icon = $scope.icons.indexOf(asset.symbol) > -1 ? asset.symbol : 'default';
          });
        } else {
          //the user has no asset
          $scope.assets = "";
        }
      } else {
        $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    function loadTransactions(min, max) {
      var page = min;
      for (; page < max && !$scope.stopLoad; page++) {
        MetaverseHelperService.LoadTransactions(function (err, transactions) {
          if (err) {
            $translate('MESSAGES.TRANSACTIONS_LOAD_ERROR').then(function (data) {
              return FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
          } else {
            if (transactions.lastpage == true || transactions.lastpage == undefined) {
              //All the transactions have been loaded
              $scope.stopLoad = true;
            }
            transactions.forEach(function (e) {
              /*if($scope.averageBlockTime == 0){   //if it hasn't been calculated yet, we calculated the average block time
                //1486815046 is the timestamp of the genesis block
                //1497080262 is the timestamp of the genesis block on TestNet
                $scope.averageBlockTime = ((e.timestamp/1000)-1486815046)/e.height;
              }*/
              if (e.frozen == true) {
                e.recipents.forEach(function (recipent) {
                  var re = /\[ (\w+) ] numequalverify dup hash160 \[ (\w+) \] equalverify checksig/;
                  var nbrBlocksScript = recipent.script.replace(re, '$1');
                  //var address = e.script.replace(re, '$2');

                  var nbrBlocksScriptLenght = nbrBlocksScript.length;
                  var nbrBlocksScriptReorderer = "";

                  for (var i = 0; i < nbrBlocksScriptLenght; i = i + 2) {
                    nbrBlocksScriptReorderer += nbrBlocksScript.charAt(nbrBlocksScriptLenght - i - 2);
                    nbrBlocksScriptReorderer += nbrBlocksScript.charAt(nbrBlocksScriptLenght - i - 1);
                  }

                  var nbrBlocksDec = parseInt(nbrBlocksScriptReorderer, 16);
                  e.availableBlockNo = parseInt(e.height) + parseInt(nbrBlocksDec);

                  /*if((e.availableBlockNo - $rootScope.height) > 0){   //If the Frozen ETP are still locked
                    e.availableInBlock = e.availableBlockNo - $rootScope.height;
                    //e.availableInTime = e.availableInBlock * $scope.averageBlockTime;
                    //e.availableInTimeDays = Math.floor(e.availableInTime / 86400);
                    //e.availableInTimeHours = Math.floor(e.availableInTime / 3600) - (e.availableInTimeDays * 24);
                  } else {                //If the Frozen ETP are not unlocked
                    e.availableInBlock = 0;
                  }*/
                });
              }

              $scope.transactions.push(e);
            });
            //displayUpdatedDates();
            filterTransactions('ALL');
          }
          NProgress.done();
        }, 'asset', page);
      }
    }

    loadTransactions(1, 3);

    function loadMore() {
      if (!$scope.stopLoad) {
        $scope.page = $scope.page + 1;
        loadTransactions($scope.page - 1, $scope.page);
      }
    }
  }

  function ConsoleController(MetaverseService, $rootScope, FlashService, $translate, $scope, $window) {

    $window.scrollTo(0, 0);

    //var ws = new WebSocket('ws://localhost:8820/ws'); //For test
    var ws = new WebSocket('ws://' + MetaverseService.SERVER + '/ws'); //Live

    $("#inputField").focus();

    $scope.showConnected = false;
    $scope.index = 0;
    $scope.queryHistory = 0;

    ws.onmessage = function (ev) {
      $scope.showConnected = true;
      $scope.index++;
      NProgress.done();
      $scope.consolelog.push({
        query: $scope.querystring,
        answer: ev.data,
        index: $scope.index
      });
      $scope.queryHistory = $scope.consolelog.length;
      $scope.querystring = '';
      $scope.$apply();
      scrolldown();
    };

    $scope.querystring = '';
    $scope.consolelog = [];

    /*To put the results in a window that we can scrolldown, with ID = consolelog*/
    function scrolldown() {
      window.setTimeout(function () {
        var elem = document.getElementById('consolelog');
        elem.scrollTop = elem.scrollHeight;
      }, 100);
    }

    $scope.query = function () {
      if ($scope.querystring == "clear") {
        var connectionstatus = $scope.consolelog[0];
        $scope.consolelog = [];
        $scope.consolelog.push(connectionstatus);
        $scope.querystring = '';
        $scope.queryHistory = 0;
      } else {
        NProgress.start();
        ws.send($scope.querystring);
      }
    };

    $scope.arrowup = function () {
      if ($scope.queryHistory > 1) {
        $scope.queryHistory--;
        $scope.querystring = $scope.consolelog[$scope.queryHistory].query;
      }
    };

    $scope.arrowdown = function () {
      if ($scope.queryHistory < $scope.consolelog.length - 1) {
        $scope.queryHistory++;
        $scope.querystring = $scope.consolelog[$scope.queryHistory].query;
      } else if ($scope.queryHistory = $scope.consolelog.length - 1) {
        $scope.queryHistory++;
        $scope.querystring = '';
      }
    };
  }

  function HomeController(MetaverseService, $rootScope, $scope, localStorageService, $interval, $translate, $location, $filter, $http, FlashService) {

    var vm = this;
    vm.account = localStorageService.get('credentials').user;
    $scope.height = '';
    $scope.assets = [];
    $scope.language = localStorageService.get('language');
    $scope.getHeightFromExplorer = getHeightFromExplorer;
    $scope.heightFromExplorer = 0;
    $scope.loadingPercent = 0;
    $scope.subscribed = false;

    //var ws = new WebSocket('ws://localhost:8821/ws');
    var ws = new WebSocket('ws://' + MetaverseService.SERVER2 + '/ws'); //Live

    $scope.showConnected = false;
    $scope.index = 0;
    $scope.sound = true;

    $scope.version = "";
    $scope.popoverSynchShown = false;
    $scope.peers = "";

    MetaverseService.GetInfoV2().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.height = response.data.result.height;
        $rootScope.network = response.data.result.testnet ? 'testnet' : 'mainnet';
        $scope.version = response.data.result['wallet-version'];
        $scope.checkVersion();
        $scope.peers = response.data.result.peers;
      }
    }).then(function () {
      return getHeightFromExplorer();
    }).then(function () {
      return $scope.loadingPercent = Math.floor($scope.height / $scope.heightFromExplorer * 100);
    });

    $scope.ClickCloseFlashMessage = function () {
      FlashService.CloseFlashMessage();
    };

    $scope.checkVersion = function () {
      if ($scope.version.charAt(0) == '<') {//Dev
        //no check
      } else {
        //Live
        $http.get('https://explorer.mvs.org/api/fullnode/version').then(function (response) {
          var walletVersion = $scope.version.split(".");
          var supportVersion = response.data.support.split(".");
          var currentVersion = response.data.current.split(".");
          if ($scope.checkNeedUpdate(walletVersion, supportVersion)) {
            $translate('MESSAGES.NEW_VERSION_MAJOR_CHANGE').then(function (data) {
              return FlashService.Error(data, false, "", "mvs.org");
            });
          } else if ($scope.checkNeedUpdate(walletVersion, currentVersion)) {
            $translate('MESSAGES.NEW_VERSION_AVAILABLE').then(function (data) {
              return FlashService.Warning(data, false, "", "mvs.org");
            });
          }
        }).catch(function (error) {
          return console.log("Cannot get Version from explorer");
        });
      }
    };

    $scope.checkNeedUpdate = function (walletVersion, comparedVersion) {
      if (walletVersion[0] < comparedVersion[0] || walletVersion[0] == comparedVersion[0] && walletVersion[1] < comparedVersion[1] || walletVersion[0] == comparedVersion[0] && walletVersion[1] == comparedVersion[1] && walletVersion[2] < comparedVersion[2]) {
        return true;
      }
      return false;
    };

    ws.onmessage = function (ev) {
      var response = JSON.parse(ev.data);
      if (!$scope.subscribed) {
        //Websocket connected, need to subscribe to all addresses
        $scope.subscribed = true;
        $scope.subscribeToAllMyAddresses();
      } else if (response.channel == 'tx' && response.event == 'publish' && response.result.height != '0') {
        //New transaction detected
        if (parseInt($scope.heightFromExplorer) - parseInt($scope.height) < 100) {
          $translate('MESSAGES.TX_PROCESSED').then(function (data) {
            return FlashService.Info(data, false, response.result.hash);
          });
          if ($scope.sound) {
            $scope.playNewTx();
          }
        }
      }
    };

    $scope.playNewTx = function () {
      var audio = new Audio('audio/message.mp3');
      audio.play();
    };

    $scope.onOffSound = function () {
      $scope.sound = !$scope.sound;
    };

    $scope.subscribeToAllMyAddresses = function () {
      NProgress.start();
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          response.data.balances.forEach(function (e) {
            ws.send(JSON.stringify({
              "event": "subscribe",
              "channel": "tx",
              "address": e.balance.address
            }));
          });
        }
        NProgress.done();
      });
    };

    function getHeightFromExplorer() {
      var url = $rootScope.network == 'testnet' ? 'https://explorer-testnet.mvs.org/api/height' : 'https://explorer.mvs.org/api/height';
      $http.get(url).then(function (response) {
        if (!$scope.popoverSynchShown) {
          $(function () {
            $('.popover-show').popover('show');
          });
          $scope.popoverSynchShown = true;
        }
        $scope.heightFromExplorer = response.data.result;
        $scope.loadingPercent = Math.floor($scope.height / $scope.heightFromExplorer * 100);
      }).catch(function (error) {
        return console.log("Cannot get Height from explorer");
      });
    }

    $scope.menu = {
      account: {
        show: 0
      },
      assets: {
        show: 0
      }
    };

    //Change Language
    vm.changeLang = function (key) {
      return $translate.use(key).then(function (key) {
        return localStorageService.set('language', key);
      }).catch(function (error) {
        return console.log("Cannot change language.");
      });
    };

    function updateHeight() {
      MetaverseService.GetInfoV2().then(function (response) {
        if (typeof response != 'undefined' && response.success) {
          $scope.height = response.data.result.height;
          $rootScope.network = response.data.result.testnet ? 'testnet' : 'mainnet';
          $scope.peers = response.data.result.peers;
        }
      }).then(function () {
        return getHeightFromExplorer();
      }).then(function () {
        return $scope.loadingPercent = Math.floor($scope.height / $scope.heightFromExplorer * 100);
      });
    }

    updateHeight();
    $interval(function () {
      return updateHeight();
    }, 10000);

    $scope.show_account_menu = function () {
      $scope.menu.account.show = 1 - $scope.menu.account.show;
      $scope.menu.assets.show = 0;
    };

    $scope.show_assets_menu = function () {
      $scope.menu.assets.show = 1 - $scope.menu.assets.show;
      $scope.menu.account.show = 0;
    };

    function defineTypeSearch(search) {
      if (search === '' || search == undefined) {
        //empty research
        $location.path('/explorer/search/');
      } else if ($filter('uppercase')(search) === 'ETP') {
        $location.path('/addresses/myaddresses');
      } else if (search.length === 64) {
        $location.path('/explorer/tx/' + search);
      } else if (search.length === 34 || search == MetaverseService.burnAddress || search == $filter('lowercase')(MetaverseService.burnAddress_short)) {
        $location.path('/explorer/adr/' + search);
      } else if (!isNaN(search)) {
        $location.path('/explorer/blk/' + search);
      } else {
        //The research's format doesn't match any kind, we check if it is in the list of assets
        loadListAssets(search);
      }
    };

    vm.search = function (key) {
      return defineTypeSearch(key);
    };

    //Used to get the full list of Assets
    function loadListAssets(search) {
      var path = '/explorer/noresult/' + search;
      NProgress.start();
      MetaverseService.ListAllAssets().then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          response.data.assets.forEach(function (e) {
            //If we found the research in the list of Assets, et redirect to its page
            if ($filter('uppercase')(search) == e.symbol) {
              path = '/asset/details/' + search;
            }
          });
        } else {
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        $location.path(path);
      });
      NProgress.done();
    }
  }

  function ProfileController(MetaverseHelperService, MetaverseService, $scope, $location, $translate, $window, localStorageService, FlashService) {

    $scope.selectedDid = $location.path().split('/')[3];
    $scope.myDids = [];
    $scope.myCerts = [];
    $scope.loadingDids = true;

    $scope.onChain = true;
    $scope.myCertsLoaded = false;
    $scope.loadingAddressHistory = true;

    $scope.listDidsAddresses = listDidsAddresses;

    $scope.addressesHistory = [];
    $scope.changeDid = changeDid;

    MetaverseService.ListMyDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.loadingDids = false;
        if (response.data.result.dids) {
          $scope.myDids = response.data.result.dids;
          if (typeof $scope.selectedDid == 'indefined' || $scope.selectedDid == '') {
            $scope.selectedDid = $scope.myDids[0].symbol;
          }
          listDidsAddresses($scope.selectedDid);
        } else {
          $scope.myDids = [];
          $scope.selectedDid = "";
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    function changeDid(symbol) {
      listDidsAddresses(symbol);
    }

    function listDidsAddresses(symbol) {
      $scope.loadingAddressHistory = true;
      MetaverseService.GetDid(symbol).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addressesHistory = response.data.result.addresses;
        } else {
          $translate('MESSAGES.LISTDIDSADDRESSE_LOAD_ERROR').then(function (data) {
            if (response.message.message != undefined) {
              FlashService.Error(data + " " + response.message.message);
            } else {
              FlashService.Error(data);
            }
          });
          $window.scrollTo(0, 0);
        }
        $scope.loadingAddressHistory = false;
      });
    }

    MetaverseService.AccountAssetCert().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (response.data.result.assetcerts != null) {
          $scope.myCerts = response.data.result.assetcerts;
        } else {
          $scope.myCerts = [];
        }
        $scope.myCertsLoaded = true;
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_CERTS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });
  }

  function AllProfilesController(MetaverseHelperService, MetaverseService, localStorageService, $scope, $translate, $window, FlashService, ngDialog, $location) {

    $scope.allDids = [];
    $scope.loaded = false;

    MetaverseService.ListAllDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allDids = response.data.result.dids;
      } else {
        $translate('MESSAGES.CANT_LOAD_ALL_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      $scope.loaded = true;
    });
  }

  function CreateProfileController(MetaverseHelperService, MetaverseService, localStorageService, $scope, $translate, $window, FlashService, ngDialog, $location, $rootScope, $filter) {

    $scope.listAddresses = [];
    $scope.listMultiSig = [];
    $scope.createProfile = createProfile;
    $scope.popupIssueDid = popupIssueDid;
    $scope.error = [];
    $scope.didAddress = '';
    $scope.confirmation = false;
    $scope.checkInputs = checkInputs;
    $scope.allDids = [];
    $scope.allDidsSymbols = [];
    $scope.allDidsAddresses = [];
    $scope.didAddress = '';
    $scope.addresses = [];
    $scope.resultMultisigTx = '';
    $scope.resultMultisigTxSaved = false;

    function listAddresses() {
      NProgress.start();
      //Load users ETP balance
      //Load the addresses and their balances
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach(function (e) {
            var name = "New address";
            if (localStorageService.get(e.balance.address) != undefined) {
              name = localStorageService.get(e.balance.address);
            }
            $scope.addresses[e.balance.address] = {
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen,
              "type": "single"
            };
            $scope.listAddresses.push({
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address
            });
          });
        }
      });
      NProgress.done();
    }

    listAddresses();

    MetaverseService.ListAllDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allDids = response.data.result.dids;
        if (typeof $scope.allDids != 'undefined' && $scope.allDids != null) {
          $scope.allDids.forEach(function (did) {
            $scope.allDidsSymbols.push(did.symbol);
            $scope.allDidsAddresses.push(did.address);
          });
        } else {
          $scope.allDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_ALL_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    function checkInputs(password) {
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    function createProfile(didAddress, didSymbol, password) {
      NProgress.start();
      MetaverseService.RegisterDid(didAddress, didSymbol, password).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          if (response.data.result.transaction) {
            $translate('MESSAGES.DID_CREATED').then(function (data) {
              return FlashService.Success(data, true, response.data.result.transaction.hash);
            });
            $location.path('/avatar/myavatars/');
          } else {
            $translate('MESSAGES.MULTISIGNATURE_SUCCESS').then(function (data) {
              return FlashService.Success(data);
            });
            $scope.resultMultisigTx = response.data.result;
          }
        } else {
          $translate('MESSAGES.ERROR_DID_CREATION').then(function (data) {
            if (response.message.message != undefined) {
              FlashService.Error(data + " : " + response.message.message);
            } else {
              FlashService.Error(data);
            }
          });
        }
        NProgress.done();
        $scope.password = '';
      });
    }

    $scope.closeAll = function () {
      ngDialog.closeAll();
    };

    function popupIssueDid(password) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        ngDialog.open({
          template: 'issueDid',
          scope: $scope
        });
      }
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the avatar name is valid
    $scope.$watch('didSymbol', function (newVal, oldVal) {
      $scope.error.symbol_empty = newVal == undefined;
      $scope.error.symbol_wrong_char = newVal != undefined ? !newVal.match(/^[0-9A-Za-z.@_-]+$/) : false;
      $scope.error.symbol_already_exist = newVal != undefined ? $scope.allDidsSymbols.indexOf(newVal) > -1 : false;
      checkready();
    });

    //Check if the address is valid
    $scope.$watch('didAddress', function (newVal, oldVal) {
      $scope.error.didAddress_empty = newVal == undefined || newVal == '';
      $scope.error.didAddress_already_used = newVal != undefined ? $scope.allDidsAddresses.indexOf(newVal) > -1 : false;
      $scope.error.didAddress_not_enough_etp = newVal != undefined && $scope.addresses[newVal] != undefined ? $scope.addresses[newVal].available < 1 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });
  }

  function ModifyAddressController(MetaverseHelperService, MetaverseService, localStorageService, $scope, $translate, $window, FlashService, ngDialog, $location, $rootScope, $filter) {

    $scope.listAddresses = [];
    $scope.listMultiSig = [];
    $scope.modifyAddress = modifyAddress;
    $scope.error = [];
    $scope.confirmation = false;
    $scope.checkInputs = checkInputs;
    $scope.selectedDid = $location.path().split('/')[3];
    $scope.myDidsAddresses = [];
    $scope.symbolAddress = [];
    $scope.selectedDidAddress = '';
    $scope.changeDid = changeDid;
    $scope.transactionFee = 0.0001;
    $scope.resultMultisigTx = '';
    $scope.resultMultisigTxSaved = false;

    function listAddresses() {
      NProgress.start();
      //Load users ETP balance
      //Load the addresses and their balances
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach(function (e) {
            var name = "New address";
            if (localStorageService.get(e.balance.address) != undefined) {
              name = localStorageService.get(e.balance.address);
            }
            $scope.addresses[e.balance.address] = {
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen,
              "type": "single"
            };
            $scope.listAddresses.push({
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address
            });
          });

          //After loading the balances, we load the multisig addresses
          MetaverseService.ListMultiSig().then(function (response) {
            if (typeof response.success !== 'undefined' && response.success) {
              if (response.data.multisig != "") {
                //if the user has some assets
                response.data.multisig.forEach(function (e) {
                  $scope.addresses[e.address].type = "multisig";
                });
              } else {
                //The account has no multi-signature address
              }
            } else {
                //Fail
              }
          });
        }
      });
      NProgress.done();
    }

    listAddresses();

    MetaverseService.ListMyDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (response.data.result.dids) {
          $scope.myDids = response.data.result.dids;
          if (typeof $scope.myDids != 'undefined' && $scope.myDids != null) {
            $scope.myDids.forEach(function (did) {
              $scope.myDidsAddresses.push(did.address);
              $scope.symbolAddress[did.symbol] = did.address;
              if (did.symbol == $scope.selectedDid) $scope.selectedDidAddress = did.address;
            });
          } else {}
        } else {
          $scope.noDids = true;
          $scope.selectedDid = "";
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    function changeDid(symbol) {
      $scope.selectedDidAddress = $scope.symbolAddress[symbol];
    }

    function checkInputs(password) {
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    function modifyAddress(selectedDid, toAddress, transactionFee, password) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        NProgress.start();
        var fee_value = $filter('convertfortx')(transactionFee, 8);
        MetaverseService.DidChangeAddress(selectedDid, toAddress, fee_value, password).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            if (response.data.result.transaction) {
              $translate('MESSAGES.DID_ADDRESS_UPDATED').then(function (data) {
                return FlashService.Success(data, true, response.data.result.transaction.hash);
              });
              $location.path('/avatar/myavatars/');
            } else {
              $translate('MESSAGES.MULTISIGNATURE_SUCCESS').then(function (data) {
                return FlashService.Success(data);
              });
              $scope.resultMultisigTx = response.data.result;
            }
          } else {
            $translate('MESSAGES.ERROR_DID_MODIFY_ADDRESS').then(function (data) {
              if (response.message.message != undefined) {
                FlashService.Error(data + " : " + response.message.message);
              } else {
                FlashService.Error(data);
              }
            });
          }
          NProgress.done();
          $scope.password = '';
        });
      }
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the avatar name is valid
    $scope.$watch('selectedDid', function (newVal, oldVal) {
      $scope.error.selectedDid = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the new address is valid
    $scope.$watch('toAddress', function (newVal, oldVal) {
      $scope.error.toAddress_empty = newVal == undefined || newVal == '';
      $scope.error.toAddress_already_used = newVal != undefined ? $scope.myDidsAddresses.indexOf(newVal) > -1 : false;
      $scope.error.toAddress_not_enough_balance = newVal != undefined ? $scope.addresses[newVal].available < 1 : false;
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });
  }

  function TransferCertController(MetaverseHelperService, MetaverseService, $scope, $filter, $rootScope, $location, $translate, $window, localStorageService, FlashService) {

    $scope.listAddresses = [];
    $scope.listMultiSig = [];
    $scope.myDids = [];
    $scope.myCerts = [];
    $scope.certs = [];
    $scope.noCerts = false;
    $scope.error = [];
    $scope.changeSymbol = changeSymbol;
    $scope.transactionFee = 0.0001;
    $scope.allDidsAddresses = [];
    $scope.listMyCerts = listMyCerts;
    $scope.checkInputs = checkInputs;
    $scope.transferCert = transferCert;
    $scope.myCertsLoaded = false;
    $scope.allDidsSymbols = [];

    $scope.onChain = true;
    $scope.selectedCert = $location.path().split('/')[3];
    changeSymbol($scope.selectedCert);

    function listMultiSign() {
      NProgress.start();
      //Load users ETP balance
      //Load the addresses and their balances
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach(function (e) {
            var name = "New address";
            if (localStorageService.get(e.balance.address) != undefined) {
              name = localStorageService.get(e.balance.address);
            }
            $scope.addresses[e.balance.address] = {
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen,
              "type": "single"
            };
            $scope.listAddresses.push({
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address
            });
          });

          //After loading the balances, we load the multisig addresses
          MetaverseService.ListMultiSig().then(function (response) {
            if (typeof response.success !== 'undefined' && response.success) {
              if (response.data.multisig != "") {
                //if the user has some assets
                response.data.multisig.forEach(function (e) {
                  $scope.addresses[e.address].type = "multisig";
                  var name = "New address";
                  if (localStorageService.get(e.address) != undefined) {
                    name = localStorageService.get(e.address);
                  }
                  var balance = '';
                  $scope.listMultiSig.push({
                    "index": e.index,
                    "m": e.m,
                    "n": e.n,
                    "selfpublickey": e["self-publickey"],
                    "description": e.description,
                    "address": e.address,
                    "name": name,
                    "balance": $scope.addresses[e.address].balance,
                    "available": $scope.addresses[e.address].available,
                    "publicKeys": e["public-keys"]
                  });
                });
              } else {
                //The account has no multi-signature address
              }
            } else {
                //Fail
              }
          });
        }
      });
      NProgress.done();
    }

    listMultiSign();

    function changeSymbol(cert) {
      $scope.certSymbol = cert.split(":")[0];
      $scope.certType = cert.split(":")[1];
    }

    function listMyCerts() {
      MetaverseService.AccountAssetCert().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          if (response.data.result.assetcerts != null && response.data.result.assetcerts != '') {
            $scope.myCerts = response.data.result.assetcerts;
            $scope.myCerts.forEach(function (e) {
              $scope.certs[e.symbol] = e;
            });
          } else {
            $scope.myCerts = [];
            $scope.noCerts = true;
          }
          $scope.myCertsLoaded = true;
        } else {
          $translate('MESSAGES.CANT_LOAD_MY_CERTS').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
    }

    MetaverseService.ListAllDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allDids = response.data.result.dids;
        $scope.allDidsSymbols = [];
        if (typeof $scope.allDids != 'undefined' && $scope.allDids != null) {
          $scope.allDids.forEach(function (did) {
            $scope.allDidsSymbols.push(did.symbol);
            //$scope.allDidsAddresses[did.address] = did.symbol;
          });
        } else {
          $scope.allDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_ALL_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      listMyCerts();
    });

    function checkInputs() {
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    function transferCert(certSymbol, certType, toDID, transactionFee, password) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        var fee_value = $filter('convertfortx')(transactionFee, 8);
        NProgress.start();
        MetaverseService.TransferCert(certSymbol, certType, toDID, fee_value, password).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success && response.data.result.transaction) {
            $translate('MESSAGES.CERT_TRANSFERED').then(function (data) {
              return FlashService.Success(data, true, response.data.result.transaction.hash);
            });
            $location.path('/avatar/myavatars/');
          } else {
            $translate('MESSAGES.ERROR_CERT_TRANSFERED').then(function (data) {
              if (response.message.message != undefined) {
                FlashService.Error(data + " : " + response.message.message);
              } else {
                FlashService.Error(data);
              }
            });
          }
          NProgress.done();
          $scope.password = '';
        });
      }
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the certification symbol is valid
    $scope.$watch('certSymbol', function (newVal, oldVal) {
      $scope.error.certSymbol = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the certification type is valid
    $scope.$watch('certType', function (newVal, oldVal) {
      $scope.error.certType = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the new address is valid
    $scope.$watch('toDID', function (newVal, oldVal) {
      $scope.error.toDID_empty = newVal == undefined || newVal == '';
      $scope.error.toDID_not_exist = newVal != undefined && $scope.allDidsSymbols != undefined ? !($scope.allDidsSymbols.indexOf(newVal) > -1) : false;
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });
  }

  function IssueCertController(MetaverseHelperService, MetaverseService, $scope, $filter, $rootScope, $location, $translate, $window, localStorageService, FlashService) {

    $scope.listAddresses = [];
    $scope.listMultiSig = [];
    $scope.myDids = [];
    $scope.myCerts = [];
    $scope.certs = [];
    $scope.error = [];
    $scope.warning = [];
    $scope.certType = '';
    $scope.changeDomain = changeDomain;
    $scope.transactionFee = 0.0001;
    $scope.allDidsAddresses = [];
    $scope.listMyCerts = listMyCerts;
    $scope.checkInputs = checkInputs;
    $scope.issueCert = issueCert;
    $scope.myCertsLoaded = false;
    $scope.symbol = '';
    $scope.assets = [];
    $scope.listAllAssets = [];

    $scope.onChain = true;
    $scope.domain = $filter('uppercase')($location.path().split('/')[3]);

    function listMultiSign() {
      NProgress.start();
      //Load users ETP balance
      //Load the addresses and their balances
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach(function (e) {
            var name = "New address";
            if (localStorageService.get(e.balance.address) != undefined) {
              name = localStorageService.get(e.balance.address);
            }
            $scope.addresses[e.balance.address] = {
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen,
              "type": "single"
            };
            $scope.listAddresses.push({
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address
            });
          });

          //After loading the balances, we load the multisig addresses
          MetaverseService.ListMultiSig().then(function (response) {
            if (typeof response.success !== 'undefined' && response.success) {
              if (response.data.multisig != "") {
                //if the user has some assets
                response.data.multisig.forEach(function (e) {
                  $scope.addresses[e.address].type = "multisig";
                  var name = "New address";
                  if (localStorageService.get(e.address) != undefined) {
                    name = localStorageService.get(e.address);
                  }
                  var balance = '';
                  $scope.listMultiSig.push({
                    "index": e.index,
                    "m": e.m,
                    "n": e.n,
                    "selfpublickey": e["self-publickey"],
                    "description": e.description,
                    "address": e.address,
                    "name": name,
                    "balance": $scope.addresses[e.address].balance,
                    "available": $scope.addresses[e.address].available,
                    "publicKeys": e["public-keys"]
                  });
                });
              } else {
                //The account has no multi-signature address
              }
            } else {
                //Fail
              }
          });
        }
      });
      NProgress.done();
    }

    listMultiSign();

    function changeDomain(domain) {
      $scope.symbol = domain + '.';
    }

    function listMyCerts() {
      MetaverseService.AccountAssetCert().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          if (response.data.result.assetcerts != null && response.data.result.assetcerts != '') {
            $scope.myCerts = response.data.result.assetcerts;
            $scope.myCerts.forEach(function (e) {
              $scope.certs[e.symbol] = e;
              if (e.symbol == $scope.certSymbol) $scope.certType = e.certs;
            });
          } else {
            $scope.myCerts = [];
          }
          $scope.myCertsLoaded = true;
        } else {
          $translate('MESSAGES.CANT_LOAD_MY_CERTS').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
    }

    MetaverseService.ListAllAssets().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.assets = response.data.assets;
        //All the details are hidden at the loading
        if ($scope.assets != '') {
          $scope.assets.forEach(function (asset) {
            $scope.listAllAssets.push(asset.symbol);
          });
        } //else, there is no asset on the blockchain
      } else {
          //error while loading assets
        }
    });

    MetaverseService.ListAllDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allDids = response.data.result.dids;
        $scope.allDidsSymbols = [];
        if (typeof $scope.allDids != 'undefined' && $scope.allDids != null) {
          $scope.allDids.forEach(function (did) {
            $scope.allDidsSymbols.push(did.symbol);
          });
        } else {
          $scope.allDids = [];
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_ALL_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      listMyCerts();
    });

    function checkInputs(password) {
      $scope.symbol = $filter('uppercase')($scope.symbol);
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    function issueCert(domain, symbol, toDID, transactionFee, password) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        var fee_value = $filter('convertfortx')(transactionFee, 8);
        NProgress.start();
        MetaverseService.IssueCert(domain, 'naming', symbol, toDID, fee_value, password).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            $translate('MESSAGES.CERT_ISSUED').then(function (data) {
              return FlashService.Success(data, true, response.data.result.transaction.hash);
            });
            $location.path('/avatar/myavatars/');
          } else {
            $translate('MESSAGES.ERROR_CERT_ISSUE').then(function (data) {
              if (response.message.message != undefined) {
                FlashService.Error(data + " : " + response.message.message);
              } else {
                FlashService.Error(data);
              }
            });
          }
          NProgress.done();
          $scope.password = '';
        });
      }
    }

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the certification symbol is valid
    $scope.$watch('domain', function (newVal, oldVal) {
      $scope.error.domain_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the new asset symbol is valid
    $scope.$watch('symbol', function (newVal, oldVal) {
      $scope.error.symbol_empty = newVal == undefined || newVal == '';
      $scope.error.symbol_not_under_my_domain = newVal != undefined && $scope.domain != undefined ? !$filter('uppercase')(newVal).startsWith($scope.domain + '.') : false;
      $scope.error.symbol_wrong_char = newVal != undefined && newVal != '' ? !newVal.match(/^[0-9A-Za-z.]+$/) : false;
      $scope.error.symbol_already_exist = newVal != undefined ? $scope.listAllAssets.indexOf($filter('uppercase')(newVal)) > -1 : false;
      $scope.warning.symbol_end_dot = newVal != undefined ? newVal.charAt(newVal.length - 1) == '.' : false;
      checkready();
    });

    //Check if the new address is valid
    $scope.$watch('toDID', function (newVal, oldVal) {
      $scope.error.toDID_empty = newVal == undefined || newVal == '';
      $scope.error.toDID_not_exist = newVal != undefined ? !($scope.allDidsSymbols.indexOf(newVal) > -1) : false;
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });
  }

  function ShowMITsController(MetaverseHelperService, MetaverseService, $scope, $translate, $window, localStorageService, FlashService) {

    $scope.loaded = false;
    $scope.mymits = [];

    NProgress.start();
    MetaverseService.ListMITs().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.mymits = response.data.result.mits != null ? response.data.result.mits : [];
      } else {
        $translate('MESSAGES.MITS_LOAD_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
      }
      $scope.loaded = true;
      NProgress.done();
    });
  }

  function CreateMITController(MetaverseHelperService, MetaverseService, localStorageService, $scope, $translate, $window, FlashService, ngDialog, $location, $rootScope, $filter) {

    $scope.listAddresses = [];
    $scope.registerMIT = registerMIT;
    $scope.error = [];
    $scope.checkInputs = checkInputs;
    $scope.addresses = [];

    //$scope.allMitsSymbols = [];
    $scope.myDidsAddresses = [];
    $scope.symbolAddress = [];
    $scope.noDids = false;

    function init() {
      $scope.mitSymbol = '';
      $scope.mitAvatar = '';
      $scope.content = '';
      $scope.password = '';
      $scope.transactionFee = 0.0001;
      $scope.confirmation = false;
      $scope.submittable = false;
    }

    function listAddresses() {
      NProgress.start();
      //Load users ETP balance
      //Load the addresses and their balances
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach(function (e) {
            var name = "New address";
            if (localStorageService.get(e.balance.address) != undefined) {
              name = localStorageService.get(e.balance.address);
            }
            $scope.addresses[e.balance.address] = {
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen
            };
            $scope.listAddresses.push({
              "balance": parseInt(e.balance.unspent),
              "available": parseInt(e.balance.available),
              "address": e.balance.address
            });
          });
        }
      });
      NProgress.done();
    }

    listAddresses();

    /*NProgress.start();
    MetaverseService.ListAllMITs()
    .then( (response) => {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allmits = response.data.result.mits;
        if(typeof $scope.allmits != 'undefined' && $scope.allmits != null) {
          $scope.allmits.forEach(function(mit) {
            $scope.allMitsSymbols.push(mit.symbol);
          });
        } else {
          $scope.allmits = [];
        }
      } else {
        $translate('MESSAGES.MITS_LOAD_ERROR').then( (data) => FlashService.Error(data) );
      }
      NProgress.done();
    });*/

    function checkInputs(password) {
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    MetaverseService.ListMyDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        if (response.data.result.dids) {
          $scope.myDids = response.data.result.dids;
          if (typeof $scope.myDids != 'undefined' && $scope.myDids != null) {
            $scope.myDids.forEach(function (did) {
              $scope.myDidsAddresses.push(did.address);
              $scope.symbolAddress[did.symbol] = did.address;
            });
          } else {}
        } else {
          $scope.noDids = true;
          $scope.selectedDid = "";
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_MY_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
    });

    function registerMIT(password) {
      NProgress.start();
      var fee_value = $filter('convertfortx')($scope.transactionFee, 8);
      MetaverseService.RegisterMIT($scope.mitSymbol, $scope.mitAvatar, $scope.content, fee_value, password).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          if (response.data.result.transaction) {
            $translate('MESSAGES.MIT_CREATED').then(function (data) {
              return FlashService.Success(data, true, response.data.result.transaction.hash);
            });
            init();
          }
        } else {
          $translate('MESSAGES.ERROR_MIT_CREATION').then(function (data) {
            if (response.message.message != undefined) {
              FlashService.Error(data + " : " + response.message.message);
            } else {
              FlashService.Error(data);
            }
          });
        }
        NProgress.done();
        $scope.password = '';
      });
    }

    $scope.closeAll = function () {
      ngDialog.closeAll();
    };

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the avatar name is valid
    $scope.$watch('mitSymbol', function (newVal, oldVal) {
      $scope.error.symbol_empty = newVal == undefined || newVal == '';
      $scope.error.symbol_wrong_char = newVal != undefined && newVal != '' ? !newVal.match(/^[0-9A-Za-z.@_-]+$/) : false;
      //$scope.error.symbol_already_exist = newVal != undefined && newVal != '' ? ($scope.allMitsSymbols.indexOf(newVal) > -1) : false;
      checkready();
    });

    //Check if the address is valid
    $scope.$watch('mitAvatar', function (newVal, oldVal) {
      $scope.error.mitAvatar_empty = newVal == undefined || newVal == '';
      $scope.error.mitAvatar_not_enough_etp = newVal != undefined && $scope.addresses[newVal] != undefined ? $scope.addresses[newVal].available < 0.0001 : false;
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });

    init();
  }

  function TransferMITController(MetaverseHelperService, MetaverseService, localStorageService, $scope, $translate, $window, FlashService, ngDialog, $location, $rootScope, $filter) {

    $scope.transferMIT = transferMIT;
    $scope.error = [];
    $scope.checkInputs = checkInputs;
    $scope.mymits = [];
    $scope.allDidsSymbols = [];
    $scope.loaded = false;

    $scope.mitSymbol = $location.path().split('/')[3];

    function init() {
      $scope.sendto = '';
      $scope.password = '';
      $scope.transactionFee = 0.0001;
      $scope.confirmation = false;
      $scope.submittable = false;
    }

    NProgress.start();
    MetaverseService.ListMITs().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.mymits = response.data.result.mits != null ? response.data.result.mits : [];
      } else {
        $translate('MESSAGES.MITS_LOAD_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
      }
      $scope.loaded = true;
      NProgress.done();
    });

    MetaverseService.ListAllDids().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.allDids = response.data.result.dids;
        if (typeof $scope.allDids != 'undefined' && $scope.allDids != null) {
          $scope.allDids.forEach(function (did) {
            $scope.allDidsSymbols.push(did.symbol);
          });
        }
      } else {
        $translate('MESSAGES.CANT_LOAD_ALL_DIDS').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      //Once all the DIDs have been loaded, we look for the one entered by the user
      //checkRecipent($scope.sendTo);
    });

    function checkInputs(password) {
      $scope.confirmation = true;
      delete $rootScope.flash;
    }

    function transferMIT(password) {
      NProgress.start();
      var fee_value = $filter('convertfortx')($scope.transactionFee, 8);
      MetaverseService.TransferMIT($scope.mitSymbol, $scope.sendto, fee_value, password).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          if (response.data.result.transaction) {
            $translate('MESSAGES.MIT_CREATED').then(function (data) {
              return FlashService.Success(data, true, response.data.result.transaction.hash);
            });
            init();
          }
        } else {
          $translate('MESSAGES.ERROR_MIT_CREATION').then(function (data) {
            if (response.message.message != undefined) {
              FlashService.Error(data + " : " + response.message.message);
            } else {
              FlashService.Error(data);
            }
          });
        }
        NProgress.done();
        $scope.password = '';
      });
    }

    $scope.closeAll = function () {
      ngDialog.closeAll();
    };

    //Check if the form is submittable
    function checkready() {
      //Check for errors
      for (var error in $scope.error) {
        if ($scope.error[error]) {
          $scope.submittable = false;
          return;
        }
      }
      $scope.submittable = true;
    }

    //Check if the MIT symbol is valid
    $scope.$watch('mitSymbol', function (newVal, oldVal) {
      $scope.error.mitSymbol_empty = newVal == undefined || newVal == '';
      checkready();
    });

    //Check if the address is valid
    $scope.$watch('sendto', function (newVal, oldVal) {
      $scope.error.sendto_empty = newVal == undefined || newVal == '';
      $scope.error.sendto_not_exist = newVal != undefined && newVal != '' ? !($scope.allDidsSymbols.indexOf(newVal) > -1) : false;
      checkready();
    });

    //Check if the fee is valid
    $scope.$watch('transactionFee', function (newVal, oldVal) {
      $scope.error.fee_empty = newVal == undefined;
      $scope.error.fee_too_low = newVal != undefined ? newVal < 0.0001 : false;
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.errorPassword = newVal == undefined || newVal == '';
    });

    init();
  }
})();

(function () {
  'use strict';

  angular.module('app').controller('LoginController', LoginController);

  LoginController.$inject = ['$location', 'MetaverseService', '$rootScope', 'FlashService', 'localStorageService', '$interval', '$translate', '$window', '$http'];

  function LoginController($location, MetaverseService, $rootScope, FlashService, localStorageService, $interval, $translate, $window, $http) {
    var vm = this;

    vm.login = login;

    (function initController() {
      // reset login status
      localStorageService.remove('credentials');
    })();

    vm.changeLang = function (key) {
      return $translate.use(key).then(function (key) {
        return localStorageService.set('language', key);
      }).catch(function (error) {
        return console.log("Cannot change language.");
      });
    };

    vm.height = '';

    vm.getHeightFromExplorer = getHeightFromExplorer;
    vm.heightFromExplorer = 0;
    vm.loadingPercent = 0;

    vm.popoverSynchShown = false;

    vm.version = "";
    vm.peers = "";

    MetaverseService.GetInfoV2().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        vm.height = response.data.result.height;
        $rootScope.network = response.data.result.testnet ? 'testnet' : 'mainnet';
        vm.version = response.data.result['wallet-version'];
        vm.peers = response.data.result.peers;
      }
    }).then(function () {
      return getHeightFromExplorer();
    }).then(function () {
      return vm.loadingPercent = Math.floor(vm.height / vm.heightFromExplorer * 100);
    });

    function getHeightFromExplorer() {
      var url = $rootScope.network == 'testnet' ? 'https://explorer-testnet.mvs.org/api/height' : 'https://explorer.mvs.org/api/height';
      $http.get(url).then(function (response) {
        if (!vm.popoverSynchShown) {
          $(function () {
            $('.popover-show').popover('show');
          });
          vm.popoverSynchShown = true;
        }
        vm.heightFromExplorer = response.data.result;
        vm.loadingPercent = Math.floor(vm.height / vm.heightFromExplorer * 100);
      }).catch(function (error) {
        return console.log("Cannot get Height from explorer");
      });
    }

    function updateHeight() {
      vm.getHeightFromExplorer();
      MetaverseService.GetInfo().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          vm.height = response.data.height;
          vm.loadingPercent = Math.floor(vm.height / vm.heightFromExplorer * 100);
          vm.peers = response.data.peers;
        }
      });
    }

    updateHeight();
    $interval(function () {
      return updateHeight();
    }, 10000);

    function login() {
      //Show loading
      NProgress.start();
      //Check login data
      MetaverseService.CheckAccount(vm.username, vm.password).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success && response.data != undefined) {
          //Success
          //Save user login credentials
          localStorageService.set('credentials', {
            user: vm.username,
            password: vm.password
          });
          setTimeout(function () {
            return NProgress.done();
          }, 500);
          //Redirect user to home
          $location.path('/home');
        } else {
          //Show login error message
          setTimeout(function () {
            return NProgress.done();
          }, 1000);
          $translate('MESSAGES.LOGIN_WRONG_CREDENTIALS').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      }).catch(function () {
        setTimeout(function () {
          return NProgress.done();
        }, 500);
        //Show login error message
        $translate('MESSAGES.GENERAL_CONNECTION_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      });
    };
  }
})();

(function () {
  'use strict';

  angular.module('app').factory('MetaverseService', MetaverseService).factory('MetaverseHelperService', MetaverseHelperService);

  /**
   * The MetaverseService provides access to the Metaverse JSON RPC.
   */
  MetaverseService.$inject = ['$http', 'localStorageService'];

  function MetaverseService($http, localStorageService) {
    var service = {};

    //Test runned on port 3000. Mainnet is on port 8820
    //var SERVER = window.location.hostname+((window.location.port!=80)?":"+window.location.port:"");
    var SERVER = window.location.hostname + ":8820";

    var SERVER2 = window.location.hostname + ":8821";

    //var RPC_URL = window.location.protocol + '://' + SERVER + '/rpc';
    var RPC_URL = window.location.protocol + '/rpc';
    var RPC_URL_V2 = window.location.protocol + '/rpc/v2';

    service.debug = false;

    service.MetaverseNetwork = {
      mainnet: {
        messagePrefix: '\x18Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
          public: 0x0488b21e,
          private: 0x0488ade4
        },
        pubKeyHash: 0x32,
        scriptHash: 0x05,
        locktimes: [25200, 108000, 331200, 655200, 1314000],
        wif: 0x80
      },
      testnet: {
        messagePrefix: '\x18Bitcoin Signed Message:\n',
        bech32: 'tb',
        bip32: {
          public: 0x043587cf,
          private: 0x04358394
        },
        pubKeyHash: 0x7f,
        scriptHash: 0xc4,
        locktimes: [10, 20, 30, 40, 50],
        wif: 0xef
      }
    };

    service.hasIcon = ['ETP', 'MVS.ZGC', 'MVS.ZDC', 'CSD.CSD', 'PARCELX.GPX', 'PARCELX.TEST', 'SDG', 'META', 'MVS.HUG'];

    service.burnAddress = '1111111111111111111114oLvT2';
    service.burnAddress_short = 'blackhole';

    service.CheckAccount = CheckAccount;

    service.GetNewAccount = GetNewAccount;
    service.ImportAccount = ImportAccount;
    service.GetBalance = GetBalance;
    service.ListAddresses = ListAddresses;
    service.ListBalances = ListBalances;
    service.GetAccount = GetAccount;
    service.GetNewAddress = GetNewAddress;
    service.ChangePassword = ChangePassword;
    service.ResetPassword = ResetPassword;
    service.DumpKeyFile = DumpKeyFile;
    service.ImportKeyFile = ImportKeyFile;

    service.SERVER = SERVER;
    service.SERVER2 = SERVER2;

    //Mining
    service.Start = Start;
    service.Stop = Stop;
    service.GetMiningInfo = GetMiningInfo;

    //ETP
    service.Send = Send;
    service.SendFrom = SendFrom;
    service.SendMore = SendMore;
    service.ListTxs = ListTxs;
    service.GetPublicKey = GetPublicKey;
    service.GetNewMultiSig = GetNewMultiSig;
    service.ListMultiSig = ListMultiSig;
    service.CreateMultisigTx = CreateMultisigTx;
    service.SignMultisigTx = SignMultisigTx;

    //Asset
    service.CreateAsset = CreateAsset;
    service.ListAssets = ListAssets;
    service.ListAllAssets = ListAllAssets;
    service.GetAsset = GetAsset;
    service.GetAddressAsset = GetAddressAsset;
    service.Issue = Issue;
    service.Delete = Delete;
    service.GetAccountAsset = GetAccountAsset;
    service.SecondaryIssue = SecondaryIssue;
    service.CreateAssetMultisigTx = CreateAssetMultisigTx;
    service.ListMITs = ListMITs;
    service.RegisterMIT = RegisterMIT;
    service.TransferMIT = TransferMIT;

    //Chain
    service.FetchHeight = FetchHeight;
    service.FetchTx = FetchTx;
    service.FetchHeader = FetchHeader;
    service.GetBlock = GetBlock;
    service.ListTxsAddress = ListTxsAddress;

    //Misc
    service.Query = Query;
    service.Deposit = Deposit;
    service.FrozenAsset = FrozenAsset;
    service.GetInfo = GetInfo;
    service.GetInfoV2 = GetInfoV2;

    //DID
    service.RegisterDid = RegisterDid;
    service.ListMyDids = ListMyDids;
    service.ListAllDids = ListAllDids;
    service.DidSendFrom = DidSendFrom;
    service.DidSend = DidSend;
    service.DidSendAssetFrom = DidSendAssetFrom;
    service.DidSendAsset = DidSendAsset;
    service.DidChangeAddress = DidChangeAddress;
    service.GetDid = GetDid;
    service.DidSendMore = DidSendMore;

    //Cert
    service.AccountAssetCert = AccountAssetCert;
    service.TransferCert = TransferCert;
    service.IssueCert = IssueCert;

    return service;

    /**
     **/
    function GetInfo() {
      return _send('getinfo', []);
    }

    function GetInfoV2() {
      return _sendV2('getinfo', []);
    }

    /**
     * @api {post} /rpc Create a new account
     * @apiName New account
     * @apiGroup Account
     *
     * @apiDescription Creation of a new account.
     *
     * @apiParam {Const} method getnewaccount
     * @apiParam {List} params [username, password]
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "mnemonic":"xxx",
     *    "main-address":"xxx"
     *	}
     *  @apiErrorExample {json} No-Username-Specified-Response:
     * {
     *  "error": "the option '--ACCOUNTAUTH' is required but missing"
     * }
     **/
    function GetNewAccount(username, password) {
      return _send('getnewaccount', [username, password]);
    }

    /**
     * @api {post} /rpc Get accounts information
     * @apiName Get account
     * @apiGroup Account
     *
     * @apiDescription Get information on the given account.
     *
     * @apiParam {Const} method getaccount
     * @apiParam {List} params [username, password]
     * @apiParam {String} last_word Last word of mnemonic
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "name":"x1",
     *    "mnemonic":"forum super bench parrot duty cliff cannon clump gossip panda other truth cable blossom toast ski thrive violin blood response card mass race corn",
     *    "hd_index":14,
     *    "priority":1
     *	}
     **/
    function GetAccount(last_word) {
      var credentials = localStorageService.get('credentials');
      return _send('getaccount', [credentials.user, credentials.password, last_word]);
    }

    /**
     * @api {post} /rpc Change account password
     * @apiName Change Password
     * @apiGroup Account
     *
     * @apiDescription Change the password the current account.
     *
     * @apiParam {Const} method changepasswd
     * @apiParam {List} params [username, password, '--password', new_password]
     *
     **/
    function ChangePassword(password) {
      var credentials = localStorageService.get('credentials');
      return _send('changepasswd', [credentials.user, credentials.password, '--password', password]);
    }

    /**
     * @api {post} /rpc Reset account password
     * @apiName Reset Password
     * @apiGroup Accoun:t
     *
     * @apiDescription Reset the password the current account.
     *
     * @apiParam {Const} method changepasswd
     * @apiParam {List} params ['-n', username, '-p', password, mnemonic]
     *
     **/
    function ResetPassword(username, password, mnemonic) {
      return _send('changepasswdext', ['-n', username, '-p', password, mnemonic]);
    }

    /*function ExportAccountAsFile(password, last_word) {
      var credentials = localStorageService.get('credentials');
      return _send('exportaccountasfile', [credentials.user, password, last_word]);
    }*/

    function DumpKeyFile(password, last_word) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('dumpkeyfile', [credentials.user, password, last_word, '-d']);
    }

    /*function ImportAccountFromFile(username, password, path, content) {
      return _send('importaccountfromfile', [username, password, path, content]);
    }*/

    function ImportKeyFile(username, password, path, content) {
      return _send('importkeyfile', [username, password, path, content]);
    }

    /**
     * @api {post} /rpc List accounts addresses
     * @apiName List addresses
     * @apiGroup Account
     *
     * @apiDescription Get the addresses of the given account.
     *
     * @apiParam {Const} method listaddresses
     * @apiParam {List} params [username, password]
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "addresses": [
     *      "1A1pdan1QgE6mASWtPdNdmRNiXGbLtd6st",
     *      "1MzpeCbAYKXaEjGLcLSqQJSjvRxTQCLdQ6"
     *    ]
     * }
     **/
    function ListAddresses() {
      var credentials = localStorageService.get('credentials');
      return _send('listaddresses', [credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc New address
     * @apiName New address
     * @apiGroup Account
     *
     * @apiDescription Get a new address.
     *
     * @apiParam {Const} method getnewaddress
     * @apiParam {List} params [username, password]
     **/
    function GetNewAddress() {
      var credentials = localStorageService.get('credentials');
      return _send('getnewaddress', [credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc Get balance
     * @apiName Get balance
     * @apiGroup ETP
     *
     * @apiDescription Get the balance of the given account.
     *
     * @apiParam {Const} method getbalance
     * @apiParam {List} params [username, password]
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "total-confirmed": "2320000000000",
     *    "total-received": "2375000000000",
     *    "total-unspent": "2320000000000"
     * }
     **/
    function GetBalance() {
      var credentials = localStorageService.get('credentials');
      return _send('getbalance', [credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc List balances
     * @apiName List balances
     * @apiGroup ETP
     *
     * @apiDescription Get the balances of all addresses of the given account.
     *
     * @apiParam {Const} method listbalances
     * @apiParam {List} params [ username, password]
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "balances": [
     *      {
     *         "balance": {
     *            "address": "MRRBw9sN6BjpnFEpKsz96rkwfNhYpCN1ad",
     *            "confirmed": "0",
     *            "received": "0",
     *            "unspent": "0"
     *          }
     *      },
     *      {
     *         "balance": {
     *            "address": "MCi9yQat7ES1hRv4e8fiDen7kGpj18bdJo",
     *            "confirmed": "10929119999000",
     *            "received": "10929149999000",
     *            "unspent": "10929119999000"
     *          }
     *      }
     *    ]
     * }
     **/
    function ListBalances(hide_empty) {
      var credentials = localStorageService.get('credentials');
      if (hide_empty) return _send('listbalances', ['-n', credentials.user, credentials.password]);else return _send('listbalances', [credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc List transactions
     * @apiName List transactions
     * @apiGroup Misc
     *
     * @apiDescription Get a list of transactions.
     *
     * @apiParam {Const} method listtxs
     * @apiParam {List} params [username, password]
     *
     **/
    function ListTxs(page) {
      var credentials = localStorageService.get('credentials');
      //return _send('listtxs', ['-i', page, '-l', 1, credentials.user, credentials.password]);
      return _send('listtxs', ['-i', page, credentials.user, credentials.password]);
    }

    function ListTxsAddress(address, page) {
      var credentials = localStorageService.get('credentials');
      return _send('listtxs', [credentials.user, credentials.password, '-a', address, '-i', page]);
    }

    /**
     * @api {post} /rpc Send
     * @apiName Send
     * @apiGroup ETP
     *
     * @apiDescription Send ETP to another address.
     *
     * @apiParam {Const} method send
     * @apiParam {List} params [username, password, recipent address, quantity]
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "transaction": {
     *      "hash": "9486cb52db428c267854dd197495263676e0f3c5f122633f78ef39960c7523e0",
     *      "inputs": [
     *       {
     *         "address": "1NyoThWXCRL7ykfN5bYRADtHdi9shAmHtK",
     *         "previous_output": {
     *             "hash": "e87ad5eb94a6936dcb2c86fe97ac219fc2d940f7dcf8658b5fd63f8ec451119d",
     *             "index": "0"
     *         },
     *         "script": "[ 30450221008c8a6cca1eb51055ea64a1a8ef3aea41cc0637ca50276d1a85a44182be0682c502204172a15a924cc17583a0d0853e0a76493636064b45f62e78f336a3249b93df9d01 ] [ 027dd78b5199d67956dfbeedd7bfc562f87199125ff2c44fd7a6d5df331fa89536 ]",
     *         "sequence": "4294967295"
     *       }
     *      ],
     *      "lock_time": "0",
     *      "outputs": [
     *       {
     *         "address": "1GRheH1GgrfPc7Dr9DbrqjwG4auj4KSrE3",
     *         "script": "dup hash160 [ a935cbf118340293e7e8ed4a7a9c6f765ad72ad2 ] equalverify checksig",
     *         "value": "123123456"
     *       }
     *      ],
     *      "version": "1"
     *    }
     * }
     **/
    function Send(recipent, quantity, transactionFee, memo, password) {
      var credentials = localStorageService.get('credentials');
      if (memo == '') {
        return _sendV2('send', [credentials.user, password, recipent, quantity, '-f', transactionFee]);
      } else {
        return _sendV2('send', [credentials.user, password, recipent, quantity, '-f', transactionFee, '-m', memo]);
      }
    }

    /**
     * @api {post} /rpc Send from
     * @apiName Send from
     * @apiGroup ETP
     *
     * @apiDescription Send ETP to another address from a specified address.
     *
     * @apiParam {Const} method send
     * @apiParam {List} params [username, password, from address, recipent address, quantity]
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "transaction": {
     *      "hash": "9486cb52db428c267854dd197495263676e0f3c5f122633f78ef39960c7523e0",
     *      "inputs": [
     *       {
     *         "address": "1NyoThWXCRL7ykfN5bYRADtHdi9shAmHtK",
     *         "previous_output": {
     *             "hash": "e87ad5eb94a6936dcb2c86fe97ac219fc2d940f7dcf8658b5fd63f8ec451119d",
     *             "index": "0"
     *         },
     *         "script": "[ 30450221008c8a6cca1eb51055ea64a1a8ef3aea41cc0637ca50276d1a85a44182be0682c502204172a15a924cc17583a0d0853e0a76493636064b45f62e78f336a3249b93df9d01 ] [ 027dd78b5199d67956dfbeedd7bfc562f87199125ff2c44fd7a6d5df331fa89536 ]",
     *         "sequence": "4294967295"
     *       }
     *      ],
     *      "lock_time": "0",
     *      "outputs": [
     *       {
     *         "address": "1GRheH1GgrfPc7Dr9DbrqjwG4auj4KSrE3",
     *         "script": "dup hash160 [ a935cbf118340293e7e8ed4a7a9c6f765ad72ad2 ] equalverify checksig",
     *         "value": "123123456"
     *       }
     *      ],
     *      "version": "1"
     *    }
     * }
     **/
    function SendFrom(sender, recipent, quantity, transactionFee, memo, password) {
      var credentials = localStorageService.get('credentials');
      if (memo == '') {
        return _sendV2('sendfrom', [credentials.user, password, sender, recipent, quantity, '-f', transactionFee]);
      } else {
        return _sendV2('sendfrom', [credentials.user, password, sender, recipent, quantity, '-f', transactionFee, '-m', memo]);
      }
    }

    /**
     * @api {post} /rpc Send more
     * @apiName Send more
     * @apiGroup ETP
     *
     * @apiDescription Send ETP to many addresses.
     *
     * @apiParam {Const} method sendmore
     * @apiParam {List} params [username, password, recipent_address1:quantity1,recipent_address2:quantity2,...]
     *
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "transaction": {
     *        "hash": "9486cb52db428c267854dd197495263676e0f3c5f122633f78ef39960c7523e0",
     *        "inputs": [
     *            {
     *              "address": "1NyoThWXCRL7ykfN5bYRADtHdi9shAmHtK",
     *              "previous_output": {
     *                  "hash": "e87ad5eb94a6936dcb2c86fe97ac219fc2d940f7dcf8658b5fd63f8ec451119d",
     *                  "index": "0"
     *              },
     *              "script": "[ 30450221008c8a6cca1eb51055ea64a1a8ef3aea41cc0637ca50276d1a85a44182be0682c502204172a15a924cc17583a0d0853e0a76493636064b45f62e78f336a3249b93df9d01 ] [ 027dd78b5199d67956dfbeedd7bfc562f87199125ff2c44fd7a6d5df331fa89536 ]",
     *              "sequence": "4294967295"
     *            }
     *        ],
     *        "lock_time": "0",
     *        "outputs": [
     *            {
     *              "address": "1GRheH1GgrfPc7Dr9DbrqjwG4auj4KSrE3",
     *              "script": "dup hash160 [ a935cbf118340293e7e8ed4a7a9c6f765ad72ad2 ] equalverify checksig",
     *              "value": "123123456"
     *            }
     *        ],
     *        "version": "1"
     *    }
     * }
     **/
    function SendMore(recipents, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      var query = [];
      var recipent = '';
      query.push(credentials.user);
      query.push(password);
      query.push('-f');
      query.push(transactionFee);
      recipents.forEach(function (e) {
        recipent = e.address + ':' + e.value;
        query.push('-r');
        query.push(recipent);
      });
      return _sendV2('sendmore', query);
    }

    /**
     * @api {post} /rpc Start mining
     * @apiName Start mining
     * @apiGroup Mining
     *
     * @apiDescription Start solo mining with this account.
     *
     * @apiParam {Const} method start
     * @apiParam {List} params [username, password]
     *
     **/
    function Start() {
      var credentials = localStorageService.get('credentials');
      return _send('start', [credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc Stop mining
     * @apiName Stop mining
     * @apiGroup Mining
     *
     * @apiDescription Stop solo mining with this account.
     *
     * @apiParam {Const} method stop
     * @apiParam {List} params [username, password]
     *
     **/
    function Stop() {
      var credentials = localStorageService.get('credentials');
      return _send('stop', [credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc Get mining info
     * @apiName Get mining info
     * @apiGroup Mining
     *
     * @apiDescription Gets information on the current mining status.
     *
     * @apiParam {Const} method getmininginfo
     * @apiParam {List} params [username, password]
     *
     **/
    function GetMiningInfo() {
      var credentials = localStorageService.get('credentials');
      return _send('getmininginfo', [credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc Get blockchain height
     * @apiName Get blockchain height
     * @apiGroup Misc
     *
     * @apiDescription Get the current height of the blockchain.
     *
     * @apiParam {Const} method fetch-height
     * @apiParam {List} params []
     *
     **/
    function FetchHeight() {
      return _send('fetch-height', []);
    }

    /**
     * @api {post} /rpc Get transaction
     * @apiName Get transaction
     * @apiGroup Misc
     *
     * @apiDescription Returns a blockchain transaction of the given hash.
     *
     * @apiParam {Const} method fetch-tx
     * @apiParam {List} params []
     *
     **/
    function FetchTx(hash) {
      return _send('fetch-tx', [hash]);
    }

    /**
     * @api {post} /rpc
     * @apiName
     * @apiGroup
     *
     * @apiDescription
     *
     * @apiParam {Const} method fetch-tx
     * @apiParam {List} params []
     *
     **/
    function FetchHeader(block_height) {
      return _send('fetch-header', ['-t', block_height]);
    }

    /**
     * @api {post} /rpc
     * @apiName
     * @apiGroup
     *
     * @apiDescription
     *
     * @apiParam {Const} method fetch-tx
     * @apiParam {List} params []
     *
     **/
    function GetBlock(block_hash) {
      return _send('getblock', [block_hash, '--json=true']);
    }

    /**
     * @api {post} /rpc Create asset
     * @apiName Create a new unissued asset
     * @apiGroup Assets
     *
     * @apiDescription Create a new asset. The asset will be created
     * locally and you need to issue it to write it into the blockchain.
     *
     * @apiParam {Const} method createasset
     * @apiParam {List} params [username, password,'-s',symbol,'-v',max_supply,'-n',decimal_number, '-d',description]
     *
     **/
    function CreateAsset(symbol, issuer, quantity, secondary_offering, decimal_number, description, secondaryissue_rate) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('createasset', [credentials.user, credentials.password, '-s', symbol, '-i', issuer, '-v', quantity, '-n', decimal_number, '-d', description, '-r', secondaryissue_rate]);
    }

    /**
     * @api {post} /rpc Issue asset
     * @apiName Issue an unissued asset
     * @apiGroup Assets
     *
     * @apiDescription Issues an asset. The asset will be written it into
     * the blockchain.
     *
     * @apiParam {Const} method issue
     * @apiParam {List} params [username, password,symbol]
     *
     **/
    function Issue(symbol) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('issue', [credentials.user, credentials.password, symbol]);
    }

    /**
     * @api {post} /rpc Delete asset
     * @apiName Delete an asset
     * @apiGroup Assets
     *
     * @apiDescription Delete an asset. The asset will be deleted definitely
     *
     * @apiParam {Const} method delete
     * @apiParam {List} params ['-s', symbol, username, password]
     *
     **/
    function Delete(symbol) {
      var credentials = localStorageService.get('credentials');
      return _send('deletelocalasset', ['-s', symbol, credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc List All assets
     * @apiName List All assets
     * @apiGroup Assets
     *
     * @apiDescription List all assets of the whole network.
     *
     * @apiParam {Const} method listassets
     *
     **/
    function ListAllAssets() {
      return _send('listassets');
    }

    /**
     * @api {post} /rpc List assets
     * @apiName List assets
     * @apiGroup Assets
     *
     * @apiDescription List all assets of the account.
     *
     * @apiParam {Const} method listassets
     * @apiParam {List} params [username, password]
     *
     **/
    function ListAssets() {
      var credentials = localStorageService.get('credentials');
      return _send('listassets', [credentials.user, credentials.password]);
    }

    /**
     * @api {post} /rpc Get asset
     * @apiName Get asset
     * @apiGroup Assets
     *
     * @apiDescription Gets details about an asset.
     *
     * @apiParam {Const} method getasset
     * @apiParam {List} params [username, password, symbol]
     *
     **/
    function GetAsset(symbol) {
      return _send('getasset', [symbol]);
    }

    /**
     * @api {post} /rpc Get asset
     * @apiName Get asset
     * @apiGroup Assets
     *
     * @apiDescription Gets details about an asset.
     *
     * @apiParam {Const} method getasset
     * @apiParam {List} params [username, password, symbol]
     *
     **/
    function GetAddressAsset(address) {
      return _send('getaddressasset', [address]);
    }

    function GetAccountAsset(symbol) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('getaccountasset', [credentials.user, credentials.password, symbol]);
    }

    /**
     * @api {post} /rpc Deposit ETP
     * @apiName Deposit
     * @apiGroup Deposit
     *
     * @apiDescription Detposits some ETP for a fixed period of time.
     *
     * @apiParam {Const} method deposit
     * @apiParam {List} params [-f depositperiod,username, password, amount]
     *
     **/
    function Deposit(deposit_period, amount, transactionFee, password, address) {
      var credentials = localStorageService.get('credentials');
      if (address != undefined) {
        return _sendV2('deposit', ['-d', deposit_period, '-a', address, '-f', transactionFee, credentials.user, password, amount]);
      } else {
        return _sendV2('deposit', ['-d', deposit_period, '-f', transactionFee, credentials.user, password, amount]);
      }
    }

    function FrozenAsset(deposit_period, amount, password, symbol, address) {
      var credentials = localStorageService.get('credentials');
      deposit_period *= 60 * 60 * 24; //convert from day to second
      if (address != undefined) {
        return _send('frozenasset', ['-d', address, credentials.user, password, symbol, amount, deposit_period]);
      } else {
        return _send('frozenasset', [credentials.user, password, symbol, amount, deposit_period]);
      }
    }

    function GetPublicKey(address) {
      var credentials = localStorageService.get('credentials');
      return _send('getpublickey', [credentials.user, credentials.password, address]);
    }

    function GetNewMultiSig(signaturenum, publickeynum, selfpublickey, recipents) {
      var credentials = localStorageService.get('credentials');
      var query = [];
      query.push('-m');
      query.push(signaturenum);
      query.push('-n');
      query.push(publickeynum);
      query.push('-s');
      query.push(selfpublickey);
      recipents.forEach(function (e) {
        query.push('-k');
        query.push(e.publicKey);
      });
      query.push(credentials.user);
      query.push(credentials.password);
      return _sendV2('getnewmultisig', query);
    }

    function ListMultiSig() {
      var credentials = localStorageService.get('credentials');
      return _send('listmultisig', [credentials.user, credentials.password]);
    }

    function CreateMultisigTx(fromAddress, toAddress, amount, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('createmultisigtx', [credentials.user, password, fromAddress, toAddress, amount, '-f', transactionFee]);
    }

    function CreateAssetMultisigTx(symbol, fromAddress, toAddress, amount, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('createmultisigtx', [credentials.user, password, fromAddress, toAddress, amount, '-t', '3', '-s', symbol, '-f', transactionFee]);
    }

    function SignMultisigTx(message, password, lastTx) {
      var credentials = localStorageService.get('credentials');
      if (lastTx) {
        return _sendV2('signmultisigtx', [credentials.user, password, message, '-b']);
      } else {
        return _sendV2('signmultisigtx', [credentials.user, password, message]);
      }
    }

    function CheckAccount(user, password) {
      //To check if account exists we can simply check the accounts balance
      return _send('getbalance', [user, password]);
    }

    function ImportAccount(user, password, phrase, address_count) {
      return _send('importaccount', ['-n', user, '-p', password, '-i', address_count, phrase]);
    }

    function RegisterDid(address, symbol, password) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('registerdid', [credentials.user, password, address, symbol]);
    }

    function ListMyDids() {
      var credentials = localStorageService.get('credentials');
      return _sendV2('listdids', [credentials.user, credentials.password]);
    }

    function ListAllDids() {
      return _sendV2('listdids', []);
    }

    function DidSendFrom(sendfrom, sendTo, value, transactionFee, memo, password) {
      var credentials = localStorageService.get('credentials');
      if (memo == '') {
        return _sendV2('didsendfrom', [credentials.user, password, sendfrom, sendTo, value, '-f', transactionFee]);
      } else {
        return _sendV2('didsendfrom', [credentials.user, password, sendfrom, sendTo, value, '-f', transactionFee, '-m', memo]);
      }
    }

    function DidSend(sendTo, value, transactionFee, memo, password) {
      var credentials = localStorageService.get('credentials');
      if (memo == '') {
        return _sendV2('didsend', [credentials.user, password, sendTo, value, '-f', transactionFee]);
      } else {
        return _sendV2('didsend', [credentials.user, password, sendTo, value, '-f', transactionFee, '-m', memo]);
      }
    }

    function DidSendAssetFrom(sender_address, recipent_address, symbol, quantity, type, unlockNumber, quantityLocked, periodLocked, periodsModel2, interestRate, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      switch (type) {
        case '0':
          var modelToSend = "TYPE=1;LQ=" + quantity + ";LP=" + periodLocked + ";UN=1";
          return _sendV2('didsendassetfrom', [credentials.user, password, sender_address, recipent_address, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        case '1':
          var modelToSend = "TYPE=1;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber;
          return _sendV2('didsendassetfrom', [credentials.user, password, sender_address, recipent_address, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        case '2':
          var uc = '';
          var uq = '';
          periodsModel2.forEach(function (period) {
            uc += period.number;
            uc += ',';
            uq += period.quantityToSend;
            uq += ',';
          });
          uc = uc.substring(0, uc.length - 1);
          uq = uq.substring(0, uq.length - 1);
          var modelToSend = "TYPE=2;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber + ";UC=" + uc + ";UQ=" + uq;
          return _sendV2('didsendassetfrom', [credentials.user, password, sender_address, recipent_address, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        case '3':
          var modelToSend = "TYPE=3;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber + ";IR=" + interestRate;
          return _sendV2('didsendassetfrom', [credentials.user, password, sender_address, recipent_address, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        default:
          return _sendV2('didsendassetfrom', [credentials.user, password, sender_address, recipent_address, symbol, quantity, '-f', transactionFee]);
      }
    }

    function DidSendAsset(recipent_address, symbol, quantity, type, unlockNumber, quantityLocked, periodLocked, periodsModel2, interestRate, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      switch (type) {
        case '0':
          var modelToSend = "TYPE=1;LQ=" + quantity + ";LP=" + periodLocked + ";UN=1";
          return _sendV2('didsendasset', [credentials.user, password, recipent_address, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        case '1':
          var modelToSend = "TYPE=1;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber;
          return _sendV2('didsendasset', [credentials.user, password, recipent_address, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        case '2':
          var uc = '';
          var uq = '';
          periodsModel2.forEach(function (period) {
            uc += period.number;
            uc += ',';
            uq += period.quantityToSend;
            uq += ',';
          });
          uc = uc.substring(0, uc.length - 1);
          uq = uq.substring(0, uq.length - 1);
          var modelToSend = "TYPE=2;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber + ";UC=" + uc + ";UQ=" + uq;
          return _sendV2('didsendasset', [credentials.user, password, recipent_address, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        case '3':
          var modelToSend = "TYPE=3;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber + ";IR=" + interestRate;
          return _sendV2('didsendassetfrom', [credentials.user, password, recipent_address, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        default:
          return _sendV2('didsendasset', [credentials.user, password, recipent_address, symbol, quantity, '-f', transactionFee]);
      }
    }

    function DidChangeAddress(symbol, toAddress, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('didchangeaddress', [credentials.user, password, toAddress, symbol, '-f', transactionFee]);
    }

    function GetDid(symbol) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('getdid', [symbol]);
    }

    function AccountAssetCert() {
      var credentials = localStorageService.get('credentials');
      return _sendV2('getaccountasset', [credentials.user, credentials.password, '-c']);
    }

    function TransferCert(certSymbol, certType, toDID, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('transfercert', [credentials.user, password, toDID, certSymbol, certType, '-f', transactionFee]);
    }

    function IssueCert(domain, type, symbol, toDID, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('issuecert', [credentials.user, password, toDID, symbol, type, '-f', transactionFee]);
    }

    function ListMITs() {
      var credentials = localStorageService.get('credentials');
      return _sendV2('listmits', [credentials.user, credentials.password]);
    }

    function RegisterMIT(symbol, avatar, content, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('registermit', [credentials.user, password, avatar, symbol, '-c', content, '-f', transactionFee]);
    }

    function TransferMIT(symbol, sendto, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      return _sendV2('transfermit', [credentials.user, password, sendto, symbol, '-f', transactionFee]);
    }

    function DidSendMore(recipents, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      var query = [];
      var recipent = '';
      query.push(credentials.user);
      query.push(password);
      query.push('-f');
      query.push(transactionFee);
      recipents.forEach(function (e) {
        recipent = e.address + ':' + e.value;
        query.push('-r');
        query.push(recipent);
      });
      return _sendV2('didsendmore', query);
    }

    function SecondaryIssue(toDID, symbol, quantity, type, unlockNumber, quantityLocked, periodLocked, periodsModel2, interestRate, transactionFee, password) {
      var credentials = localStorageService.get('credentials');
      switch (type) {
        case '1':
          var modelToSend = "TYPE=1;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber;
          return _sendV2('secondaryissue', [credentials.user, password, toDID, symbol, quantity, '-m', modelToSend, '-f', transactionFee]);
        case '2':
          var credentials = localStorageService.get('credentials'); //;UC=20000,20000,20000;UQ=3000,3000,3000
          var uc = '';
          var uq = '';
          periodsModel2.forEach(function (period) {
            uc += period.number;
            uc += ',';
            uq += period.quantityToSend;
            uq += ',';
          });
          uc = uc.substring(0, uc.length - 1);
          uq = uq.substring(0, uq.length - 1);
          var modelToSend = "TYPE=2;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber + ";UC=" + uc + ";UQ=" + uq;
          return _sendV2('secondaryissue', [credentials.user, password, toDID, symbol, quantity, '-m', modelToSend, '-f', transactionFee]);
        case '3':
          var modelToSend = "TYPE=3;LQ=" + quantityLocked + ";LP=" + periodLocked + ";UN=" + unlockNumber + ";IR=" + interestRate;
          return _sendV2('secondaryissue', [credentials.user, password, toDID, symbol, quantity, '-f', transactionFee, '-m', modelToSend]);
        default:
          return _sendV2('secondaryissue', [credentials.user, password, toDID, symbol, quantity, '-f', transactionFee]);
      }
    }

    function Query(string) {
      var command = string;
      var params = [];
      if (string.indexOf(' ') >= 0) {
        command = string.split(" ")[0];
        params = string.substring(string.indexOf(command) + command.length + 1).replace(/\s{2,}/g, ' ').split(' ');
      }
      return _send(command, params);
    }

    function _send(method, params) {
      return $http.post(RPC_URL, {
        method: method,
        params: params
      }, {
        headers: {}
      }).then(function (res) {

        if (service.debug) console.log({
          "method": method,
          "params": params,
          "result": res.data
        });
        return handleSuccess(res);
      }, function (res) {
        handleError(res);
      });
    }

    function _sendV2(method, params) {
      return $http.post(RPC_URL_V2, {
        jsonrpc: "2.0",
        method: method,
        params: params
      }, {
        headers: {}
      }).then(function (res) {

        if (service.debug) console.log({
          "method": method,
          "params": params,
          "result": res.data
        });
        return handleSuccess(res);
      }, function (res) {
        handleError(res);
      });
    }

    // private functions
    function handleSuccess(res) {
      if (res.data != undefined && res.data.error == undefined) return {
        success: true,
        data: res.data
      };else return handleError(res);
    }

    function handleError(res) {
      if (res.data != undefined && res.data.error != undefined) return {
        success: false,
        message: res.data.error
      };
      return {
        success: false,
        message: 'General connection error'
      };
    }
  }

  MetaverseHelperService.$inject = ['MetaverseService', '$translate'];

  function MetaverseHelperService(MetaverseService, $translate) {
    var service = {};

    var TX_TYPE_ETP = 'ETP';
    var TX_TYPE_ASSET = 'ASSET';
    var TX_TYPE_ISSUE = 'ISSUE';
    var TX_TYPE_CERT = 'CERT';
    var TX_TYPE_DID_ISSUE = 'DID_ISSUE';
    var TX_TYPE_DID_TRANSFER = 'DID_TRANSFER';
    var TX_TYPE_MIT = 'MIT';
    var TX_TYPE_UNKNOWN = 'UNKNOWN';

    service.LoadTransactions = LoadTransactions;
    service.GetBalance = GetBalance;

    return service;

    function GetBalance(callback) {
      MetaverseService.GetBalance().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $translate('MESSAGES.GENERAL_CONNECTION_ERROR').then(function (data) {
            callback(null, response.data, data);
          });
        } else {
          $translate('MESSAGES.GENERAL_CONNECTION_ERROR').then(function (data) {
            callback(1, null, data);
          });
        }
      });
    }

    function determineTransactionType(tx) {
      //Check if worth to try
      if (tx.outputs != undefined && Array.isArray(tx.outputs)) {
        var result;
        tx.outputs.forEach(function (output) {
          if (output.attachment.type === 'asset-issue') //an asset issue has the priority, and contains certs
            result = TX_TYPE_ISSUE;
          if (output.attachment.type === 'asset-transfer' && result != TX_TYPE_ISSUE) result = TX_TYPE_ASSET;
          if (output.attachment.type === 'asset-cert' && result != TX_TYPE_ISSUE) result = TX_TYPE_CERT;
          if (output.attachment.type === 'did-issue') result = TX_TYPE_DID_ISSUE;
          if (output.attachment.type === 'did-transfer') result = TX_TYPE_DID_TRANSFER;
          if (output.attachment.type === 'mit') result = TX_TYPE_MIT;
        });
        return result ? result : TX_TYPE_ETP;
      } else {
        return TX_TYPE_UNKNOWN;
      }
    }

    function LoadTransactions(callback, type, page) {
      MetaverseService.ListTxs(page).then(function (response) {
        var transactions = [];
        if (response.success !== 'undefined' && response.success) {
          if (response.data.current_page == response.data.total_page) {
            transactions.lastpage = true;
          } else {
            transactions.lastpage = false;
          }
          if (response.data.transactions == undefined) {
            console.log('unable to load transactions.');
            callback(1);
          } else if (response.data.transactions.length > 0) {
            response.data.transactions.forEach(function (e) {
              var transaction = {
                "height": e.height,
                "hash": e.hash,
                "timestamp": new Date(e.timestamp * 1000),
                "direction": e.direction,
                "recipents": [],
                "value": 0,
                "memo": ""
              };
              switch (determineTransactionType(e)) {
                case TX_TYPE_ETP:
                  //ETP transaction handling
                  transaction.type = 'ETP';
                  transaction.asset_type = 8;
                  transaction.intrawallet = true;
                  e.outputs.forEach(function (output) {
                    if (typeof output.script != 'undefined' && output.script.match(/\[ (\w+) ] numequalverify dup hash160 \[ (\w+) \] equalverify checksig/) != null) {
                      transaction.frozen = true;
                      transaction.intrawallet = false;
                      transaction.recipents.push({
                        "address": output.address,
                        "value": parseInt(output['etp-value']),
                        "script": output.script
                      });
                      transaction.value += parseInt(output['etp-value']);
                    } else if (transaction.direction === 'receive' && output.own === 'true' || transaction.direction === 'send' && output.own === 'false') {
                      transaction.frozen = false;
                      transaction.intrawallet = false;
                      transaction.recipents.push({
                        "address": output.address,
                        "value": parseInt(output['etp-value']),
                        "script": output.script
                      });
                      transaction.value += parseInt(output['etp-value']);
                    }
                    //memo
                    if (typeof output.attachment.content != 'undefined') {
                      transaction.memo = output.attachment.content;
                    }
                  });
                  if (transaction.intrawallet) transaction.direction = 'intra';
                  transactions.push(transaction);
                  break;
                case TX_TYPE_ASSET:
                  //Asset transactions
                  transaction.intrawallet = true;
                  e.outputs.forEach(function (output) {
                    if (output.attachment.type === 'asset-transfer') {
                      transaction.type = output.attachment.symbol;
                      transaction.decimal_number = output.attachment.decimal_number;
                      if (transaction.direction === 'receive' && output.own === 'true' || transaction.direction === 'send' && output.own === 'false') {
                        transaction.intrawallet = false;
                        transaction.recipents.push({
                          "address": output.address,
                          "value": parseInt(output.attachment.quantity)
                        });
                        transaction.value += parseInt(output.attachment.quantity);
                      }
                    }
                    //memo
                    if (typeof output.attachment.content != 'undefined') {
                      transaction.memo = output.attachment.content;
                    }
                  });
                  if (transaction.intrawallet) transaction.direction = 'intra';
                  transactions.push(transaction);
                  break;
                case TX_TYPE_ISSUE:
                  //Asset issue tx
                  transaction.direction = 'issue';
                  e.outputs.forEach(function (output) {
                    if (output.own === 'true' && output.attachment.type === 'asset-issue') {
                      transaction.recipents.push({
                        "address": output.address,
                        "value": parseInt(output.attachment.quantity)
                      });
                      transaction.value += parseInt(output.attachment.quantity);
                      transaction.type = output.attachment.symbol;
                      transaction.decimal_number = output.attachment.decimal_number;
                    } /* else if(output.own==='true' && output.attachment.type==='asset-cert'){
                         var cert = {
                             "height": e.height,
                             "hash": e.hash,
                             "timestamp": new Date(e.timestamp * 1000),
                             "direction": "cert",
                             "recipents": [],
                             "value": 0,
                             "memo": "",
                             "type": output.attachment.symbol
                         };
                         cert.recipents.push({
                             "address": output.address
                         });
                         transactions.push(cert);
                      }*/
                    //memo
                    if (typeof output.attachment.content != 'undefined') {
                      transaction.memo = output.attachment.content;
                    }
                  });
                  transactions.push(transaction);
                  break;
                case TX_TYPE_CERT:
                  transaction.direction = 'cert';
                  e.outputs.forEach(function (output) {
                    if (output.own === 'true' && output.attachment.type === 'asset-cert') {
                      transaction.recipents.push({
                        "address": output.address
                      });
                      if (output.attachment.certs == 'naming') {
                        transaction.type = output.attachment.symbol;
                      } else if (typeof transaction.type == 'undefined') {
                        transaction.type = output.attachment.symbol;
                      }
                    }
                  });
                  transactions.push(transaction);
                  break;
                case TX_TYPE_DID_ISSUE:
                  transaction.direction = 'did-issue';
                  e.outputs.forEach(function (output) {
                    if (output.own === 'true' && output.attachment.type === 'did-issue') {
                      transaction.recipents.push({
                        "address": output.address
                      });
                      transaction.type = output.attachment.symbol;
                    }
                  });
                  transactions.push(transaction);
                  break;
                case TX_TYPE_DID_TRANSFER:
                  transaction.direction = 'did-transfer';
                  e.outputs.forEach(function (output) {
                    if (output.own === 'true' && output.attachment.type === 'did-transfer') {
                      transaction.recipents.push({
                        "address": output.address
                      });
                      transaction.type = output.attachment.symbol;
                    }
                  });
                  transactions.push(transaction);
                  break;
                case TX_TYPE_MIT:
                  e.outputs.forEach(function (output) {
                    if (output.attachment.type === 'mit') {
                      if (output.attachment.status == 'transfered') {
                        transaction.direction = 'mit-transfer';
                      } else {
                        transaction.direction = 'mit-issue';
                      }
                      if (typeof output.attachment.content != 'undefined') {
                        transaction.memo = output.attachment.content;
                      }
                      transaction.recipents.push({
                        "address": output.address
                      });
                      transaction.type = output.attachment.symbol;
                    }
                  });
                  transactions.push(transaction);
                  break;
                default:
                  break;
              }
            });
            //Return transaction list
            callback(null, transactions);
          } else {
            //Empty transaction list
            callback(null, []);
          }
        } else if (response.error = "no record in this page") {
          //Empty transaction list
          callback(null, []);
        } else {
          $translate('MESSAGES.TRANSACTIONS_LOAD_ERROR').then(function (data) {
            callback(1, null, data);
          });
        }
      });
    }
  }
})();

(function () {
  'use strict';

  angular.module('app').controller('RegisterController', RegisterController);

  RegisterController.$inject = ['MetaverseService', '$scope', '$interval', '$location', 'localStorageService', '$rootScope', 'FlashService', '$translate', '$window', '$http'];

  function RegisterController(MetaverseService, $scope, $interval, $location, localStorageService, $rootScope, FlashService, $translate, $window, $http) {
    var vm = this;
    vm.buttonCopyToClipboard = new Clipboard('.btn');

    vm.confirmKey = '';
    vm.countWords = countWords;
    vm.countBackupWords = 0;
    $scope.new_account = true;

    vm.register = register;
    vm.user = {
      username: ''
    };

    vm.changeLang = function (key) {
      return $translate.use(key).then(function (key) {
        return localStorageService.set('language', key);
      }).catch(function (error) {
        return console.log("Cannot change language.");
      });
    };

    vm.height = '';

    vm.getHeightFromExplorer = getHeightFromExplorer;
    vm.heightFromExplorer = 0;
    vm.loadingPercent = 0;

    vm.popoverSynchShown = false;

    vm.version = "";
    vm.peers = "";

    MetaverseService.GetInfoV2().then(function (response) {
      if (typeof response.success !== 'undefined' && response.success) {
        vm.height = response.data.result.height;
        $rootScope.network = response.data.result.testnet ? 'testnet' : 'mainnet';
        vm.version = response.data.result['wallet-version'];
        vm.peers = response.data.result.peers;
      }
    }).then(function () {
      return getHeightFromExplorer();
    }).then(function () {
      return vm.loadingPercent = Math.floor(vm.height / vm.heightFromExplorer * 100);
    });

    function getHeightFromExplorer() {
      var url = $rootScope.network == 'testnet' ? 'https://explorer-testnet.mvs.org/api/height' : 'https://explorer.mvs.org/api/height';
      $http.get(url).then(function (response) {
        if (!vm.popoverSynchShown) {
          $(function () {
            $('.popover-show').popover('show');
          });
          vm.popoverSynchShown = true;
        }
        vm.heightFromExplorer = response.data.result;
        vm.loadingPercent = Math.floor(vm.height / vm.heightFromExplorer * 100);
      }).catch(function (error) {
        return console.log("Cannot get Height from explorer");
      });
    }

    function updateHeight() {
      vm.getHeightFromExplorer();
      MetaverseService.GetInfo().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          vm.height = response.data.height;
          vm.loadingPercent = Math.floor(vm.height / vm.heightFromExplorer * 100);
          vm.peers = response.data.peers;
        }
      });
    }

    function countWords() {
      if (vm.confirmKey == '') {
        vm.countBackupWords = 0;
      } else {
        vm.confirmKey = vm.confirmKey.replace("  ", " ");
        vm.confirmKey = vm.confirmKey.replace("  ", " ");
        vm.countBackupWords = vm.confirmKey.split(" ").length;
      }
    }

    updateHeight();
    $interval(function () {
      return updateHeight();
    }, 10000);

    function register() {
      NProgress.start();
      setTimeout(function () {
        return NProgress.done();
      }, 500);
      if ((vm.user.username == undefined || vm.user.username == '') && !$scope.import_from_file) {
        $translate('MESSAGES.NO_ACCOUNTNAME_PROVIDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
        return;
      } else if (vm.user.password == undefined) {
        $translate('MESSAGES.NO_PASSWORD_PROVIDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
        return;
      } else if (vm.user.password.length < 6) {
        $translate('MESSAGES.PASSWORD_SHORT').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
        return;
      } else if (vm.user.password_repeat != vm.user.password && !$scope.import_from_file && !$scope.import_from_phrase) {
        $translate('MESSAGES.PASSWORD_NOT_MATCH').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
        return;
      } else if (vm.user.username.indexOf(" ") != -1) {
        $translate('MESSAGES.USERNAME_CONTAINS_SPACE').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
        return;
      } else if (vm.user.password.indexOf(" ") != -1) {
        $translate('MESSAGES.PASSWORD_CONTAINS_SPACE').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
        return;
      }
      if ($scope.import_from_phrase) {
        //Import account from phrase
        if ($scope.import_phrase == undefined) {
          $translate('MESSAGES.NO_PHRASE').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
          return;
        } else if ($scope.address_count == undefined) {
          $translate('MESSAGES.NO_ADDRESS_NBR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
          return;
        } else {
          //Remove the Enter key from the phrase
          var re = /(\r\n|\n|\r)/gm;
          var phraseToSend = $scope.import_phrase.replace(re, " ");
          phraseToSend = phraseToSend.replace("  ", " ");

          //Check if the key contains special characters
          var occurences = phraseToSend.match(/[a-z]|[A-Z]| /g);
          if (phraseToSend.length != occurences.length) {
            $translate('MESSAGE.WRONG_PRIVATE_KEY').then(function (data) {
              return FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
            return;
          } else {
            MetaverseService.ImportAccount(vm.user.username, vm.user.password, phraseToSend, $scope.address_count).then(function (response) {
              if (typeof response.success !== 'undefined' && response.success) {
                $translate('MESSAGES.IMPORT_SUCCESS').then(function (data) {
                  FlashService.Success(data, true);
                  $window.scrollTo(0, 0);
                  $location.path('/login');
                });
              } else {
                $translate('MESSAGES.IMPORT_ERROR').then(function (data) {
                  if (response.message != undefined) {
                    FlashService.Error(data + " " + response.message);
                    $window.scrollTo(0, 0);
                  } else {
                    FlashService.Error(data);
                    $window.scrollTo(0, 0);
                  }
                });
              }
            });
          }
        }
      } else if ($scope.import_from_file) {
        //Import account from file
        //MetaverseService.ImportAccountFromFile(vm.user.username, vm.user.password, '.', $scope.accountInfo)
        MetaverseService.ImportKeyFile(vm.user.username, vm.user.password, '.', $scope.accountInfo).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            $translate('MESSAGES.IMPORT_SUCCESS').then(function (data) {
              FlashService.Success(data, true);
              $location.path('/login');
              $window.scrollTo(0, 0);
            });
          } else {
            $translate('MESSAGES.IMPORT_ERROR').then(function (data) {
              if (response.message != undefined) {
                FlashService.Error(data + " " + response.message);
                $window.scrollTo(0, 0);
              } else {
                FlashService.Error(data);
                $window.scrollTo(0, 0);
              }
            });
          }
        });
      } else {
        //Create a new account
        MetaverseService.GetNewAccount(vm.user.username, vm.user.password).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            $translate('MESSAGES.REGISTARTION_SUCCESS').then(function (data) {
              return FlashService.Success(data);
            });
            $window.scrollTo(0, 0);
            vm.registered = {
              "privatekey": response.data.mnemonic,
              "address": response.data['default-address']
            };
          } else {
            FlashService.Error(response.message);
            $window.scrollTo(0, 0);
          }
        });
      }
    }
  }
})();
//# sourceMappingURL=app.0.8.0.js.map
