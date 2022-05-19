import anime from "animejs";
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
    const history = storage.get().history.slice(0, 14);

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
        bottom: 0,
        textStyle: {
          color: "#F6F4F2",
          fontSize: "1rem",
        },
      },
      grid: {
        containLabel: true,
        top: 5,
        left: 5,
        right: 5,
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
    anime({
      targets: this.rootElement,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInOutSine",
      begin: () => {
        this.chart = echarts.init(this.rootElement, "dark", { locale: "ZH" });
        window.addEventListener("resize", () => this.chart.resize());
        logger("Analyzes", "初始化");
        this.update();
      },
      complete() {
        logger("Analyzes", "载入模块");
      },
    });
  },
  update() {
    const newOptions = this.refresh();

    this.chart.setOption(newOptions);
    logger("Analyzes", "已更新");
  },
};

export default analyzes;
