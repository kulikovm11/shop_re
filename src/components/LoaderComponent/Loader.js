
import { MutatingDots} from "react-loader-spinner";

const Loader = () => {
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center",width:"100%", }}>
            <MutatingDots
                height="100"
                width="100"
                color="#035bfd"
                secondaryColor= '#035bfd'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export {Loader};