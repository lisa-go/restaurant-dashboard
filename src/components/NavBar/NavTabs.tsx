import { GoGraph } from 'react-icons/go';
import { TbUrgent, TbHistory } from 'react-icons/tb';
import { RiNumbersLine } from 'react-icons/ri';
import { MdOutlineMenuBook } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { change } from '../../redux/slices/pageSlice';
import { reset } from '../../redux/slices/pageNumberSlice';

export default function NavTabs() {
  const defaultSize = 30;
  const dispatch = useDispatch();

  const handleButton = (page: string) => {
    dispatch(change(page));
    dispatch(reset());
  };

  return (
    <div id='tab-container'>
      <button onClick={() => handleButton('Overview')}>
        <RiNumbersLine size={defaultSize} />
        <span>Overview</span>
      </button>
      <button onClick={() => handleButton("Today's Orders")}>
        <TbUrgent size={defaultSize} />
        <span>Today's Orders</span>
      </button>
      <button onClick={() => handleButton('Past Orders')}>
        <TbHistory size={defaultSize} />
        <span>Past Orders</span>
      </button>
      <button onClick={() => handleButton('Statistics')}>
        <GoGraph size={defaultSize} />
        <span>Statistics</span>
      </button>
      <button onClick={() => handleButton('Menu')}>
        <MdOutlineMenuBook size={defaultSize} />
        <span>Menu</span>
      </button>
    </div>
  );
}
