import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import Header from '../Header';
import Panel from '../Panel';
import Line from '../Line';
import LinkLine from '../LinkLine';
import IconLine from '../IconLine';
import Eula from '../Eula';
import SpinnerOverlay from '../SpinnerOverlay';
import PresenceSettingSection from '../PresenceSettingSection';
import styles from './styles.scss';
import Switch from '../Switch';
import InputLine from '../InputLine';
import LocalePicker from '../LocalePicker';
import i18n from './i18n';


export default function SettingsPanel({
  children,
  className,
  onLogoutButtonClick,
  loginNumber,
  version,
  currentLocale,
  brandId,
  EulaRenderer,
  onCallingSettingsLinkClick,
  onRegionSettingsLinkClick,
  onAudioSettingsLinkClick,
  onFeedbackSettingsLinkClick,
  onQuickAccessLinkClick,
  onUserGuideClick,
  showCalling,
  showAutoLog,
  showAutoLogNotes,
  showAudio,
  showReport,
  autoLogEnabled,
  autoLogNotesEnabled,
  disableAutoLogEnabled,
  disableAutoLogNotesEnabled,
  onAutoLogChange,
  onAutoLogNotesChange,
  showAutoLogSMS,
  autoLogSMSEnabled,
  onAutoLogSMSChange,
  showClickToDial,
  clickToDialEnabled,
  clickToDialPermissions,
  onClickToDialChange,
  onReportLinkClick,
  showRegion,
  showHeader,
  outboundSMS,
  showSpinner,
  dndStatus,
  userStatus,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  toggleAcceptCallQueueCalls,
  isCallQueueMember,
  showPresenceSettings,
  openPresenceSettings,
  showMsteamsSettings,
  onMsteamsSettingsLinkClick,
  showFeedback,
  showQuickAccess,
  showUserGuide,
  additional,
  supportedLocales,
  savedLocale,
  saveLocale,
  clickToDialTitle,
  versionContainer,
  autoLogTitle,
  autoLogSMSTitle,
}) {
  if (showSpinner) {
    return (
      <SpinnerOverlay />
    );
  }

  const locale = supportedLocales && supportedLocales.length > 1 && (
    <InputLine
      label={i18n.getString('language', currentLocale)}
    >
      <LocalePicker
        value={savedLocale}
        onChange={saveLocale}
        options={supportedLocales}
      />
    </InputLine>
  );

  const region = showRegion ?
    (
      <LinkLine
        onClick={onRegionSettingsLinkClick}>
        {i18n.getString('region', currentLocale)}
      </LinkLine>
    ) :
    null;

  const report = showReport ?
    (
      <LinkLine
        onClick={onReportLinkClick}>
        {i18n.getString('report', currentLocale)}
      </LinkLine>
    ) :
    null;

  const calling = showCalling ?
    (
      <LinkLine
        onClick={onCallingSettingsLinkClick}>
        {i18n.getString('calling', currentLocale)}
      </LinkLine>
    ) :
    null;
  const audio = showAudio ?
    (
      <LinkLine
        onClick={onAudioSettingsLinkClick}>
        {i18n.getString('audio', currentLocale)}
      </LinkLine>
    ) :
    null;
  const feedback = showFeedback ?
    (
      <LinkLine
        onClick={onFeedbackSettingsLinkClick}>
        {i18n.getString('feedback', currentLocale)}
      </LinkLine>
    ) :
    null;
  const quickAccess = showQuickAccess ?
    (
      <LinkLine
        onClick={onQuickAccessLinkClick}>
        {i18n.getString('quickAccess', currentLocale)}
      </LinkLine>
    ) :
    null;
  const presenceSetting = (showPresenceSettings && dndStatus && userStatus) ?
    (
      <PresenceSettingSection
        currentLocale={currentLocale}
        dndStatus={dndStatus}
        userStatus={userStatus}
        isCallQueueMember={isCallQueueMember}
        setAvailable={setAvailable}
        setBusy={setBusy}
        setDoNotDisturb={setDoNotDisturb}
        setInvisible={setInvisible}
        toggleAcceptCallQueueCalls={toggleAcceptCallQueueCalls}
        showPresenceSettings={openPresenceSettings}
      />
    ) :
    null;
  const msteamsSettings = showMsteamsSettings && (
    <LinkLine
      onClick={onMsteamsSettingsLinkClick}>
      {i18n.getString('msteamsSetting', currentLocale)}
    </LinkLine>
  );
  let clickToDialText;
  if (outboundSMS && clickToDialPermissions) {
    clickToDialText = i18n.getString('clickToDialSMS', currentLocale);
  } else if (!outboundSMS && clickToDialPermissions) {
    clickToDialText = i18n.getString('clickToDial', currentLocale);
  } else if (outboundSMS && !clickToDialPermissions) {
    clickToDialText = i18n.getString('clickToSMS', currentLocale);
  } else {
    clickToDialText = '';
  }
  const clickToDial = showClickToDial && (
    outboundSMS || clickToDialPermissions) ?
    (
      <IconLine
        icon={(
          <Switch
            checked={clickToDialEnabled}
            onChange={onClickToDialChange}
          />
)}
        title={clickToDialTitle}
      >
        {clickToDialText}
      </IconLine>
    ) :
    null;
  // if the Switch component is disabled then the text to describe it will be a disabled color.
  const autoLog = showAutoLog ? (
    <IconLine
      icon={(
        <Switch
          dataSign="AutoLogCall"
          disable={disableAutoLogEnabled}
          checked={autoLogEnabled}
          onChange={onAutoLogChange}
        />
)}
    >
      <span className={classnames(disableAutoLogEnabled && styles.disableText)}>
        {autoLogTitle || i18n.getString('autoLogCalls', currentLocale)}
      </span>
    </IconLine>
  ) :
    null;
  const autoLogNotes = showAutoLogNotes ? (
    <IconLine
      icon={(
        <Switch
          dataSign="AutoLogNotes"
          disable={disableAutoLogNotesEnabled}
          checked={autoLogNotesEnabled}
          onChange={onAutoLogNotesChange}
        />
)}
    >
      <span className={classnames(disableAutoLogNotesEnabled && styles.disableText)}>
        {i18n.getString('autoLogNotes', currentLocale)}
      </span>
    </IconLine>
  ) :
    null;
  const autoLogSMS = showAutoLogSMS ? (
    <IconLine
      icon={(
        <Switch
          dataSign="AutoLogSMS"
          checked={autoLogSMSEnabled}
          onChange={onAutoLogSMSChange}
        />
      )}
    >
      {autoLogSMSTitle || i18n.getString('autoLogSMS', currentLocale)}
    </IconLine>
  ) : null;
  const header = showHeader ? (
    <Header>
      {i18n.getString('settings', currentLocale)}
    </Header>
  ) : null;
  const userGuide = showUserGuide ? (
    <LinkLine
      onClick={onUserGuideClick}>
      {i18n.getString('userGuide', currentLocale)}
    </LinkLine>
  ) : null;

  const versionArea = versionContainer || (
    <div className={styles.versionContainer} data-sign="version">
      {i18n.getString('version', currentLocale)}
      {' '}
      {version}
    </div>
  );
  return (
    <div className={classnames(styles.root, className)}>
      {header}
      <Panel
        className={classnames(
          styles.content,
          showHeader && styles.contentWithHeader,
        )}>
        {report}
        {locale}
        {calling}
        {region}
        {audio}
        {presenceSetting}
        {msteamsSettings}
        {children}
        {autoLog}
        {autoLogNotes}
        {autoLogSMS}
        {clickToDial}
        {additional}
        {feedback}
        {quickAccess}
        {userGuide}
        <section className={styles.section}>
          <Line noBorder>
            <EulaRenderer
              dataSign="eula"
              className={styles.eula}
              currentLocale={currentLocale}
              brandId={brandId} />
          </Line>
        </section>
        <section className={styles.section}>
          <IconLine
            noBorder
            dataSign="logoutButton"
            onClick={onLogoutButtonClick}
            icon={
              <span className={classnames(styles.logoutIcon, dynamicsFont.logout)} />
            }>
            {i18n.getString('logout', currentLocale)}
            <span className={styles.loginNumber}>
              {` ${loginNumber}`}
            </span>
          </IconLine>
        </section>
        {versionArea}
      </Panel>
    </div>
  );
}

