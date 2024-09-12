import About from "./pages/About";
import Home from "./pages/Home";
import Signup from "./pages/Signup.js";
import { Route } from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Login from "./pages/Login.js";
import { CartProvider } from "./components/ContextReducer.js";
import MyOrder from "./pages/MyOrder.js";

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import Success from "./pages/Success.js";
import Cancel from "./pages/Cancel.js";

const App = () => {

  return (
    <CartProvider>
      <div>
        {/* <Home/> */}

        <Route path='/' component={Home} exact={true} />
        <Route path='/about' component={About} exact={true} />
        <Route path='/register' component={Signup} exact={true} />
        <Route path='/login' component={Login} exact={true} />
        <Route path='/myOrder' component={MyOrder} exact={true} />
        <Route path='/success' component={Success} exact={true} />
        <Route path='/cancel' component={Cancel} exact={true} />
      </div>
    </CartProvider>
  )
}

export default App