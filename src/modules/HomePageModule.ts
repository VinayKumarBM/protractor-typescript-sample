import { HomePage } from "../pages/HomePage";

export class HomePageModule {
    private homePage = new HomePage();

    public navigateToBankManagerHomePage(){
        this.homePage.clickBankManagerLoginButton();
    }

    public navigateToCustomerLoginPage(){
        this.homePage.clickCustomerLoginButton();
    }
}