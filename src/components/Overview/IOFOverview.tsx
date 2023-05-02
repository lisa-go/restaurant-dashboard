import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { DataPoint } from '../../redux/slices/statSlice';
import { OverviewData } from './Overview';

interface Categories {
  entree: string[];
  appetizer: string[];
  drink: string[];
}

export default function IOFOverview() {
  const iofData = useSelector((state: RootState) => state.stat.IOF);
  const { fData, dData } = useSelector((state: RootState) => state.data);
  const [categories, setCategories] = useState<Categories>();

  useEffect(() => {
    if (fData && dData) {
      const entrees = fData.reduce((previous: string[], current) => {
        if (current.type === 'entree') previous.push(current.name);
        return previous;
      }, []);
      const appetizers = fData.reduce((previous: string[], current) => {
        if (current.type === 'appetizer') previous.push(current.name);
        return previous;
      }, []);
      const drinks = dData.map((element) => element.name);
      setCategories({ entree: entrees, appetizer: appetizers, drink: drinks });
    }
  }, [fData, dData]);

  /* populate overview card data */
  const [cardData, setCardData] = useState<OverviewData[]>();
  useEffect(() => {
    if (categories && iofData) {
      const appetizers = iofData.reduce((previous: DataPoint[], current) => {
        if (categories.appetizer.includes(current.name)) previous.push(current);
        return previous;
      }, []);
      const entrees = iofData.reduce((previous: DataPoint[], current) => {
        if (categories.entree.includes(current.name)) previous.push(current);
        return previous;
      }, []);
      const drinks = iofData.reduce((previous: DataPoint[], current) => {
        if (categories.drink.includes(current.name)) previous.push(current);
        return previous;
      }, []);

      setCardData([
        {
          description: 'Most Popular Appetizer',
          ...appetizers[appetizers.length - 1],
        },
        { description: 'Least Popular Appetizer', ...appetizers[0] },
        {
          description: 'Most Popular Entree',
          ...entrees[entrees.length - 1],
        },
        { description: 'Least Popular Entree', ...entrees[0] },
        {
          description: 'Most Popular Drink',
          ...drinks[drinks.length - 1],
        },
        { description: 'Least Popular Drink', ...drinks[0] },
      ]);
    }
  }, [categories, iofData]);

  return (
    <div id='iof-container'>
      {cardData &&
        cardData.map((card) => {
          return (
            <div
              className='card-container'
              key={card.description}>
              <span>{card.description}</span>
              <span>{card.name}</span>
              <span>@ {card.value} sold</span>
            </div>
          );
        })}
    </div>
  );
}
