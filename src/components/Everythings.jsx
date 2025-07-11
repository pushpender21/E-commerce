import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Everythings() {




  const [Alldata, setAlldata] = useState([]);
  const [addcart, setAddcart] = useState(JSON.parse(sessionStorage.getItem('cart')) || [])
  const [categorie, setcategorie] = useState('products')
  const fallbackImage = 'https://via.placeholder.com/150';


  // const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
  sessionStorage.setItem('realcart', JSON.stringify(addcart))

  const categories = (e) => {
    window.scrollTo(0, 0); 
    const newCategories = e.target.value;
    setcategorie(newCategories)
  }

  useEffect(() => {
    async function fetchdata() {

      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/${categorie}`);
        const data = await response.json();
        console.log(response);
        setAlldata(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

   
    fetchdata();
  }, [categorie]);

  const addtocart = (id) => {

    const idstring = String(id)
    setAddcart([...addcart, idstring]);

    toast.success('Successfully Added')
  }
  sessionStorage.setItem('cart', JSON.stringify(addcart));




  return (
    <div>
      <div className="spacess"></div>
      <div className="custom_container">


        <div className="col-md-12 mendescription">
          <h1>DNK</h1>
          <p>Shop here </p>
          <p>Most strusted e-commerce platform </p>
        </div>
        {/* <div className="custom_container"> */}

        {/* <div className="container"> */}
        <div className="row">
          <div className="allproducts">
            <div className=" fillter">
              <h2>Categories</h2>

              <div className="categories">
                <button className='btn category_btn' onClick={categories} value={'products'}>All</button>
                <button className='btn category_btn' onClick={categories} value={'categories/1/products'}>Clothes</button>
                <button className='btn category_btn' onClick={categories} value={'categories/2/products'}>Electronics</button>
                <button className='btn category_btn' onClick={categories} value={'categories/3/products'}>Furniture</button>
                <button className='btn category_btn' onClick={categories} value={'categories/4/products'}>Shoes</button>
              </div>


            </div>
            <div className=" page4">
              {!Alldata.length ? (
                <div className="loaders"><div class="loader"></div></div> // Your loader component or HTML
              ) : (
                Alldata.map((item) => (
                  <div className="products" key={item.id}>
                    <div className="product_img">
                      <Link to={'/singleproduct/' + item.id}><img
                        className='img_product'
                        src={item.images}
                        alt={item.title}
                        onError={(e) => e.target.src = fallbackImage} /></Link>
                    </div>
                    <div className="about_product">
                      <button type='button' onClick={() => addtocart(item.id)} id={item.id} className='btn addtocard' ><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                      <Link style={{ textDecoration: 'none', color: 'black' }} to={'/singleproduct/' + item.id}><h6>{item.title.slice(0, 30)}</h6>
                        <h6 className='category_text'>{item.category.name}</h6>
                        <p>₹{item.price}0</p></Link>
                    </div>
                  </div>
                )))}
            </div>
          </div>

        </div>
      </div>
      {/* </div> */}
      {/* // </div> */}
      <Toaster position="top-center" />
    </div>

  )
}

export default Everythings