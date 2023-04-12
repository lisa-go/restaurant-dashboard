import './PortraitHeader.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../redux/slices/viewModeSlice';
import logo from '../../assets/icons8-asian-hat-100.png';
import { change } from '../../redux/slices/pageSlice';
import Switch from 'react-switch';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { RootState } from '../../redux/store';

export default function PortraitHeader() {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = () => {
    setChecked(!checked);
    dispatch(toggle());
  };
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  return (
    <div id='p-header'>
      <button
        id='logo'
        onClick={() => dispatch(change('Overview'))}>
        <img
          src={logo}
          alt='rice paddy hat logo'
        />
        <span>Rice Paddy Hat</span>
      </button>

      <div id='switch-container'>
        <Switch
          onChange={handleChange}
          checked={checked}
          offColor='#83746E'
          onColor='#83746E'
          offHandleColor='#f5f5f5'
          onHandleColor='#f5f5f5'
          uncheckedIcon={
            <div className='switch-icon'>
              <MdOutlineDarkMode
                size={22}
                style={{ color: '#f5f5f5' }}
              />
            </div>
          }
          checkedIcon={
            <div className='switch-icon'>
              <MdOutlineLightMode
                size={21}
                style={{ color: '#f5f5f5' }}
              />
            </div>
          }
          uncheckedHandleIcon={
            <div className='switch-icon'>
              <MdOutlineLightMode
                size={21}
                style={{ color: '#1f232c' }}
              />
            </div>
          }
          checkedHandleIcon={
            <div className='switch-icon'>
              <MdOutlineDarkMode
                size={22}
                style={{ color: '#1f232c' }}
              />
            </div>
          }
        />
        <span>{viewMode} mode</span>
      </div>
    </div>
  );
}
