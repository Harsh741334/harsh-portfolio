import { useState, useEffect } from 'react';

// GitHub API configuration
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Harsh741334';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Visitor tracking utilities
export const useVisitorStats = () => {
  const [visitorData, setVisitorData] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    pageViews: 0,
    isNewVisitor: false
  });

  useEffect(() => {
    // Get or initialize visitor data from localStorage
    const initializeVisitorData = () => {
      const today = new Date().toDateString();
      const storedData = JSON.parse(localStorage.getItem('portfolioVisitorData') || '{}');
      
      // Check if visitor data exists for today
      const todayData = storedData[today] || { visitors: new Set(), pageViews: 0 };
      
      // Generate or get visitor ID
      let visitorId = sessionStorage.getItem('portfolioVisitorId');
      let isNewVisitor = false;
      
      if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('portfolioVisitorId', visitorId);
        isNewVisitor = true;
      }
      
      // Add current visitor to today's data
      const visitorsSet = new Set(todayData.visitors);
      const wasNewToday = !visitorsSet.has(visitorId);
      visitorsSet.add(visitorId);
      
      // Update page views
      todayData.pageViews = (todayData.pageViews || 0) + 1;
      todayData.visitors = Array.from(visitorsSet);
      
      // Calculate total visitors across all days
      const allVisitors = new Set();
      Object.values(storedData).forEach(dayData => {
        if (dayData.visitors) {
          dayData.visitors.forEach(visitor => allVisitors.add(visitor));
        }
      });
      allVisitors.add(visitorId);
      
      // Update stored data
      storedData[today] = todayData;
      localStorage.setItem('portfolioVisitorData', JSON.stringify(storedData));
      
      // Calculate total page views
      const totalPageViews = Object.values(storedData).reduce((sum, dayData) => {
        return sum + (dayData.pageViews || 0);
      }, 0);
      
      return {
        totalVisitors: allVisitors.size,
        todayVisitors: todayData.visitors.length,
        pageViews: totalPageViews,
        isNewVisitor: isNewVisitor || wasNewToday
      };
    };

    setVisitorData(initializeVisitorData());
  }, []);

  return visitorData;
};

// GitHub API utilities
export const useGitHubStats = () => {
  const [githubData, setGithubData] = useState({
    profile: null,
    repositories: [],
    totalStars: 0,
    totalForks: 0,
    recentCommits: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setGithubData(prev => ({ ...prev, loading: true, error: null }));
        
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
        };
        
        // Add authorization header only if token is available
        if (GITHUB_TOKEN) {
          headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
        }

        // Fetch user profile
        const profileResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          headers
        });
        
        if (!profileResponse.ok) {
          throw new Error(`GitHub API error: ${profileResponse.status}`);
        }
        
        const profile = await profileResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
          headers
        });
        
        const repositories = reposResponse.ok ? await reposResponse.json() : [];
        
        // Calculate total stars and forks
        const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);

        // Fetch recent commits (if token available)
        let recentCommits = [];
        if (GITHUB_TOKEN && repositories.length > 0) {
          try {
            const commitsPromises = repositories.slice(0, 3).map(repo =>
              fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=2`, {
                headers
              }).then(res => res.ok ? res.json() : [])
            );
            
            const commitsArrays = await Promise.all(commitsPromises);
            recentCommits = commitsArrays
              .flat()
              .sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date))
              .slice(0, 5);
          } catch (commitError) {
            console.warn('Could not fetch commits:', commitError);
          }
        }

        setGithubData({
          profile,
          repositories,
          totalStars,
          totalForks,
          recentCommits,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('GitHub API Error:', error);
        setGithubData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchGitHubData();
  }, []);

  return githubData;
};

// Format date utility
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// Animate counter utility
export const useCountAnimation = (target, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
};
