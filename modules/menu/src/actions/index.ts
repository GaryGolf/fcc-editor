import * as Nomenclature from './nomenclature'
import * as Category from './category'
import * as Menu from './menu'
import * as View from './view'

interface Interface {
    nomenclature?: Nomenclature.Interface
    category?: Category.Interface
    menu?: Menu.Interface
    view?: View.Interface
}

export  { Interface, Nomenclature , Category, Menu, View }