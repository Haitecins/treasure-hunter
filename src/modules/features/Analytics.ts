import anime from "animejs";
import dayjs from "dayjs";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { querySelector } from "../../components/querySelector";
import storage from "../storage";
import logger from "../../components/logger";

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  SVGRenderer,
  UniversalTransition,
]);
const Analytics = {
  rootElement: querySelector("#analytics-module"),
  openElement: querySelector("#analytics-open-btn"),
  closeElement: querySelector("#analytics-close-btn"),
  chartElement: <HTMLElement>querySelector("#analytics-chart"),
  chart: <echarts.EChartsType>{},
  init() {
    const openHandler = () => {
      // 移除打开设置事件
      this.openElement.removeEventListener("click", openHandler);
      // 添加关闭设置事件
      this.closeElement.addEventListener("click", closeHandler);
      this.show();
    };
    const closeHandler = () => {
      // 移除关闭设置事件
      this.closeElement.removeEventListener("click", closeHandler);
      // 添加打开设置事件
      this.openElement.addEventListener("click", openHandler);
      this.hide();
    };

    logger("Analytics", "初始化");
    // 初始化绑定打开设置按钮的事件
    this.openElement.addEventListener("click", openHandler);
    // 当屏幕大小发生变化时重新调整
    window.addEventListener("resize", () => {
      // 当图表存在并且屏幕大小发生变化时，才会重新绘制图表。
      if (this.chart.id) {
        this.updateChart();
      }
    });
  },
  show() {
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 250,
      easing: "easeInOutQuad",
      begin: () => {
        logger("Analytics", "正在加载");
        this.rootElement.classList.remove("hidden");
        // 首次打开的时候初始化Chart
        if (!this.chart.id) {
          this.chart = echarts.init(this.chartElement, "dark", {
            locale: "ZH",
          });
        }
        // 更新数据
        this.updateChart();
      },
      complete() {
        logger("Analytics", "载入模块");
      },
    });
  },
  hide() {
    anime({
      targets: this.rootElement,
      opacity: [1, 0],
      duration: 250,
      easing: "easeInOutQuad",
      complete: () => {
        this.rootElement.classList.add("hidden");
        logger("Analytics", "已隐藏");
      },
    });
  },
  refresh() {
    const history = storage.get().history.slice(0, 14);

    return <EChartsOption>{
      backgroundColor: "transparent",
      textStyle: {
        fontFamily: '"en", "cn", "sans-serif"',
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(0,0,0,0.75)",
        borderColor: "#424242",
        textStyle: {
          color: "#F6F4F2",
        },
      },
      legend: {
        data: ["难度系数", "破坏字块", "铜锭获取", "铁锭获取", "金锭获取"],
        bottom: 0,
        textStyle: {
          color: "#F6F4F2",
          fontSize: "1rem",
        },
        itemGap: document.documentElement.clientWidth * 0.05,
      },
      grid: {
        containLabel: true,
        top: 10,
        left: 10,
        right: 10,
        bottom: 40,
      },
      xAxis: {
        show: false,
        boundaryGap: false,
        type: "category",
        data: history.map(({ date }) => (<
            {
              fromNow(withoutSuffix?: boolean): string;
            }
          >(<any>dayjs(date))).fromNow()),
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: "难度系数",
          type: "line",
          data: history.map(({ difficultLevels }) => difficultLevels),
          itemStyle: {
            color: "#FF4B4B",
          },
        },
        {
          name: "破坏字块",
          type: "line",
          data: history.map(({ breakChars }) => breakChars),
          itemStyle: {
            color: "#61C3FF",
          },
        },
        {
          name: "铜锭获取",
          type: "line",
          data: history.map(({ balances: { copper } }) => copper),
          itemStyle: {
            color: "#e77b55",
          },
        },
        {
          name: "铁锭获取",
          type: "line",
          data: history.map(({ balances: { iron } }) => iron),
          itemStyle: {
            color: "#fff",
          },
        },
        {
          name: "金锭获取",
          type: "line",
          data: history.map(({ balances: { gold } }) => gold),
          itemStyle: {
            color: "#fdf45f",
          },
        },
      ],
    };
  },
  updateChart() {
    const newOptions = this.refresh();

    // 更新数据
    this.chart.setOption(newOptions);
    // 重新调整大小
    this.chart.resize();
    logger("Analytics", "已更新");
  },
};

export default Analytics;
