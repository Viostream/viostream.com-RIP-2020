# About Viostream

Viostream is the Jekyll theme written for Viostream, using a responsive design
to optimize the display of mobile devices.

## Developing

(Prerequisites: docker)

1. Checkout the repo
2. Run `docker-compose up`
3. Browse to localhost:4000

## Deploy (until we get the new TeamCity agent deploying)

```
docker run --rm \
  -e JEKYLL_ENV=production \
  -v $(pwd):/srv/jekyll \
  jekyll/builder jekyll build
```
