/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react'
import { throttle } from "@/utils/index"
import echarts from 'echarts';
import china from 'echarts/map/js/china.js'
const Map = (props) => {
    const [chart, setChart] = useState(null)
    const maps = useRef();
    const initChart = (ref) => {
        setChart(echarts.init(ref))
    }
    const setOption = (option) => {
        if (!chart) return
        chart.setOption(option)
    }
    const resize = () => {
        chart && chart.resize();
    };
    const dispose = () => {
        if (!chart) {
            return;
        }
        chart.dispose();
        setChart(null)
    };
    useEffect(() => {
        initChart(maps.current)
        setOption(props.option)
        window.addEventListener('resize', throttle(resize, 100));
        return () => {
            dispose()
            window.removeEventListener('resize', throttle(resize, 100))
        }
    })
    return (
        <div
            ref={maps}
            style={{ width: "100%", height: "70vh" }}
        />
    )
}

export default Map