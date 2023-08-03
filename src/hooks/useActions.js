import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {actions} from "../redux/slices/favorites.slice";
import {bindActionCreators} from "redux";

const rootActions = {
    ...actions
}


const useActions = () => {


    const dispatch = useDispatch()

   return useMemo(()=> bindActionCreators(rootActions, dispatch),
       [dispatch])
};

export {useActions};