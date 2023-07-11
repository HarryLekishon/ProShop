import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { orderCreateReducer,orderDetailsReDucer, orderListMyReducer, orderPayReDucer} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReDucer,
    orderPay: orderPayReDucer,
    orderListMy: orderListMyReducer,

})

const cartItemsFromStoarge  = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : []

const userInfoFromStoarge  = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage  = localStorage.getItem('shippingAddress') ? JSON.parse
(localStorage.getItem('shippingAddress')) : null

const initialState = {
    cart: { cartItems: cartItemsFromStoarge,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: {userInfo: userInfoFromStoarge },
}


const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

    export default store