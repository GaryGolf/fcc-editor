// API
function getDomain(){
    const http = 'http://'
    const proxy = PRODUCTION ? '' : 'localhost:1337/'
    const tenant = document.querySelector('meta[name=tenant-domain]')['content']
    const domain = ENV_DOMAIN
    return http + proxy + tenant + '.' + domain
}

export const DOMAIN = getDomain()
export const MENU_LENGTH = 24
export const PRODUCT = 'PRODUCT'
export const CATEGORY = 'CATEGORY'
export const API_LOAD_TIMEOUT = 4000

// intl
export const MENU_ITEM_NAME = 'Название '
export const INCLUDES_CATEGORIES = 'Категории '
export const ALSO_CONTAINS = 'Товары '
export const SAVE  = 'Сохранить'
export const CLOSE = 'Закрыть'
export const ADD = 'Добавить'
export const DELETE = 'Удалить'
export const ICON = 'Иконка'
export const MENU_ITEM = 'Элемент меню'
export const R_U_SURE = 'Вы действительно хотите удалить '


export const icons = [
        'salad', 
        'soup',
        'rice-noodles',
        'sweet-roll',
        'big-roll',
        'small-roll',
        'cream-roll',
        'hot-roll',
        'mixed-roll',
        'tortilla-roll',
        'tempura-roll',
        'thin-dough',
        'thick-dough',
        'hot-drink',
        'cold-drink',
        'milk-shake',
        'ice-cream',
        'cheese-cake',
        'babyish-menu'
    ]