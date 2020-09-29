import {format} from 'date-fns';
import {Link} from 'gatsby';
import Img from 'gatsby-image';
import _ from 'lodash';
import {lighten} from 'polished';
import React from 'react';

import {css} from '@emotion/core';
import styled from '@emotion/styled';

import {colors} from '../styles/colors';
import {PageContext} from '../templates/post';
import {AuthorList} from './AuthorList';
import {PostFullHeader} from "../templates/project";

export interface ProjectCardProps {
  post: PageContext;
  large?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({post, large = true}) => {
  const date = new Date(post.frontmatter.date);
  // 2018-08-20
  const datetime = format(date, 'yyyy-MM-dd');
  // 20 AUG 2018
  const displayDatetime = format(date, 'dd LLL yyyy');

  return (
    <article
      className={`post-card ${post.frontmatter.image ? '' : 'no-image'} ${
        large ? 'post-card-large' : ''
      }`}
      css={[PostCardStyles, large && PostCardLarge]}
    >
      {post.frontmatter.image && (
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=anuraghazra&repo=github-readme-stats&show_owner=true" alt="repo card"/>
      )}
      <PostCardContent className="post-card-content">
        <PostCardPrimaryTag className="post-card-primary-tag">
          {
            post.frontmatter.tags && post.frontmatter.tags.length > 0 && post.frontmatter.tags.map(tag => {
              return (
                <Link key={tag} to={`/tags/${_.kebabCase(tag)}/`}>
                  {tag}
                  {/* TODO: Not on last */}
                  {', '}
                </Link>
              );
            })
          }
        </PostCardPrimaryTag>
        <Link className="post-card-content-link" css={PostCardContentLink} to={post.fields.slug}>
          <PostCardHeader className="post-card-header">
            <PostCardTitle className="post-card-title">{post.frontmatter.title}</PostCardTitle>
          </PostCardHeader>
          <PostCardExcerpt className="post-card-excerpt">
            <p>{post.frontmatter.excerpt || post.excerpt}</p>
          </PostCardExcerpt>
        </Link>
      </PostCardContent>
    </article>
  );
};

const PostCardStyles = css`
  position: relative;
  flex: 1 1 301px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 0 40px;
  padding: 0 20px 40px;
  min-height: 220px;
  /* border-bottom: 1px solid color(var(--lightgrey) l(+12%)); */
  border-bottom: 1px solid ${lighten('0.12', colors.lightgrey)};
  background-size: cover;

  @media (prefers-color-scheme: dark) {
    /* border-bottom-color: color(var(--darkmode) l(+8%)); */
    border-bottom-color: ${lighten('0.08', colors.darkmode)};
  }
`;

const PostCardLarge = css`
  @media (min-width: 795px) {
    flex: 1 1 100%;
    flex-direction: row;
    padding-bottom: 40px;
    min-height: 280px;
    border-top: 0;

    :not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
      min-height: 380px;
    }

    .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
    }

    .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-content-link {
      padding: 0 0 0 40px;
    }

    .post-card-meta {
      padding: 0 0 0 40px;
    }

    .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PostCardContentLink = css`
  position: relative;
  display: block;
  /* color: var(--darkgrey); */
  color: ${colors.darkgrey};

  :hover {
    text-decoration: none;
  }
`;

const PostCardTitle = styled.h2`
  margin: 0 0 0.4em;
  line-height: 1.15em;
  transition: color 0.2s ease-in-out;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const PostCardExcerpt = styled.section`
  font-family: Georgia, serif;

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)} !important;
  }
`;

const PostCardHeader = styled.header`
  margin: 15px 0 0;
`;

export const StaticAvatar = css`
  display: block;
  overflow: hidden;
  margin: 0 0 0 -6px;
  width: 34px;
  height: 34px;
  border: #fff 2px solid;
  border-radius: 100%;

  @media (prefers-color-scheme: dark) {
    /* border-color: color(var(--darkgrey) l(+2%)); */
    border-color: ${lighten('0.02', colors.darkgrey)};
  }
`;

export const AuthorProfileImage = css`
  display: block;
  width: 100%;
  height: 100%;
  /* background: color(var(--lightgrey) l(+10%)); */
  background: ${lighten('0.1', colors.lightgrey)};
  border-radius: 100%;
  object-fit: cover;

  @media (prefers-color-scheme: dark) {
    background: ${colors.darkmode};
  }
`;

const PostCardPrimaryTag = styled.div`
  padding: 0 0 0 40px;
  margin: 0 0 0.2em;
  /* color: var(--blue); */
  color: ${colors.blue};
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;
