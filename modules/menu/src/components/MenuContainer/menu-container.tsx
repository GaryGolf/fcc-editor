import * as React from 'react'
import * as Actions from '../../actions'
import * as styles from './menu-container.css'

import MenuTile from './menu-tile'
import MenuTree from './menu-tree'
import NewMenu from '../Modals/new-menu'

interface Props {
    menu: Menu
    actions: Actions.Interface
}
interface State {
    showTiles: boolean
    showNewMenuModal: boolean
}

export default class MenuContainer extends React.Component <Props, State> {

    constructor(props: Props){
        super(props)

        this.state={
            showTiles: true,
            showNewMenuModal: false
        }
    }

    switchScreen(showTiles: boolean){
        this.setState({showTiles})
    }

    sumitNewMenuHandler(menuItem:MenuItem){
        this.props.actions.menu.createMenuItem(menuItem)
    }

    render(){
        
        if(!this.props.menu) return null
        const {showTiles} = this.state
        
        const header = (
            <header className={styles.header}>
                <div className={styles.headerline}>
                    <div className={'h2 ' + styles.title}>{this.props.menu.name}</div>
                    <div className={styles.buttongroup}>
                        <button className="btn btn-default" 
                            onClick={()=>this.setState({showNewMenuModal: true})}>
                             <span className="glyphicon glyphicon-plus"/>
                             &nbsp; Добавить
                        </button>
                        <div className="btn btn-default"
                            data-active={showTiles}
                            onClick={()=>this.switchScreen(true)}>
                            <span className="glyphicon glyphicon-th"/>
                        </div>
                        <div className="btn btn-default"
                            data-active={!showTiles}
                            onClick={()=>this.switchScreen(false)}>
                            <span className="glyphicon glyphicon-th-list"/>
                        </div>
                    </div>
                </div>
                <NewMenu  
                    visible={this.state.showNewMenuModal}
                    menu={this.props.menu}
                    onClose={()=>this.setState({showNewMenuModal:false})}
                    onSubmit={this.sumitNewMenuHandler.bind(this)}
                />
            </header>
        )

        return (
            <section className={styles.container}>
                {header}
                <MenuTile
                    visible={showTiles} 
                    actions={this.props.actions}
                    menu={this.props.menu}
                />
                <MenuTree
                    visible={!showTiles} 
                    actions={this.props.actions}
                    menu={this.props.menu}
                />
            </section>
        )
    }
}