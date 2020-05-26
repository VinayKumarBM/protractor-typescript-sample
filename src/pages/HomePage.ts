import { element, by } from "protractor";
const log = require('log4js').getLogger("HomePage");

export class HomePage {
    private bankManagerLoginButton = element(by.buttonText("Bank Manager Login"));
    private customerLoginButton = element(by.buttonText("Customer Login"));
    
    public clickBankManagerLoginButton() {
        this.bankManagerLoginButton.click();
        log.info("Clicked on Bank Manager Login button");
    }

    public clickCustomerLoginButton() {
        this.customerLoginButton.click();
        log.info("Clicked on Customer Login button");
    }
}