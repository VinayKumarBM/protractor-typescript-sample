import { element, by } from "protractor";
const log = require('log4js').getLogger("AccountPage");

export class AccountPage {
    private amountTextbox = element(by.model("amount"));
    private transactionButton = element(by.css(".btn-default"));
    private transactionMessageText = element(by.css("span.error"));

    public enterAmount(amount:string) {
        this.amountTextbox.sendKeys(amount);
        log.info("Entered Amount: "+amount);
    }

    public clickTransactionButton() {
        this.transactionButton.click();
        log.info("Made new Transaction")
    }

    public async getTransactionMessage() {
        let message = await this.transactionMessageText.getText();
        log.info("Message: "+message);
        return message;
    }
}