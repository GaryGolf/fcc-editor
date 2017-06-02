import * as React from 'react'
import * as styles from './products-plan.css'

interface Props {}
interface State {}

export default class ProductsPlan extends React.Component<Props, State> {

    addNewItemHandler(){
        console.log('add new item')
    }
    render(){
        return (
            <div className={styles.container}>
                <button className="btn btn-default"
                    onClick={this.addNewItemHandler.bind(this)}>
                    Add
                </button>
            </div>
        )
    }
}