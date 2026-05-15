import React from 'react';
import {
  FaMicrophone, FaMicrophoneSlash,
  FaVideo, FaVideoSlash,
  FaDesktop, FaExpand, FaCompress,
  FaMagic,
} from 'react-icons/fa';
import './ControlBar.scss';

export default function ControlBar({
  audioMuted,
  videoMuted,
  isFullScreen,
  isScreenSharing,
  ShowFilterOptions,
  filter,
  isMobile,
  isOnline,
  onToggleAudio,
  onToggleVideo,
  onShareScreen,
  onToggleFullscreen,
  onToggleFilters,
}) {
  const filterActive = ShowFilterOptions || (filter && filter !== 'none');

  return (
    <div className="ctrl-bar">
      <button
        className={`ctrl-btn ${audioMuted ? 'ctrl-btn--danger' : 'ctrl-btn--on'}`}
        onClick={onToggleAudio}
        title={audioMuted ? 'Unmute microphone' : 'Mute microphone'}
      >
        {audioMuted ? <FaMicrophoneSlash size={19} /> : <FaMicrophone size={19} />}
      </button>

      <button
        className={`ctrl-btn ${videoMuted ? 'ctrl-btn--danger' : 'ctrl-btn--on'}`}
        onClick={onToggleVideo}
        title={videoMuted ? 'Start camera' : 'Stop camera'}
      >
        {videoMuted ? <FaVideoSlash size={19} /> : <FaVideo size={19} />}
      </button>

      {!isMobile && !isScreenSharing && isOnline && (
        <button
          className="ctrl-btn ctrl-btn--subtle"
          onClick={onShareScreen}
          title="Share screen"
        >
          <FaDesktop size={18} />
        </button>
      )}

      <button
        className={`ctrl-btn ${isFullScreen ? 'ctrl-btn--on' : 'ctrl-btn--subtle'}`}
        onClick={onToggleFullscreen}
        title={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullScreen ? <FaCompress size={17} /> : <FaExpand size={17} />}
      </button>

      <button
        className={`ctrl-btn ${filterActive ? 'ctrl-btn--filter' : 'ctrl-btn--subtle'} ${isScreenSharing ? 'ctrl-btn--disabled' : ''}`}
        onClick={isScreenSharing ? undefined : onToggleFilters}
        disabled={isScreenSharing}
        aria-disabled={isScreenSharing}
        title={isScreenSharing ? 'Filters disabled while sharing screen' : 'Face filters'}
      >
        <FaMagic size={17} />
        {filter && filter !== 'none' && !isScreenSharing && <span className="ctrl-filter-dot" />}
      </button>
    </div>
  );
}
