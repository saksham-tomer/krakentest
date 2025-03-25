import { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import PreviewMedia from "@/components/games/PreviewMedia";
import { FiX } from "react-icons/fi";

export default function Sidebar({
  game,
  characterModalOpen,
  setCharacterModalOpen,
  inventoryModalOpen,
  setInventoryModalOpen,
  sidebarOpen,
  setSidebarOpen,
  selectedMusic,
  musicList,
  setSelectedMusic,
  stories,
  selectedStory,
  handleStoryChange,
  handleStartNewStory,
  handleUpdateStoryName,
  handleDeleteStory,
  hasNewInventory,
  hasNewCharacter,
  selectedVoice,
  setSelectedVoice
}) {
  const [activeTab, setActiveTab] = useState('inventory');
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

  return (
    <aside className={`h-full w-[200px] md:w-[300px] ${!sidebarOpen && 'hidden'} lg:block bg-muted dark:bg-jacarta-700`}>
      <div className="h-full bg-slate-200 dark:bg-jacarta-700 p-4 flex flex-col">
        {/* Game Profile Section */}
        <div className="flex flex-col items-center mb-6">
          {game && (
            <PreviewMedia
              musicUrl={game?.opener_mp3}
              mediaUrl={game?.preview_image}
              mediaType={game?.preview_image_type}
              alt="Game Preview"
            />
          )}

          <div>
            <h2 className="font-bold text-jacarta-700 dark:text-white text-lg">
              {game?.game_name}
            </h2>
            <p className="text-sm text-jacarta-500 dark:text-jacarta-300 max-h-[100px] overflow-y-auto">
              {game?.description}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <nav className="flex-1">
          <ul className="space-y-4 h-full flex flex-col">
            <li>
              <button
                onClick={() => {
                  setInventoryModalOpen(true);
                  console.log("clicking");
                }}
                className={`relative w-full text-left font-semibold py-2 px-4 rounded-lg ${
                  inventoryModalOpen
                    ? 'bg-accent text-white'
                    : 'bg-jacarta-100 dark:bg-jacarta-600 text-jacarta-700 dark:text-white'
                }`}
              >
                Inventory
                {hasNewInventory && (
                  <span className="absolute top-2 right-2 bg-[#EF4444] text-white text-xs px-2 py-0.5 rounded-xl">
                    New
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCharacterModalOpen(true);
                }}
                className={`relative w-full text-left font-semibold py-2 px-4 rounded-lg ${
                  characterModalOpen
                    ? 'bg-accent text-white'
                    : 'bg-jacarta-100 dark:bg-jacarta-600 text-jacarta-700 dark:text-white'
                }`}
              >
                Characters
                {hasNewCharacter && (
                  <span className="absolute top-2 right-2 bg-[#EF4444] text-white text-xs px-2 py-0.5 rounded-xl">
                   New
                 </span>
                )}
              </button>
            </li>
            <li className="flex-1 flex flex-col justify-end">
              {/* Story Controls */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p>Select story</p>
                  <button
                    onClick={handleStartNewStory}
                    className="px-3 py-1 text-sm rounded-lg bg-accent text-white hover:bg-accent/80"
                  >
                    New Story
                  </button>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedStory?.story_id || ''}
                    onChange={(e) => {
                      const selected = stories.find(story => story.story_id === e.target.value);
                      handleStoryChange(selected);
                    }}
                    className="w-full py-2 px-4 rounded-lg bg-jacarta-100 dark:bg-jacarta-600 text-jacarta-700 dark:text-white border-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Select a story</option>
                    {stories?.map((story, index) => (
                      <option key={index} value={story.story_id}>
                        {story.name || `Story ${index + 1}`}
                      </option>
                    ))}
                  </select>
                  {selectedStory && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleUpdateStoryName(selectedStory.story_id)}
                        className="p-2 rounded-lg bg-jacarta-100 dark:bg-jacarta-600 text-jacarta-700 dark:text-white hover:bg-jacarta-200 dark:hover:bg-jacarta-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteStory(selectedStory.story_id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Voice Selector */}
              <div className="mb-4">
                <p>Select Narrator</p>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full py-2 px-4 rounded-lg bg-jacarta-100 dark:bg-jacarta-600 text-jacarta-700 dark:text-white border-none focus:ring-2 focus:ring-accent"
                >
                  {Object.entries(voices).map(([category, voiceList]) => (
                    <optgroup key={category} label={category}>
                      {voiceList.map((voice) => (
                        <option key={voice.id} value={voice.id}>
                          {voice.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Music Selector */}
              <div className="mb-4">
                <p>Select music</p>
                <select
                  value={selectedMusic?.url || ''}
                  onChange={(e) => {
                    const selected = musicList.find(music => music.url === e.target.value);
                    setSelectedMusic(selected);
                  }}
                  className="w-full py-2 px-4 rounded-lg bg-jacarta-100 dark:bg-jacarta-600 text-jacarta-700 dark:text-white border-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select a song</option>
                  {musicList?.map((music, index) => (
                    <option key={index} value={music.url}>
                      {music.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Music Player */}
              <MusicPlayer
                songUrl={selectedMusic?.url}
                title={selectedMusic?.name || "No Music found"}
              />
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}