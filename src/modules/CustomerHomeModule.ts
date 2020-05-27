import { CustomerHomePage } from "../pages/CustomerHomePage";

export class CustomerHomeModule { 
    private customerHomePage = new CustomerHomePage();

    public navigateToDepositPage() {
        this.customerHomePage.clickDepositButton();
    }

    public navigateToWithdrawlPage() {
        this.customerHomePage.clickWithdrawlButton();
    }

    public navigateToTransactionsPage() {
        this.customerHomePage.clickTransactionsButton();
    }

    public logoutOfApplication() {
        this.customerHomePage.clickLogoutButton();
    }

    public async getCustomerName() {
        return await this.customerHomePage.getCustomeName();
    }

    public async getAccountBalance() {
        return await this.customerHomePage.getAccountBalance();
    }
}