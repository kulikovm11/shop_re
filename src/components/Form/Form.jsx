import css from "./FormStyle.module.css";
import {useState} from "react";

const Form = ({findItem,query,setQuery,foundItems,clearSearch}) => {

    const [isSearching, setIsSearching] = useState(false);

    const handleClear = () => {
        clearSearch();
        setIsSearching(false);
    };


    const handleSearch = (e) => {
        if (query){
            findItem(e);
            setIsSearching(true);
        }
    };



    return (
        <form action="" onSubmit={findItem}>
            <input type="text" name="" id="find-item"
                   placeholder="search"
                   className={css.Form}
                   value={query}
                   onChange={(e)=>setQuery(e.target.value)}

            />

            {isSearching ? (
                <button className={css.Form_btn} onClick={handleClear}>
                    Clear
                </button>
            ) : (
                <button className={css.Form_btn} onClick={handleSearch}>
                    Go
                </button>
            )}




        </form>

    );
};

export {Form};
