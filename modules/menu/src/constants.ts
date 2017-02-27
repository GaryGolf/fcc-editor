
export const menu_view_url =  PRODUCTION ? 'http://api.dev.dooglys.com/api/v1/menu/view/' : 'http://localhost:1337/api.dev.dooglys.com/api/v1/menu/view/'
export const product_category_url = PRODUCTION 
    ? 'http://api.dev.dooglys.com/api/v1/product-category/info'
    : 'http://localhost:1337/api.dev.dooglys.com/api/v1/product-category/info'
export const MENU_LENGTH = 24
export const PRODUCT = 'PRODUCT'
export const CATEGORY = 'CATEGORY'
export const API_LOAD_TIMEOUT = 4000



export const MENU_ITEM_NAME = 'Наименование '
export const INCLUDES_CATEGORIES = ' Включает в себя категории :'
export const ALSO_CONTAINS = 'Дополнительно содержит :'
export const SAVE  = 'Сохранить'
export const CLOSE = 'Закрыть'
export const DELETE = 'Удалить'