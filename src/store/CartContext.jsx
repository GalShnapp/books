import { useReducer, createContext } from "react";


const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
});

function cartReducer(state, action) {
    if (action.type === 'ADD') {
        const itemIdx = state.items.findIndex((item) => {
            return item.id === action.item.id
        })
        const updatedItems = [...state.items]

        if (itemIdx > -1) {
            const existingItem = state.items[itemIdx];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[itemIdx] = updatedItem
        } else {
            updatedItems.push({...action.item, quantity: 1})
        }

        return {...state, items: updatedItems}
    } else if (action.type === 'REMOVE') {
        const itemIdx = state.items.findIndex((item) => {
            return item.id === action.id
        })
        const updatedItems = [...state.items]
        const item = state.items[itemIdx]

        if (item.quantity > 1) {
            const updatedItem = {
                ...item,
                quantity: item.quantity -1
            }
            updatedItems[itemIdx] = updatedItem
        } else {
            updatedItems.splice(itemIdx, 1)
        }
        return {...state, items: updatedItems}
    }

    return state
}

export function CartContextProvider({children}) {
    const [cart, dispacthCartAction] = useReducer(cartReducer, {items: []});

    function addItem(item) {
        dispacthCartAction({type:'ADD', item})
    }

    function removeItem(id) {
        dispacthCartAction({type:'REMOVE', id})
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
};

export default CartContext;