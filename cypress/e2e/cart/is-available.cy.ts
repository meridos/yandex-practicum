describe("service is available", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients",
    }).as("ingredients");

    cy.visit("http://localhost:3000");
  });

  it("create order flow", () => {
    cy.log("Check ingredient modal");

    cy.get('[data-type="main"] [class^=burger-ingredients_productItem__]')
      .first()
      .as("mainIngredient");

    cy.get("@mainIngredient").click();

    cy.get("[class^=modal_header__]").contains("Детали ингредиента");
    cy.get("[class^=ingredient-details_content__] h3").contains(
      "Биокотлета из марсианской Магнолии"
    );
    cy.get(
      "[class^=ingredient-details_details__] [class^=ingredient-details_detailItem__]"
    ).as("details");

    cy.get("@details").eq(0).should("contain.text", "Калории,ккал424,2");
    cy.get("@details").eq(1).should("contain.text", "Белки, г42");
    cy.get("@details").eq(2).should("contain.text", "Жиры, г14,2");
    cy.get("@details").eq(3).should("contain.text", "Углеводы, г24,2");
    cy.get("[class^=modal_close__]").click();

    cy.log("Add bun ingredient");

    cy.get('[data-type="bun"] [class^=burger-ingredients_productItem__]').as(
      "buns"
    );

    cy.get("@buns").first().as("bun").trigger("dragstart");

    cy.get("[class^=burger-constructor_bunEmptyElement__]")
      .first()
      .as("bunEmpty");

    cy.get("@bunEmpty").trigger("drop");

    cy.get("[class^=burger-constructor_bunItem__]").first().as("bunCart");

    cy.get("@bunCart")
      .contains("Краторная булка N-200i (верх)")
      .should("exist");

    cy.log("Replace bun ingredient");

    cy.get("@buns").eq(1).as("bun").trigger("dragstart");

    cy.get("@bunCart").trigger("drop");

    cy.get("@bunCart")
      .contains("Флюоресцентная булка R2-D3 (верх)")
      .should("exist");

    cy.log("Add main ingredient");

    cy.get("@mainIngredient").trigger("dragstart");

    cy.get("[class^=burger-constructor_itemEmpty__]")
      .first()
      .as("ingredientEmpty");

    cy.get("@ingredientEmpty").trigger("drop");

    cy.get("[class^=burger-constructor_item__]").first().as("ingredientCart");

    cy.get("@ingredientCart")
      .contains("Биокотлета из марсианской Магнолии")
      .should("exist");

    cy.log("Add sauce ingredient");

    cy.get('[data-type="sauce"] [class^=burger-ingredients_productItem__]').as(
      "sauces"
    );

    cy.get("@sauces").first().as("sauce").trigger("dragstart");

    cy.get("@ingredientCart").trigger("drop");

    cy.get("[class^=burger-constructor_item__]")
      .eq(1)
      .as("ingredientCartSauce");

    cy.get("@ingredientCartSauce").contains("Соус Spicy-X").should("exist");

    cy.log("Sort ingredients");

    cy.get("[class^=burger-constructor_item__]")
      .first()
      .as("ingredientCartMain");

    cy.get("@ingredientCartMain").trigger("dragstart");
    cy.get("@ingredientCartSauce").trigger("drop");

    cy.get("[class^=burger-constructor_item__]").eq(0).contains("Соус Spicy-X");
    cy.get("[class^=burger-constructor_item__]")
      .eq(1)
      .contains("Биокотлета из марсианской Магнолии");

    cy.log("Check price");
    cy.get("[class^=order_total__] .text").contains("2490");

    cy.log("Remove ingredient");

    cy.get("[class^=burger-constructor_item__] .constructor-element__action")
      .eq(0)
      .click();

    cy.log("Check ingredients");

    cy.get("[class^=burger-constructor_item__]")
      .eq(0)
      .contains("Биокотлета из марсианской Магнолии");

    cy.log("Check price");

    cy.get("[class^=order_total__] .text").contains("2400");

    cy.log("Add sauce");

    cy.get("@sauces").eq(1).as("sauce").trigger("dragstart");
    cy.get("@ingredientCart").trigger("drop");

    cy.log("Create order");

    cy.get("[class^=order_total__] .button").click();

    cy.log("Fill login form");

    cy.get("[class^=login_container__] .input_type_email").type(
      "test@login.cy"
    );
    cy.get("[class^=login_container__] .input_type_password").type(
      "testPassword"
    );
    cy.get("[class^=login_container__] button[type=submit]").click();

    cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login", {
      fixture: "login",
    }).as("login");

    cy.get("[class^=burger-constructor_item__]")
      .eq(0)
      .contains("Биокотлета из марсианской Магнолии");
    cy.get("[class^=burger-constructor_item__]")
      .eq(1)
      .contains("Соус фирменный Space Sauce");

    cy.log("Create order");

    cy.fixture("create-order").then((createOrderData) => {
      cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
        delay: 1000,
        statusCode: 200,
        body: createOrderData,
      }).as("createOrder");
    });

    cy.get("[class^=order_total__] .button").click();

    cy.log("Check modal loader");

    cy.get("[class^=order-created_content__]").contains("Загрузка...");

    cy.log("Check modal order number");

    cy.get(
      "[class^=order-created_content__] [class^=order-created_text__]"
    ).contains("9789");

    cy.log("Check cleared cart");

    cy.get("[class^=modal_close__]").click();
    cy.get("[class^=burger-constructor_bunEmptyElement__]").should(
      "be.visible"
    );
    cy.get("[class^=burger-constructor_itemEmpty__]").should("be.visible");
    cy.get("[class^=order_total__] .text").contains("0");
  });
});
