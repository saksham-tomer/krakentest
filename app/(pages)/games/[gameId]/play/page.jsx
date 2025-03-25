"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/pages/play/Sidebar";
import ChatArea from "@/components/pages/play/ChatArea";
import InputArea from "@/components/pages/play/InputArea";
import CharacterModal from "@/components/pages/play/CharacterModal";
import InventoryModal from "@/components/pages/play/InventoryModal";
import Header from "@/components/header/HeaderGamePlay";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import { randomNumber } from "@/utlis/randomNumber";
import withAuth from "@/hooks/withAuth";
import { useUser } from '@/contexts/UserContext';
import { toast } from "react-toastify";
const action_words = [
  "attack",
  "roll",
  "perception",
  "insight",
  "persuasion",
  "persuade",
  "intimidation",
  "intimidate",
  "investigation",
  "investigate",
  "check",
  "spell",
  "cast",
  "dodge",
  "stealth",
  "initiative",
  "save",
  "damage",
  "hit",
  "defend",
  "skill",
  "search",
  "investigate",
  "track",
  "sneak",
  "hide",
  "climb",
  "jump",
  "swim",
  "throw",
  "shoot",
  "heal",
  "repair",
  "craft",
  "attempt",
  "activate",
  "disarm",
  "maneuver",
  "navigate",
  "inspire",
  "negotiate",
  "intuit",
  "detect",
  "recall",
  "dodge",
  "parry",
  "appraise",
  "decipher",
  "forge",
  "lay",
  "prepare",
  "summon",
  "banish",
  "conjure",
  "invoke",
  "check",
  "examine",
  "perceive",
  "sense",
  "spot",
  "try",
  "persuade",
  "intimidate",
  "convince",
  "i try to",
  "i try",
];


