import React, { Component } from 'react'
import { Calendar } from 'antd';
function onPanelChange(value, mode) {
    console.log(value, mode);
}
 class One extends Component {
    render() {
        return (
            <div className={`time one`}>
                <div style={{ width: 300, height: 360, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
            </div>
        )
    }
}
export default {
    component:One,
    key:1
}