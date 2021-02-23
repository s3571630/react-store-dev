import React from 'react';
import {withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
class ToolBox extends React.Component{
    state = {
        searchText :'',
    }
    handleChange = e =>{
        const value = e.target.value;
        this.setState({
            searchText :value
        });
        // 從Products傳來的
        this.props.search(value)
    }
    clearSearchText =()=>{
        this.setState({
            searchText :''
        })
        // 清除的時候也要再做一次
        this.props.search('')
    }

    goCart = () => {
        // 登入後才能進購物車 不登入跳轉到登入頁
        if(!global.auth.isLogin()){
            this.props.history.push('/login')
            toast.info('Please Login First')
            return
            // 如果沒登入就不執行下面 先回傳
        }
        this.props.history.push('/cart')
    }
    render(){
        return(
            <div className="tool-box">
               <div className="logo-text">Store</div>
               <div className="search-box">
                   <div className="field has-addons">
                       <div className="control">
                           <input
                            type="text"
                            className="input search-input"
                            placeholder="Search-Products"
                            value={this.state.searchText}
                            onChange={this.handleChange}
                           />
                       </div>
                       <div className="control">
                           <button className="button" onClick={this.clearSearchText}>X</button>
                       </div>
                   </div>
               </div>
               <div to="/cart" className="cart-box" onClick={this.goCart}>
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-num">({this.props.cartNum})</span>
               </div>
               {/* 直接經過路由的組件才有 history 所以要用要引入 withRouter */}
               {/* 也可以引入Link 做連結 <Link to="/cart" className="cart-box"></Link>*/}
            </div>
        )
    }
}
export default withRouter(ToolBox);
