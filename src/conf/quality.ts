import cache from "./cache";
import colors from "../utils/colors";
import anime from "animejs";
import { Entity } from "../modules/entities";

const quality = {
  get(): [string[], () => void] {
    let qualityColor: string[];
    let activeHandler: Entity["activeAward"];
    const { provides } = cache;
    const [common, rare, epic, legendary, omega, unique] = colors.list;
    const chance = (x: number) => anime.random(0, 100) <= x;

    if (chance(5)) {
      qualityColor = unique;
      activeHandler = () => {
        provides.COPPER_COUNT += 5;
        provides.IRON_COUNT += 4;
        provides.GOLD_COUNT += 1;
      };
    } else if (chance(10)) {
      qualityColor = omega;
      activeHandler = () => {
        provides.COPPER_COUNT += anime.random(4, 5);
        provides.IRON_COUNT += anime.random(2, 3);
        provides.GOLD_COUNT += anime.random(0, 1);
      };
    } else if (chance(15)) {
      qualityColor = legendary;
      activeHandler = () => {
        provides.COPPER_COUNT += anime.random(3, 4);
        provides.IRON_COUNT += anime.random(1, 2);
      };
    } else if (chance(15)) {
      qualityColor = epic;
      activeHandler = () => {
        provides.COPPER_COUNT += anime.random(2, 3);
        provides.IRON_COUNT += anime.random(0, 1);
      };
    } else if (chance(15)) {
      qualityColor = rare;
      activeHandler = () => {
        provides.COPPER_COUNT += anime.random(1, 2);
      };
    } else {
      qualityColor = common;
      activeHandler = () => {
        provides.COPPER_COUNT += 1;
      };
    }

    return [qualityColor, activeHandler];
  },
};

export default quality;
