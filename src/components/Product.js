import React from 'react';
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';
import { formatPrice } from '../commons/helper';
import axios from '../commons/axios'
import Panel from './Panel';
import EditInventory from './EditInventory';
class Product extends React.Component {
    toEdit = () => {
        Panel.open({
            component: EditInventory,
            props: {
                product: this.props.product,
                deleteProduct: this.props.delete
            },
            callback: data => {
                if (data) {
                    this.props.update(data);
                }
            },
        });
    };
    // 使用async()異步函數讓他照順序做 並且跑出成功/錯誤提示
    addCart = async()=>{
        if(!global.auth.isLogin()){
            this.props.history.push('/login')
            toast.info('Please Login First')
            return
            // 如果沒登入就不執行下面 先回傳
        }
        try {
            const user = global.auth.getUser() || {};
            const { id, name, image, price } = this.props.product;
            // 抓出id符合的資料
            const res = await axios.get('/carts',{
                params:{
                    productId: id,
                    userId: user.email
                }
            });
            const carts = res.data;
            // 假如有資料等於第一筆 且數量加一
            if (carts && carts.length>0) {
                const cart = carts[0];
                cart.mount += 1;
                await axios.put(`/carts/${cart.id}`,cart)
            } else {
                const cart ={
                    productId:id,
                    name,
                    image,
                    price,
                    mount:1,
                    userId: user.email
                }
                await axios.post('/carts',cart)
            }
            toast.success('Add Cart Sucess')
            this.props.updateCartNum();
        } catch (error) {
            toast.error('Add Cart Failed')
        }
    }
    renderManagerBtn = ()=>{
        const user = global.auth.getUser() || [] // 如果為空就給空對象
        if(user.type === 1){
            return(
                <div className="p-head has-text-right" onClick={this.toEdit}>
                    <span className="icon edit-btn">
                        <i className="fas fa-sliders-h"></i>
                    </span>
                </div>
            )
        }
    }
    render() {
        // es6 新語法 = this.props.product.name/image/tags/price
        const { name, image, tags, price, status } = this.props.product;
        const _pClass = {
            available: 'product',
            unavailable: 'product out-stock',
        };
        return (
            <div className={_pClass[status]}>
                <div className="p-content">
                    {/* 裡面只能做表達式 所以要定義一個方法來渲染上去 */}
                    {this.renderManagerBtn()}
                    <div className="img-wrapper">
                        <div className="out-stock-text">Out Of Stock</div>
                        <figure className="image is-4by3">
                            <img src={image} alt={name} />
                        </figure>
                    </div>
                    <p className="p-tags">{tags}</p>
                    <p className="p-name">{name}</p>
                </div>
                <div className="p-footer">
                    <p className="price">{formatPrice(price)}</p>
                    <button className="add-cart" disabled={status === 'unavailable'} onClick={this.addCart}>
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        );
    }
}
export default withRouter(Product);
