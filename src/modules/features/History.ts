import dayjs from "dayjs";
import * as echarts from "echarts/core";
import {
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import { LineChart, LineSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import { querySelector } from "@/components/selector";
import cache from "@/conf/cache";
import { Difficult } from "@/modules/features";
import storage from "../storage";
import logger from "@/components/logger";
import switcher from "@/components/switcher";
import { hideModule, showModule } from "@/components/displaying";

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  SVGRenderer,
  UniversalTransition,
]);
const History: HistoryModuleProps = {
  rootElement: querySelector("#history-module"),
  openElement: querySelector("#history-open-btn"),
  closeElement: querySelector("#history-close-btn"),
  chartElement: <HTMLElement>querySelector("#history-chart"),
  chart: <echarts.EChartsType>{},
  init() {
    switcher(
      {
        open: this.openElement,
        close: this.closeElement,
      },
      () => this.show(),
      () => this.hide()
    );
    logger("History", "初始化");
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
    showModule(this.rootElement, "History", {
      begin: loadChart,
    });
  },
  hide() {
    // 隐藏模块
    hideModule(this.rootElement, "History");
  },
  refresh() {
    const latestHistory = storage.get().history.slice(0, 10);

    return {
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
        itemGap: this.rootElement.clientWidth * 0.05,
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
        data: latestHistory.map(({ date }) =>
          (<HistoryRelativeTimeOptions>(<never>dayjs(date))).fromNow()
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
          data: latestHistory.map(({ difficultLevels }) => difficultLevels),
          itemStyle: {
            color: "#FF4B4B",
          },
        },
        {
          name: "破坏字块",
          type: "line",
          data: latestHistory.map(({ breakChars }) => breakChars),
          itemStyle: {
            color: "#61C3FF",
          },
        },
        {
          name: "铜锭获取",
          type: "line",
          data: latestHistory.map(({ balances: { copper } }) => copper),
          itemStyle: {
            color: "#e77b55",
          },
        },
        {
          name: "铁锭获取",
          type: "line",
          data: latestHistory.map(({ balances: { iron } }) => iron),
          itemStyle: {
            color: "#fff",
          },
        },
        {
          name: "金锭获取",
          type: "line",
          data: latestHistory.map(({ balances: { gold } }) => gold),
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
    logger("History", "已更新");
  },
  addHistory() {
    console.group("History Module Event");
    logger("History", "已增加一条历史记录");
    storage.save((data) => {
      const {
        props: {
          breakChars,
          copperCount: copper,
          ironCount: iron,
          goldCount: gold,
        },
      } = cache;

      data.history = [
        {
          date: new Date().getTime(),
          difficultLevels: Difficult.levels(),
          breakChars,
          balances: { copper, iron, gold },
        },
        ...data.history,
      ];
      // 设置历史记录上限，超过自动删除。
      if (data.history.length > 30) data.history.length = 30;
    });
    console.groupEnd();
  },
};

type HistoryModuleProps = {
  readonly rootElement: Element;
  readonly openElement: Element;
  readonly closeElement: Element;
  readonly chartElement: HTMLElement;
  chart: echarts.EChartsType;
  init(): void;
  show(): void;
  hide(): void;
  refresh(): HistoryEChartsOption;
  updateChart(): void;
  addHistory(): void;
};

type HistoryEChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

type HistoryRelativeTimeOptions = {
  fromNow(withoutSuffix?: boolean): string;
};

export default History;
export { HistoryEChartsOption, HistoryRelativeTimeOptions, HistoryModuleProps };
