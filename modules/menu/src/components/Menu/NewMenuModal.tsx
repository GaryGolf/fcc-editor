import * as React from 'react'

const style = require('./new-menu.css')

interface Props {
    show: boolean
    close: ()=>void
}
interface State {}
export default class NewMenuModal extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }
   
    render(){
        if(!this.props.show) return null
        return (
            <div className={style.container}>
                <div className={style.overlay} />
                <div className="modal fade in"  role="dialog" style={{display:'block'}} onClick={this.props.close.bind(this)}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
            </div>
        )
    }
}