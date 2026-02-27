import LandingTemplateMirko from './LandingTemplateMirko';
import content from './content.json';

const networkConfig = {
  endpoint: 'https://offers.supertrendaffiliateprogram.com/forms/api/',
  uid: '01981ccf-4474-7c39-97eb-9407221996c2',
  key: '26335c124acad98417ad58',
  offerId: '425',
  lpId: '425',
};

export default function Page() {
  return <LandingTemplateMirko content={content} networkConfig={networkConfig} />;
}
