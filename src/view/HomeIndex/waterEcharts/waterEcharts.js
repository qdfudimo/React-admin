/*eslint-disable*/
import React, { Component, Fragment } from 'react'
import { throttle } from "@/utils/index"
import echarts from 'echarts';
import 'echarts-liquidfill/src/liquidFill.js';
export default class Echarts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%',
            height: '100%',
            data1: [0.83, 0.83, 0.832, 0.83, 0.83],
            data2: [0.564, 0.564, 0.564, 0.564, 0.564],
            data3: [0.23, 0.23, 0.23, 0.23, 0.23]
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
            backgroundColor: 'transparent',
            series: [{
                type: 'liquidFill',
                radius: '70%',
                color: [...this.colors(this.state.data1[0])],
                center: ['20%', '50%'],
                data: this.state.data1,
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: this.colors(this.state.data1[0])[0],
                    color: '#fff',
                },
                outline: {
                    itemStyle: {
                        borderWidth: 5,
                        borderColor: this.colors(this.state.data1[0])[0],
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
                color: [...this.colors(this.state.data2[0])],
                center: ['50%', '50%'],
                data: this.state.data2,
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: this.colors(this.state.data2[0])[0],
                    color: '#fff',
                },
                outline: {
                    itemStyle: {
                        borderWidth: 5,
                        borderColor: this.colors(this.state.data2[0])[0],
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
                color: [...this.colors(this.state.data3[0])],
                center: ['80%', '50%'],
                data: this.state.data3,
                backgroundStyle: {
                    borderWidth: 2,
                    borderColor: this.colors(this.state.data3[0])[0],
                    color: '#fff',
                },
                outline: {
                    itemStyle: {
                        borderWidth: 5,
                        borderColor: this.colors(this.state.data3[0])[0],
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
    // componentDidUpdate() {
    //     this.setOption(option);
    // }
    colors = (data) => {
        let colorScore = data * 100;
        let colorList = [];
        if (colorScore < 50) {
            let color1 = "rgb(45,224,1135)";
            let color2 = "rgb(74,227,141)";
            colorList.push(color1);
            colorList.push(color2);
        } else if (colorScore >= 50 && colorScore < 80) {
            let color1 = "rgb(41,145,235)";
            let color2 = "rgb(0,137,255)";
            colorList.push(color1);
            colorList.push(color2);
        } else if (colorScore >= 80) {
            let color1 = "rgb(207,74,84)";
            let color2 = "rgb(243,17,34)";
            colorList.push(color1);
            colorList.push(color2);
        }
        return colorList
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