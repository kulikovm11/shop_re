import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, removeItemFromCart, setCart} from "../../redux/slices/userSlice";
import {useEffect} from "react";



const CartComponent = () => {

    const {cart} = useSelector(({user})=>user)
    const dispatch = useDispatch()


    useEffect(() => {
        // При монтировании компонента загрузить корзину из localStorage (если она там есть)
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        dispatch(setCart(storedCart));
    }, [dispatch]);

    useEffect(() => {
        // При обновлении корзины сохранить ее состояние в localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);



    const sumBy = (arr) => arr.reduce((prev, cur)=>prev + cur, 0)

    function changeQuantity(item, quantity) {
        dispatch(addItemToCart({...item, quantity}))
    }
    const removeItem = (id) =>{
        dispatch(removeItemFromCart(id))
    }

    return (
        <>
        <div className="cart">
            <h2>Cart</h2>


            {!cart.length?(
                <div>Empty</div>
            ): (
                <div>
                    {cart.map(item=>{
                        const {title, price, id, quantity} = item
                        return <div key={id} style={{backgroundColor:'gray'}}>

                            <div>
                                <p>{title}</p>
                                <p>{price}$</p>
                                <p>{quantity}</p>
                                <button onClick={()=>changeQuantity(item, Math.max(1,quantity +1))}>+</button>
                                <button onClick={()=>changeQuantity(item, Math.max(1,quantity -1))}>-</button>
                                <button onClick={()=>removeItem(item.id)}>Delete from cart</button>
                            </div>

                                <div className="total">
                                    <p>Total: {price*quantity}$</p>
                                </div>

                        </div>

                    })}
                </div>

            )}
        </div>


            <div className="total_price">
                Total price: {''}
                <span>
                    {sumBy(cart.map(({quantity, price}) => quantity * price))}$
                </span>
            </div>
            <div>

            </div>



        </>
    );
};

export {CartComponent};
