// export const SALE_POINT_ID = "3e9339a1-08a1-4baf-9324-311544c75eb1"
// export const PLAN_ID = "74f4ab3b-a675-4787-82e6-7613614ad29b" // #1
// export const PERIOD  = Date.now()


// API
function getDomain(){
    const proxy = PRODUCTION ? '' :  'localhost:1337/'
    const tenant = document.querySelector('meta[name=tenant-domain]').getAttribute('content')
    const domain = document.querySelector("#planning-document-wrapper").getAttribute('data-api-host')
    return `http://${proxy}${tenant}.${domain}`
}
export const DOMAIN = getDomain()
export const PLAN_ID = document.querySelector("#planning-document-wrapper").getAttribute('data-id')

export const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
]

export const shortMonth = ['ЯНВ','ФЕВ','МАР','АПР','МАЙ','ИЮН','ИЮЛ','АВГ','СЕН','ОКТ','НОЯ','ДЕК']
export const weekDays = ['вс','пн','вт','ср','чт','пт','сб']

// strings
export const TXT = {
    ADD_PRODUCT: 'Добавить товар',
    EDIT_PRODUCT: 'Редактировать товар',
    PRODUCT: 'Товар',
    QUANTITY: 'Кол-во',
    PRICE: 'Цена',
    COST: 'Стоимость',
    AMOUNT: 'Сумма',
    PROFIT: 'Прибыль',
    SAVE: 'Сохранить',
    CANCEL: 'Отменить',
    REMOVE: 'Удалить',
    ARRANGE_PRODUCTS: 'Распределить товар по дням',
    NAME: 'Наименование',
    PLANNING_PERIOD: 'Период планирования',
    SALE_POINT: 'Торговая точка',
    EMPLOYEE: 'Сотрудник создавший документ',
    COMMENT: 'Комментарий',
    STATUS: 'Статус документа',
    ACTIVATE: 'Активировать',
    REGISTER: 'Регистрировать',
    RESTORE: 'Восстановить',
    LOAD: 'Загрузить',
    LOAD_FROM_SAVED: 'Загрузить из сохраненных',
    LOAD_FROM_PERIOD: 'Загрузить из результатов прошлого периода',
    CLEAN: 'Очистить',
    ADD_TURNOVER_ITEM: 'Добавить план по обороту',
    NUMBER: '№'
}