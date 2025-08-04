Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe("Register-sayfasi-testi", () => {
  it("tc01_register sayfası yükleniyor mu", () => {
    cy.visit("https://www.teknosa.com/login")
    cy.get("#newRegister").click()
    cy.get("#register\\.firstName").should("be.visible")
    cy.get("#register\\.lastName").should("be.visible")
    cy.get("#register\\.email").should("be.visible")
    cy.get("#password").should("be.visible")
    cy.get("#customerRegisterButton").should("be.visible")
  })

  it("tc02_boş alanlarla kayıt olunamaz", () => {
    cy.visit("https://www.teknosa.com/login")
    cy.get("#newRegister").click() // EKLENDİ!
    cy.get("#customerRegisterButton").click()
    cy.get("#register\\.firstName-error").should("be.visible")
    cy.get("#register\\.lastName-error").should("be.visible")
    cy.get("#register\\.email-error").should("be.visible")
    cy.get("#password-error").should("be.visible")
  })
})
