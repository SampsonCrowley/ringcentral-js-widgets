import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import i18n from './i18n';
import SpinnerOverlay from '../SpinnerOverlay';

export default class LoginPanel extends Component {
  componentDidMount() {
    this.props.setupOAuth();
  }

  componentWillUnmount() {
    this.props.destroyOAuth();
  }

  render() {
    const {
      className,
      onLoginButtonClick,
      currentLocale,
      disabled,
      version,
      showSpinner,
      children,
      showSignUp,
      onSignUpButtonClick,
      customStyles
    } = this.props;
    const spinner = showSpinner ? <SpinnerOverlay /> : null;
    const versionDisplay = version ? (
      <div className={styles.versionContainer}>
        {i18n.getString('version', currentLocale)} {version}
      </div>
    ) : null;
    return (
      <div className={classnames(styles.root, className)}>
        <button
          data-sign="loginButton"
          className={classnames(styles.loginButton, customStyles)}
          onClick={onLoginButtonClick}
          disabled={disabled}
        >
          {i18n.getString('loginButton', currentLocale)}
        </button>
        {showSignUp && (
          <button
            className={styles.signUpButton}
            onClick={onSignUpButtonClick}>
            {i18n.getString('signupButton', currentLocale)}
          </button>
        )}
        {versionDisplay}
        {spinner}
        {children}
      </div>
    );
  }
}

LoginPanel.propTypes = {
  className: PropTypes.string,
  setupOAuth: PropTypes.func.isRequired,
  destroyOAuth: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  version: PropTypes.string,
  showSpinner: PropTypes.bool,
  children: PropTypes.node,
  showSignUp: PropTypes.bool,
  onSignUpButtonClick: PropTypes.func,
  customStyles: PropTypes.string,
};

LoginPanel.defaultProps = {
  className: null,
  disabled: false,
  version: undefined,
  showSpinner: false,
  children: undefined,
  showSignUp: false,
  onSignUpButtonClick() {},
  customStyles: undefined,
};
