import * as React from 'react';
const {DragDropContextProvider} = require('react-dnd')
const HTML5Backend = require('react-dnd-html5-backend')
import Dustbin from './Dustbin';
import Box from './Box';

interface Props {}
interface State {}
export default class Container extends React.Component<Props, State> {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <Dustbin />
          </div>
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <Box name="Glass" />
            <Box name="Banana" />
            <Box name="Paper" />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}