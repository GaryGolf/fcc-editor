import * as React from 'react'

import TurnoverTable from '../turnover-table'

interface Props {}
interface State {

}

export default class TurnoverPlan extends React.Component <Props, State> {
    render(){
        return (
            <div>
                <TurnoverTable/>
            </div>
        )
    }
}