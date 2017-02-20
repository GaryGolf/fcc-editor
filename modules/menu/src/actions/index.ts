import * as NomenclatureActions from './nomenclature'
import * as CategoryActions from './category'
import * as MenuActions from './menu'

const ActionCreator = Object.assign({},
    NomenclatureActions,
    CategoryActions,
    MenuActions
)

export default ActionCreator