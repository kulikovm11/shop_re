import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import {RatingStars} from "../RateStars/RatingStars";
import {useDispatch, useSelector} from "react-redux";


import like from './images/like.png'
import liked from './images/liked.png'
import cartImg from './images/cart.png'
import fullCart from './images/fullcart.png'
import css from './ItemCardStyle.module.css'
import {useActions} from "../../hooks/useActions";
import {useFavorites} from "../../hooks/useFavorites";
import {addItemToCart} from "../../redux/slices/userSlice";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";







const ItemCard = ({item,filtered}) => {

    const navigate = useNavigate()

    const {favoriteItems} = useFavorites()


    const {toggleAddToFavorites} = useActions()


    const isExists = favoriteItems.some(i => i.id === item.id)

    const dispatch = useDispatch()

    const {currentUser, cart} = useSelector(({user})=>user)


    const addToCart = () => {
        dispatch(addItemToCart(item))
    }

    const isCartExist = cart.some(i => i.id === item.id)




    // const discount = item.price * item.discountPercentage / 100
    // const newPrice = item.price - discount

    const isInFiltered = filtered.some((filteredItem) => filteredItem.id === item.id);
    const discount = isInFiltered ? item.price * item.discountPercentage / 100 : 0;
    const newPrice = Math.round(item.price - discount)








    if (!item){
        return null
    }

    const {id, title,price,description,thumbnail,rating,discountPercentage} = item;

    // const handleAddToCart = () => {
    //     const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     items.push(item)
    //     localStorage.setItem('cartItems', JSON.stringify(items))
    // }



    const tooltipTxt = "Login or sign up to use a cart"

    const renderTooltip = (props) => (
        <Tooltip id="close-tooltip" {...props}>
            {tooltipTxt}
        </Tooltip>
    );



    return (
        <Card sx={{ maxWidth: 245 }} >
            <CardMedia

                sx={{ height: 100 }}
                image={thumbnail}
                title={title}


            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                {isInFiltered? <span style={{color:'red',fontWeight:'bold',textDecoration:'line-through'}}> {`${price}$`}</span>:null}
                <span style={{color:'green',fontWeight:'bold'}}> {`${newPrice}$`}</span>
            <RatingStars rate={rating}/>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>navigate(id.toString())}>About...</Button>
                <Button size="small" onClick={()=>toggleAddToFavorites(item)}>{isExists?<img src={liked} className={css.Liked}  alt="add to wish"/> : <img src={like} className={css.Will_like}  alt="add to wish"/>}</Button>
                {/*{!currentUser?  <OverlayTrigger*/}
                {/*    placement="right"*/}
                {/*    delay={{ show: 250, hide: 400 }}*/}
                {/*    overlay={renderTooltip}>*/}

                {/*    <ShoppingCartIcon style={{fontSize:'30px', color:'gray'}}/>*/}
                {/*</OverlayTrigger>*/}
                {/*    : isCartExist?*/}
                {/*    <Button size="small" onClick={addToCart} disabled={true}>{isCartExist? <img src={fullCart}  className={css.InCart} alt=""/> : <img src={cartImg}  alt="" />}</Button>*/}
                {/*    :*/}
                {/*    <Button size="small" onClick={addToCart}>{isCartExist? <img src={fullCart}  className={css.InCart} alt=""/> : <img src={cartImg}  alt="" />}</Button>*/}
                {/*}*/}
                {isCartExist?
                        <Button size="small" onClick={addToCart} disabled={true}>{isCartExist? <img src={fullCart}  className={css.InCart} alt=""/> : <img src={cartImg}  alt="" />}</Button>
                        :
                        <Button size="small" onClick={addToCart}>{isCartExist? <img src={fullCart}  className={css.InCart} alt=""/> : <img src={cartImg}  alt="" />}</Button>
                }






            </CardActions>
        </Card>
    );
}



export {ItemCard};
