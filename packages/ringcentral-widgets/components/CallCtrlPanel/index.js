import React, { Component } from 'react';
import PropTypes from 'prop-types';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import ActiveCallDialPad from '../ActiveCallDialPad';
import ActiveCallPanel from '../ActiveCallPanel';
import FlipPanel from '../FlipPanel';
import ConfirmMergeModal from '../ConfirmMergeModal';
import SpinnerOverlay from '../SpinnerOverlay';

class CallCtrlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowKeyPad: false,
      isShowFlipPanel: false,
      isShowMergeConfirm: false,
    };

    this.hiddenKeyPad = () => {
      this.setState({
        isShowKeyPad: false,
      });
    };

    this.showKeyPad = () => {
      this.setState({
        isShowKeyPad: true,
      });
    };

    this.showFlipPanel = () => {
      this.setState({
        isShowFlipPanel: true,
      });
    };

    this.hideFlipPanel = () => {
      this.setState({
        isShowFlipPanel: false,
      });
    };

    this.onTransfer = () => {
      this.props.onTransfer(this.props.sessionId);
    };

    this.onMerge = () => {
      const { onBeforeMerge } = this.props;
      if (!onBeforeMerge || onBeforeMerge()) {
        if (
          this.props.hasConferenceCall &&
          this.props.layout === callCtrlLayouts.normalCtrl
        ) {
          this.showMergeConfirm();
        } else if (this.props.onMerge) {
          this.props.onMerge();
        }
      }
      // track user click merge
      this.props.afterOnMerge();
    };
    this.showMergeConfirm = () => {
      this.setState({
        isShowMergeConfirm: true,
      });
    };

    this.hideMergeConfirm = () => {
      this.setState({
        isShowMergeConfirm: false,
      });
    };

    this.hideMergeConfirmAlt = () => {
      this.hideMergeConfirm();
      // user action track
      this.props.afterHideMergeConfirm();
    };

    this.confirmMerge = () => {
      this.setState({
        isShowMergeConfirm: false
      });
      if (this.props.onMerge) {
        this.props.onMerge();
      }
      // user action track
      this.props.afterConfirmMerge();
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.hasConferenceCall && this.state.isShowMergeConfirm) {
      this.hideMergeConfirm();
    }
    if (this.props.sessionId !== nextProps.sessionId) {
      this.hiddenKeyPad();
      this.hideFlipPanel();
      this.hideMergeConfirm();
    }
  }

  render() {
    const {
      onKeyPadChange,
      actions,
      addDisabled,
      areaCode,
      avatarUrl,
      backButtonLabel,
      brand,
      callStatus,
      children,
      conferenceCallEquipped,
      conferenceCallParties,
      controlBusy,
      countryCode,
      currentLocale,
      direction,
      fallBackName,
      flipNumbers,
      formatPhone,
      getAvatarUrl,
      gotoParticipantsCtrl,
      hasConferenceCall,
      isOnFlip,
      isOnHold,
      isOnMute,
      lastCallInfo,
      layout,
      mergeDisabled,
      nameMatches,
      onAdd,
      onBackButtonClick,
      onFlip,
      onHangup,
      onHold,
      onMute,
      onPark,
      onRecord,
      onSelectMatcherName,
      onStopRecord,
      onUnhold,
      onUnmute,
      phoneNumber,
      phoneSourceNameRenderer,
      phoneTypeRenderer,
      recordStatus,
      selectedMatcherIndex,
      sessionId,
      showBackButton,
      showContactDisplayPlaceholder,
      showSpinner,
      sourceIcons,
      startTime,
    } = this.props;
    const {
      isShowKeyPad,
      isShowFlipPanel,
      isShowMergeConfirm,
    } = this.state;

    if (isShowKeyPad) {
      return (
        <ActiveCallDialPad
          onChange={onKeyPadChange}
          hiddenDialPad={this.hiddenKeyPad}
          onHangup={onHangup}
          currentLocale={currentLocale}
        />
      );
    }
    if (isShowFlipPanel) {
      return (
        <FlipPanel
          isOnFlip={isOnFlip}
          flipNumbers={flipNumbers}
          currentLocale={currentLocale}
          formatPhone={formatPhone}
          hideFlipPanel={this.hideFlipPanel}
          onFlip={onFlip}
          complete={onHangup}
        />
      );
    }
    return (
      <ActiveCallPanel
        showBackButton={showBackButton}
        backButtonLabel={backButtonLabel}
        onBackButtonClick={onBackButtonClick}
        currentLocale={currentLocale}
        formatPhone={formatPhone}
        phoneNumber={phoneNumber}
        sessionId={sessionId}
        callStatus={callStatus}
        startTime={startTime}
        isOnMute={isOnMute}
        isOnHold={isOnHold}
        recordStatus={recordStatus}
        onMute={onMute}
        onUnmute={onUnmute}
        onHold={onHold}
        onUnhold={onUnhold}
        onRecord={onRecord}
        onStopRecord={onStopRecord}
        onShowKeyPad={this.showKeyPad}
        onHangup={onHangup}
        onPark={onPark}
        onAdd={onAdd}
        onMerge={this.onMerge}
        nameMatches={nameMatches}
        fallBackName={fallBackName}
        areaCode={areaCode}
        countryCode={countryCode}
        selectedMatcherIndex={selectedMatcherIndex}
        onSelectMatcherName={onSelectMatcherName}
        avatarUrl={avatarUrl}
        brand={brand}
        showContactDisplayPlaceholder={showContactDisplayPlaceholder}
        onShowFlipPanel={this.showFlipPanel}
        onToggleTransferPanel={this.onTransfer}
        gotoParticipantsCtrl={gotoParticipantsCtrl}
        flipNumbers={flipNumbers}
        sourceIcons={sourceIcons}
        phoneTypeRenderer={phoneTypeRenderer}
        phoneSourceNameRenderer={phoneSourceNameRenderer}
        layout={layout}
        direction={direction}
        addDisabled={addDisabled}
        mergeDisabled={mergeDisabled}
        conferenceCallEquipped={conferenceCallEquipped}
        hasConferenceCall={hasConferenceCall}
        conferenceCallParties={conferenceCallParties}
        lastCallInfo={lastCallInfo}
        getAvatarUrl={getAvatarUrl}
        actions={actions}
        controlBusy={controlBusy}
      >
        {children}
        {showSpinner ? <SpinnerOverlay /> : null}
        {
          layout === callCtrlLayouts.normalCtrl ?
            (
              <ConfirmMergeModal
                currentLocale={currentLocale}
                show={isShowMergeConfirm}
                onMerge={this.confirmMerge}
                onCancel={this.hideMergeConfirmAlt}
                partyProfiles={conferenceCallParties}
              />
            ) :
            null
        }
      </ActiveCallPanel>
    );
  }
}

