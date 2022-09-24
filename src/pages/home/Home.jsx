import React, { useState, useEffect } from 'react';
import NavBar from "../../components/navBar/NavBar";
// import intro from "../../assets/intro.mp4";
import bike from "../../assets/512.png";
import turnSignal from "../../assets/turn-signal.jpg";
import Button from "../../components/button/Button";
import Footer from '../../components/footer/Footer';
import "./Home.css";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { MdDirectionsBike, MdDirectionsCar, MdDirectionsBus, MdOutlineStar } from "react-icons/md";
import { Fade, Zoom } from "react-awesome-reveal";
import { addToCart, removeFromCart } from '../../helpers/cart';

function Home() {
  const [featuresIndex, setFeaturesIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const productsPerPage = 3;

  const featuresArray = ["512.png", "bike.jpg"];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    // const URL = process.env.REACT_APP_SERVER_URL

    const BASE_URL = 'https://jelly-online-api.herokuapp.com'

    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/category`)
      const data = await res.json()
      const category = data.Cdata
      const product = data.Pdata
      // setCategories(category)
      // console.log(product)
      setProducts(product);
      // console.log(category);
      
      setTotalProducts(product.length);
      setLoading(false);
      // getCurrentProducts(product);
    };
    fetchData();
  }, []);

  const prev = () => {
    setFeaturesIndex(featuresIndex => {
      if (featuresIndex === 0) return featuresArray.length - 1;
      return featuresIndex - 1;
    })
  }
  const next = () => {
    setFeaturesIndex(featuresIndex => {
      if (featuresIndex === (featuresArray.length - 1)) return 0;
      return featuresIndex + 1;
    })
  }

  const accessoriesPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage => currentPage - 1);
  }
  const accessoriesNext = () => {
    const numberOfPages = Math.ceil(totalProducts / productsPerPage);
    if (currentPage < numberOfPages) setCurrentPage(currentPage => currentPage + 1);
  }

  return (
    <div className='cntainer'>

      <NavBar currentPage="home" />
      <div className="imgcontainer resize-max">
        <img src={bike} alt="evtop"  className = 'evtopimg'/>
      </div>

      <div className='features-div'>

        <div className='features-slider-div'>
          <BiChevronLeftCircle size={50} className='icon' onClick={() => { prev() }} />
          <Fade direction="up" spy={featuresIndex} className='slider-attention-seeker'>
            <img src={require(`../../assets/${featuresArray[featuresIndex]}`)} alt="bike" className='slider-item' />
          </Fade>
          <BiChevronRightCircle size={50} className='icon' onClick={() => { next() }} />
        </div>


      </div>


      <div className='transport-cost-div resize-max'>
        <h1 className='transport-cost-header'>Transportation Cost Comparison (Monthly)</h1>
        <div className='vehicles'>
          <div className='vehicle'>
            <MdDirectionsBike size={100} className='icon' />
            <p className='description-price'>Description Price</p>
          </div>
          <div className='vehicle'>
            <MdDirectionsCar size={100} className='icon' />
            <p className='description-price'>Description Price</p>
          </div>
          <div className='vehicle'>
            <MdDirectionsBus size={100} className='icon' />
            <p className='description-price'>Description Price</p>
          </div>
        </div>

        <div className='input-range-div'>
          <p className='input-range-title'>Daily Usage 1km (s)</p>
          <input type='range' className='input-range' />
        </div>
      </div>

      <div className='promo'>
        <div className="resize-promo resize-max">
          <Fade direction="up" spy={featuresIndex} className='promo-attention-seeker'>
            <img src={turnSignal} alt="promo" className='promo-img' />
          </Fade>
          <div className='promo-info'>
            <h2 className='promo-header'>Jelly e-indicaator</h2>


            <div className='ratings'>
              <MdOutlineStar size={20} color="yellow" />
              <MdOutlineStar size={20} color="yellow" />
              <MdOutlineStar size={20} color="yellow" />
              <MdOutlineStar size={20} color="yellow" />
              <MdOutlineStar size={20} color="yellow" />
              <p className='number-of-ratings'>(20)</p>
            </div>

            <p className='promo-price'>Buy at: $99</p>
            <p className='promo-desc'>
              Refer friends and get upto Rs. 5000/- OFF on final price Jelly App connected | Removable battery | Ignition key switch with handle lock | BIS Approved Cell | Peddle Assist sensor with multi riding modes
            </p>
            <Button content="Buy Now" style={{}} />
          </div>
        </div>
      </div>

      <div className='accessories-div resize-max'>
        <div className='accessories-header'>
          <p className='accessories-title'>Accessories</p>
          <Button content="View More" style={{ width: "20%", height: "15%", fontSize: "100%" }} />
        </div>



        <div className='accessories-slider'>

          <BiChevronLeftCircle size={50} className='icon' onClick={() => { accessoriesPrev() }} />
          {
            currentProducts.map((product) => (
              <div key={product._id} className='accessories-slider-item'>
                <p>{product.name}</p>
                <Zoom direction="up">
                  <img src={product.img} alt={product.name} className='accessories-slider-item-image' />
                </Zoom>
                <Button onClick={() => { addToCart(product) }} content="Add to Cart" style={{ width: "90%", height: "15%", fontSize: "100%" }} />
              </div>
            ))
          }

          <BiChevronRightCircle size={50} className='icon' onClick={() => { accessoriesNext() }} />

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home;