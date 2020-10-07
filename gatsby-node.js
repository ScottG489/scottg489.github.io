/* eslint-disable @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-var-requires */
const path = require('path');
const _ = require('lodash');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.
  // eslint-disable-next-line default-case
  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { permalink, layout, primaryTag } = node.frontmatter;
      const { relativePath } = getNode(node.parent);

      let slug = permalink;

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`;
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || '',
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || '',
      });

      createNodeField({
        node,
        name: 'primaryTag',
        value: primaryTag || '',
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: ASC }
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            excerpt
            timeToRead
            frontmatter {
              title
              tags
              date
              draft
              excerpt
              image {
                childImageSharp {
                  fluid(maxWidth: 3720) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
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
      allAuthorYaml {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  const postResults = await graphql(`
    {
      allMarkdownRemark(
        limit: 2000
        sort: { fields: [frontmatter___date], order: ASC }
        filter: { frontmatter: { draft: { ne: true } }, fileAbsolutePath: {regex: "/content/posts/"} }
      ) {
        edges {
          node {
            excerpt
            timeToRead
            frontmatter {
              title
              tags
              date
              draft
              excerpt
              image {
                childImageSharp {
                  fluid(maxWidth: 3720) {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
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
  `);

  const projectResults = await graphql(`
    {
      projects: allProjsYaml {
        edges {
          node {
            id
            layout
            title
            link
            ghimage
            order
            draft
            excerpt
            tags
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  // Create post pages
  const posts = postResults.data.allMarkdownRemark.edges;
  const projects = projectResults.data.projects.edges;

  // Create paginated index
  // TODO: new pagination
  const postsPerPage = 1000;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/' : `/${i + 1}`,
      component: path.resolve('./src/templates/index.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: '/posts',
      component: path.resolve('./src/templates/posts.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: '/projects',
      component: path.resolve('./src/templates/projects.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach(({ node }, index) => {
    const { slug, layout } = node.fields;
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
        prev,
        next,
        primaryTag: node.frontmatter.tags ? node.frontmatter.tags[0] : '',
      },
    });
  });

  // Create tag pages
  const postTagTemplate = path.resolve('./src/templates/tags.tsx');
  const projectTagTemplate = path.resolve('./src/templates/project-tags.tsx');
  const postTags = _.uniq(
    _.flatten(
      posts.map(edge => {
        return _.castArray(_.get(edge, 'node.frontmatter.tags', []));
      }),
    ),
  );
  postTags.forEach(tag => {
    createPage({
      path: `/posts/tags/${_.kebabCase(tag)}/`,
      component: postTagTemplate,
      context: {
        tag,
      },
    });
  });

  const projectTags = _.uniq(
    _.flatten(
      projects.map(edge => {
        return _.castArray(_.get(edge, 'node.tags', []));
      }),
    ),
  );
  projectTags.forEach(tag => {
    createPage({
      path: `/projects/tags/${_.kebabCase(tag)}/`,
      component: projectTagTemplate,
      context: {
        tag,
      },
    });
  });

  const aboutTemplate = path.resolve('./src/templates/author.tsx');
  createPage({
    path: '/about',
    component: aboutTemplate,
    context: {
      author: result.data.allAuthorYaml.edges[0].node.id,
    },
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // adds sourcemaps for tsx in dev mode
  if (stage === 'develop' || stage === 'develop-html') {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  }
};
