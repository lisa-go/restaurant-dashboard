import { useSelector } from 'react-redux';
import { Drink, Food } from '../../redux/slices/apiSlice';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import loadingGif from '../../assets/tail-spin.svg';

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

      <span>{item.name}</span>
      <span>{item.price}</span>
    </div>
  );
}
