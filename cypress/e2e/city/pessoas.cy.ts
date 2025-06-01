beforeEach(() => {
   cy.visit("http://localhost:3000/pagina-inicial");
   cy.get(".MuiList-root > :nth-child(3)").click();
});

describe("criar Uma Pessoa", () => {
   beforeEach(() => {
      cy.get(".css-4z6nar").should("be.visible");
      cy.get(".MuiBox-root > .MuiButtonBase-root").click();
   });

   it("criar uma nova pessoa e salvar", () => {
      cy.get(":nth-child(2) > .MuiGrid-root").type("Victor Fernandes");
      cy.get(":nth-child(3) > .MuiGrid-root").type("victorfernandes@me.com");
      cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").type("Praia").type("{enter}");
      cy.get(".MuiAutocomplete-option").first().click();
      cy.get(".MuiButton-contained").click();
   });

   it("criar uma nova pessoa, salvar e fechar", () => {
      cy.get(":nth-child(2) > .MuiGrid-root").type("Victor Rony");
      cy.get(":nth-child(3) > .MuiGrid-root").type("victorRonys@me.com");
      cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").type("Praia");
      cy.get(".MuiAutocomplete-option").first().click();
      cy.get(".MuiPaper-root > :nth-child(2)").click();
      cy.get(".MuiTableBody-root").should("contain", "Victor Rony");
   });
   
   it("Ir para criar uma nova pessoa, resolver voltar ", () => {
      cy.get(".MuiPaper-root > :nth-child(4)").click();
      cy.get(".MuiTableBody-root").should("be.visible");
   });
});

describe("Editar Pessoa", () => {
   beforeEach(() => {
      cy.intercept({
         method: "PUT",
         url: "http://localhost:3333/pessoas/10",
      }).as("editarPessoa");
   });

   it("Editar uma pessoa existente e salvar", () => {
      cy.get(":nth-child(4) > :nth-child(1) > :nth-child(2)").first().click();
      cy.get(".css-4z6nar").should("be.visible");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(1) > :nth-child(2)").click();

      cy.get(".MuiInputBase-root input[type=text]").first().clear().type("Victor Pereira");
      cy.get(":nth-child(3) > .MuiGrid-root").first().clear().type("VictorPereira@gmail.com");
      cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").clear().type("mindelo{enter}");
      cy.get(".MuiAutocomplete-option").first().click();
      cy.get(".MuiButton-contained").click();

      // cy.wait("@editarPessoa").its("response.statusCode").should("eq", 204);
   });

   it("Editar uma pessoa existente, salvar e fechar", () => {
      cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(1) > :nth-child(2)").click();
      cy.get(".css-4z6nar").should("be.visible");

      cy.get(".MuiInputBase-root input[type=text]").first().clear().type("victor Fernandes01");
      cy.get(":nth-child(3) > .MuiGrid-root").first().clear().type("victorFernandes@gmail.com");
      cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").clear().type("mindelo{enter}");
      cy.get(".MuiPaper-root > :nth-child(2)").click();
      cy.get(".MuiTableBody-root").should("contain", "victor Fernandes01");
      // cy.wait("@editarPessoa", { timeout: 8000 }).its("response.statusCode").should("eq", 204);
   });

   it("Ir para Editar uma pessoa existente e resolver a apaga-lo ", () => {
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(1) > :nth-child(2)").first().click();
      cy.get(".css-4z6nar").should("be.visible");
      cy.get(".MuiPaper-root > :nth-child(3)").click();
      cy.get(".MuiTableBody-root").should("not.contain", "Victor Pereira");
   });

   it("Ir para Editar uma pessoa existente e resolver a criar uma nova e salvar ", () => {
      cy.intercept("POST", "/your-endpoint").as("postPessoa");

      cy.get(":nth-child(4) > :nth-child(1) > :nth-child(2)").first().click();
      cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(1) > :nth-child(2)").click();
      cy.get(".MuiPaper-root > :nth-child(4)").click();
      cy.get(":nth-child(2) > .MuiGrid-root").type("Victor Gonsalves");
      cy.get(":nth-child(3) > .MuiGrid-root").type("victorGonsalves@me.com");
      cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").type("Praia").type("{enter}");
      cy.get(".MuiAutocomplete-option").first().click();
      cy.get(".MuiButton-contained").click();
      // cy.wait("@postPessoa", { timeout: 8000 }).its("response.statusCode").should("eq", 201);
   });

   it("Ir para Editar uma pessoa existente e resolver a voltar ", () => {
      cy.get(":nth-child(4) > :nth-child(1) > :nth-child(2)").first().click();
      cy.get(".css-4z6nar").should("be.visible");
      cy.get(".MuiTableBody-root > :nth-child(4) > :nth-child(1) > :nth-child(2)").click();
      cy.get(".MuiPaper-root > :nth-child(6)").click();
      cy.get(".css-4z6nar > .MuiPaper-root").should("be.visible");
   });
});

// describe("Apagar uma pessoa", () => {
//    it("Apagar uma pessoa", () => {
//       cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(1) > :nth-child(1)").click();
//    });
// });
