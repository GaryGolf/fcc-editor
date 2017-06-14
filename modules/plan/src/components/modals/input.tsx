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

    private input:HTMLInputElement

    keyPressHandler(e){

        switch(e.key){
            case 'Enter' :
                this.props.onEnter(e.target.value)
                break
            case 'Escape' :
                this.props.onClose()
                break
        }
    }

    render(){
        if(!this.props.visible) return null
        const { top, left} = this.props
        return (
            <div className={styles.container} 
                onClick={e=>e.stopPropagation()}
                style={{top, left}}>
                <input type="number"
                    defaultValue={''+this.props.defaultValue}
                    ref={input=>this.input=input}
                    onKeyUp={this.keyPressHandler.bind(this)}
                    onBlur={this.props.onClose}
                    autoFocus={true}
                />
            </div>
        )
    }
}