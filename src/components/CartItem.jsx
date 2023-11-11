import { useContext } from "react"
import CartContext from "../store/CartContext"

export default function CartItem({item}) {
    const cartContext = useContext(CartContext)

    function handleIncrease(){
        cartContext.addItem(item)
    }

    function handleDecrease(){
        cartContext.removeItem(item.id)
    }

    return <li className="cart-item">
        <p>
            {item.volumeInfo.title} - {item.quantity} x 20.99$
        </p>
        <p className="cart-item-actions">
            <button onClick={handleDecrease}>-</button>
            <span>QTY</span>
            <button onClick={handleIncrease}>+</button>
        </p>
    </li>
}