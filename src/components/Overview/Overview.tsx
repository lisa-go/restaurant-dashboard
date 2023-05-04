import { useSelector } from 'react-redux';
import IOFOverview from './IOFOverview';
import OPDWOverview from './OPDWOverview';
import './overview.scss';
import { RootState } from '../../redux/store';
import loadingGif from '../../assets/tail-spin.svg';

export interface OverviewData {
  description: string;
  name: string;
  value: number;
}

export default function Overview() {
  const { IOF, OPDW } = useSelector((state: RootState) => state.stat);

  return (
    <div id='overview-container'>
      <div className='header'>Overview</div>
      <div className='content-container'>
        {!IOF && !OPDW && (
          <div className='loading'>
            <img
              src={loadingGif}
              alt='loading'
            />
          </div>
        )}
        <IOFOverview />
        <OPDWOverview />
      </div>
    </div>
  );
}
