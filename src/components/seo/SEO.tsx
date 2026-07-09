import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const siteConfig = {
  title: "HAZA Tech — AI Engineer Portfolio",
  description: "Senior AI Engineer specializing in LLMs, computer vision, and MLOps. Building production-grade intelligent systems.",
  image: "https://alexchen.dev/og-image.png",
  url: "https://alexchen.dev",
  name: "HAZA Tech",
  twitterHandle: "@alexchen_ai",
};

export function SEO({
  title,
  description = siteConfig.description,
  image = siteConfig.image,
  url = siteConfig.url,
  type = "website",
}: SEOProps) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteConfig.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#09090b" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
          jobTitle: "AI Engineer",
          description: siteConfig.description,
          sameAs: [
            "https://github.com/alexchen",
            "https://linkedin.com/in/alexchen",
            "https://twitter.com/alexchen_ai",
          ],
        })}
      </script>
    </Helmet>
  );
}
