import React from 'react'
import { Card } from 'antd';
import Map from "./Map.js"
import obj from "./data";
const Charts = () => {
    const option = {
        title: {
            text: 'iphone18销量',
            subtext: '看看就好',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            min: 0, //最小值
            max: 600, //最大值
            calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
            inRange: {
                color: ['#e83e5e', '#fb2a08', '#d6f628'] //颜色
            },
            textStyle: {
                color: '#ccc'
            },
            left: 'left',
            top: 'bottom',
            text: ['高', '低']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        geo:{
            show:true,
            // roam: true, //是否允许鼠标滚动放大，缩小
            // map:'china',
            label: {  //图形上的文本标签，可用于说明图形的一些数据信息
                show:true,  //是否显示文本
                color:'#CCC',  //文本颜色
            },
            itemStyle: { //地图区域的多边形 图形样式。 默认样试。
                areaColor: '#323c48', //地图区域的颜色。
                borderColor: '#111', //边框线
            },
            emphasis:{ //高亮状态下的多边形和标签样式。
                label:{ //文本
                    color: '#ADA',
                },
                itemStyle:{ //区域
                    areaColor: '#F60'
                }
            }
        },
        series: [
            {
                name: 'iphone18',
                type: 'map',
                map: 'china',
                roam: true,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: obj.dataIphone3
            },
        ]
    };
    return (
        <Card title="Echarts 地图" bordered={false}>
            <Map option={option} />
        </Card>
    )
}

export default Charts