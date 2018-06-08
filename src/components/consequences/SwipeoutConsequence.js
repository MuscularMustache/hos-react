import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Gesture from 'rc-gesture';
import DeleteConsequence from '../../mutations/DeleteConsequence';
import '../../styles/consequences.css';

class SwipeoutConsequence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      right: 0,
      currentStatus: 'closed',
      initStatus: 'closed'
    };
  }

  slideLeft(slide) {
    const dist = slide.moveStatus.x * -1;
    this.setState({ right: this.state.initStatus === 'open' ? dist + 120 : dist });
  }

  // slide to close
  slideRight(slide) {
    // let dontSlide = slide.moveStatus.x < 0 && this.state.right === 0;
    let dontSlide;
    let dist = 0;
    // if (this.state.right <= 0) { dontSlide = true; }
    if (this.state.initStatus === 'open') { dist = 120; }
    this.setState({ right: dontSlide ? 0 : (slide.moveStatus.x * -1) + dist });
  }


  slideStart() {
    this.setState({ currentStatus: 'moving' });
  }

  slideEnd() {
    if (this.state.right >= 120) {
      this.setState({
        right: 120,
        currentStatus: 'open',
        initStatus: 'open'
      });
    } else {
      this.setState({
        right: 0,
        currentStatus: 'closed',
        initStatus: 'closed'
      });
    }
  }

  resetPosition() {
    this.setState({
      right: 0,
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
          <div className="hidden-message" style={{ right: `calc(100% - ${this.state.right * -1}px)` }}>
            <span>
              {this.state.deleting ? 'cya nerd' : 'other fucking way'} <i className="material-icons">chevron_right</i>
            </span>
          </div>
          <div className="flex-row actions" style={{ left: `calc(100% - ${this.state.right}px)` }}>
            <span
              className="delete"
              onClick={() => {
                this.props.mutate({ variables: { id } }).then(() => {
                  this.setState({ right: -400, deleting: true });
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
              onClick={() => window.confirm('Edit consequence under construction')} // eslint-disable-line no-alert, no-undef
            >
              <i className="material-icons">edit</i>
            </span>
          </div>
          <div className="consequence-content no-select" style={{ right: `${this.state.right}px` }}>
            {content}
          </div>
        </li>
      </Gesture>
    );
  }
}

export default graphql(DeleteConsequence)(SwipeoutConsequence);
