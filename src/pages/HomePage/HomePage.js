
import {useSelector} from "react-redux";
import {Footer, Items} from "../../components";


const HomePage = () => {

    const {isLoading} = useSelector((state) => state.market);


    return (
        <>
            <Items/>
            {isLoading? null : <Footer/>}


        </>
    );
};

export {HomePage};
