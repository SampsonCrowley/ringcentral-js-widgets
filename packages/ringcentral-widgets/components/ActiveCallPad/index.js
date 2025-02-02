import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import recordStatus from 'ringcentral-integration/modules/Webphone/recordStatus';
import { isObject } from 'ringcentral-integration/lib/di/utils/is_type';

import CircleButton from '../CircleButton';
import Tooltip from '../Tooltip';
import ActiveCallButton from '../ActiveCallButton';
import MuteIcon from '../../assets/images/Mute.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import KeypadIcon from '../../assets/images/Dialpad.svg';
import HoldIcon from '../../assets/images/Hold.svg';
// import ParkIcon from '../../assets/images/Park.svg';
import RecordIcon from '../../assets/images/Record.svg';
// import AddIcon from '../../assets/images/AddCall.svg';
import MoreIcon from '../../assets/images/MoreIcon.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import FlipIcon from '../../assets/images/Flip.svg';
import EndIcon from '../../assets/images/End.svg';
import CombineIcon from '../../assets/images/Combine.svg';
import MergeIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { pickElements } from './utils';

import MoreActionItem from './MoreActionItem';

import styles from './styles.scss';
import i18n from './i18n';

const DisplayButtonNumber = 6;

export const ACTIONS_CTRL_MAP = {
  muteCtrl: 'muteCtrl',
  keypadCtrl: 'keypadCtrl',
  holdCtrl: 'holdCtrl',
  mergeOrAddCtrl: 'mergeOrAddCtrl',
  recordCtrl: 'recordCtrl',
  transferCtrl: 'transferCtrl',
  flipCtrl: 'flipCtrl'
};

class ActiveCallPad extends Component {
  constructor(props) {
    super(props);
    this.moreButton = createRef();
    this.dropdown = createRef();
    this.onClick = this:: this.onClick;
    this.toggleMore = this:: this.toggleMore;
    this.state = {
      expandMore: props.expandMore,
      moreButton: this.moreButton && this.moreButton.current,
    };
  }

  onClick(e) {
    if (isObject(this.dropdown) && isObject(this.dropdown.current)) {
      const { dom: { current } } = this.dropdown.current;

      if (
        !current.contains(e.target) &&
        !this.moreButton.current.contains(e.target) &&
        this.state.expandMore
      ) {
        this.setState({
          expandMore: false,
        });
      }
    }
  }

