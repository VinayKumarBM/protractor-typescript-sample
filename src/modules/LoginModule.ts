import { LoginPage } from "../pages/LoginPage";

export class LoginModue{
    private loginPage = new LoginPage();

    public loginToApplication(customerName:string) {
        this.loginPage.selectCustomer(customerName);
        this.loginPage.clickLoginButton();
    }

    public navigateToHomePage() {
        this.loginPage.clickHomeButton();
    }

    public async isCustomerSelectionDisplayed() {
        return await this.loginPage.isUserSelectionDisplayed();
    }
}