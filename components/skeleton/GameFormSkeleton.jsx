const GameFormSkeleton = () => {
    return (
      <div className="max-w-6xl mx-auto py-24 rounded-lg shadow mt-[200px] md:mt-[110px] animate-pulse">
        {/* Header */}
        <div className="max-w-[90%] mx-auto flex items-center gap-2 mb-6">
          <div className="h-8 w-8 bg-gray-300 dark:bg-jacarta-600 rounded"></div>
          <div className="h-8 w-48 bg-gray-300 dark:bg-jacarta-600 rounded"></div>
        </div>
  
        <div className="space-y-6 max-w-[90%] mx-auto">
          <div className="flex gap-10 justify-between flex-col lg:flex-row">
            {/* Left Column */}
            <div className="flex flex-col gap-2 w-full lg:w-[50%]">
              {/* Image Preview Box */}
              <div className="h-80 w-full bg-gray-300 dark:bg-jacarta-600 rounded-lg"></div>
              
              {/* Upload Button */}
              <div className="h-10 w-48 bg-gray-300 dark:bg-jacarta-600 rounded mt-5"></div>
  
              {/* Game Features */}
              <div className="mt-6">
                <div className="h-6 w-32 bg-gray-300 dark:bg-jacarta-600 rounded mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="h-16 bg-gray-300 dark:bg-jacarta-600 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="w-full lg:w-[50%] flex flex-col gap-6">
              {/* Game Name */}
              <div>
                <div className="h-6 w-24 bg-gray-300 dark:bg-jacarta-600 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-300 dark:bg-jacarta-600 rounded"></div>
              </div>
  
              {/* Game Description */}
              <div>
                <div className="h-6 w-32 bg-gray-300 dark:bg-jacarta-600 rounded mb-2"></div>
                <div className="h-32 w-full bg-gray-300 dark:bg-jacarta-600 rounded"></div>
              </div>
  
              {/* Game Opener */}
              <div>
                <div className="h-6 w-28 bg-gray-300 dark:bg-jacarta-600 rounded mb-2"></div>
                <div className="h-32 w-full bg-gray-300 dark:bg-jacarta-600 rounded"></div>
              </div>
            </div>
          </div>
  
          {/* Locations Section */}
          <div>
            <div className="h-6 w-24 bg-gray-300 dark:bg-jacarta-600 rounded mb-4"></div>
              <div className="h-64 w-full bg-gray-300 dark:bg-jacarta-600 rounded-lg mb-4"></div>
          </div>
  
          {/* NPCs Section */}
          <div>
            <div className="h-6 w-24 bg-gray-300 dark:bg-jacarta-600 rounded mb-4"></div>
              <div className="h-64 w-full bg-gray-300 dark:bg-jacarta-600 rounded-lg mb-4"></div>
          </div>
  
          {/* Submit Button */}
          <div className="h-12 w-48 mx-auto bg-gray-300 dark:bg-jacarta-600 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default GameFormSkeleton;