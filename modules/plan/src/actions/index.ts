import * as salesplan from './salesplan'
import * as planitems from './planitems'
import * as products from './products'

interface Interface {
    salesplan?: salesplan.Interface
    planitems?: planitems.Interface
    products?: products.Interface
}

export  { Interface, salesplan, planitems, products} 