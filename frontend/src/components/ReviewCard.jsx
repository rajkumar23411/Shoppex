import React from 'react'
import {Rating} from "@material-ui/lab"
const ReviewCard = ({review}) => {
      const options = {
            value: review && review.rating,
            size: "small",
            precision: 0.5,
            readOnly: true
          };
  return (
      
    <div className='reviewCard'>
      <div>
            <img src="http://getdrawings.com/free-icon-bw/profile-png-icon-17.png" alt="profile" className='profileIcon'/>
      </div>
      <div>
            <div className="nameReview">
                 <h5> {review.name}</h5>
                  <Rating {...options} />
            </div>
            <div className="comment">{review.comment}</div>
      </div>
    </div>
  )
}

export default ReviewCard