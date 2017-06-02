export const SALE_POINT_ID = "babf9d2a-fea2-4702-a63a-a0f0222779ff"
export const PLAN_ID = "6ce740b7-6c06-41af-9523-75471aef79cb"
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
    PRODUCT: 'Товар',
    QUANTITY: 'Количество',
    PRICE: 'Цена',
    COST: 'Себестоимость',
    AMOUNT: 'Сумма',
    PROFIT: 'Прибыль',
    SAVE: 'Сохранить',
    CANCEL: 'Отменить',
    ARRANGE_PRODUCTS: 'Распределить товар по дням'
}