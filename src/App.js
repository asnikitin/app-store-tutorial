import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import List from './List';
import Post from './Post';

import './App.css';

class App extends PureComponent {
  render() {
    const { isOpen } = this.props;
    return (
      <div className="App">
        <List />
        <TransitionGroup>
          { isOpen ? <Post  /> : ''}
        </TransitionGroup>
      </div>
    );
  }
}

export default connect(state => ({
  isOpen: state.data.isOpen,
}))(App);
