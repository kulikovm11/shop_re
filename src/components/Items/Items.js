import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Pagination} from "@mui/material";

import {marketActions} from "../../redux";
import {ItemCard} from "../ItemCard/ItemCard";
import css from './ItemsStyle.module.css'
import {marketService} from "../../configs";
import {Loader} from "../LoaderComponent/Loader";
import {CarouselComponent} from "../CarouselComponent/CarouselComponent";
import {catActions} from "../../redux/slices/allCategories.slice";
import {Sidebar} from "../Sidebar/Sidebar";
import {Form} from "../Form/Form";



const Items = () => {


    const {productsArr, isLoading, error } = useSelector((state) => state.market);
    const dispatch = useDispatch();

    const {arrayOfCategories } = useSelector((state) => state.allCategories);
    const dispatchCategories = useDispatch();
    const [category, setCategory] = useState('')
    const [selectedCategory,setSelectedCategory] = useState('')
    const [filteredByCat,setFilteredByCat] = useState([])






    const [page, setPage] = useState(1);
    const perPage = 20;
    const [query, setQuery] = useState('')
    const [foundItems, setFoundItems] = useState([])
    const [prodToRender, setProdToRender] = useState(productsArr)

    useEffect(()=>{
        try {
            dispatchCategories(catActions.getAllCategories())
            dispatch(marketActions.getAll())
        }catch {
            console.log('error')
        }
    },[dispatchCategories, dispatch])



    useEffect(()=>{
        // setIsLoading(true)
        try {
            dispatch(marketActions.getAll())
        }catch (e) {
            console.log('error')
        }finally {
            // setIsLoading(false)
        }
    },[dispatch])


    useEffect(()=>{
        if (foundItems.length > 0) {
            setProdToRender(foundItems);
            setPage(1);
        } else if (filteredByCat.length > 0) {
            setProdToRender(filteredByCat);
            setPage(1);

        } else {
            setProdToRender(productsArr);
        }
    },[foundItems, filteredByCat, productsArr])


    const handlePageChange = useCallback((event, page) =>{
        setPage(page)
    },[setPage])


    const startIndex = useMemo(()=>(page-1) * perPage,[page,perPage])
    const endIndex = useMemo(()=> startIndex + perPage, [startIndex, perPage])
    const itemsToRender = useMemo(()=> prodToRender.slice(startIndex,endIndex),[prodToRender,startIndex,endIndex])


    const filtered = productsArr.filter(prod => prod.category === 'fragrances' || prod.category === 'skincare' || prod.category === 'womens-watches')


// поиск

    const findItem = async (e) => {
        e.preventDefault();
        try {
            const resp = await marketService.findItem(query)
            setFoundItems(resp.data.products)
            setSelectedCategory('')
        }catch (err) {
            console.log('something went wrong')
        }finally {
            setQuery('')

        }
    }

    // Фильтрация по катеогриям

    const filterByCategory = useCallback(async (category) =>{
        try {
            const filteredItems = await marketService.getByCategory(category)
            setFilteredByCat(filteredItems.data.products)
            setSelectedCategory(category)
        }catch {
            console.log("something went wrong");
        }finally {
            setCategory("")
        }
    },[setFilteredByCat,setCategory])




    const clear = useCallback(()=>{
        setFilteredByCat([])
        setCategory("")
    },[setFilteredByCat,setCategory])

    const clearSearch = useCallback(()=>{
        setQuery('')
        setFoundItems([])
    },[setQuery,setFoundItems])









    return (
        <>


            <div className={css.FormAndSlider}>
                    <div className={css.Actions_wrap}>


                        <Sidebar arrayOfCategories={arrayOfCategories} filter={filterByCategory} clear={clear} filteredByCat={filteredByCat}/>

                        {isLoading? null : <CarouselComponent/>}





                     </div>

                <Form findItem={findItem} query={query} setQuery={setQuery} foundItems={foundItems} clearSearch={clearSearch}/>





            </div>





            <div className={filteredByCat.length>0? css.FilteredScreen : css.Items_wrap}>


                {isLoading ? null:
                    error? <div>{error.message}</div> :
                        (foundItems.length > 0 ? foundItems : filteredByCat.length>0? filteredByCat : itemsToRender).map(i=><ItemCard key={i.id} item={i} filtered={filtered}/>)}

            </div>

            {isLoading? <Loader/> : <div className={css.Pagination}>

                {filteredByCat.length>0? null : <Pagination
                    count={Math.ceil(prodToRender.length/perPage)}
                    variant="outlined"
                    page={page}
                    defaultPage={1}
                    color="primary"
                    onChange={handlePageChange}
                />}

            </div>}


        </>
    );



};



export {Items};
