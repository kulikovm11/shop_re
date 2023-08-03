import {useParams} from "react-router-dom";
import {AboutProductComponent} from "../../components/AboutProduct/AboutProductComponent";


const AboutProductPage = () => {

    const {id} = useParams()

    return (
        <div>
            <AboutProductComponent id={id}/>
        </div>
    );
};

export {AboutProductPage};
