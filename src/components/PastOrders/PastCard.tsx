import { Transaction } from '../../redux/slices/apiSlice';
import { MdMoreHoriz } from 'react-icons/md';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
  card: Transaction;
}

export default function PastCard({ card }: Props) {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  return (
    <div className='card'>
      <div className='row'>
        <span>{card.customerName}</span>
        <span>
          {card.totalQty} {card.totalQty > 1 ? 'items' : 'item'} @ $
          {card.totalPrice}
        </span>
      </div>
      <div className='row'>
        <span>{moment(card.orderDate).format('MMM DD YYYY hh:mma')}</span>

        <MdMoreHoriz
          size={24}
          color={viewMode === 'dark' ? '#caefd7' : '#11473c'}
        />
      </div>

      <div className='additional'>
        <div className='row'>
          <span>testing</span>
          <span>testing</span>
          <span>testing</span>
          <span>testing</span>
        </div>
        <div className='row'>
          <span>testing</span>
          <span>testing</span>
          <span>testing</span>
          <span>testing</span>
        </div>
      </div>
    </div>
  );
}
