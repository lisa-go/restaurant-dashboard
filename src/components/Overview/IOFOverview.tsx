import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { DataPoint } from '../../redux/slices/statSlice';

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

    if (iofData) {
      let test = iofData.slice(0).reduce((previous: DataPoint[], current) => {
        if (categories?.appetizer.includes(current.name))
          previous.push(current);
        return previous;
      }, []);
      console.log(test);
    }
  }, [fData, dData, iofData]);

  return (
    <div id='iof-container'>
      <div className='card'>fdgfd</div>
    </div>
  );
}
