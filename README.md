# Personal Website
![CI](https://github.com/ScottG489/scottg489.github.io/workflows/CI/badge.svg)

Project for my personal website, [giminiani.com](http://www.giminiani.com).
Created using the [Gatsby framework](https://github.com/gatsbyjs/gatsby).

## Posting

### Creating a new post

Simply add a new `.md` file in `src/content/posts` along with any other assets such as images. Be sure set the `layout` field in the Front Matter to "post". See other existing posts for examples.

### Getting the date for a blog post

In order to get a properly formatted date for a blog post you can use the following command:

```
date --utc +"%Y-%m-%dT%H:%M:%SZ"
```

Other formats probably work as well but this definitely does. See the source code on how it's parsed and displayed.
