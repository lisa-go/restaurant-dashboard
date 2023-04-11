import './NavBar.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../redux/slices/viewModeSlice';
import logo from '../../assets/icons8-asian-hat-100.png';
import NavTabs from './NavTabs';
import { change } from '../../redux/slices/pageSlice';
import Switch from 'react-switch';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { RootState } from '../../redux/store';

export default function NavBar() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = () => {
    setChecked(!checked);
    dispatch(toggle());
  };
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  return (
    <header>
      <button
        id='logo'
        onClick={() => dispatch(change('Overview'))}>
        <img
          src={logo}
          alt='rice paddy hat logo'
        />
        <span>Rice Paddy Hat</span>
      </button>
      <NavTabs />

      <div id='switch-container'>
        <Switch
          onChange={handleChange}
          checked={checked}
          offColor='#615a54'
          onColor='#615a54'
          uncheckedIcon={
            <div className='switch-icon'>
              <MdOutlineDarkMode style={{ color: '#cfc9c1' }} />
            </div>
          }
          checkedIcon={
            <div className='switch-icon'>
              <MdOutlineLightMode style={{ color: '#cfc9c1' }} />
            </div>
          }
          uncheckedHandleIcon={
            <div className='switch-icon'>
              <MdOutlineLightMode style={{ color: '#242526' }} />
            </div>
          }
          checkedHandleIcon={
            <div className='switch-icon'>
              <MdOutlineDarkMode style={{ color: '#242526' }} />
            </div>
          }
        />
        <span>{viewMode} mode</span>
      </div>
    </header>
  );
}