const ChatPage = ({ params }) => {
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const { getProfile } = useUser();

  const [messages, setMessages] = useState([]);
  const [game, setGame] = useState();
  const [storyId, setStoryId] = useState("");
  const [storyData, setStoryData] = useState({});
  const [characterModalOpen, setCharacterModalOpen] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [dicePlay, setDicePlay] = useState(false);
  const [currentFace, setCurrentFace] = useState(19);
  const [diceRolling, setDiceRolling] = useState(false);
  const [getAnswer, setGetAnswer] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [musicList, setMusicList] = useState([])
  const [selectedMusic, setSelectedMusic] = useState();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [storyDataFetched, setStoryDataFetched] = useState(false);
  const [hasNewInventory, setHasNewInventory] = useState(false);
  const [hasNewCharacter, setHasNewCharacter] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(game?.ai_voice || 'af_alloy');


  async function fetchTracks(){
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/tracks/"
      );

      console.log("tracks response ", response)
      if (response.data && response.data.success) {
        console.log("tracks response data ", response.data.success.data)
        setMusicList(response.data.success.data);
        return response.data.success.data;
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching game:", err);
    }
  }

  async function fetchGame(game_id) {
    try {
      const response = await axiosInstance.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/games/" + game_id
      );

      if (response.data && response.data.success) {
        console.log(response.data.success.data, " game");
        setGame(response.data.success.data);
        return response.data.success.data;
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching game:", err);
    }
  }

  async function fetchInteraction(game_id, user_query) {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/games/${game_id}/play`,
        {
          prompt: user_query,
          session_id: sessionId,
          story_id: selectedStory?.story_id // Send selected story ID with interaction
        }
      );

      if (response.data && response.data.interaction) {
        if(!sessionId){
          setSessionId(response.data.interaction.session_id)
        }
        if(!selectedStory){
          getGameStories(params.gameId)
        }
        console.log(
          "response.data.interaction ===>",
          response.data.interaction
        );
        return response.data.interaction;
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching interaction:", err);
      toast.error(err.response.data.message)
    }
  }

  async function fetchMessages(game_id) {
    if(!selectedStory){
      return []
    }
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/games/${game_id}/play/${selectedStory?.story_id}/messages`
      );

      if (response.data && response.data.messages) {
        console.log("Messages response:", response.data.messages);
        return response.data.messages;
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }

  async function getStoryData(story_id) {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/story/${story_id}`
      );

      console.log("story data", response);

      if (response.data) {
        return response.data.story_data;
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }

  function containsActionWord(query, words) {
    const pattern = new RegExp(`\\b(${words.join("|")})\\b`, "i");
    return pattern.test(query);
  }

  const handleSend = async (user_query) => {
    if (params.gameId && user_query) {
      setGetAnswer(false);
      setSuggestions(null);
      const messages_copy = messages;
      messages_copy.push({ content: user_query, sent_by_user: true });
      messages_copy.push({ content: "Thinking...", sent_by_user: false });
      setMessages(messages_copy);

      let new_query = user_query;
      const interaction = await fetchInteraction(params.gameId, new_query);
      getProfile();

      messages_copy.pop();
      let roll_tool_result;
      if (interaction) {
        const tools_output = interaction.assistant_resp.tools_output;
        roll_tool_result = tools_output
          .filter(item => {
            if (item.output) {
              const output = JSON.parse(item.output);
              return output.roll !== undefined && output.roll_needed === true;
            }
            return false;
          })
          .map(item => ({
            ...item,
            output: JSON.parse(item.output)
          }));

        if (!storyId) {
          setStoryId(interaction.story_id);
        }
        fetchStoryData(interaction.story_id);
        const parts = makeMessageParts(
          interaction.assistant_resp.parsed_content,
          true
        );

        for (let i = 0; i < parts.length; i++) {
          messages_copy.push({
            content: parts[i].content,
            sent_by_user: false,
            type: parts[i].type,
          });
        }
      }
          
      setMessages(messages_copy)
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      if(roll_tool_result){
        const roll_result = roll_tool_result[0].output.roll;
        setDiceRolling(true);
        setCurrentFace(roll_result);

        await delay(6000);

        setDiceRolling(false)
        setGetAnswer(true)
      }
    }
  };

  const onSuggestionClick = (message) => {
    if(message.startsWith("I rolled")){
      handleSend(message);
      return;
    }
    if(message.startsWith("Show me a picture of the scene")){
      handleSend("Show me a picture of the scene");
      return;
    }
    const suggestionIndex = suggestions.findIndex((suggestion) => suggestion.title === message.trim());

    if (suggestionIndex !== -1) {
      const formattedMessage = `I choose ${suggestionIndex + 1}. ${message}`;
      handleSend(formattedMessage);
    } else {
      console.error("Suggestion not found in the array.");
    }
  };

  const parseStoryOptions = (content) => {
    if (!content) return [];
  
    const paragraphs = content.split('\n\n');
  
    for (let i = paragraphs.length - 1; i >= 0; i--) {
      const paragraph = paragraphs[i];
  
      const options = [...paragraph.matchAll(/\s*(\d+)\.\s*(.*?)(?=\s*\d+\.|$)/g)];
  
      if (options.length > 1) {
        return options.map(([, number, title]) => ({
          number: parseInt(number, 10),
          title: title.trim(),
          subtitle: "",
        }));
      }
    }
  
    return [];
  };
  
  const makeMessageParts = (message, isLastNonUserMessage) => {
    // Split by image markdown and YouTube links
    const parts = message.split(/(!\[.*?\]\(.*?\)|https?:\/\/(?:www\.)?youtube\.com\/\S+|https?:\/\/(?:www\.)?youtu\.be\/\S+)/);

    const processedParts = parts.flatMap((part) => {
      if (part.startsWith("![")) {
        const imageUrl = part.match(/\((.*?)\)/)[1];
        return [{ type: "image", content: imageUrl }];
      } else if (part.match(/https?:\/\/(?:www\.)?youtu(?:be\.com|\.be)\/\S+/)) {
        // Handle YouTube links
        return [{ type: "image", content: part.trim() }];
      } else if (part.trim()) {
        const options = parseStoryOptions(part);
        console.log("these are the options", options);

        if (options) {
          console.log(options, "options");
          setSuggestions(options);
          const textWithoutOptions = part
            .replace(/###Options_Start###[\s\S]*?###Options_End###/m, "")
            .trim();
          console.log("text without", textWithoutOptions);
          const resultParts = [];
          if (textWithoutOptions) {
            resultParts.push({ type: "text", content: textWithoutOptions });
          }
          return resultParts;
        } else {
          return [{ type: "text", content: part.trim() }];
        }
      }
      return [];
    });

    return processedParts.filter((part) => part.content);
  };

  const fetchStoryMessages = async () => {
    const resp_messages = await fetchMessages(params.gameId);
    const messages = resp_messages.flatMap((message, index) => {
      const lastNonUserMessageIndex = resp_messages
        .map((msg, index) => ({ isUser: msg.sent_by_user, index }))
        .filter((msg) => !msg.isUser)
        .pop()?.index;
      if (!message.sent_by_user) {
        const isLastNonUserMessage = index === lastNonUserMessageIndex;
        const parts = makeMessageParts(message.content, isLastNonUserMessage);

        console.log(parts, "parts fetch story");

        return parts.map((part) => ({
          content: part.content,
          type: part.type,
          sent_by_user: message.sent_by_user,
        }));
      } else {
        return {
          content: message.content,
          sent_by_user: message.sent_by_user,
          type: "text",
        };
      }
    });
    if (resp_messages.length && !storyId) {
      setStoryId(resp_messages[0].story);
    }
    if (resp_messages.length == 0 && game.game_opener) {
      let messages_copy = [];
      
    const opener_parts = makeMessageParts(game.game_opener, true);
    console.log(opener_parts,"opener parts")
    for (let i = 0; i < opener_parts.length; i++) {
      messages_copy.push({
        content: opener_parts[i].content,
        sent_by_user: false,
        type: opener_parts[i].type,
      });
    }
    setMessages([
        ...messages_copy
      ]);
    } else {
    let messages_copy = [];
      
    const opener_parts = makeMessageParts(game.game_opener, false);
    for (let i = 0; i < opener_parts.length; i++) {
      messages_copy.push({
        content: opener_parts[i].content,
        sent_by_user: false,
        type: opener_parts[i].type,
      });
    }
    setMessages([
        ...messages_copy,
        ...messages,
      ]);
    }
  };

  const fetchStoryData = async (story_id) => {
    const resp_story = await getStoryData(story_id);
    console.log(resp_story, "Story data");
    setStoryData(resp_story);
    setStoryDataFetched(true);
  };

  async function getGameStories(game_id) {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/games/${game_id}/stories`
      );
      if (response.data && response.data.success) {
        const storiesData = response.data.success.data;
        setStories(storiesData);
        // Set latest story as selected story
        if (storiesData.length > 0) {
          // Check if story_id exists in query params and matches a fetched story
          const queryParams = new URLSearchParams(window.location.search);
          const queryStoryId = queryParams.get('story_id');
          
          if (queryStoryId) {
            const matchingStory = storiesData.find(story => story.story_id === queryStoryId);
            if (matchingStory) {
              setSelectedStory(matchingStory);
              setStoryId(matchingStory.story_id);
            } else {
              // Fallback to latest story if query story_id not found
              const latestStory = storiesData[storiesData.length - 1];
              setSelectedStory(latestStory);
              setStoryId(latestStory.story_id);
            }
          } else {
            // No query story_id, use latest story
            const latestStory = storiesData[storiesData.length - 1];
            setSelectedStory(latestStory);
            setStoryId(latestStory.story_id);
          }
        }
        return storiesData;
      } else {
        console.error("Unexpected response structure:", response);
        return [];
      }
    } catch (err) {
      console.error("Error fetching game stories:", err);
      return [];
    }
  }

  async function handleGetGameAndMessages(gameId) {
    const resp_game = await fetchGame(params.gameId);
    fetchStoryMessages(resp_game);
  }

  function handleStoryChange(story) {
    if (story) {
      setSelectedStory(story);
      setStoryId(story.story_id);
    }
  }

  async function handleStartNewStory() {
    try {
      // Reset story-related state
      setSelectedStory(null);
      setStoryId(null);
      setStoryData(null);

      // Reset messages to just show game opener
      setMessages([{
        content: game?.game_opener,
        sent_by_user: false
      }]);

      // Fetch updated stories list to include the new story
      // await getGameStories(params.gameId);

    } catch (err) {
      console.error("Error starting new story:", err);
    }
  }

  async function handleUpdateStoryName(storyId) {
    const newName = window.prompt("Enter new story name:");
    if (newName) {
      try {
        const response = await axiosInstance.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/story/${storyId}`,
          { name: newName }
        );

        if (response.data && response.data.success) {
          // Update stories list to reflect the name change
          await getGameStories(params.gameId);
          toast.success("Story name updated successfully");
        }
      } catch (err) {
        console.error("Error updating story name:", err);
        toast.error("Failed to update story name");
      }
    }
  }

  async function handleDeleteStory(storyId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this story? This action cannot be undone.");
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/story/${storyId}`
        );

        if (response.data && response.data.success) {
          // Reset current story if it was deleted
          if (selectedStory?.story_id === storyId) {
            setSelectedStory(null);
            setStoryId(null);
            setMessages([{
              content: game?.game_opener,
              sent_by_user: false
            }]);
          }
          
          // Refresh stories list
          await getGameStories(params.gameId);
          toast.success("Story deleted successfully");
        }
      } catch (err) {
        console.error("Error deleting story:", err);
        toast.error("Failed to delete story");
      }
    }
  }

  useEffect(() => {
    if (storyId) {
      fetchStoryData(storyId);
    }
  }, [storyId, messages]);

  useEffect(()=>{
    if(musicList){
      console.log(musicList, "music is here")
      setSelectedMusic(musicList[0])
    }
  },[musicList])

  useEffect(() => {
    fetchGame(params.gameId);
    fetchTracks();
    getGameStories(params.gameId);
  }, []);


  useEffect(()=>{
    if(game){
      if(selectedStory){
        fetchStoryData(selectedStory.story_id);
      }
      fetchStoryMessages();
      if(game?.ai_voice){
        setSelectedVoice(game?.ai_voice)
      }
    }
  },[game, selectedStory])

  useEffect(() => {
    if (storyData && storyDataFetched) {
      // Get previous data from localStorage
      const prevData = JSON.parse(localStorage.getItem('prevStoryData'));
      
      // If there's no previous data or this is initial load with empty character/inventory
      if (!prevData || 
          (!storyData.name && !storyData.inventory?.length)) {
        // Just store current data without notifications
        localStorage.setItem('prevStoryData', JSON.stringify(storyData));
        return;
      }

      // Check for character sheet changes (excluding inventory and GP)
      const characterFields = ['name', 'gender', 'class', 'level', 'actions', 'abilities', 'skills', 'HP', 'max_hp', 'background'];
      const hasCharacterChanged = characterFields.some(field => 
        JSON.stringify(storyData[field]) !== JSON.stringify(prevData[field])
      );

      if (hasCharacterChanged && storyData.name) { // Only notify if character exists
        toast.info('Character sheet updated');
        setHasNewCharacter(true);
      }

      // Check for inventory changes
      if (JSON.stringify(storyData.inventory) !== JSON.stringify(prevData.inventory) && 
          storyData.inventory?.length > 0) { // Only notify if inventory has items
        toast.info('Inventory updated');
        setHasNewInventory(true);
      }

      // Specifically check for GP changes
      if (storyData.GP !== prevData.GP && storyData.GP > 0) { // Only notify if GP exists
        toast.info(`Gold updated: ${storyData.GP} GP`);
        setHasNewInventory(true);
      }

      // Store current data for next comparison
      localStorage.setItem('prevStoryData', JSON.stringify(storyData));
    }
  }, [storyData]);
  
  // Add useEffect to track modal state changes
  useEffect(() => {
    if (!characterModalOpen) {
      setHasNewCharacter(false);
    }
  }, [characterModalOpen]);

  useEffect(() => {
    if (!inventoryModalOpen) {
      setHasNewInventory(false); 
    }
  }, [inventoryModalOpen]);

  return (
    <>
      <section className="relative h-screen  flex flex-col">
        {storyData && characterModalOpen && (
          <CharacterModal
            character={storyData}
            isOpen={characterModalOpen}
            setIsOpen={setCharacterModalOpen}
          />
        )}

        {storyData && inventoryModalOpen && (
          <>
            <InventoryModal
              storyData={storyData}
              isOpen={inventoryModalOpen}
              setIsOpen={setInventoryModalOpen}
            />
          </>
        )}

        {/* Background Gradient */}
        {/* <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_dark.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture> */}
        <div className="h-full">
          <div className="flex h-full">
            {/* Sidebar */}
            <Sidebar
              game={game}
              characterModalOpen={characterModalOpen}
              setCharacterModalOpen={setCharacterModalOpen}
              inventoryModalOpen={inventoryModalOpen}
              setInventoryModalOpen={setInventoryModalOpen}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              selectedMusic={selectedMusic}
              musicList={musicList}
              setSelectedMusic={setSelectedMusic}
              stories={stories}
              selectedStory={selectedStory}
              handleStoryChange={handleStoryChange}
              handleStartNewStory={handleStartNewStory}
              handleUpdateStoryName={handleUpdateStoryName}
              handleDeleteStory={handleDeleteStory}
              hasNewInventory={hasNewInventory}
              hasNewCharacter={hasNewCharacter}
              selectedVoice={selectedVoice}
              setSelectedVoice={setSelectedVoice}
            />
            {/* Chat Area */}
            <div className="lg:w-4/5 w-full js-chat-content flex flex-col h-full flex-1">
              {/* Chat Area */}
              <div className="w-full relative">
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <hr />
              </div>
              <ChatArea
                messages={messages}
                setMessages={setMessages}
                suggestions={suggestions}
                onSuggestionClick={onSuggestionClick}
                setCurrentFace={setCurrentFace}
                dicePlay={dicePlay}
                currentFace={currentFace}
                diceRolling={diceRolling}
                setDiceRolling={setDiceRolling}
                getAnswer={getAnswer}
                selectedVoice={selectedVoice || game?.ai_voice || ""}
              />

              {/* Input Area */}
              <div className="sticky bottom-0">
                <InputArea onSendMessage={(message) => handleSend(message)} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default withAuth(ChatPage);
