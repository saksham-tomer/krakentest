"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"; // Supports GitHub-flavored markdown
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import { toast } from "react-toastify";
import { useUser } from '@/contexts/UserContext';

export default function Message({
  message,
  character_avatar,
  user_avatar,
  scrollToBottom,
  diceRolling,
  selectedVoice
}) {

  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const { getProfile } = useUser();

  const [isProcessingTTS, setIsProcessingTTS] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleTextToSpeech = async () => {
    try {
      if (audioUrl) {
        // If audio exists, toggle play/pause
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          await audio.play(); 
          setIsPlaying(true);
        }
        return;
      }

      setIsProcessingTTS(true);

      // Call backend to deduct points first
      const pointsResponse = await axiosInstance.post(process.env.NEXT_PUBLIC_BACKEND_URL+'/points/deduct', {
        action: 'tts'
      });

      if (!pointsResponse.data) {
        toast.error('Failed to process text to speech');
        setIsProcessingTTS(false);
        return;
      }

      getProfile(); // update game points

      console.log(message.content)

      // Remove markdown headers and content between curly braces
      const cleanText = message.content
        .replace(/#{1,6}\s+/g, '') // Remove markdown headers
        .replace(/\{\{[^}]+\}\}/g, '') // Remove content between double curly braces
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\*/g, ''); // Remove asterisks

      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: cleanText,
          voice: selectedVoice
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to convert text to speech");
      }
      setIsProcessingTTS(false);

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const audioElement = new Audio(url);
      audioElement.addEventListener("ended", () => {
        setIsPlaying(false);
      });
      setAudio(audioElement);
      await audioElement.play();
      setIsPlaying(true);

    } catch (error) {
      console.error("Error converting text to speech:", error);
      toast.error(error.response?.data?.message || 'Failed to process text to speech');
      setIsProcessingTTS(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
    return () => {
      // Cleanup audio resources when component unmounts
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

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
        <ul className="list-disc list-outside ml-4" {...props}>
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
    p: ({ node, children, ...props }) => {
      // Check if any parent element is a list item
      const isInsideListItem = (node) => {
        if (!node) return false;
        if (node.type === 'element' && node.tagName === 'li') return true;
        return node.parent ? isInsideListItem(node.parent) : false;
      };
      
      return (
        <p 
          className={`${isInsideListItem(node) ? '' : 'mb-4'}`} 
          {...props}
        >
          {children}
        </p>
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
    scrollToBottom();
  }, []);

  if (message.sent_by_user && diceRolling) {
    return;
  }

  return (
    <div
      className={`flex mb-4 py-4 ${
        message.sent_by_user ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar */}
      {!message.sent_by_user && (
        <div className="w-8 h-8 rounded-full  overflow-hidden flex items-center justify-center">
          <Image
            src={character_avatar}
            alt="Character Avatar"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      )}

      {/* Message Content */}
      <div className={`${message.sent_by_user ? "max-w-xl":"w-full"}`}>
        {message.type !== "image" && (
          <div>
            <div
              className={`${GeistSans.className} px-3 py-2 rounded-xl ${
                message.sent_by_user
                  ? "bg-accent text-white"
                  : "bg-transparent text-jacarta-700 dark:text-white"
              }`}
            >
              {message.content === "Thinking..." && !message.sent_by_user ? (
                <div className="flex items-center justify-start gap-2 h-full mb-4">
                  <div className="w-3 h-3 bg-accent dark:bg-purple-500 rounded-full animate-[bounce_0.8s_infinite_0ms] hover:bg-purple-600"></div>
                  <div className="w-3 h-3 bg-purple-500 dark:bg-accent rounded-full animate-[bounce_0.8s_infinite_200ms] hover:bg-accent"></div>
                  <div className="w-3 h-3 bg-accent dark:bg-purple-500 rounded-full animate-[bounce_0.8s_infinite_400ms] hover:bg-purple-600"></div>
                  <div className="w-3 h-3 bg-purple-500 dark:bg-accent rounded-full animate-[bounce_0.8s_infinite_600ms] hover:bg-accent"></div>
                </div>
              ) : (
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]} 
                  components={components}
                  breaks={true}
                  skipHtml={false}
                >
                  {message.content?.replace(/\n/g, "  \n")}
                </ReactMarkdown>
              )}
            </div>

            {!message.sent_by_user && (
              <div className="flex flex-row gap-2 ml-3">
                {/* <button
                  className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground py-1 px-2 h-fit text-muted-foreground dark:text-[#999] hover:text-white dark:hover:text-white"
                  data-state="closed"
                >
                  <svg
                    height="16"
                    stroke-linejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    style={{ color: "currentColor" }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>

                <button
                  className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground py-1 px-2 h-fit text-muted-foreground !pointer-events-auto dark:text-[#999] hover:text-white dark:hover:text-white"
                  data-state="closed"
                >
                  <svg
                    height="16"
                    stroke-linejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    style={{ color: "currentColor" }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.89531 2.23972C6.72984 2.12153 6.5 2.23981 6.5 2.44315V5.25001C6.5 6.21651 5.7165 7.00001 4.75 7.00001H2.5V13.5H12.1884C12.762 13.5 13.262 13.1096 13.4011 12.5532L14.4011 8.55318C14.5984 7.76425 14.0017 7.00001 13.1884 7.00001H9.25H8.5V6.25001V3.51458C8.5 3.43384 8.46101 3.35807 8.39531 3.31114L6.89531 2.23972ZM5 2.44315C5 1.01975 6.6089 0.191779 7.76717 1.01912L9.26717 2.09054C9.72706 2.41904 10 2.94941 10 3.51458V5.50001H13.1884C14.9775 5.50001 16.2903 7.18133 15.8563 8.91698L14.8563 12.917C14.5503 14.1412 13.4503 15 12.1884 15H1.75H1V14.25V6.25001V5.50001H1.75H4.75C4.88807 5.50001 5 5.38808 5 5.25001V2.44315Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>

                <button
                  className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground py-1 px-2 h-fit text-muted-foreground !pointer-events-auto dark:text-[#999] hover:text-white dark:hover:text-white"
                  data-state="closed"
                >
                  <svg
                    height="16"
                    stroke-linejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    style={{ color: "currentColor" }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.89531 13.7603C6.72984 13.8785 6.5 13.7602 6.5 13.5569V10.75C6.5 9.7835 5.7165 9 4.75 9H2.5V2.5H12.1884C12.762 2.5 13.262 2.89037 13.4011 3.44683L14.4011 7.44683C14.5984 8.23576 14.0017 9 13.1884 9H9.25H8.5V9.75V12.4854C8.5 12.5662 8.46101 12.6419 8.39531 12.6889L6.89531 13.7603ZM5 13.5569C5 14.9803 6.6089 15.8082 7.76717 14.9809L9.26717 13.9095C9.72706 13.581 10 13.0506 10 12.4854V10.5H13.1884C14.9775 10.5 16.2903 8.81868 15.8563 7.08303L14.8563 3.08303C14.5503 1.85882 13.4503 1 12.1884 1H1.75H1V1.75V9.75V10.5H1.75H4.75C4.88807 10.5 5 10.6119 5 10.75V13.5569Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button> */}

                <button
                  onClick={handleTextToSpeech}
                  className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground py-1 px-2 h-fit text-muted-foreground !pointer-events-auto dark:text-[#999] hover:text-white dark:hover:text-white"
                >
                  {isProcessingTTS ? (
                    // Processing icon (spinner)
                    <svg
                      className="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : isPlaying ? (
                    // Pause icon (existing code)
                    <svg
                      height="16"
                      width="16"
                      viewBox="0 0 16 16"
                      style={{ color: "currentColor" }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.5 3H4.5C4.22386 3 4 3.22386 4 3.5V12.5C4 12.7761 4.22386 13 4.5 13H5.5C5.77614 13 6 12.7761 6 12.5V3.5C6 3.22386 5.77614 3 5.5 3ZM11.5 3H10.5C10.2239 3 10 3.22386 10 3.5V12.5C10 12.7761 10.2239 13 10.5 13H11.5C11.7761 13 12 12.7761 12 12.5V3.5C12 3.22386 11.7761 3 11.5 3Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    // Speaker icon (existing code)
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      style={{ color: "currentColor" }}
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M444.8,76.8c-6.8-9-19.7-10.9-28.8-4.2-9.1,6.7-11,19.4-4.2,28.4 64.8,85.9 64.8,225.6 0,311.5-6.8,9-5.1,21.9 4.2,28.4 11.4,7.9 24.8,1.2 28.8-4.2 74.9-99.1 74.9-260.6 0-359.9Z"
                        />
                        <path
                          fill="currentColor"
                          d="M394.7,143.2c-6.8-9-19.7-10.8-28.8-4.2-9.1,6.7-11,19.4-4.2,28.4 36.6,48.4 36.6,130.3 0,178.7-6.8,9-5,21.8 4.2,28.4 11.7,8.3 24.8,1.2 28.8-4.2 48.1-63.6 48.1-163.4 0-227.1Z"
                        />
                        <path
                          fill="currentColor"
                          d="M291.9,438.3l-144.2-112.4v-138.2l144.2-112.3v362.9Zm-185.4-122.8h-54.3v-117.7h54.3v117.7ZM301.2,15.3l-180.1,141.9h-89.5c-11.4,0-20.6,9.1-20.6,20.3v158.2c0,11.2 9.2,20.3 20.6,20.3h91.2l178.4,140.7c12.8,10.1 31.9,1.1 31.9-15.1v-451.2c0-16.2-19-25.3-31.9-15.1Z"
                        />
                      </g>
                    </svg>
                  )}
                </button>

              </div>
            )}
          </div>
        )}
        <div>
        </div>
        {message.type === "image" && (
          <div className="rounded-lg overflow-hidden ml-3">
            {message.content}

            {(message.content.includes('youtube.com') || message.content.includes('youtu.be')) && !message.content.includes('/shorts/') ? (
              <iframe
                height={400}
                src={`${message.content.includes('youtu.be') ? message.content.replace('youtu.be', 'www.youtube.com/embed').split('?')[0] : message.content.includes('watch?v=') ? message.content.replace('watch?v=', 'embed/') : 'https://www.youtube.com/embed/'}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full" // 16:9 aspect ratio
              />
            ) : message.content.includes('/shorts/') ? (
              <iframe
                width="315"
                height="560"
                src={`${message.content.replace('/shorts/', '/embed/')}?autoplay=1&mute=1`}
                title="YouTube Shorts player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="" // 9:16 aspect ratio for shorts
              />
            ) : (
              <Image
                src={message.content}
                alt="message image"
                width={500}
                height={500}
                className="object-cover w-full"
              />
            )}
          </div>
        )}
      </div>

      {/* Avatar for Player */}
      {message.sent_by_user && (
        <div className="ml-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={user_avatar}
              alt="User Avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
