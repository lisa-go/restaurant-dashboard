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
      <button onClick={() => dispatch(change('Current Orders'))}>
        <TbUrgent size={defaultSize} />
        <span>Current Orders</span>
      </button>
      <button onClick={() => dispatch(change('Current Orders'))}>
        <TbHistory size={defaultSize} />
        <span>Past Orders</span>
      </button>
      <button onClick={() => dispatch(change('Current Orders'))}>
        <GoGraph size={defaultSize} />
        <span>Statistics</span>
      </button>
      <button onClick={() => dispatch(change('Current Orders'))}>
        <MdOutlineMenuBook size={defaultSize} />
        <span>Menu</span>
      </button>
    </div>
  );
}
