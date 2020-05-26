import { OpenAccountPage } from "../pages/OpenAccountPage";
const log = require('log4js').getLogger("OpenAccountModule");

export class OpenAccountModule {
    private openAccountPage = new OpenAccountPage();

    public enterAccountDetails(customer: string, currency: string) {
        this.openAccountPage.selectCustomer(customer);
        this.openAccountPage.selectCurrency(currency);
        log.info("Entered account details with customer name as "+customer+" & currency "+currency);
    }

    public createNewAccount() {
        this.openAccountPage.clickProcessButton();
    }
}