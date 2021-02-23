// 1. 一次渲染 隨需調用
// 2. 裝載組件
//  (1)子組件作為參數傳遞並渲染
//  (2)子組件可以關閉彈出層
//  (3)子組件與使用者可以通訊
import React from 'react';
import { render } from 'react-dom';
class Panel extends React.Component {
    state = {
        active: false,
        component: null,
        callback: () => {},
    };
    close = data => {
        this.setState({
            active: false,
        });
        this.state.callback(data);
    };
    open = (
        options = {
            props: {},
            component: null,
            callback: () => {},
        }
    ) => {
        // 將傳遞的參數解構出來
        const { props, component, callback } = options;
        const _key = new Date().getTime();

        // 因為拿到的是個方法不是組件 要create出來
        // 給隨機key讓每次渲染都不一樣
        const _component = React.createElement(component, { ...props, close: this.close, key: _key });
        this.setState({
            active: true,
            component: _component,
            callback: callback,
        });
    };
    render() {
        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper',
        };
        return (
            <div className={_class[this.state.active]}>
                {/* 要讓close點擊不傳任何值 用箭頭函式傳空值 */}
                <div
                    className="over-layer"
                    onClick={() => {
                        this.close();
                    }}
                ></div>
                <div className="panel">
                    <div className="head">
                        <span
                            className="close"
                            onClick={() => {
                                this.close();
                            }}
                        >
                            x
                        </span>
                        <p className="has-text-centered">{this.state.component}</p>
                    </div>
                </div>
            </div>
        );
    }
}
const _div = document.createElement('div');
document.body.append(_div);
// _panel 接收render返回的實例對象
const _panel = render(<Panel />, _div);
export default _panel;
