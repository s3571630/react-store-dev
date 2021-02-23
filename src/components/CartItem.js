import React,{useState, useMemo} from 'react';
import axios from '../commons/axios';
import { formatPrice } from '../commons/helper';
const CartItem = props =>{
    const [mount,setMount] = useState(props.cart.mount) // 初始值
    const {id, name, image, price} = props.cart || [];

    // 性能優化 避免重複渲染 用useMemo返回值 如果mount,price變化後才做 useCallback則返回函數
    // const sumPrice = formatPrice(mount * parseInt(price));
    const sumPrice = useMemo(() => {
        return formatPrice(mount * parseInt(price))
    },[mount,price])

    const handleChange = e =>{
        const _mount = parseInt(e.target.value);
        setMount(_mount)
        // 修改到資料庫
        const newCart = {
            ...props.cart,
            mount: _mount
        }
        axios.put(`/carts/${id}`,newCart).then(res => {
            props.updateCart(newCart)
        })

    }
    const deleteCart = () =>{
        axios.delete(`/carts/${id}`).then(res => {
            props.deleteCart(props.cart)
        })
    }
    return (
        <div className="columns is-vcentered">
            <div className="column is-narrow" onClick={deleteCart}>
                <span className="close">x</span>
            </div>
            <div className="column is-narrow">
                <img src={image} alt={name} width="100"/>
            </div>
            <div className="column cart-name is-narrow">{name}</div>
            <div className="column">
                <span className="price">{formatPrice(price)}</span>
            </div>
            <div className="column">
                <input type="number" min={1} className="input num-input" value={mount} onChange={handleChange}/>
                {/* value要搭配onChange 之類才能使用 預設值用defaultValue min={1}最小值給1就不會有負數*/}
            </div>
            <div className="column">
                <span className="sum-price">{sumPrice}</span>
            </div>
        </div>
    )
}
export default CartItem;
