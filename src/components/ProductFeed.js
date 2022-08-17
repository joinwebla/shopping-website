import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {loadProductFeed, createCart, loadDataFromCart, addProductToTheCart} from '../apiCalls/index'

export const ProductFeed = () => {
    const [products, setProducts] = useState([]);
    const [cartInfo, setCartInfo] = useState({});


    const handleLogout = () => {
        localStorage.removeItem("AUTH_TOKEN");
        window.location.href = "/login"
    }


    const loadTheProducts = async () => {
        try {
            const response = await loadProductFeed()
            setProducts(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }


    const loadOrCreateCart = async () => {
        const cartId = localStorage.getItem("ECOM_CART_ID");

        if(cartId){
            //load the data from cart
            const response = await loadDataFromCart(cartId);
            console.log("cart info", response.data);
            setCartInfo(response.data);
        } else {
            // create a new to the user cart 
            const response = await createCart();
            localStorage.setItem("ECOM_CART_ID", response.data.id)
            setCartInfo(response.data);
        }

    }


    useEffect(() => {
        loadTheProducts();
        loadOrCreateCart();
    }, [])


    const handleAddToCart = async (productId) => {
        const cartId = localStorage.getItem("ECOM_CART_ID");
        try {
            const response = await addProductToTheCart(cartId, productId)
            setCartInfo(response.data.cart)
        } catch (error) {
            
        }
    }


    const addedProducts = (cartInfo?.line_items || []).map(({product_id}) => product_id);

    return(
        <div>
            <h1>This is a Product Feed</h1>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

            <div style={{position: 'fixed', top: 0, right: 0, margin: 20, padding: 10, border: '1px solid', zIndex: 999, backgroundColor: '#ffffff'}}>
                <h5>Total Products - {cartInfo?.total_items || 0}</h5>
                <h5>Total Price - {cartInfo?.subtotal?.formatted_with_symbol || 0}</h5>
                <button className="btn btn-secondary">Checkout</button>
            </div>

            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                {
                    products.map((product, index) => {
                        const {id, name, description, price, image} = product;
                            
                        return(
                            <div key={index} className="card" style={{width: 300, height: 400, margin: 20}}>
                                <img
                                    className="card-img-top"
                                    src={image ? image.url : ""}
                                    style={{
                                        width: '100%',
                                        height: 200
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{name}</h5>
                                    <p className="card-text">{price ? price.formatted_with_symbol : 0}</p>
                                    <p className="card-text">{description.replace("<p>", "").replace("</p>", "")}</p>
                                    {
                                        addedProducts.includes(id) ? (
                                            <button className="btn btn-warning">Added</button>
                                        ) : (
                                            <button className="btn btn-primary" onClick={() => { handleAddToCart(id) }}>Add to cart</button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
