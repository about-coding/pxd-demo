// import { Amplify } from 'aws-amplify';

import Router from './routes';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);

export default function App() {
  return (
    <>
      <Router />
      <ScrollToTop />
      <BaseOptionChartStyle />
    </>
  );
}
