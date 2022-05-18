import { querySelector } from "../components/querySelector";
import storage from "./storage";
import dayjs from "dayjs";
import logger from "../components/logger";
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
const analyzes = {
  rootElement: <HTMLElement>querySelector("#data-analyze"),
  chart: <echarts.EChartsType>{},
  refresh() {
    logger("Analyzes", "刷新数据");
    const history = storage.get().history.slice(0, 10);

    return <EChartsOption>{
      backgroundColor: "transparent",
      textStyle: {
        fontFamily: '"en", "cn", "sans-serif"',
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["难度系数", "破坏字块", "铜锭获取", "铁锭获取", "金锭获取"],
        top: 10,
        textStyle: {
          color: "#F6F4F2",
          fontSize: "1rem",
        },
        itemStyle: {},
      },
      grid: {
        top: 50,
        left: "3%",
        right: "3%",
        bottom: 10,
        containLabel: true,
      },
      xAxis: {
        boundaryGap: false,
        type: "category",
        data: history.map(({ date }) => dayjs(date).fromNow()),
        axisLine: {
          lineStyle: {
            color: "#F6F4F2",
          },
        },
        axisLabel: {
          color: "#F6F4F2",
          fontSize: "1rem",
          fontFamily: '"en", "cn", "sans-serif"',
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "#F6F4F2",
            opacity: 0.25,
          },
        },
      },
      series: [
        {
          name: "难度系数",
          type: "line",
          data: history.map(({ difficultLevels }) => difficultLevels),
        },
        {
          name: "破坏字块",
          type: "line",
          data: history.map(({ breakChars }) => breakChars),
        },
        {
          name: "铜锭获取",
          type: "line",
          data: history.map(({ balances: { copper } }) => copper),
        },
        {
          name: "铁锭获取",
          type: "line",
          data: history.map(({ balances: { iron } }) => iron),
        },
        {
          name: "金锭获取",
          type: "line",
          data: history.map(({ balances: { gold } }) => gold),
        },
      ],
    };
  },
  init() {
    this.chart = echarts.init(this.rootElement, "dark", { locale: "ZH" });
    window.addEventListener("resize", () => this.chart.resize());
    logger("Analyzes", "初始化");
    this.update();
  },
  update() {
    this.chart.setOption(this.refresh());
    logger("Analyzes", "已更新");
  },
};

export default analyzes;
