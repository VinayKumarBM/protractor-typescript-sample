import { element, by } from "protractor";
const log = require('log4js').getLogger("ManagerHomePage");

export class ManagerHomePage {

    private addCustomerButton = element(by.partialButtonText("Add Customer"));
    private openAccountButton = element(by.partialButtonText("Open Account"));
    private customersButton = element(by.partialButtonText("Customers"));

    public clickAddCustomerButton() {
        this.addCustomerButton.click();
        log.info("Clicked on Add Customer button");
    }

    public clickOpenAccountButton() {
        this.openAccountButton.click();
        log.info("Clicked on Open Account button");
    }

    public clickCustomersButton() {
        this.customersButton.click();
        log.info("Clicked on Customers button");
    }
}