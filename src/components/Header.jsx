import logoIMG from '../assets/logo.png'
import { useContext } from "react"
import CartContext from "../store/CartContext"
import UserProgressContext from '../store/UserProgressContext'
import Button from './UI/Button'

export default function Header() {
    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)
    const cartItemsNumber = cartContext.items.reduce(
        (count, item) => {
            return count + item.quantity
        }, 0
    )

    function handleShowCart () {
        userProgressContext.showCart()
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoIMG} alt='BookStores Are Great Fun'/>
                <h1>Book Kovrrs</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({cartItemsNumber})</Button>
            </nav>
        </header>
    )
}