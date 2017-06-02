import * as React from 'react'
import * as CONST from '../../constants'
import * as styles from './new-item-modal.css'

interface Props {
    onClose():void
    visible: boolean
}

export default class NewItemModal extends React.Component <Props, null> {
    render(){
        if(!this.props.visible) return null
        return (
         <div className={styles.overlay} onClick={this.props.onClose}>
             <div className="modal-dialog" 
                onClick={e=>e.stopPropagation()}
                role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            onClick={this.props.onClose}
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h2 className="modal-title">{CONST.DOMAIN}</h2>
                    </div>
                    <div className="modal-body">
                        <p>Hello</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                            className="btn btn-default" 
                            onClick={this.props.onClose}
                            data-dismiss="modal">
                            Cancel
                        </button>
                        <button type="button" 
                            className="btn btn-default">
                            <span className="glyphicon glyphicon-trash"/>&nbsp;
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}