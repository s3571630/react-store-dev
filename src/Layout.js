import React,{ useMemo } from 'react';
import Header from './components/Header'
const Cart = props =>{
    const user = useMemo(()=>{
        return global.auth.getUser() || []
    },[])

    return(
        <div className="main">
            <Header user={user}/>
            {props.children}
            {/* 用props.children 獲取開始標籤與結束標籤內容來動態載入 */}
        </div>
    )
}


export default Cart;
