import {PageObject_Welcome} from './welcome.po';
import {PageObject_Skeleton} from './skeleton.po';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';

describe('aurelia skeleton app', function() {
  let po_welcome: PageObject_Welcome;
  let po_skeleton: PageObject_Skeleton;

  beforeEach( () => {
    po_skeleton = new PageObject_Skeleton();
    po_welcome = new PageObject_Welcome();

    browser.loadAndWaitForAureliaPage("http://localhost:9000");
  });

  it('should load the page and display the initial page title', () => {
    expect(po_skeleton.getCurrentPageTitle()).toBe('Welcome | Aurelia');
  });

  it('should display greeting', () => {
    expect(po_welcome.getGreeting()).toBe('Welcome to the Aurelia Navigation App!');
  });

  it('should automatically write down the fullname', () => {
    po_welcome.setFirstname('Rob');
    po_welcome.setLastname('Eisenberg');

    // For now there is a timing issue with the binding.
    // Until resolved we will use a short sleep to overcome the issue.
    browser.sleep(200);
    expect(po_welcome.getFullname()).toBe('ROB EISENBERG');
  });

  it('should show alert message when clicking submit button', () => {
    expect(po_welcome.openAlertDialog()).toBe(true);
  });

  it('should navigate to users page', () => {
    po_skeleton.navigateTo('#/users');
    expect(po_skeleton.getCurrentPageTitle()).toBe('Github Users | Aurelia');
  });

  it('should have a validate button', () => {
      var validateBtnText = po_welcome.getValidateButton();
      expect(validateBtnText).toBe('Validate');
  });

  it('should input two numbers and add them', () => {
      po_skeleton.navigateTo('#/calculatorRoute');
      
      expect(browser.getTitle()).toBe('CalculatorTitle | Aurelia');

      let numOneElement = element(by.valueBind('num1'));
      let numTwoElement = element(by.valueBind('num2'));
      
      numOneElement.clear().then(() => numOneElement.sendKeys("50"));
      numTwoElement.clear().then(() => numTwoElement.sendKeys("75"));

       let addBtnElement = element(by.id('addBtn'));
       addBtnElement.click();

       element(by.id('sum')).getText()
            .then((sum) => expect(parseInt(sum)).toBe(125));
  });
});
