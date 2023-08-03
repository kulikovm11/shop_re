import {useSelector} from "react-redux";

const useFavorites = () => {
    const {favoriteItems} = useSelector(state => state)
    return {favoriteItems}
};

export {useFavorites};