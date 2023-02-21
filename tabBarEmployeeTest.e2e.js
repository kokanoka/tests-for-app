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

    it('Нажать кнопку Уведомления', async () => {
        await element(by.id('notificationsMain')).tap();
        await expect(element(by.id('notificationsView'))).toBeVisible();
    });

    it('Открыть уведомление', async () => {
        await element(by.id('notifItem' + faker.datatype.number({min: 0, max: 4}))).tap();
        await expect(element(by.text('Диалог не найден'))).toBeVisible();
        await element(by.text('OK')).tap();
        await element(by.id('backButton')).tap();
        await expect(element(by.id('notificationsView'))).toBeVisible();
    });

    it('Прокрутка страницы Журнал вниз', async () => {
        await element(by.id('notificationsView')).swipe('up');
        await element(by.id('notificationsView')).swipe( 'down');
        await expect(element(by.id('notificationsView'))).toBeVisible();
    });

    it('Нажать кнопку назад', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('mainHeaderView'))).toBeVisible();
    });

    it('Нажать кнопку Сотрудники', async () => {
        await element(by.id('bottomTabEmployees')).tap();
        await expect(element(by.id('employeesView'))).toBeVisible();
    });

    it('Нажать кнопку Фильтр', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('employeesView'))).toBeVisible();
    });

    it('Нажать фильтр и выбрать параметры', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('select')).atIndex(1).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 4}))).tap();
        await element(by.id('select')).atIndex(2).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 1}))).tap();
        await element(by.id('select')).atIndex(3).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 7}))).tap();
        await element(by.id('select')).atIndex(4).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 8}))).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('employeesView'))).toBeVisible();
    });

    it('Нажать фильтр и сбросить', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('cancelButton')).tap();
        await expect(element(by.id('employeesView'))).toBeVisible();
    });

    it('Нажать кнопку поиск, ввести текст', async () => {
        await element(by.id('searchEmployeesInput')).replaceText(faker_ru.random.word());
        await expect(element(by.id('employeesView'))).toBeVisible();
    });

    it('Ввести в поле администратор', async () => {
        await element(by.id('searchEmployeesInput')).replaceText('администратор');
        await expect(element(by.id('employeesView'))).toBeVisible();
    });

    it('Очистить поле поиска', async () => {
        await element(by.id('searchEmployeesInput')).clearText();
        await expect(element(by.id('employeesView'))).toBeVisible();
    });

    it('Выбрать сотрудника', async () => {
        await element(by.id('employeesItem' + faker.datatype.number({min: 0, max: 3}))).tap();
        await expect(element(by.id('employeeView'))).toBeVisible();
    });

    it('Нажать кнопку На медосмотр', async () => {
        await element(by.id('employeeView')).scrollTo('bottom');
        await element(by.id('employeeForMedicalButton')).tap();
        await element(by.text('OK')).tap();
        await expect(element(by.id('employeeView'))).toBeVisible();
    });

    it('Нажать кнопку Редактировать', async () => {
        await element(by.id('employeeEditButton')).tap();
        await expect(element(by.id('employeeEditView'))).toBeVisible();
    });

    it('Нажать кнопку Сохранить без ввода данных', async () => {
        await element(by.id('sirnameEditInput')).clearText();
        await element(by.id('nameEditInput')).clearText();
        await element(by.id('patronymicEditInput')).clearText();
        await element(by.id('phoneEditInput')).clearText();
        await element(by.id('emailEditInput')).clearText();
        await element(by.id('employeeEditView')).scrollTo('bottom');
        await element(by.id('saveEditButton')).tap();
        await expect(element(by.text('Произошла ошибка'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('employeeEditView'))).toBeVisible();
    });

    it('Ввести данные в поля', async () => {
        await element(by.id('employeeEditView')).scrollTo('top');
        await element(by.id('sirnameEditInput')).replaceText(faker.name.lastName());
        await element(by.id('nameEditInput')).replaceText(faker.name.firstName());
        await element(by.id('patronymicEditInput')).replaceText(faker.name.middleName());
        await element(by.id('phoneEditInput')).replaceText('' + faker.datatype.number({min: 79000000000, max: 89999999999}));
        await element(by.id('emailEditInput')).replaceText(faker.internet.email());
        await element(by.id('select')).atIndex(0).tap();
        await element(by.id('cancelButton')).tap();
        await element(by.id('select')).atIndex(1).tap();
        await element(by.id('cancelButton')).tap();
        await element(by.id('select')).atIndex(2).tap();
        await element(by.id('cancelButton')).tap();
        await element(by.id('employeeEditView')).scrollTo('bottom');
        await element(by.id('selectDateEdit')).atIndex(5).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-29')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('employeeEditView')).scrollTo('bottom');
        await element(by.id('selectDateEdit')).atIndex(6).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-21')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('employeeEditView')).scrollTo('bottom');
        await element(by.id('selectDateEdit')).atIndex(7).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-22')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('employeeEditView')).scrollTo('bottom');
        await element(by.id('selectDateEdit')).atIndex(8).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-27')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('employeeEditView')).scrollTo('bottom');
        await element(by.id('selectDateEdit')).atIndex(9).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-30')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('employeeEditView')).scrollTo('bottom');
        await element(by.id('checkboxEdit')).atIndex(0).tap();
        await element(by.id('checkboxEdit')).atIndex(1).tap();
        await element(by.id('checkboxEdit')).atIndex(2).tap();
        await element(by.id('checkboxEdit')).atIndex(3).tap();
        await expect(element(by.id('employeeEditView'))).toBeVisible();
    });

    it('Нажать кнопку Сохранить', async () => {
        await element(by.id('saveEditButton')).tap();
        await element(by.text('OK')).tap();
        await expect(element(by.id('employeeView'))).toBeVisible();
        await element(by.id('employeeEditButton')).tap();
        await expect(element(by.id('employeeEditView'))).toBeVisible();
    });

    it('Ввести данные в поля на русском языке', async () => {
        await element(by.id('sirnameEditInput')).replaceText(faker_ru.name.lastName(0));
        await element(by.id('nameEditInput')).replaceText(faker_ru.name.firstName(0));
        await element(by.id('patronymicEditInput')).replaceText(faker_ru.name.middleName(0));
        await element(by.id('phoneEditInput')).replaceText('' + faker.datatype.number({min: 79000000000, max: 89999999999}));
        await element(by.id('emailEditInput')).replaceText(faker.internet.email());
        await element(by.id('select')).atIndex(0).tap();
        await element(by.id('selectItem1')).tap();
        await element(by.id('select')).atIndex(1).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 2}))).tap();
        await element(by.id('select')).atIndex(2).tap();
        await element(by.id('selectItem0')).tap();
        await element(by.id('employeeEditView')).scrollTo('bottom');
        await element(by.id('checkboxEdit')).atIndex(0).tap();
        await element(by.id('checkboxEdit')).atIndex(1).tap();
        await element(by.id('checkboxEdit')).atIndex(2).tap();
        await element(by.id('checkboxEdit')).atIndex(3).tap();
        await expect(element(by.id('employeeEditView'))).toBeVisible();
    });

    it('Нажать кнопку Сохранить', async () => {
        await element(by.id('saveEditButton')).tap();
        await element(by.text('OK')).tap();
        await expect(element(by.id('employeeView'))).toBeVisible();
    });

    it('Вернуться к экрану Сотрудники', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('employeesView'))).toBeVisible();
    });

    it('Нажать кнопку Добавить', async () => {
        await element(by.id('addEmployeeButton')).tap();
        await expect(element(by.id('employeeEditView'))).toBeVisible();
    });
});
