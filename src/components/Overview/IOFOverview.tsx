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
  const [categories, setCategories] = useState<Categories>({
    entree: [],
    appetizer: [],
    drink: [],
  });

  useEffect(() => {
    // Build categories from available menu data. Use empty arrays when parts are missing.
    const entrees = (fData || []).reduce((previous: string[], current) => {
      if (current.type === 'entree') previous.push(current.name);
      return previous;
    }, []);
    const appetizers = (fData || []).reduce((previous: string[], current) => {
      if (current.type === 'appetizer') previous.push(current.name);
      return previous;
    }, []);
    const drinks = (dData || []).map((element) => element.name);
    setCategories({ entree: entrees, appetizer: appetizers, drink: drinks });
  }, [fData, dData]);

  /* populate overview card data */
  const [cardData, setCardData] = useState<OverviewData[]>();
  useEffect(() => {
    if (!iofData || !categories) {
      setCardData(undefined);
      return;
    }

    const appetizers = iofData.filter((dp) =>
      categories.appetizer.includes(dp.name)
    );
    const entrees = iofData.filter((dp) => categories.entree.includes(dp.name));
    const drinks = iofData.filter((dp) => categories.drink.includes(dp.name));

    const emptyFallback = { name: 'N/A', value: 0 };

    const mostApp = appetizers.length
      ? appetizers[appetizers.length - 1]
      : emptyFallback;
    const leastApp = appetizers.length ? appetizers[0] : emptyFallback;

    const mostEnt = entrees.length
      ? entrees[entrees.length - 1]
      : emptyFallback;
    const leastEnt = entrees.length ? entrees[0] : emptyFallback;

    const mostDrink = drinks.length ? drinks[drinks.length - 1] : emptyFallback;
    const leastDrink = drinks.length ? drinks[0] : emptyFallback;

    setCardData([
      { description: 'Most Popular Appetizer', ...mostApp },
      { description: 'Least Popular Appetizer', ...leastApp },
      { description: 'Most Popular Entree', ...mostEnt },
      { description: 'Least Popular Entree', ...leastEnt },
      { description: 'Most Popular Drink', ...mostDrink },
      { description: 'Least Popular Drink', ...leastDrink },
    ]);
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
