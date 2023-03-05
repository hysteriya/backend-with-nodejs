const express = require("express");
const reviewRouter = express.Router();
const{protecc}=require('../cuntroller/authcunt');
const{getAllReviews,top3reviews,getPlanReviews,createReview,updateReview,deleteReview}=require('../cuntroller/reviewcunt');

reviewRouter
.route('/all')
.get(getAllReviews);

reviewRouter
.route('/top3')
.get(top3reviews);

reviewRouter
.route('/:id')
.get(getPlanReviews);

reviewRouter.use(protecc);
reviewRouter
.route('/crud/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview)

module.exports=reviewRouter;