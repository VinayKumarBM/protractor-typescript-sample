import { HomePageModule } from "../modules/HomePageModule";
import { LoginModue } from "../modules/LoginModule";
import { browser } from "protractor";
import { CustomerHomeModule } from "../modules/CustomerHomeModule";
import { AccountModule } from "../modules/AccountModule";
import { TransactionsModule } from "../modules/TransactionsModule";
import * as data from "../data/CustomerData.json";

describe('Test functionalities related to Bank Customer', () => {
    let homePageModule = new HomePageModule();
    let loginModule = new LoginModue();
    let customerHomeModule = new CustomerHomeModule();
    let accountModule = new AccountModule();
    let transactionsModule = new TransactionsModule();    
    
    beforeEach(() => {
        browser.get(browser.configData.url);
    });

    it('TC004_MakeADeposit', async () => {
        homePageModule.navigateToCustomerLoginPage();
        loginModule.loginToApplication(data.customerName);
        expect(await customerHomeModule.getCustomerName()).toEqual(data.customerName);
        customerHomeModule.navigateToDepositPage();
        accountModule.makeNewTransaction(data.deposit.amount);
        expect(await accountModule.getTransactionMessage()).toEqual(data.deposit.transactionMessage);
        expect(await customerHomeModule.getAccountBalance()).toEqual(data.deposit.amount);
        customerHomeModule.logoutOfApplication();
        expect(await loginModule.isCustomerSelectionDisplayed()).toBe(true);
        loginModule.navigateToHomePage();
    });

    it('TC005_MakeAWithdrawl', async () => {
        homePageModule.navigateToCustomerLoginPage();
        loginModule.loginToApplication(data.customerName);
        expect(await customerHomeModule.getCustomerName()).toEqual(data.customerName);
        customerHomeModule.navigateToWithdrawlPage();
        accountModule.makeNewTransaction(data.withdraw.amount);
        expect(await accountModule.getTransactionMessage()).toEqual(data.withdraw.transactionMessage);
        expect(await customerHomeModule.getAccountBalance()).toEqual(data.withdraw.balance);
        customerHomeModule.logoutOfApplication();
        expect(await loginModule.isCustomerSelectionDisplayed()).toBe(true);
        loginModule.navigateToHomePage();
    });

    it('TC006_MakeInvalidWithdrawl', async () => {
        homePageModule.navigateToCustomerLoginPage();
        loginModule.loginToApplication(data.customerName);
        expect(await customerHomeModule.getCustomerName()).toEqual(data.customerName);
        customerHomeModule.navigateToWithdrawlPage();
        accountModule.makeNewTransaction(data.invalidWithdrawl.amount);
        expect(await accountModule.getTransactionMessage()).toEqual(data.invalidWithdrawl.transactionMessage);
        customerHomeModule.logoutOfApplication();
        expect(await loginModule.isCustomerSelectionDisplayed()).toBe(true);
        loginModule.navigateToHomePage();
    });

    it('TC007_TransactionHistoryTest', async () => {
        homePageModule.navigateToCustomerLoginPage();
        loginModule.loginToApplication(data.customerName);
        expect(await customerHomeModule.getCustomerName()).toEqual(data.customerName);
        customerHomeModule.navigateToTransactionsPage();
        expect(await transactionsModule.getTransactionAmount("Credit")).toEqual(data.transactionHistory.creditAmount);
        expect(await transactionsModule.getTransactionAmount("Debit")).toEqual(data.transactionHistory.debitAmount);
        customerHomeModule.logoutOfApplication();
        expect(await loginModule.isCustomerSelectionDisplayed()).toBe(true);
        loginModule.navigateToHomePage();
    });
});