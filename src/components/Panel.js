// 一次渲染，随需调用
// 装载组件
// 1.子组件（AddInnventory)作为参数传递并被渲染
// 2.子组件可以关闭弹出层(panel)
// 3.子组件与调用者(products)可以通讯

import React from "react";
import { render } from 'react-dom';

class Panel extends React.Component {

    state = {
        active: false, 
        component: null,
        callback: () => {}
    };

    open = (options = {
        props: {},
        component: null
    }) => {
        const { component, callback, props } = options;
        const _key = new Date().getTime();
        const _component =React.createElement(component, { ...props, close: this.close, key: _key });
        this.setState({
            active: true,
            component: _component,
            callback: callback
        });
    };

    close = (data) => {
        this.setState({
            active: false
        });
        this.state.callback(data);
    };

    render() {
        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
        }
        return(
            <div className={_class[this.state.active]}>
                <div className="over-layer" onClick={() => {this.close()}}></div>
                <div className="panel">
                    <div className="head">
                        <span className="close" onClick={() => {this.close()}}>x</span>
                        <div className="has-text-centered">
                            {this.state.component}
                        </div>
                    </div>
                </div>     
            </div>
        );
    }
}

const _div = document.createElement('div');
document.body.appendChild(_div);

const _Panel = render(<Panel />, _div);

console.log(_Panel);

export default _Panel;