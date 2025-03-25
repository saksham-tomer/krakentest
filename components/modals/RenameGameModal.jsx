import { useState, useEffect } from 'react';

export default function RenameGameModal({ onRename, game }) {
  const [newName, setNewName] = useState(game?.game_name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (game && newName.trim()) {
      onRename(game.game_id, newName.trim());
      setNewName('');
    // Close modal after submitting
    document.querySelector('#renameGameModal .btn-close').click();

    }
  };

  useEffect(()=>{
    if(game?.game_name){
      setNewName(game.game_name)
    }
  },[game])

  return (
    <div
      className="modal fade"
      id="renameGameModal"
      tabIndex="-1"
      aria-labelledby="renameGameModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="renameGameModalLabel">
              Rename Game
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-6 w-6 fill-jacarta-700 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>

          <div className="modal-body p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label 
                  htmlFor="gameName"
                  className="block font-display text-jacarta-700 dark:text-white text-sm mb-2"
                >
                  New Game Name
                </label>
                <input
                  type="text"
                  id="gameName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-jacarta-100 py-2.5 px-3 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                  placeholder="Enter new game name"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="rounded-full bg-jacarta-100 py-2 px-6 text-sm font-semibold text-jacarta-700 transition-all hover:bg-jacarta-200 dark:bg-jacarta-600 dark:text-white dark:hover:bg-jacarta-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-accent py-2 px-6 text-sm font-semibold text-white transition-all hover:bg-accent-dark"
                >
                  Rename
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
