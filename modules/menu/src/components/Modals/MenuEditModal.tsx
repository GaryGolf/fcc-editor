import * as React from 'react'

const style = require('./menu-modal.css')

interface Props {
    show: boolean
    close: ()=>void
}
interface State {}
export default class MenuEditModal extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }
   
    render(){
        if(!this.props.show) return null
        
        const options = ["apple", "mango", "grapes", "melon", "strawberry"]
            .map(fruit =>({label: fruit, value: fruit}))

        return (
            <div className={style.container}>
                <div className={style.overlay} onClick={this.props.close.bind(this)}/>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" 
                                onClick={this.props.close.bind(this)}
                                className="close" 
                                data-dismiss="modal" 
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">Новый элемент меню</h4>
                    </div>
                   <div className="modal-body">
                        <p>One fine body&hellip;</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                                className="btn btn-default" 
                                data-dismiss="modal"
                                onClick={this.props.close.bind(this)}>
                                Close
                        </button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}