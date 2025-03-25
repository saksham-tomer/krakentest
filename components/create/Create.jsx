"use client";

import React, { useRef, useState, useEffect } from "react";

import Button from "../ui/Button";

import { PiGameControllerDuotone } from "react-icons/pi";
import { TbDeviceGamepad3 } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { BiSolidGame } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { IoAdd } from "react-icons/io5";
import { SiGhostery } from "react-icons/si";
import { FaRegImages } from "react-icons/fa";
import { PiGameControllerFill } from "react-icons/pi";
import { FaRegImage } from "react-icons/fa";

import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import Loader from "../ui/Loader";
import { scrollToTop } from "@/components/create/utils/ScrollToTop";
import { useRouter } from "next/navigation";
import { gameGenres } from "@/constants/game";
import ImagePreview from "./components/ImagePreview";
import MultipleImagePreview from "./components/MultipleImagePreview";
import renderError from "./utils/renderError";
import withAuth from "@/hooks/withAuth";
import ImageModal from "../modals/ImageModal";
import MultipleImageCardPreview from "./components/MultipleImageCardPreview";

const GameForm = ({ game_id }) => {
  const { axiosInstance, loading, error } = useAxiosWithAuth();

  const [game, setGame] = useState();

  async function fetchGame(game_id) {
    console.log("Get game API called");
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/" + game_id
      );
      console.log(response, "###############");

      // Access the data using the assumed structure: response.data.success.data
      if (response.data && response.data.success) {
        setGame(response.data.success.data);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  useEffect(() => {
    if (game_id) {
      fetchGame(game_id);
    }
  }, []);

  const [progress, setProgress] = useState("0");
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedLocationImage, setSelectedLocationImage] = useState(0);
  const [selectedNPC, setSelectedNPC] = useState();
  const [selectedNPCImage, setSelectedNPCImage] = useState(0);
  const [selectedElement, setSelectedElement] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [gameData, setGameData] = useState({
    previewImage: null,
    previewImageType: "",
    gameName: "",
    gameDescription: "",
    gameOpener: "",
    openerMp3: null,
    gamePrompt: "",
    gameTags: [],
    storyDocuments: [],
    locations: [
      {
        name: "",
        description: "",
        images: [
          // {
          //   title: "",
          //   description: "",
          //   files: [],
          // },
        ],
      },
    ],
    npcs: [
      {
        name: "",
        description: "",
        images: [],
        playable: false,
      },
    ],
    dice: false,
    monster: false,
    inventory: false,
    character_sheet: false,
    currency_management: false,
    combat: false,
  });

  useEffect(() => {
    if (game) {
      let game_data = {
        previewImage: null,
        previewImageType: game.preview_image_type,
        gameName: game.game_name,
        gameDescription: game.game_description,
        gameOpener: game.game_opener,
        openerMp3: null,
        gamePrompt: game.game_prompt,
        gameTags: game.game_tags,
        storyDocuments: [],
        locations: [
          {
            name: "",
            description: "",
            images: [],
          },
        ],
        npcs: [
          {
            name: "",
            description: "",
            images: [],
          },
        ],
        dice: false,
        monster: false,
        inventory: false,
        character_sheet: false,
        currency_management: false,
        combat: false,
      };
      setGameData(game_data);
    }
  }, [game]);

  const [apiError, setApiError] = useState("");

  useEffect(() => {
    console.log("\n\n\n\n\n", gameData, "\n\n\n\n\n\n\n");
  }, [gameData]);

  const choosImageRef = useRef();
  const chooseAudioRef = useRef();
  const chooseStoryDocRef = useRef();
  const chooseLocationImagesRef = useRef();
  const chooseNpcImagesRef = useRef();

  const [triggerJelloAnimations, setTriggerJelloAnimation] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Define supported image and video types
    const validImageTypes = [
      "image/jpeg", // JPG
      "image/png", // PNG
      "image/gif", // GIF
      "image/svg+xml", // SVG
      "image/webp", // WEBP
    ];
    const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (validImageTypes.includes(file.type)) {
      // Handle image upload
      setGameData((prev) => ({
        ...prev,
        previewImage: file,
      }));
    } else if (validVideoTypes.includes(file.type)) {
      // Handle video upload
      setGameData((prev) => ({
        ...prev,
        previewImage: file,
      }));
    } else {
      // Invalid file type
      alert(
        "Invalid file type. Please upload an image (JPG, PNG, GIF, SVG, WEBP) or video."
      );
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isSupportedType =
        file.type.startsWith("image/") || file.type.startsWith("video/");

      if (isSupportedType) {
        setGameData({
          ...gameData,
          previewImage: file,
          previewImageType: file.type,
        });
      } else {
        alert("Please upload a valid image or video file.");
      }
    }
  };

  const handleAudioChange = (e) => {
    if (e.target.files[0]) {
      setGameData({
        ...gameData,
        openerMp3: e.target.files[0],
      });
    }
  };

  const handleDocumentsChange = (e) => {
    if (e.target.files) {
      setGameData((prev) => {
        return {
          ...prev,
          storyDocuments: [
            ...prev.storyDocuments,
            ...Array.from(e.target.files),
          ],
        };
      });
    }
  };

  const removeDocument = (indexToRemove) => {
    setGameData({
      ...gameData,
      storyDocuments: gameData.storyDocuments.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const handleTagChange = (tag) => {
    const newTags = gameData.gameTags.includes(tag)
      ? gameData.gameTags.filter((t) => t !== tag)
      : [...gameData.gameTags, tag];

    setGameData({
      ...gameData,
      gameTags: newTags,
    });
  };

  const addLocation = () => {
    setGameData({
      ...gameData,
      locations: [
        ...gameData.locations,
        { name: "", description: "", images: [] },
      ],
    });
  };

  const handleLocationChange = (index, field, value) => {
    const newLocations = [...gameData.locations];
    if (field === "images" && value.target.files) {
      newLocations[index].images = [
        ...gameData.locations[index].images,
        ...Array.from(value.target.files),
      ];
    } else {
      newLocations[index][field] = value;
    }
    setGameData({ ...gameData, locations: newLocations });
  };

  const handleLocationImageChange = (imageData) => {
    const newGameData = { ...gameData };
    if (isAdding) {
      newGameData.locations[selectedLocation].images.push(imageData);
    } else {
      newGameData.locations[selectedLocation].images[selectedLocationImage] =
        imageData;
    }
    setGameData(newGameData);
  };

  const handleNPCImageChange = (imageData) => {
    const newGameData = { ...gameData };
    if (isAdding) {
      newGameData.npcs[selectedNPC].images.push(imageData);
    } else {
      newGameData.npcs[selectedNPC].images[selectedNPCImage] = imageData;
    }
    setGameData(newGameData);
  };

  const removeLocationImage = (locationIndex, imageIndex) => {
    const newLocations = [...gameData.locations];
    newLocations[locationIndex].images = newLocations[
      locationIndex
    ].images.filter((_, index) => index !== imageIndex);
    setGameData({ ...gameData, locations: newLocations });
  };

  const removeLocation = (index) => {
    if (gameData.locations.length > 1) {
      setGameData((prev) => {
        const filteredLocations = prev.locations.filter(
          (location, i) => i !== index
        );
        return { ...prev, locations: filteredLocations };
      });
    }
  };

  const addNPC = () => {
    setGameData({
      ...gameData,
      npcs: [...gameData.npcs, { name: "", description: "", images: [] }],
    });
  };
  const handleNPCChange = (index, field, value) => {
    const newNPCs = [...gameData.npcs];

    if (field === "images" && value.target.files) {
      newNPCs[index].images = [
        ...gameData.npcs[index].images,
        ...Array.from(value.target.files),
      ];
    } else {
      newNPCs[index][field] = value;
    }

    setGameData((prev) => ({
      ...prev,
      npcs: newNPCs,
    }));
  };
  const removeNPCImage = (npcIndex, imageIndex) => {
    const newNPCs = [...gameData.npcs];
    newNPCs[npcIndex].images = newNPCs[npcIndex].images.filter(
      (_, index) => index !== imageIndex
    );
    setGameData({ ...gameData, npcs: newNPCs });
  };

  const removeNpc = (index) => {
    if (gameData.npcs.length > 1) {
      setGameData((prev) => {
        const filteredNpcs = prev.npcs.filter((npc, i) => i !== index);

        return { ...prev, npcs: filteredNpcs };
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!gameData.previewImage) {
      errors.previewImage = "Preview image is required";
    }

    if (!gameData.gameName.trim()) {
      errors.gameName = "Game name is required";
    }
    if (!gameData.gameOpener.trim()) {
      errors.gameOpener = "Game opener is required";
    }

    if (!gameData.gamePrompt.trim()) {
      errors.gamePrompt = "Game prompt is required";
    }

    if (gameData.gamePrompt.trim().length < 500) {
      errors.gamePrompt = "Game prompt should be at least 500 characters";
    }

    if (gameData.gameTags.length === 0) {
      errors.gameTags = "At least one game tag is required";
    }

    // if (gameData.storyDocuments.length === 0) {
    //   errors.storyDocuments = "At least one story document is required";
    // }

    const invalidLocations = gameData.locations.some(
      (loc) =>
        !loc.name.trim() || !loc.description.trim() || loc.images.length === 0
    );
    if (invalidLocations) {
      errors.locations =
        "All locations must have name, description and at least one image";
    }

    const invalidNPCs = gameData.npcs.some(
      (npc) =>
        !npc.name.trim() || !npc.description.trim() || npc.images.length === 0
    );

    if (invalidNPCs) {
      errors.npcs =
        "All NPCs must have name, description and at least one image";
    }

    const hasPlayableNPC = gameData.npcs.some((npc) => npc.playable);
    if (!hasPlayableNPC) {
      errors.npcs = "You need to add at least one playable character";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to the first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setFormErrors({});

    try {
      const formData = new FormData();

      // Add the preview image
      formData.append("preview_image", gameData.previewImage);
      formData.append("preview_image_type", gameData.previewImageType);

      // Add basic game information
      formData.append("game_name", gameData.gameName);
      formData.append("description", gameData.gameDescription);
      formData.append("game_opener", gameData.gameOpener);

      // Add the opener audio
      if (gameData.openerMp3) {
        formData.append("opener_mp3", gameData.openerMp3);
      }

      // Add game prompt
      formData.append("game_prompt", gameData.gamePrompt);

      // Functions
      formData.append("dice", gameData.dice);
      formData.append("inventory", gameData.inventory);
      formData.append("monster", gameData.monster);
      formData.append("combat", gameData.combat);
      formData.append("character_sheet", gameData.character_sheet);
      formData.append("currency_management", gameData.currency_management);

      // Add game tags as JSON string
      gameData.gameTags.forEach((tag, index) => {
        formData.append(`game_tag`, tag);
      });

      // Add story documents
      gameData.storyDocuments.forEach((doc, index) => {
        formData.append(`story_documents[${index}]`, doc);
      });

      // Add locations
      gameData.locations.forEach((location, index) => {
        formData.append(`location[${index}][location_name]`, location.name);

        formData.append(
          `location[${index}][location_description]`,
          location.description
        );
        location.images.forEach((image, i) => {
          formData.append(
            `location[${index}][location_images][${i}][name]`,
            image.title
          );
          formData.append(
            `location[${index}][location_images][${i}][description]`,
            image.description
          );
          formData.append(
            `location[${index}][location_images][${i}][file]`,
            image.file
          );
        });
      });

      // Add NPCs
      gameData.npcs.forEach((npc, index) => {
        formData.append(`npc[${index}][npc_name]`, npc.name);
        formData.append(`npc[${index}][npc_description]`, npc.description);
        formData.append(`npc[${index}][npc_playable]`, npc.playable);
        npc.images.forEach((image, i) => {
          formData.append(`npc[${index}][npc_images][${i}][name]`, image.title);
          formData.append(
            `npc[${index}][npc_images][${i}][description]`,
            image.description
          );
          formData.append(`npc[${index}][npc_images][${i}][file]`, image.file);
        });
      });

      const response = await axiosInstance.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/game",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            scrollToTop();
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (percentCompleted == 100) {
              setProgress("Creating game..");
            } else {
              setProgress(percentCompleted.toString() + "%");
            }
          },
        }
      );
      if (response.status === 201) {
        setProgress("Game created successfully");
        router.push("/profile");
      } else {
        setProgress("Something went wrong");
        alert("Game creation failed. Please try again.");
      }

      // return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        console.log("setting API error", err.response.data.error.message);
        setApiError(err.response.data.error.message);
      }
      console.error("Failed to submit game data:", err.response);
      console.error(
        "Failed to submit game data:",
        err.response.data.error.message
      );
      // throw err;
    }
  };

  // Styling

  const labelStyling = "text-md font-medium mb-3 text-jacarta-200";

  return (
    <>
      {!loading ? (
        <div className="max-w-6xl mx-auto py-24  rounded-lg shadow">
          <h2 className=" max-w-[90%] mx-auto flex items-center gap-2 text-2xl font-bold mb-6 dark:text-jacarta-100 text-jacarta-600">
            <PiGameControllerDuotone className="scale-in-center text-4xl text-accent" />{" "}
            Create New Game {apiError}
          </h2>
          {apiError && (
            <div
              id="alert-2"
              class="flex items-center p-4 mb-4 text-[#9b1c1c] rounded-lg bg-[#fdf2f2] dark:bg-[#1f2937] dark:text-[#f98080]"
              role="alert"
            >
              <svg
                class="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div class="ms-3 text-sm font-medium">{apiError}</div>
              <button
                type="button"
                onClick={() => setApiError("")}
                class="ms-auto -mx-1.5 -my-1.5 bg-red-[#fdf2f2] text-[#9b1c1c] rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-2"
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-[90%] mx-auto"
          >
            {/* Preview Image */}
            <div className="flex  gap-10 justify-between flex-col lg:flex-row">
              <div className="flex flex-col gap-2 lg:max-w-[50%]">
                <div className="flex-1 flex flex-col">
                  <label className={labelStyling}>Preview Image</label>
                  <input
                    ref={choosImageRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleImageChange}
                    className="hidden w-[1rem] z-10"
                  />
                  <ImagePreview
                    file={gameData.previewImage}
                    choosImageRef={choosImageRef}
                  />
                  {renderError("previewImage", formErrors)}
                  <Button
                    size="md"
                    className="bg-jacarta-700 mt-5"
                    onClick={() => choosImageRef.current.click()}
                  >
                    <FaRegImage className="text-accent-light text-xl" />
                    Upload Game thumbnail
                  </Button>
                </div>
                {/* Toggler Questions */}
                <div className="mt-6">
                  <span className="flex items-center gap-2 text-md font-medium text-jacarta-200">
                    {/* <IoToggleOutline className="text-accent text-xl" /> */}
                    Game Features
                  </span>
                  <div className="flex flex-wrap gap-6 mt-4">
                    {[
                      {
                        label: "Inventory",
                        key: "inventory",
                        descrition:
                          "Enables management of in-game items, like collecting and remembering items between sessions. Players can equip gear they find to enhance their characters and change builds/strategies......Because that +8 damage Blade of Chaos isn't going to manage itself. 🗡️",
                      },
                      {
                        label: "Character Sheet",
                        key: "character_sheet",
                        descrition:
                          "Enables creation and tracking of player characters with all their attributes, abilities, and backstories, enhancing memory and game mechanics by keeping characters consistent and evolving over time. ...So your players can't one-shot the Ancestral Black Dragon at LvL2. 🦇",
                      },
                      {
                        label: "Fantasy Monsters",
                        key: "monster",
                        descrition:
                          "Enables loading a bank of enemies for random encounters, making fights less repetitive and more realistic and engaging dynamic challenges that adapt to player progress....Because Dragons get all the fame but Tarrasques are monsters too! 🐲",
                      },
                      {
                        label: "Currency Management & Exchange",
                        key: "currency_management",
                        descrition:
                          "Keeps meticulous track of in-game currency, preventing any 'creative accounting' from players. Enhances game mechanics by remembering every coin earned or spent....Because… No. You can't buy a Star Destroyer for 50 credits, ok?! 💰",
                      },
                      {
                        label: "Rolling the Dice",
                        key: "dice",
                        descrition:
                          "Handles all dice-based outcomes, adding chance and excitement to user action, enhancing narration by inserting just the right amount of randomness....Because sometimes you need to hit Natural 1 and die… Wait what was the question? 🎲",
                      },
                      // { label: "Rolling the Dice for NPC & World Event Resolution", key: "dice" },
                      {
                        label: "Combat",
                        key: "combat",
                        descrition:
                          "Powers your game's battle mechanics, handling attack rolls and damage calculations, enhancing game mechanics by providing consistent, memory-backed combat experiences. ...Because it's hard to 'Finish Him!' if no one remembers how to compute damage on your Fireball! 🔥",
                      },
                    ].map((feature) => (
                      <div
                        key={feature.key}
                        className="min-w-[200px] sm:max-w-[250px] flex-1 flex items-center justify-between border border-jacarta-100 dark:border-jacarta-600 rounded-lg p-3 dark:bg-jacarta-700"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-jacarta-200 dark:text-white">
                            {feature.label}
                          </span>
                          <div class="relative group flex items-center">
                            <button class="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="16px"
                                height="16px"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1 11h-2v-6h2v6z" />
                              </svg>
                            </button>
                            <div
                              class={`${
                                feature.label ==
                                "Currency Management & Exchange"
                                  ? "-left-[150px]"
                                  : "-left-[90px]"
                              } z-10 absolute top-full 
                                    sm:left-1/2
                                    transform sm:-translate-x-1/2
                                    mb-2 w-max
                                    max-w-[280px] sm:max-w-[400px]
                                    px-2 py-1 text-sm text-white
                                    bg-jacarta-600 rounded shadow-lg 
                                    pointer-events-none invisible
                                    group-hover:visible`}
                            >
                              {feature.descrition}
                            </div>
                          </div>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={gameData[feature.key] || false}
                            onChange={(e) =>
                              setGameData({
                                ...gameData,
                                [feature.key]: e.target.checked,
                              })
                            }
                            Tooltip
                            on
                            Top
                          />
                          <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent rounded-full peer dark:bg-jacarta-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col ">
                {/* Game Name */}
                <div>
                  <label className={labelStyling}>Game Name</label>
                  <input
                    type="text"
                    value={gameData.gameName}
                    onChange={(e) =>
                      setGameData({ ...gameData, gameName: e.target.value })
                    }
                    className="custom-input mt-2 mb-3"
                  />
                </div>
                {renderError("gameName", formErrors)}

                {/* Game Description */}
                <div>
                  <label className={labelStyling}>Game Description</label>
                  <textarea
                    value={gameData.gameDescription}
                    onChange={(e) =>
                      setGameData({
                        ...gameData,
                        gameDescription: e.target.value,
                      })
                    }
                    rows={4}
                    className="custom-input mt-2 mb-2"
                  />
                </div>
                {renderError("gameDescription", formErrors)}

                {/* Game Opener */}
                <div>
                  <label className={labelStyling}>Game Opener</label>
                  <textarea
                    value={gameData.gameOpener}
                    onChange={(e) =>
                      setGameData({ ...gameData, gameOpener: e.target.value })
                    }
                    rows={4}
                    className="custom-input mt-2 mb-2"
                  />
                </div>
                {renderError("gameOpener", formErrors)}

                {/* Opener MP3 */}
                <div>
                  <label className={labelStyling}>Opener MP3 (Optional)</label>
                  <input
                    type="file"
                    accept="audio/*"
                    ref={chooseAudioRef}
                    onChange={handleAudioChange}
                    className="hidden w-[1rem]"
                  />
                  <div className="flex items-center gap-6 p-2  mt-2 mb-3  rounded-lg w-full border border-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white ">
                    <Button
                      size="sm"
                      onClick={() => chooseAudioRef.current.click()}
                    >
                      Choose file
                    </Button>

                    {gameData.openerMp3 ? (
                      <>Selected file: {gameData.openerMp3.name}</>
                    ) : (
                      " No file chosen"
                    )}
                  </div>
                </div>

                {/* Game Prompt */}
                <div>
                  <label className={labelStyling}>Game Prompt</label>
                  <textarea
                    value={gameData.gamePrompt}
                    onChange={(e) =>
                      setGameData({ ...gameData, gamePrompt: e.target.value })
                    }
                    className="custom-input mt-2 flex-1 h-[9.5rem]"
                  />
                </div>
                <span className="text-sm text-nowrap">
                  {gameData.gamePrompt.length} characters
                </span>
                {renderError("gamePrompt", formErrors)}
              </div>
            </div>
            {/* Game Tags */}
            <div className="flex gap-10 justify-between flex-col lg:flex-row">
              <div className="flex-1">
                <span className="flex items-center gap-2 text-md font-medium text-jacarta-200">
                  <IoPricetagsOutline className="text-accent text-xl" />
                  Game Tags
                </span>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  {gameGenres.map((tag) => (
                    <div
                      key={tag}
                      type="button"
                      onClick={() => handleTagChange(tag)}
                      className={`flex items-center justify-center border-2 cursor-pointer gap-2 px-3 py-2 rounded-3xl font-semibold hover:text-accent hover:border-accent-dark${
                        gameData.gameTags.includes(tag)
                          ? "bg-blue-500 text-accent  border-accent-dark"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {gameData.gameTags.includes(tag) && (
                        <TbDeviceGamepad3 className="scale-in-center text-xl" />
                      )}

                      {tag}
                    </div>
                  ))}
                  {renderError("gameTags", formErrors)}
                </div>
              </div>

              {/* Story Documents */}
              <div className="flex-1">
                <label className="flex items-center gap-2 text-md text-jacarta-200 font-medium">
                  <IoBookOutline className="text-accent text-xl" />
                  Story Documents
                </label>
                <div className="flex items-center gap-6 p-3 mt-2  rounded-lg w-full border border-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white ">
                  {gameData.storyDocuments.length > 0 ? (
                    <div className="mt-2 w-full">
                      <p className="text-sm font-medium mb-2 text-jacarta-300">
                        Selected files
                      </p>
                      <ul className="list-none flex flex-col gap-3 h-[11rem] w-full overflow-y-auto pr-2">
                        {gameData.storyDocuments.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-start gap-1 text-sm text-gray-600"
                          >
                            <BiSolidGame className="basis-[5%] scale-in-center" />
                            <p className="basis-[95%]"> {file.name}</p>

                            <button onClick={() => removeDocument(index)}>
                              <MdDeleteOutline className="text-red text-base" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        onClick={() => chooseStoryDocRef.current.click()}
                      >
                        Choose file
                      </Button>
                      No files chosen
                    </>
                  )}
                </div>
                <Button
                  size="sm"
                  className="ml-auto mt-4 text-nowrap"
                  onClick={() => chooseStoryDocRef.current.click()}
                >
                  Add file
                </Button>
                <input
                  type="file"
                  ref={chooseStoryDocRef}
                  multiple
                  accept=".docx,.pptx,.cls,.pdf,.html,.txt,.md,.jpeg,.jpg,.png,.svg"
                  onChange={handleDocumentsChange}
                  className="w-[1rem] hidden"
                />
                {renderError("storyDocuments", formErrors)}
              </div>
            </div>
            {/* Locations */}

            <div>
              <div class="relative group flex items-center max-w-[150px]">
                <span className="flex items-center gap-2 text-md text-jacarta-200 font-medium ">
                  <GiWorld className="text-xl text-accent" />
                  Locations
                </span>
                <button class="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="16px"
                    height="16px"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1 11h-2v-6h2v6z" />
                  </svg>
                </button>
                <div
                  class="z-10 absolute top-full left-1/2 
                        transform -translate-x-1/2 sm:translate-x-0 max-w-[300px] mb-2 
                        w-max sm:max-w-[400px] px-2 py-1 text-sm text-white
                        bg-jacarta-600 rounded shadow-lg 
                        pointer-events-none invisible
                        group-hover:visible"
                >
                  For &apos;Locations&apos; And &apos;NPCs&apos; Helps Generate
                  dynamic descriptions and visuals using AI to bring your
                  game&apos;s story to life, enhancing immersion with
                  memory-driven narratives. ...Because a journey through your
                  world feels more epic when the scenery matches the story. 🌄
                </div>
              </div>

              {gameData.locations.map((location, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 mt-2 border border-jacarta-600 rounded-md flex flex-col"
                >
                  <input
                    value={location.name}
                    onChange={(e) =>
                      handleLocationChange(index, "name", e.target.value)
                    }
                    placeholder="Location Name"
                    className="custom-input mb-4 placeholder:font-semibold"
                  />
                  <textarea
                    value={location.description}
                    onChange={(e) =>
                      handleLocationChange(index, "description", e.target.value)
                    }
                    placeholder="Location description"
                    className="custom-input h-[15rem] placeholder:font-semibold"
                  />
                  <input
                    type="file"
                    multiple
                    id={`location-image-${index}`} // Unique ID for each file input
                    accept="image/*"
                    onChange={(e) => handleLocationChange(index, "images", e)} // Ensure correct index
                    className="w-[1rem] hidden"
                  />
                  <MultipleImageCardPreview
                    files={location.images}
                    setSelectedLocationImage={setSelectedLocationImage}
                    setSelectedLocation={setSelectedLocation}
                    elementIndex={index}
                    element="location"
                    setSelectedElement={setSelectedElement}
                    setIsAdding={setIsAdding}
                    onRemove={(imageIndex) =>
                      removeLocationImage(index, imageIndex)
                    }
                  />
                  <div className="flex gap-3 items-center ml-auto mt-4">
                    {/* <Button
                      size="sm"
                      className="text-nowrap"
                      onClick={() =>
                        document
                          .getElementById(`location-image-${index}`)
                          .click()
                      } // Trigger correct input
                    >
                      <FaRegImages className="text-xl" />
                      Add Location images
                    </Button> */}

                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#imageModal"
                      className="cursor-pointer flex items-center justify-center gap-2 rounded bg-accent-dark text-white font-medium tracking-wider focus:border-none focus:outline-none disabled:bg-opacity-75 disabled:text-opacity-75 disabled:cursor-not-allowed px-3 py-2 text-sm text-nowrap"
                      onClick={() => {
                        setSelectedLocation(index);
                        setSelectedElement("location");
                        setIsAdding(true);
                        setIsOpen(true);
                      }}
                    >
                      <FaRegImages className="text-xl" />
                      Add Location images
                    </a>

                    {gameData.locations.length > 1 && (
                      <Button
                        size="sm"
                        disabled={gameData.locations.length < 2}
                        className="text-nowrap bg-red bg-opacity-50 "
                        onClick={() => removeLocation(index)}
                      >
                        <MdDeleteOutline className="text-xl" />
                        Remove location
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button
                onClick={addLocation}
                className="text-white bg-transparent border-2 font-semibold trackingwide border-jacarta-600 rounded-md hover:bg-green-600"
              >
                <IoAdd className="text-2xl" />
                Add more locations
              </Button>
            </div>
            {renderError("locations", formErrors)}

            {/* NPCs */}
            <div>
              <div class="relative group flex items-center max-w-[150px]">
                <span className="flex items-center gap-2 text-md text-jacarta-200 font-medium ">
                  <SiGhostery className="text-xl text-accent" />
                  Characters
                </span>
                <button class="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="16px"
                    height="16px"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1 11h-2v-6h2v6z" />
                  </svg>
                </button>
                <div
                  class="z-10 absolute top-full left-1/2 
                        transform -translate-x-1/2 sm:translate-x-0 max-w-[300px] mb-2 
                        w-max sm:max-w-[400px] px-2 py-1 text-sm text-white
                        bg-jacarta-600 rounded shadow-lg 
                        pointer-events-none invisible
                        group-hover:visible"
                >
                  For &apos;Locations&apos; And &apos;NPCs&apos; Helps Generate
                  dynamic descriptions and visuals using AI to bring your
                  game&apos;s story to life, enhancing immersion with
                  memory-driven narratives. ...Because a journey through your
                  world feels more epic when the scenery matches the story. 🌄
                </div>
              </div>

              {gameData.npcs.map((npc, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 mt-2 border border-jacarta-600 rounded-md"
                >
                  <input
                    value={npc.name}
                    onChange={(e) =>
                      handleNPCChange(index, "name", e.target.value)
                    }
                    placeholder="Character Name"
                    className="custom-input mb-4 placeholder:font-semibold"
                  />
                  <textarea
                    value={npc.description}
                    onChange={(e) =>
                      handleNPCChange(index, "description", e.target.value)
                    }
                    placeholder="Character description"
                    className="custom-input h-[15rem] placeholder:font-semibold"
                  />
                  <div className="py-4">
                    <span className="font-semibold mr-4">Is Playable</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={npc.playable || false}
                        onChange={(e) =>
                          handleNPCChange(index, "playable", e.target.checked)
                        }
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent rounded-full peer dark:bg-jacarta-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <input
                    type="file"
                    multiple
                    id={`npc-image-${index}`} // Unique ID for each input
                    accept="image/*"
                    onChange={(e) => handleNPCChange(index, "images", e)} // Pass correct index
                    className="w-[1rem] hidden"
                  />
                  {/* <MultipleImagePreview
                    files={npc.images}
                    onRemove={(imageIndex) => removeNPCImage(index, imageIndex)}
                  /> */}
                  <MultipleImageCardPreview
                    files={npc.images}
                    setSelectedNPCImage={setSelectedNPCImage}
                    setSelectedNPC={setSelectedNPC}
                    elementIndex={index}
                    setSelectedElement={setSelectedElement}
                    element="NPC"
                    setIsAdding={setIsAdding}
                    onRemove={(imageIndex) => removeNPCImage(index, imageIndex)}
                  />

                  <div className="flex items-center gap-3 mt-2">
                    {/* <Button
                      size="sm"
                      className="ml-auto text-nowrap"
                      onClick={() =>
                        document.getElementById(`npc-image-${index}`).click()
                      } // Trigger correct input
                    >
                      <FaRegImages className="text-xl" />
                      Add NPC images
                    </Button> */}

                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#imageModal"
                      className="cursor-pointer ml-auto flex items-center justify-center gap-2 rounded bg-accent-dark text-white font-medium tracking-wider focus:border-none focus:outline-none disabled:bg-opacity-75 disabled:text-opacity-75 disabled:cursor-not-allowed px-3 py-2 text-sm text-nowrap"
                      onClick={() => {
                        setSelectedNPC(index);
                        setSelectedElement("NPC");
                        setIsAdding(true);
                        setIsOpen(true);
                      }}
                    >
                      <FaRegImages className="text-xl" />
                      Add NPC images
                    </a>
                    {gameData.npcs.length > 1 && (
                      <Button
                        size="sm"
                        className="text-nowrap bg-red bg-opacity-50"
                        onClick={() => removeNpc(index)}
                      >
                        <MdDeleteOutline className="text-xl" />
                        Remove npc
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button
                onClick={addNPC}
                className="text-white bg-transparent border-2 font-semibold trackingwide border-jacarta-600 rounded-md hover:bg-green-600"
              >
                <IoAdd className="text-2xl" />
                Add more npcs
              </Button>
            </div>
            {renderError("npcs", formErrors)}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              onMouseOver={() => setTriggerJelloAnimation(true)}
              onMouseLeave={() => setTriggerJelloAnimation(false)}
              className={`mx-auto border-accent gap-3 glow text-white bg-transparent border-2 font-semibold tracking-wide  rounded-md hover:bg-green-600 ${
                triggerJelloAnimations && "jello-horizontal"
              }`}
            >
              Create Game{" "}
              <PiGameControllerFill className="text-3xl text-white jello-horizontal" />
            </Button>
          </form>
        </div>
      ) : (
        <div className="h-screen w-screen">
          <div className="flex flex-col gap-6 justify-center items-center center-fixed">
            {" "}
            <Loader />
            <p className="mt-4 text-white font-semibold text-xl text-center">
              {" "}
              {progress}
            </p>
          </div>
        </div>
      )}
      <ImageModal
        selectedData={
          selectedElement === "NPC"
            ? gameData.npcs?.[selectedNPC]?.images?.[selectedNPCImage] ?? null
            : gameData.locations?.[selectedLocation]?.images?.[
                selectedLocationImage
              ] ?? null
        }
        selectedElement={selectedElement}
        handleLocationImageChange={handleLocationImageChange}
        handleNPCImageChange={handleNPCImageChange}
        isAdding={isAdding}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default withAuth(GameForm);
