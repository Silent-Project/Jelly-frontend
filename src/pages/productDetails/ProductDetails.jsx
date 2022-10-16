import React from 'react'
import './ProductDetails.css'
import { useState,useEffect } from 'react'
import { BsStarFill } from 'react-icons/bs'
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import NavBar from '../../components/navBar/NavBar'
import Button from '../../components/button/Button'
import Footer from '../../components/footer/Footer'
import battery from '../../assets/battery.png'
import cart from '../../assets/images/cart.png'
import { useParams } from 'react-router-dom'
import { addToCart } from '../../helpers/cart';


function ProductDetails() {
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const param = useParams();


    const BASE_URL = 'https://jelly-online-api.herokuapp.com'
    
    const fetchData = async () => {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/details/${param.id}`)
        const data = await res.json()
        setProduct(data.data[0])

        fetchRelatedProducts(data.data[0]);

        setLoading(false);
    };
    const fetchRelatedProducts = async (product) => {
        if(!product) return;
        const res = await fetch(`${BASE_URL}/api/category`);
        const data = await res.json();
        setRelatedProducts(data.Pdata.filter((prod) => ( prod.category_id === product.category_id )));
    };
    useEffect(() => { 
        fetchData();
    }, [])
    if(loading) return <h1 style={{textAlign:'center'}}>Loading...</h1>;
    if(!loading && !product) return <h1 style={{textAlign:'center'}}>404 error can't find product</h1>;
  return (
    <div>
        <div className='navigation-bar'>
            <NavBar/>
        </div>

            <div className='product-details-container'>
                <div className='product-name'>
                    <div className='product-name-images'>
                        <div className='product-image-big'>
                            <img src={product.img} alt="" />
                        </div>

                        <div className='product-image-small'>
                            <BiChevronLeft size={50} className='icon' />
                            <img src={product.img } alt="product"  />
                            <img src={product.img } alt="product" />
                            <img src={product.img } alt="product" />
                            <BiChevronRight size={50} className='icon'/>
                        </div>
                    </div>

                    <div className='product-name-content'>
                        <h2>{product.name}</h2>
                        {/* <p> <b> Price Range:</b>   ${product.price} -$500</p> */}
                        {
                            product.price_range ? 
                            <p><b> Price Range: </b>${product.price_range[0].one} -${product.price_range[0].two}</p>:
                            <p><b>Price: </b> ${product.price}</p> 
                        }

                        <p>Available colors:</p>
                        <div className='available-colors'>
                            <div className='purple'>
                                <Button type={'submit'} />
                            </div>

                            <div className='black'>
                                <Button type={'submit'} />
                            </div>

                            <div className='blue'>
                                <Button type={'submit'} />
                            </div>
                        </div>

                        <div className='add-to-cart'>
                            <img src={cart} alt=""/>
                            <Button type={'submit'} content= 'ADD TO CART' style={{fontWeight:'bold'}} onClick={() => { addToCart(product) }} />
                        </div>
                    </div>
               
                </div>





                <div className='product-details'>
                    <div className='product-details-header'>
                        <h2>Product Details</h2>    
                    </div>
                    <div className='product-details-content'>
                        <h3>Key Features:</h3>
                        <li>100% and high quality, durable!</li>
                        <li>{product.product_detail ? product.product_detail[0].key_features : ''}</li>
                        {/* <li>Light weight and compact, easy to move and clean</li>
                        <li>Simple to assemble and with covers to prevent any dust</li>
                        <li>A nice solution to the shoes and great helper for the housekeeping</li>
                        <li>This shoe rack cover keeps your shoes un-viewable and keeps your room neat.</li>
                    <li>Easy to Assemble</li> */}

                        <h3>Specification:</h3>
                        <li>100% and high quality, durable!</li> 
                        <li>{product.product_detail ? product.product_detail[0].specifications : ''}</li>
                        {/* <li>Lightweight and compact, easy to move and clean</li>
                        <li>Simple to assemble and with covers to prevent any dust</li>
                        <li>Color: purple.</li> */}
                    </div>
                </div>
          
                <div className='other-products'>
                    <div className='other-products-header'>
                        <h2>Other products you might like</h2>
                    </div> 

                    <div className='other-products-content'>   

                        <BiChevronLeftCircle size={70} className='icon'  />
                        <div className='other-products-boxs'>
                            {
                                relatedProducts.map((prod) => (
                                    <div key={prod._id} className='other-products box'>
                                        <h3>P{prod.name}</h3>
                                        <img src={prod.img} alt=''/>
                                        <p>{prod.price}</p>
                                        <Button type={'submit'} content='GO TO DETAILS' style={{ width: '100%', height: '50px', borderRadius: '0px',padding: '15px', fontWeight:'bold' }} />
                                    </div>
                                ))
                            }

                        </div>
                      

                        <BiChevronRightCircle size={70} className='icon' position="fixed"/>
                    
                        
                    </div>
                </div>





                <div className='verified-customer-fb'>
                    <div className='verified-customer-fb-header'>
                        <h1>Verified Customers Feedback</h1>
                        <span>SEE ALL <Button type={'submit'} content='>' style={{ width: '20%', height: '50px', borderRadius: '100px', backgroundColor:'white', color:'blue'}} />  </span>
                    </div> 
    
                    <div className='verified-ratings-comments1'>

                        <div className='verified-ratings'>
                            <h3>VERIFIED RATINGS</h3>

                            <div className='verified-ratings-box'>
                                <h2>3.5/5</h2>
                                     <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                     <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                     <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                     <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                     <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                    
                               
                                <p>245 verified ratings</p>
                            </div>
                        </div>

                        <div className='comments-from-v-purchases1'>
                            <h3>COMMENTS FROM VERIFIED PURCHASES</h3>
                                <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                <p style={{fontWeight:'bold'}}>I like it</p>
                                <p>Simple</p>
                                <p>15-09-2022</p>
                        </div>
                          
                    </div>


                    <div className='verified-ratings-comments1'>

                        <div className='verified-ratings'>
                                                    
                            <div className='verified-rating-count'>
                                <div className='verified-rating-slider'>
                                    <p> 5
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                    </p>

                                    <meter min='0' max='100' value='50' ></meter>

                                </div>

                                <div className='verified-rating-slider'>
                                    <p>4 
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                    </p> 

                                    <meter min='0' max='100' value='50' ></meter>

                                </div>

                                <div className='verified-rating-slider'>
                                    <p>3
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                    </p>
                                   
                                    <meter min='0' max='100' value='50' ></meter>

                                </div>

                                <div className='verified-rating-slider'>
                                    <p>2 
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>    
                                    </p>                
                                   
                                    <meter min='0' max='100' value='50' ></meter>

                                </div>

                                <div className='verified-rating-slider'>
                                    <p>1
                                        <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                        <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>
                                    </p>
                                   
                                    
                                    <meter min='0' max='100' value='50' ></meter>

                                </div>
                               
                            </div>
                        </div>

                        <div className='comments-from-v-purchases2'>
                            <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                            <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                            <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                            <BsStarFill style = {{color: 'gold', weight: 'fill', fontSize: '19'}}/>
                            <BsStarFill style = {{color: '#c9c9c9', weight: 'fill', fontSize: '19'}}/>   
                            <p style={{fontWeight:'bold'}}>I like it</p>
                            <p>Simple</p>
                            <p>15-09-2022</p>
                        </div>
                          
                    </div>                                                           
                </div>
           
            </div>
        
        <div className='footer'>
            <Footer/>
        </div>

    </div>
   
  )
}

export default ProductDetails