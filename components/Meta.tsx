import type {NextPage} from 'next';
import Head from 'next/head';

type Props = {
  title?: string;
  page?: string;
  icon?: string;
  keywords?: string;
  description?: string;
  websiteUrl?: string;
  type?: string;
  siteName?: string;
  imageSource?: string;
  imageType?: string;
  imageAltText?: string;
  imageWidth?: string;
  imageHeight?: string;
  twitterCard?: string;
  twitterName?: string;
};

export const Meta: NextPage<Props> = ({
  title,
  page,
  icon,
  keywords,
  description,
  websiteUrl,
  type,
  siteName,
  imageSource,
  imageType,
  imageAltText,
  imageWidth,
  imageHeight,
  twitterCard,
  twitterName,
}) => {
  return (
    <Head>
      {/* General */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta charSet="utf-8"></meta>
      <meta name="robots" content="follow, index" />
      <meta name="keywords" content={keywords}></meta>
      <link rel="canonical" href={websiteUrl} />
      <meta name="description" content={description} />
      <link rel="icon" href={icon ? icon : '/my-favicon.ico'} />
      <title>{`${title}${page ? ` | ${page}` : ''}`}</title>
      {/* Open Graph */}
      <meta property="og:url" content={websiteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={imageSource} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:alt" content={imageAltText} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterName} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageSource} />
      <meta name="twitter:image:alt" content={imageAltText} />
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Where in the World',
  page: '',
  keywords: 'web development, programming, next.js',
  description:
    'Version 2.0 of the Where in the World app, built with Next.js and Chakra UI.',
  imageSource: 'https://imgur.com/e3krsrU',
  imageType: 'image/png',
  imageAltText:
    'Version 2.0 of the Where in the World app, built with Next.js and Chakra UI.',
  imageWidth: '1902',
  imageHeight: '928',
  type: 'website',
  websiteUrl: 'https://where-in-the-world-by-chowjiaming.netlify.app',
  siteName: 'Where in the World',
  twitterCard: 'summary_large_image',
  twitterName: '@chowjiaming',
};

Meta.displayName = 'Meta';
