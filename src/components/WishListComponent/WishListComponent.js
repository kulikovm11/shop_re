import {useFavorites} from "../../hooks/useFavorites";
import {useDispatch} from "react-redux";
import {deleteFromFavorites} from "../../redux/slices/favorites.slice";


const WishListComponent = () => {
    const {favoriteItems} = useFavorites()
    const dispatch = useDispatch()

    const deleteFromList = (id) => {
        dispatch(deleteFromFavorites({id}))
    }


    console.log()
    return (
        <>
            {favoriteItems.map((item) => {
                const {id,title} = item
                return  <div key={id}>
                            {title}
                            <button onClick={()=>deleteFromList(item.id)}>Delete</button>
                        </div>
            })}
        </>
    );
};

export {WishListComponent};