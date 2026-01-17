import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                    {project.date}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                    {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags && project.tags.map(tag => (
                        <span key={tag} className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                            <Tag size={12} className="mr-1" />
                            {tag}
                        </span>
                    ))}
                </div>

                <Link
                    to={`/project/${project.id}`}
                    className="w-full mt-2 flex items-center justify-center bg-gray-900 dark:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                    View Details <ExternalLink size={16} className="ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
