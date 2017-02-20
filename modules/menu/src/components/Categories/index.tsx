import * as React from 'react'
import * as constants from '../../constants'
import CategoryItem from './CategoryItem'

const style = require('./categories.css')


interface Props {
    nomenclature: ProductCategory
    actions: any
}

export default class Categories extends React.Component<Props, null> {
    

    constructor(props: Props){
        super(props)
    }

    render(){

        const {nomenclature, actions} = this.props
        
        const items = nomenclature.child_menus.map((item, idx) => (
            <CategoryItem key={item.id}
                name={item.name}
                onClick={() => actions.select(item)} />
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