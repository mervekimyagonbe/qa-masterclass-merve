Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Sepet sayfası testi', function () {

  // Her testten önce siteye git ve çerezleri kapat
  beforeEach(() => {
    cy.visit('https://www.teknosa.com/')
    cy.get('body').then(($body) => {
      if ($body.find('div[data-name="Accept Button"]').length > 0) {
        cy.get('div[data-name="Accept Button"]', { timeout: 10000 })
          .should('be.visible')
          .click()

        // Çerez panelinin DOM'dan kalkmasını bekle
        cy.get('div[data-name="Button container"]', { timeout: 10000 }).should('not.exist')
      }
    })
  })

  it('tc01_ürün sepete eklenebiliyor mu?', () => {
    cy.get('.search-button').click()
    cy.get('#search-input')
      .should('be.visible')
      .type('telefon', { force: true })
    cy.get('.sbx-search').click()

    cy.wait(5000)
    cy.get('.prd-link').first().should('be.visible').click()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Reddet')) {
        cy.contains('Reddet').click({ force: true })
      }
    })

    cy.get('#addToCartButton', { timeout: 10000 }).should('be.visible').click()
    cy.get('.pac-buttons > .btn > span').click()
    cy.get('.cart-rows').should('be.visible')
  })

  it('tc02_sepetten ürün silinebiliyor mu?', () => {
    cy.visit('https://www.teknosa.com/sepet')
    cy.get('body').then($body => {
      if ($body.find('.cart-reset > span').length > 0) {
        cy.get('.cart-reset > span').first().click()
        cy.get('#js-remove-all').click()
        cy.contains('Sepetinizde henüz ürün bulunmuyor').should('be.visible')
      } else {
        cy.log('Sepette ürün yok, silinecek bir şey bulunamadı.')
      }
    })
  })

  it('tc03_sepette ürün adedi artırılabiliyor mu?', () => {
    cy.get('.search-button').click()
    cy.get('#search-input')
      .should('be.visible')
      .type('vantilatör', { force: true })
    cy.get('.sbx-search').click()

    cy.wait(5000)
    cy.get('.prd-link').first().should('be.visible').click()

    cy.get('body').then(($body) => {
      if ($body.text().includes('Reddet')) {
        cy.contains('Reddet').click({ force: true })
      }
    })

    cy.get('#addToCartButton', { timeout: 10000 }).should('be.visible').click()
    cy.get('.pac-buttons > .btn > span').click()
    cy.get('.plus').click()
    cy.get('#quantity_0').should('have.value', '2')
  })

})
