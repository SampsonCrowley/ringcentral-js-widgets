import React from 'react';
import PropTypes from 'prop-types';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';

import i18n from './i18n';
import styles from './styles.scss';
import Modal from '../Modal';

export default function ConfirmRemoveModal({
  currentLocale,
  show,
  onRemove,
  onCancel,
  detail,
}) {
  if (!detail) {
    return null;
  }
  let displayText = detail.partyNumber || i18n.getString('unknownNumber', currentLocale);
  if (
    detail.partyName &&
    detail.calleeType === calleeTypes.contacts
  ) {
    // means that matched a contact
    displayText = detail.partyName;
  }
  return (
    <Modal
      show={show}
      headerClassName={styles.header}
      currentLocale={currentLocale}
      className={styles.ConfirmRemoveModal}
      modalClassName={styles.ConfirmRemoveModal}
      maskClassName={styles.confirmRemoveModalMask}
      title={i18n.getString('removeParticipant', currentLocale)}
      onConfirm={onRemove}
      onCancel={onCancel}
      clickOutToClose
      contentClassName={styles.contentText}
      textConfirm={i18n.getString('remove', currentLocale)}
    >
      <p>
        {i18n.getString('confirmStr1', currentLocale)}
        <span>{` ${displayText} `}</span>
        {i18n.getString('confirmStr2', currentLocale)}
      </p>
    </Modal>
  );
}

ConfirmRemoveModal.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func,
  detail: PropTypes.object,
};

ConfirmRemoveModal.defaultProps = {
  onRemove() { },
  onCancel() { },
  detail: null,
};
