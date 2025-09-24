
describe("Account and Transaction Flow", () => {
    beforeEach(() => {
        cy.visit("http://localhost:9002");
    });

    it("should create 5 accounts, initiate a transaction, and verify the transaction history", () => {
        // Create 5 accounts
        for (let i = 1; i <= 5; i++) {
            cy.get(`[data-testid="create-account-modal-button"]`).click();
            cy.get(`[data-testid="account-id-input"]`).type(i.toString());
            cy.get(`[data-testid="balance-input"]`).type((i * 100).toString());
            cy.get(`[data-testid="create-account-button"]`).click();
        }

        // Verify accounts created
        cy.get(`[data-testid="cell-account-id"]`).should("have.length", 5);
        cy.get(`[data-testid="cell-balance"]`).should("have.length", 5);


        // Initiate a transaction between account 1 and 2
        cy.get(`[data-testid="source-account-select"]`).click()
        cy.get(`[data-radix-popper-content-wrapper`).contains('1').click();
        cy.get(`[data-testid="destination-account-select"]`).click();
        cy.get(`[data-radix-popper-content-wrapper`).contains("2").click();
        cy.get(`[data-testid="amount-input"]`).type("50");
        cy.get(`[data-testid="transfer-funds-button"]`).click();

        // Verify the transaction appears in the transaction history
        cy.get(`[data-testid="transaction-history-table"]`).should("be.visible");
        cy.get(`[data-testid="row-transaction-history"]`)
            .first()
            .within(() => {
                cy.get(`[data-testid="cell-source-account-id"]`).should("contain", "1");
                cy.get(`[data-testid="cell-destination-account-id"]`).should(
                    "contain",
                    "2"
                );
                cy.get(`[data-testid="cell-amount"]`).should("contain", "50");
            });
    });
});
