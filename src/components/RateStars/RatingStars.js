import StarRatings from 'react-star-ratings'




function RatingStars({rate}) {


    return (
        <div className="App">
            <div className="Wrapper">
                <StarRatings
                    rating={rate}
                    starRatedColor="#FFD700"
                    starEmptyColor="#999999"
                    starHoverColor="#FFD700"
                    starSpacing="5px"
                    starDimension="20px"
                    numberOfStars={5}
                    changeRating={null}
                    name='rating'
                />

            </div>
        </div>
    );
}

export {RatingStars};