import * as React from 'react'
import Category from '../Category'
// import Menu from '../Menu'


export default class App extends React.Component<{}, null> {
    constructor(props: {}){
        super(props)
    }

    render(){
        return (
            <section className={''}>
                <Category/>
            </section>
        )
    }
}