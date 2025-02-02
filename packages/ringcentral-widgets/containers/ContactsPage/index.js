import { connect } from 'react-redux';
import ContactsView from '../../components/ContactsView';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  phone: {
    locale,
    contacts,
  },
}) {
  return {
    currentLocale: locale.currentLocale,
    contactSourceNames: contacts.sourceNames || [],
    contactGroups: contacts.contactGroups || [],
    searchSource: contacts.sourceFilter,
    searchString: contacts.searchFilter,
    showSpinner: !(
      locale.ready &&
      contacts.ready
    ),
  };
}

function mapToFunctions(_, {
  phone: {
    routerInteraction,
    contacts,
  },
  onItemSelect,
  onVisitPage,
  onRefresh,
}) {
  return {
    getAvatarUrl() {
      return null;
    },
    async getPresence(contact) {
      return contacts.getPresence(contact);
    },
    onItemSelect: onItemSelect || (async ({ type, id }) => {
      routerInteraction.push(`/contacts/${type}/${id}`);
    }),
    onSearchContact({ searchSource, searchString }) {
      contacts.updateFilter({
        sourceFilter: searchSource,
        searchFilter: searchString,
      });
    },
    onVisitPage,
    onRefresh,
  };
}

const ContactsPage = withPhone(connect(mapToProps, mapToFunctions)(ContactsView));

export default ContactsPage;
