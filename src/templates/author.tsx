import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { getSrc } from 'gatsby-plugin-image';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  AuthorProfileImage,
  inner,
  outer,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
  SiteArchiveHeader,
  SiteNavMain,
  ResponsiveHeaderBackground,
  SiteHeaderBackground,
} from '../styles/shared';
import { NoImage, PageContext, PostFull, PostFullHeader, PostFullTitle } from './post';
import { Helmet } from 'react-helmet';
import config from '../website-config';
import { PostFullContent } from '../components/PostContent';

interface AuthorTemplateProps {
  location: Location;
  data: {
    logo: {
      childImageSharp: {
        fluid: any;
      };
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
    authorYaml: {
      name: string;
      website?: string;
      twitter?: string;
      facebook?: string;
      location?: string;
      profile_image?: any;
      bio?: string;
      avatar: any;
    };
  };
}

function Author({ data, location }: AuthorTemplateProps) {
  const author = data.authorYaml;

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {author.name} - {config.title}
        </title>
        <meta name="description" content={author.bio} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${author.name} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + location.pathname} />
        <meta property="article:publisher" content="https://www.facebook.com/ghost" />
        <meta property="article:author" content="https://www.facebook.com/ghost" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${author.name} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + location.pathname} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <header className="site-archive-header" css={[SiteHeader, SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>

          <ResponsiveHeaderBackground
            backgroundImage={getSrc(author.profile_image)}
            css={[outer, SiteHeaderBackground]}
            className="site-header-background"
          >
            <div css={inner}>
              <SiteHeaderContent css={AuthorHeader} className="site-header-content author-header">
                <img
                  style={{ marginTop: '8px' }}
                  css={[AuthorProfileImage, AuthorProfileBioImage]}
                  src={getSrc(data.authorYaml.avatar)}
                  alt={author.name}
                />
                <AuthHeaderContent className="author-header-content">
                  <SiteTitle className="site-title">{author.name}</SiteTitle>
                  {author.bio && <AuthorBio className="author-bio">{author.bio}</AuthorBio>}
                  <div css={AuthorMeta} className="author-meta">
                    {author.location && (
                      <div className="author-location" css={[HiddenMobile]}>
                        {author.location}
                      </div>
                    )}
                  </div>
                </AuthHeaderContent>
              </SiteHeaderContent>
            </div>
          </ResponsiveHeaderBackground>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article className="post page" css={[PostFull, NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTitle className="post-full-title">About</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <h5>
                    Me
                  </h5>
                  <p>
                    Something something something something...
                  </p>
                  <p><small><a href="https://lh3.googleusercontent.com/pw/ACtC-3c0EBDHOGuYfq2wP0sKXSqyNdZXYw53r-6hvYclhuKwku8Mrl80gMZri4mXU_sDibV6vDNtTlhhNRLjP_zugSova1CSSMM4rVKA5AmH9gGEOILQguehzJv2yyxrhF9yN4qcjoLnrtGSsUZXygW5dDLCwA=w2012-h474-no?authuser=0">Header photo</a> courtesy of <a href="https://www.instagram.com/theknio/">Tom Flanagan</a>. He is so courteous.</small></p>
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export const pageQuery = graphql`
  query ($author: String) {
    authorYaml(id: { eq: $author }) {
      id
      name
      website
      twitter
      bio
      facebook
      location
      profile_image {
        childImageSharp {
          gatsbyImageData
        }
      }
      avatar {
        childImageSharp {
          gatsbyImageData(quality: 100, breakpoints: [40, 80, 120], layout: FULL_WIDTH)
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2000
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            excerpt
            tags
            date
            draft
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
          fields {
            readingTime {
              text
            }
            layout
            slug
          }
        }
      }
    }
  }
`;

const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const AuthorHeader = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10vw 0 10px;
  align-items: center;

  @media (max-width: 500px) {
    padding: 10px 0 0;

    /* no image */
    padding-bottom: 10px;
  }
`;

const AuthorMeta = css`
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin: 0 0 0 1px;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  white-space: nowrap;

  .author-location + .author-stats:before,
  .author-stats + .author-social-link:before,
  .author-social-link + .author-social-link:before {
    content: '•';
    display: inline-block;
    margin: 0 12px;
    color: #fff;
    opacity: 0.6;
  }

  @media (max-width: 500px) {
    margin-top: 8px;
  }

  @media (max-width: 700px) {
    .author-location,
    .author-stats,
    .author-stats + .author-social-link:first-of-type:before {
      display: none;
    }
  }

  .author-location {
    margin-right: 50px;
  }
`;

const AuthorBio = styled.h2`
  z-index: 10;
  flex-shrink: 0;
  margin: 6px 0 0;
  max-width: 46em;
  font-size: 2rem;
  line-height: 1.3em;
  font-weight: 400;
  opacity: 0.8;
`;

const AuthHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0 0 30px;
  @media (max-width: 500px) {
    align-items: center;
    margin: 16px 0 0 0;
  }
`;

// .site-header-content .author-profile-image
const AuthorProfileBioImage = css`
  z-index: 10;
  flex-shrink: 0;
  margin: -4px 0 0;
  width: 110px;
  height: 110px;
  box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 6px;
  border-radius: 100%;
`;

export default Author;
