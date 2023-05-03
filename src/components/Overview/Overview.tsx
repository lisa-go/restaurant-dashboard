import IOFOverview from './IOFOverview';
import OPDWOverview from './OPDWOverview';
import './overview.scss';

export interface OverviewData {
  description: string;
  name: string;
  value: number;
}

export default function Overview() {
  return (
    <div id='overview-container'>
      <div className='header'>Overview</div>
      <div className='content-container'>
        <IOFOverview />
        <OPDWOverview />
      </div>
    </div>
  );
}
