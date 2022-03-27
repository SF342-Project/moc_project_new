import MocApi from './MocApi';

const getNowPrice = id => {
    return MocApi.get(`/price/now/${id}`)
}

const getComparePrice = (id,from,to) => {
    return MocApi.get(`/price/compare/${id}/${from}/${to}`)
}


const PriceService = {getNowPrice, getComparePrice};
export default PriceService;