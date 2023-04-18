import { Transaction } from '../../redux/slices/apiSlice';
import Card from './Card';
import loadingGif from '../../assets/tail-spin.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
  data: Transaction[] | undefined;
}

export default function OrderPage({ data }: Props) {
  const pageNumber = useSelector(
    (state: RootState) => state.pageNumber.current
  );
  let pageMax = pageNumber * 50;
  let pageMin = pageMax - 50;

  return (
    <div className='content-container'>
      {data ? (
        data
          .reverse()
          .slice(pageMin, pageMax)
          .map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
              />
            );
          })
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
  );
}
