import * as salesplan from './salesplan'
import * as planitems from './planitems'
import * as products from './products'
import * as salesreport from './salesreport'

interface Interface {
    salesplan?: salesplan.Interface
    planitems?: planitems.Interface
    products?: products.Interface
    salesreport?: salesreport.Interface
}

export  { Interface, salesplan, planitems, products, salesreport} 