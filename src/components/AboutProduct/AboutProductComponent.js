import {useEffect, useState} from "react";

import Carousel from 'nuka-carousel'

import {marketService} from "../../configs";
import {RatingStars} from "../RateStars/RatingStars";
import css from './AboutProductStyle.module.css'


const AboutProductComponent = ({id}) => {

    const [item, setItem] = useState(null)







    useEffect(()=>{
        try {
            marketService.getById(id).then(({data})=>setItem(data))
        }catch (e) {

            console.log('error')

        }finally {

        }



    },[id])

    if (!item) {
        return null;
    }

    const { title, brand, price, description, category, rating, images, discountPercentage } = item;


    const filteredCategories = ['fragrances', 'skincare', 'womens-watches'];
    const isInFilteredCategories = filteredCategories.includes(category);
    const discountPercent = isInFilteredCategories ? discountPercentage : 0;
    const discount = price * discountPercent / 100;
    const discountedPrice = Math.round(price - discount);



    return (
        <>
            {item &&

                <div className={css.Wrap}>
                    <div className={css.InfoAbout}>

                        <div>
                            <h2>{title} from <span style={{color:'cornflowerblue'}}>{brand}</span></h2>
                            <span style={{color:'green',fontWeight:'bold'}}>{discountedPrice}$</span></div>
                            <p>{description}</p>
                            <p>{category}</p>


                        <RatingStars rate={rating}/>

                    </div>



                    {/*https://www.npmjs.com/package/nuka-carousel*/}
                    <div className={css.Carousel}>

                        <Carousel wrapAround={false} slidesToShow={3} enableKeyboardControls={true} style={{display:'flex', paddingLeft:'10px'}}  >

                            {images.map(image=> <img  className={css.Image} key={Math.random()} src={image} alt={item.title} />)}

                        </Carousel>

                    </div>








                </div>}






        </>
    );
};

export {AboutProductComponent};
