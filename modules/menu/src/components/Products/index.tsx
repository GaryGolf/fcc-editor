import * as React from 'react'

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
        const items = products.map((item, idx) => (
            <div className={style.product} key={`${item.description} ${idx}`}>
                {item.description}
            </div>
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