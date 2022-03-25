const faker = require('faker');

describe('Login Page', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/login');
  });

  it('should load login page', async () => {
    let $container = await page.$('.page-login');
    await expect($container).not.toBeNull();
  });

  describe('Email', () => {
    it('should show error on wrong email', async () => {
      let $username = await page.$('#username');
      await $username.type(faker.internet.email());

      let $error = await $username.evaluateHandle(el => el.nextElementSibling);
      let $errorHTML = await $error.getProperty('innerHTML');

      await expect($errorHTML.jsonValue()).resolves.toMatch('Invalid LIG email address');
    });

    it.todo('should show error on blank email');

    it.todo('should accept correct email');
  });

  describe('Submit', () => {
    it.todo('should submit when button is pressed');

    it.todo('should be disabled on incorrect fields');
  });
});
