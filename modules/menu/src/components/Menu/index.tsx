import * as React from 'react'

interface iProduct {
    id: string
    product_category_id: string
    description: string
    price: number
    measure: string
}

interface IMenu {
    id: string
    icon: string
    color: string
    name: string
    lft: number
    rgt: number
    depth: number
    child_menus?: IMenu[]
    products?: iProduct[]
}
interface Props {}
interface State {menu : IMenu}

export default class Menu extends React.Component<Props, State> {
    private menu: Array<IMenu>
    constructor(props: Props){
        super(props)

        this.state = {menu: null}
    }

    componentDidMount(){

        const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
        const url = 'http://localhost:1337/google.release.dooglys.com/api/v1/menu/view/'+menu_id
        const options = {method: 'GET'}
        window['fetch'](url,options)
            .then(response => response.json())
            .then(menu => this.setState({menu}))
            .catch(console.error)
    }

    render(){
        return (
            <section className={''}>
                Menu qq
            </section>
        )
    }
}