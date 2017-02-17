import * as React from 'react'
const style = require('./tile.css')

interface Props { 
    onClick: () => void
}
interface State {}

export default class Tile extends React.Component<Props, State>{

    constructor(props: Props){
        super(props)
    }

    render(){

        const tileStyle =[
            style.container,
            'well',
        ].join(' ')

        return (
            <div className={tileStyle} onClick={this.props.onClick.bind(this)}>
                <span className='glyphicon glyphicon-plus'/>
            </div>
        )
    }
}