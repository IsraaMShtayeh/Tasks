import LoginValidation from "../support/pageobjects/loginValidation";
const loginObjValidation: LoginValidation = new LoginValidation();
import PIM from "../support/pageobjects/PIM"
const pimObject: PIM = new PIM();
describe("Login Home Page", () => {
    beforeEach(function () {
        cy.fixture('login').as('data')
        cy.fixture('employeeInfo').as('EmpInfo')
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.get('@data').then((infoData: any) => {
            loginObjValidation.fillData(infoData.valid.name, infoData.valid.password)
            loginObjValidation.checkPage(infoData.valid.message)
        })
    })


    it("Add new Employee via API", () => {
        
        cy.get('@EmpInfo').then((infoData: any) => {
            let firstName=infoData.user.firstName+Math.floor((Math.random()*1000));
            pimObject.addNewEmployee_API(firstName, infoData.user.middleName, infoData.user.lastName, infoData.user.id,infoData.user.password).then(() => {
                loginObjValidation.fillData(firstName, infoData.user.password)
            })

        });

    })

})

