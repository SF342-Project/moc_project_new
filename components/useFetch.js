import {useState, useEffect} from 'react';

{/* Custom Hook for fetching data */}
const useFetch = (url) => {
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await fetch(url);
        const fetchdata = await response.json();
        setData(fetchdata)
    }

    useEffect(() => {
        getData();
    }, [url]);

    return {data};
}

export default useFetch;