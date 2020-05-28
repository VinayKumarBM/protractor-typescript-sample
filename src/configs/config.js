exports.config = {
  directConnect: true,
  //baseUrl: 'http://www.way2automation.com',
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--start-maximized',
        '--disable-infobars',
        '--disable-gpu']
    }
  },
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  specs: ['../../out-tsc/tests/*Test.js'],
  suites: {
    customer: '../../out-tsc/tests/CustomerTest.js',
    manager: '../../out-tsc/tests/ManagerTest.js'
  },
  onPrepare: function () {
    browser.configData = require('../../out-tsc/configs/configData');
    var jasmineReporters = require('jasmine-reporters');
    var log4js = require('log4js');
    log4js.configure(browser.configData.log4js);
    const logger = require(browser.configData.logger);
    var myReporter = {
      specStarted: function (result) {
        logger.log(result.description, "started");
      },

      specDone: function (result) {
        for (var i = 0; i < result.failedExpectations.length; i++) {
          logger.info(result.failedExpectations[i].stack);
        }
        logger.log(result.description, result.status.toUpperCase());
      }
    };
    jasmine.getEnv().addReporter(myReporter);
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './reports',
      filePrefix: 'xmlresults'
    }));
    var fs = require('fs-extra');

    fs.emptyDir('reports/screenshots/', function (err) {
      console.log(err);
    });
    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == 'failed') {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get('browserName');
            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream('reports/screenshots/' + browserName + '-' + result.fullName + '.png');
              stream.write(new Buffer(png, 'base64'));
              stream.end();
            });
          });
        }
      }
    });
  },
  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');
      testConfig = {
        reportTitle: 'Test Execution Report',
        outputPath: './reports',
        outputFilename: 'index',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from('./reports/xmlresults.xml', testConfig);
    });
  }
};