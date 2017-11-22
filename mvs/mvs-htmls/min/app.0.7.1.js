'use strict';

(function () {
  'use strict';

  angular.module('app', ['ui.router', 'ngCookies', 'LocalStorageModule', 'pascalprecht.translate', 'angularUtils.directives.dirPagination', 'ngDialog', 'ngFileSaver']).config(config).filter('assetformat', function () {
    return function (input, asset_type) {
      if (typeof asset_type === 'undefined') asset_type = 8;
      return parseFloat(input) / Math.pow(10, asset_type);
    };
  }).config(['$compileProvider', function ($compileProvider) {
    //$compileProvider.debugInfoEnabled(false);
  }]).config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('mvs.live');
  }]).config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'lang/',
      suffix: '.0.7.1.json'
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
      templateUrl: "login/login.view.0.7.1.html",
      controller: 'LoginController',
      controllerAs: 'vm'
    }).state('register', {
      url: "/register",
      templateUrl: "register/register.view.0.7.1.html",
      controller: 'RegisterController',
      controllerAs: 'vm'
    }).state('home', {
      abstract: true,
      templateUrl: "home/index.view.0.7.1.html",
      controller: 'HomeController',
      controllerAs: 'vm'
    }).state('home.account', {
      abstract: true,
      templateUrl: "home/account/index.view.0.7.1.html",
      controller: 'AccountController',
      controllerAs: 'vm'
    }).state('home.account.details', {
      url: "/account/details",
      templateUrl: "home/account/details.view.0.7.1.html",
      controller: 'AccountController',
      controllerAs: 'vm'
    }).state('home.account.privatekey', {
      url: "/account/privatekey",
      templateUrl: "home/account/privatekey.view.0.7.1.html",
      controller: 'AccountController',
      controllerAs: 'vm'
    }).state('home.account.export', {
      url: "/account/export",
      templateUrl: "home/account/export.view.0.7.1.html",
      controller: 'AccountController',
      controllerAs: 'vm'
    })

    /*.state('home.account.subscribe', {
        url: "/account/subscribe",
        templateUrl: "home/account/subscribe.view.0.7.1.html",
        controller: 'AccountController',
        controllerAs: 'vm'
    })*/

    .state('home.addresses', {
      templateUrl: "home/addresses/index.view.0.7.1.html",
      controller: 'AddressesController'
    }).state('home.addresses.myaddresses', {
      url: "/addresses/myaddresses",
      templateUrl: "home/addresses/myaddresses.view.0.7.1.html",
      controller: 'AddressesController',
      controllerAs: 'vm'
    })

    /*.state('home.addresses.multisigaddresses', {
        url: "/addresses/multisignatureaddresses",
        templateUrl: "home/addresses/multisigaddresses.view.0.7.1.html",
        controller: 'AddressesController',
        controllerAs: 'vm'
    })*/

    .state('home.home', {
      url: "/home",
      templateUrl: "home/home.view.0.7.1.html",
      controller: 'AssetsController',
      controllerAs: 'vm'
    }).state('home.explorer', {
      templateUrl: "home/explorer/index.view.0.7.1.html",
      controller: 'ExplorerController'
    }).state('home.explorer.search', {
      url: "/explorer/search/:search",
      templateUrl: "home/explorer/search.view.0.7.1.html",
      controller: 'ExplorerController'
    }).state('home.explorer.transaction', {
      url: "/explorer/tx/:hash",
      templateUrl: "home/explorer/transaction.view.0.7.1.html",
      controller: 'ExplorerController'
    }).state('home.explorer.address', {
      url: "/explorer/adr/:address",
      templateUrl: "home/explorer/address.view.0.7.1.html",
      controller: 'ExplorerController'
    }).state('home.explorer.block', {
      url: "/explorer/blk/:block",
      templateUrl: "home/explorer/block.view.0.7.1.html",
      controller: 'ExplorerController'
    }).state('home.explorer.noresult', {
      url: "/explorer/noresult/:search",
      templateUrl: "home/explorer/noresult.view.0.7.1.html",
      controller: 'ExplorerController'
    }).state('home.asset', {
      abstract: true,
      templateUrl: "home/assets/index.view.0.7.1.html"
    }).state('home.asset.alldetails', {
      url: "/asset/all",
      templateUrl: "home/assets/all.view.0.7.1.html",
      controller: 'ShowAllAssetsController',
      controllerAs: 'vm'
    }).state('home.asset.myassets', {
      url: "/asset/myassets",
      templateUrl: "home/assets/myassets.view.0.7.1.html",
      controller: 'ShowAssetsController',
      controllerAs: 'vm'
    }).state('home.asset.details', {
      url: "/asset/details/:symbol",
      templateUrl: "home/assets/details.view.0.7.1.html",
      controller: 'ShowAssetsController',
      controllerAs: 'vm'
    }).state('home.asset.create', {
      url: "/asset/create",
      templateUrl: "home/assets/create.view.0.7.1.html",
      controller: 'CreateAssetController',
      controllerAs: 'vm'
    }).state('home.transferasset', {
      url: "/transfer/:symbol/:sender_address",
      templateUrl: "home/transfer/transferasset.view.0.7.1.html",
      controller: 'TransferAssetController',
      controllerAs: 'vm'
    }).state('home.transferetp', {
      url: "/transfer/ETP",
      templateUrl: "home/transfer/transferetp.view.0.7.1.html",
      controller: 'ETPController',
      controllerAs: 'vm'
    }).state('home.multisignature', {
      url: "/transfer/multisignature",
      templateUrl: "home/transfer/multisignature.view.0.7.1.html",
      controller: 'ETPMultiSignController',
      controllerAs: 'vm'
    }).state('home.sign', {
      url: "/transfer/sign",
      templateUrl: "home/transfer/sign.view.0.7.1.html",
      controller: 'ETPMultiSignController',
      controllerAs: 'vm'
    }).state('home.createmultisignature', {
      url: "/addresses/newmultisignature",
      templateUrl: "home/addresses/createmultisignature.view.0.7.1.html",
      controller: 'ETPMultiSignController',
      controllerAs: 'vm'
    }).state('home.deposit', {
      url: "/deposit/:symbol",
      templateUrl: "home/deposit.view.0.7.1.html",
      controller: 'DepositController',
      controllerAs: 'vm'
    }).state('home.console', {
      url: "/advanced",
      templateUrl: "home/console.view.0.7.1.html",
      controller: 'ConsoleController'
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

    function Success(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'success',
        keepAfterLocationChange: keepAfterLocationChange
      };
    }

    function Error(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'error',
        keepAfterLocationChange: keepAfterLocationChange
      };
    }
  }
})();

