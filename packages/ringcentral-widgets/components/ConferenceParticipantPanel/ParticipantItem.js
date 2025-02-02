import React from 'react';
import PropTypes from 'prop-types';

import i18n from './i18n';
import styles from './styles.scss';
import CallAvatar from '../CallAvatar';
import MediaObject from '../MediaObject';
import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';

/**
 * TODO: extract the common stucture from `CallItem` & `ActiveCallItem` and this one, since they
 * are just `Media Objects`.
 */

function ParticipantItem({
  detail,
  avatarUrl,
  onRemove,
  currentLocale,
}) {
  return (
    <MediaObject
      containerCls={styles.participantItem}
      bodyCls={styles.mediaBodyCls}
      mediaLeft={(
        <div className={styles.avatar}>
          <CallAvatar isOnConferenceCall={false} avatarUrl={avatarUrl} />
        </div>
      )}
      mediaBody={(
        <div title={detail} className={styles.detail}>
          {detail}
        </div>
      )}
      mediaRight={(
        <span title={i18n.getString('removeParticipant', currentLocale)} className={styles.webphoneButton}>
          <CircleButton
            className={styles.rejectButton}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            iconWidth={260}
            iconX={120}
            icon={EndIcon}
            showBorder={false}
          />
        </span>
      )}
    />
  );
}

ParticipantItem.propTypes = {
  detail: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  onRemove: PropTypes.func,
  currentLocale: PropTypes.string.isRequired,
};

ParticipantItem.defaultProps = {
  avatarUrl: null,
  onRemove: i => i,
};

export default ParticipantItem;