  toggleMore() {
    this.setState(prevState => ({
      expandMore: !prevState.expandMore
    }));
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onClick);
    this.setState({
      moreButton: this.moreButton && this.moreButton.current,
    });
  }

  componentWillReceiveProps() {
    this.setState({
      moreButton: this.moreButton && this.moreButton.current,
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClick);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }

    let showUpdate = false;

    for (const p in nextProps) {
      if (nextProps::Object.prototype.hasOwnProperty(p)) {
        const val = nextProps[p];

        if (
          val !== this.props[p] &&
            (typeof val !== 'function')
        ) {
          showUpdate = true;
          break;
        }
      }
    }
    return showUpdate;
  }

  render() {
    const {
      controlBusy,
    } = this.props;

    let buttons = [];
    /* --------------------- Mute/Unmute --------------------------- */
    buttons.push(this.props.isOnMute ?
      {
        icon: MuteIcon,
        id: ACTIONS_CTRL_MAP.muteCtrl,
        dataSign: 'mute',
        title: i18n.getString('unmute', this.props.currentLocale),
        disabled: this.props.isOnHold || controlBusy,
        onClick: this.props.onUnmute,
      } :
      {
        icon: UnmuteIcon,
        id: ACTIONS_CTRL_MAP.muteCtrl,
        dataSign: 'unmute',
        title: i18n.getString('mute', this.props.currentLocale),
        disabled: this.props.isOnHold || controlBusy,
        onClick: this.props.onMute,
      }
    );

    /* --------------------- keyPad --------------------------- */
    buttons.push(
      {
        icon: KeypadIcon,
        id: ACTIONS_CTRL_MAP.keypadCtrl,
        dataSign: 'keypad',
        title: i18n.getString('keypad', this.props.currentLocale),
        onClick: this.props.onShowKeyPad,
        disabled: this.props.layout === callCtrlLayouts.conferenceCtrl,
      }
    );

    /* --------------------- Hold/Unhold --------------------------- */
    buttons.push(
      {
        icon: HoldIcon,
        id: ACTIONS_CTRL_MAP.holdCtrl,
        iconWidth: 120,
        iconHeight: 160,
        iconX: 190,
        iconY: 165,
        dataSign: this.props.isOnHold ? 'onHold' : 'hold',
        title: this.props.isOnHold ?
          i18n.getString('onHold', this.props.currentLocale) :
          i18n.getString('hold', this.props.currentLocale),
        active: this.props.isOnHold,
        onClick: this.props.isOnHold ?
          this.props.onUnhold :
          this.props.onHold,
        disabled: controlBusy,
      }
    );

    /* --------------------- Add/Merge --------------------------- */
    if (this.props.conferenceCallEquipped) {
      const showMerge = (
        this.props.layout === callCtrlLayouts.mergeCtrl ||
        (this.props.layout === callCtrlLayouts.normalCtrl && this.props.hasConferenceCall)
      );
      buttons.push(showMerge ?
        {
          icon: MergeIcon,
          id: ACTIONS_CTRL_MAP.mergeOrAddCtrl,
          dataSign: 'merge',
          title: i18n.getString('mergeToConference', this.props.currentLocale),
          disabled: this.props.mergeDisabled || controlBusy,
          onClick: this.props.onMerge,
          showRipple: !this.props.mergeDisabled,
        } :
        {
          icon: CombineIcon,
          id: ACTIONS_CTRL_MAP.mergeOrAddCtrl,
          dataSign: 'add',
          title: i18n.getString('add', this.props.currentLocale),
          disabled: this.props.addDisabled || controlBusy,
          onClick: this.props.onAdd,
        }
      );
    }

    /* --------------------- Record/Stop --------------------------- */
    buttons.push(
      {
        icon: RecordIcon,
        id: ACTIONS_CTRL_MAP.recordCtrl,
        dataSign: this.props.recordStatus === recordStatus.recording ? 'stopRecord' : 'record',
        title: this.props.recordStatus === recordStatus.recording ?
          i18n.getString('stopRecord', this.props.currentLocale) :
          i18n.getString('record', this.props.currentLocale),
        active: this.props.recordStatus === recordStatus.recording,
        disabled: (
          this.props.isOnHold ||
          this.props.recordStatus === recordStatus.pending ||
          this.props.layout === callCtrlLayouts.mergeCtrl ||
          this.props.recordStatus === recordStatus.noAccess ||
          controlBusy
        ),
        onClick: this.props.recordStatus === recordStatus.recording ?
          this.props.onStopRecord :
          this.props.onRecord,
      }
    );

    /* --------------------- Transfer --------------------------- */
    const disabledTransfer = (
      this.props.layout !== callCtrlLayouts.normalCtrl
    );
    buttons.push(
      {
        icon: TransferIcon,
        id: ACTIONS_CTRL_MAP.transferCtrl,
        dataSign: 'transfer',
        title: i18n.getString('transfer', this.props.currentLocale),
        disabled: disabledTransfer || controlBusy,
        onClick: this.props.onToggleTransferPanel,
      }
    );

    /* --------------------- Flip --------------------------- */
    const disabledFlip = (
      this.props.flipNumbers.length === 0 ||
      this.props.isOnHold ||
      this.props.layout !== callCtrlLayouts.normalCtrl
    );
    buttons.push(
      {
        icon: FlipIcon,
        id: ACTIONS_CTRL_MAP.flipCtrl,
        dataSign: 'flip',
        title: i18n.getString('flip', this.props.currentLocale),
        disabled: disabledFlip || controlBusy,
        onClick: this.props.onShowFlipPanel,
      }
    );

    // filter actions
    const { actions } = this.props;
    if (actions.length > 0) {
      buttons = pickElements(actions, buttons);
    }

    /* --------------------- More Actions --------------------------- */
    let moreActions = null;
    if (buttons.length > DisplayButtonNumber) {
      moreActions = (
        <span
          className={styles.moreButtonContainer}
          ref={this.moreButton}
        >
          <ActiveCallButton
            onClick={this.toggleMore}
            title={i18n.getString('more', this.props.currentLocale)}
            active={this.state.expandMore}
            className={classnames(styles.moreButton, styles.callButton)}
            disabled={disabledFlip && disabledTransfer || controlBusy}
            icon={MoreIcon}
            dataSign="callActions" />
          <Tooltip
            fixed={false}
            open={this.state.expandMore}
            direction="top"
            ref={this.dropdown}
            triggerElm={this.state.moreButton}>
            <div className={styles.buttonPopup}>
              {
                buttons.slice(DisplayButtonNumber - 1).map(({
                  id,
                  ...opts
                }) => (
                  <MoreActionItem
  key={id}
  {...opts}
                />
                ))
              }
            </div>
          </Tooltip>
        </span>
      );
    }

    const isLessBtn = (buttons.length <= 3) && moreActions === null;
    return (
      <div className={classnames(styles.root, this.props.className)}>
        <div className={classnames(styles.callCtrlButtonGroup, isLessBtn && styles.biggerButton)}>
          <div className={styles.buttonRow}>
            {
              buttons.slice(0, DisplayButtonNumber - (moreActions ? 1 : 0)).map(opts => (
                <ActiveCallButton
                  key={opts.title}
                  className={styles.callButton}
                  {...opts}
                />
              ))
            }
            {moreActions}
          </div>
        </div>
        <div className={classnames(styles.buttonRow, styles.stopButtonGroup)}>
          <div className={styles.button}>
            <CircleButton
              className={classnames(
                styles.stopButton,
                controlBusy && styles.disabled,
              )}
              onClick={this.props.onHangup}
              icon={EndIcon}
              showBorder={false}
              iconWidth={250}
              iconX={125}
              dataSign="hangup"
              disabled={controlBusy}
            />
          </div>
        </div>
      </div>
    );
  }
}

ActiveCallPad.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  recordStatus: PropTypes.string.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  // onPark: PropTypes.func.isRequired,
  onShowKeyPad: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onMerge: PropTypes.func,
  onShowFlipPanel: PropTypes.func.isRequired,
  onToggleTransferPanel: PropTypes.func.isRequired,
  flipNumbers: PropTypes.array.isRequired,
  layout: PropTypes.string,
  addDisabled: PropTypes.bool,
  mergeDisabled: PropTypes.bool,
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  expandMore: PropTypes.bool,
  actions: PropTypes.array
};

ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
  layout: callCtrlLayouts.normalCtrl,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  onAdd: undefined,
  onMerge: undefined,
  expandMore: false,
  actions: []
};

export default ActiveCallPad;
