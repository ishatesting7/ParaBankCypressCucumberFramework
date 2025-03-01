import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { loginPage } from '../pages/LoginPage'
import { openNewAccountPage } from '../pages/OpenNewAccountPage'
import { transferFundsPage } from '../pages/TransferFundsPage'
import { accountOverviewPage } from '../pages/AccountOverviewPage'
import { billPaymentPage } from '../pages/BillPaymentPage'
import { registrationPage } from '../pages/RegistrationPage'

Given("I am at Parabank home page", () => {
  cy.visit('/')
})

Given('I am on the home page on website', () => {
  cy.visit('/')
  cy.wait(5000);
})

/**
 *
 * Action methods
 *
 */

When('I fill in registration form', () => {
  registrationPage.setRegistrationDetails()
})

When('I navigated to about us page', () => {
cy.get('[href="about.htm"]').eq(0).click();
})


Then('about us page should get displayed', () => {
cy.get('h1[class="title"]').should('be.visible');
})


Then('enter the username {string} and password {string}', (username, password) => {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  //cy.get('button[type="submit"]').click();
})

When('I generate new unique username and password', () => {
  registrationPage.getRandomUser('generatedUsername', 'generatedPassword')
})

When('I fill in new unique username and password', () => {
  cy.get('@generatedUsername').then((username) => {
    cy.get('@generatedPassword').then((password) => {
      registrationPage.setRandomUserDetails(username, password)
      cy.log('Username:', username)
      cy.log('Password:', password)
    })
  })
})

When('I click on the {string} button', (btnValue) => {
  cy.wait(3000)
  cy.clickButton(btnValue)
})

When('I click on the Open New Account button', ()=>{

  cy.wait(3000)
  cy.get('form > div > .button').click();

})

When('I re-login using the previously created user', () => {
  cy.get('@generatedUsername').then((username) => {
    cy.get('@generatedPassword').then((password) => {
      loginPage.submitLogin(username, password)
    })
  })
})

When('I click on the {string} link', (linktext) => {
  if (
    linktext === 'OPEN NEW ACCOUNT' ||
    linktext === 'Accounts Overview' ||
    linktext === 'Transfer Funds'
  ) {
    cy.intercept(
      'GET',
      /\/parabank\/services_proxy\/bank\/customers\/\d+\/accounts/
    ).as('customerAccountsRequest')

    cy.clickLink(linktext)

    cy.wait('@customerAccountsRequest')
    cy.wait(1000)
  } else {
    cy.clickLink(linktext)
  }
})

When('I take note on the minimum deposit amount text message', () => {
  openNewAccountPage.extractAndStoreMinAmount('extractedAmount')
})

When('I extracted the minimum amount to log', () => {
  cy.get('@extractedAmount').then((extractedAmount) => {
    cy.log('New Account Minimum Deposit:', extractedAmount)
  })
})

When('I create a new saving account', () => {
  openNewAccountPage.setAccountType('SAVINGS')
})

When('I take note on the new account number created', () => {
  openNewAccountPage.getNewAccNumber('newAccountNumber')
})

When('I take note on the new account current balance', () => {
  cy.get('@newAccountNumber').then((newAccountNumber) => {
    accountOverviewPage.getCurrentAccountBalance(
      newAccountNumber,
      'currentBalance'
    )
  })
})

When('I transfer ${int} from the new account to the old account', (amount) => {
  transferFundsPage.setTransferAmount(amount)
  cy.get('@newAccountNumber').then((newAccountNumber) => {
    transferFundsPage.setFromAccount(newAccountNumber)
  })
  cy.clickButton('Transfer')
})

When('I take note on the transfer amount', () => {
  transferFundsPage.getTransferAmount('transferredAmount')
})

When('I enter the payee details and send the payment', () => {
  billPaymentPage.setPayeeDetails('@newAccountNumber')
  cy.clickButton('Send Payment')
})

/**
 *
 * Verification methods
 *
 */

Then('the registration form should be displayed', () => {
  registrationPage.elements.registrationForm().should('be.visible')
  cy.url().should('contains', '/register.htm')
})

Then('the successful message should be displayed', () => {
  registrationPage.verifySuccessfulRegistration()
})

Then('the welcome text should be displayed', () => {
  loginPage.verifyWelcomeText()
})

Then('the section title should display {string} text', (text) => {
  loginPage.elements.sectionTitle().should('include.text', text)
})

Then(
  'the new saving account should be created with the correct balance',
  () => {
    cy.get('@newAccountNumber').then((newAccountNumber) => {
      accountOverviewPage.verifyAccountExist(newAccountNumber)
    })
    cy.get('@newAccountNumber').then((newAccountNumber) => {
      cy.get('@extractedAmount').then((extractedAmount) => {

        cy.log("HELLO------------HELLO");
        cy.log(newAccountNumber)
        accountOverviewPage.verifyAccountBalance(
          newAccountNumber,
          extractedAmount
        )
      })
    })
  }
)

Then('the balance of the new account should be correct', () => {
  cy.get('@newAccountNumber').then((newAccountNumber) => {
    cy.get('@currentBalance').then((currentBalance) => {
      cy.get('@transferredAmount').then((transferredAmount) => {
        const balance = currentBalance - transferredAmount
        accountOverviewPage.verifyAccountBalance(newAccountNumber, balance)
      })
    })
  })
})

Then('the final balance for the new account should be correct', () => {
  cy.get('@newAccountNumber').then((newAccountNumber) => {
    cy.get('@currentBalance').then((currentBalance) => {
      cy.fixture('payee').then(({ amount: billingAmount }) => {
        const balance = currentBalance - billingAmount
        accountOverviewPage.verifyAccountBalance(newAccountNumber, balance)
      })
    })
  })
})
