import { recurse } from 'cypress-recurse';

describe('Test that Posts page opens', () => {
  it('Test that the /posts page opens', () => {
    cy.visit('http://localhost:3000/posts');
    cy.get('.wp-posts-container').first().should('be.visible');
  });
});

describe('Test pagination works', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/posts');
    cy.get('.wp-posts-container').first().should('be.visible');
  });

  it('goes to the last page', () => {
    const visitTextPageIfPossible = () => {
      cy.get('.pagination__next').then(($next) => {
        if ($next.hasClass('pagination__link--disabled')) {
          return;
        }
        cy.wait(500);
        cy.get('.pagination__next').click();
        visitTextPageIfPossible();
      });
    }

    visitTextPageIfPossible();

    cy.get('.pagination__next').should('have.class', 'pagination__link--disabled');
    cy.contains('.pagination__page-link', '2').should('be.visible');
  });
});
