import * as React from 'react'
import * as constants from '../../constants'
const style = require('./categories.css')


interface Props {
    nomenclature: ProductCategory
    showProducts: (ProductCategory) => void
}

export default class Categories extends React.Component<Props, null> {
    

    constructor(props: Props){
        super(props)
    }

    render(){

        const {nomenclature} = this.props
        
        const catigories = nomenclature.child_menus.map((item, idx) => (
            <div className={style.catigories}
                key={`${item.name} ${idx}`} 
                onClick={() => this.props.showProducts(item)}>
                {item.name}
            </div>
        ))
      
        return (
            <section className={style.container}>
                {catigories}
            </section>
        )
    }
}