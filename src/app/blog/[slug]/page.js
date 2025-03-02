import ArticleDetails from "./ArticleDetails";
export default function ArticleDetailsPage({ params }) {
    return <ArticleDetails slug={params.slug} />;
  }
  