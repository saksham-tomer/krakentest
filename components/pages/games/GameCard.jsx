import Button from "@/components/ui/Button";
import Image from "next/image";
import { Tilt } from "react-tilt";

import { IoGameController } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";

import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import { useState } from "react";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const GameCard = ({ gameData }) => {
  const [mute, setMute] = useState();
  const [showMuteButtons, setShowMuteButtons] = useState(false);

  const buttonStyling = `flex-1 bg-jacarta-900 hover:text-accent-lighter hover:scale-110 transition-all text-lg`;

  console.log(gameData);

  return (
    <Tilt
      options={defaultOptions}
      className=" bg-jacarta-700 shadow-small  p-3 rounded-lg  w-full min-h-[24rem]  shadow-[0_0_5px_#8358ff] relative"
    >
      <div
        className="flex flex-col gap-2"
        onMouseEnter={() => setShowMuteButtons(true)}
        onMouseLeave={() => setShowMuteButtons(false)}
      >
        {showMuteButtons && (
          <div
            className="absolute right-5 top-5 text-xl z-10 text-jacarta-200 bg-jacarta-900 border shadow-[0_0_5px_#8358ff] border-jacarta-600 bg-opacity-75 rounded-full p-1 scale-in-center cursor-pointer"
            onClick={() => setMute((prev) => !prev)}
          >
            {mute ? <GoUnmute /> : <GoMute />}
          </div>
        )}

        <div className="w-full h-64 relative rounded-xl overflow-hidden z-1">
          <Image src={gameData.preview_image} className="object-cover" fill />
        </div>
        <h4 className="text-white font-semibold text-center my-3 text-lg tracking-wider">
          {gameData.game_name}
        </h4>

        <div className="flex items-center gap-1">
          <Button className={buttonStyling} size="sm">
            Play <IoGameController className="text-md" />
          </Button>
          <Button className={buttonStyling} size="sm">
            Explore <MdOutlineExplore className="text-lg" />
          </Button>
        </div>
      </div>
    </Tilt>
  );
};
export default GameCard;
