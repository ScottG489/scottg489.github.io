import { graphql } from 'gatsby';
import React from 'react';
import { getSrc } from 'gatsby-plugin-image';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteNavMain,
  SiteArchiveHeader,
  ResponsiveHeaderBackground,
  SiteHeaderBackground,
} from '../styles/shared';
import { Helmet } from 'react-helmet';
import config from '../website-config';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectContext } from './projects';

interface TagTemplateProps {
  location: Location;
  pageContext: {
    tag: string;
  };
  data: {
    allTagYaml: {
      edges: Array<{
        node: {
          yamlId: string;
          description: string;
          layout: string;
          image?: any;
        };
      }>;
    };
    projects: {
      edges: Array<{
        node: ProjectContext;
      }>;
    };
  };
}

function Tags({ pageContext, data, location }: TagTemplateProps) {
  const tag = pageContext.tag ? pageContext.tag : '';
  const { edges } = data.projects;
  const totalCount = edges.length;
  const tagData = data.allTagYaml.edges.find(n => n.node.yamlId.toLowerCase() === tag.toLowerCase());

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {tag} - {config.title}
        </title>
        <meta name="description" content={tagData?.node ? tagData.node.description : ''} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${tag} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + location.pathname} />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tag} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + location.pathname} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper>
        <header className="site-archive-header" css={[SiteHeader, SiteArchiveHeader]} >
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
          <ResponsiveHeaderBackground
            css={[outer, SiteHeaderBackground]}
            backgroundImage={getSrc(tagData?.node?.image)}
            className="site-header-background"
          >
            <SiteHeaderContent css={inner} className="site-header-content">
              <SiteTitle className="site-title">{tag}</SiteTitle>
              <SiteDescription className="site-description">
                {tagData?.node.description ? (
                  tagData.node.description
                ) : (
                  <>
                    A collection of {totalCount > 1 && `${totalCount} projects`}
                    {totalCount === 1 && '1 project'}
                    {totalCount === 0 && 'No projects'}
                  </>
                )}
              </SiteDescription>
            </SiteHeaderContent>
          </ResponsiveHeaderBackground>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed]}>
              {edges.map(({ node }) => (
                <ProjectCard key={node.title} post={node} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allTagYaml {
      edges {
        node {
          yamlId
          description
        }
      }
    }
    projects: allProjectsYaml(
      filter: { tags: { in: [$tag] } }
     ) {
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
