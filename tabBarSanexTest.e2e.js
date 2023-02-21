import faker from '@faker-js/faker';
import faker_ru from '@faker-js/faker/locale/ru';

describe('Таббар', () => {
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

    it('Заполнить поля логин, пароль, нажать кнопку авторизации', async () => {
        await element(by.id('loginInputSignIn')).typeText('sveta@atmadev.ru');
        await element(by.id('passwordInputSignIn')).typeText('L6asgzAfgagpa74gOpdsf');
        await element(by.id('signInButton')).tap();
        await expect(element(by.id('mainHeaderView'))).toBeVisible();
    });

    it('Нажать кнопку Санэкс', async () => {
        await element(by.id('bottomTabWorksheet')).tap();
        await expect(element(by.id('worksheetView'))).toBeVisible();
    });

    it('Нажать кнопку Проверки Санэкс', async () => {
        await element(by.id('worksheetView_test')).tap();
        await expect(element(by.id('checksView'))).toBeVisible();
    });

    it('Нажать кнопку Фильтр', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('checksView'))).toBeVisible();
    });

    it('Нажать фильтр и выбрать параметры', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('select')).atIndex(0).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 1}))).tap();
        await element(by.id('select')).atIndex(1).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 1}))).tap();
        await element(by.id('filterItem2')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-07')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-23')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('checksView'))).toBeVisible();
    });

    it('Нажать кнопку Сбросить', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('cancelButton')).tap();
        await expect(element(by.id('checksView'))).toBeVisible();
    });

    it('Прокрутить экран Проверок вниз', async () => {
        await element(by.id('checksView')).scrollTo('bottom');
        await element(by.id('checksView')).scrollTo('top');
        await expect(element(by.id('checksView'))).toBeVisible();
    });

    it('Выбрать проверку', async () => {
        await element(by.id('checksItem' + faker.datatype.number({min: 0, max: 3}))).atIndex(0).tap();
        await expect(element(by.id('checkShowView'))).toBeVisible();
    });

    it('Нажать кнопку Только не пройденные', async () => {
        await element(by.id('checkShowCheckBox')).tap();
        await expect(element(by.id('checkShowView'))).toBeVisible();
    });

    // it('Прокрутить экран Проверки вниз', async () => {
    //     await element(by.id('checkShowView')).scrollTo('bottom');
    //     await element(by.id('checkShowView')).scrollTo('top');
    //     await expect(element(by.id('checkShowView'))).toBeVisible();
    // });

    it('Нажать кнопку Заказать', async () => {
        await element(by.id('backButton')).tap();
        await element(by.id('toOrderButton')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('checksSectionView'))).toBeVisible();
    });

    it('Вернуться к экрану Санэкс', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('worksheetView'))).toBeVisible();
    });

    it('Нажать кнопку Лабораторные исследования', async () => {
        await element(by.id('worksheetView_lab')).tap();
        await expect(element(by.id('labsView'))).toBeVisible();
    });

    it('Прокрутить экран Лабораторные исследования вниз', async () => {
        await element(by.id('labsView')).scrollTo('bottom');
        await element(by.id('labsView')).scrollTo('top');
        await expect(element(by.id('labsView'))).toBeVisible();
    });

    it('Выбрать исследование', async () => {
        await element(by.id('labsItem' + faker.datatype.number({min: 0, max: 3}))).tap();
        await expect(element(by.id('labsView'))).toBeVisible();
    });

    it('Нажать кнопку Заказать', async () => {
        await element(by.id('toOrderButton')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('labsView'))).toBeVisible();
    });

    it('Вернуться к экрану Рабочий лист', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('worksheetView'))).toBeVisible();
    });

    it('Нажать кнопку Дератизация и дезинсекция', async () => {
        await element(by.id('worksheetView_clean')).tap();
        await expect(element(by.id('disinsectionsView'))).toBeVisible();
    });

    it('Нажать кнопку Фильтр', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('disinsectionsView'))).toBeVisible();
    });

    it('Нажать фильтр и выбрать параметры', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('select')).atIndex(0).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 1}))).tap();
        await element(by.id('filterItem1')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-07')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-23')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('disinsectionsView'))).toBeVisible();
    });

    it('Нажать кнопку Сбросить', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('cancelButton')).tap();
        await expect(element(by.id('disinsectionsView'))).toBeVisible();
    });

    it('Прокрутить экран Дератизация вниз', async () => {
        await element(by.id('disinsectionsView')).scrollTo('bottom');
        await element(by.id('disinsectionsView')).scrollTo('top');
        await expect(element(by.id('disinsectionsView'))).toBeVisible();
    });

    it('Нажать кнопку Заказать', async () => {
        await element(by.id('toOrderButton')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('disinsectionsView'))).toBeVisible();
    });

    it('Выбрать пункт дератизации', async () => {
        await element(by.id('disinsectionsItem' + faker.datatype.number({min: 0, max: 3}))).tap();
        await expect(element(by.id('disinsectionsView'))).toBeVisible();
    });

    it('Вернуться к экрану Рабочий лист', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('worksheetView'))).toBeVisible();
    });

    it('Нажать кнопку Чат', async () => {
        await element(by.id('bottomTabChatList')).tap();
        await expect(element(by.id('chatListView'))).toBeVisible();
    });

    it('Нажать кнопку Написать в техподдержку', async () => {
        await element(by.id('createChatButton')).tap();
        await expect(element(by.id('chatView'))).toBeVisible();
    });

    it('Вернуться к экрану Чат', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('chatListView'))).toBeVisible();
    });

    it('Нажать кнопку Профиль', async () => {
        await element(by.id('bottomTabProfile')).tap();
        await expect(element(by.id('profileView'))).toBeVisible();
    });

    it('Нажать кнопку Соглашения', async () => {
        await element(by.id('agreementProfile')).tap();
        await expect(element(by.id('webView'))).toBeVisible();
    });

    it('Вернуться к экрану Профиль', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('profileView'))).toBeVisible();
    });

    it('Нажать кнопку Условия', async () => {
        await element(by.id('termOfUseProfile')).tap();
        await expect(element(by.id('webView'))).toBeVisible();
    });

    it('Вернуться к экрану Профиль', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('profileView'))).toBeVisible();
    });

    it('Нажать кнопку Выйти из профиля', async () => {
        await element(by.id('exitProfile')).tap();
        await expect(element(by.text('Предупреждение'))).toBeVisible();
    });

    it('Нажать кнопку Отмена', async () => {
        await element(by.text('Отмена')).tap();
        await expect(element(by.id('profileView'))).toBeVisible();
    });

    it('Нажать кнопку Выйти из профиля', async () => {
        await element(by.id('exitProfile')).tap();
        await expect(element(by.text('Предупреждение'))).toBeVisible();
    });

    it('Нажать кнопку Выйти', async () => {
        await element(by.text('Выйти')).tap();
        await expect(element(by.id('loginInputSignIn'))).toBeVisible();
    });
});
