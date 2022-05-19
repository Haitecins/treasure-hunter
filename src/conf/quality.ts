import anime from "animejs";
import colors from "../utils/colors";
import { Entity } from "../modules/entities";
import cache from "./cache";

const { provides } = cache;
const quality = {
  list: {
    unique: {
      bonus() {
        provides.COPPER_COUNT += 5;
        provides.IRON_COUNT += 4;
        provides.GOLD_COUNT += 1;
      },
    },
    omega: {
      bonus() {
        provides.COPPER_COUNT += anime.random(4, 5);
        provides.IRON_COUNT += anime.random(2, 3);
        provides.GOLD_COUNT += anime.random(0, 1);
      },
    },
    legendary: {
      bonus() {
        provides.COPPER_COUNT += anime.random(3, 4);
        provides.IRON_COUNT += anime.random(1, 2);
      },
    },
    epic: {
      bonus() {
        provides.COPPER_COUNT += anime.random(2, 3);
        provides.IRON_COUNT += anime.random(0, 1);
      },
    },
    rare: {
      bonus() {
        provides.COPPER_COUNT += anime.random(1, 2);
      },
    },
    common: {
      bonus() {
        provides.COPPER_COUNT += 1;
      },
    },
  },
  get(): [string[], () => void] {
    let qualityColor: string[];
    let bonus: Entity["activeAward"];
    const [common, rare, epic, legendary, omega, unique] = colors.list;
    const chance = (x: number) => anime.random(0, 100) <= x;

    if (chance(10)) {
      qualityColor = unique;
      bonus = this.list.unique.bonus;
    } else if (chance(10)) {
      qualityColor = omega;
      bonus = this.list.omega.bonus;
    } else if (chance(10)) {
      qualityColor = legendary;
      bonus = this.list.legendary.bonus;
    } else if (chance(10)) {
      qualityColor = epic;
      bonus = this.list.epic.bonus;
    } else if (chance(10)) {
      qualityColor = rare;
      bonus = this.list.rare.bonus;
    } else {
      qualityColor = common;
      bonus = this.list.common.bonus;
    }

    return [qualityColor, bonus];
  },
};

export default quality;
