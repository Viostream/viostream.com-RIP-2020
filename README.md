# About Viostream

Viostream is the Jekyll theme written for Viostream, using a responsive design
to optimize the display of mobile devices.

## Developing

(Prerequisites: docker)

1. Checkout the repo
2. Run `docker-compose up`
3. Browse to localhost:4000

## Deploy (until we move this to github actions / Octopus)

```
docker run --rm \
  -e JEKYLL_ENV=production \
  -v $(pwd):/srv/jekyll \
  jekyll/builder jekyll build

cd _site
aws-vault exec viocorp-superuser -- aws s3 sync ./ s3://viostream-com-production/
```