import Modal from "./UI/Modal";
import { useContext, useState } from "react"
import CartContext from "../store/CartContext"
import UserProgressContext from '../store/UserProgressContext'
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
    const [values, setValues] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        isValid: false
    })

    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)
    const cartItemsAccumulatedPrice = cartContext.items.reduce(
        (count, item) => {
            return count + (item.quantity * 20.99)
        }, 0
    )

    function isValidForm(stateToBe) {
        function validateEmail(email) {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ) !== null;
        };

        function validateName(name) {
            return String(name)
              .toLowerCase()
              .match(
                /^\w+ \w+$/
              ) !== null;
        }

        function validatePhone(phone) {
            return String(phone)
              .toLowerCase()
              .match(
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
              ) !== null;
        }

        function validateAddress(address) {
            return String(address)
              .toLowerCase()
              .match(
                /^(?!\s*$).+/
              ) !== null;
        }

        return validateAddress(stateToBe.address) &&
            validateEmail(stateToBe.email) &&
            validateName(stateToBe.name) &&
            validatePhone(stateToBe.phone)
    }

    function handleClose() {
        userProgressContext.hideCheckout()
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit')
    }

    function handleNameChange(e) {
        const val = e.target.value
        const stateToBe = {
            ...values,
            name: val,
        }

        setValues({
            ...stateToBe,
            isValid: isValidForm(stateToBe)
        })
    }

    function handlePhoneChange(e) {
        const val = e.target.value
        const stateToBe = {
            ...values,
            phone: val,
        }

        setValues({
            ...stateToBe,
            isValid: isValidForm(stateToBe)
        })
    }

    function handleEmailChange(e) {
        const val = e.target.value
        const stateToBe = {
            ...values,
            email: val,
        }

        setValues({
            ...stateToBe,
            isValid: isValidForm(stateToBe)
        })
    }

    function handleAddressChange(e) {
        const val = e.target.value
        const stateToBe = {
            ...values,
            address: val,
        }

        setValues({
            ...stateToBe,
            isValid: isValidForm(stateToBe)
        })
    }

    return <Modal onClose={handleClose} open={userProgressContext.progress === 'checkout'}>
        <form>
            <h2>
                Checkout
            </h2>
            <p>Total Amount: {cartItemsAccumulatedPrice}$</p>
            <Input placeholder="John Doe" label='Full Name' id="full-name" type="text" value={values.name} onChange={handleNameChange}/>
            <Input placeholder="054-123-4567" label='Phone Number' id="phone" value={values.phone} onChange={handlePhoneChange}/>
            <Input placeholder="john@gmail.com" label='Email' id="email" type="email" value={values.email} onChange={handleEmailChange}/>
            <Input placeholder="13 banana st, Tel-Aviv" label='Address' id="address" type="text" value={values.address} onChange={handleAddressChange}/>
            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit} disabled={!values.isValid}> Submit Order </Button>
            </p>
        </form>
    </Modal>
}
/**
 * The form should include fields for the user to enter their name, phone
number, email and address.
 */