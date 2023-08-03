import {useCallback, useMemo, useState} from "react";

import css from './CardOfItemFromCartStyle.module.css'
import trashImg from './img/trash.png'





const CardOfItemFromCart = ({item, onDeleteItem,}) => {

    const {id,title, description, price,thumbnail} = item;




    const [count, setCount] = useState(1)

    const handleCounterUp = (e) => e.preventDefault()


    const add = useCallback(() => setCount(prevState => prevState+1),[])
    const remove = useCallback(() => setCount(prevState => prevState > 1? prevState -1 : prevState),[])

    const totalPrice = useMemo(() => price * count, [count, price]);

    const handleDeleteItemFromCart = () => {
        onDeleteItem(id)
    }






    return (
        <div className={css.Wrap}>
            <div className={css.Info}>
                <img src={thumbnail} alt={title} className={css.Logo}/>
                <div>{description}</div>
                <img src={trashImg} alt="delete item from cart" className={css.DeleteFromCart} onClick={handleDeleteItemFromCart}/>
            </div>



            <div className={css.Price}>
                <form action="" onSubmit={handleCounterUp}>
                    <button type="minus" onClick={remove} disabled={count<=1}>-</button>
                    <input type="number" value={count} min={1} disabled={true} onChange={(e)=>setCount(Number(e.target.value))}/>
                    <button type="plus" onClick={add} >+</button>
                </form>
                <div className={css.Total_price}>{totalPrice}$</div>
            </div>
            <hr/>
        </div>
    );
};

export {CardOfItemFromCart};