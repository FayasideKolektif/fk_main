'use client';
import React from 'react';

const ArticleCard = ({ article }) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Get category name
  const getCategoryName = () => {
    if (article.fields?.articleCategory?.fields?.category) {
      return article.fields.articleCategory.fields.category;
    }
    return '';
  };

  return (
    <article className="article-card">
      <div
        className="article-image"
        style={{
          backgroundImage: `url('${article.fields?.image?.fields?.file?.url || '/placeholder-image.jpg'}')`
        }}
        onClick={() => window.location.href = `/blog/${article.fields?.slug}`}
      />
      
      <div className="article-content">
        <div className="article-meta">
          {getCategoryName() && <span className="article-category">{getCategoryName()}</span>}
          {article.fields?.date && <time className="article-date">{formatDate(article.fields.date)}</time>}
        </div>
        
        <h2>
          <a href={`/blog/${article.fields?.slug}`}>
            {article.fields?.title?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ')}
          </a>
        </h2>
      </div>
      
      <style jsx>{`
        .article-card {
          min-width: 350px;
          max-width: 350px;
          display: flex;
          flex-direction: column;
          transition: opacity 0.3s ease;
          border-bottom: 1px solid #eaeaea;
        }
        
        .article-card:hover {
          opacity: 0.85;
        }
        
        .article-image {
          height: 250px;
          width: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          cursor: pointer;
        }
        
        .article-content {
          padding: 1.5rem 0;
          background-color: white;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .article-meta {
          display: flex;
          align-items:center;
          margin-bottom: 0.8rem;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          color: #555;
          font-family: 'Times New Roman', serif;
        }
        
        .article-category {
          text-transform: uppercase;
          font-size:small;
          margin-right: 1rem;
          padding :5px 12px;
          background-color:whitesmoke;
          border-radius:5px
        }
        
        .article-content h2 {
          font-size: 1.25rem;
          font-weight: 300;
          letter-spacing: 1px;
          line-height: 1.4;
          margin: 0;
          font-family: 'Times New Roman', serif;
        }
        
        .article-content h2 a {
          color: #000;
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
        }
        
        .article-content h2 a:hover {
          color: #555;
        }
        
        @media screen and (max-width: 768px) {
          .article-card {
            min-width: 300px;
          }
          
          .article-image {
            height: 200px;
          }
          
          .article-content {
            padding: 1rem 0;
          }
          
          .article-content h2 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </article>
  );
};

export default ArticleCard;