import * as React from 'react'
import * as constants from '../../constants'
import CategoryItem from './CategoryItem'
import * as Actions from '../../actions'

const style = require('./categories.css')


interface Props {
    nomenclature: ProductCategory
    actions: Actions.Interface
}

export default class Categories extends React.Component<Props, null> {
    

    constructor(props: Props){
        super(props)
    }

    render(){

        const {nomenclature, actions} = this.props
        
        const items = nomenclature.child_categories.map(item => (
            <CategoryItem key={item.id}
                category={item}
                actions={actions} />
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