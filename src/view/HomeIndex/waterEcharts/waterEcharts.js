/*eslint-disable*/
import React, { Component, Fragment } from 'react'
import { throttle } from "@/utils/index"
import echarts from 'echarts';
import 'echarts-liquidfill/src/liquidFill.js'
export default class Echarts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%'
        };
        this.chart = null;
    }
    componentDidMount() {
        let option = {
            title: [{
                text: 'CPU使用率',
                left: '20%',
                top: '90%',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'bold',
                    fontSize: '18',
                    color: '#000',
                    textAlign: 'center',
                },
            }, {
                text: '内存使用率',
                left: '50%',
                top: '90%',
                textAlign: 'center',
                textStyle: {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '18',
                    textAlign: 'center',
                },
            }, {
                text: '硬盘使用率',
                left: '80%',
                top: '90%',
                textAlign: 'center',
                textStyle: {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '18',
                    textAlign: 'center',
                },
            }],
            backgroundColor: '#fff',
            series: [{
                type: 'liquidFill',
                radius: '70%',
                color: ["#00BFFF"],
                center: ['20%', '50%'],
                data: [0.4544, 0.4544, 0.4544, 0.4544, 0.4544],
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: '#1E90FF',
                    color: '#fff',
                },
                outline: {
                    itemStyle: {
                        borderWidth: 5,
                        borderColor: '#1E90FF',
                        borderType: 'dashed',
                    }
                },
                label: {
                    normal: { //此处没有生效，本地生效
                        textStyle: {
                            fontSize: 20,
                            color: '#e6e6e6',
                        },
                    },
                },
            },
            {

                type: 'liquidFill',
                radius: '70%',
                color: ['#FF7F50'],
                center: ['50%', '50%'],
                data: [0.6, 0.6, 0.6, 0.6, 0.6],
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: '#eb5c4d',
                    color: '#fff',
                },
                outline: {
                    itemStyle: {
                        borderWidth: 5,
                        borderColor: '#eb5c4d',
                        borderType: 'dashed',
                    }
                },
                label: {
                    normal: { // 同上
                        textStyle: {
                            fontSize: 20,
                            color: '#e6e6e6',
                        },
                    },
                },

            },
            {

                type: 'liquidFill',
                radius: '70%',
                color: ['#90EE90'],
                center: ['80%', '50%'],
                data: [0.23, 0.23, 0.23, 0.23, 0.23],
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: '	#00FF00',
                    color: '#fff',
                },
                outline: {
                    itemStyle: {
                        borderWidth: 5,
                        borderColor: '	#00FF00',
                        borderType: 'dashed',
                    }
                },
                label: {
                    normal: { // 同上
                        textStyle: {
                            fontSize: 20,
                            color: '#696969',
                        },
                    },
                },

            }
            ]
        };
        this.initChart(this.refs.chart);
        this.setOption(option);
        window.addEventListener('resize', throttle(this.resize, 300));
    }
    componentWillUnmount() {
        this.dispose()
        window.removeEventListener('resize', throttle(this.resize, 500))
    }
    initChart = (ref) => {
        this.chart = echarts.init(ref);
    }
    setOption = (option) => {
        if (!this.chart) return
        this.chart.setOption(option)
    }
    resize = () => {
        this.chart && this.chart.resize();
    };
    dispose = () => {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    };
    render() {
        const { width, height } = this.state;
        return (
            <Fragment>
                <div
                    ref="chart"
                    style={{ width, height }}
                />
            </Fragment>
        )
    }
}