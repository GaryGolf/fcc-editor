import * as React from 'react'

import MenuListItem from './menu-list-item'

interface Props {
    menu: Menu
    onSelect(id:string):void
}

export default class MenuList extends React.Component <Props, null> {

    render() {
        const list = this.props.menu.child_menus
            .map(item => <MenuListItem
                key={item.id}
                menuItem={item}
                onSelect={this.props.onSelect}
        />)

        return <div className="list-group">{list}</div>
    }
}