import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dynamicsFonts from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

function ToggleButton({
  onClick,
}) {
  return (
    <div
      className={styles.toggleButton}
      onClick={onClick}
    >
      <div className={styles.toggleButtonInner} />
      <div className={styles.toggleButtonIcon} >
        <span className={classnames(dynamicsFonts.arrow)} />
      </div>
    </div>
  );
}
ToggleButton.propTypes = {
  onClick: PropTypes.func,
};
ToggleButton.defaultProps = {
  onClick: undefined,
};

function ExtendIcon({ onClick, extendIconClassName }) {
  return (
    <div className={styles.extendIcon} onClick={onClick}>
      <div className={classnames(styles.extendInner, extendIconClassName)} />
    </div>
  );
}

export default class SlideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.extended !== this.props.extended) {
      this.setState({
        extended: nextProps.extended
      });
    }
  }
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  onToggle = (e) => {
    e.stopPropagation();
    this.setState(prevState => ({ extended: !prevState.extended }));
    if (this.props.onToggle) {
      this.props.onToggle(e);
    }
  }
  render() {
    const {
      className,
      minHeight,
      maxHeight,
      children,
      withAnimation,
    } = this.props;

    const extended = this.props.extended || this.state.extended;

    const wrapperStyles = {
      height: extended ?
        maxHeight :
        minHeight,
    };

    return (
      <div
        className={classnames(
          styles.root,
          className
        )}
      >
        <div
          className={classnames(
            styles.wrapper,
            withAnimation && styles.withAnimation
          )}
          style={wrapperStyles}
        >
          <div
            className={styles.content}
          >
            {children}
          </div>
        </div>
        <ExtendIcon
          extendIconClassName={
            extended ? classnames(styles.extended, this.props.extendIconClassName) : null
          }
          onClick={this.onToggle} />
      </div>
    );
  }
}

SlideMenu.propTypes = {
  children: PropTypes.node,
  extended: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  extendIconClassName: PropTypes.string,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  withAnimation: PropTypes.bool,
};
SlideMenu.defaultProps = {
  className: undefined,
  extendIconClassName: undefined,
  children: undefined,
  onToggle: undefined,
  extended: false,
  minHeight: 0,
  maxHeight: 100,
  withAnimation: true,
};
