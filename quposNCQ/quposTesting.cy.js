/// <reference types="cypress" />

describe('Login', function () {

    beforeEach(function () {
        cy.visit('http://demo.qupos.com/');
        cy.get('.carrito.img-fluid').click();
        cy.wait(1000)
        cy.get('#btnIngresar.dropdown-item.dropdown-hover').click();
        cy.wait(1000)
    });

    it('Correo invalido', () => {
        cy.get('#correoLogin.form-control').type('86097312');
        cy.get('#passLogin.form-control').type(' ').then(function () {
            cy.get('div.form-group').get('div.invalid-feedback').contains('Debe ingresar un correo electrónico valido').should('have.css', 'display', 'block');
        });
    })

    it('Correo valido', () => {
        cy.get('#correoLogin.form-control').type('86097312.dv@gmail.com');
        cy.get('#passLogin.form-control').type(' ').then(function () {
            cy.get('div.form-group').get('div.invalid-feedback').contains('Debe ingresar un correo electrónico valido').should('have.css', 'display', 'none');
        });
    })

    it('Contrasenna vacia', () => {
        cy.get('#correoLogin.form-control').type('86097312.dv@gmail.com{enter}').then(function () {
            cy.get('div.form-group').get('div.invalid-feedback').contains('Debe ingresar una contraseña.').should('have.css', 'display', 'block');
        });
    })

    it('Login invalido', () => {
        cy.get('#correoLogin.form-control').type('86097312.dv@gmail.com');
        cy.get('#passLogin.form-control').type('h0a93u4{enter}').then(function () {
            cy.wait(2000)
            cy.get('form').get('div.text-center').get('h5').contains('Correo electrónico o contraseña incorrectos').should('exist');
        });
    })

    it('Login valido', () => {
        cy.get('#correoLogin.form-control').type('86097312.dv@gmail.com');
        cy.get('#passLogin.form-control').type('h0a93u4q{enter}').then(function () {
            cy.wait(1000)
            cy.get('form').get('div.text-center').get('h5').contains('Correo electrónico o contraseña incorrectos').should('not.exist');
        });
        cy.wait(1000)
        cy.get('span').contains('×').click()
    })

});

describe('Buscador', function () {
    beforeEach(function () {
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().clear();

    });


    it('Buscar por descripcion (valido)', () => {
        cy.wait(1000)
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('marca').click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('familia').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('COCA');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').get('div.card.m-2.producto').should('exist')
        });
    })


    it('Buscar por descripcion (invalido)', () => {
        cy.wait(1000)
        cy.get('div.input-group').get('div.input-group-append').get('button.btn.btn-secondary.dropdown-toggle.dropdown-toggle-split.my-dropdown').first().click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('marca').click();
        cy.wait(1000)
        cy.get('a.dropdown-item.my-dropdown-item').contains('familia').click();
        cy.wait(1000)
        cy.get('div.input-group').get('input.form-control').first().type('aceite');
        cy.wait(1000)
        cy.get('div.input-group-append').get('button.btn.btn-secondary.my-button').first().click().then(function () {
            cy.wait(1000)
            cy.get('div.col-md-9.col-sm-8.col-xs-12.row.justify-content-center.scroll-cuadricula').should('not.exist')
        });
    })
});
