import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CharacterModal = ({ isOpen, setIsOpen, character }) => {
  // Prevent scroll on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Early return if modal is closed or character is missing
  if (!isOpen || !character) return null;

  // Handle escape key press
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const StatBlock = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
      <span className="font-medium text-jacarta-700 dark:text-white">{label}</span>
      <span className="text-jacarta-500 dark:text-jacarta-300">{value}</span>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-jacarta-700 dark:text-white mb-2 border-b border-jacarta-100 dark:border-jacarta-600 pb-1">
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );

  console.log(character.name)

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="character-modal-title"
      onKeyDown={handleEscapeKey}
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-jacarta-900 bg-opacity-40 dark:bg-opacity-60 transition-opacity"
        onClick={() => setIsOpen(false)}  
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform rounded-xl bg-white dark:bg-jacarta-700 shadow-2xl transition-all">
          
          <div className="flex items-center justify-between p-6 border-b border-jacarta-100 dark:border-jacarta-600">
            
            <div className="flex items-center gap-4 flex-col md:flex-row">
              
              {character.name?(<>
              <img
                src={character.image || "/placeholder-avatar.jpg"}
                alt={`${character.name}'s portrait`}
                width={164}
                height={164}
                className="w-80 h-80 rounded-full object-cover ring-2 ring-jacarta-100 dark:ring-jacarta-600"
                // onError={(e) => {
                //   e.target.src = "/placeholder-avatar.jpg";
                // }}
              />
              <div>
                <h3 
                  id="character-modal-title"
                  className="text-4xl font-bold text-jacarta-700 dark:text-white"
                >
                  {character.name}
                </h3>
                <p className="text-md text-jacarta-500 dark:text-jacarta-300">
                  Level {character.level} {character.class}
                </p>
                <p className="text-md text-jacarta-500 dark:text-jacarta-300">
                  HP {character.HP}/{character.max_hp}
                </p>
                <p className="text-md text-jacarta-500 dark:text-jacarta-300">
                  AC {character.AC || '-'}
                </p>
              </div>
              </>):(<h1 className='text-xl font-bold text-jacarta-700 dark:text-white'>Character Sheet</h1>)
              }
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="self-start text-jacarta-500 dark:text-jacarta-300 hover:text-jacarta-700 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {
            character.name?(<>

          <div className="p-6 space-y-6">
            {/* Abilities */}
            <Section title="Abilities">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {character.abilities && Object.entries(character.abilities).map(([ability, stats]) => (
                  <StatBlock
                    key={ability}
                    label={ability}
                    value={`${stats.score} (${stats.modifier >= 0 ? '+' : ''}${stats.modifier})`}
                  />
                ))}
              </div>
            </Section>

            {/* Actions */}
            <Section title="Actions">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {character.actions && Object.entries(character.actions).map(([action, count]) => (
                  <StatBlock key={action} label={action} value={count} />
                ))}
              </div>
            </Section>

            {/* Skills */}
            <Section title="Skills">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {character.skills && Object.entries(character.skills).map(([skill, stats]) => (
                  <StatBlock
                    key={skill}
                    label={skill}
                    value={`${stats.score} (${stats.modifier >= 0 ? '+' : ''}${stats.modifier})`}
                  />
                ))}
              </div>
            </Section>
            
            <hr className="border-jacarta-100 dark:border-jacarta-600" />
            
            {/* Basic Stats */}
            <div className="flex flex-col gap-4 p-4 rounded-lg">
              <div className="flex items-center py-1 gap-4">
                <span className="font-medium text-jacarta-700 dark:text-white min-w-[100px]">Gender</span>
                <span className="text-jacarta-500 dark:text-jacarta-300">{character.gender}</span>
              </div>
              <div className="flex items-start py-1 gap-4">
                <span className="font-medium text-jacarta-700 dark:text-white min-w-[100px]">Background</span>
                <span className="text-jacarta-500 dark:text-jacarta-300">{character.background}</span>
              </div>
            </div>
          </div>

          <div className="flex rounded-xl w-[96%] mx-auto mb-3 justify-end gap-3 border-t border-jacarta-100 dark:border-jacarta-600 p-4 bg-jacarta-100 dark:bg-jacarta-600">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white transition-colors font-semibold"
            >
              Close
            </button>
          </div>
            </>):(
             <div className='min-h-16'>
             <p className=' text-xl text-center py-10 dark:text-white'>Create character to access Character sheet</p>
             </div>
            )
          }
          

        </div>
      </div>
    </div>
  );
};

export default CharacterModal;