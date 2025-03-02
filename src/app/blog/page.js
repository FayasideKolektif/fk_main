'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import ArticleCard from '@/components/ArticleCard';

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function BlogHome() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const articlesPerPage = 6;

  // Fetch articles from Contentful
  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        
        // Query for published articles only (where publish field is true)
        const response = await client.getEntries({
          content_type: 'article',
          'fields.publish': true,
          order: '-fields.date', // Sort by date (newest first)
          select: 'sys.id,fields.title,fields.slug,fields.date,fields.image,fields.metaDescription,fields.articleCategory,fields.author,fields.views',
          limit: 1000, // Get all articles for filtering (we'll handle pagination client-side)
        });
        
        setArticles(response.items);
        setTotalArticles(response.items.length);
        setTotalPages(Math.ceil(response.items.length / articlesPerPage));
        
        // Extract unique categories from the articleCategory field
        const uniqueCategories = [...new Set(
          response.items
            .map(item => item.fields.articleCategory?.fields?.category)
            .filter(Boolean)
        )];
        
        setCategories(uniqueCategories);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
        setIsLoading(false);
      }
    }
    
    fetchArticles();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    if (!articles.length) return;
    
    let results = [...articles];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(article => 
        article.fields.title?.toLowerCase().includes(term) ||
        article.fields.metaDescription?.toLowerCase().includes(term) ||
        article.fields.author?.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(article => 
        article.fields.articleCategory?.fields?.category === selectedCategory
      );
    }
    
    setFilteredArticles(results);
    setTotalPages(Math.ceil(results.length / articlesPerPage));
    setCurrentPage(1); // Reset to first page on new search/filter
  }, [searchTerm, selectedCategory, articles]);

  // Get current page articles
  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 16px',
          margin: '0 5px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: currentPage === 1 ? '#f9f9f9' : 'white',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          color: currentPage === 1 ? '#ccc' : 'black'
        }}
      >
        &laquo; Prev
      </button>
    );
    
    // Determine page range to show
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);
    
    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }
    
    // First page button if needed
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          style={{
            padding: '8px 16px',
            margin: '0 5px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" style={{ margin: '0 5px' }}>...</span>);
      }
    }
    
    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            padding: '8px 16px',
            margin: '0 5px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: currentPage === i ? '#007bff' : 'white',
            color: currentPage === i ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          {i}
        </button>
      );
    }
    
    // Last page button if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" style={{ margin: '0 5px' }}>...</span>);
      }
      
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          style={{
            padding: '8px 16px',
            margin: '0 5px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          {totalPages}
        </button>
      );
    }
    
    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 16px',
          margin: '0 5px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: currentPage === totalPages ? '#f9f9f9' : 'white',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          color: currentPage === totalPages ? '#ccc' : 'black'
        }}
      >
        Next &raquo;
      </button>
    );
    
    return buttons;
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <header style={{
        marginBottom: '40px',
        textAlign: 'center'
      }}>

        
        {/* Search and Filter Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '15px',
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px'
          }}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '12px 20px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                outline: 'none'
              }}
            />
            <span style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#777'
            }}>
              🔍
            </span>
          </div>
          
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Status Messages */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading articles...</p>
        </div>
      )}
      
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          color: 'red',
          border: '1px solid red',
          borderRadius: '4px',
          margin: '20px 0'
        }}>
          <p>{error}</p>
        </div>
      )}

      {/* Results Count */}
      {!isLoading && !error && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#666' }}>
            Showing {filteredArticles.length} of {totalArticles} articles
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>
      )}

      {/* Articles Grid */}
      {!isLoading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '40px',
        }}>
          {getCurrentPageArticles().length > 0 ? (
            getCurrentPageArticles().map(article => (
              <ArticleCard key={article.sys.id} article={article} />
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center',
              padding: '40px',
              border: '1px solid #eee',
              borderRadius: '8px'
            }}>
              <p>No articles found. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Pagination */}
      {!isLoading && !error && filteredArticles.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: '30px'
        }}>
          {renderPaginationButtons()}
        </div>
      )}
      
      {/* Page Information */}
      {!isLoading && !error && filteredArticles.length > 0 && (
        <div style={{
          textAlign: 'center',
          marginTop: '15px',
          color: '#666',
          fontSize: '14px'
        }}>
          Page {currentPage} of {totalPages}
        </div>
      )}
    </div>
  );
}