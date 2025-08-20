import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GitHubStats = () => {
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = 'Harsh741334';

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user profile
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const user = await userResponse.json();

      // Fetch repositories (sorted by updated, limit to 6 most recent)
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const repos = await reposResponse.json();

      setUserData(user);
      setRepositories(repos);
    } catch (err) {
      console.error('GitHub API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <motion.div 
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
          <span className="ml-3 text-white/70">Loading GitHub data...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="text-red-400 mb-2">⚠️ GitHub API Unavailable</div>
          <p className="text-white/70 text-sm">
            Unable to load GitHub data. Please check back later!
          </p>
          <button 
            onClick={fetchGitHubData}
            className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub Activity
        </h3>
        <motion.a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Profile →
        </motion.a>
      </div>

      {/* User Stats */}
      {userData && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div 
            className="text-center p-3 bg-white/5 rounded-lg border border-white/10"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl font-bold text-purple-400">{userData.public_repos}</div>
            <div className="text-xs text-white/70">Repositories</div>
          </motion.div>
          <motion.div 
            className="text-center p-3 bg-white/5 rounded-lg border border-white/10"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl font-bold text-green-400">{userData.followers}</div>
            <div className="text-xs text-white/70">Followers</div>
          </motion.div>
          <motion.div 
            className="text-center p-3 bg-white/5 rounded-lg border border-white/10"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl font-bold text-blue-400">{userData.following}</div>
            <div className="text-xs text-white/70">Following</div>
          </motion.div>
        </div>
      )}

      {/* Recent Repositories */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4">Recent Projects</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {repositories.map((repo, index) => (
            <motion.div
              key={repo.id}
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <motion.a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-purple-300 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    {repo.name}
                  </motion.a>
                  {repo.description && (
                    <p className="text-white/70 text-sm mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center mt-2 text-xs text-white/50 space-x-4">
                    {repo.language && (
                      <span className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mr-1"></div>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                      {repo.stargazers_count}
                    </span>
                    <span>Updated {formatDate(repo.updated_at)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bio */}
      {userData?.bio && (
        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/80 text-sm italic">"{userData.bio}"</p>
        </div>
      )}
    </motion.div>
  );
};

export default GitHubStats;
