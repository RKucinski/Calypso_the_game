/* eslint-disable */

import React, { Component, createContext } from 'react';

export const FullscreenContext = createContext();

class FullscreenProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false,
      setFullscreen: this.setFullscreen,
    };
  }

  setFullscreen = () => {
    this.setState({
      isFull: true,
    });
    console.log('good');
  };

  render() {
    return (
      <FullscreenContext.Provider value={this.state}>
        {this.props.children}
      </FullscreenContext.Provider>
    );
  }
}

export const withFullscreen = Component => props => (
  <FullscreenContext.Consumer>
    {value => <Component {...props} {...value} />}
  </FullscreenContext.Consumer>
);

export default FullscreenProvider;
