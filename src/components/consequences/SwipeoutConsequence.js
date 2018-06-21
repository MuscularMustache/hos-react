import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Gesture from 'rc-gesture';
import DeleteConsequence from '../../mutations/DeleteConsequence';
import '../../styles/consequences.css';

class SwipeoutConsequence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: 0,
      currentStatus: 'closed',
      initStatus: 'closed'
    };
  }

  slideRight(slide) {
    const dist = slide.moveStatus.x;
    this.setState({ left: this.state.initStatus === 'open' ? dist + 120 : dist });
  }

  // slide to close
  slideLeft(slide) {
    let dontSlide = slide.moveStatus.x < 0 && this.state.left === 0;
    let dist = 0;
    if (this.state.left <= 0) { dontSlide = true; }
    if (this.state.initStatus === 'open') { dist = 120; }
    this.setState({ left: dontSlide ? 0 : slide.moveStatus.x + dist });
  }


  slideStart() {
    this.setState({ currentStatus: 'moving' });
  }

  slideEnd() {
    if (this.state.left >= 120) {
      this.setState({
        left: 120,
        currentStatus: 'open',
        initStatus: 'open'
      });
    } else {
      this.setState({
        left: 0,
        currentStatus: 'closed',
        initStatus: 'closed'
      });
    }
  }

  resetPosition() {
    this.setState({
      left: 0,
      currentStatus: 'closed',
      initStatus: 'closed'
    });
  }

  render() {
    const { id, content } = this.props;

    return (
      <Gesture
        direction="horizontal"
        onPanRight={panStatus => this.slideRight(panStatus)}
        onPanLeft={panStatus => this.slideLeft(panStatus)}
        onPanStart={() => this.slideStart()}
        onPanEnd={() => this.slideEnd()}
        onTap={() => this.resetPosition()}
      >
        <li className={`consequence no-select ${this.state.currentStatus}`}>
          <div className="flex-row actions" style={{ right: `calc(100% - ${this.state.left}px)` }}>
            <span
              className="delete"
              onClick={() => {
                this.props.mutate({ variables: { id } }).then(() => {
                  this.setState({ left: -400 });
                  // NOTE: not sure if this is worth it, might take longer than css transition to load
                  // maybe check out predictive ui stuff
                  setTimeout(() => {
                    this.props.refetchConequences();
                  }, 200);
                });
              }}
            >
              <i className="material-icons">delete_forever</i>
            </span>
            <span
              className="edit"
              onClick={() => this.props.editConsequence(id, content)}
            >
              <i className="material-icons">edit</i>
            </span>
          </div>
          <div className="consequence-content no-select" style={{ left: `${this.state.left}px` }}>
            {content}
          </div>
        </li>
      </Gesture>
    );
  }
}

export default graphql(DeleteConsequence)(SwipeoutConsequence);
