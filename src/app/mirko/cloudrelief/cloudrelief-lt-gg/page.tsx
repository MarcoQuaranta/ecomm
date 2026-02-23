import LandingTemplateMirko from './LandingTemplateMirko';
import content from './content.json';

const networkConfig = {
  endpoint: 'https://offers.uncappednetwork.com/forms/api/',
  uid: '0191b25c-22d2-7f55-9d9b-79b67cebbff3',
  key: 'e0fe8e75c501eccab21f8d',
  offerId: '3041',
  lpId: '3075',
};

export default function Page() {
  return <LandingTemplateMirko content={content} networkConfig={networkConfig} />;
}
