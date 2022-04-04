app.component('product-display', {
    template: `
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image" alt="">
                </div>
                <div class="product-info">
                    <h1>{{title}}</h1>
                    <p v-if="inStock">In Stock</p>
                    <p v-else>Out Of Stock</p>
                    
                    <p>Shipping: {{shipping}}</p>
                    <ul>
                        <li v-for="detail in details">
                            {{detail}}
                        </li>
                    </ul>
                    <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariantIndex(index)" class="color-circle" :style  ="{backgroundColor:variant.color}"></div>
                    <button class="button" @click="addToCart" :disabled="!inStock" :class="{disabledButton:!inStock}">Add to cart</button>
                </div>
            </div>
             <review-list :reviews="reviews"></review-list>
             <review-form @review-submitted="addReview"></review-form>   
        </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            variantIndex: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [{id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50}, {
                id: 2235,
                color: 'blue',
                image: './assets/images/socks_blue.jpg',
                quantity: 0
            }],
            reviews:[]
        }
    },
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.variantIndex].id)
        },
        updateVariantIndex(index) {
            this.variantIndex = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        inStock() {
            return this.variants[this.variantIndex].quantity
        },
        image() {

            return this.variants[this.variantIndex].image
        },
        shipping() {
            if (this.premium) {
                return 'free'
            }
            return 2.99
        }
    }

})