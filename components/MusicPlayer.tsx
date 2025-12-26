import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ExternalLink, Music, Heart } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  album?: string;
  cover?: string;
  spotifyUrl?: string;
  appleUrl?: string;
  youtubeUrl?: string;
}

const MusicPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  // Mock track data - replace with real streaming API data
  const tracks: Track[] = [
    {
      id: '1',
      title: 'Electric Dreams',
      artist: 'JX',
      duration: '3:42',
      album: 'Neon Nights',
      cover: '/album1.jpg',
      spotifyUrl: 'https://benardopro.online',
      appleUrl: 'https://benardopro.online',
      youtubeUrl: 'https://benardopro.online'
    },
    {
      id: '2',
      title: 'Midnight Groove',
      artist: 'JX',
      duration: '4:15',
      album: 'Neon Nights',
      cover: '/album1.jpg',
      spotifyUrl: 'https://benardopro.online',
      appleUrl: 'https://benardopro.online',
      youtubeUrl: 'https://benardopro.online'
    },
    {
      id: '3',
      title: 'Heartbeat',
      artist: 'JX',
      duration: '3:28',
      album: 'Neon Nights',
      cover: '/album1.jpg',
      spotifyUrl: 'https://benardopro.online',
      appleUrl: 'https://benardopro.online',
      youtubeUrl: 'https://benardopro.online'
    },
    {
      id: '4',
      title: 'Neon Lights',
      artist: 'JX',
      duration: '3:55',
      album: 'Neon Nights',
      cover: '/album1.jpg',
      spotifyUrl: 'https://benardopro.online',
      appleUrl: 'https://benardopro.online',
      youtubeUrl: 'https://benardopro.online'
    }
  ];

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section id="music" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter mb-6">
            Listen <span className="text-gold-500">Now</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Stream the latest tracks and discover new music from JX across all major platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Music Player Widget */}
          <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Music size={32} className="text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Now Playing</h3>
                <p className="text-neutral-400">Latest hits from JX</p>
              </div>
            </div>

            {/* Current Track Display */}
            <div className="bg-neutral-800 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={tracks[currentTrack].cover || '/album1.jpg'}
                  alt={tracks[currentTrack].title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg">{tracks[currentTrack].title}</h4>
                  <p className="text-neutral-400">{tracks[currentTrack].artist}</p>
                  <p className="text-neutral-500 text-sm">{tracks[currentTrack].album}</p>
                </div>
                <button className="text-neutral-400 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div className="bg-gold-500 h-2 rounded-full w-1/3"></div>
                </div>
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>1:23</span>
                  <span>{tracks[currentTrack].duration}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={prevTrack}
                  className="w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors flex items-center justify-center"
                >
                  <SkipBack size={16} className="text-white" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="w-14 h-14 rounded-full bg-gold-500 hover:bg-gold-400 transition-colors flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-black" />
                  ) : (
                    <Play size={24} className="text-black ml-1" />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  className="w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors flex items-center justify-center"
                >
                  <SkipForward size={16} className="text-white" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <span className="text-neutral-400 text-sm w-8">{isMuted ? 0 : volume}</span>
              </div>
            </div>

            {/* Streaming Links */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold mb-4">Stream Everywhere</h4>
              <div className="grid grid-cols-1 gap-3">
                {tracks[currentTrack].spotifyUrl && (
                  <a
                    href={tracks[currentTrack].spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-green-600 hover:bg-green-500 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                      </div>
                      <span className="text-white font-semibold">Listen on Spotify</span>
                    </div>
                    <ExternalLink size={16} className="text-white opacity-60 group-hover:opacity-100" />
                  </a>
                )}

                {tracks[currentTrack].appleUrl && (
                  <a
                    href={tracks[currentTrack].appleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <span className="text-black font-bold text-sm"></span>
                      </div>
                      <span className="text-white font-semibold">Listen on Apple Music</span>
                    </div>
                    <ExternalLink size={16} className="text-white opacity-60 group-hover:opacity-100" />
                  </a>
                )}

                {tracks[currentTrack].youtubeUrl && (
                  <a
                    href={tracks[currentTrack].youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-red-600 hover:bg-red-500 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                        <Play size={14} className="text-black ml-0.5" fill="currentColor" />
                      </div>
                      <span className="text-white font-semibold">Watch on YouTube</span>
                    </div>
                    <ExternalLink size={16} className="text-white opacity-60 group-hover:opacity-100" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Playlist/Tracklist */}
          <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-6">Latest Releases</h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => setCurrentTrack(index)}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                    index === currentTrack
                      ? 'bg-gold-500/20 border border-gold-500/50'
                      : 'hover:bg-neutral-800'
                  }`}
                >
                  <div className="w-12 h-12 bg-neutral-700 rounded flex items-center justify-center flex-shrink-0">
                    {index === currentTrack && isPlaying ? (
                      <Pause size={16} className="text-gold-500" />
                    ) : (
                      <Play size={16} className="text-neutral-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold truncate ${index === currentTrack ? 'text-gold-500' : 'text-white'}`}>
                      {track.title}
                    </h4>
                    <p className="text-neutral-400 text-sm truncate">{track.artist}</p>
                  </div>

                  <div className="text-neutral-400 text-sm">
                    {track.duration}
                  </div>
                </div>
              ))}
            </div>

            {/* Playlist Stats */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gold-500">{tracks.length}</div>
                  <div className="text-neutral-400 text-sm">Tracks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold-500">
                    {tracks.reduce((acc, track) => {
                      const [min, sec] = track.duration.split(':').map(Number);
                      return acc + min * 60 + sec;
                    }, 0) / 60 | 0}m
                  </div>
                  <div className="text-neutral-400 text-sm">Total Time</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Embedded Player Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Featured on Spotify</h3>

          {/* Spotify Embed Placeholder */}
          <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800">
            <div className="aspect-video bg-neutral-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <p className="text-neutral-400 mb-4">Spotify Player Widget</p>
                <a
                  href="https://benardopro.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors"
                >
                  <Play size={16} />
                  Listen on Spotify
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>


    </section>
  );
};

export default MusicPlayer;
