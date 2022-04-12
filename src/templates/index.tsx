import { graphql, Link } from 'gatsby';
import { getSrc, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Pagination from '../components/Pagination';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  Posts,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteHeaderStyles,
} from '../styles/shared';
import config from '../website-config';
import { HomeFullTitle, PageContext } from './post';
import { ProjectCard } from '../components/ProjectCard';
import styled from '@emotion/styled';
import { ProjectContext } from './projects';

export interface IndexProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: any;
    header: any;
    posts: {
      edges: Array<{
        node: PageContext;
      }>;
    };
    projects: {
      edges: Array<{
        node: ProjectContext;
      }>;
    };
  };
}

function IndexPage({ data, pageContext }: IndexProps) {
  const width = getImage(data.header)?.width;
  const height = getImage(data.header)?.height;
  const posts = data.posts.edges;
  const projects = data.projects.edges;

  return (
    <IndexLayout css={HomePosts}>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:image" content={`${config.siteUrl}${getSrc(data.header)}`} />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.googleSiteVerification && (
          <meta name="google-site-verification" content={config.googleSiteVerification} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta name="twitter:image" content={`${config.siteUrl}${getSrc(data.header)}`} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width?.toString()} />
        <meta property="og:image:height" content={height?.toString()} />
      </Helmet>
      <Wrapper>
        <div
          css={[outer, SiteHeader, SiteHeaderStyles]}
          className="site-header-background"
          style={{
            backgroundImage: `url('${getSrc(data.header)}')`,
          }}
        >
          <div css={inner}>
            <SiteNav />
            <SiteHeaderContent className="site-header-content">
              <SiteTitle className="site-title">
                {data.logo ? (
                  <img
                    style={{ maxHeight: '200px' }}
                    src={getSrc(data.logo)}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
          </div>
        </div>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={[inner, Posts]}>
            <HomeContentHeader className="post-full-header">
              <Link to="/posts" css={HomeContentHeaderLink}>
                <HomeFullTitle className="post-full-title">
                  Posts
                </HomeFullTitle>
              </Link>
            </HomeContentHeader>
            <div css={[PostFeed]}>
              {posts.slice(0, 4).map((post, index) =>
                // filter out drafts in production
                (
                  (post.node.frontmatter.draft !== true
                    || process.env.NODE_ENV !== 'production') && (
                    <PostCard key={post.node.fields.slug} post={post.node} large={index === 0} />
                  )
                ),
              )}
            </div>
            <HomeContentHeader className="post-full-header">
              <Link to="/projects" css={HomeContentHeaderLink}>
                <HomeFullTitle className="post-full-title">
                  Projects
                </HomeFullTitle>
              </Link>
            </HomeContentHeader>
            <div css={[PostFeed]}>
              {projects.map(project => (<ProjectCard key={project.node.title} post={project.node} />))}
            </div>
          </div>
        </main>
        {pageContext.numPages > 1 && (
          <Pagination
            currentPage={pageContext.currentPage}
            numPages={pageContext.numPages}
          />
        )}
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export const pageQuery = graphql`
query blogPageQuery($skip: Int!, $limit: Int!) {
  logo: file(relativePath: { eq: "img/scott-logo.png" }) {
    childImageSharp {
      gatsbyImageData(layout: FIXED)
    }
  }
  header: file(relativePath: { eq: "posts/img/blog-cover.png" }) {
    childImageSharp {
      gatsbyImageData(width: 2000, quality: 100, layout: FIXED)
    }
  }
  posts: allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { draft: { ne: true } }, fileAbsolutePath: {regex: "/content/posts/"} }
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {
        frontmatter {
          title
          date
          tags
          draft
          excerpt
          image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
        excerpt
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
  projects: allProjectsYaml {
    edges {
      node {
        title
        link
        ghimage
        excerpt
        tags
      }
    }
  }
}
`;

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card-large {
      flex: 1 1 100%;
      flex-direction: row;
      border-top: 0;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large:not(.no-image) .post-card-header {
      margin: 15px 40px 0;
    }

    .post-card-large .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
    }

    .post-card-large .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-large .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large .post-card-content-link {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-meta {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
`;

export const HomeContentHeader = styled.header`
  a:hover {
    text-decoration: none;
  }
  position: relative;
  margin: 0 auto;
  padding: 50px 0px 0px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`;

const HomeContentHeaderLink = css`
  a:hover {
    text-decoration: none;
  }

  h1:hover {
    color: #26a6ed;
  }
`;

export default IndexPage;
