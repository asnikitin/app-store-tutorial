import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Preview from './Preview';

import './List.css';

class List extends PureComponent {
  render() {
    const { posts, dispatch } = this.props;

    return (
      <div className="page full-width page-list">
        <div className="list">
          {posts.map(({ id, ...rest }) => (
            <Preview
              key={id}
              id={id}
              {...rest}
              onClick={() => dispatch({ type: 'Post', payload: id })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  posts: state.data.posts,
}))(List);
