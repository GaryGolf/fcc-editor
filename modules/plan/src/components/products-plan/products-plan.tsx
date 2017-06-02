import * as React from 'react'
import * as styles from './products-plan.css'
import NewItemModal from './new-item-modal'

interface Props {}
interface State {
    showNewItemModal: boolean
}

export default class ProductsPlan extends React.Component<Props, State> {

    state={
        showNewItemModal: false
    }
    addNewItemHandler(){
        console.log('add new item')
        this.setState({showNewItemModal: true})
    }
    render(){
        return (
            <div className={styles.container}>
                <NewItemModal
                    onClose={()=>this.setState({showNewItemModal: false})}
                    visible={this.state.showNewItemModal}
                />
                <button className="btn btn-default"
                    onClick={this.addNewItemHandler.bind(this)}>
                    Add
                </button>
            </div>
        )
    }
}