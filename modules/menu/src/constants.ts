
export const menu_view_url =  PRODUCTION ? 'http://api.release.dooglys.com/api/v1/menu/view/' : 'http://localhost:1337/api.release.dooglys.com/api/v1/menu/view/'
export const product_category_url = PRODUCTION 
    ? 'http://api.release.dooglys.com/api/v1/product-category/info'
    : 'http://localhost:1337/api.release.dooglys.com/api/v1/product-category/info'
export const MENU_LENGTH = 24
export const PRODUCT = 'PRODUCT'
export const CATEGORY = 'CATEGORY'
export const API_LOAD_TIMEOUT = 4000

export const icons = [
    {name: 'салат', value: 'salad', file: require('./img/1 салат.svg')},
    {name: 'супы', value: 'soup', file: require('./img/2 супы.svg')},
    {name: 'лапша рис', value: 'rice-noodles', file: require('./img/3 лапша рис.svg')},
    {name: 'сладкие роллы', value: 'sweet-roll', file: require('./img/4 сладкие роллы.svg')},
    {name: 'большие роллы', value: 'big-roll', file: require('./img/5 большие роллы.svg')},
    {name: 'маленькие роллы', value: 'small-roll', file: require('./img/6 маленькие роллы.svg')},
    {name: 'сливочные роллы', value: 'cream-roll', file: require('./img/7 сливочные роллы.svg')},
    {name: 'горячие роллы', value: 'hot-roll', file: require('./img/8 горячие роллы.svg')},
    {name: 'ассорти', value: 'mixed-roll', file: require('./img/9 ассорти.svg')},
    {name: 'Тортилья роллы', value: 'tortilla-roll', file: require('./img/10 Тортилья роллы.svg')},
    {name: 'Темпура', value: 'tempura-roll', file: require('./img/11 Темпура.svg')},
    {name: 'Тонкое тесто', value: 'thin-dough', file: require('./img/12 Тонкое тесто.svg')},
    {name: 'Толстое тесто', value: 'thik-dough', file: require('./img/13 Толстое тесто.svg')},
    {name: 'горячие напитки', value: 'hot-drink', file: require('./img/14 горячие напитки.svg')},
    {name: 'холодные напитки', value: 'cold-drink', file: require('./img/15 холодные напитки.svg')},
    {name: 'молочные коктели', value: 'milk-shake', file: require('./img/16 молочные коктейли.svg')},
    {name: 'Мороженое', value: 'ice-cream', file: require('./img/17 Мороженое.svg')},
    {name: 'чизкейк', value: 'cheese-cake', file: require('./img/18 чизкейк.svg')},
    {name: 'детское меню', value: 'babyis-menu', file: require('./img/19 детское меню.svg')}
]

export const MENU_ITEM_NAME = 'Название '
export const INCLUDES_CATEGORIES = 'Категории '
export const ALSO_CONTAINS = 'Товары '
export const SAVE  = 'Сохранить'
export const CLOSE = 'Закрыть'
export const ADD = 'Добавить'
export const DELETE = 'Удалить'
export const ICON = 'Иконка'