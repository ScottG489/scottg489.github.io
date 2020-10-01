import { graphql } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { FluidObject } from 'gatsby-image';

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
      id: string;
      website?: string;
      twitter?: string;
      facebook?: string;
      location?: string;
      profile_image?: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      bio?: string;
      avatar: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
}

const Author = ({ data, location }: AuthorTemplateProps) => {
  const author = data.authorYaml;

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {author.id} - {config.title}
        </title>
        <meta name="description" content={author.bio} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${author.id} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + location.pathname} />
        <meta property="article:publisher" content="https://www.facebook.com/ghost" />
        <meta property="article:author" content="https://www.facebook.com/ghost" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${author.id} - ${config.title}`} />
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
            backgroundImage={author.profile_image?.childImageSharp.fluid.src}
            css={[outer, SiteHeaderBackground]}
            className="site-header-background"
          >
            <div css={inner}>
              <SiteHeaderContent css={AuthorHeader} className="site-header-content author-header">
                <img
                  style={{ marginTop: '8px' }}
                  css={[AuthorProfileImage, AuthorProfileBioImage]}
                  src={data.authorYaml.avatar.childImageSharp.fluid.src}
                  alt={author.id}
                />
                <AuthHeaderContent className="author-header-content">
                  <SiteTitle className="site-title">{author.id}</SiteTitle>
                  {author.bio && <AuthorBio className="author-bio">{author.bio}</AuthorBio>}
                  <div css={AuthorMeta} className="author-meta">
                    {author.location && (
                      <div className="author-location" css={[HiddenMobile]}>
                        {author.location}
                      </div>
                    )}
                    {author.website && (
                      <AuthorSocialLink className="author-social-link">
                        <AuthorSocialLinkAnchor
                          href={author.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Website
                        </AuthorSocialLinkAnchor>
                      </AuthorSocialLink>
                    )}
                    {author.twitter && (
                      <AuthorSocialLink className="author-social-link">
                        <AuthorSocialLinkAnchor
                          href={`https://twitter.com/${author.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </AuthorSocialLinkAnchor>
                      </AuthorSocialLink>
                    )}
                    {author.facebook && (
                      <AuthorSocialLink className="author-social-link">
                        <AuthorSocialLinkAnchor
                          href={`https://www.facebook.com/${author.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Facebook
                        </AuthorSocialLinkAnchor>
                      </AuthorSocialLink>
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
                    A starter template for Gatsby <br /> GitHub: <a href="https://github.com/scttcper/gatsby-casper">scttcper/gatsby-casper</a>
                  </h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc commodo finibus leo,
                    non tempus magna vehicula ac. Maecenas mollis ante finibus pharetra imperdiet.
                    Maecenas in aliquam purus. Nam et massa a nulla fermentum dapibus sit amet in
                    neque. Ut ipsum ipsum, rhoncus a sodales pellentesque, interdum a elit. Nullam
                    aliquam tellus nibh, eget laoreet dui aliquet non. Vestibulum malesuada ante at
                    diam tempus, ac interdum risus scelerisque. Sed ipsum neque, vulputate porta diam
                    eget, consequat blandit nulla. Integer volutpat velit vitae purus lacinia aliquam.
                    Integer bibendum ipsum vitae magna pulvinar, nec vehicula dolor vulputate. Nulla
                    eu massa id orci placerat finibus vel sit amet eros. Vestibulum quis consequat
                    massa. Sed sagittis sollicitudin massa at commodo. Praesent diam nisi, imperdiet
                    posuere eleifend nec, blandit ac massa.
                  </p>
                  <p>
                    Vestibulum semper pretium ipsum nec congue. Ut ac eros nisi. Donec leo sem,
                    aliquam mollis sapien ultrices, dapibus congue diam. Proin viverra dapibus
                    blandit. Ut mauris tellus, tristique id felis vel, venenatis vestibulum nunc. Nam
                    molestie pulvinar nibh, eget egestas augue. Maecenas tellus arcu, mattis ut ipsum
                    non, sollicitudin convallis nunc. Donec nec neque tristique, aliquet lacus id,
                    laoreet nunc. Cras dapibus nisi nulla, ullamcorper faucibus neque suscipit ac.
                    Donec eget orci venenatis justo lobortis volutpat. Proin vel placerat nisl.
                    Integer arcu nunc, sodales eu fringilla non, aliquam non diam. Cras placerat,
                    massa et faucibus pretium, ante elit tincidunt tellus, tristique ultricies velit
                    quam et massa.
                  </p>
                  <p>
                    In nunc lacus, dapibus vitae lacus sit amet, efficitur iaculis neque. Suspendisse
                    ut tellus quis leo vestibulum tincidunt. Aenean nec enim ac dolor lacinia semper.
                    Ut sed laoreet libero. Nunc elementum sollicitudin accumsan. Nunc eu augue neque.
                    Proin a tortor nibh. Cras eu nisl ornare sapien feugiat pellentesque. Mauris
                    dignissim vel quam eu pellentesque. Integer sit amet posuere quam, eu ullamcorper
                    odio. Nullam a lacus tempus sapien dignissim ullamcorper. In hac habitasse platea
                    dictumst. Proin quis massa aliquam, feugiat tortor sit amet, tincidunt urna. Donec
                    posuere pulvinar lectus, ac semper ipsum vulputate quis.
                  </p>
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export const pageQuery = graphql`
  query($author: String) {
    authorYaml(id: { eq: $author }) {
      id
      website
      twitter
      bio
      facebook
      location
      profile_image {
        childImageSharp {
          fluid(maxWidth: 3720) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
        childImageSharp {
          fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
            ...GatsbyImageSharpFluid
          }
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
          timeToRead
          frontmatter {
            title
            excerpt
            tags
            date
            draft
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
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

const AuthorSocialLink = styled.span`
  display: inline-block;
  margin: 0;
  padding: 6px 0;
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

const AuthorSocialLinkAnchor = styled.a`
  color: #fff;
  font-weight: 600;

  :hover {
    opacity: 1;
  }
`;

export default Author;
