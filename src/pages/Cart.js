import React,{useState, useEffect, useMemo} from 'react';
import axios from '../commons/axios';
import Layout from '../Layout'
import CartItem from '../components/CartItem';
import { formatPrice } from '../commons/helper';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const Cart =() =>{
    // 相當於 state/setState
    const [carts,setCarts] = useState([]);
    // 相當於 componentDidMount{}
    // useEffect 有兩個參數 第一個傳遞回調函數,第二個傳遞 陣列:回調函數執行所依賴的值
    // 如果依賴的值發生變化會執行函數 傳[]則相當於執行一次 如果沒傳第二個值他會不斷執行
    useEffect(()=>{
        // 根據userId 去做查詢
        const user = global.auth.getUser() || {}
        axios.get(`/carts?userId=${user.email}`).then(res =>setCarts(res.data))
    },[])

    const totalPrice = useMemo(() => {
        const totalPrice = carts
        .map(cart => cart.mount * parseInt(cart.price))
        .reduce((a,value) => a + value , 0);
        return formatPrice(totalPrice);
    },[carts])
    // 同步刷新總價
    const updateCart = cart =>{
        const newCarts = [...carts];
        const _index = newCarts.findIndex(c => c.id === cart.id);
        newCarts.splice(_index, 1, cart);
        setCarts(newCarts);
    }
    const deleteCart = cart =>{
        const _carts = carts.filter(c => c.id !== cart.id);
        setCarts(_carts);
    }
    return(
        <div className="main">
            <Layout>
                <div className="cart-page">
                    <span className="cart-title">Shopping Cart</span>
                    <div className="cart-list">
                        <TransitionGroup component={null}>
                            {carts.map(cart =>(
                                <CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
                                    <CartItem
                                        key={cart.id}
                                        cart={cart}
                                        updateCart={updateCart}
                                        deleteCart={deleteCart}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                    {carts.length === 0 ? <p className="no-cart">No Goods</p> : ''}
                    <div className="cart-total">
                        Total:
                        <span className="total-price">{totalPrice}</span>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
export default Cart;
