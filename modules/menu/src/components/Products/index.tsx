import * as React from 'react'
// import ProductItem from './ProductItem'
import Box from '../SingleTarget/Box'
const style = require('./products.css')

interface Props {
    products: Array<Product>
}
export default class Products extends React.Component<Props, null>{
    constructor(props: Props){
        super(props)
    }

    render(){
        const {products} = this.props
        if(!products) return null
        /*const items = products.map((item, idx) => (
            <ProductItem key={`${item.description} ${idx}`}
                         name={item.description}>
            </ProductItem>
        ))*/

        const fruits = ['bababa', 'apple', 'mango', 'qiwi', 'carrot']
            .map(name => (<Box name={name}/>))
        return (
            <section className={style.container}>
                <div className={style.scrollable}>
                     {fruits}
                </div>
            </section>
        )
    }
}