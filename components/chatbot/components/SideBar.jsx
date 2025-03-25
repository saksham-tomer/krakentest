"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";

const SideBar = () => {
  const buttonStyling =
    "bg-black w-full rounded-lg hover:text-accent-lighter hover:scale-105 transition-all";

  return (
    <div className="h-[90vh] rounded-tl-lg rounded-bl-lg basis-[15%] shadow-[0_0_5px_#8358ff] bg-jacarta-700  text-white flex flex-col p-4">
      <div className="w-full h-64 relative rounded-xl overflow-hidden z-1 ">
        <Image
          src="https://wallpapers.com/images/hd/wow-sargeras-and-legion-bqxt3n2zthosbrpv.jpg"
          className="object-cover"
          fill
        />
      </div>
      <h4 className="text-center my-5 font-semibold text-white tracking-wide uppercase">
        World of warcraft
      </h4>

      <div className="mb-6 flex flex-col gap-3">
        <Button className={buttonStyling}>Tutorial</Button>
        <Button className={buttonStyling}>Character Sheet</Button>
        <Button className={buttonStyling}>Inventory</Button>
        <Button className={buttonStyling}>FAQ</Button>
        <Button className={buttonStyling}>Contact</Button>
        <Button className={buttonStyling}>About</Button>
      </div>

      <AudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        poster="https://www.example.com/album-art.jpg"
        title="Sample Track"
        artist="Sample Artist"
      />
    </div>
  );
};
export default SideBar;
