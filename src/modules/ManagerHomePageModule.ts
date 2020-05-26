import { ManagerHomePage } from "../pages/ManagerHomePage";

export class ManagerHomePageModule {
    private managerHomePage = new ManagerHomePage();

    public navigateToAddNewCustomerPage(){
        this.managerHomePage.clickAddCustomerButton();
    }

    public navigateToOpenCustomerAccountPage() {
        this.managerHomePage.clickOpenAccountButton();
    }

    public navigateToCustomerSearchPage() {
        this.managerHomePage.clickCustomersButton();
    }

}