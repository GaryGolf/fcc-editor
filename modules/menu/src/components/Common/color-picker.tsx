import * as React from 'react'
import * as styles from './color-picker.css'

interface Props {
    visible: boolean
    colors: Array<string>
    onSelect(color:string): void
}

export default class ColorPicker extends React.Component<Props, null> {
    render(){
        const {colors, onSelect, visible} = this.props
        if(!visible) return null
        const items = colors.map(color => (
            <div key={color}
                className={styles.color}
                onClick={()=>onSelect(color)}
                style={{backgroundColor:color}}
            />
        ))
        return (
            <div className={styles.container}>
                <div className={styles.overlay}
                    onClick={()=>onSelect(null)}
                />
                <div className={styles.modal}>
                    {items}
                </div>
            </div>
        )
    }
}
