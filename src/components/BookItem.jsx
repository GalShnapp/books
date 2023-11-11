import { useContext } from "react"
import CartContext from "../store/CartContext"
import Button from "./UI/Button"

const MAX_DESCRIPTION_LENGTH = 50

export default function BookItem({bookVolume}) {
    const imgSrc = bookVolume.volumeInfo.imageLinks?.thumbnail?? "https://static-00.iconduck.com/assets.00/crying-face-emoji-2048x1974-o6ci2ofm.png"
    const cartContext = useContext(CartContext)

    const handleAddToCart = () => {
        cartContext.addItem(bookVolume)
    }

    const shortenDescIfNeeded = (desc) => {
        if (!desc) return 'No Description Available'
        if (desc.length > MAX_DESCRIPTION_LENGTH)
            return desc.slice(0, MAX_DESCRIPTION_LENGTH - 3) + '...'
        return desc
    }

    return (
    <li className="book-item">
        <article>
            <img src={imgSrc} alt={bookVolume.volumeInfo.descprition}/>
            <div>
                <h3>
                    {bookVolume.volumeInfo.title}
                </h3>
                <p className="book-item-price">20.99$</p>
                <p className="book-item-description">{shortenDescIfNeeded(bookVolume.volumeInfo.subtitle)}</p>
            </div>
            <p className="book-item-actions">
                <Button onClick={handleAddToCart}>Add to Cart</Button>
            </p>
        </article>
    </li>)
}