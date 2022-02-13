import {useState, useEffect} from 'react';
import axios from 'axios';

{
  /* Custom Hook for fetching data */
}
const useFetch = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch(url);
      const fetchdata = await response.json();
      setData(fetchdata);
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, [url]);

  return {data, loading};
};

export default useFetch;
