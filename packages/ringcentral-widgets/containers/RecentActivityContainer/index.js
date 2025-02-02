import React from 'react';
import { connect } from 'react-redux';
import callDirections from 'ringcentral-integration/enums/callDirections';
import RecentActivityPanel from '../../components/RecentActivityPanel';
import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import RecentActivityMessages from '../../components/RecentActivityMessages';
import RecentActivityCalls from '../../components/RecentActivityCalls';
import VoicemailIcon from '../../assets/images/VoicemailIcon.svg';
import FaxIcon from '../../assets/images/Fax.svg';
import { withPhone } from '../../lib/phoneContext';
import i18n from './i18n';

function getTabs({
  ready,
  currentLocale,
  dateTimeFormatter,
  navigateTo,
  recentMessages,
  recentCalls,
  currentContact,
  sessionId,
  showRecentCalls,
  showRecentMessage,
  showFax,
  showVoiceMails,
}) {
  if (!ready) return [];
  let messages = [];
  let calls = [];
  if (currentContact && currentContact.id) {
    const contactId = currentContact.id;
    const activityCardId = sessionId ? `${contactId}-${sessionId}` : contactId;
    if (recentMessages.messages[activityCardId]) {
      messages = recentMessages.messages[activityCardId];
    }
    if (recentCalls.calls[activityCardId]) {
      calls = recentCalls.calls[activityCardId];
    }
  }

  return [
    showVoiceMails ? {
      icon: <VoicemailIcon width={21} height={21} />,
      label: i18n.getString('voicemail', currentLocale),
      path: 'voicemails',
      isActive: path => path === 'voicemails',
      view: null,
      getData() { },
      cleanUp() { }
    } : null,
    showRecentMessage ? {
      icon: <span className={dynamicsFont.composeText} />,
      label: i18n.getString('text', currentLocale),
      path: 'recentMessages',
      isActive: path => path === 'recentMessages',
      view: (
        <RecentActivityMessages
          messages={messages}
          navigateTo={navigateTo}
          dateTimeFormatter={dateTimeFormatter}
          currentLocale={currentLocale}
          isMessagesLoaded={recentMessages.isMessagesLoaded}
        />
      ),
      getData() {
        recentMessages.getMessages({ currentContact, sessionId });
      },
      cleanUp: () => recentMessages.cleanUpMessages({ contact: currentContact, sessionId })
    } : null,
    showFax ? {
      icon: <FaxIcon width={21} height={21} />,
      label: i18n.getString('fax', currentLocale),
      path: 'faxes',
      isActive: path => path === 'faxes',
      view: null,
      getData() { },
      cleanUp() { }
    } : null,
    showRecentCalls ? {
      icon: <span className={dynamicsFont.active} />,
      label: i18n.getString('call', currentLocale),
      path: 'recentCalls',
      isActive: path => path === 'recentCalls',
      view: (
        <RecentActivityCalls
          calls={calls}
          dateTimeFormatter={dateTimeFormatter}
          currentLocale={currentLocale}
          isCallsLoaded={recentCalls.isCallsLoaded}
        />
      ),
      getData() {
        recentCalls.getCalls({ currentContact, sessionId });
      },
      cleanUp: () => recentCalls.cleanUpCalls({ contact: currentContact, sessionId })
    } : null,
  ].filter(x => x !== null);
}

function mapToProps(_, {
  phone: {
    locale,
    dateTimeFormat,
    recentMessages,
    recentCalls,
    contactMatcher,
  },
  currentLocale = locale.currentLocale,
  navigateTo,
  dateTimeFormatter = (...args) => dateTimeFormat.formatDateTime(...args),
  getSession,
  useContact,
  contact,
  showRecentCalls = true,
  showRecentMessage = true,
  showFax = true,
  showVoiceMails = true,
}) {
  let sessionId = null;
  let currentContact = contact;
  let ready =
    dateTimeFormat.ready &&
    locale.ready &&
    recentMessages.ready &&
    recentCalls.ready;
  if (!useContact) {
    const session = getSession();
    sessionId = session.id;
    currentContact = session.contactMatch;
    const contactMapping = contactMatcher && contactMatcher.dataMapping;
    const phoneNumber = session.direction === callDirections.outbound ?
      session.to : session.from;
    if (!currentContact) {
      currentContact = contactMapping && contactMapping[phoneNumber];
      if (currentContact && currentContact.length >= 1) {
        currentContact = currentContact[0];
      }
    }
    ready = ready && contactMatcher.ready;
  }
  return {
    currentLocale,
    title: i18n.getString('recentActivities', locale.currentLocale),
    showSpinner: !ready,
    currentContact,
    calls: recentCalls.calls || [],
    tabs: getTabs({
      ready,
      currentLocale,
      dateTimeFormatter,
      navigateTo,
      currentContact,
      recentMessages,
      recentCalls,
      sessionId,
      showFax,
      showRecentCalls,
      showVoiceMails,
      showRecentMessage,
    }),
    defaultTab: 'recentCalls',
  };
}

const RecentActivityContainer = withPhone(connect(
  mapToProps
)(RecentActivityPanel));

export {
  getTabs,
  mapToProps,
  RecentActivityContainer as default,
};

