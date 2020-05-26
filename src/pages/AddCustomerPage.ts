import { element, by } from "protractor";
const log = require('log4js').getLogger("AddCustomerPage");

export class AddCustomerPage {
    private firstNameInputBox = element(by.model("fName"));
    private lastNameInputBox = element(by.model("lName"));
    private zipCodeInputBox = element(by.model("postCd"));
    private createCustomerButton = element(by.css("button[type='submit']"));

    public enterFirstName(firstName : string) {
        this.firstNameInputBox.sendKeys(firstName);
    }

    public enterLastName(lastName : string) {
        this.lastNameInputBox.sendKeys(lastName);
    }

    public enterPostalCode(postalCode : string) {
        this.zipCodeInputBox.sendKeys(postalCode);
    }

    public clickCreateCustomerButton() {
        this.createCustomerButton.click();
        log.info("Clicked on Add Customer button");
    }
}