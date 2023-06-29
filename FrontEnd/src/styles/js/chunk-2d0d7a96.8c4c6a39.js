(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-2d0d7a96"], {
        7887: function(e, o, t) {
            "use strict";
            t.d(o, "h", (function() {
                return l
            })), t.d(o, "g", (function() {
                return r
            })), t.d(o, "d", (function() {
                return n
            })), t.d(o, "j", (function() {
                return s
            })), t.d(o, "b", (function() {
                return c
            })), t.d(o, "k", (function() {
                return d
            })), t.d(o, "l", (function() {
                return h
            })), t.d(o, "q", (function() {
                return y
            })), t.d(o, "c", (function() {
                return m
            })), t.d(o, "i", (function() {
                return f
            })), t.d(o, "a", (function() {
                return b
            })), t.d(o, "n", (function() {
                return p
            })), t.d(o, "p", (function() {
                return x
            })), t.d(o, "m", (function() {
                return u
            })), t.d(o, "e", (function() {
                return w
            })), t.d(o, "o", (function() {
                return g
            })), t.d(o, "f", (function() {
                return L
            }));
            var a = function(e, o, t) {
                    e = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220], o = 500, t = [];
                    for (var a = 0; a < e.length; a++) t.push(o);
                    var i = 6;
                    myChart.on("click", (function(o) {
                        console.log(dataAxis[Math.max(o.dataIndex - i / 2, 0)]), myChart.dispatchAction({
                            type: "dataZoom",
                            startValue: dataAxis[Math.max(o.dataIndex - i / 2, 0)],
                            endValue: dataAxis[Math.min(o.dataIndex + i / 2, e.length - 1)]
                        })
                    }))
                },
                i = "#c2c6dc",
                l = {
                    color: ["#C4B5FD", " #EDE9FE", "#A78BFA", "#C4B5FD", " #EDE9FE", "#A78BFA"],
                    tooltip: {
                        show: !0,
                        backgroundColor: "rgba(0, 0, 0, .8)"
                    },
                    series: [{
                        name: "Sales by Country",
                        type: "pie",
                        radius: "50%",
                        center: "50%",
                        data: [{
                            value: 535,
                            name: "USA"
                        }, {
                            value: 310,
                            name: "Brazil"
                        }, {
                            value: 234,
                            name: "France"
                        }, {
                            value: 155,
                            name: "BD"
                        }, {
                            value: 130,
                            name: "UK"
                        }, {
                            value: 348,
                            name: "India"
                        }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }]
                },
                r = {
                    legend: {
                        borderRadius: 0,
                        orient: "horizontal",
                        x: "right",
                        data: ["Online", "Offline"]
                    },
                    grid: {
                        left: "8px",
                        right: "8px",
                        bottom: "0",
                        containLabel: !0
                    },
                    tooltip: {
                        show: !0,
                        backgroundColor: "rgba(0, 0, 0, .8)"
                    },
                    xAxis: [{
                        type: "category",
                        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                        axisTick: {
                            alignWithLabel: !0
                        },
                        splitLine: {
                            show: !1
                        },
                        axisLabel: {
                            color: i
                        },
                        axisLine: {
                            show: !0,
                            color: i,
                            lineStyle: {
                                color: i
                            }
                        }
                    }],
                    yAxis: [{
                        type: "value",
                        axisLabel: {
                            color: i,
                            formatter: "${value}"
                        },
                        axisLine: {
                            show: !1,
                            color: i,
                            lineStyle: {
                                color: i
                            }
                        },
                        min: 0,
                        max: 1e5,
                        interval: 25e3,
                        splitLine: {
                            show: !0,
                            interval: "auto"
                        }
                    }],
                    series: [{
                        name: "Online",
                        data: [35e3, 69e3, 22500, 6e4, 5e4, 5e4, 3e4, 8e4, 7e4, 6e4, 2e4, 30005],
                        label: {
                            show: !1,
                            color: "#0168c1"
                        },
                        type: "bar",
                        barGap: 0,
                        color: "#DDD6FE",
                        smooth: !0,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: -2,
                                shadowColor: "rgba(0, 0, 0, 0.3)"
                            }
                        }
                    }, {
                        name: "Offline",
                        data: [45e3, 82e3, 35e3, 93e3, 71e3, 89e3, 49e3, 91e3, 80200, 86e3, 35e3, 40050],
                        label: {
                            show: !1,
                            color: "#8B5CF6"
                        },
                        type: "bar",
                        color: "#A78BFA",
                        smooth: !0,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowOffsetY: -2,
                                shadowColor: "rgba(0, 0, 0, 0.3)"
                            }
                        }
                    }]
                },
                n = {
                    tooltip: {
                        show: !0,
                        axisPointer: {
                            type: "line",
                            animation: !0
                        }
                    },
                    grid: {
                        top: "10%",
                        left: "40",
                        right: "40",
                        bottom: "40"
                    },
                    xAxis: {
                        type: "category",
                        data: ["1/11/2018", "2/11/2018", "3/11/2018", "4/11/2018", "5/11/2018", "6/11/2018", "7/11/2018", "8/11/2018", "9/11/2018", "10/11/2018", "11/11/2018", "12/11/2018", "13/11/2018", "14/11/2018", "15/11/2018", "16/11/2018", "17/11/2018", "18/11/2018", "19/11/2018", "20/11/2018", "21/11/2018", "22/11/2018", "23/11/2018", "24/11/2018", "25/11/2018", "26/11/2018", "27/11/2018", "28/11/2018", "29/11/2018", "30/11/2018"],
                        axisLabel: {
                            color: i
                        },
                        axisLine: {
                            color: i,
                            lineStyle: {
                                color: i
                            }
                        },
                        axisTick: {
                            show: !1
                        }
                    },
                    yAxis: {
                        type: "value",
                        axisLine: {
                            show: !1
                        },
                        axisLabel: {
                            show: !0,
                            color: i
                        },
                        axisTick: {
                            show: !1
                        },
                        splitLine: {
                            show: !0
                        }
                    },
                    label: {
                        show: !1
                    },
                    series: [{
                        data: [400, 800, 325, 900, 700, 800, 400, 900, 800, 800, 300, 405, 500, 1100, 900, 1450, 1200, 1350, 1200, 1400, 1e3, 800, 950, 705, 690, 921, 1020, 903, 852, 630],
                        type: "line",
                        showSymbol: !0,
                        smooth: !0,
                        color: "#8B5CF6",
                        lineStyle: {
                            opacity: 1,
                            width: 2
                        }
                    }]
                },
                s = {
                    tooltip: {
                        trigger: "axis"
                    },
                    grid: {
                        top: "10%",
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: !0
                    },
                    xAxis: {
                        type: "category",
                        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                        boundaryGap: !1,
                        axisLabel: {
                            color: i
                        },
                        axisLine: {
                            color: i,
                            lineStyle: {
                                color: i
                            }
                        }
                    },
                    yAxis: {
                        type: "value",
                        min: 65,
                        max: 110,
                        axisLabel: {
                            color: i
                        },
                        axisLine: {
                            show: !1,
                            color: i,
                            lineStyle: {
                                color: i
                            }
                        }
                    },
                    series: [{
                        name: "Alpha",
                        data: [70, 65, 85, 75, 95, 86, 93],
                        type: "line",
                        smooth: !0,
                        symbolSize: 8,
                        lineStyle: {
                            color: "#ff5721",
                            opacity: 1,
                            width: 1.5
                        },
                        itemStyle: {
                            color: "#fff",
                            borderColor: "#ff5721",
                            borderWidth: 1.5
                        }
                    }, {
                        name: "Beta",
                        data: [80, 90, 75, 104, 75, 80, 70],
                        type: "line",
                        smooth: !0,
                        symbolSize: 8,
                        lineStyle: {
                            color: "#5f6cc1",
                            opacity: 1,
                            width: 1.5
                        },
                        itemStyle: {
                            color: "#fff",
                            borderColor: "#5f6cc1",
                            borderWidth: 1.5
                        }
                    }, {
                        name: "Gama",
                        data: [110, 95, 102, 90, 105, 95, 108],
                        type: "line",
                        smooth: !0,
                        symbolSize: 10,
                        lineStyle: {
                            color: "#4cae50",
                            opacity: 1,
                            width: 1.5
                        },
                        itemStyle: {
                            color: "#fff",
                            borderColor: "#4cae50",
                            borderWidth: 1.5
                        }
                    }]
                },
                c = {
                    grid: {
                        show: !1,
                        top: 5,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },
                    color: ["#5f6bc2"],
                    tooltip: {
                        show: !0,
                        backgroundColor: "rgba(0, 0, 0, 0.8)"
                    },
                    xAxis: [{
                        type: "category",
                        axisTick: {
                            alignWithLabel: !0
                        },
                        splitLine: {
                            show: !1
                        },
                        axisLine: {
                            show: !1
                        }
                    }],
                    yAxis: [{
                        type: "value",
                        label: {
                            show: !1
                        },
                        axisLine: {
                            show: !1
                        },
                        splitLine: {
                            show: !1
                        }
                    }],
                    series: [{
                        data: [400, 800, 325, 900, 700, 800, 400, 900, 800, 800, 300, 405, 500, 1100, 900, 1450, 1200, 1350, 1200, 1400, 1e3, 800, 950, 705, 690, 921, 1020, 903, 852, 630],
                        label: {
                            show: !1,
                            color: "#0168c1"
                        },
                        type: "bar",
                        barWidth: "70%",
                        smooth: !0
                    }]
                },
                d = {
                    grid: {
                        show: !1,
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: !0
                    },
                    legend: {
                        borderRadius: 0,
                        orient: "horizontal",
                        x: "right",
                        data: ["Online", "Offline"]
                    },
                    tooltip: {
                        show: !0,
                        backgroundColor: "rgba(0, 0, 0, 0.8)"
                    },
                    xAxis: [{
                        type: "category",
                        axisLabel: {
                            color: i
                        },
                        axisTick: {
                            alignWithLabel: !0,
                            lineStyle: {
                                color: i
                            },
                            color: "#eee"
                        },
                        splitLine: {
                            show: !1
                        },
                        axisLine: {
                            show: !0,
                            lineStyle: {
                                color: i
                            }
                        }
                    }],
                    yAxis: [{
                        type: "value",
                        axisLabel: {
                            formatter: "${value}",
                            color: i
                        },
                        min: 0,
                        max: 1e5,
                        interval: 25e3,
                        axisLine: {
                            show: !1
                        },
                        splitLine: {
                            show: !0,
                            interval: "auto"
                        },
                        axisTick: {
                            show: !1,
                            color: i
                        }
                    }],
                    series: [{
                        name: "Series 1",
                        data: [35e3, 69e3, 22500, 6e4, 5e4, 5e4, 3e4, 8e4, 7e4, 6e4, 2e4, 30005],
                        label: {
                            show: !1,
                            color: "#0168c1"
                        },
                        type: "bar",
                        barGap: 0,
                        smooth: !0
                    }, {
                        name: "Series 2",
                        data: [45e3, 82e3, 35e3, 93e3, 71e3, 89e3, 49e3, 91e3, 80200, 86e3, 35e3, 40050],
                        label: {
                            show: !1,
                            color: "#0168c1"
                        },
                        type: "bar",
                        smooth: !0
                    }]
                },
                h = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow"
                        }
                    },
                    grid: {
                        top: "8%",
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: !0
                    },
                    yAxis: {
                        type: "value",
                        min: 0,
                        max: 500,
                        interval: 100,
                        axisLabel: {
                            formatter: "{value}k",
                            color: i,
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: 400
                        },
                        axisLine: {
                            show: !1,
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        axisTick: {
                            show: !1,
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#ddd",
                                width: 1,
                                opacity: .5
                            }
                        }
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: !0,
                        data: ["Dec, 1", "Dec, 2", "Dec, 3", "Dec, 4", "Dec, 5", "Dec, 6", "Dec, 7"],
                        axisLabel: {
                            formatter: "{value}",
                            color: i,
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: 400
                        },
                        axisLine: {
                            show: !1,
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        axisTick: {
                            show: !1,
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        splitLine: {
                            show: !1,
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        }
                    },
                    series: [{
                        color: "#3182bd",
                        name: "Campaign",
                        type: "bar",
                        barGap: 0,
                        label: {
                            normal: {
                                show: !1,
                                position: "insideBottom",
                                distance: 5,
                                align: "left",
                                verticalAlign: "middle",
                                rotate: 90,
                                formatter: "{c}  {name|{a}}",
                                fontSize: 14,
                                fontWeight: "bold",
                                rich: {
                                    name: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                        data: [320, 332, 301, 334, 390, 350, 215]
                    }, {
                        color: "#74c475",
                        name: "Steppe",
                        type: "bar",
                        label: {
                            normal: {
                                show: !1,
                                position: "insideBottom",
                                distance: 5,
                                align: "left",
                                verticalAlign: "middle",
                                rotate: 90,
                                formatter: "{c}  {name|{a}}",
                                fontSize: 14,
                                fontWeight: "bold",
                                rich: {
                                    name: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                        data: [220, 182, 191, 234, 290, 190, 210]
                    }, {
                        color: "#e6550d",
                        name: "Desert",
                        type: "bar",
                        label: {
                            normal: {
                                show: !1,
                                position: "insideBottom",
                                distance: 5,
                                align: "left",
                                verticalAlign: "middle",
                                rotate: 90,
                                formatter: "{c}  {name|{a}}",
                                fontSize: 14,
                                fontWeight: "bold",
                                rich: {
                                    name: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                        data: [150, 232, 201, 154, 190, 150, 130]
                    }, {
                        color: "#756bb1",
                        name: "Wetland",
                        type: "bar",
                        label: {
                            normal: {
                                show: !1,
                                position: "insideBottom",
                                distance: 5,
                                align: "left",
                                verticalAlign: "middle",
                                rotate: 90,
                                formatter: "{c}  {name|{a}}",
                                fontSize: 14,
                                fontWeight: "bold",
                                rich: {
                                    name: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                        data: [98, 77, 101, 99, 40, 30, 50]
                    }]
                },
                y = {
                    title: {
                        text: "特性示例：渐变色 阴影 点击缩放",
                        subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom"
                    },
                    xAxis: {
                        data: ["点", "击", "柱", "子", "或", "者", "两", "指", "在", "触", "屏", "上", "滑", "动", "能", "够", "自", "动", "缩", "放"],
                        axisLabel: {
                            inside: !0,
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        axisTick: {
                            show: !1
                        },
                        axisLine: {
                            show: !1
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: !1
                        },
                        axisTick: {
                            show: !1
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#999"
                            }
                        }
                    },
                    dataZoom: [{
                        type: "inside"
                    }],
                    series: [{
                        type: "bar",
                        itemStyle: {
                            normal: {
                                color: "rgba(0,0,0,0.05)"
                            }
                        },
                        barGap: "-100%",
                        barCategoryGap: "40%",
                        data: a.dataShadow,
                        animation: !1
                    }, {
                        type: "bar",
                        data: S
                    }]
                },
                m = {
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: !0
                    },
                    color: ["#c13018", "#f36e12", "#ebcb37", "#a1b968", "#0d94bc", "#135bba"],
                    tooltip: {
                        show: !1,
                        trigger: "item",
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    xAxis: [{
                        axisLine: {
                            show: !1
                        },
                        splitLine: {
                            show: !1
                        }
                    }],
                    yAxis: [{
                        axisLine: {
                            show: !1
                        },
                        splitLine: {
                            show: !1
                        }
                    }],
                    series: [{
                        name: "Sessions",
                        type: "pie",
                        radius: ["80%", "50%"],
                        center: ["50%", "50%"],
                        avoidLabelOverlap: !1,
                        hoverOffset: 5,
                        label: {
                            normal: {
                                show: !1,
                                position: "center",
                                textStyle: {
                                    fontSize: "13",
                                    fontWeight: "normal"
                                },
                                formatter: "{a}"
                            },
                            emphasis: {
                                show: !0,
                                textStyle: {
                                    fontSize: "15",
                                    fontWeight: "bold"
                                },
                                formatter: "{b} \n{c} ({d}%)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: !1
                            }
                        },
                        data: [{
                            value: 335,
                            name: "Organic"
                        }, {
                            value: 310,
                            name: "Search Eng."
                        }, {
                            value: 234,
                            name: "Email"
                        }, {
                            value: 135,
                            name: "Referal"
                        }, {
                            value: 148,
                            name: "Social"
                        }, {
                            value: 548,
                            name: "Others"
                        }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }]
                },
                f = {
                    tooltip: {
                        formatter: "{a} <br/>{b} : {c}%"
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [{
                        name: "业务指标",
                        type: "gauge",
                        detail: {
                            formatter: "{value}%"
                        },
                        data: [{
                            value: 50,
                            name: "完成率"
                        }]
                    }]
                },
                b = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            animation: !0
                        }
                    },
                    grid: {
                        left: "4%",
                        top: "4%",
                        right: "3%",
                        bottom: "10%"
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: !1,
                        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                        axisLabel: {
                            formatter: "{value}",
                            color: i,
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: 400
                        },
                        axisLine: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        splitLine: {
                            show: !1,
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        }
                    },
                    yAxis: {
                        type: "value",
                        min: 0,
                        max: 200,
                        interval: 50,
                        axisLabel: {
                            formatter: "{value}k",
                            color: i,
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: 400
                        },
                        axisLine: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#ddd",
                                width: 1,
                                opacity: .5
                            }
                        }
                    },
                    series: [{
                        name: "Visit",
                        type: "line",
                        smooth: !0,
                        data: [140, 135, 95, 115, 95, 126, 93, 145, 115, 140, 135, 95, 115, 95, 126, 125, 145, 115, 140, 135, 95, 115, 95, 126, 93, 145, 115, 140, 135, 95],
                        symbolSize: 8,
                        showSymbol: !1,
                        lineStyle: {
                            color: "rgb(255, 87, 33)",
                            opacity: 1,
                            width: 1.5
                        },
                        itemStyle: {
                            show: !1,
                            color: "#ff5721",
                            borderColor: "#ff5721",
                            borderWidth: 1.5
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(255, 87, 33, 1)"
                                    }, {
                                        offset: .3,
                                        color: "rgba(255, 87, 33, 0.7)"
                                    }, {
                                        offset: 1,
                                        color: "rgba(255, 87, 33, 0)"
                                    }]
                                }
                            }
                        }
                    }]
                },
                p = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            animation: !0
                        }
                    },
                    grid: {
                        left: "4%",
                        top: "4%",
                        right: "3%",
                        bottom: "10%"
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: !1,
                        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                        axisLabel: {
                            formatter: "{value}",
                            color: i,
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: 400
                        },
                        axisLine: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        splitLine: {
                            show: !1,
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        }
                    },
                    yAxis: {
                        type: "value",
                        min: 0,
                        max: 200,
                        interval: 50,
                        axisLabel: {
                            formatter: "{value}k",
                            color: i,
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: 400
                        },
                        axisLine: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#ddd",
                                width: 1,
                                opacity: .5
                            }
                        }
                    },
                    series: [{
                        name: "Visit",
                        type: "line",
                        smooth: !0,
                        data: [140, 135, 95, 115, 95, 126, 93, 145, 115, 140, 135, 95, 115, 95, 126, 125, 145, 115, 140, 135, 95, 115, 95, 126, 93, 145, 115, 140, 135, 95],
                        symbolSize: 8,
                        showSymbol: !1,
                        lineStyle: {
                            color: "rgb(255, 87, 33)",
                            opacity: 1,
                            width: 1.5
                        },
                        itemStyle: {
                            show: !1,
                            color: "#ff5721",
                            borderColor: "#ff5721",
                            borderWidth: 1.5
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(255, 87, 33, 1)"
                                    }, {
                                        offset: .3,
                                        color: "rgba(255, 87, 33, 0.7)"
                                    }, {
                                        offset: 1,
                                        color: "rgba(255, 87, 33, 0)"
                                    }]
                                }
                            }
                        }
                    }, {
                        name: "Sales",
                        type: "line",
                        smooth: !0,
                        data: [50, 70, 65, 84, 75, 80, 70, 50, 70, 65, 104, 75, 80, 70, 50, 70, 65, 94, 75, 80, 70, 50, 70, 65, 86, 75, 80, 70, 50, 70],
                        symbolSize: 8,
                        showSymbol: !1,
                        lineStyle: {
                            color: "rgb(95, 107, 194)",
                            opacity: 1,
                            width: 1.5
                        },
                        itemStyle: {
                            color: "#5f6cc1",
                            borderColor: "#5f6cc1",
                            borderWidth: 1.5
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(95, 107, 194, 1)"
                                    }, {
                                        offset: .5,
                                        color: "rgba(95, 107, 194, 0.7)"
                                    }, {
                                        offset: 1,
                                        color: "rgba(95, 107, 194, 0)"
                                    }]
                                }
                            }
                        }
                    }]
                },
                x = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            animation: !0
                        }
                    },
                    grid: {
                        left: "4%",
                        top: "4%",
                        right: "3%",
                        bottom: "10%"
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: !1,
                        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
                        axisLabel: {
                            formatter: "{value}",
                            color: i,
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: 400
                        },
                        axisLine: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        splitLine: {
                            show: !1,
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        }
                    },
                    yAxis: {
                        type: "value",
                        min: 0,
                        max: 200,
                        interval: 50,
                        axisLabel: {
                            formatter: "{value}k",
                            color: i,
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: 400
                        },
                        axisLine: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: i,
                                width: 1
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#ddd",
                                width: 1,
                                opacity: .5
                            }
                        }
                    },
                    series: [{
                        name: "Impression",
                        type: "line",
                        smooth: !0,
                        data: [140, 135, 95, 115, 95, 126, 93, 145, 115, 140, 135, 95, 115, 95, 126, 125, 145, 115, 140, 135, 95, 115, 95, 126, 93, 145, 115, 140, 135, 95],
                        symbolSize: 8,
                        lineStyle: {
                            color: "rgb(255, 87, 33)",
                            opacity: 1,
                            width: 1.5
                        },
                        itemStyle: {
                            color: "#ff5721",
                            borderColor: "#ff5721",
                            borderWidth: 1.5
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(255, 87, 33, 1)"
                                    }, {
                                        offset: .3,
                                        color: "rgba(255, 87, 33, 0.7)"
                                    }, {
                                        offset: 1,
                                        color: "rgba(255, 87, 33, 0)"
                                    }]
                                }
                            }
                        }
                    }, {
                        name: "Clicks",
                        type: "line",
                        smooth: !0,
                        data: [50, 70, 65, 84, 75, 80, 70, 50, 70, 65, 104, 75, 80, 70, 50, 70, 65, 94, 75, 80, 70, 50, 70, 65, 86, 75, 80, 70, 50, 70],
                        symbolSize: 8,
                        lineStyle: {
                            color: "rgb(95, 107, 194)",
                            opacity: 1,
                            width: 1.5
                        },
                        itemStyle: {
                            color: "#5f6cc1",
                            borderColor: "#5f6cc1",
                            borderWidth: 1.5
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(95, 107, 194, 1)"
                                    }, {
                                        offset: .5,
                                        color: "rgba(95, 107, 194, 0.7)"
                                    }, {
                                        offset: 1,
                                        color: "rgba(95, 107, 194, 0)"
                                    }]
                                }
                            }
                        }
                    }]
                },
                u = {
                    tooltip: {
                        show: !0,
                        trigger: "axis"
                    },
                    grid: {
                        top: "3%",
                        left: "1%",
                        right: "1%",
                        bottom: "3%"
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: !1,
                        data: ["1 Dec", "2 Dec", "3 Dec", "4 Dec", "5 Dec", "6 Dec", "7 Dec", "8 Dec", "9 Dec", "10 Dec", "11 Dec", "12 Dec", "13 Dec", "14 Dec", "15 Dec", "16 Dec", "17 Dec", "18 Dec", "19 Dec", "20 Dec", "21 Dec", "22 Dec", "23 Dec", "24 Dec", "25 Dec", "26 Dec", "27 Dec", "28 Dec", "29 Dec", "30 Dec", "31 Dec"],
                        axisLabel: {
                            show: !0,
                            color: "#8B5CF6",
                            interval: 5,
                            inside: !1,
                            align: "center"
                        },
                        axisLine: {
                            color: "#999",
                            lineStyle: {
                                color: "#999"
                            }
                        },
                        axisTick: {
                            interval: 0,
                            lineStyle: {
                                color: "#999"
                            }
                        }
                    },
                    yAxis: {
                        type: "value",
                        min: 0,
                        max: 7,
                        interval: 5,
                        axisLabel: {
                            show: !1
                        },
                        axisLine: {
                            show: !1
                        },
                        axisTick: {
                            show: !1
                        },
                        splitLine: {
                            show: !1
                        }
                    },
                    series: [{
                        type: "line",
                        data: [3, 2, 3, 2, 3, 2, 3, 2, 1, 2, 1, 2, 1, 3, 1, 3, 1, 2, 1, 2, 3, 1, 2, 3, 2, 1, 2, 3, 1, 2, 4],
                        smooth: !0,
                        showSymbol: !1,
                        itemStyle: {
                            borderColor: "#8B5CF6",
                            color: ["#8B5CF6"]
                        },
                        lineStyle: {
                            opacity: 1,
                            width: 1,
                            color: ["#8B5CF6"]
                        },
                        areaStyle: {
                            opacity: 1,
                            color: ["#8B5CF6"]
                        }
                    }]
                },
                w = {
                    color: ["#c13018", "#f36d12", "#ebcb37", "#a0b967", "#0d94bc", "#04a9f4"],
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: !0
                    },
                    xAxis: [{
                        axisLine: {
                            show: !1
                        },
                        splitLine: {
                            show: !1
                        }
                    }],
                    yAxis: [{
                        axisLine: {
                            show: !1
                        },
                        splitLine: {
                            show: !1
                        }
                    }],
                    series: [{
                        name: "Sales by Countries",
                        type: "pie",
                        radius: "50%",
                        center: "50%",
                        data: [{
                            value: 335,
                            name: "USA"
                        }, {
                            value: 310,
                            name: "BD"
                        }, {
                            value: 234,
                            name: "China"
                        }, {
                            value: 135,
                            name: "UK"
                        }, {
                            value: 148,
                            name: "Span"
                        }, {
                            value: 548,
                            name: "Iran"
                        }],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }]
                },
                g = {
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: !0
                    },
                    color: ["#8B5CF6", "#63845", "#ebcb37", "#a1b968", "#0d94bc", "#135bba"],
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    visualMap: {
                        show: !1,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [{
                        name: "Source",
                        type: "pie",
                        radius: "50%",
                        center: "50%",
                        data: [{
                            value: 335,
                            name: "Direct "
                        }, {
                            value: 310,
                            name: "Email "
                        }, {
                            value: 274,
                            name: " Referal"
                        }, {
                            value: 235,
                            name: " Ads"
                        }, {
                            value: 400,
                            name: "Search "
                        }].sort((function(e, o) {
                            return e.value - o.value
                        })),
                        roseType: "radius",
                        label: {
                            normal: {
                                textStyle: {
                                    color: i
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: "#333"
                                },
                                smooth: .2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#8B5CF6",
                                shadowBlur: 200,
                                shadowColor: "rgba(0, 0, 0, 0.0)"
                            }
                        },
                        animationType: "scale",
                        animationEasing: "elasticOut",
                        animationDelay: function(e) {
                            return 200 * Math.random()
                        }
                    }]
                },
                S = [
                    [
                        [28604, 77, 17096869, "Australia", 1990],
                        [31163, 77.4, 27662440, "Canada", 1990],
                        [1516, 68, 1154605773, "China", 1990],
                        [13670, 74.7, 10582082, "Cuba", 1990],
                        [28599, 75, 4986705, "Finland", 1990],
                        [29476, 77.1, 56943299, "France", 1990],
                        [31476, 75.4, 78958237, "Germany", 1990],
                        [28666, 78.1, 254830, "Iceland", 1990],
                        [1777, 57.7, 870601776, "India", 1990],
                        [29550, 79.1, 122249285, "Japan", 1990],
                        [2076, 67.9, 20194354, "North Korea", 1990],
                        [12087, 72, 42972254, "South Korea", 1990],
                        [24021, 75.4, 3397534, "New Zealand", 1990],
                        [43296, 76.8, 4240375, "Norway", 1990],
                        [10088, 70.8, 38195258, "Poland", 1990],
                        [19349, 69.6, 147568552, "Russia", 1990],
                        [10670, 67.3, 53994605, "Turkey", 1990],
                        [26424, 75.7, 57110117, "United Kingdom", 1990],
                        [37062, 75.4, 252847810, "United States", 1990]
                    ],
                    [
                        [44056, 81.8, 23968973, "Australia", 2015],
                        [43294, 81.7, 35939927, "Canada", 2015],
                        [13334, 76.9, 1376048943, "China", 2015],
                        [21291, 78.5, 11389562, "Cuba", 2015],
                        [38923, 80.8, 5503457, "Finland", 2015],
                        [37599, 81.9, 64395345, "France", 2015],
                        [44053, 81.1, 80688545, "Germany", 2015],
                        [42182, 82.8, 329425, "Iceland", 2015],
                        [5903, 66.8, 1311050527, "India", 2015],
                        [36162, 83.5, 126573481, "Japan", 2015],
                        [1390, 71.4, 25155317, "North Korea", 2015],
                        [34644, 80.7, 50293439, "South Korea", 2015],
                        [34186, 80.6, 4528526, "New Zealand", 2015],
                        [64304, 81.6, 5210967, "Norway", 2015],
                        [24787, 77.3, 38611794, "Poland", 2015],
                        [23038, 73.13, 143456918, "Russia", 2015],
                        [19360, 76.5, 78665830, "Turkey", 2015],
                        [38225, 81.4, 64715810, "United Kingdom", 2015],
                        [53354, 79.1, 321773631, "United States", 2015]
                    ]
                ],
                L = {}
        }
    }
]);