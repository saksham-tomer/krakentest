import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import useUserCookie from "@/hooks/useUserCookie";
import D20Dice from "./Dice";
import { randomNumber } from "@/utlis/randomNumber";

export default function ChatArea({
  messages,
  setMessages,
  onSuggestionClick,
  suggestions,
  dicePlay,
  currentFace,
  setCurrentFace,
  diceRolling,
  setDiceRolling,
  getAnswer,
  selectedVoice
}) {
  const chatEndRef = useRef(null);
  const user = useUserCookie();
  // const [currentFace, setCurrentFace] = useState(19); // Initial dice face

  console.log(messages," messages")

  const character_avatar = "/img/logo.png";
  const user_avatar =
    user?.profile_photo ??
    "https://storage.googleapis.com/kraken_char/undefined_char.png";

  // const suggestions = [
  //   {
  //     title: "What is the weather",
  //     subtitle: "in San Francisco?"
  //   },
  //   {
  //     title: "Help me draft an essay",
  //     subtitle: "about Silicon Valley"
  //   }
  // ];

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const rollDice = () => {
    setDiceRolling(true);
    let face;

    do {
      face = randomNumber(1, 20); // Generate a random number between 1 and 20
    } while (face === currentFace); // Ensure new number is different
    onSuggestionClick?.(`I rolled ${face.toString()}`);

    setTimeout(() => {
      setCurrentFace(face);
    }, 1000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, diceRolling]);

  useEffect(() => {
    if (getAnswer) {
      setDiceRolling(false);
    }
  }, [getAnswer]);

  return (
    <div className="pt-24 flex-1 overflow-y-auto bg-white dark:bg-transparent p-4 w-full mx-auto md:max-w-4xl">
      {messages?.map((message, index) => (
        <Message
          key={index}
          message={message}
          character_avatar={character_avatar}
          user_avatar={user_avatar}
          scrollToBottom={scrollToBottom}
          diceRolling={index === messages.length - 2 ? diceRolling : false}
          selectedVoice={selectedVoice}
        />
      ))}

      {suggestions && (
        <div className="flex gap-2 flex-wrap w-full items-stretch">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex block"
              style={{ opacity: 1, transform: "none" }}
            >
              <button
                onClick={() =>
                  onSuggestionClick?.(
                    suggestion.title + " " + suggestion.subtitle
                  )
                }
                className="px-3 py-2 h-full dark:text-white hover:text-white inline-flex font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground text-left border rounded-xl text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
              >
                <span className="font-medium">{index+1}</span>
              </button>
            </div>
          ))}
          <div
              key={"gen-image"}
              className="flex block"
              style={{ opacity: 1, transform: "none" }}
            >
              <button
                onClick={() =>
                  onSuggestionClick?.(
                     "Show me a picture of the scene. 🖼️"
                  )
                }
                className="px-3 py-2 h-full dark:text-white hover:text-white inline-flex font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground text-left border rounded-xl text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
              >
                <span className="font-medium">🖼️</span>
              </button>
            </div>
          <div className="flex block ">
            <button
              type="button"
              name="roll"
              id="roll"
              className="px-3 py-2 h-full dark:text-white hover:text-white inline-flex font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground text-left border rounded-xl text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
              onClick={rollDice}
            >
              🎲
            </button>
          </div>

          
        </div>
      )}

      {diceRolling && (
        <div className="flex items-center justify-center">
          <D20Dice currentFace={currentFace} diceRolling={diceRolling} />
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
