import * as React from 'react'
import ProductItem from './ProductItem'

const style = require('./products.css')

interface Props {
    products: Product[]
}
export default class Products extends React.Component<Props, null>{

    render(){
        const {products} = this.props
        if(!products) return null
        const items = products.map((item, idx) => (
            <ProductItem key={item.id}
                         product={item}>
            </ProductItem>
        ))

        return (
            <section className={style.container}>
                <div className={style.scrollable}>
                     {items}
                </div>
            </section>
        )
    }
}