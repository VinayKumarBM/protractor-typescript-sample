import { browser, element, by } from "protractor";
import { ScreeshotUtil } from "../utils/ScreenshotUtil";
import { AlertUtil } from "../utils/AlertUtil";
import { ExcelReaderUtil } from "../utils/ExcelReaderUtil";
import { AddCustomerModule } from "../modules/AddCustomerModule";
import { OpenAccountModule } from "../modules/OpenAccountModule";
import { HomePageModule } from "../modules/HomePageModule";
import { ManagerHomePageModule } from "../modules/ManagerHomePageModule";
import { SearchCustomerModule } from "../modules/SearchCustomerModule";
const log = require('log4js').getLogger("ManagerTest");

describe('Test functionality related to Bank Manager', () => {

    let homePageModule = new HomePageModule();
    let managerHomePageModule = new ManagerHomePageModule();
    let addCustomerModule = new AddCustomerModule();
    let openAccountModule = new OpenAccountModule();
    let searchCustomerModule = new SearchCustomerModule();
    let testCaseName: string;

    beforeEach(() => {
        browser.get(browser.configData.url);
    });

    it('TC001_AddCustomerTest', async () => {
        testCaseName = "TC001_AddCustomerTest";
        let dataMap = await ExcelReaderUtil.readFile("testData.xlsx", "ManagerTestData", testCaseName);
        homePageModule.navigateToBankManagerHomePage();
        managerHomePageModule.navigateToAddNewCustomerPage();
        addCustomerModule.enterCustomerDetais(dataMap["FirstName"], dataMap["LastName"], dataMap["PostalCode"]);
        ScreeshotUtil.takeScreenshot("CreateCustomer");
        addCustomerModule.saveCustomerDetails();
        expect(AlertUtil.getAlertMessageAndAccept()).toContain('Customer added successfully with customer id');
    });

    it('TC002_OpenAccountTest', async () => {
        testCaseName = "TC002_OpenAccountTest";
        let dataMap = await ExcelReaderUtil.readFile("testData.xlsx", "ManagerTestData", testCaseName);
        homePageModule.navigateToBankManagerHomePage();
        managerHomePageModule.navigateToOpenCustomerAccountPage();
        openAccountModule.enterAccountDetails(dataMap["FirstName"], dataMap["Currency"]);
        ScreeshotUtil.takeScreenshot("OpenAccount");
        openAccountModule.createNewAccount();
        expect(AlertUtil.getAlertMessageAndAccept()).toContain('Account created successfully with account Number');
    });

    it('TC003_SearchAndDeleteCustomerTest', async () => {
        testCaseName = "TC003_SearchAndDeleteCustomerTest";
        let dataMap = await ExcelReaderUtil.readFile("testData.xlsx", "ManagerTestData", testCaseName);
        let customerToDelete: string = dataMap["FirstName"];
        homePageModule.navigateToBankManagerHomePage();
        managerHomePageModule.navigateToCustomerSearchPage();
        await searchCustomerModule.enterCustomerDetailsToSearch(customerToDelete);
        await searchCustomerModule.getNumberOfSearchresults();
        ScreeshotUtil.takeScreenshot("CustomerSearch");
        await searchCustomerModule.deleteCustomerInSearchResult();
        await searchCustomerModule.enterCustomerDetailsToSearch(customerToDelete);
        ScreeshotUtil.takeScreenshot("SearchDeletedCustomer");
        expect(0).toEqual(await searchCustomerModule.getNumberOfSearchresults());
    });
});