import { browser, element, by } from "protractor";
import { ScreeshotUtil } from "../utils/ScreenshotUtil";
import { HomePage } from "../pages/HomePage";
import { ManagerHomePage } from "../pages/ManagerHomePage";
import { AddCustomerPage } from "../pages/AddCustomerPage";
import { OpenAccountPage } from "../pages/OpenAccountPage";
import { SearchCustomerPage } from "../pages/SearchCustomerPage";
import { AlertUtil } from "../utils/AlertUtil";
import { ExcelReaderUtil } from "../utils/ExcelReaderUtil";
const log = require('log4js').getLogger("ManagerTest");

describe('Test functionality related to Bank Manager', () => {

    let homePage = new HomePage();
    let managerHomePage = new ManagerHomePage();
    let addCustomerPage = new AddCustomerPage();
    let openAccountPage = new OpenAccountPage();
    let searchCustomerPage = new SearchCustomerPage();
    let testCaseName: string;

    beforeEach(() => {
        browser.get(browser.configData.url);
    });

    it('TC001_AddCustomerTest', async () => {
        testCaseName = "TC001_AddCustomerTest";
        let dataMap = await ExcelReaderUtil.readFile("testData.xlsx", "ManagerTestData", testCaseName);
        homePage.navigateToBankManagerHomePage();
        managerHomePage.clickAddCustomerButton();
        addCustomerPage.enterCustomerDetais(dataMap["FirstName"], dataMap["LastName"], dataMap["PostalCode"]);
        ScreeshotUtil.takeScreenshot("CreateCustomer");
        addCustomerPage.clickCreateCustomerButton();
        expect(AlertUtil.getAlertMessageAndAccept()).toContain('Customer added successfully with customer id');
    });

    it('TC002_OpenAccountTest', async () => {
        testCaseName = "TC002_OpenAccountTest";
        let dataMap = await ExcelReaderUtil.readFile("testData.xlsx", "ManagerTestData", testCaseName);
        homePage.navigateToBankManagerHomePage();
        managerHomePage.clickOpenAccountButton();
        openAccountPage.enterAccountDetails(dataMap["FirstName"], dataMap["Currency"]);
        ScreeshotUtil.takeScreenshot("OpenAccount");
        openAccountPage.clickProcessButton();
        expect(AlertUtil.getAlertMessageAndAccept()).toContain('Account created successfully with account Number');
    });

    it('TC003_SearchAndDeleteCustomerTest', async () => {
        testCaseName = "TC003_SearchAndDeleteCustomerTest";
        let dataMap = await ExcelReaderUtil.readFile("testData.xlsx", "ManagerTestData", testCaseName);
        let customerToDelete: string = dataMap["FirstName"];
        homePage.navigateToBankManagerHomePage();
        managerHomePage.clickCustomersButton();
        await searchCustomerPage.searchCustomer(customerToDelete);
        await searchCustomerPage.getSearchResultCount();
        ScreeshotUtil.takeScreenshot("CustomerSearch");
        await searchCustomerPage.deleteCustomer();
        await searchCustomerPage.searchCustomer(customerToDelete);
        ScreeshotUtil.takeScreenshot("SearchDeletedCustomer");
        expect(0).toEqual(await searchCustomerPage.getSearchResultCount());
    });
});