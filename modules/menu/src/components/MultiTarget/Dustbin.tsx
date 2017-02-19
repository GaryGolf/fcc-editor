import * as React from 'react'
const { DropTarget } = require('react-dnd')

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
}

interface Props {
    accepts: Array<string>
    lastDroppedItem: any
    isOver?: boolean
    canDrop?: boolean
    onDrop: (any)=> any
    connectDropTarget?: (any) => any
}
interface State {}

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Dustbin extends React.Component<Props, State> {
  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
    accepts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    lastDroppedItem: React.PropTypes.object,
    onDrop: React.PropTypes.func.isRequired,
  };

  render() {
    const { accepts, isOver, canDrop, connectDropTarget, lastDroppedItem } = this.props;
    const isActive = isOver && canDrop;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {isActive ?
          'Release to drop' :
          `This dustbin accepts: ${accepts.join(', ')}`
        }

        {lastDroppedItem &&
          <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
        }
      </div>,
    )
  }
}