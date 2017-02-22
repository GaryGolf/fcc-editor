import * as React from 'react';
import Container from './Container';

interface Props {}
interface State {}

export default class SortableSimple extends React.Component<Props, State> {
  render() {
    return (
      <div>
        
        <p>
          It is easy to implement a sortable interface with React DnD. Just make the same component both a drag source and a drop target, and reorder the data in the <code>hover</code> handler.
        </p>
        <Container />
      </div>
    );
  }
}