export const SALE_POINT_ID = "babf9d2a-fea2-4702-a63a-a0f0222779ff"
export const PLAN_ID = "32ca6183-341a-420d-a867-3742153bd2ad"
export const PERIOD  = Date.now()


// API
function getDomain(){
    const proxy = PRODUCTION ? '' : 'localhost:1337/'
    const tenant = document.querySelector('meta[name=tenant-domain]').getAttribute('content')
    const domain = document.querySelector('#menu-visual').getAttribute('data-api-host')
    return `http://${proxy}${tenant}.${domain}`
}

export const DOMAIN = getDomain()


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