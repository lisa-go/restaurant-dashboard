import './orders.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import moment from 'moment';
import OrderPage from './OrderPage';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { decrement, increment } from '../../redux/slices/pageNumberSlice';
import { useEffect, useState } from 'react';

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

  const pageNumber = useSelector(
    (state: RootState) => state.pageNumber.current
  );

  const dispatch = useDispatch();

  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.length / 50));
    }
  }, [data]);

  return (
    <div id='orders-container'>
      <div className='header'>
        {mode === 'past' ? 'Past' : "Today's"} Orders
      </div>
      <OrderPage data={data} />
      <div className='page-navigation'>
        <span>Page Navigation</span>
        <button
          onClick={() => dispatch(decrement())}
          disabled={pageNumber > 1 ? false : true}>
          <GoChevronLeft />
        </button>
        <span>
          {pageNumber} / {totalPages}
        </span>
        <button
          onClick={() => dispatch(increment())}
          disabled={pageNumber !== totalPages ? false : true}>
          <GoChevronRight />
        </button>
      </div>
    </div>
  );
}
