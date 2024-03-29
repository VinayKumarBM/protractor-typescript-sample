import { element, by } from "protractor";
const log = require('log4js').getLogger("CustomerHomePage");

export class CustomerHomePage {
    private customerNameText = element(by.css(".fontBig"));
    private accountBalanceText = element(by.xpath("//div[contains(text(),'Account')]/strong[2]"));
    private depositButton = element(by.partialButtonText("Deposit"));
    private withdrawlButton = element(by.partialButtonText("Withdrawl"));
    private transactionsButton = element(by.partialButtonText("Transactions"));
    private logoutButton = element(by.partialButtonText("Logout"));

    public async getCustomeName() {
        let customerName = await this.customerNameText.getText();
        log.info("Logged in as "+customerName);
        return customerName;
    }

    public async getAccountBalance() {
        let accountBalance = await this.accountBalanceText.getText();
        log.info("Account Balance is: "+accountBalance);
        return accountBalance;
    }

    public clickDepositButton() {
        this.depositButton.click();
        log.info("Clicked on Deposit button");
    }

    public clickWithdrawlButton() {
        this.withdrawlButton.click();
        log.info("Clicked on Withdrawl button");
    }

    public clickTransactionsButton() {
        this.transactionsButton.click();
        log.info("Clicked on Transactions button");
    }

    public clickLogoutButton() {
        this.logoutButton.click();
        log.info("Clicked on Logout button");
    }
}