import Modal from './UI/Modal'
import { useContext } from "react"
import CartContext from "../store/CartContext"
import UserProgressContext from '../store/UserProgressContext'
import Button from './UI/Button'
import CartItem from './CartItem'

export default function Cart() {
    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)
    const cartItemsAccumulatedPrice = cartContext.items.reduce(
        (count, item) => {
            return count + (item.quantity * 20.99)
        }, 0
    )

    function handleClose(){
        userProgressContext.hideCart()
    }

    function handleGoToCheckout(){
        userProgressContext.showCheckout()
    }

    return <Modal
            onClose={userProgressContext.progress === 'cart'? handleClose: null}
            className='cart' 
            open={userProgressContext.progress === 'cart'}
        >
        <h2>My Cart</h2>
        <ul>
            {cartContext.items.map(item => 
            <CartItem key={item.id} item={item}></CartItem>
            )}
        </ul>
        <p className='cart-total'>{cartItemsAccumulatedPrice}$</p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleClose}>Close</Button>
            {cartContext.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
        </p>
    </Modal>
}