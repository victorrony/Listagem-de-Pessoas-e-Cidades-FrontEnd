describe("Listagem de Cidades", () => {
   beforeEach(() => {
      cy.visit("http://localhost:3000/pagina-inicial", {timeout: 30000});
   });

   it("criar uma nova Cidades e salvar", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(".MuiBox-root > .MuiButtonBase-root").click({timeout: 30000});
      cy.get(".MuiGrid-direction-xs-column > .MuiGrid-container > .MuiGrid-root").type("Los Angeles", {timeout: 30000});
      cy.get(".MuiButton-contained").click({timeout: 30000});
      cy.get(".css-n35pu8 > .MuiTypography-root", {timeout: 30000}).should("be.visible");
   });

   it("criar uma nova Cidades, salvar e fechar", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(".MuiBox-root > .MuiButtonBase-root").click({timeout: 30000});
      cy.get(".MuiGrid-direction-xs-column > .MuiGrid-container > .MuiGrid-root").type("Barcelona", {timeout: 30000});
      cy.get(".MuiPaper-root > :nth-child(2)").click({timeout: 30000});
      cy.get(".css-4z6nar > .MuiPaper-root", {timeout: 30000}).should("be.visible");
   });

   it("Nao criar nada e voltar", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(".MuiBox-root > .MuiButtonBase-root").click({timeout: 30000});
      cy.get(".MuiPaper-root > :nth-child(4)").click({timeout: 30000});
      cy.get(".css-4z6nar > .MuiPaper-root", {timeout: 30000}).should("be.visible");
   });

   it("Apagar uma Cidades", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(":nth-child(498) > :nth-child(1) > :nth-child(1)").click({timeout: 30000});
   });

   it("Editar uma Cidades existente", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(":nth-child(496) > :nth-child(1) > :nth-child(2)").click({timeout: 30000});
      cy.get(".MuiGrid-direction-xs-column > .MuiGrid-container input[type=text] ").clear().type("cidade velha", {timeout: 30000});
      cy.get(".MuiButton-contained").click({timeout: 30000});
      cy.get(".css-n35pu8 > .MuiTypography-root", {timeout: 30000}).should("be.visible");
   });

   it("Editar uma Cidades existente, salvar e fechar ", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(":nth-child(492) > :nth-child(1) > :nth-child(2)").click({timeout: 30000});
      cy.get(".MuiGrid-direction-xs-column > .MuiGrid-container input[type=text] ").clear().type("mindelo", {timeout: 30000});
      cy.get(".MuiPaper-root > :nth-child(2)").click({timeout: 30000});
      cy.get(".css-n35pu8 > .MuiTypography-root", {timeout: 30000}).should("be.visible");
   });

   it("Ir para editar uma Cidades e resolver a apaga-lo ", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(":nth-child(491) > :nth-child(1) > :nth-child(2)").click({timeout: 30000});
      cy.get(".MuiPaper-root > :nth-child(3)").click({timeout: 30000});
      // cy.get(".command-wrapper command-state-passed command-type-parent command-is-event command-is-pinned command-is-interactive").should("be.visible");
   });

   it("Ir para editar uma Cidades e resolver a criar uma nova e salvar ", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(":nth-child(490) > :nth-child(1) > :nth-child(2)").click({timeout: 30000});
      cy.get(".MuiPaper-root > :nth-child(4)").click({timeout: 30000});
      cy.get(".MuiGrid-direction-xs-column > .MuiGrid-container > .MuiGrid-root").type("ponta de Aqua", {timeout: 30000});
      cy.get(".MuiButton-contained").click({timeout: 30000});
      cy.get(":nth-child(1) > .MuiPaper-root > .MuiCardContent-root", {timeout: 30000}).should("be.visible");
   });

   it("Ir para editar uma Cidades e resolver a voltar", () => {
      cy.get(".css-1rr4qq7 > .MuiList-root > :nth-child(2)").click({timeout: 30000});
      cy.get(":nth-child(490) > :nth-child(1) > :nth-child(2)").click({timeout: 30000});
      cy.get(".MuiPaper-root > :nth-child(6)").click({timeout: 30000});
      cy.get(".css-4z6nar > .MuiPaper-root", {timeout: 30000}).should("be.visible");
   });
});
