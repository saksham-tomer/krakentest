import { accessoryData } from "@/data/itemDetails";
import Link from "next/link";
import Image from "next/image";

export default function NPCs({ npcs }) {
  return (
    <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
      <div className="flex flex-wrap">
        {npcs?.map((npc, i) => (
          <div className="w-full" key={i}>
            <div className="mb-4 flex flex-col space-y-2 rounded-2lg border border-jacarta-100 bg-light-base p-5 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-800">
              <span className="text-sm uppercase text-accent ">
                {npc.npc_name}
              </span>
              {/* <span className="text-base text-jacarta-700 dark:text-white">
            </span> */}
              {/* <span className="text-sm text-jacarta-400">
              {npc.npc_description}
            </span> */}
            </div>
            <div className="flex gap-4 flex-wrap">
              {npc.npc_images
                .filter(image => {
                  const url = typeof image === "string" ? image : image.url;
                  return !(/youtube\.com|youtu\.be/).test(url);
                })
                .map((image, index) => (
                <figure
                  key={index}
                  className="mb-1 w-full max-w-[200px] md:flex-shrink-0 md:flex-grow-0 md:basis-auto"
                >
                  {/* <Image
                width={540}
                height={670}
                src={game?.preview_image}
                alt="item"
                className="cursor-pointer rounded-2.5xl w-[100%]"
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
              /> */}
                  {/* <Image
                  width={787}
                  height={984}
                  src={npc.npc_images[0]}
                  alt="item"
                /> */}
                  <img
                    src={typeof image === "string" ? image : image.url}
                    alt={"alt"}
                    className="cursor-pointer rounded-2.5xl max-w-[200px] w-full h-full object-cover"
                    data-bs-toggle="modal"
                    data-bs-target={`#npcModal${i}-${index}`}
                  />

                  {/* Modal */}
                  <div
                    className="modal fade"
                    id={`npcModal${i}-${index}`}
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog !my-0 flex h-full items-center justify-center p-4">
                      <Image width={787} height={984} src={typeof image === "string" ? image : image.url} alt="item" />
                    </div>

                    <button
                      type="button"
                      className="btn-close absolute top-6 right-6"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-6 w-6 fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                      </svg>
                    </button>
                  </div>
                  {/* end modal */}
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
