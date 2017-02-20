import * as NomenclatureActions from './nomenclature'
import * as CategoryActions from './category'

const ActionCreator = Object.assign({},
    NomenclatureActions,
    CategoryActions
)

export default ActionCreator