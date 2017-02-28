import * as React from 'react'

const style = require('./input.css')

interface Props {}
interface State {}

export default class Input extends React.Component <Props, State> {
    constructor(props: Props){
        super(props)
    }

    render(){
        
        return (
            <div className={style.container}>
         
            </div>
        )
    }
}