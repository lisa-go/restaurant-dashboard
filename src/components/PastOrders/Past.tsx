import './past.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PastCard from './PastCard';
import loadingGif from '../../assets/tail-spin.svg';

export default function Past() {
  const data = useSelector((state: RootState) => state.data.tData);

  return (
    <div id='past-container'>
      <div className='header'>Past Orders</div>
      <div className='content-container'>
        {data ? (
          data
            .map((card) => {
              return (
                <PastCard
                  key={card._id}
                  card={card}
                />
              );
            })
            .reverse()
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <img
              src={loadingGif}
              height='40px'
            />
          </div>
        )}
      </div>
    </div>
  );
}
