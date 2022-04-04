app.component('review-list',{
    template:`
    <div>
    <h1 v-if="reviews.length">Reviews</h1>
        <ul>
            <li v-for="(review, index) in reviews" :key="index" >
                {{review.name}} rates {{review.rating}}.
                
                {{review.review}}
            </li>
        </ul>
    
    </div>
    `,

    props:{
        reviews:{
            type:Array,
            required:true
        }
    }
})