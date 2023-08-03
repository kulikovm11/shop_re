import {Carousel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './img/chasy_tsiferblat_vremia_348829_1440x900.jpg'
import image2 from './img/duhi_tsvety_flakony_109587_1440x900.jpg'
import image3 from './img/right-technique-to-apply-skincare-products_mobilehome.avif'

const CarouselComponent = () => {



    return (
        <Carousel variant="dark" style={{width:"800px"}} >
            <Carousel.Item>
                <img
                    className="d-block w-100 "
                    src={image1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5>Modern watches at a lower price</h5>
                    <p>Make your style better</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={image2}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h5 style={{color:"#ffccff"}}><span style={{color:'red'}}>NEW</span> Spring perfumes collection</h5>
                    <p style={{color:"#ffccff"}}>for her and for him</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={image3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5 style={{color:"cornflowerblue"}}>Skincare discount</h5>
                    <p style={{color:"black"}}>
                        Care about your skin health at a good price
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
export {CarouselComponent};
