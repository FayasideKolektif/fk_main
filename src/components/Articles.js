"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await client.getEntries({ content_type: "article" });
        setArticles(response.items);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="articles">
      <h3 className="section-title">Articles</h3>

      {loading ? (
        <div className="articles-container">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="article-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-description"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="articles-container">
          {articles.map((article) => (
            <ArticleCard key={article.sys.id} article={article} />
          ))}
        </div>
      )}

      <Link href="/blog?category=article">
        <button id="readmore">
          All Articles
        </button>
      </Link>

      <style jsx>{`
        .articles {
          padding: 4rem 2rem;

        }
                
        .articles-container {
          display: flex;
          gap: 2rem;
          margin-bottom: 3rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }
        
        .articles-container::-webkit-scrollbar {
          height: 4px;
        }
        
        .articles-container::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        .article-skeleton {
          min-width: 350px;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .skeleton-image {
          height: 200px;
          background-color: #f5f5f5;
          margin-bottom: 15px;
        }
        
        .skeleton-content {
          padding: 0 15px 15px;
        }
        
        .skeleton-title {
          height: 24px;
          width: 80%;
          background-color: #f5f5f5;
          margin-bottom: 15px;
        }
        
        .skeleton-description {
          height: 16px;
          width: 60%;
          background-color: #f5f5f5;
        }
        
        #readmore {
          border: 1px solid black;
          background-color: transparent;
          color: black;
          padding: 0.8em 2.5em;
          font-size: 0.9rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 400;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        #readmore:hover {
          background-color: black;
          color: white;
        }
        
        @media screen and (max-width: 768px) {
          .articles {
            padding: 0 1rem;
            margin-top: 3rem;
          }
          
          
          #readmore {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Articles;