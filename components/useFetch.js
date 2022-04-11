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

  const refetch = async () => {
    try {
      const response = await fetch(url);
      const fetchdata = await response.json();
      setData(fetchdata);
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, [url])
  

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(url)
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(err => {})
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [url]);

  // const refetch = () => {
  //   setLoading(true);
  //   axios
  //     .get(url)
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(err => {})
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return {data, loading, refetch};
};

export default useFetch;
