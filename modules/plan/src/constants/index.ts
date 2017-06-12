export const SALE_POINT_ID = "3e9339a1-08a1-4baf-9324-311544c75eb1"
export const PLAN_ID = "349c4840-e6b2-44df-a8b1-bbee8b857e14"
//export const PLAN_ID = "7440adb0-5c09-4fe7-8b3d-2f8c51e136bf"
//export const PLAN_ID = "bcc03868-bee4-4998-aa2f-1f66ccce126a"
//export const PLAN_ID = "c3697ef0-00e4-4ebf-814d-e16c84f3e15a"
//export const PLAN_ID = "c287c2ee-3570-4dc8-9f17-3a4d54339b2a"
export const PERIOD  = Date.now()


// API
function getDomain(){
    const proxy = PRODUCTION ? '' :  'localhost:1337/'
    const tenant = document.querySelector('meta[name=tenant-domain]').getAttribute('content')
    const domain = document.querySelector('#menu-visual').getAttribute('data-api-host')
    return `http://${proxy}${tenant}.${domain}`
}

export const DOMAIN = getDomain()

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
    ADD_TURNOVER_ITEM: 'Добавить план по обороту'
}