import {useState, useEffect} from 'react';

{/* Custom Hook for fetching data */}
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [filterdatas, setFilterdata] = useState([]);

    const getData = async () => {
        const response = await fetch(url);
        const fetchdata = await response.json();
        setData(fetchdata)
        setFilterdata(fetchdata)
    }

    useEffect(() => {
        getData();
    }, [url]);

    return {data,filterdatas};
}

export default useFetch;