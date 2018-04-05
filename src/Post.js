import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import CSSTransition from 'react-transition-group/CSSTransition';

import { chain, composite, delay, spring, styler, tween } from 'popmotion';
import { cubicBezier } from 'popmotion/easing';
import scroll from 'stylefire/scroll';

import './Post.css';

const windowScroll = scroll();

class Post extends PureComponent {
  componentDidMount() {
    this.postStyler = styler(this.post);
    this.postScroll = scroll(this.post);

    const { post } = this.props.route.data;

    this.preview = document.querySelector(`.preview[data-id="${post.id}"]`);
    if (this.preview) {
      this.pageList = document.querySelector('.page-list');
      this.pageListStyler = styler(this.pageList);
    }
  }

  getPreviewPosition = () => {
    const {
      top: previewTop,
      width: previewWidth,
      height: previewHeight
    } = this.preview.getBoundingClientRect();

    return {
      top: previewTop,
      width: previewWidth,
      height: previewHeight,
      borderRadius: 16
    };
  };

  getTo = () => {
    return {
      top: 0,
      height: window.innerHeight,
      width: document.body.offsetWidth,
      borderRadius: 0
    };
  };

  executeTransition = (node, done, from, to) => {
    this.postStyler.set({ ...from, visibility: 'visible' });

    tween({ to, from, duration: 1000 }).start({
      update: this.postStyler.set,
      complete: () => {
        tween({ from: windowScroll.get('top'), to: 0 }).start({
          update: v => windowScroll.set('top', v),
          complete: () => {
            done();
          }
        });
      }
    });
  };

  onAddEndListener = (node, done) => {
    if (!this.preview) return done();
    // This makes sure we don't run the animation when
    // we don't have a preview element available on mount.
    // This happens when loading the Post directly without
    // going through the list page first.

    const to = this.getTo();
    const from = this.getPreviewPosition();

    const scrollTop = windowScroll.get('top');
    this.pageListStyler.set({ position: 'fixed', top: -scrollTop });
    windowScroll.set('top', 0);

    const { image } = this.props.route.data.post;

    const img = new Image();
    img.src = `/img/${image}`;

    if (!img.complete) {
      img.onload = () => this.executeTransition(node, done, from, to);
      return;
    }
    this.executeTransition(node, done, from, to);
  };

  render() {
    const {
      navigateTo,
      route,
      dispatch,
      previousRoute,
      ...transitionProps
    } = this.props;

    const { post } = route.data;
    const { title, image, content } = post;

    return (
      <CSSTransition
        {...transitionProps}
        addEndListener={this.onAddEndListener}
        classNames="post"
      >
        <div className="page full-width page-post">
          <div ref={post => (this.post = post)} className="post full-width">
            <div className="close" onClick={() => navigateTo('home')} />
            <div className="cover-wrapper">
              <div
                className="cover"
                style={{ backgroundImage: `url(/img/${image})` }}
              />
              <h1 className="title">{title}</h1>
            </div>
            <div className="content full-width">{content}</div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default connect(state => routeNodeSelector('post'))(Post);
