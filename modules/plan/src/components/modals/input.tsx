import * as React from 'react'
import * as styles from './input.css'

interface Props {
    defaultValue: number
    onEnter(value:number):void
    onClose():void
    visible: boolean
    top: number
    left: number
}
interface State {}

export default class Input extends React.Component<Props, State> {

    private input:number
    keyPressHandler(e){
        this.input = e.target.value
        switch(e.key){
            case 'Enter' :
                this.props.onEnter(e.target.value)
        }
    }

    render(){
        if(!this.props.visible) return null
        const { top, left} = this.props
        return (
            <div className={styles.overlay} 
                onClick={this.props.onClose}>
                <div className={styles.container} 
                    onClick={e=>e.stopPropagation()}
                    style={{top, left}}>
                    <input type="number"
                        defaultValue={''+this.props.defaultValue}
                        onKeyUp={this.keyPressHandler.bind(this)}
                        autoFocus
                    />
                </div>
            </div>
        )
    }
}