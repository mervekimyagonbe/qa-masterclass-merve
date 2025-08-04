Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
  describe('Login sayfasi testi', function() {

  it('tc01_login sayfasinda butonların kontrolu', function() {
    cy.visit('https://www.teknosa.com/login')
    cy.get('.lrp-body > .lrp-tabs > .nav > .active')
      .should("be.visible")
      .and("have.text", "Üye Girişi")

    cy.get('#newRegister')
      .should("be.visible")
      .and("have.text", "Üye Ol")

    cy.get('#j_username1')
      .should("be.visible")
      .and("exist")

    cy.get('#googleLoginBtn > i')
      .should("be.visible")
      .and("exist")

    cy.get('#facebookLoginBtn > i')
      .should("be.visible")
      .and("exist")
  })

  it('tc02_bos email ile giriş denemesi', function() {
    cy.visit('https://www.teknosa.com/login')
    cy.get('#newLoginStepSecond > span').click()
    cy.get('#j_username1-error')
      .should('be.visible')

    
  })

  it('tc03_hatali eposta ile giriş denemesi', function() {
    cy.visit('https://www.teknosa.com/login')


    cy.get('#j_username1').type('sahteemail@örnek.com')
  
    cy.get('#newLoginStepSecond').click()

    
    cy.get('#j_username1-error') 
      .should('be.visible')
      .and('contain.text', 'Lütfen e-posta adresinizi veya telefon numaranızı giriniz') 
  })

})








