import { GoGraph } from 'react-icons/go';
import { TbUrgent, TbHistory } from 'react-icons/tb';
import { RiNumbersLine } from 'react-icons/ri';
import { MdOutlineMenuBook } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { change } from '../../redux/slices/pageSlice';

export default function NavTabs() {
  const defaultSize = 30;

  const dispatch = useDispatch();

  return (
    <div id='tab-container'>
      <button onClick={() => dispatch(change('Overview'))}>
        <RiNumbersLine size={defaultSize} />
        <span>Overview</span>
      </button>
      <button onClick={() => dispatch(change("Today's Orders"))}>
        <TbUrgent size={defaultSize} />
        <span>Today's Orders</span>
      </button>
      <button onClick={() => dispatch(change('Past Orders'))}>
        <TbHistory size={defaultSize} />
        <span>Past Orders</span>
      </button>
      <button onClick={() => dispatch(change('Statistics'))}>
        <GoGraph size={defaultSize} />
        <span>Statistics</span>
      </button>
      <button onClick={() => dispatch(change('Menu'))}>
        <MdOutlineMenuBook size={defaultSize} />
        <span>Menu</span>
      </button>
    </div>
  );
}
