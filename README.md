# Personal Website
![CI](https://github.com/ScottG489/scottg489.github.io/workflows/CI/badge.svg)

Project for my personal website, [giminiani.com](http://www.giminiani.com).
Created using the [Gatsby framework](https://github.com/gatsbyjs/gatsby).

## Development
Run `npm start` to start the development server.

Run `./test.sh` to run full CI build. Be sure to comment out lines that you don't want to occur such as prod deployment
lines or lines relating to infra testing in cases where no infra changes have occurred.

## Testing
Run `npm run build && npm run serve` to build and serve the production build.

Right now there aren't any tests so all pages need to be verified manually. Unless we decide to add some advanced
testing functionality that can even verify styling, this will probably have to be done indefinitely. However,
there aren't too many types of pages. Here are types of pages that should be verified:
- Home
- Posts
  - 1 or more specific post
  - Post tags (plus ideally one that has a header image)
- Projects
  - Project tags (not sure if they support header images? Or at least none are being used at the moment)
- About
- Resume link
- RSS feed
- 404 page

Make sure the pages look as expected and particularly compare them against the old version if no changes should
have occurred.

## Posting
### Creating a new post

Simply add a new `.md` file in `src/content/posts` along with any other assets such as images.
Be sure set the `layout` field in the Front Matter to "post". See other existing posts for examples.

### Getting the date for a blog post

In order to get a properly formatted date for a blog post you can use the following command:

```
date --utc +"%Y-%m-%dT%H:%M:%SZ"
```

Other formats probably work as well but this definitely does. See the source code on how it's parsed and displayed.
