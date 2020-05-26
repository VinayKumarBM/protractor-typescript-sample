import { AddCustomerPage } from "../pages/AddCustomerPage";
const log = require('log4js').getLogger("Logger");

export class AddCustomerModule {
    private addCustomerPage = new AddCustomerPage();

    public enterCustomerDetais(firstName : string, lastName : string, postalCode : string) {
        this.addCustomerPage.enterFirstName(firstName);
        this.addCustomerPage.enterLastName(lastName);
        this.addCustomerPage.enterPostalCode(postalCode);
        log.info("Entered Customer details with First Name: "+firstName+
                    ", Last Name: "+lastName+" & Postal Code: "+postalCode);
    }

    public saveCustomerDetails() {
        this.addCustomerPage.clickCreateCustomerButton();
    }
}