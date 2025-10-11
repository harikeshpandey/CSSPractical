import React from 'react';

const VideoPlayer = React.memo(function VideoPlayer({ practical }) {
  return (
    <div className="bg-[#161B22] border border-gray-700 rounded-lg shadow-2xl overflow-hidden mb-8">
      <div className="bg-[#0D1117] p-3 flex justify-between items-center gap-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-500 text-sm hidden sm:block">
          {practical.title} - Explanation Video
        </div>
      </div>
      <div 
        dangerouslySetInnerHTML={{ __html: practical.Explaination_video_url }} 
        className="p-2 flex justify-center bg-[#161B22]/50"
      />
    </div>
  );
});

export default VideoPlayer;