SettingsPanel.propTypes = {
  brandId: PropTypes.string.isRequired,
  onCallingSettingsLinkClick: PropTypes.func.isRequired,
  onAudioSettingsLinkClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  EulaRenderer: PropTypes.func,
  loginNumber: PropTypes.string.isRequired,
  onLogoutButtonClick: PropTypes.func.isRequired,
  onRegionSettingsLinkClick: PropTypes.func.isRequired,
  showCalling: PropTypes.bool,
  showRegion: PropTypes.bool,
  showAudio: PropTypes.bool,
  showAutoLog: PropTypes.bool,
  showAutoLogNotes: PropTypes.bool,
  showReport: PropTypes.bool,
  autoLogEnabled: PropTypes.bool,
  autoLogNotesEnabled: PropTypes.bool,
  disableAutoLogEnabled: PropTypes.bool,
  disableAutoLogNotesEnabled: PropTypes.bool,
  onAutoLogChange: PropTypes.func,
  onAutoLogNotesChange: PropTypes.func,
  showAutoLogSMS: PropTypes.bool,
  autoLogSMSEnabled: PropTypes.bool,
  onAutoLogSMSChange: PropTypes.func,
  showClickToDial: PropTypes.bool,
  clickToDialEnabled: PropTypes.bool,
  clickToDialPermissions: PropTypes.bool,
  onClickToDialChange: PropTypes.func,
  version: PropTypes.string.isRequired,
  showHeader: PropTypes.bool,
  outboundSMS: PropTypes.bool,
  showSpinner: PropTypes.bool,
  dndStatus: PropTypes.string,
  userStatus: PropTypes.string,
  isCallQueueMember: PropTypes.bool,
  setAvailable: PropTypes.func,
  setBusy: PropTypes.func,
  setDoNotDisturb: PropTypes.func,
  setInvisible: PropTypes.func,
  toggleAcceptCallQueueCalls: PropTypes.func,
  openPresenceSettings: PropTypes.bool,
  showPresenceSettings: PropTypes.bool,
  showMsteamsSettings: PropTypes.bool,
  onMsteamsSettingsLinkClick: PropTypes.func,
  showFeedback: PropTypes.bool,
  showQuickAccess: PropTypes.bool,
  additional: PropTypes.node,
  supportedLocales: PropTypes.arrayOf(PropTypes.string),
  savedLocale: PropTypes.string,
  saveLocale: PropTypes.func,
  onFeedbackSettingsLinkClick: PropTypes.func.isRequired,
  onQuickAccessLinkClick: PropTypes.func,
  onUserGuideClick: PropTypes.func.isRequired,
  showUserGuide: PropTypes.bool,
  clickToDialTitle: PropTypes.string,
  versionContainer: PropTypes.node,
  onReportLinkClick: PropTypes.func,
  autoLogTitle: PropTypes.string,
  autoLogSMSTitle: PropTypes.string,
};
SettingsPanel.defaultProps = {
  className: null,
  EulaRenderer: Eula,
  children: null,
  showClickToDial: false,
  clickToDialEnabled: false,
  clickToDialPermissions: false,
  onClickToDialChange: undefined,
  showCalling: false,
  showAudio: false,
  showAutoLog: false,
  showAutoLogNotes: false,
  showRegion: false,
  showUserGuide: false,
  showReport: false,
  autoLogEnabled: false,
  autoLogNotesEnabled: false,
  disableAutoLogEnabled: false,
  disableAutoLogNotesEnabled: false,
  onAutoLogChange: () => null,
  onAutoLogNotesChange: () => null,
  showAutoLogSMS: false,
  autoLogSMSEnabled: false,
  onAutoLogSMSChange: undefined,
  showHeader: false,
  outboundSMS: false,
  showSpinner: false,
  dndStatus: undefined,
  userStatus: undefined,
  isCallQueueMember: false,
  setAvailable: () => null,
  setBusy: () => null,
  setDoNotDisturb: () => null,
  setInvisible: () => null,
  toggleAcceptCallQueueCalls: () => null,
  openPresenceSettings: false,
  showPresenceSettings: true,
  showMsteamsSettings: false,
  onMsteamsSettingsLinkClick: () => null,
  additional: null,
  supportedLocales: undefined,
  savedLocale: undefined,
  saveLocale: undefined,
  showFeedback: true,
  showQuickAccess: false,
  onQuickAccessLinkClick: () => null,
  clickToDialTitle: null,
  versionContainer: null,
  onReportLinkClick: () => null,
  autoLogTitle: undefined,
  autoLogSMSTitle: undefined,
};
