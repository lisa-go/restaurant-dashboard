import './menu.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import loadingGif from '../../assets/tail-spin.svg';
import Card from './Card';

export default function Menu() {
  const foods = useSelector((state: RootState) => state.data.fData);
  const drinks = useSelector((state: RootState) => state.data.dData);

  return (
    <div id='menu-container'>
      <div className='header'>Menu</div>
      <div className='content-container'>
        <h1>Food</h1>
        <div className='card-container'>
          {foods ? (
            foods.map((food) => {
              return (
                <Card
                  key={food._id}
                  item={food}
                />
              );
            })
          ) : (
            <img
              src={loadingGif}
              alt='loading'
            />
          )}
        </div>
        <h1>Drinks</h1>
        <div className='card-container'>
          {drinks ? (
            drinks.map((drink) => {
              return (
                <Card
                  key={drink._id}
                  item={drink}
                />
              );
            })
          ) : (
            <img
              src={loadingGif}
              alt='loading'
            />
          )}
        </div>
      </div>
    </div>
  );
}
