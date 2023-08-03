import {useEffect, useState} from "react";
import {NavLink,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


import css from './HeaderStyle.module.css'
import login_image from './images/LoginIMG.png'
import {useFavorites} from "../../hooks/useFavorites";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {toggleForm} from "../../redux/slices/userSlice";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Avatar} from "@mui/material";
import {ProfileComponent} from "../Profile/ProfileComponent";




const Header = () => {

    const dispatch = useDispatch()
    const {currentUser, cart} = useSelector(({user})=>user)
    const [values,setValues] = useState({ firstName:"Login", lastName:null})
    const navigate = useNavigate()


    const {favoriteItems} = useFavorites()

    const handleClick = () => {
        if (!currentUser){
            dispatch(toggleForm(true))
        }
        else navigate('profile')
    }

    useEffect(() => {
        if (!currentUser) return

        setValues(currentUser)


    },[currentUser])




    const tooltipTxt = "Login or sign up to use a cart"

    const renderTooltip = (props) => (
        <Tooltip id="close-tooltip" {...props}>
            {tooltipTxt}
        </Tooltip>
    );








    return (
        <div className={css.Header}>

            <div className={css.Logo}>
                <NavLink to={""}><p>Shop:)</p></NavLink>

            </div>




            {/*ACTIONS*/}


            <div className={css.actions}>
                {currentUser? <Avatar alt={values.firstName} src={values.image}/>:<img src={login_image} alt="" style={{width:"26px", height:"27px"}}/>}
                 <div onClick={handleClick} className={css.login_btn}> {values.firstName} {values.lastName}</div>


            </div>

            <div className={css.Wish_Cart}>
                <IconButton aria-label="cart" sx={{width:'26px',height:'27px'}}>
                    <Badge badgeContent={favoriteItems.length} color="success" >
                        <NavLink to={"wish"} ><FavoriteIcon style={{fontSize:'40px' ,color:'#035bfd'}}/></NavLink>

                    </Badge>
                </IconButton>

                <IconButton aria-label="cart" sx={{width:'26px',height:'27px'}}>
                    <Badge badgeContent={cart.length} color="success">
                        <NavLink to={"cart"} ><ShoppingCartIcon style={{fontSize:'40px', color:'#035bfd'}}/></NavLink>

                    </Badge>
                </IconButton>



                {/*{currentUser?<IconButton aria-label="cart" sx={{width:'26px',height:'27px'}}>*/}
                {/*    <Badge badgeContent={cart.length} color="success">*/}
                {/*        <NavLink to={"cart"} ><ShoppingCartIcon style={{fontSize:'40px', color:'#035bfd'}}/></NavLink>*/}

                {/*    </Badge>*/}
                {/*</IconButton>*/}
                {/*    :*/}
                {/*    <OverlayTrigger*/}
                {/*        placement="right"*/}
                {/*        delay={{ show: 250, hide: 400 }}*/}
                {/*        overlay={renderTooltip}>*/}

                {/*        <ShoppingCartIcon style={{fontSize:'40px', color:'gray'}}/>*/}
                {/*    </OverlayTrigger>*/}


                {/*}*/}

            </div>


        </div>
    );
};

export {Header};
