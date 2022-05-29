import dayjs from "dayjs";
import * as echarts from "echarts/core";
import {
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
import { querySelector } from "@/components/querySelector";
import storage from "../storage";
import logger from "@/components/logger";
import moduleToggle from "@/components/moduleToggle";
import { hideModule, showModule } from "@/components/moduleDisplay";

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

type RelativeTimeOptions = {
  fromNow(withoutSuffix?: boolean): string;
};

echarts.use([
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
    moduleToggle(
      {
        open: this.openElement,
        close: this.closeElement,
      },
      () => this.show(),
      () => this.hide()
    );
    logger("Analytics", "初始化");
    // 当屏幕大小发生变化时重新调整
    window.addEventListener("resize", () => {
      // 当图表存在并且屏幕大小发生变化时，才会重新绘制图表。
      if (this.chart.id) {
        this.updateChart();
      }
    });
  },
  show() {
    const loadChart = () => {
      // 首次打开的时候初始化Chart
      if (!this.chart.id) {
        this.chart = echarts.init(this.chartElement, "dark", { locale: "ZH" });
      }
      // 更新数据
      this.updateChart();
    };

    // 显示模块
    showModule(this.rootElement, "Analytics", {
      begin: loadChart,
    });
  },
  hide() {
    // 隐藏模块
    hideModule(this.rootElement, "Analytics");
  },
  refresh() {
    const history = storage.get().history.slice(0, 14);

    return <EChartsOption>{
      backgroundColor: "transparent",
      textStyle: {
        fontSize: "1rem",
        fontFamily: '"en", "cn", "sans-serif"',
      },
      tooltip: {
        trigger: "axis",
        borderColor: "#424242",
        backgroundColor: "rgba(0,0,0,0.65)",
        textStyle: {
          color: "#F6F4F2",
        },
      },
      legend: {
        data: ["难度系数", "破坏字块", "铜锭获取", "铁锭获取", "金锭获取"],
        bottom: 0,
        textStyle: {
          color: "#F6F4F2",
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
        data: history.map(({ date }) =>
          (<RelativeTimeOptions>(<never>dayjs(date))).fromNow()
        ),
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
