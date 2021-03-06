Cypress.Commands.add("checkFpLogoIsVisibleAndClickable", (fpLogoLocator) => {
  var fpLogo = cy.get(fpLogoLocator);
  fpLogo
    .should("be.visible")
    .and("have.attr", "alt", "FightPandemics logo")
    .click();
});

Cypress.Commands.add(
  "pageContainsHeadingAndImage",
  (pageHeadingLocator, heading, pageImageLocator) => {
    cy.get(pageHeadingLocator).should("be.visible").contains(heading);
    var pageImage = cy.get(pageImageLocator);
    pageImage.should("be.visible");
  },
);

Cypress.Commands.add("pageContainsHeading", (pageHeadingLocator, heading) => {
  cy.get(pageHeadingLocator).should("be.visible").contains(heading);
});

export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

Cypress.Commands.add("generateRandomEmail", (num1, num2) => {
  return randomString(num1) + "@" + randomString(num2) + ".com";
});

Cypress.Commands.add("checkEmailIsOpen", (string) => {
  cy.url().then((url) => {
    cy.url().should("contain", string);
  });
});

Cypress.Commands.add("validateCorrectScreenIsOpen", (string) => {
  cy.url().then((url) => {
    cy.url().should("contain", string);
  });
});

Cypress.Commands.overwrite("visit", (visit, url) => {
  return visit(url, {
    onBeforeLoad: (_contentWindow) => {
      Object.defineProperty(_contentWindow.navigator, "language", {
        value: "en-US",
      });
    },
  });
});

Cypress.Commands.add("checkAnyKindOfLinks", (element, link) => {
  cy.get(element)
    .should("be.visible")
    .and("have.attr", "href", link);
});
