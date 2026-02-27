import LandingTemplateMirko from './LandingTemplateMirko';
import content from './content.json';

const networkConfig = {
  endpoint: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '019855d0-397a-72ee-8df5-c5026966105a',
  key: '8ea99f0506e1df27f625d0',
  offerId: '427',
  lpId: '427',
};

export default function Page() {
  return <LandingTemplateMirko content={content} networkConfig={networkConfig} />;
}
