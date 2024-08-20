it("fazer troca de thema", () => {
   cy.visit("http://localhost:3000/pagina-inicial");
   cy.get(".css-121140a-MuiGrid-root > .MuiGrid-container").invoke("css", "color", "rgb(248, 244, 244)");
   cy.get(".css-0 > .MuiList-root > :nth-child(1)").click();
   cy.get(".css-121140a-MuiGrid-root > .MuiGrid-container").invoke("css", "color", "rgb(0, 0, 0)");
});
