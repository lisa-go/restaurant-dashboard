import { useSelector } from 'react-redux';
import { Order } from '../../redux/slices/apiSlice';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import loadingIcon from '../../assets/tail-spin.svg';

interface Props {
  item: Order;
}

export default function PastCardItem({ item }: Props) {
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
    <div className='row'>
      {image !== '' ? (
        <img
          src={image}
          alt={item.name}
        />
      ) : (
        <img
          src={loadingIcon}
          alt='loading'
        />
      )}

      <span>{item.name}</span>
      <span>{item.qty}</span>
      <span>${item.price}</span>
    </div>
  );
}
