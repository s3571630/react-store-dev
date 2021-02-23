import React from 'react';
import ToolBox from './ToolBox';
import Product from './Product';
import axios from '../commons/axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Panel from './Panel';
import AddInventory from './AddInventory';
class Products extends React.Component {
    state = {
        products: [],
        sourceProducts: [],
        // 因為刪除搜尋文字不會回到原本 所以要多存一個完整數據
        cartNum:0
        //購物車數量
    };
    componentDidMount() {
        axios.get('http://localhost:3004/products').then(response => {
            this.setState({
                products: response.data,
                sourceProducts: response.data,
            });
        });
        this.updateCartNum();
        // 渲染完就調用
    }

    // 將search作為參數傳遞就可以給ToolBox用
    // 在ToolBox中用參數使用此函式並傳入搜尋內容
    search = text => {
        // 1.Get New Array
        // 做過濾時要複製一個陣列
        let _products = [...this.state.sourceProducts]; // ...才是複製
        // 不能寫  let _products = this.state.sourceproducts 會改到相同的要複製
        // 也不能寫 let _products = [...this.state.products]
        // 資料變成上次搜尋沒辦法恢復,因為全部商品渲染是用products
        // 要多複製一組可變動的資料

        // 2.Filter New Array
        // filter過濾需要return一個規則
        _products = _products.filter(p => {
            // name: Abcd text: ab ===> ['Ab']
            // text: '' ==>['','','','']
            const matchArray = p.name.match(new RegExp(text, 'gi'));
            return !!matchArray;
            // 原寫法 return matchArray !== null
        });

        // 3.setState
        this.setState({
            products: _products,
            // 原本state是用products 去渲染
            // 現在改成 sourceProducts 就可以避免原資料被更動
        });
    };

    toAdd = () => {
        Panel.open({
            component: AddInventory,
            callback: data => {
                // 回呼函式同步刷新新增商品
                if (data) {
                    this.add(data);
                }
                console.log('Product Data:', data);
            },
        });
        // 將AddInventory作為參數傳遞
    };
    add = product => {
        const _products = [...this.state.products];
        _products.push(product);
        const _sProducts = [...this.state.sourceProducts];
        _sProducts.push(product);
        this.setState({
            products: _products,
            sourceProducts: _sProducts,
        });
    };
    update = product => {
        const _products = [...this.state.products];
        // 對到索引值去修改
        const _index = _products.findIndex(p => p.id === product.id);
        // splice方法去替換
        _products.splice(_index, 1, product); // (從哪換,換幾個,換什麼)

        const _sProducts = [...this.state.sourceProducts];
        const _sIndex = _products.findIndex(p => p.id === product.id);
        _sProducts.splice(_sIndex, 1, product);

        this.setState({
            products: _products,
            sourceProducts: _sProducts,
        });
    };
    delete = id =>{
        // 得到刪除過後的列表
        const _products = this.state.products.filter(p => p.id !== id);
        const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
        this.setState({
            products: _products,
            sourceProducts: _sProducts,
        });
    }

     // Product要調用 但是結構和 ToolBox平行 所以要用共同父層Products來傳(狀態提升)
    updateCartNum = async()=>{
        const cartNum = await this.initCartNum()
        this.setState({
            cartNum: cartNum,
        })
    }
    // 調用Restful Api拿到購物車數據
    initCartNum = async()=>{
        // 依據email過濾
        const user = global.auth.getUser() || {};
        // 除了字串拼接方式 也可以透過 param來做
        const res = await axios.get('/carts',{
            params:{
                userId: user.email
            }
        });
        const carts = res.data || []; // 如果有就拿沒有傳空陣列
        const cartNum = carts
            .map(cart => cart.mount)
            .reduce((a,value) => a + value, 0);
            // reduce()
            // 沒給初始值 a:累積值 沒設定會抓[0] value: 後面 [1] [2]... 的值
            // 給初始值 a:0  value: [0] [1]......
            return cartNum;
    }

    render() {
        return (
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum} />
                <div className="products">
                    <div className="columns is-multiline is-desktop">
                        {/* TransitionGroup會默認多渲染一個div 所以樣式會跑 要用 component={null} */}
                        <TransitionGroup component={null}>
                            {this.state.products.map(p => {
                                return (
                                    // 這邊是classNames
                                    // timeout也可以分別設 timeout={{enter:300,exit: 300}}
                                    // 每個都要有作用key一定要設
                                    <CSSTransition classNames="product-fade" timeout={300} key={p.id}>
                                        <div className="column is-3" key={p.id}>
                                            <Product
                                                product={p}
                                                update={this.update}
                                                delete={this.delete}
                                                updateCartNum={this.updateCartNum}
                                            />
                                        </div>
                                    </CSSTransition>
                                );
                            })}
                        </TransitionGroup>
                    </div>
                    {/* 直接寫裡面也可以 */}
                    {(global.auth.getUser() || []).type === 1 && (
                            <button className="button is-primary add-btn" onClick={this.toAdd}>
                                Add
                            </button>
                    )}
                </div>
            </div>
        );
    }
}
export default Products;
