import LandingTemplateMirko from './LandingTemplateMirko';
import content from './content.json';

const networkConfig = {
  endpoint: 'https://offers.italiadrop.com/forms/api/',
  uid: '019bfb2f-317f-7e20-a4a8-44c22cb7bd03',
  key: '05fddd0847c3627b81e1d6',
  offerId: '2892',
  lpId: '2931',
};

export default function Page() {
  return <LandingTemplateMirko content={content} networkConfig={networkConfig} />;
}
