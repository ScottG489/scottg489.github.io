import { Link } from 'gatsby';
import _ from 'lodash';
import { lighten } from 'polished';
import React from 'react';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { colors } from '../styles/colors';
import { ProjectContext } from '../templates/projects';

export interface ProjectCardProps {
  post: ProjectContext;
  large?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ post, large = true }) => {
  const { ghimage, link } = post;
  const { title } = post;

  return (
    <article
      className={`post-card 'no-image' ${
        large ? 'post-card-large' : ''
      }`}
      css={[PostCardStyles, large && PostCardLarge]}
    >
      {ghimage && (
        <ProjectCardImage href={link} target="_blank" rel="noopener noreferrer">
          <img src={ghimage} alt={`${title} GitHub repo card`}/>
        </ProjectCardImage>
      )}
      <PostCardContent className="post-card-content">
        <PostCardHeader className="post-card-header">
          {
            post.tags && post.tags.length > 0 && post.tags.map((tag, index, arr) => {
              return (
                <Link
                  key={tag} className="post-card-primary-tag"
                  to={`/projects/tags/${_.kebabCase(tag)}/`}
                >
                  {tag}
                  {index === arr.length - 1 || ', '}
                </Link>
              );
            })
          }
        </PostCardHeader>
        <PostCardContentText className="post-card-content-link">
          <PostCardTitle className="post-card-title">{post.title}</PostCardTitle>
          <PostCardExcerpt className="post-card-excerpt">
            <p>{post.excerpt || post.excerpt}</p>
          </PostCardExcerpt>
        </PostCardContentText>
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
  margin: 0 0 20px;
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

  .post-card-primary-tag {
    margin: 0 0 0.2em;
    /* color: var(--blue); */
    color: ${colors.blue};
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }
`;

const PostCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PostCardContentText = styled.div`
  .post-card-content-link {
    padding: 0 0 0 40px;
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
  @media (min-width: 795px) {
    margin: 15px 40px 0;
  }

  margin: 15px 0 0;
`;

const ProjectCardImage = styled.a`
  align-self: center;
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
