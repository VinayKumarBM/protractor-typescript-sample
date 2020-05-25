import { element, by } from "protractor";
const log = require('log4js').getLogger("OpenAccountPage");

export class OpenAccountPage {

    private selectCustomerXpath: string = "//option[text()='customer']";
    private selectCurrencyXpath: string = "//option[text()='currency']";
    private processButton = element(by.buttonText("Process"));

    public selectCustomer(customer: string) {
        element(by.xpath(this.selectCustomerXpath.replace('customer', customer))).click();        
    }

    public selectCurrency(currency: string) {
        element(by.xpath(this.selectCurrencyXpath.replace('currency', currency))).click();        
    }

    public clickProcessButton() {
        this.processButton.click();
        log.info("Clicked on Process button.");
    }

    public enterAccountDetails(customer: string, currency: string) {
        this.selectCustomer(customer);
        this.selectCurrency(currency);
        log.info("Entered account details with customer name as "+customer+" & currency "+currency);
    }
}