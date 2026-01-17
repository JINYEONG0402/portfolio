import React from 'react';
import { ExternalLink, Youtube } from 'lucide-react';

const YoutubeCard = ({ channel }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="relative h-48 bg-red-600 flex items-center justify-center">
                <Youtube size={64} className="text-white" />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{channel.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
                    {channel.description}
                </p>

                <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-red-600 dark:text-red-400 font-medium hover:underline"
                >
                    Visit Channel <ExternalLink size={16} className="ml-1" />
                </a>
            </div>
        </div>
    );
};

export default YoutubeCard;
