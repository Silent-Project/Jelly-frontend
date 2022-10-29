
function removeFromCart(product, cb){
    let cart = localStorage.getItem('cart');
    // console.log(typeof(cart))
    if(cart){
        cart = JSON.parse(cart).filter(({ _id }) => (
            _id !== product._id
        ));
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    if(cb) cb();    
}

function decreaseQuantity(productInFocus, cb){
    let cart = localStorage.getItem('cart');
    
    if(cart){
        cart = JSON.parse(cart);
        let product = cart.find((product) => product._id === productInFocus._id);
        if (!product) return;
        if(product.quantity === 1) {
            return removeFromCart(product, cb);
        }

        cart = cart.map(product => product._id === productInFocus._id ? { ...product, quantity: product.quantity - 1 } : product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    if(cb) cb();    
}

export { removeFromCart, decreaseQuantity };