import Header from "./components/Header";
import BookWrapper from "./components/BooksWrapper";
import Cart from "./components/Cart";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header/>
        <BookWrapper/>
        <Cart/>
        <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
    </>
  );
}

export default App;
