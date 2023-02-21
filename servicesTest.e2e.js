import faker from '@faker-js/faker';
import faker_ru from '@faker-js/faker/locale/ru';

import {exec} from 'child_process';

const execPromise = (command: string) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else if (stderr) {
                reject(new Error(stderr));
            } else {
                resolve(stdout);
            }
        });
    });
};

const setDeviceLocation = (lat: number, long: number) => {
    if (device.getPlatform() === 'android') {
        return device.setLocation(lat, long);
    } else {
        return execPromise(`applesimutils --byId ${device.id} --setLocation "[${lat}, ${long}]"`);
    }
}

describe('Сервисы', () => {
    beforeAll(async () => {
        await device.launchApp({permissions: {notifications: 'YES', location: "inuse"}});
        await setDeviceLocation(54.789563, 56.052920);
    });

    it('should have signin screen', async () => {
        await expect(element(by.id('skipButton'))).toBeVisible();
    });

    it('Прокрутка мануала влево и вправо', async () => {
        await element(by.id('manualSlider')).swipe("left");
        await element(by.id('manualSlider')).swipe("left");
        await element(by.id('manualSlider')).swipe("right");
        await expect(element(by.id('manualSlider'))).toBeVisible();
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

    it('Нажать кнопку Журналы', async () => {
        await element(by.id('journalServices')).tap();
        await expect(element(by.id('journalsView'))).toBeVisible();
    });

    it('Нажать кнопку нерабочий', async () => {
        await element(by.id('nonWorkingJournals')).tap();
        await element(by.text('Отмена')).tap();
        await element(by.id('nonWorkingJournals')).tap();
        await element(by.text('Да')).tap();
        await element(by.text('OK')).tap();
        await expect(element(by.id('journalsView'))).toBeVisible();
    });

    it('Выбрать Душевые кабины', async () => {
        await element(by.id('journalsItem5')).atIndex(0).tap();
        await expect(element(by.id('journalScrollView'))).toBeVisible();
    });

    it('Нажать кнопку Выбрать без выбора условий', async () => {
        await element(by.id('journalChooseButton')).tap();
        await expect(element(by.id('journalSaveButton'))).toBeVisible();
    });

    it('Нажать кнопку Сохранить', async () => {
        await element(by.id('journalSaveButton')).tap();
        await expect(element(by.text('Не удалось заполнить журнал'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('journalSaveButton'))).toBeVisible();
    });

    it('Нажать кнопку назад', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('journalsView'))).toBeVisible();
    });

    it('Выбрать Душевые кабины и нажать Отметить все', async () => {
        await element(by.id('journalsItem5')).tap();
        await element(by.id('journalCheckboxAll')).tap();
        await element(by.id('journalChooseButton')).tap();
        await expect(element(by.id('journalSaveButton'))).toBeVisible();
    });

    it('Нажать кнопку Сохранить', async () => {
        await element(by.id('journalSaveButton')).tap();
        await expect(element(by.text('Журнал успешно заполнен'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('journalsView'))).toBeVisible();
    });

    it('Нажать кнопку Справочник по сотрудникам', async () => {
        await element(by.id('journalsItem' + faker.datatype.number({min: 0, max: 4}))).tap();
        await expect(element(by.text('Нет доступа'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('journalsView'))).toBeVisible();
    });

    it('Прокрутка страницы Журнал вниз', async () => {
        await element(by.id('journalsView')).swipe('up');
        await element(by.id('journalsView')).swipe('down');
        await expect(element(by.id('journalsView'))).toBeVisible();
    });

    it('Нажать кнопку назад', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('viewServices'))).toBeVisible();
    });

    it('Нажать кнопку Отчеты', async () => {
        await element(by.id('reportServices')).tap();
        await expect(element(by.id('reportsView'))).toBeVisible();
    });

    it('Отметить Журналы, Лаборатория, Дератизация, Проверки', async () => {
        await element(by.id('reportsCheckBox0')).tap();
        await element(by.id('reportsCheckBox1')).tap();
        await element(by.id('reportsCheckBox2')).tap();
        await element(by.id('reportsCheckBox3')).tap();
        await expect(element(by.id('reportsView'))).toBeVisible();
    });

    it('Выбрать даты отчета', async () => {
        await element(by.id('selectDateReports')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-10')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-22')).tap();
        await element(by.id('selectOkButton')).tap();
    });

    it('Нажать Сотрудники; Отметить Пройдено, Отсутствует, Истекает, Истекла, Проходит медосмотр', async () => {
        await element(by.id('collapseView')).atIndex(0).tap();
        await element(by.id('employeesCheckBox0')).tap();
        await element(by.id('employeesCheckBox1')).tap();
        await element(by.id('employeesCheckBox2')).tap();
        await element(by.id('employeesCheckBox3')).tap();
        await element(by.id('employeesCheckBox4')).tap();
        await expect(element(by.id('reportsView'))).toBeVisible();
    });

    it('Нажать Документы', async () => {
        await element(by.id('collapseView')).atIndex(1).tap();
        await expect(element(by.id('reportsView'))).toBeVisible();
    });

    // it('Нажать Внутренние документы, Нормативная база', async () => {
    //     await element(by.id('documents1')).tap();
    //     await element(by.id('documents0')).tap();
    //     await expect(element(by.id('reportsView'))).toBeVisible();
    // });

    it('Отметить документ', async () => {
        await element(by.id('reportsView')).swipeTo('bottom');
        await element(by.id('documentsCheckBox9')).tap();
        await element(by.id('documentsCheckBox10')).tap();
        await element(by.id('documentsCheckBox11')).tap();
        await element(by.id('documentsCheckBox12')).tap();
        await element(by.id('documentsCheckBox13')).tap();
        await expect(element(by.id('reportsView'))).toBeVisible();
    });

    it('Нажать кнопку Поделиться', async () => {
        await element(by.id('shareReportsButton')).tap();
        await element(by.id('backButton')).tap();
        await expect(element(by.id('reportsView'))).toBeVisible();
    });

    it('Нажать кнопку назад', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('viewServices'))).toBeVisible();
    });

    it('Нажать кнопку Задачи', async () => {
        await element(by.id('eventServices')).tap();
        await expect(element(by.id('tasksView'))).toBeVisible();
    });

    it('Прокрутка страницы Задачи вниз', async () => {
      await element(by.id('tasksView')).swipe('up');
      await waitFor(element(by.id('tasksView'))).toBeVisible().withTimeout(5000);
      await element(by.id('tasksView')).swipe( 'down');
      await expect(element(by.id('tasksView'))).toBeVisible();
    });

    it('Нажать кнопку Добавить задачу', async () => {
        await element(by.id('addTasksButton')).tap();
        await expect(element(by.id('newTaskView'))).toBeVisible();
    });

    it('Нажать кнопку Назначить без ввода данных', async () => {
        await element(by.id('appointTaskButton')).tap();
        await expect(element(by.id('newTaskView'))).toBeVisible();
    });

    it('Ввести в поля некорректные значения', async () => {
        await element(by.id('nameNewTaskInput')).typeText(faker.datatype.string());
        await element(by.id('descNewTaskInput')).typeText(faker.datatype.string());
        await element(by.id('checkBoxNewTask')).tap();
        await element(by.id('numberNewTaskInput')).typeText(faker.datatype.string());
        await element(by.id('select')).atIndex(0).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 6}))).tap();
        await element(by.id('closeSelectButton')).tap();
        await element(by.id('select')).atIndex(1).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 6}))).tap();
        await element(by.id('closeSelectButton')).tap();
        await element(by.id('appointTaskButton')).tap();
        await expect(element(by.id('newTaskView'))).toBeVisible();
    });

    it('Ввести данные в поля на английском', async () => {
        await element(by.id('nameNewTaskInput')).replaceText(faker.random.word());
        await element(by.id('descNewTaskInput')).replaceText(faker.random.word());
        await element(by.id('checkBoxNewTask')).tap();
        await element(by.id('select')).atIndex(0).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 6}))).tap();
        await element(by.id('closeSelectButton')).tap();
        await element(by.id('select')).atIndex(1).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 6}))).tap();
        await element(by.id('closeSelectButton')).tap();
        await element(by.id('appointTaskButton')).tap();
        await expect(element(by.id('newTaskView'))).toBeVisible();
    });

    it('Ввести данные в поля на русском языке', async () => {
        await element(by.id('nameNewTaskInput')).replaceText(faker_ru.random.word());
        await element(by.id('descNewTaskInput')).replaceText(faker_ru.random.word());
        await element(by.id('checkBoxNewTask')).tap();
        await element(by.id('numberNewTaskInput')).replaceText('' + faker.datatype.number());
        await element(by.id('selectDateNewTask')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-07')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-23')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('select')).atIndex(0).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 6}))).tap();
        await element(by.id('closeSelectButton')).tap();
        await element(by.id('select')).atIndex(1).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 6}))).tap();
        await element(by.id('closeSelectButton')).tap();
        await element(by.id('appointTaskButton')).tap();
        await expect(element(by.id('tasksView'))).toBeVisible();
    });

    it('Выбрать задачу', async () => {
        await element(by.id('backButton')).tap();
        await element(by.id('eventServices')).tap();
        await element(by.id('taskItem' + faker.datatype.number({min: 0, max: 6}))).tap();
        await expect(element(by.id('taskView'))).toBeVisible();
    });

    it('Вернуться к главному экрану', async () => {
        await element(by.id('backButton')).tap();
        await element(by.id('backButton')).tap();
        await expect(element(by.id('viewServices'))).toBeVisible();
    });

    it('Нажать кнопку Самоконтроль', async () => {
        await element(by.id('testServices')).tap();
        await expect(element(by.id('selfControlView'))).toBeVisible();
    });

    it('Нажать фильтр', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('okButton')).tap();
        await expect(element(by.id('selfControlView'))).toBeVisible();
    });

    it('Нажать фильтр и выбрать параметры', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('select')).tap();
        await element(by.id('selectItem' + faker.datatype.number({min: 0, max: 4}))).tap();
        await element(by.id('filterItem1')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-01')).tap();
        await element(by.id('native.calendar.SELECT_DATE_SLOT-2022-09-13')).tap();
        await element(by.id('selectOkButton')).tap();
        await element(by.id('okButton')).tap();
        //native.calendar.CHANGE_MONTH_RIGHT_ARROW-selectDatePeriod_1662029272791
        await expect(element(by.id('selfControlView'))).toBeVisible();
    });

    it('Нажать фильтр и сбросить', async () => {
        await element(by.id('filter')).tap();
        await element(by.id('cancelButton')).tap();
        await expect(element(by.id('selfControlView'))).toBeVisible();
    });

    it('Нажать кнопку Заполнены-Не заполнены', async () => {
        await element(by.id('fillSelfContr')).tap();
        await element(by.id('noFillSelfContr')).tap();
        await expect(element(by.id('selfControlView'))).toBeVisible();
    });

    it('Нажать кнопку Брюс', async () => {
        await element(by.id('selfContrItem')).tap();
        await expect(element(by.text('Нет доступа'))).toBeVisible();
        await element(by.text('OK')).tap();
        await expect(element(by.id('selfControlView'))).toBeVisible();
    });

    it('Прокрутка страницы Самоконтроль вниз', async () => {
        await element(by.id('selfControlView')).swipe('up');
        await element(by.id('selfControlView')).swipe('down');
        await expect(element(by.id('selfControlView'))).toBeVisible();
    });

    it('Нажать кнопку назад', async () => {
        await element(by.id('backButton')).tap();
        await expect(element(by.id('viewServices'))).toBeVisible();
    });

});
