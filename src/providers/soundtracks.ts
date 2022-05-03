import { Howl, Howler } from "howler";
import Rolling_beat from "../assets/sounds/Rolling_beat.ogg";

Howler.volume(0.5);
const soundtracks = {
  scenes: new Howl({
    src: Rolling_beat,
    loop: true,
    volume: 0.25,
    html5: true,
    preload: "metadata",
  }),
};

export default soundtracks;
