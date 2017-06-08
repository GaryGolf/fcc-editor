export const SALE_POINT_ID = "3e9339a1-08a1-4baf-9324-311544c75eb1"
export const PLAN_ID = "c287c2ee-3570-4dc8-9f17-3a4d54339b2a"
export const PERIOD  = Date.now()


// API
function getDomain(){
    const proxy = PRODUCTION ? '' : 'localhost:1337/'
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
    ARRANGE_PRODUCTS: 'Распределить товар по дням'

}