CallCtrlPanel.propTypes = {
  callStatus: PropTypes.string,
  sessionId: PropTypes.string,
  phoneNumber: PropTypes.string,
  nameMatches: PropTypes.array.isRequired,
  fallBackName: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  isOnFlip: PropTypes.bool,
  flipNumbers: PropTypes.array,
  recordStatus: PropTypes.string,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func,
  onStopRecord: PropTypes.func,
  onAdd: PropTypes.func,
  onMerge: PropTypes.func,
  onBeforeMerge: PropTypes.func,
  onPark: PropTypes.func,
  onHangup: PropTypes.func.isRequired,
  onFlip: PropTypes.func,
  onTransfer: PropTypes.func.isRequired,
  showBackButton: PropTypes.bool,
  backButtonLabel: PropTypes.string,
  onBackButtonClick: PropTypes.func,
  onKeyPadChange: PropTypes.func,
  formatPhone: PropTypes.func.isRequired,
  children: PropTypes.node,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  selectedMatcherIndex: PropTypes.number.isRequired,
  onSelectMatcherName: PropTypes.func,
  avatarUrl: PropTypes.string,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  layout: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool,
  direction: PropTypes.string,
  addDisabled: PropTypes.bool,
  mergeDisabled: PropTypes.bool,
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  lastCallInfo: PropTypes.object,
  conferenceCallParties: PropTypes.array,
  getAvatarUrl: PropTypes.func,
  gotoParticipantsCtrl: PropTypes.func,
  afterHideMergeConfirm: PropTypes.func,
  afterConfirmMerge: PropTypes.func,
  afterOnMerge: PropTypes.func,
  actions: PropTypes.array,
  controlBusy: PropTypes.bool,
};

CallCtrlPanel.defaultProps = {
  startTime: null,
  isOnMute: false,
  isOnHold: false,
  isOnFlip: false,
  flipNumbers: [],
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  showBackButton: false,
  backButtonLabel: 'Active Calls',
  onBackButtonClick: null,
  sessionId: undefined,
  callStatus: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  onAdd: undefined,
  onMerge: undefined,
  onBeforeMerge: undefined,
  showSpinner: false,
  direction: null,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: undefined,
  getAvatarUrl: () => null,
  gotoParticipantsCtrl: i => i,
  afterHideMergeConfirm: () => null,
  afterConfirmMerge: () => null,
  afterOnMerge: () => null,
  onFlip: () => null,
  onRecord: () => null,
  onStopRecord: () => null,
  onPark: () => null,
  onKeyPadChange: () => null,
  onSelectMatcherName: () => null,
  actions: [],
  recordStatus: '',
  controlBusy: false,
};

export default CallCtrlPanel;
