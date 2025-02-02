import format, {
  formatTypes,
} from '@ringcentral-integration/phone-number/lib/format';

export function getMobileDialingNumberTpl(dialInNumbers, meetingId) {
  return dialInNumbers
    .map(
      ({ phoneNumber, location = '' }) =>
        `${phoneNumber},,${meetingId}# ${location}`,
    )
    .join('\n    ');
}

export function getPhoneDialingNumberTpl(dialInNumbers) {
  return dialInNumbers
    .map(({ phoneNumber, location = '', country }) => {
      const filterFormattedNumber = format({
        phoneNumber,
        countryCode: country.isoCode,
        type: formatTypes.international,
      });
      return `${filterFormattedNumber}${location}`;
    })
    .join('\n    ');
}

export const UTC_TIMEZONE_ID = '1';
export const MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  INSTANT: 'Instant',
};

export function getMeetingSettings({
  extensionName,
  startTime,
  durationInMinutes = 60,
  topic = '',
}) {
  return {
    topic: topic || `${extensionName}'s Meeting`,
    meetingType: MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime,
      durationInMinutes,
      timeZone: {
        id: UTC_TIMEZONE_ID,
      },
    },
    host: {
      id: null,
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
  };
}

// Basic default meeting type information
export function getDefaultMeetingSettings(extensionName, startTime) {
  return {
    topic: `${extensionName}'s Meeting`,
    meetingType: MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime,
      durationInMinutes: 60,
      timeZone: {
        id: UTC_TIMEZONE_ID,
      },
    },
    host: {
      id: null,
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
    _requireMeetingPassword: false,
    _showDate: false,
    _showTime: false,
    _saved: false,
  };
}

export function getInitializedStartTime() {
  const now = new Date();
  const startTime = now.setHours(now.getHours() + 1, 0, 0);
  return startTime;
}
