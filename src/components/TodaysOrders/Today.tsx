import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import moment from 'moment';
import loadingGif from '../../assets/tail-spin.svg';

export default function Today() {
  const data = useSelector((state: RootState) => state.data.tData)?.filter(
    (element) =>
      moment(element.orderDate).format('MMDDYYYY') ===
      moment(new Date()).format('MMDDYYYY')
  );

  return (
    <div id='today-container'>
      <div className='header'>Today's Orders</div>
      <div className='content-container'>
        {data ? (
          data
            .map((card) => {
              return (
                <div>
                  {card.customerName}
                  {card.orderDate.toString()}
                </div>
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
