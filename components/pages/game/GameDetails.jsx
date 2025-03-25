"use client";
import { useState, useEffect, useRef } from "react";
import Tabs from "./Tabs";
import { allItems } from "@/data/item";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Timer from "./Timer";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import PreviewMedia from "@/components/pages/game/PreviewMedia";
import useUserCookie from "@/hooks/useUserCookie";
import MusicPlayer from "@/components/pages/play/MusicPlayer";
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import CouponModal from "@/components/modals/CouponModal";

export default function GameDetails({ id }) {
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const user = useUserCookie();
  const router = useRouter();
  const [game, setGame] = useState();
  const [height, setHeight] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { profile } = useUser();

  const ref = useRef(null);

  // Get truncated opener text for social sharing
  const getSocialDescription = () => {
    if (!game?.game_opener) return '';
    return game.game_opener.substring(0, 160) + '...';
  };

  // Social share URLs
  const getShareUrls = () => {
    const url = encodeURIComponent(`${window.location.origin}/games/${id}`);
    const title = encodeURIComponent(game?.game_name || '');
    const description = encodeURIComponent(getSocialDescription());

    return {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}%20-%20${description}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`
    };
  };

  // Handle social share clicks
  const handleShare = (platform) => {
    const urls = getShareUrls();
    // Standard social media popup dimensions:
    // Twitter: 600x600
    // Facebook: 670x520  
    // LinkedIn: 600x600
    // WhatsApp: 550x600
    const dimensions = {
      twitter: 'width=600,height=600',
      facebook: 'width=670,height=520',
      linkedin: 'width=600,height=600',
      whatsapp: 'width=550,height=600'
    };
    window.open(urls[platform], '_blank', dimensions[platform]);
  };

  async function fetchGame(game_id) {
    console.log("Get game API called");
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/" + game_id
      );

      if (response.data && response.data.success) {
        const gameData = response.data.success.data;
        setGame(gameData);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  async function handlePurchaseGame(coupon_code){
    try{
      const response = await axiosInstance.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/payments/create-game-checkout/" + id + "/",
        {
          coupon_code: coupon_code
        }
      );
      window.location.href = response.data.session_url;
    }catch(err){
      toast.error("Error purchasing game");
    }
  }

  

  async function handleCreateCoupon(){
    console.log("Create coupon");
    try{
    const response = await axiosInstance.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/create-creator-coupon/",
      {
        game: id,
      }
    );
    if(response.data.success){
      toast.success("Coupon created");
      router.push("/wallet");
    }else{
      toast.error("Failed to create coupon");
    }
  } catch (err) {
    if(err.response.status === 403){
      toast.error(err.response.data.message);
    }else{
      toast.error("Failed to create coupon");
    }
  }
  }

  useEffect(() => {
    fetchGame(id);
  }, []);

  useEffect(() => {
    if (game && !game?.published) {
      console.log("Profile initilized",profile);
      // If game is not published and user is not logged in, redirect
      if (!profile) {
        toast.error("Game access denied");
        router.push(`/games`);
      }
      // If game is not published and user is logged in but not the creator, redirect
      else if (game?.user.user_id !== profile?.user_id) {
        toast.error("Game access denied"); 
        router.push(`/games`);
      }
    }
  }, [game]);

  useEffect(() => {
    setLikesCount(Math.floor(Math.random() * 51) + 50);
  }, []);

  async function handleDeleteGame() {
    console.log("delete game API called");
    
    // Add confirmation dialog
    if (!confirm("Are you sure you want to delete this game? This action cannot be undone.")) {
        return;
    }

    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/" + id+"/")
        const response = await axiosInstance.delete(process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/" + id+"/");

        if (response.data && response.data.success) {
            toast.success("Game deleted successfully");
            router.push('/profile');
        } else {
            toast.error("Failed to delete game");
        }
    } catch (err) {
        toast.error("Error deleting game");
    }
  }


  const components = {
    // @ts-expect-error
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        // @ts-expect-error
        <pre
          {...props}
          className={`${className} text-sm w-[80dvw] md:max-w-[500px] overflow-x-scroll bg-zinc-100 p-3 rounded-lg mt-2 dark:bg-zinc-800`}
        >
          <code className={match[1]}>{children}</code>
        </pre>
      ) : (
        <code
          className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
          {...props}
        >
          {children}
        </code>
      );
    },
    ol: ({ node, children, ...props }) => {
      return (
        <ol className="list-decimal list-outside ml-4" {...props}>
          {children}
        </ol>
      );
    },
    li: ({ node, children, ...props }) => {
      return (
        <li className="py-1" {...props}>
          {children}
        </li>
      );
    },
    ul: ({ node, children, ...props }) => {
      return (
        <ul className="list-decimal list-outside ml-4" {...props}>
          {children}
        </ul>
      );
    },
    strong: ({ node, children, ...props }) => {
      return (
        <span className="font-semibold" {...props}>
          {children}
        </span>
      );
    },
    // a: ({ node, children, ...props }) => {
    //   return (
    //     // @ts-expect-error
    //     <Link
    //       className="text-blue-500 hover:underline"
    //       target="_blank"
    //       rel="noreferrer"
    //       {...props}
    //     >
    //       {children}
    //     </Link>
    //   );
    // },
    h1: ({ node, children, ...props }) => {
      return (
        <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ node, children, ...props }) => {
      return (
        <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ node, children, ...props }) => {
      return (
        <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
          {children}
        </h3>
      );
    },
    h4: ({ node, children, ...props }) => {
      return (
        <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
          {children}
        </h4>
      );
    },
    h5: ({ node, children, ...props }) => {
      return (
        <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
          {children}
        </h5>
      );
    },
    h6: ({ node, children, ...props }) => {
      return (
        <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
          {children}
        </h6>
      );
    },
  };

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, [game, mediaLoaded]);
  return (
    <>
      <Head>
        <meta property="og:title" content={game?.game_name} />
        <meta property="og:description" content={getSocialDescription()} />
        <meta property="og:image" content={game?.preview_image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={game?.game_name} />
        <meta name="twitter:description" content={getSocialDescription()} />
        <meta name="twitter:image" content={game?.preview_image} />
      </Head>

      <section className="relative pt-12 pb-24 lg:py-24">
        <CouponModal game={game} onPurchase={handlePurchaseGame}/>
        <div className="container">
          {/* Item */}
          <div className="md:flex md:flex-wrap mb-8">
            {/* Image */}
            <figure className="md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2">
              <div ref={ref}>
                <div className="mb-3 flex">
                  {/* Collection */}
                  <div className="flex items-center">
                    {!game?.is_free&&<>
                    <span className="dark:text-white mr-2">Paid</span>
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                        data-tippy-content="Verified Collection"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-[.875rem] w-[.875rem] fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                    </>}
                  </div>

                  {/* Likes / Actions */}
                  <div className="ml-auto flex space-x-2">
                    {/* Share Button */}
                    <div className="dropdown rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                      <button
                        className="dropdown-toggle inline-flex h-10 w-10 items-center justify-center text-sm"
                        role="button"
                        id="shareDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="fill-jacarta-500 dark:fill-jacarta-200" viewBox="0 0 16 16">
                          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                        </svg>
                      </button>
                      <div className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800" aria-labelledby="shareDropdown">
                        <button onClick={() => handleShare('twitter')} className="flex w-full items-center gap-2 rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                          <FaTwitter size={16} className="text-[#1DA1F2]" />
                          Share on Twitter
                        </button>
                        <button onClick={() => handleShare('facebook')} className="flex w-full items-center gap-2 rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                          <FaFacebook size={16} className="text-[#4267B2]" />
                          Share on Facebook
                        </button>
                        <button onClick={() => handleShare('linkedin')} className="flex w-full items-center gap-2 rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                          <FaLinkedin size={16} className="text-[#0077b5]" />
                          Share on LinkedIn
                        </button>
                        <button onClick={() => handleShare('whatsapp')} className="flex w-full items-center gap-2 rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                          <FaWhatsapp size={16} className="text-[#25D366]" />
                          Share on WhatsApp
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 rounded-xl border border-jacarta-100 bg-white py-2 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
                      <span
                        className="js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('../img/heart-fill.svg')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                        data-tippy-content="Favorite"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-4 w-4 fill-jacarta-500 hover:fill-red dark:fill-jacarta-200 dark:hover:fill-red"
                        >
                          <path fill="none" d="M0 0H24V24H0z"></path>
                          <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"></path>
                        </svg>
                      </span>
                      <span className="text-sm dark:text-jacarta-200">
                        {game ? (game.message_count_seed + game.total_interactions) : '-'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="dropdown rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
                      <a
                        href="#"
                        className="dropdown-toggle inline-flex h-10 w-10 items-center justify-center text-sm"
                        role="button"
                        id="collectionActions"
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
                          <circle cx="2" cy="2" r="2"></circle>
                          <circle cx="8" cy="2" r="2"></circle>
                          <circle cx="14" cy="2" r="2"></circle>
                        </svg>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-end z-10 hidden min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                        aria-labelledby="collectionActions"
                      >
                        {game?.user?.user_id === profile?.user_id && (
                          <>
                            <Link
                              href={`/games/${id}/edit`}
                              className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Edit Game
                            </Link>
                            <button 
                              onClick={() => handleDeleteGame()}
                              className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Delete Game
                            </button>

                          </>
                        )}
                        {!game?.is_free && (
                          <>
                            <hr className="my-2 mx-4 h-px border-0 bg-jacarta-100 dark:bg-jacarta-600" />

                            <button 
                              onClick={handleCreateCoupon}
                              className="block w-full rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                              Create coupon
                            </button>
                          </>
                        )}

                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="mb-4 font-display text-4xl font-semibold text-jacarta-700 dark:text-white">
                  {game?.game_name}
                </h1>

                <p className="mb-4 dark:text-jacarta-300">
                  {game?.description}
                </p>

                <PreviewMedia
                  musicUrl={game?.opener_mp3}
                  mediaUrl={game?.preview_image}
                  mediaType={game?.preview_image_type}
                  alt="Game Preview"
                  onLoad={() => setMediaLoaded(true)}
                />

                {/* Bid */}
                <div className="rounded-2lg border border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700 mt-4">
                  <div className="mb-8 flex flex-wrap gap-4 md:gap-0">
                    {/* Highest bid */}
                    <div className="lg:w-1/2 pr-4 lg:pr-8">
                      <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="text-sm text-jacarta-400 dark:text-jacarta-300">
                          Creator of game{" "}
                        </span>
                      </div>
                      <div className="mt-3 flex">
                        <figure className="mr-4 shrink-0">
                            <Image
                              width={48}
                              height={48}
                              src={
                                game?.user.profile_photo ||
                                "/img/avatars/avatar_4.jpg"
                              }
                              alt="avatar"
                              className="rounded-2lg"
                              style={{
                                color: "transparent",
                                visibility: "visible",
                              }}
                              priority={true}
                            />
                        </figure>
                        <div>
                          <span className="text-sm text-jacarta-400 dark:text-jacarta-300">
                            {game?.user.username}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Countdown */}
                    {/* <div className="dark:border-jacarta-600 lg:w-1/2 sm:border-l sm:border-jacarta-100 pl-4 lg:pl-8">
                      <span className="js-countdown-ends-label text-sm text-jacarta-400 dark:text-jacarta-300">
                        Free Trial
                      </span>
                      <Timer />
                    </div> */}
                  </div>
                  
                  {
                    game?.user.user_id === profile?.user_id ? (
                      <a
                        href={`/games/${game?.game_id}/play`}
                        className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                      >
                        Play Game
                      </a>
                    ) : game?.is_free || game?.is_purchased ? (
                      <a
                        href={user ? `/games/${game?.game_id}/play` : undefined}
                        data-bs-toggle={!user ? "modal" : undefined}
                        data-bs-target={!user ? "#loginModal" : undefined}
                        className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                      >
                        Play Game
                      </a>
                    ) : (
                      <button
                        data-bs-toggle="modal"
                        data-bs-target={user ? "#couponModal" : "#loginModal"}
                        className="flex items-center justify-center gap-2 w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                      >
                        <svg className="fill-white" height="15px" width="15px" version="1.1" id="Layer_1" viewBox="0 0 330 330" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"></path> </g> </g></svg>

                        <span className="pt-1">
                          Unlock Game for ${game?.price}
                        </span>
                      </button>
                    )
                  }
                </div>
                {/* end bid */}

                {/* Modal */}
                <div
                  className="modal fade"
                  id="imageModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog !my-0 flex h-full items-center justify-center p-4">
                    {game?.preview_image && (
                      <Image
                        width={787}
                        height={984}
                        src={game?.preview_image}
                        alt="item"
                      />
                    )}
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
              </div>
            </figure>

            {/* Details */}
            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              <div
                style={{
                  height: game?.opener_mp3
                    ? `calc(${height}px - 90px )`
                    : `${height}px`,
                }}
                className="px-6 py-8 dark:text-white rounded-2lg border border-jacarta-100 bg-white dark:border-jacarta-600 dark:bg-jacarta-700 overflow-y-auto"
              >
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  components={components}
                  breaks={true}
                  skipHtml={false}
                >
                  {game?.game_opener?.replace(/\n/g, "  \n")}
                </ReactMarkdown>
              </div>
              {/* Collection / Likes / Actions */}

              {game?.opener_mp3 && (
                <div className="mt-[10px]">
                  <MusicPlayer
                    songUrl={game?.opener_mp3}
                    title={"Opener Mp3"}
                  />
                </div>
              )}
            </div>
            {/* end details */}
          </div>

          {/* Tabs */}
          <Tabs game={game} />
          {/* end tabs */}
        </div>
      </section>
    </>
  );
}
