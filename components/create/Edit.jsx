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
import MultipleImagePreviewEdit from "./components/MultipleImagePreviewEdit";
import renderError from "./utils/renderError";
import MultipleImageCardPreview from "@/components/create_async/components/MultipleImageCardPreview";
import ImageModal from "../modals/ImageModal";
import MusicPlayer from '@/components/pages/play/MusicPlayer';

const GameForm = ({ game_id }) => {
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const [game, setGame] = useState();
  const [progress, setProgress] = useState("0");
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedLocationImage, setSelectedLocationImage] = useState(0);
  const [selectedNPC, setSelectedNPC] = useState();
  const [selectedNPCImage, setSelectedNPCImage] = useState(0);
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedSavedImage, setSelectedSavedImage] = useState(0);
  const [savedImage, setSavedImage] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('af_alloy');
  const [voiceDropdownOpen,setVoiceDropdownOpen] = useState(false);

  const voices = {
    "American Female 🇺🇸 👩": [
      { id: 'af_alloy', name: 'Alloy' },
      { id: 'af_aoede', name: 'Aoede' },
      { id: 'af_bella', name: 'Bella 🔥' },
      { id: 'af_kore', name: 'Kore' },
      { id: 'af_nicole', name: 'Nicole' },
      { id: 'af_nova', name: 'Nova' },
      { id: 'af_sarah', name: 'Sarah' },
      { id: 'af_sky', name: 'Sky' }
    ],
    "American Male 🇺🇸 👨": [
      { id: 'am_fenrir', name: 'Fenrir' },
      { id: 'am_michael', name: 'Michael' },
      { id: 'am_puck', name: 'Puck' }
    ],
    "British 🇬🇧": [
      { id: 'bf_emma', name: 'Emma' },
      { id: 'bf_isabella', name: 'Isabella' },
      { id: 'bm_fable', name: 'Fable' },
      { id: 'bm_george', name: 'George' }
    ]
  };


  const [gameData, setGameData] = useState({
    previewImage: null,
    previewImageType: "",
    savedPreviewImage: null,
    savedPreviewImageType: "",
    gameName: "",
    gameDescription: "",
    gameOpener: "",
    openerMp3: null,
    gamePrompt: "",
    gameTags: [],
    savedStoryDocuments: [],
    storyDocuments: [],
    locations: [
      {
        name: "",
        description: "",
        images: [],
        savedImages: [],
      },
    ],
    npcs: [
      {
        name: "",
        description: "",
        images: [],
        savedImages: [],
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

  async function fetchGame(game_id) {
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/" + game_id
      );

      if (response.data && response.data.success) {
        setGame(response.data.success.data);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching game:", err);
    }
  }

  useEffect(() => {
    if (game_id) {
      fetchGame(game_id);
    }
  }, []);

  useEffect(() => {
    if (game) {
      let game_data = {
        previewImage: null,
        previewImageType: "",
        savedPreviewImage: game.preview_image,
        savedPreviewImageType: game.preview_image_type,
        gameName: game.game_name,
        gameDescription: game.description,
        gameOpener: game.game_opener,
        openerMp3: null,
        savedOpenerMp3:game.opener_mp3,
        gamePrompt: game.game_prompt,
        gameTags: game.game_tags,
        savedStoryDocuments: game.story_documents,
        storyDocuments: [],
        locations: game.game_location.map((loc) => ({
          name: loc.location_name || "",
          description: loc.location_description || "",
          images: [],
          savedImages: loc.location_images,
        })) || [
          {
            name: "",
            description: "",
            images: [],
            savedImages: [],
          },
        ],
        npcs: game.game_npc.map((npc) => ({
          name: npc.npc_name || "",
          description: npc.npc_description || "",
          images: [],
          savedImages: npc.npc_images,
          playable: npc.is_playable || false,
        })) || [
          {
            name: "",
            description: "",
            images: [],
            savedImages: [],
            playable: false,
          },
        ],
        dice: game.dice,
        monster: game.monster,
        inventory: game.inventory,
        character_sheet: game.character_sheet,
        currency_management: game.currency_management,
        combat: game.combat,
      };
      setGameData(game_data);
      if (game?.ai_voice){
        setSelectedVoice(game.ai_voice)
      }
    }
  }, [game]);

  const choosImageRef = useRef();
  const chooseAudioRef = useRef();
  const chooseStoryDocRef = useRef();
  const chooseLocationImagesRef = useRef();
  const chooseNpcImagesRef = useRef();

  const [triggerJelloAnimations, setTriggerJelloAnimation] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
      setGameData((prev) => ({
        ...prev,
        storyDocuments: [...prev.storyDocuments, ...Array.from(e.target.files)],
      }));
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

  const removeSavedDocument = (docId) => {
    setGameData({
      ...gameData,
      savedStoryDocuments: gameData.savedStoryDocuments.filter(
        (doc) => doc.id !== docId
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

  const removeLocationImage = (locationIndex, imageIndex) => {
    const newLocations = [...gameData.locations];
    newLocations[locationIndex].images = newLocations[
      locationIndex
    ].images.filter((_, index) => index !== imageIndex);
    setGameData({ ...gameData, locations: newLocations });
  };

  const removeLocationImageUrl = (locationIndex, imageIndex) => {
    const newLocations = [...gameData.locations];
    newLocations[locationIndex].savedImages = newLocations[
      locationIndex
    ].savedImages.filter((_, index) => index !== imageIndex);
    setGameData({ ...gameData, locations: newLocations });
  };

  const addLocation = () => {
    setGameData({
      ...gameData,
      locations: [
        ...gameData.locations,
        { name: "", description: "", images: [], savedImages: [] },
      ],
    });
  };

  const removeLocation = (index) => {
    if (gameData.locations.length > 1) {
      setGameData((prev) => ({
        ...prev,
        locations: prev.locations.filter((_, i) => i !== index),
      }));
    }
  };

  const handleNPCChange = (index, field, value) => {
    const newNPCs = [...gameData.npcs];
    if (field === "images" && value.target.files) {
      console.log("addding image to npc ", index);
      newNPCs[index].images = [
        ...gameData.npcs[index].images,
        ...Array.from(value.target.files),
      ];
    } else {
      newNPCs[index][field] = value;
    }
    setGameData({ ...gameData, npcs: newNPCs });
  };

  const removeNPCImage = (npcIndex, imageIndex) => {
    const newNPCs = [...gameData.npcs];
    newNPCs[npcIndex].images = newNPCs[npcIndex].images.filter(
      (_, index) => index !== imageIndex
    );
    setGameData({ ...gameData, npcs: newNPCs });
  };

  const removeNPCImageURL = (npcIndex, imageIndex) => {
    const newNPCs = [...gameData.npcs];
    newNPCs[npcIndex].savedImages = newNPCs[npcIndex].savedImages.filter(
      (_, index) => index !== imageIndex
    );
    setGameData({ ...gameData, npcs: newNPCs });
  };

  const addNPC = () => {
    setGameData({
      ...gameData,
      npcs: [
        ...gameData.npcs,
        {
          name: "",
          description: "",
          images: [],
          savedImages: [],
          playable: false,
        },
      ],
    });
  };

  const removeNpc = (index) => {
    if (gameData.npcs.length > 1) {
      setGameData((prev) => ({
        ...prev,
        npcs: prev.npcs.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!gameData.previewImage && !gameData.savedPreviewImage) {
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

    const invalidLocations = gameData.locations.some(
      (loc) =>
        !loc.name.trim() ||
        !loc.description.trim() ||
        (loc.images.length === 0 &&
          (!loc.savedImages || loc.savedImages.length === 0))
    );
    if (invalidLocations) {
      errors.locations =
        "All locations must have name, description and at least one image";
    }

    const invalidNPCs = gameData.npcs.some(
      (npc) =>
        !npc.name.trim() ||
        !npc.description.trim() ||
        (npc.images.length === 0 &&
          (!npc.savedImages || npc.savedImages.length === 0))
    );
    if (invalidNPCs) {
      errors.npcs =
        "All NPCs must have name, description and at least one image";
    }

    const hasPlayableNPC = gameData.npcs.some((npc) => npc.playable);
    if (!hasPlayableNPC) {
      errors.npcsPlayable = "You need to add at least one playable character";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setFormErrors({});

    try {
      const formData = new FormData();

      if (gameData.previewImage) {
        formData.append("preview_image", gameData.previewImage);
      }
      formData.append("preview_image_type", gameData.previewImageType);
      formData.append("ai_voice", selectedVoice);


      formData.append("game_name", gameData.gameName);
      formData.append("description", gameData.gameDescription);
      formData.append("game_opener", gameData.gameOpener);

      if (gameData.openerMp3) {
        formData.append("opener_mp3", gameData.openerMp3);
      }

      formData.append("game_prompt", gameData.gamePrompt);

      formData.append("dice", gameData.dice);
      formData.append("inventory", gameData.inventory);
      formData.append("monster", gameData.monster);
      formData.append("combat", gameData.combat);
      formData.append("character_sheet", gameData.character_sheet);
      formData.append("currency_management", gameData.currency_management);

      for (let i = 0; i < gameData.savedStoryDocuments.length; i++) {
        formData.append(
          `saved_story_documents_[${i}]`,
          gameData.savedStoryDocuments[i].id
        );
      }

      gameData.gameTags.forEach((tag) => {
        formData.append(`game_tag`, tag);
      });

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
            `location[${index}][location_images][${i}][type]`,
            image.type
          );
          if (image.type === 'youtube') {
            formData.append(
              `location[${index}][location_images][${i}][youtube_url]`,
              image.youtubeUrl
            );
          } else {
            formData.append(
              `location[${index}][location_images][${i}][file]`,
              image.file
            );
          }
        });
      });
      // Add saved location images
      gameData.locations.forEach((location, index) => {
        location.savedImages?.forEach((image, i) => {
          formData.append(
            `location[${index}][saved_location_images][${i}][name]`,
            image.name
          );
          formData.append(
            `location[${index}][saved_location_images][${i}][description]`,
            image.description
          );
          formData.append(
            `location[${index}][saved_location_images][${i}][url]`,
            image.url
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
          formData.append(
            `npc[${index}][npc_images][${i}][type]`,
            image.type
          );
          if (image.type === 'youtube') {
            formData.append(
              `npc[${index}][npc_images][${i}][youtube_url]`,
              image.youtubeUrl
            );
          } else {
            formData.append(
              `npc[${index}][npc_images][${i}][file]`,
              image.file
            );
          }
        });
        
        // Add saved NPC images
        npc.savedImages?.forEach((image, i) => {
          formData.append(
            `npc[${index}][saved_npc_images][${i}][name]`,
            image.name
          );
          formData.append(
            `npc[${index}][saved_npc_images][${i}][description]`,
            image.description
          );
          formData.append(
            `npc[${index}][saved_npc_images][${i}][url]`,
            image.url
          );
        });
      });

      const response = await axiosInstance.put(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/ai-games/games/${game_id}/`,
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
              setProgress("Editing game..");
            } else {
              setProgress(percentCompleted.toString() + "%");
            }
          },
        }
      );

      if (response.status === 200 && game_id) {
        setProgress("Game Edited successfully");
        router.push("/profile");
      } else {
        setProgress("Something went wrong");
        alert("Game Edit failed. Please try again.");
      }
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
    }
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

  const labelStyling = "text-md font-medium mb-3 text-jacarta-200";

  console.log("gameData ======>", gameData);

  return (
    <>
      {!loading ? (
        <div className="max-w-6xl mx-auto py-24 rounded-lg shadow">
          <h2 className="max-w-[90%] mx-auto flex items-center gap-2 text-2xl font-bold mb-6 dark:text-jacarta-100 text-jacarta-600">
            <PiGameControllerDuotone className="scale-in-center text-4xl text-accent" />{" "}
            Edit Game {apiError}
          </h2>
          {apiError && (
            <div
              id="alert-2"
              className="flex items-center p-4 mb-4 text-[#9b1c1c] rounded-lg bg-[#fdf2f2] dark:bg-[#1f2937] dark:text-[#f98080]"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">{apiError}</div>
              <button
                type="button"
                onClick={() => setApiError("")}
                className="ms-auto -mx-1.5 -my-1.5 bg-red-[#fdf2f2] text-[#9b1c1c] rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                data-dismiss-target="#alert-2"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
            <div className="flex gap-10 justify-between flex-col lg:flex-row">
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
                    savedPrevUrl={gameData.savedPreviewImage}
                    savedPrevType={gameData.savedPreviewImageType}
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

                {/* Game Features Section */}
                <div className="mt-6">
                  <span className="flex items-center gap-2 text-md font-medium text-jacarta-200">
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
                          <div className="relative group flex items-center">
                            <button className="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
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
                              className={`${
                                feature.label ===
                                "Currency Management & Exchange"
                                  ? "-left-[150px]"
                                  : "-left-[90px]"
                              } z-10 absolute top-full sm:left-1/2 transform sm:-translate-x-1/2 mb-2 w-max max-w-[280px] sm:max-w-[400px] px-2 py-1 text-sm text-white bg-jacarta-600 rounded shadow-lg pointer-events-none invisible group-hover:visible`}
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
                          />
                          <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent rounded-full peer dark:bg-jacarta-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
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
                  {renderError("gameName", formErrors)}
                </div>

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
                  {renderError("gameDescription", formErrors)}
                </div>

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
                    style={{ resize: "vertical", minHeight: "6rem" }}
                  />
                  {renderError("gameOpener", formErrors)}
                </div>

                {/* Opener MP3 */}
                <div>
                  <label className={labelStyling}>Opener MP3 (Optional)</label>
                  
                  {
                    gameData?.savedOpenerMp3&&(
                      <MusicPlayer
                        songUrl={gameData?.savedOpenerMp3}
                        title={"Opener Mp3"}
                      />
                    )
                  }
                  
                  <input
                    type="file"
                    accept="audio/*"
                    ref={chooseAudioRef}
                    onChange={handleAudioChange}
                    className="hidden w-[1rem]"
                  />
                  <div className="flex items-center gap-6 p-2 mt-2 mb-3 rounded-lg w-full border border-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white">
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
                    rows={10}
                    style={{ resize: "vertical", minHeight: "9.5rem" }}
                    placeholder="Describe your game world, characters, and story elements in detail. The more information you provide, the better your game will be."
                  />
                  <span className="text-sm text-nowrap">
                    {gameData.gamePrompt.length} characters
                  </span>
                  {renderError("gamePrompt", formErrors)}
                </div>
                <div className="mb-4 mt-4">
                <p>Select Narrator</p>
                <div className="relative">
                  <div 
                    className="w-full py-2 px-4 rounded-lg bg-jacarta-100 dark:bg-jacarta-600 text-jacarta-700 dark:text-white border-none focus:ring-2 focus:ring-accent cursor-pointer flex justify-between items-center"
                    onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)}
                  >
                    <span>{selectedVoice ? voices[Object.keys(voices).find(category => 
                      voices[category].some(voice => voice.id === selectedVoice)
                    )]?.find(voice => voice.id === selectedVoice)?.name || selectedVoice : "Select a voice"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                  </div>
                  
                  {voiceDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-jacarta-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {Object.entries(voices).map(([category, voiceList]) => (
                        <div key={category}>
                          <div className="px-4 py-2 font-semibold text-jacarta-500 dark:text-jacarta-300 bg-jacarta-50 dark:bg-jacarta-600">
                            {category}
                          </div>
                          {voiceList.map((voice) => (
                            <div 
                              key={voice.id} 
                              className="px-4 py-2 flex justify-between items-center hover:bg-jacarta-100 dark:hover:bg-jacarta-600 cursor-pointer"
                              onClick={() => {
                                setSelectedVoice(voice.id);
                                setVoiceDropdownOpen(false);
                              }}
                            >
                              <span className={`${selectedVoice === voice.id ? 'font-bold' : ''}`}>
                                {voice.name}
                              </span>
                              <button 
                                className="p-1 rounded-full bg-jacarta-100 dark:bg-jacarta-700 hover:bg-accent hover:text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const audio = new Audio(`https://storage.googleapis.com/kraken-4aa67.appspot.com/website_media/public/narrator_voices/${voice.id}.wav`);
                                  audio.play();
                                }}
                                type="button"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                </div>
              </div>
            </div>

            {/* Game Tags */}
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
                      onClick={() => handleTagChange(tag)}
                      className={`flex items-center justify-center border-2 cursor-pointer gap-2 px-3 py-2 rounded-3xl font-semibold hover:text-accent hover:border-accent-dark${
                        gameData.gameTags.includes(tag)
                          ? "bg-blue-500 text-accent border-accent-dark"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {gameData.gameTags.includes(tag) && (
                        <TbDeviceGamepad3 className="scale-in-center text-xl" />
                      )}
                      {tag}
                    </div>
                  ))}
                </div>
                {renderError("gameTags", formErrors)}
              </div>

              {/* Story Documents */}
              <div className="flex-1">
                <label className="flex items-center gap-2 text-md text-jacarta-200 font-medium">
                  <IoBookOutline className="text-accent text-xl" />
                  Story Documents
                </label>
                <div className="flex items-center gap-6 p-3 mt-2 rounded-lg w-full border border-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white">
                  {gameData.storyDocuments.length > 0 ||
                  gameData.savedStoryDocuments?.length > 0 ? (
                    <div className="mt-2 w-full">
                      <p className="text-sm font-medium mb-2 text-jacarta-300">
                        Selected files
                      </p>
                      <ul className="list-none flex flex-col gap-3 h-[11rem] w-full overflow-y-auto pr-2">
                        {gameData.storyDocuments.length > 0 &&
                          gameData.storyDocuments.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-start gap-1 text-sm text-gray-600"
                            >
                              <BiSolidGame className="basis-[5%] scale-in-center" />
                              <p className="basis-[85%]">{file.name}</p>
                              <button onClick={() => removeDocument(index)}>
                                <MdDeleteOutline className="text-red text-base" />
                              </button>
                            </li>
                          ))}
                        {gameData.savedStoryDocuments.length > 0 &&
                          gameData.savedStoryDocuments.map((doc) => (
                            <li
                              key={doc.id}
                              className="flex items-center justify-start gap-1 text-sm text-gray-600"
                            >
                              <BiSolidGame className="basis-[5%] scale-in-center" />
                              <p className="basis-[85%]">{doc.name}</p>
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline text-sm"
                              >
                                View
                              </a>
                              <button
                                onClick={() => removeSavedDocument(doc.id)}
                              >
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
              <div className="relative group flex items-center max-w-[150px]">
                <span className="flex items-center gap-2 text-md text-jacarta-200 font-medium">
                  <GiWorld className="text-xl text-accent" />
                  Locations
                </span>
                <button className="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
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
                <div className="z-10 absolute top-full left-1/2 transform -translate-x-1/2 sm:translate-x-0 max-w-[300px] mb-2 w-max sm:max-w-[400px] px-2 py-1 text-sm text-white bg-jacarta-600 rounded shadow-lg pointer-events-none invisible group-hover:visible">
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
                    id={`location-image-${index}`} // Unique ID for each input
                    accept="image/*"
                    onChange={(e) => handleLocationChange(index, "images", e)} // Pass correct index
                    className="w-[1rem] hidden"
                  />
                  {/* <MultipleImagePreviewEdit
                    files={location.images}
                    urls={location.savedImages}
                    onRemove={(imageIndex) =>
                      removeLocationImage(index, imageIndex)
                    }
                    onURLRemove={(imageIndex) =>
                      removeLocationImageUrl(index, imageIndex)
                    }
                  /> */}
                  <MultipleImageCardPreview
                    files={location.images}
                    savedFiles={location.savedImages}
                    setSelectedLocationImage={setSelectedLocationImage}
                    setSelectedLocation={setSelectedLocation}
                    elementIndex={index}
                    element="location"
                    setSelectedSavedImage={setSelectedSavedImage}
                    setSelectedElement={setSelectedElement}
                    setIsAdding={setIsAdding}
                    setSavedImage={setSavedImage}
                    onRemove={(imageIndex) =>
                      removeLocationImage(index, imageIndex)
                    }
                    onRemoveURL={(imageIndex) =>
                      removeLocationImageUrl(index, imageIndex)
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
                      } // Trigger specific input
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
                        className="text-nowrap bg-red bg-opacity-50"
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

            {/* NPCs Section */}
            <div>
              <div className="relative group flex items-center max-w-[150px]">
                <span className="flex items-center gap-2 text-md text-jacarta-200 font-medium">
                  <SiGhostery className="text-xl text-accent" />
                  Characters
                </span>
                <button className="px-2 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
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
                <div className="z-10 absolute top-full left-1/2 transform -translate-x-1/2 sm:translate-x-0 max-w-[300px] mb-2 w-max sm:max-w-[400px] px-2 py-1 text-sm text-white bg-jacarta-600 rounded shadow-lg pointer-events-none invisible group-hover:visible">
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
                    onChange={(e) => handleNPCChange(index, "images", e)} // Pass exact index
                    className="w-[1rem] hidden"
                  />
                  {/* <MultipleImagePreviewEdit
                    files={npc.images}
                    urls={npc.savedImages}
                    onRemove={(imageIndex) => removeNPCImage(index, imageIndex)}
                    onURLRemove={(imageIndex) =>
                      removeNPCImageURL(index, imageIndex)
                    }
                  /> */}
                  <MultipleImageCardPreview
                    files={npc.images}
                    savedFiles={npc.savedImages}
                    setSelectedNPCImage={setSelectedNPCImage}
                    setSelectedSavedImage={setSelectedSavedImage}
                    setSelectedNPC={setSelectedNPC}
                    elementIndex={index}
                    element="NPC"
                    setSelectedElement={setSelectedElement}
                    setIsAdding={setIsAdding}
                    setSavedImage={setSavedImage}
                    onRemoveURL={(imageIndex) =>
                      removeNPCImageURL(index, imageIndex)
                    }
                    onRemove={(imageIndex) => removeNPCImage(index, imageIndex)}
                  />
                  <div className="flex items-center gap-3 mt-2">
                    {/* <Button
                      size="sm"
                      className="ml-auto text-nowrap"
                      onClick={() =>
                        document.getElementById(`npc-image-${index}`).click()
                      } // Trigger specific input
                    >
                      <FaRegImages className="text-xl" />
                      Add Character images
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
                        Remove character
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
                Add more characters
              </Button>
            </div>
            {renderError("npcs", formErrors)}
            {renderError("npcsPlayable", formErrors)}

            {/* Submit Button */}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              onMouseOver={() => setTriggerJelloAnimation(true)}
              onMouseLeave={() => setTriggerJelloAnimation(false)}
              className={`mx-auto border-accent gap-3 glow text-white bg-transparent border-2 font-semibold tracking-wide rounded-md hover:bg-green-600 ${
                triggerJelloAnimations && "jello-horizontal"
              }`}
            >
              Edit Game{" "}
              <PiGameControllerFill className="text-3xl text-white jello-horizontal" />
            </Button>
          </form>
        </div>
      ) : (
        <div className="h-screen w-screen">
          <div className="flex flex-col gap-6 justify-center items-center center-fixed">
            <Loader />
            <p className="mt-4 text-white font-semibold text-xl text-center">
              {progress}
            </p>
          </div>
        </div>
      )}
      <ImageModal
        selectedData={
          selectedElement === "NPC"
            ? savedImage
              ? {
                  ...gameData.npcs?.[selectedNPC]?.savedImages?.[selectedSavedImage],
                  type: gameData.npcs?.[selectedNPC]?.savedImages?.[selectedSavedImage]?.url?.includes('youtube') ? 'youtube' : 'image',
                  youtubeUrl: gameData.npcs?.[selectedNPC]?.savedImages?.[selectedSavedImage]?.url?.includes('youtube') ? 
                    gameData.npcs?.[selectedNPC]?.savedImages?.[selectedSavedImage]?.url : ''
                }
              : gameData.npcs?.[selectedNPC]?.images?.[selectedNPCImage] ?? null
            : savedImage
            ? {
                ...gameData.locations?.[selectedLocation]?.savedImages?.[selectedSavedImage],
                type: gameData.locations?.[selectedLocation]?.savedImages?.[selectedSavedImage]?.url?.includes('youtube') ? 'youtube' : 'image',
                youtubeUrl: gameData.locations?.[selectedLocation]?.savedImages?.[selectedSavedImage]?.url?.includes('youtube') ? 
                  gameData.locations?.[selectedLocation]?.savedImages?.[selectedSavedImage]?.url : ''
              }
            : gameData.locations?.[selectedLocation]?.images?.[selectedLocationImage] ?? null
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

export default GameForm;
