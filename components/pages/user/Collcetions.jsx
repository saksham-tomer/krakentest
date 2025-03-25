"use client";
import { useritems } from "@/data/item";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import tippy from "tippy.js";

import { collections3 } from "@/data/collections";
import Activity from "./Activity";
import Link from "next/link";
import Image from "next/image";
import Post from "../case-studies/Post";
import { useParams } from "next/navigation";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import PreviewMedia from "@/components/games/PreviewMedia";
import { toast } from "react-toastify";
import PublishModal from "@/components/modals/PublishModal";
import RenameGameModal from "@/components/modals/RenameGameModal"



export default function Collcetions({userID}) {
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const [allItems, setAllItems] = useState(useritems);
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null);
  const [isCloning, setIsCloning] = useState(false);
  
  const router = useRouter();



  async function fetchGames(){
    console.log("Get games API called");
    try {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_BACKEND_URL+"/ai-games/games/all");
      console.log(response);
  
      // Access the data using the assumed structure: response.data.success.data
      if (response.data && response.data.success) {
        setGames(response.data.success.data);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  async function publishGame(game_id, paid, price){
    try {
      const response = await axiosInstance.post(process.env.NEXT_PUBLIC_BACKEND_URL+"/ai-games/games/"+game_id+"/publish", {
        paid,
        price
      });
  
      if (response.data && response.data.success) {
        toast.success("Game published")
        setSelectedGame(null)
        fetchGames()
      } else {
        toast.error("Unexpected response structure:", response);
      }
    } catch (err) {
      toast.error("Error fetching profile:", err);
    }
  }

  async function renameGame(game_id, game_name) {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai-games/games/${game_id}/rename`,
        { game_name }
      );

      if (response.data && response.data.success) {
        toast.success("Game renamed successfully");
        fetchGames();
      } else {
        toast.error("Failed to rename game");
      }
    } catch (err) {
      toast.error("Error renaming game");
    }
  }

  async function handleGamePublish(paid, price){
    publishGame(selectedGame.game_id, paid, price)
  }

  async function unpublishGame(game_id){
    console.log("publush game API called");
    try {
      const response = await axiosInstance.post(process.env.NEXT_PUBLIC_BACKEND_URL+"/ai-games/games/"+game_id+"/unpublish");
  
      if (response.data && response.data.success) {
        toast.success("Game unpublished")
        fetchGames()
      } else {
        toast.error("Unexpected response structure:", response);
      }
    } catch (err) {
      toast.error("Error fetching profile:", err);
    }
  }

  async function deleteGame(game_id) {
    console.log("delete game API called");
    
    // Add confirmation dialog
    if (!confirm("Are you sure you want to delete this game? This action cannot be undone.")) {
        return;
    }

    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/" + game_id+"/")
        const response = await axiosInstance.delete(process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/" + game_id+"/");

        if (response.data && response.data.success) {
            toast.success("Game deleted successfully");
            fetchGames(); // Refresh the games list
        } else {
            toast.error("Failed to delete game");
        }
    } catch (err) {
        toast.error("Error deleting game");
    }
  }

  async function cloneGame(game_id) {
    console.log("clone game API called");
    setIsCloning(true);
    
    try {
      const response = await axiosInstance.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/game/clone", {
        game_id: game_id
      });

      if (response.data && response.data.success) {
        toast.success("Game cloned successfully");
        fetchGames(); // Refresh the games list
      } else {
        toast.error("Failed to clone game");
      }
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.error.message) {
        toast.error(err.response.data.error.message);
      } else {
        toast.error("Error cloning game elsee");
      }
    } finally {
      setIsCloning(false);
    }
  }

  async function handleGameUnpublish(game_id){
    unpublishGame(game_id)
  }

  useEffect(()=>{
    fetchGames();
  },[])

  const params = useParams();

  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);
  const addLike = (id) => {
    const items = [...allItems];
    const item = items.filter((elm) => elm.id == id)[0];
    const indexToReplace = items.findIndex((item) => item.id === id);
    if (!item.liked) {
      item.liked = true;
      item.likes += 1;
      items[indexToReplace] = item;
      setAllItems(items);
    } else {
      item.liked = false;
      item.likes -= 1;
      items[indexToReplace] = item;
      setAllItems(items);
    }
  };

  function formatDate(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }

  return (
    <section className="relative py-24 pt-20">
      <RenameGameModal onRename={renameGame} game={selectedGame}/>
      {isCloning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-accent py-4 text-center text-white">
          <div className="flex items-center justify-center">
            <span>Duplicating game...</span>
            <svg className="animate-spin h-5 w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )}
      <PublishModal game={selectedGame} onPublish={handleGamePublish}/>

      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        {/* Tabs Nav */}
        <ul
          className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center"
          role="tablist"
        >
          {/* <li className="nav-item" role="presentation">
            <button
              className="nav-link active relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
              id="on-sale-tab"
              data-bs-toggle="tab"
              data-bs-target="#on-sale"
              type="button"
              role="tab"
              aria-controls="on-sale"
              aria-selected="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm4.5 9H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z" />
              </svg>
              <span className="font-display text-base font-medium">About</span>
            </button>
          </li> */}
          {params.worldID && (
            <li className="nav-item" role="presentation">
              <button
                className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
                id="collections-tab"
                data-bs-toggle="tab"
                data-bs-target="#collections"
                type="button"
                role="tab"
                aria-controls="collections"
                aria-selected="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="mr-1 h-5 w-5 fill-current"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z" />
                </svg>
                <span className="font-display text-base font-medium">
                  Characters
                </span>
              </button>
            </li>
          )}

          {userID && (
            <>
              <li className="nav-item" role="presentation">
                <button
                  className="active nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
                  id="owned-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#owned"
                  type="button"
                  role="tab"
                  aria-controls="owned"
                  aria-selected="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="mr-1 h-5 w-5 fill-current"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm9 8h3l-4 4-4-4h3V9h2v4z" />
                  </svg>
                  <span className="font-display text-base font-medium">
                    Owned Games
                  </span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white"
                  id="created-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#created"
                  type="button"
                  role="tab"
                  aria-controls="created"
                  aria-selected="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="mr-1 h-5 w-5 fill-current"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M5 5v3h14V5H5zM4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" />
                  </svg>
                  <span className="font-display text-base font-medium">
                    Published Games ({games.filter((game) => game.published == true).length})
                  </span>
                </button>
              </li>
            </>
          )}
        </ul>

        <div className="tab-content">
          {/* On Sale Tab */}
          {/* <div
            className="tab-pane fade show active"
            id="on-sale"
            role="tabpanel"
            aria-labelledby="on-sale-tab"
          >
            <Post />
          </div> */}
          {/* end on sale tab */}

          {/* Owned Tab */}
          <div
            className="tab-pane fade show active"
            id="owned"
            role="tabpanel"
            aria-labelledby="owned-tab"
          >
            {/* Filters */}
            {/* <Filter /> */}
            {/* end filters */}

            {/* Grid */}
            <div className="flex flex-wrap gap-6 justify-center">
              {games
                // .filter((elm) => elm.type == "owned")
                .map((game, i) => (
                  <article key={i}>
                    <div className="w-[270px] max-w-[270px] block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                      <figure className="relative">
                        <Link href={`/games/${game.game_id}`}>
                        <PreviewMedia
                          musicUrl={game.opener_mp3}
                          mediaUrl={game.preview_image}
                          mediaType={game.preview_image_type}
                          alt="Game Preview"
                        />
                        </Link>
                        {!game.is_free && (
                          <span className="absolute top-3 left-3 bg-jacarta-700 text-white text-xs px-2 py-1 rounded shadow-md backdrop-blur-sm bg-opacity-90">
                            Paid
                          </span>
                        )}
                        <span className="text-jacarta-400 text-xs">{game.created_at ? formatDate(game.created_at) : ""}</span>

                        {/* <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2 dark:bg-jacarta-700">
                          <span
                            onClick={() => addLike(elm.id)}
                            className={`js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('../img/heart-fill.svg')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 ${
                              elm.liked ? "js-likes--active" : ""
                            }`}
                            data-tippy-content="Favorite"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="h-4 w-4 fill-jacarta-500 hover:fill-red dark:fill-jacarta-200 dark:hover:fill-red"
                            >
                              <path fill="none" d="M0 0H24V24H0z" />
                              <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                            </svg>
                          </span>
                          <span className="text-sm dark:text-jacarta-200">
                            {elm.likes}
                          </span>
                        </div> */}
                        {/* <div className="absolute left-3 -bottom-3">
                          <div className="flex -space-x-2">
                            <a href="#">
                              <Image
                                width={24}
                                height={24}
                                src={game.creatorAvatar}
                                alt="creator"
                                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                                data-tippy-content="Creator: Sussygirl"
                              />
                            </a>
                            <a href="#">
                              <Image
                                width={24}
                                height={24}
                                src={elm.ownerAvatar}
                                alt="owner"
                                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                                data-tippy-content="Owner: Sussygirl"
                              />
                            </a>
                          </div>
                        </div> */}
                      </figure>
                      <div className="mt-4 flex items-center justify-between">
                        <Link href={`/games/${game.game_id}`}>
                          <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                            {game.game_name.length>30?game.game_name.slice(0,30)+"...":game.game_name}
                          </span>
                        </Link>
                        <div className="dropup rounded-full hover:bg-jacarta-100 dark:hover:bg-jacarta-600">
                          <a
                            href="#"
                            className="dropdown-toggle inline-flex h-8 w-8 items-center justify-center text-sm"
                            role="button"
                            id="itemActions"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <svg
                              width="16"
                              height="4"
                              viewBox="0 0 16 4"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-jacarta-500 dark:fill-jacarta-200"
                            >
                              <circle cx="2" cy="2" r="2" />
                              <circle cx="8" cy="2" r="2" />
                              <circle cx="14" cy="2" r="2" />
                            </svg>
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                            aria-labelledby="itemActions"
                          >
                            {!game.published ? (
                            <button 
                              className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                              data-bs-toggle="modal"
                              data-bs-target="#publishModal"
                              onClick={()=>setSelectedGame(game)}
                            >
                              Publish
                            </button>
                            ):(
                            <button 
                            className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                            onClick={()=>handleGameUnpublish(game.game_id)}
                            >
                              Unpublish
                            </button>
                            )}
                            <hr className="my-2 mx-4 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />
                            <Link
                              href={`/games/${game?.game_id}/edit`}
                              className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                            >
                              Edit
                            </Link>
                            <button 
                              className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                              data-bs-toggle="modal"
                              data-bs-target="#renameGameModal"
                              onClick={()=>setSelectedGame(game)}
                            >
                              Rename
                            </button>
                            <button 
                              className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                              onClick={() => {
                                if(confirm("Are you sure you want to duplicate this game?")) {
                                  cloneGame(game.game_id)
                                }
                              }}
                            >
                              <span>Duplicate</span>
                            </button>
                            <button 
                              className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                              onClick={()=>deleteGame(game.game_id)}
                            >
                              Delete
                            </button>
                            
                            {/* <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Refresh Metadata
                            </button>
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Share
                            </button>
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Report
                            </button> */}
                          </div>
                        </div>
                      </div>
                      {/* <div className="mt-2 text-sm">
                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                          {elm.price}
                        </span>
                        <span className="text-jacarta-500 dark:text-jacarta-300">
                          {elm.bidCount}
                        </span>
                      </div> */}

                      <div className="mt-2 flex items-center justify-between">

                        <p className="text-sm text-jacarta-700 min-h-[54px] hover:text-accent dark:text-white">
                          {game.description.length>70? game.description.substring(0,70)+'...':game.description}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        {/* <button
                          className="font-display text-sm font-semibold text-accent"
                          data-bs-toggle="modal"
                          data-bs-target="#buyNowModal"
                        >
                          Preview
                        </button> */}


                      
                      <a
                        href={`/games/${game?.game_id}/play`}
                        className="px-3 py-2 text-sm flex items-center justify-center gap-2 rounded bg-accent-dark text-white font-medium tracking-wider focus:border-none focus:outline-none disabled:bg-opacity-75 disabled:text-opacity-75 disabled:cursor-not-allowed "
                      >
                        Preview
                        </a>
                      
                      </div>
                    </div>
                  </article>
                ))}
            </div>
            {/* end grid */}
          </div>
          {/* end owned tab */}

          {/* Created Tab */}
          <div
            className="tab-pane fade"
            id="created"
            role="tabpanel"
            aria-labelledby="created-tab"
          >
            {/* Filters */}
            {/* <Filter /> */}
            {/* end filters */}

            {/* Grid */}
            <div className="flex flex-wrap gap-6">
              {games
                .filter((game) => game.published == true)
                .map((game, i) => (
                  <article key={i}>
                    <div className="w-[270px] max-w-[270px] block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                      <figure className="relative">
                        <Link href={`/games/${game.game_id}`}>
                        {/* <PreviewMedia
                          musicUrl={game.opener_mp3}
                          media={game.preview_image}
                          alt={"Game preview"}
                          width={230}
                          height={230}
                        /> */}
                        <PreviewMedia
                          musicUrl={game.opener_mp3}
                          mediaUrl={game.preview_image}
                          mediaType={game.preview_image_type}
                          alt="Game Preview"
                        />
                        {!game.is_free && (
                          <span className="absolute top-3 left-3 bg-jacarta-700 text-white text-xs px-2 py-1 rounded shadow-md backdrop-blur-sm bg-opacity-90">
                            Paid
                          </span>
                        )}
                          {/* <Image
                            width={230}
                            height={230}
                            src={game.preview_image}
                            alt="item 5"
                            className="w-[230px] h-[230px] object-cover rounded-[0.625rem]"
                            loading="lazy"
                          /> */}
                        </Link>
                        <span className="text-jacarta-400 text-xs">{game.created_at?formatDate(game.created_at):""}</span>

                        {/* <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2 dark:bg-jacarta-700">
                          <span
                            onClick={() => addLike(elm.id)}
                            className={`js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('../img/heart-fill.svg')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 ${
                              elm.liked ? "js-likes--active" : ""
                            }`}
                            data-tippy-content="Favorite"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="h-4 w-4 fill-jacarta-500 hover:fill-red dark:fill-jacarta-200 dark:hover:fill-red"
                            >
                              <path fill="none" d="M0 0H24V24H0z" />
                              <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                            </svg>
                          </span>
                          <span className="text-sm dark:text-jacarta-200">
                            {elm.likes}
                          </span>
                        </div> */}
                        {/* <div className="absolute left-3 -bottom-3">
                          <div className="flex -space-x-2">
                            <a href="#">
                              <Image
                                width={24}
                                height={24}
                                src={game.creatorAvatar}
                                alt="creator"
                                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                                data-tippy-content="Creator: Sussygirl"
                              />
                            </a>
                            <a href="#">
                              <Image
                                width={24}
                                height={24}
                                src={elm.ownerAvatar}
                                alt="owner"
                                className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                                data-tippy-content="Owner: Sussygirl"
                              />
                            </a>
                          </div>
                        </div> */}
                      </figure>
                      <div className="mt-4 flex items-center justify-between">
                        <Link href={`/games/${game.game_id}`}>
                          <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                            {game.game_name.length>30?game.game_name.slice(0,30)+"...":game.game_name}
                          </span>
                        </Link>
                        <div className="dropup rounded-full hover:bg-jacarta-100 dark:hover:bg-jacarta-600">
                          <a
                            href="#"
                            className="dropdown-toggle inline-flex h-8 w-8 items-center justify-center text-sm"
                            role="button"
                            id="itemActions"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <svg
                              width="16"
                              height="4"
                              viewBox="0 0 16 4"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-jacarta-500 dark:fill-jacarta-200"
                            >
                              <circle cx="2" cy="2" r="2" />
                              <circle cx="8" cy="2" r="2" />
                              <circle cx="14" cy="2" r="2" />
                            </svg>
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                            aria-labelledby="itemActions"
                          >
                            <button 
                            className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                            onClick={()=>handleGameUnpublish(game.game_id)}
                            >
                              Unpublish
                            </button>
                            <hr className="my-2 mx-4 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Edit
                            </button>
                            
                            {/* <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Refresh Metadata
                            </button>
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Share
                            </button>
                            <button className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Report
                            </button> */}
                          </div>
                        </div>
                      </div>
                      {/* <div className="mt-2 text-sm">
                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                          {elm.price}
                        </span>
                        <span className="text-jacarta-500 dark:text-jacarta-300">
                          {elm.bidCount}
                        </span>
                      </div> */}

                      <div className="mt-2 flex items-center justify-between">

                        <p className="text-sm text-jacarta-700 min-h-[54px] hover:text-accent dark:text-white">
                          {game.description.length>70? game.description.substring(0,70)+'...':game.description}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                        {/* <button
                          className="font-display text-sm font-semibold text-accent"
                          data-bs-toggle="modal"
                          data-bs-target="#buyNowModal"
                        >
                          Preview
                        </button> */}



                      <Button
                        size="sm"
                        className="text-nowrap"
                        onClick={()=>{}}
                      >
                        Play
                      </Button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
            {/* end grid */}
          </div>
          {/* end created tab */}

          {/* Collections Tab */}
          <div
            className="tab-pane fade"
            id="collections"
            role="tabpanel"
            aria-labelledby="collections-tab"
          >
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
              {collections3.slice(0, 4).map((elm, i) => (
                <article key={i}>
                  <div className="rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                    <Link
                      href={`/character/1`}
                      className="flex space-x-[0.625rem]"
                    >
                      <span className="w-full">
                        <Image
                          width={152}
                          height={242}
                          src={elm.images[0]}
                          alt="item 1"
                          className="h-full w-full rounded-[0.625rem] object-cover"
                          loading="lazy"
                        />
                      </span>
                    </Link>

                    <Link
                      href={`/collection/${elm.id}`}
                      className="mt-4 block font-display text-base text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent"
                    >
                      {elm.name}
                    </Link>

                    <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                      <div className="flex flex-wrap items-center">
                        <Link
                          href={`/user/${elm.id}`}
                          className="mr-2 shrink-0"
                        >
                          <Image
                            width={20}
                            height={20}
                            src={elm.avatar}
                            alt="owner"
                            className="h-5 w-5 rounded-full"
                          />
                        </Link>
                        <span className="mr-1 dark:text-jacarta-400">by</span>
                        <Link href={`/user/${elm.id}`} className="text-accent">
                          <span>{elm.ownerName}</span>
                        </Link>
                      </div>
                      <span className="text-sm dark:text-jacarta-300">
                        {elm.itemCount} Items
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          {/* end collections tab */}

          {/* Activity Tab */}
          <div
            className="tab-pane fade"
            id="activity"
            role="tabpanel"
            aria-labelledby="activity-tab"
          >
            <Activity />
          </div>
          {/* end activity tab */}
        </div>
      </div>
    </section>
  );
}
