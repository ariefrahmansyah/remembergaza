[![Ceasefire Now](https://badge.techforpalestine.org/default)](https://techforpalestine.org/learn-more)

# Remember Gaza

This repository contains source code for https://www.remembergaza.id website. It fetches the datasets from the [Palestine Datasets](https://data.techforpalestine.org/).

The current version of the website is a Phoenix (Elixir) app. The code is stored in `phoenix` directory. It uses WebSocket to push the victims' names to the browser. The app then got deployed on Fly.io and there is [a GitHub workflow](.github/workflows/fly-restart.yaml) that will restart the Fly machines every 4 hours so it can retrieve the latest data.

The previous version is a static HTML that contains all victims names. It was built using Astro and deployed on Vercel. For comparison, you can check the previous version here: https://remembergaza.vercel.app.
