import { useSelector } from 'react-redux';
import { Drink, Food } from '../../redux/slices/apiSlice';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import loadingGif from '../../assets/tail-spin.svg';
import { TiStarFullOutline } from 'react-icons/ti';

interface Props {
  item: Food | Drink;
}

export default function Card({ item }: Props) {
  const [image, setImage] = useState<string>('');
  const foodItem = useSelector((state: RootState) => state.data.fData)?.filter(
    (element) => element.name === item.name
  )[0];
  const drinkItem = useSelector((state: RootState) => state.data.dData)?.filter(
    (element) => element.name === item.name
  )[0];

  useEffect(() => {
    if (foodItem) setImage(foodItem.img);
    if (drinkItem) setImage(drinkItem.img);
  }, []);

  const capitalize = (word: string) => {
    let splitted = word.split('');
    splitted[0] = splitted[0].toUpperCase();
    return splitted.join('');
  };

  return (
    <div className='card'>
      {image ? (
        <img
          src={image}
          alt={item.name}
        />
      ) : (
        loadingGif
      )}

      <div className='name-container'>
        <span>{item.name}</span>
        {foodItem?.native_name ? <span>{foodItem.native_name}</span> : null}
      </div>

      {foodItem?.type && foodItem.sub_cat ? (
        <div>
          {capitalize(foodItem.type)} - {capitalize(foodItem.sub_cat)}
        </div>
      ) : null}

      <div className='pr-container'>
        <span>${item.price}</span>
        {foodItem?.rating ? (
          <span>
            <p>{foodItem.rating}</p>
            <TiStarFullOutline
              color='#feff51'
              stroke='#1f232c'
              strokeWidth='1'
            />
          </span>
        ) : null}
      </div>

      {foodItem?.description ? <p>{foodItem.description}</p> : null}
    </div>
  );
}
