import './orders.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Card from './Card';
import loadingGif from '../../assets/tail-spin.svg';
import moment from 'moment';

interface Props {
  mode: string;
}

export default function Orders({ mode }: Props) {
  const data = useSelector((state: RootState) => state.data.tData)?.filter(
    (element) =>
      mode === 'past'
        ? moment(element.orderDate).format('MMDDYYYY') !==
          moment(new Date()).format('MMDDYYYY')
        : moment(element.orderDate).format('MMDDYYYY') ===
          moment(new Date()).format('MMDDYYYY')
  );

  return (
    <div id='orders-container'>
      <div className='header'>
        {mode === 'past' ? 'Past' : "Today's"} Orders
      </div>
      <div className='content-container'>
        {data ? (
          data
            .map((card) => {
              return (
                <Card
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