(function () {
  'use strict';

  HomeController.$inject = ['MetaverseService', '$rootScope', '$scope', 'localStorageService', '$interval', '$translate', '$location', '$filter'];
  MenuController.$inject = ['$location', '$rootScope'];
  ConsoleController.$inject = ['MetaverseService', '$rootScope', 'FlashService', '$translate', '$scope', '$window'];
  AddressesController.$inject = ['MetaverseHelperService', 'MetaverseService', '$translate', '$rootScope', '$scope', 'FlashService', '$location', 'localStorageService', '$window'];
  AccountController.$inject = ['MetaverseService', '$translate', '$rootScope', '$scope', 'FlashService', '$location', 'localStorageService', '$window', 'FileSaver', 'Blob'];
  TransferAssetController.$inject = ['MetaverseService', '$stateParams', '$rootScope', '$scope', '$translate', '$location', 'localStorageService', 'FlashService', '$window', '$filter'];
  CreateAssetController.$inject = ['MetaverseService', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$location', '$translate', '$window', 'ngDialog'];
  AssetsController.$inject = ['MetaverseHelperService', 'MetaverseService', '$rootScope', '$scope', '$location', '$translate', 'FlashService', '$window'];
  ShowAssetsController.$inject = ['MetaverseService', '$rootScope', '$scope', 'localStorageService', 'FlashService', '$translate', '$stateParams', '$location', '$window', 'ngDialog'];
  ShowAllAssetsController.$inject = ['MetaverseService', '$rootScope', '$scope', '$location', 'FlashService', '$translate', '$stateParams', '$window'];
  ETPController.$inject = ['MetaverseService', 'MetaverseHelperService', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window'];
  ETPMultiSignController.$inject = ['MetaverseService', 'MetaverseHelperService', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window'];
  DepositController.$inject = ['MetaverseService', 'MetaverseHelperService', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window', '$location', '$filter'];
  ExplorerController.$inject = ['MetaverseService', 'MetaverseHelperService', '$location', '$stateParams', '$rootScope', '$scope', 'FlashService', 'localStorageService', '$translate', '$window'];
  angular.module('app').controller('HomeController', HomeController).controller('MenuController', MenuController).controller('ConsoleController', ConsoleController).controller('AddressesController', AddressesController).controller('AccountController', AccountController).controller('TransferAssetController', TransferAssetController).controller('CreateAssetController', CreateAssetController).controller('AssetsController', AssetsController).controller('ShowAssetsController', ShowAssetsController).controller('ShowAllAssetsController', ShowAllAssetsController).controller('ETPController', ETPController).controller('ETPMultiSignController', ETPMultiSignController).controller('DepositController', DepositController).controller('ExplorerController', ExplorerController).directive('bsTooltip', function () {
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
  }).directive('bsPopover', ['$compile', '$timeout', function ($compile, $timeout) {
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
  }]);

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

    /*
          var page = min;
          for (; (page<max) && (!$scope.stopLoad); page++) {
            MetaverseHelperService.LoadTransactions( (err, transactions) => {
              if (err) {
                $translate('MESSAGES.TRANSACTIONS_LOAD_ERROR').then( (data) => FlashService.Error(data) );
                $window.scrollTo(0,0);
              } else {
                if ((transactions.lastpage == true) || (transactions.lastpage == undefined)) {     //All the transactions have been loaded
                  $scope.stopLoad = true;
                }
                transactions.forEach(function(e) {
                  $scope.transactions.push(e);
                });
                //displayUpdatedDates();
                filterTransactions();
              }
              NProgress.done();
            }, 'asset', page);
          }
        }
    */

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
              if (e.attachment.type != 'etp') {
                loadasset(e.attachment.symbol);
              }
              //console.log(e.script);
              //var script = e.script;
              //var occurence = script.match('[' + (/[a-z]|[A-Z]|[0-9]| /g) + '] numequalverify dup hash160 ['+ (/[a-z]|[A-Z]|[0-9]| /g) + '] equalverify checksig');

              //var occurence = script.match(\[([\\w| ]+)\] numequalverify dup hash160 \[[\\w| ]+\] equalverify checksig);
              //console.log(occurence);
              /*var occurences = phraseToSend.match(/[a-z]|[A-Z]| /g);
              if(phraseToSend.length != occurences.length){
                $translate('MESSAGE.WRONG_PRIVATE_KEY').then( (data) => FlashService.Error(data) );
                $window.scrollTo(0,0);
                return;*/
            });

            //Search for the value of the input and put it in $scope.transactionInputsValues
            $scope.transactionInputsValues = [];
            response.data.transaction.inputs.forEach(function (e) {
              if (e.previous_output.hash != '0000000000000000000000000000000000000000000000000000000000000000') {
                //searchInputValue(e.previous_output.hash, e.address, e.previous_output.index); Removed, too slow
              } else {
                  //console.log("It's coming from Deposit interests or Mining");
                }
            });
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
          //Redirect user to the assets page
          $location.path('/asset/myassets');
          //Asset could not be loaded
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
        }
      });
    }

    //Used to find the value of an Input
    function searchInputValue(transaction_hash, address, index) {
      if (typeof transaction_hash !== 'undefined') {
        MetaverseService.FetchTx(transaction_hash).then(function (response) {
          if (typeof response.success == 'undefined' || response.success == false) {
            $scope.noResult = true;
            $translate('MESSAGES.TRANSACTION_NOT_FOUND').then(function (data) {
              FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
          } else {
            response.data.transaction.outputs.forEach(function (e) {
              if (e.address == address && e.index == index) {
                if (e.attachment.type == 'etp') {
                  var input = {
                    "address": address,
                    "value": e.value,
                    "hash": transaction_hash,
                    "index": e.index,
                    "type": e.attachment.type
                  };
                } else {
                  //loadasset(e.attachment.symbol); //already calculated when this asset is an output
                  var input = {
                    "address": address,
                    "value": e.value,
                    "hash": transaction_hash,
                    "index": e.index,
                    "type": e.attachment.type,
                    "quantity": e.attachment.quantity,
                    "symbol": e.attachment.symbol,
                    "decimal_number": $scope.asset.decimal_number
                  };
                }
                $scope.transactionInputsValues.push(input);
              }
            });
          }
        });
      }
    }

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

    $scope.period_select = undefined;
    $scope.assetsIssued = [];
    $scope.balance = [];
    $scope.transactionFee = 0.0001;
    $scope.availableBalance = 0;
    $scope.sendAll = sendAll;

    function init() {
      $scope.deposit_address = "";
      $scope.value = "";
      $scope.password = '';
      $scope.value = '';
      $scope.transactionFee = 0.0001;
    }

    $scope.isNumber = angular.isNumber;

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

    $scope.deposit_options = {
      "DEPOSIT.PERIOD.WEEK": [0.0009589, 0.05, 7],
      "DEPOSIT.PERIOD.MONTH": [0.0066667, 0.08, 30],
      "DEPOSIT.PERIOD.QUARTER": [0.032, 0.128, 90],
      "DEPOSIT.PERIOD.HALF_YEAR": [0.08, 0.16, 182],
      "DEPOSIT.PERIOD.YEAR": [0.2, 0.2, 365]
    };

    $scope.setDepositPeriod = setDepositPeriod;

    //Set the deposit period to use
    function setDepositPeriod(period) {
      $scope.period_select = period;
    }

    function deposit() {
      var credentials = localStorageService.get('credentials');

      if ($scope.password == '') {
        //Check for empty password
        $translate('MESSAGES.PASSWORD_NEEDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if ($scope.password != credentials.password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if (!($scope.value > 0)) {
        $translate('MESSAGES.INVALID_VALUE').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if ($scope.transactionFee < 0.0001) {
        $translate('MESSAGES.TOO_LOW_FEE').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if ($scope.deposit_options[$scope.period_select] == undefined) {
        $translate('MESSAGES.INVALID_TIME_PERIOD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        var deposit_value = ("" + $scope.value * Math.pow(10, $scope.decimal_number)).split(".")[0];
        var fee_value = ("" + $scope.transactionFee * Math.pow(10, $scope.decimal_number)).split(".")[0];

        var SendPromise = $scope.symbol == 'ETP' ? MetaverseService.Deposit($scope.deposit_options[$scope.period_select][2], deposit_value, fee_value, $scope.password, $scope.address_option ? $scope.deposit_address : undefined) : MetaverseService.FrozenAsset($scope.deposit_options[$scope.period_select][2], deposit_value, fee_value, $scope.password, $scope.symbol, $scope.address_option ? $scope.deposit_address : undefined);
        SendPromise.then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success && response.data.error == undefined) {
            init();
            //Transaction was successful
            $translate('MESSAGES.DEPOSIT_SUCCESS').then(function (data) {
              return FlashService.Success(data + response.data.transaction.hash);
            });
            $window.scrollTo(0, 0);
            init();
          } else {

            //Transaction problem
            $translate('MESSAGES.DEPOSIT_ERROR').then(function (data) {
              return FlashService.Error(data);
            });
            $window.scrollTo(0, 0);
            $scope.password = '';
          }
        });
      }
    }

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
    }

    init();
  }

  /**
  * The ETP Controller provides ETP transaction functionality.
  */
  function ETPController(MetaverseService, MetaverseHelperService, $rootScope, $scope, FlashService, localStorageService, $translate, $window) {

    $window.scrollTo(0, 0);
    //Start loading animation
    NProgress.start();

    $scope.transfer = transfer;
    $scope.typeTransaction = "simple", $scope.underlineAuto = 'underline';
    $scope.underlineManual = 'none';
    $scope.autoSelectAddress = true; //Automatically select the address
    $scope.selectAddressAvailable = true; //If we send to more than 1 recipent, sendfrom is not available
    $scope.transactionFee = 0.0001;
    $scope.memo = '';
    $scope.getBalance = getBalance;

    $scope.recipents = [];
    $scope.listAddresses = [];

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
      MetaverseService.ListBalances(true).then(function (response) {
        if (response.success) $scope.from_addresses = response.data.balances;
      });
      $scope.recipents = [];
      $scope.recipents.push({ 'index': 1, 'address': '', 'value': '' });
    }

    $scope.symbol = 'ETP';

    $scope.availBalance = availBalance;
    $scope.availableBalance = 0;
    $scope.sendAll = sendAll;

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

    $scope.addRecipent = function () {
      $scope.recipents.push({ 'index': $scope.recipents.length + 1, 'address': '', 'value': '' });
      $scope.autoSelectAddress = true;
      $scope.underlineAuto = 'underline';
      $scope.underlineManual = 'none';
      $scope.sendfrom = '';
      $scope.selectAddressAvailable = false;
    };

    $scope.removeRecipent = function () {
      $scope.recipents.splice($scope.recipents.length - 1, 1);
      if ($scope.recipents.length == 1) {
        $scope.selectAddressAvailable = true;
      }
    };

    //Transfers ETP
    function transfer() {
      var transactionOK = true;
      //Check for unimplemented parameters
      $scope.recipents.forEach(function (e) {
        if (e.address === '') {
          //Check for recipent address
          $translate('MESSAGES.TRANSACTION_RECIPENT_ADDRESS_NEEDED').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
          transactionOK = false;
        } else if (e.address.length != 34) {
          $translate('MESSAGES.TRANSACTION_RECIPENT_WRONG').then(function (data) {
            return FlashService.Error(data + ' ' + e.index);
          });
          $window.scrollTo(0, 0);
          transactionOK = false;
        } else if (typeof e.value == 'undefined' || e.value === '') {
          //Check for transaction value
          $translate('MESSAGES.TRANSACTION_VALUE_NEEDED').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
          transactionOK = false;
        } else if (e.value > $scope.availableBalance / 100000000 - $scope.transactionFee) {
          //Check for transaction value
          $translate('MESSAGES.TRANSACTION_AMOUNT_NOT_ENOUGH').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
          transactionOK = false;
        }
      });
      if (transactionOK === false) {
        //error already handle
      } else if ($scope.password === '') {
        //Check for empty password
        $translate('MESSAGES.PASSWORD_NEEDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if ($scope.transactionFee < 0.0001) {
        //Check for empty password
        $translate('MESSAGES.TOO_LOW_FEE').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        //Check for password
        if (localStorageService.get('credentials').password != $scope.password) {
          $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        } else if ($scope.recipents.length == 1) {
          //Start transaction for 1 recipent
          transferOne();
        } else {
          //Start transaction with more than 1 recipent
          transferMore();
        }
      }
      $window.scrollTo(0, 0);
    }

    function transferOne() {
      NProgress.start();
      var value = '';
      var sendTo = '';
      var fee = $scope.transactionFee * 100000000;
      $scope.recipents.forEach(function (e) {
        value = e.value;
        sendTo = e.address;
      });

      value *= 100000000;
      value = Math.round(value);
      var SendPromise = $scope.sendfrom ? MetaverseService.SendFrom($scope.sendfrom, sendTo, value, fee, $scope.memo) : MetaverseService.Send(sendTo, value, fee, $scope.memo);
      SendPromise.then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          //Transaction was successful
          $translate('MESSAGES.TRANSFER_SUCCESS').then(function (data) {
            return FlashService.Success(data + response.data.transaction.hash);
          });
          $window.scrollTo(0, 0);
          init();
        } else {
          //Transaction problem
          $translate('MESSAGES.TRANSFER_ERROR').then(function (data) {
            if (response.message != undefined) {
              FlashService.Error(data + " " + response.message);
            } else {
              FlashService.Error(data);
            }
          });
          $window.scrollTo(0, 0);
          $scope.password = '';
        }
      });
    }

    function transferMore() {
      NProgress.start();
      var recipentsQuery = []; //data that will be used for the query
      var fee = $scope.transactionFee * 100000000;

      $scope.recipents.forEach(function (e) {
        var value = e.value;
        value *= 100000000;
        value = Math.round(value);
        recipentsQuery.push({
          "address": e.address,
          "value": value
        });
      });

      var SendPromise = MetaverseService.SendMore(recipentsQuery, fee);
      SendPromise.then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          //Transaction was successful
          $translate('MESSAGES.TRANSFER_SUCCESS').then(function (data) {
            return FlashService.Success(data + response.data.transaction.hash);
          });
          $window.scrollTo(0, 0);
          init();
        } else {
          //Transaction problem
          $translate('MESSAGES.TRANSFER_ERROR').then(function (data) {
            if (response.message != undefined) {
              FlashService.Error(data + " " + response.message);
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
        $scope.availableBalance = $scope.addresses[address].balance - $scope.addresses[address].frozen;
      }
    }

    function sendAll() {
      $scope.recipents[0].value = ($scope.availableBalance - 100000000 * $scope.transactionFee) / 100000000;
    }

    //Load a list of all transactions
    /*MetaverseHelperService.LoadTransactions( (err, transactions) => {
      if (err) {
        $translate('MESSAGES.TRANSACTIONS_LOAD_ERROR').then( (data) => FlashService.Error(data) );
      } else {
        $scope.transactions = transactions;
      }
      NProgress.done();
    }, 'etp');*/

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
            /*$scope.addresses[e.balance.address] = parseInt(e.balance.unspent);
            console.log($scope.addresses[e.balance.address]);
            $scope.addresses.push({
              "balance": parseInt(e.balance.unspent),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen,
              "type": "single"
            });*/
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
  function ETPMultiSignController(MetaverseService, MetaverseHelperService, $rootScope, $scope, FlashService, localStorageService, $translate, $window) {

    $window.scrollTo(0, 0);
    //Start loading animation
    NProgress.start();

    $scope.underlineAuto = 'underline';
    $scope.underlineManual = 'none';
    $scope.autoSelectAddress = false; //Automatically select the address

    $scope.displayEmptyAdresses = false;

    $scope.recipents = [];

    $scope.getPublicKey = getPublicKey;
    $scope.publicKey = '';
    $scope.cosigners = [];
    $scope.getNewMultisign = getNewMultisign;
    $scope.nbrCosignersRequired = 0;

    $scope.availableBalance = 0;

    $scope.sendAllMultisig = sendAllMultisig;
    $scope.transactionFee = 0.0001;
    $scope.listAddresses = []; //List of addresses


    $scope.listMultiSig = [];
    $scope.selectedMutliSigAddress = [];
    $scope.setMultiSigAddress = setMultiSigAddress;
    $scope.createMultisigTx = createMultisigTx;
    $scope.transferSuccess = false; //Change to True after a successful transaction
    $scope.resultCreateTx = '';
    $scope.signMultisigTx = signMultisigTx;

    // Initializes all transaction parameters with empty strings.
    function init() {
      $scope.sendfrom = '';
      $scope.sendto = '';
      $scope.fee = '';
      $scope.message = '';
      $scope.value = '';
      $scope.password = '';
      $scope.availableBalance = 0;
      $scope.publicKey = '';
      MetaverseService.ListBalances(true).then(function (response) {
        if (response.success) $scope.from_addresses = response.data.balances;
      });
      $scope.recipents = [];
      $scope.recipents.push({ 'index': 1, 'address': '', 'value': '' });
      $scope.cosigners = [];
      $scope.cosigners.push({ 'index': 1, 'publicKey': '' });
      $scope.nbrCosignersRequired = 0;
      $scope.selectedMutliSigAddress = [];
      $scope.transferSuccess = false;
      $scope.resultCreateTx = '';
    }

    function setMultiSigAddress(mutliSig) {
      $scope.selectedMutliSigAddress = mutliSig;
    }

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
      $scope.cosigners.push({ 'index': $scope.cosigners.length + 1, 'publicKey': '' });
    };

    $scope.removeCoSigner = function () {
      $scope.cosigners.splice($scope.cosigners.length - 1, 1);
    };

    function getNewMultisign() {
      NProgress.start();
      var transactionOK = true;
      //Check for unimplemented parameters
      $scope.cosigners.forEach(function (e) {
        if (e.publicKey.length != 66) {
          //Check for public keys
          $translate('MESSAGES.CREATE_MULTISIGNATURE_WRONG_PUBLIC_KEY').then(function (data) {
            return FlashService.Error(data + ' ' + e.index);
          });
          $window.scrollTo(0, 0);
          transactionOK = false;
        }
      });

      if (transactionOK == false) {
        //error already handle
      } else if ($scope.password === '') {
        //Check for empty password
        $translate('MESSAGES.PASSWORD_NEEDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        var SendPromise = MetaverseService.GetNewMultiSig($scope.nbrCosignersRequired, $scope.cosigners.length + 1, $scope.publicKey, $scope.cosigners);
        SendPromise.then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success) {
            //Creation was successful
            $translate('MESSAGES.CREATE_MULTISIGNATURE_SUCCESS').then(function (data) {
              return FlashService.Success(data + " " + response.data.address);
            });
            $window.scrollTo(0, 0);
            init();
          } else {
            //Transaction problem
            $translate('MESSAGES.CREATE_MULTISIGNATURE_ERROR').then(function (data) {
              if (response.message != undefined) {
                FlashService.Error(data + " " + response.message);
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
      NProgress.done();
    }

    //Used to dynamically update the number of signature required
    $scope.getNumber = function (num) {
      return new Array(num);
    };

    MetaverseHelperService.GetBalance(function (err, balance, message) {
      if (err) {
        FlashService.Error(message);
        $window.scrollTo(0, 0);
      } else {
        $scope.balance = balance;
      }
    });

    /*function listMultiSign() {
      NProgress.start();
      //Load users ETP balance
      //Load the addresses and their balances
      MetaverseService.ListBalances()
      .then( (response) => {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.addresses = [];
          response.data.balances.forEach( (e) => {
            var name = "New address";
            if (localStorageService.get(e.balance.address) != undefined) {
              name = localStorageService.get(e.balance.address);
            }
            $scope.addresses[e.balance.address] = parseInt(e.balance.unspent);
            $scope.addresses.push({
              "balance": parseInt(e.balance.unspent),
              "address": e.balance.address,
              "name": name,
              "frozen": e.balance.frozen
            });
          });
           //After loading the balances, we load the multisig addresses
          MetaverseService.ListMultiSig()
          .then( (response) => {
            if (typeof response.success !== 'undefined' && response.success) {
              if(response.data.multisig != "") {    //if the user has already at least 1 multisignature address
                response.data.multisig.forEach( (e) => {
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
                    "balance": $scope.addresses[e.address],
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
    }*/

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

    function createMultisigTx(sendFrom, sendTo, quantity, transactionFee) {
      var quantityToSend = ("" + quantity * Math.pow(10, 8)).split(".")[0];
      var transactionFeeToSend = ("" + transactionFee * Math.pow(10, 8)).split(".")[0];
      //var quantityToSend = Math.round(quantity);
      //quantity = Math.round(quantity);
      if ($scope.password === '') {
        //Check for empty password
        $translate('MESSAGES.PASSWORD_NEEDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if (quantityToSend > $scope.availableBalance - transactionFeeToSend) {
        $translate('MESSAGES.TRANSACTION_AMOUNT_NOT_ENOUGH').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        MetaverseService.CreateMultisigTx(sendFrom, sendTo, quantityToSend, transactionFeeToSend).then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success) {
            //Transaction was successful
            $translate('MESSAGES.CREATE_MULTISIGNATURE_SUCCESS').then(function (data) {
              return FlashService.Success(data);
            });
            $window.scrollTo(0, 0);
            init();
            $scope.transferSuccess = true;
            $scope.resultCreateTx = response.data;
          } else {
            //Transaction problem
            $translate('MESSAGES.CREATE_MULTISIGNATURE_ERROR').then(function (data) {
              if (response.message != undefined) {
                FlashService.Error(data + " " + response.message);
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
    }

    function sendAllMultisig() {
      $scope.quantity = ($scope.availableBalance - $scope.transactionFee * 100000000) / 100000000;
    }

    function signMultisigTx(message, lastTx) {
      MetaverseService.SignMultisigTx(message, lastTx).then(function (response) {
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
          $scope.resultSignTx = response.data;
        } else {
          //Transaction problem
          $translate('MESSAGES.SIGN_ERROR').then(function (data) {
            if (response.message != undefined) {
              FlashService.Error(data + " " + response.message);
            } else {
              FlashService.Error(data);
            }
          });
          $window.scrollTo(0, 0);
          $scope.password = '';
        }
      });
    }

    listMultiSign();

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
          response.data.balances.forEach(function (e) {
            var name = localStorageService.get(e.balance.address);
            if (name == undefined) {
              name = "New Address";
            }
            $scope.addresses.push({
              "balance": parseInt(e.balance.unspent),
              "address": e.balance.address,
              "frozen": e.balance.frozen,
              "name": name,
              "edit": false
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
  }

  function AccountController(MetaverseService, $translate, $rootScope, $scope, FlashService, $location, localStorageService, $window, FileSaver, Blob) {

    $window.scrollTo(0, 0);
    $scope.showprivatekey = showprivatekey;
    $scope.changepassword = changepassword;
    $scope.exportAccount = exportAccount;
    $scope.accountname = localStorageService.get('credentials').user;
    $scope.debugState = MetaverseService.debug;
    $scope.path = "";

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

    /*function exportAccount(password, last_word) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then( (data) => FlashService.Error(data) );
        $window.scrollTo(0,0);
      } else {
        NProgress.start();
        MetaverseService.ExportAccountAsFile(password, last_word)
        .then( (response) => {
          if (typeof response.success !== 'undefined' && response.success) {
            //Show success message
            download(response.data.result, localStorageService.get('credentials').user);
            $translate('MESSAGES.EXPORT_ACCOUNT_FILE_SUCCESS').then( (data) => {
              FlashService.Success(data);
            });
            $window.scrollTo(0,0);
          } else {
            //Show export error
            $translate('MESSAGES.EXPORT_ACCOUNT_FILE_ERROR').then( (data) => {
              if (response.message != undefined) {
                FlashService.Error(data + " " + response.message);
              } else {
                FlashService.Error(data);
              }
            });
            $window.scrollTo(0,0);
          }
          NProgress.done();
        });
      }
    }
     new Blob(['text'], { type: 'text/plain;charset=utf-8' });
     $scope.download = download;
      function download(text, fileName) {
      var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(data, fileName+'.txt');
    };*/

    function exportAccount(password, last_word, path) {
      if (localStorageService.get('credentials').password != password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if (path.split(" ").length > 1) {
        $translate('MESSAGES.CONTAINS_SPACE').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        NProgress.start();
        MetaverseService.ExportAccountAsFile(password, last_word, path).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            //Show success message
            $translate('MESSAGES.EXPORT_ACCOUNT_FILE_SUCCESS').then(function (data) {
              FlashService.Success(data);
            });
            $window.scrollTo(0, 0);
          } else {
            //Show export error
            $translate('MESSAGES.EXPORT_ACCOUNT_FILE_ERROR').then(function (data) {
              if (response.message != undefined) {
                FlashService.Error(data + " " + response.message);
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
    $scope.symbol = $filter('uppercase')($location.path().split('/')[2]);
    $scope.sender_address = $stateParams.sender_address;
    $scope.sendasset = sendasset;

    $scope.underlineAuto = 'underline';
    $scope.underlineManual = 'none';
    $scope.autoSelectAddress = true; //Automatically select the address

    $scope.assetsIssued = [];

    $scope.allAddresses = []; //Contains the list of all the addresses
    $scope.assetAddresses = []; //Contrain the asset balance of each address
    $scope.listBalances = listBalances;
    $scope.listAssetBalances = listAssetBalances;

    $scope.availBalance = availBalance;
    $scope.availableBalance = 0;
    $scope.sendAll = sendAll;

    // Initializes all transaction parameters with empty strings.
    function init() {
      $scope.sendfrom = '';
      $scope.sendto = '';
      $scope.fee = '';
      $scope.message = '';
      $scope.value = '';
      $scope.password = '';
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
                "decimal_number": e.decimal_number
              });
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
    });

    function selectAssetType(symbol) {
      $scope.symbol = symbol;
    }

    //We first load the list of all the addresses
    function listBalances() {
      NProgress.start();
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.allAddresses = [];
          response.data.balances.forEach(function (e) {
            $scope.allAddresses.push({
              "address": e.balance.address
            });
          });
          listAssetBalances();
        } else {
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        NProgress.done();
      });
    }

    listBalances();

    function listAssetBalances() {
      NProgress.start();
      $scope.assetAddresses = [];
      $scope.allAddresses.forEach(function (e) {
        MetaverseService.GetAddressAsset(e.address).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success && response.data.assets != '') {
            //If the address doesn't contain any asset, we don't need it
            response.data.assets.forEach(function (a) {
              if (a.symbol == $scope.symbol) {
                var name = "New address";
                if (localStorageService.get(a.address) != undefined) {
                  name = localStorageService.get(a.address);
                }
                a.name = name;
                $scope.assetAddresses.push(a);
              }
            });
          }
        });
      });
      NProgress.done();
    }

    //Loads a given asset
    function loadasset(symbol) {
      MetaverseService.GetAsset(symbol).then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.asset = response.data.assets[0];
          $scope.assetsIssued.forEach(function (a) {
            if (a.symbol == symbol) {
              $scope.asset.quantity = a.quantity;
              $scope.availableBalance = a.quantity;
            }
          });
        } else {
          //Redirect user to the assets page
          $location.path('/asset/myassets');
          //Asset could not be loaded
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
        }
      });
    }

    function sendasset(recipent_address, symbol, quantity) {
      if (localStorageService.get('credentials').password != $scope.password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if ($scope.recipent_address == undefined) {
        $translate('MESSAGES.TRANSACTION_RECIPENT_ADDRESS_NEEDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if ($scope.recipent_address.length != 34) {
        $translate('MESSAGES.TRANSACTION_RECIPENT_WRONG').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if ($scope.quantity == undefined || !($scope.quantity > 0)) {
        $translate('MESSAGES.TRANSACTION_VALUE_NEEDED').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else if ($scope.recipent_address.charAt(0) == '3') {
        $translate('MESSAGES.TRANSACTION_ASSET_MULTISIG').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        //Modify number to fit to number of decimals defined for asset
        quantity *= Math.pow(10, $scope.asset.decimal_number);
        var SendPromise = $scope.sendfrom ? MetaverseService.SendAssetFrom($scope.sendfrom, recipent_address, symbol, quantity) : MetaverseService.SendAsset(recipent_address, symbol, quantity);
        SendPromise.then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success) {
            $translate('MESSAGES.ASSETS_TRANSFER_SUCCESS').then(function (data) {
              FlashService.Success(data + response.data.transaction.hash, true);
              //Redirect user to the assets page
              $location.path('/asset/myassets');
            });
          } else {
            //Show asset load error
            $translate('MESSAGES.ASSETS_TRANSFER_ERROR').then(function (data) {
              return FlashService.Error(data + " " + response.message);
            });
            $window.scrollTo(0, 0);
          }
        });
      }
    }

    function availBalance(address) {
      if (address == '') {
        $scope.availableBalance = $scope.asset.quantity;
      } else {
        $scope.assetAddresses.forEach(function (a) {
          if (a.address == address) {
            $scope.availableBalance = a.quantity; // - a.frozen;
          }
        });
      }
    }

    function sendAll() {
      //$scope.quantity = $scope.availableBalance/$scope.asset.decimal_number;
      $scope.quantity = parseFloat($scope.availableBalance) / Math.pow(10, $scope.asset.decimal_number);
    }

    init();
    loadasset($scope.symbol);
  }

  function ShowAllAssetsController(MetaverseService, $rootScope, $scope, $location, FlashService, $translate, $stateParams, $window) {

    $window.scrollTo(0, 0);
    $scope.symbol = $stateParams.symbol;
    $scope.assets = [];
    //$scope.issue = issue;

    //Load assets
    NProgress.start();
    MetaverseService.ListAllAssets().then(function (response) {
      NProgress.done();
      if (typeof response.success !== 'undefined' && response.success) {
        $scope.assets = [];
        $scope.assets = response.data.assets;
        //All the details are hidden at the loading
        $scope.assets.forEach(function (a) {
          if (a != undefined) {
            a.details = false;
          }
        });
      } else {
        $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
          //Show asset load error
          FlashService.Error(data);
          //Redirect user to the assets page
          $location.path('/asset/myassets');
        });
      }
    });

    //If asset is defined -> load it
    /*if ($scope.symbol != undefined && $scope.symbol != "") {
      NProgress.start();
      loadasset($scope.symbol);
    }*/

    /*function issue(symbol) {
      NProgress.start();
      MetaverseService.Issue(symbol)
      .then( (response) => {
        if (typeof response.success !== 'undefined' && response.success) {
          loadasset($scope.symbol);
          $translate('MESSAGES.ASSETS_ISSUE_SUCCESS').then( (data) => FlashService.Success(data) );
        } else {
          $translate('MESSAGES.ASSETS_ISSUE_ERROR').then( (data) => FlashService.Error(data) );
        }
        NProgress.done();
      });
    }*/

    //Loads a given asset
    /*function loadasset(symbol) {
      NProgress.start();
      MetaverseService.GetAsset(symbol)
      .then( (response) => {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.asset = response.data.assets[0];
          $scope.assets.forEach( (a) => {
            if (a.symbol == symbol) {
              $scope.asset.quantity = a.quantity;
            }
          });
        } else {
          //Asset could not be loaded
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then( (data) => FlashService.Error(data) );
        }
      });
      NProgress.done();
    }*/
  }

  function ShowAssetsController(MetaverseService, $rootScope, $scope, localStorageService, FlashService, $translate, $stateParams, $location, $window, ngDialog) {

    $window.scrollTo(0, 0);
    $scope.symbol = $stateParams.symbol;
    $scope.assets = [];
    $scope.issue = issue;
    $scope.secondIssue = secondIssue;
    $scope.deleteAsset = deleteAsset;
    $scope.editMaxSupply = false;
    $scope.enableEditAssetMaxSupply = enableEditAssetMaxSupply;
    $scope.endEditAssetMaxSupply = endEditAssetMaxSupply;
    $scope.cancelEditAssetMaxSupply = cancelEditAssetMaxSupply;
    $scope.increase_maximum_supply = 0; //the maximum supply increase
    $scope.owner = false; //true if the user is the owner of this asset

    $scope.listBalances = listBalances;
    $scope.listAssetBalances = listAssetBalances;
    $scope.enableEditAddressName = enableEditAddressName;
    $scope.endEditAddressName = endEditAddressName;
    $scope.cancelEditAddressName = cancelEditAddressName;
    $scope.showqr = showqr;
    $scope.buttonCopyToClipboard = new Clipboard('.btn');

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

    //Load assets
    NProgress.start();
    MetaverseService.ListAssets().then(function (response) {
      NProgress.done();
      if (response.data.assets != "") {
        //if the user has some assets
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.assets = [];
          $scope.assets = response.data.assets;
          //If asset is defined -> load it
          if ($scope.symbol != undefined && $scope.symbol != "") {
            NProgress.start();
            loadasset($scope.symbol);
          }
        } else {
          //Redirect user to the assets page
          $location.path('/asset/myassets');
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
    });

    function issue(symbol) {
      NProgress.start();
      MetaverseService.Issue(symbol).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          loadasset($scope.symbol);
          $translate('MESSAGES.ASSETS_ISSUE_SUCCESS').then(function (data) {
            return FlashService.Success(data);
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

    function secondIssue(symbol, increase_maximum_supply, decimal_number) {
      NProgress.start();
      increase_maximum_supply *= Math.pow(10, decimal_number);
      if (increase_maximum_supply < 0) {
        $translate('MESSAGES.ASSETS_SECOND_ISSUE_ERROR').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      }
      MetaverseService.SecondIssue(symbol, increase_maximum_supply).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          loadasset($scope.symbol);
          $translate('MESSAGES.ASSETS_SECOND_ISSUE_SUCCESS').then(function (data) {
            return FlashService.Success(data);
          });
          $window.scrollTo(0, 0);
        } else {
          $translate('MESSAGES.ASSETS_SECOND_ISSUE_ERROR').then(function (data) {
            return FlashService.Error(data + ' ' + response.message);
          });
          $window.scrollTo(0, 0);
        }
        NProgress.done();
      });
    }

    //Loads a given asset, used in the page asset/details
    function loadasset(symbol) {
      MetaverseService.GetAsset(symbol).then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.asset = response.data.assets[0];
          if ($scope.asset.issuer == localStorageService.get('credentials').user) {
            $scope.owner = true;
          }
          $scope.initial_maximum_supply = parseFloat($scope.asset.maximum_supply) / Math.pow(10, $scope.asset.decimal_number);
          $scope.current_maximum_supply = $scope.initial_maximum_supply;
          $scope.new_maximum_supply = $scope.initial_maximum_supply;
          $scope.details = false;
          $scope.assets.forEach(function (a) {
            if (a.symbol == symbol) {
              $scope.asset.quantity = a.quantity;
            }
          });
        } else {
          //Asset could not be loaded
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        NProgress.done();
      });
    }

    //We first load the list of all the addresses
    function listBalances() {
      NProgress.start();
      MetaverseService.ListBalances().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.allAddresses = [];
          response.data.balances.forEach(function (e) {
            $scope.allAddresses.push({
              "address": e.balance.address
            });
          });
          listAssetBalances();
        } else {
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        NProgress.done();
      });
    }

    listBalances();

    function listAssetBalances() {
      NProgress.start();
      $scope.assetAddresses = [];
      $scope.allAddresses.forEach(function (e) {
        MetaverseService.GetAddressAsset(e.address).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success && response.data.assets != '') {
            //If the address doesn't contain any asset, we don't need it
            response.data.assets.forEach(function (a) {
              if (a.symbol == $scope.symbol) {
                var name = "New address";
                if (localStorageService.get(a.address) != undefined) {
                  name = localStorageService.get(a.address);
                }
                a.name = name;
                a.edit = false;
                $scope.assetAddresses.push(a);
              }
            });
          }
        });
      });
      NProgress.done();
    }

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

    //Delete a not issued Asset
    function deleteAsset(symbol) {
      MetaverseService.Delete(symbol).then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          $translate('MESSAGES.ASSETS_DELETE_SUCCESS').then(function (data) {
            return FlashService.Success(data, true);
          });
          $window.scrollTo(0, 0);
          $location.path('/asset/myassets');
        } else {
          //Asset could not be delete
          $translate('MESSAGES.ASSETS_DELETE_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
    }

    //Enable the edition of the Address Name
    function enableEditAssetMaxSupply() {
      $scope.editMaxSupply = true;
    }

    //Save the edited name in the local storage
    function endEditAssetMaxSupply() {
      $scope.editMaxSupply = false;
    }

    //Cancel the change
    function cancelEditAssetMaxSupply() {
      $scope.increase_maximum_supply = 0;
      $scope.editMaxSupply = false;
    }

    //Close the pop-up after asset creation
    $scope.closeAll = function () {
      ngDialog.closeAll();
    };
  }

  function CreateAssetController(MetaverseService, $rootScope, $scope, FlashService, localStorageService, $location, $translate, $window, ngDialog) {

    $window.scrollTo(0, 0);
    //This object contains all form errors
    $scope.error = {};
    //Function to create a new asset
    $scope.createasset = createasset;
    $scope.popupIssue = popupIssue;
    $scope.issue = issue;

    //Initialize form data
    function init() {
      $scope.symbol = '';
      $scope.description = '';
      $scope.max_supply = 0;
      $scope.secondary_offering = 0;
      $scope.decimals = '';
      $scope.password = '';
    }

    init();

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

    //Check if the max_supply is valid
    $scope.$watch('max_supply', function (newVal, oldVal) {
      $scope.error.max_supply = newVal == undefined || !(newVal == parseInt(newVal));
      checkready();
    });

    //Check if the symbol is valid
    $scope.$watch('symbol', function (newVal, oldVal) {
      $scope.error.symbol = newVal == undefined || !newVal.match(/^[0-9A-Za-z.]+$/);
      checkready();
    });

    //Check if the decimals is valid
    $scope.$watch('decimals', function (newVal, oldVal) {
      $scope.error.decimals = newVal == undefined || !(newVal >= 0 && newVal <= 8);
      checkready();
    });

    //Check if the description is valid
    $scope.$watch('description', function (newVal, oldVal) {
      $scope.error.description = newVal == undefined || !(newVal.length > 0);
      checkready();
    });

    //Check if the password is valid
    $scope.$watch('password', function (newVal, oldVal) {
      $scope.error.password = newVal == undefined || !(newVal.length >= 6) || !(localStorageService.get('credentials').password == $scope.password);
      checkready();
    });

    //Define the range used for the secondary offering
    $scope.range = function (min, max, step) {
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) {
        input.push(i);
      }
      return input;
    };

    //Create asset function
    function createasset() {
      if (localStorageService.get('credentials').password != $scope.password) {
        $translate('MESSAGES.WRONG_PASSWORD').then(function (data) {
          return FlashService.Error(data);
        });
        $window.scrollTo(0, 0);
      } else {
        NProgress.start();
        //Let Metaverse create an local asset
        MetaverseService.CreateAsset($scope.symbol, $scope.max_supply, $scope.secondary_offering, $scope.decimals, $scope.description).then(function (response) {
          NProgress.done();
          if (typeof response.success !== 'undefined' && response.success) {
            //Show success message
            popupIssue($scope.symbol);
            $translate('MESSAGES.ASSSET_CREATED_LOCAL_SUCCESS').then(function (data) {
              FlashService.Success(data, true);

              //Redirect user to the assets page
              //$location.path('/asset/myassets');
            });
            $window.scrollTo(0, 0);
          } else {
            //$translate('MESSAGES.ASSETS_CREATE_ERROR').then( (data) => FlashService.Error(data) );
            $translate('MESSAGES.ASSETS_CREATE_ERROR').then(function (data) {
              return FlashService.Error(data + ' ' + response.message);
            });
            $window.scrollTo(0, 0);
          }
        });
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
            return FlashService.Success(data);
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

    //$scope.setDates = setDates;
    //$scope.displayUpdatedDates = displayUpdatedDates;
    //$scope.showHistory = false;


    $scope.assetType = 'ALL';
    $scope.filterOnAsset = filterOnAsset;

    $scope.loadTransactions = loadTransactions;
    $scope.loadMore = loadMore;
    $scope.stopLoad = false;
    $scope.page = 3; //By default, we load the 2 first pages

    //For unfrozen calculation time
    //$scope.averageBlockTime = 0;


    function filterOnAsset(asset) {
      $scope.assetType = asset;
      filterTransactions();
      //displayUpdatedDates();
    }

    function filterTransactions() {
      $scope.transactionsFiltered = [];
      if ($scope.assetType == 'ALL') {
        $scope.transactionsFiltered = $scope.transactions;
      } else {
        $scope.transactions.forEach(function (e) {
          if (e.type == $scope.assetType) {
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
      if (response.data.assets != "") {
        //if the user has some assets
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.assets = response.data.assets;
        } else {
          $translate('MESSAGES.ASSETS_LOAD_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      } else {
        //the user has no asset
        $scope.assets = "";
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
                    //console.log("Days:", e.availableInTimeDays);
                    //console.log("Hours:", e.availableInTimeHours);
                  } else {                //If the Frozen ETP are not unlocked
                    e.availableInBlock = 0;
                  }*/
                });
              }

              $scope.transactions.push(e);
            });
            //displayUpdatedDates();
            filterTransactions();
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

    var ws = new WebSocket('ws://localhost:8820/ws');
    //var ws = new WebSocket('ws://' + MetaverseService.SERVER + '/ws');

    $("#inputField").focus();

    $scope.showConnected = false;
    $scope.index = 0;

    ws.onmessage = function (ev) {
      $scope.showConnected = true;
      $scope.index++;
      NProgress.done();
      $scope.consolelog.push({
        query: $scope.querystring,
        answer: ev.data,
        index: $scope.index
      });

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
      NProgress.start();
      ws.send($scope.querystring);
    };

    /***Mining***/
    $scope.start = StartMining;
    $scope.stop = StopMining;
    $scope.status = {};
    $scope.isMining = false;

    function GetMiningInfo() {
      NProgress.start();
      MetaverseService.GetMiningInfo().then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.status = response.data['mining-info'];
          $scope.isMining = response.data['mining-info'].status === 'true'; //Convert string to boolean
        } else {
          $translate('MESSAGES.MINING_STATUS_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
    }

    function StartMining() {
      NProgress.start();
      MetaverseService.Start().then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          $translate('MESSAGES.MINING_START_SUCCESS').then(function (data) {
            return FlashService.Success(data);
          });
          $window.scrollTo(0, 0);
          GetMiningInfo();
        } else {
          $translate('MESSAGES.MINING_START_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
    }

    function StopMining() {
      NProgress.start();
      MetaverseService.Stop().then(function (response) {
        NProgress.done();
        if (typeof response.success !== 'undefined' && response.success) {
          $translate('MESSAGES.MINING_STOP_SUCCESS').then(function (data) {
            return FlashService.Success(data);
          });
          $window.scrollTo(0, 0);
          GetMiningInfo();
        } else {
          $translate('MESSAGES.MINING_STOP_ERROR').then(function (data) {
            return FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
      });
    }

    GetMiningInfo();
  }

  function HomeController(MetaverseService, $rootScope, $scope, localStorageService, $interval, $translate, $location, $filter) {

    var vm = this;
    vm.account = localStorageService.get('credentials').user;
    $scope.height = '';
    $scope.assets = [];
    $scope.language = localStorageService.get('language');

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
      MetaverseService.FetchHeight().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          $scope.height = response.data;
          $rootScope.height = response.data;
        }
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
      } else if (search.length === 34) {
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
            //Show asset load error
            FlashService.Error(data);
          });
          $window.scrollTo(0, 0);
        }
        $location.path(path);
      });
      NProgress.done();
    }
  }
})();

(function () {
  'use strict';

  angular.module('app').controller('LoginController', LoginController);

  LoginController.$inject = ['$location', 'MetaverseService', 'FlashService', 'localStorageService', '$interval', '$translate', '$window'];

  function LoginController($location, MetaverseService, FlashService, localStorageService, $interval, $translate, $window) {
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

    function updateHeight() {
      MetaverseService.FetchHeight().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          vm.height = response.data;
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

    //Test runned on port 3000, via Grunt
    var SERVER = window.location.hostname + ":8820";

    //Replaced via the Gruntfile to the port 8820 in Live
    //var SERVER = window.location.hostname+":8820";
    //If we want to change the port, don't forget to change it in home.controller.0.7.1.js for the Console!

    var RPC_URL = 'http://' + SERVER + '/rpc';

    service.debug = false;

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
    service.ExportAccountAsFile = ExportAccountAsFile;
    service.ImportAccountFromFile = ImportAccountFromFile;

    service.SERVER = SERVER;

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
    service.SendAssetFrom = SendAssetFrom;
    service.SendAsset = SendAsset;
    service.Issue = Issue;
    service.SecondIssue = SecondIssue;
    service.Delete = Delete;

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

    return service;

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

    function ExportAccountAsFile(password, last_word, path) {
      var credentials = localStorageService.get('credentials');
      return _send('exportaccountasfile', [credentials.user, password, last_word, path]);
    }

    function ImportAccountFromFile(path, password) {
      return _send('importaccountfromfile', [path, password]);
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
    function Send(recipent, quantity, transactionFee, memo) {
      var credentials = localStorageService.get('credentials');
      if (memo == '') {
        return _send('send', [credentials.user, credentials.password, recipent, quantity, '-f', transactionFee]);
      } else {
        return _send('send', [credentials.user, credentials.password, recipent, quantity, '-f', transactionFee, '-m', memo]);
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
    function SendFrom(sender, recipent, quantity, transactionFee, memo) {
      var credentials = localStorageService.get('credentials');
      if (memo == '') {
        return _send('sendfrom', [credentials.user, credentials.password, sender, recipent, quantity, '-f', transactionFee]);
      } else {
        return _send('sendfrom', [credentials.user, credentials.password, sender, recipent, quantity, '-f', transactionFee, '-m', memo]);
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
    function SendMore(recipents, transactionFee) {
      var credentials = localStorageService.get('credentials');
      var query = [];
      var recipent = '';
      query.push(credentials.user);
      query.push(credentials.password);
      query.push('-f');
      query.push(transactionFee);
      recipents.forEach(function (e) {
        recipent = e.address + ':' + e.value;
        query.push('-r');
        query.push(recipent);
      });
      return _send('sendmore', query);
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
    function CreateAsset(symbol, max_supply, secondary_offering, decimal_number, description) {
      max_supply *= Math.pow(10, decimal_number);
      var credentials = localStorageService.get('credentials');
      return _send('createasset', [credentials.user, credentials.password, '-s', symbol, '-v', max_supply, '-n', decimal_number, '-d', description]);
      //return _send('createasset', [credentials.user, credentials.password, '-s', symbol, '-v', max_supply, '-r', secondary_offering, '-n',decimal_number, '-d', description]);
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
      return _send('issue', [credentials.user, credentials.password, symbol]);
    }

    function SecondIssue(symbol, increase_maximum_supply) {
      var credentials = localStorageService.get('credentials');
      return _send('secondissue', [credentials.user, credentials.password, symbol, increase_maximum_supply]);
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
      return _send('deleteunissuedasset', ['-s', symbol, credentials.user, credentials.password]);
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
      var credentials = localStorageService.get('credentials');
      return _send('getasset', [credentials.user, credentials.password, symbol]);
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

    /**
     * @api {post} /rpc Send asset
     * @apiName Send asset
     * @apiGroup Assets
     *
     * @apiDescription Sends an asset to a specified address.
     *
     * @apiParam {Const} method sendasset
     * @apiParam {List} params [username, password, recipent_address, symbol, quantity]
     *
     **/
    function SendAsset(recipent_address, symbol, quantity) {
      var credentials = localStorageService.get('credentials');
      return _send('sendasset', [credentials.user, credentials.password, recipent_address, symbol, quantity]);
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
        return _send('deposit', ['-d', deposit_period, '-a', address, '-f', transactionFee, credentials.user, password, amount]);
        //return _send('deposit', ['-d', deposit_period, '-a', address, credentials.user, password, amount]);
      } else {
        return _send('deposit', ['-d', deposit_period, '-f', transactionFee, credentials.user, password, amount]);
        //return _send('deposit', ['-d', deposit_period, credentials.user, password, amount]);
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

    /**
     * @api {post} /rpc Send asset from
     * @apiName Send asset from
     * @apiGroup Assets
     *
     * @apiDescription Sends an asset from a specified address.
     *
     * @apiParam {Const} method sendassetfrom
     * @apiParam {List} params [username, password, sender_address, recipent_address, symbol, quantity]
     *
     **/
    function SendAssetFrom(sender_address, recipent_address, symbol, quantity) {
      var credentials = localStorageService.get('credentials');
      return _send('sendassetfrom', [credentials.user, credentials.password, sender_address, recipent_address, symbol, quantity]);
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
      return _send('getnewmultisig', query);
    }

    function ListMultiSig() {
      var credentials = localStorageService.get('credentials');
      return _send('listmultisig', [credentials.user, credentials.password]);
    }

    function CreateMultisigTx(fromAddress, toAddress, amount, transactionFee) {
      var credentials = localStorageService.get('credentials');
      return _send('createmultisigtx', [credentials.user, credentials.password, fromAddress, toAddress, amount, '-f', transactionFee]);
    }

    function SignMultisigTx(message, lastTx) {
      var credentials = localStorageService.get('credentials');
      if (lastTx) {
        return _send('signmultisigtx', [credentials.user, credentials.password, message, '-b']);
      } else {
        return _send('signmultisigtx', [credentials.user, credentials.password, message]);
      }
    }

    function CheckAccount(user, password) {
      //To check if account exists we can simply check the accounts balance
      return _send('getbalance', [user, password]);
    }

    function ImportAccount(user, password, phrase, address_count) {
      return _send('importaccount', ['-n', user, '-p', password, '-i', address_count, phrase]);
      //return this.Query('importaccount --accoutname ' + user + ' --password ' + password + ' -i' + address_count + ' ' + phrase);
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
          if (output.attachment.type === 'asset-transfer') result = TX_TYPE_ASSET;
          if (output.attachment.type === 'asset-issue') result = TX_TYPE_ISSUE;
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
                "value": 0
              };
              switch (determineTransactionType(e)) {
                case TX_TYPE_ETP:
                  //ETP transaction handling
                  transaction.type = 'ETP';
                  transaction.asset_type = 8;
                  e.outputs.forEach(function (output) {
                    if (typeof output.script != 'undefined' && output.script.match(/\[ (\w+) ] numequalverify dup hash160 \[ (\w+) \] equalverify checksig/) != null) {
                      transaction.frozen = true;
                      transaction.recipents.push({
                        "address": output.address,
                        "value": parseInt(output['etp-value']),
                        "script": output.script
                      });
                      transaction.value += parseInt(output['etp-value']);
                    } else if (transaction.direction === 'receive' && output.own === 'true' || transaction.direction === 'send' && output.own === 'false') {
                      transaction.frozen = false;
                      transaction.recipents.push({
                        "address": output.address,
                        "value": parseInt(output['etp-value']),
                        "script": output.script
                      });
                      transaction.value += parseInt(output['etp-value']);
                    }
                  });
                  if (transaction.value) {
                    transactions.push(transaction);
                  } else {
                    //console.log(transaction);
                  }
                  break;
                case TX_TYPE_ASSET:
                  //Asset transactions
                  e.outputs.forEach(function (output) {
                    if (transaction.direction === 'receive' && output.own === 'true' || transaction.direction === 'send' && output.own === 'false' && output.attachment.type === 'asset-transfer') {
                      transaction.recipents.push({
                        "address": output.address,
                        "value": parseInt(output.attachment.quantity)
                      });
                      transaction.value += parseInt(output.attachment.quantity);
                      transaction.type = output.attachment.symbol;
                      transaction.decimal_number = output.attachment.decimal_number;
                    }
                  });
                  if (transaction.value) {
                    transactions.push(transaction);
                  } else {
                    //console.log(transaction);
                  }
                  break;
                case TX_TYPE_ISSUE:
                  //Asset issue tx
                  transaction.direction = 'issue';
                  e.outputs.forEach(function (output) {
                    if (output.own === 'true' && output.attachment.type === 'asset-issue') {
                      transaction.recipents.push({
                        "address": output.address,
                        "value": parseInt(output.attachment.maximum_supply)
                      });
                      transaction.value += parseInt(output.attachment.maximum_supply);
                      transaction.type = output.attachment.symbol;
                      transaction.decimal_number = output.attachment.decimal_number;
                    }
                  });
                  if (transaction.value) {
                    transactions.push(transaction);
                  } else {
                    //console.log(transaction);
                  }
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

  RegisterController.$inject = ['MetaverseService', '$scope', '$interval', '$location', 'localStorageService', '$rootScope', 'FlashService', '$translate', '$window'];

  function RegisterController(MetaverseService, $scope, $interval, $location, localStorageService, $rootScope, FlashService, $translate, $window) {
    var vm = this;

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

    function updateHeight() {
      MetaverseService.FetchHeight().then(function (response) {
        if (typeof response.success !== 'undefined' && response.success) {
          vm.height = response.data;
        }
      });
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
      }
      if ($scope.import_from_phrase) {
        //Import account from phrase
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
      } else if ($scope.import_from_file) {
        //Import account from file
        //MetaverseService.ImportAccountFromFile($scope.accountInfo, vm.user.password)
        //.then(function (response) {
        MetaverseService.ImportAccountFromFile($scope.path, vm.user.password).then(function (response) {
          if (typeof response.success !== 'undefined' && response.success) {
            $translate('MESSAGES.IMPORT_SUCCESS').then(function (data) {
              FlashService.Success(data, true);
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
//# sourceMappingURL=app.0.7.1.js.map
