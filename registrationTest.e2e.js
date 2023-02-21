import faker from '@faker-js/faker';
import faker_ru from '@faker-js/faker/locale/ru';

describe('Забыли пароль, регистрация', () => {
    beforeAll(async () => {
        await device.launchApp({permissions: {notifications: 'YES'}});
    });

    it('should have signin screen', async () => {
        await expect(element(by.id('skipButton'))).toBeVisible();
    });

    it('Нажать кнопку Пропустить', async () => {
        await element(by.id('skipButton')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });

    it('Нажать кнопку Забыли пароль', async () => {
        await element(by.id('forgotPassButton')).tap();
        await expect(element(by.id('resetPasswordView'))).toBeVisible();
    });

    it('Нажать кнопку Восстановить без ввода данных', async () => {
        await element(by.id('recoverButton')).tap();
        await element(by.text('OK')).tap();
        await expect(element(by.id('resetPasswordView'))).toBeVisible();
    });

    it('Ввести некорректный адрес эл.почты', async () => {
        await element(by.id('resetPassInput')).typeText(faker.datatype.string());
        await element(by.id('recoverButton')).tap();
        await expect(element(by.text('Заполните поля'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('resetPasswordView'))).toBeVisible();
    });

    it('Ввести незарегистрированный адрес эл.почты', async () => {
        await element(by.id('resetPassInput')).replaceText(faker.internet.email());
        await element(by.id('recoverButton')).tap();
        await expect(element(by.text('Сервер недоступен'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('resetPasswordView'))).toBeVisible();
    });

    it('Ввести зарегистрированный адрес эл.почты', async () => {
        await element(by.id('resetPassInput')).replaceText('sveta@atmadev.ru');
        await element(by.id('recoverButton')).tap();
        await expect(element(by.text('Письмо с паролем отправлено на почту'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });

    it('Нажать кнопку Зарегистрироваться', async () => {
        await element(by.id('registerButton')).tap();
        await expect(element(by.id('registrationView'))).toBeVisible();
    });

    it('Отправить заявку без ввода данных', async () => {
        await element(by.id('sendRequestButton')).tap();
        await expect(element(by.text('Заполните поля'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('registrationView'))).toBeVisible();
    });

    it('Ввести некорректный адрес эл.почты, номер телефона', async () => {
        await element(by.id('phoneRegInput')).typeText(faker.datatype.string());
        await element(by.id('emailRegInput')).typeText(faker.datatype.string());
        await element(by.id('sendRequestButton')).tap();
        await expect(element(by.text('Заполните поля'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('registrationView'))).toBeVisible();
    });

    it('Ввести адрес эл.почты без ввода номера телефона', async () => {
        await element(by.id('phoneRegInput')).clearText();
        await element(by.id('emailRegInput')).replaceText(faker.internet.email());
        await element(by.id('sendRequestButton')).tap();
        await expect(element(by.text('Заполните поля'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('registrationView'))).toBeVisible();
    });

    it('Ввести номер телефона без ввода электронной почты', async () => {
        await element(by.id('phoneRegInput')).typeText('' + faker.datatype.number({min: 89000000000, max: 89999999999}));
        await element(by.id('emailRegInput')).clearText();
        await element(by.id('sendRequestButton')).tap();
        await expect(element(by.text('Заполните поля'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('registrationView'))).toBeVisible();
    });

    it('Ввести некорректный номер телефона и корректный адрес эл.почты', async () => {
        await element(by.id('phoneRegInput')).replaceText('' + faker.datatype.number({min: 1, max: 9999999999}));
        await element(by.id('emailRegInput')).typeText(faker.internet.email());
        await element(by.id('sendRequestButton')).tap();
        await expect(element(by.id('registrationView'))).toBeVisible();
    });

    it('Ввести корректные номер телефона, адрес эл.почты', async () => {
        await element(by.id('phoneRegInput')).replaceText('' + faker.datatype.number({min: 89000000000, max: 89999999999}));
        await element(by.id('emailRegInput')).replaceText(faker.internet.email());
        await element(by.id('sendRequestButton')).tap();
        await expect(element(by.text('Спасибо за регистрацию, мы вам перезвоним'))).toBeVisible();
        await element(by.text('Хорошо')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });

    it('Нажать кнопку Войти без ввода данных', async () => {
        await element(by.id('signInButton')).tap();
        await expect(element(by.text('Заполните поля'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });

    it('Ввести некорректный логин и пароль', async () => {
        await element(by.id('loginInputSignIn')).typeText(faker.datatype.string());
        await element(by.id('passwordInputSignIn')).typeText(faker.datatype.string());
        await element(by.id('signInButton')).tap();
        await expect(element(by.text('Неверный логин или пароль. Попробуйте ещё раз.'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });

    it('Ввести логин без ввода пароля', async () => {
        await element(by.id('loginInputSignIn')).replaceText(faker.internet.userName());
        await element(by.id('passwordInputSignIn')).clearText();
        await element(by.id('signInButton')).tap();
        await expect(element(by.text('Заполните поля'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });

    it('Ввести пароль без ввода логина', async () => {
        await element(by.id('loginInputSignIn')).clearText();
        await element(by.id('passwordInputSignIn')).typeText(faker.datatype.string());
        await element(by.id('signInButton')).tap();
        await expect(element(by.text('Заполните поля'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });

    it('Ввести корректный логин и некорректный пароль', async () => {
        await element(by.id('loginInputSignIn')).replaceText('sveta@atmadev.ru');
        await element(by.id('passwordInputSignIn')).replaceText(faker.internet.password());
        await element(by.id('signInButton')).tap();
        await expect(element(by.text('Неверный логин или пароль. Попробуйте ещё раз.'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });

    it('Заполнить поля логин, пароль, нажать кнопку авторизации', async () => {
        await element(by.id('loginInputSignIn')).replaceText('sveta@atmadev.ru');
        await element(by.id('passwordInputSignIn')).replaceText('L6asgzAfgagpa74gOpdsf');
        await element(by.id('signInButton')).tap();
        await expect(element(by.id('mainHeaderView'))).toBeVisible();
    });

});
