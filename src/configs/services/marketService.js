import {apiService} from "./apiService";
import {urls} from "../url_config/urls";
let limit = '100';

const marketService={

    getAll:()=>apiService.get(`${urls.products}?limit=${limit}`),
    getById:(id)=>apiService.get(`${urls.products}/${id}`),
    findItem:(query)=>apiService.get(`https://dummyjson.com/products/search?q=${query}`),
    getAllCategories:()=>apiService.get(urls.categories),
    getByCategory:(category)=>apiService.get(`${urls.category}/${category}`),



}



export {marketService}