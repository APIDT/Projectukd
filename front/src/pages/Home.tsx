import React from 'react';
import { Link } from 'react-router-dom';
import { Video, TrendingUp, History, ThumbsUp, PlaySquare, User } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: "Building a Modern Web Application",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    author: "Tech Academy",
    views: "125K",
    timestamp: "2 days ago"
  },
  {
    id: 2,
    title: "Nature Documentary: Hidden Wonders",
    thumbnail: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=600",
    author: "Nature Channel",
    views: "89K",
    timestamp: "5 days ago"
  },
  {
    id: 3,
    title: "Cooking Masterclass: Italian Cuisine",
    thumbnail: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600",
    author: "Culinary Arts",
    views: "256K",
    timestamp: "1 week ago"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-indigo-600">
            <Video className="h-6 w-6" />
            <span>VideoHub</span>
          </Link>
        </div>
        <nav className="mt-8">
          <Link to="/" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100">
            <TrendingUp className="h-5 w-5 mr-3" />
            Trending
          </Link>
          <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <History className="h-5 w-5 mr-3" />
            History
          </Link>
          <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <ThumbsUp className="h-5 w-5 mr-3" />
            Liked Videos
          </Link>
          <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <PlaySquare className="h-5 w-5 mr-3" />
            Your Videos
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search videos..."
              className="w-2/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="flex items-center text-gray-700 hover:text-indigo-600">
              <User className="h-6 w-6" />
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-gray-600">{video.author}</p>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <span>{video.views} views</span>
                  <span className="mx-2">•</span>
                  <span>{video.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}