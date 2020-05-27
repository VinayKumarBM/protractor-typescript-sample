import { AccountPage } from "../pages/AccountPage";

export class AccountModule {
    private accountPage = new AccountPage();

    public makeNewTransaction(amount:string) {
        this.accountPage.enterAmount(amount);
        this.accountPage.clickTransactionButton();        
    }

    public getTransactionMessage() {
        return this.accountPage.getTransactionMessage();
    }
}