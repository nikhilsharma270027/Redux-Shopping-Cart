import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice'; 
import { STATUSES } from '../store/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    //const { data, status } = useSelector((state) => state.product);
    // we gonna change data alias product,then we can loop map on data that is products
    const { data: products, status } = useSelector((state) => state.product);

    //const [products, setProducts] = useState([])

    useEffect(() => {
        dispatch(fetchProducts());
        // const fecthProducts = async ()=> {
        //     const res = await fetch('https://fakestoreapi.com/products');
        //     const data = await res.json();
        //     //console.log(data)
        //     setProducts(data)
        // }
        // fecthProducts();
    }, []);
    
  const handleAdd = (product) => {
    dispatch(add(product))
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>
  }

  if (status === STATUSES.ERROR){
    return <h2>Something Went Wrong...</h2>
  }

  return (
    <div className='productsWrapper'>
        {
            products.map(product=> (
                <div className='card' key={product.id}>
                    <img src={product.image} alt=''></img>
                    <h4>{product.title}</h4>
                    <h5>${product.price}</h5>
                    <button onClick={() => handleAdd(product)} className='btn'>Add To Cart</button>     
                </div>    
            ))
        }
        
    </div>
  )
}

export default Products;
