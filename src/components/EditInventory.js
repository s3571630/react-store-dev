import React from 'react';
import axios from '../commons/axios';
import { toast } from 'react-toastify';
class EditInventory extends React.Component {
    state = {
        id: '',
        name: '',
        price: '',
        tags: '',
        image: '',
        status: 'available',
    };
    // 回顯到Panel
    componentDidMount() {
        const { id, name, price, tags, image, status } = this.props.product;
        this.setState({
            id,
            name,
            price,
            tags,
            image,
            status,
        });
    }
    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value,
        });
        console.log(this.state.status);
    };
    submit = e => {
        e.preventDefault();
        const product = { ...this.state };
        // 修改時要用put 傳指定id 可以參考json-server官方文檔
        axios.put(`products/${this.state.id}`, product).then(res => {
            this.props.close(res.data);
            toast.success('Edit Success');
            // toast.sucess/info/warning/error
        });
        // 需要不重整同步新增商品 傳入close()從回調函式獲取數據
    };
    onDelete =()=>{
        axios.delete(`products/${this.state.id}`).then(res => {
            this.props.deleteProduct(this.state.id)
            this.props.close();
            toast.success('Delete Success');
        });
    }
    render() {
        return (
            <div className="inventory">
                <p className="title has-text-centered">Inventory</p>
                <form onSubmit={this.submit}>
                    <div className="field">
                        <div className="control">
                            <label className="label text-left">Name</label>
                            <textarea className="textarea" value={this.state.name} name="name" cols="30" rows="2" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Price</label>
                            <input type="number" className="input" name="price" value={this.state.price} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Tags</label>
                            <input type="text" className="input" name="tags" name="tags" value={this.state.tags} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Image</label>
                            <input type="text" className="input" name="image" value={this.state.image} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Status</label>
                            <div className="select is-fullwidth">
                                <select name="status" onChange={this.handleChange} value={this.state.status}>
                                    <option>available</option>
                                    <option>unavailable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            {/* 給他tpye不然會提交表單 */}
                            <button className="button is-danger" type="button" onClick={this.onDelete}>Delete</button>
                        </div>
                        <div className="control">
                            <button
                                className="button"
                                type="button"
                                onClick={() => {
                                    this.props.close();
                                }}
                            >
                                Cancel
                            </button>
                            {/* button 沒給type會提交表單 */}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default EditInventory;
