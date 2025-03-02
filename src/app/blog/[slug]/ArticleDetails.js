'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import '@/styles/article.css'


// Initialize Contentful client

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  });
  

export default function ArticleDetails() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fetch article by slug
  useEffect(() => {
    async function fetchArticleBySlug() {
      if (!params?.slug) return;
      
      try {
        setIsLoading(true);
        
        // Query for the article with matching slug
        const response = await client.getEntries({
          content_type: 'article',
          'fields.slug': params.slug,
          include: 2, 
        });
        
        if (response.items.length === 0) {
          setError('Article not found');
          setIsLoading(false);
          return;
        }
        
        const fetchedArticle = response.items[0];
        setArticle(fetchedArticle);
        
        // Fetch related articles with the same category
        if (fetchedArticle.fields.articleCategory) {
          const categoryId = fetchedArticle.fields.articleCategory.sys.id;
          
          const relatedResponse = await client.getEntries({
            content_type: 'article',
            'fields.publish': true,
            'fields.articleCategory.sys.id': categoryId,
            limit: 3,
            order: '-fields.date',
            'sys.id[ne]': fetchedArticle.sys.id, // Exclude current article
          });
          
          setRelatedArticles(relatedResponse.items);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
        setIsLoading(false);
      }
    }
    
    fetchArticleBySlug();
  }, [params?.slug]);

  // Rich Text Renderer Options
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
      [MARKS.CODE]: (text) => (
        <code style={{ 
          backgroundColor: '#f1f1f1', 
          padding: '2px 4px', 
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}>
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem' }}>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 style={{ fontSize: '2rem', marginTop: '1.8rem', marginBottom: '1rem' }}>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 style={{ fontSize: '1.75rem', marginTop: '1.6rem', marginBottom: '1rem' }}>{children}</h3>,
      [BLOCKS.HEADING_4]: (node, children) => <h4 style={{ fontSize: '1.5rem', marginTop: '1.4rem', marginBottom: '1rem' }}>{children}</h4>,
      [BLOCKS.HEADING_5]: (node, children) => <h5 style={{ fontSize: '1.25rem', marginTop: '1.2rem', marginBottom: '1rem' }}>{children}</h5>,
      [BLOCKS.HEADING_6]: (node, children) => <h6 style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '1rem' }}>{children}</h6>,
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote style={{ 
          borderLeft: '4px solid #ccc',
          paddingLeft: '1rem',
          fontStyle: 'italic',
          margin: '1.5rem 0'
        }}>
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #eaeaea' }} />,
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        // Safely access nested properties
        if (!node?.data?.target?.fields) {
          return <p>Asset not available</p>;
        }
        
        const { title, description, file } = node.data.target.fields;
        
        if (!file || !file.url) {
          return <p>File not available</p>;
        }
        
        const { url, contentType } = file;
        
        if (contentType && contentType.includes('image')) {
          const imageUrl = url.startsWith('//') ? `https:${url}` : url;
          
          return (
            <div style={{ margin: '2rem 0' }}>
              <img
                src={imageUrl}
                alt={description || title || 'Embedded Image'}
                style={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px'
                }}
              />
              {description && (
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#666', 
                  textAlign: 'center',
                  marginTop: '0.5rem'
                }}>
                  {description}
                </p>
              )}
            </div>
          );
        }
        
        return <p>Attachment: {title || 'Unnamed attachment'}</p>;
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <a 
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: '#0070f3',
            textDecoration: 'none',
            borderBottom: '1px solid #0070f3'
          }}
        >
          {children}
        </a>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        // Just render the children as text for safety
        return <span>{children}</span>;
      },
    },
  };

  // Handle back button click
  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '70vh' 
      }}>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        maxWidth: '800px', 
        margin: '2rem auto', 
        padding: '2rem', 
        textAlign: 'center',
        border: '1px solid #f0f0f0',
        borderRadius: '8px'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Error</h2>
        <p>{error}</p>
        <button 
          onClick={handleBackClick}
          style={{
            marginTop: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!article) return null;

  // Ensure we're dealing with image URLs correctly
  const imageUrl = article.fields.image?.fields?.file?.url 
    ? (article.fields.image.fields.file.url.startsWith('//') 
      ? `https:${article.fields.image.fields.file.url}` 
      : article.fields.image.fields.file.url)
    : null;

  return (
    <>
      <Head>
        <title>{article.fields.title || 'Blog Article'} | Blog</title>
        <meta name="description" content={article.fields.metaDescription || ''} />
        <meta name="keywords" content={article.fields.metaKeywords || ''} />
        {/* Open Graph */}
        <meta property="og:title" content={article.fields.title || 'Blog Article'} />
        <meta property="og:description" content={article.fields.metaDescription || ''} />
        {imageUrl && (
          <meta property="og:image" content={imageUrl} />
        )}
        <meta property="og:type" content="article" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.fields.title || 'Blog Article'} />
        <meta name="twitter:description" content={article.fields.metaDescription || ''} />
        {imageUrl && (
          <meta name="twitter:image" content={imageUrl} />
        )}
      </Head>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <button 
          onClick={handleBackClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 0',
            marginBottom: '2rem',
            color: '#666',
            fontSize: '0.9rem'
          }}
        >
          &larr; Back to Articles
        </button>

        <article>
          {/* Article Header */}
          <header style={{ marginBottom: '2rem' }}>

            
            <h1 className='section-title' style={{ 
              letterSpacing:1
            }}>
              {article.fields.title}
            </h1>

            
            {article.fields.tagline && (
              <p style={{ 
                fontSize: '1.25rem', 
                color: '#666',
                lineHeight: '1.5',
                marginBottom: '1.5rem'
              }}>
                {article.fields.tagline}
              </p>
            )}


          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '15px',
                fontSize: '0.8rem',
                marginRight: '1rem'
              }}>
                {article.fields.articleCategory?.fields?.category || 'Uncategorized'}
              </span>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                {formatDate(article.fields.date)}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #eaeaea',
              paddingBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '0.75rem',
                  fontWeight: 'bold',
                  color: '#666'
                }}>
                  {article.fields.author ? article.fields.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    {article.fields.author || 'Anonymous'}
                  </p>
                </div>
              </div>
              
              <div style={{ color: '#666', fontSize: '0.9rem',  display:'none'}}>
                {article.fields.views || 0} views
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          {imageUrl && (
            <div style={{ margin: '2rem 0' }}>
              <img
                src={imageUrl}
                alt={article.fields.image?.fields?.title || article.fields.title || 'Featured image'}
                style={{ 
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  maxHeight: '500px',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
          
          {/* Article Content */}
          <div style={{ 
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: '#333'
          }}>
            {article.fields.body && documentToReactComponents(article.fields.body, richTextOptions)}
          </div>
          

        </article>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div style={{ margin: '4rem 0' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Related Articles</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {relatedArticles.map(relatedArticle => {
                // Handle related article image URLs correctly
                const relatedImageUrl = relatedArticle.fields.image?.fields?.file?.url 
                  ? (relatedArticle.fields.image.fields.file.url.startsWith('//') 
                    ? `https:${relatedArticle.fields.image.fields.file.url}` 
                    : relatedArticle.fields.image.fields.file.url)
                  : null;
                  
                return (
                  <div
                    key={relatedArticle.sys.id}
                    style={{
                      border: '1px solid #eaeaea',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  >
                    {relatedImageUrl && (
                      <div
                        style={{
                          height: '150px',
                          background: `url(${relatedImageUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={() => router.push(`/articles/${relatedArticle.fields.slug}`)}
                      />
                    )}
                    <div style={{ padding: '15px' }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        <a
                          href={`/articles/${relatedArticle.fields.slug}`}
                          style={{
                            color: '#333',
                            textDecoration: 'none'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.color = '#0070f3';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.color = '#333';
                          }}
                        >
                          {relatedArticle.fields.title}
                        </a>
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: '#666' }}>
                        {formatDate(relatedArticle.fields.date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}