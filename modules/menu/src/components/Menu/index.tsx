import * as React from 'react'
import * as QS from 'qs'
import * as constants from '../../constants'


const style = require('./menu.css')


interface Layout {
    description: string
    rand_id: number
}


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
    
    private layout: Array<Layout>

    constructor(props: Props){
        super(props)
        this.state = {menu: null}
        this.layout = [
            {description: 'Роллы', rand_id: 0},
            {description: 'Супы', rand_id: 2},
            {description: 'Напитки', rand_id: 3},
            {description: 'Алкоголь', rand_id: 6},
            {description: 'Табак', rand_id: 12}
        ]
    }

    componentDidMount(){

        const menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35'
        const url = constants.menu_view_url + menu_id
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Tenant-Domain': 'google',
                'Access-Token': 'infinity_access_token_google'
            }
        }
        window['fetch'](url,options)
            .then(response => response.json())
            .then((menu:IMenu) => this.setState({menu}))
            .catch(console.error)
    }

    render(){
        
        let layoutMap = Array(24).fill('')

        this.layout.forEach(item => {
            layoutMap[item.rand_id] = item.description
        })
        
        const menu = layoutMap.map((item, idx) => {
            const val = item || '+'
            return <div key={idx} className={['well', style.item].join(' ')}>{val}</div>
        })

        return (
            <section className={style.container}>
                menu
            </section>
        )
    }
}