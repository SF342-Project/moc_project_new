import MocApi from './MocApi';

const getNowPrice = id => {
    return MocApi.get(`/price/now/${id}`)
}


const PriceService = {getNowPrice};
export default PriceService;