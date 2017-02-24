# Pocket unread list

> Simple service to get list of titles from your unread pocket list

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

You have to have these variables ready to pass to docker: $POCKET_CONSUMER_KEY, $POCKET_ACCESS_TOKEN either put them in the env, they will be passed on to the docker run function, or modify docker run function in package.json
To get the consumer key - create an application in [Pocker Developer console](https://getpocket.com/developer/), to get access_tocken you can use [Authentificator](http://reader.fxneumann.de/plugins/oneclickpocket/auth.php)

```console
    docker pull dkunin/pocket-unread-list
    docker run -p 5050:5050 -e POCKET_CONSUMER_KEY=$POCKET_CONSUMER_KEY -e POCKET_ACCESS_TOKEN=$POCKET_ACCESS_TOKEN -d dkunin/pocket-unread-list 
```

Or if you want to modify/build your own image

```console
    git clone git@github.com:DKunin/pocket-unread-list
    npm run docker-image-build
    npm run docker-image-start
```

## Usage

```console
    curl http://localhost:5050/api/pocket 
```

```javascript
    {
        "count":13,
        "list":[
        {
        "word_count":"1444",
        "sort":0,
        "title":"Building a JSON Tree View Component in Vue.js from Scratch in Six Steps",
        "url":"https://devblog.digimondo.io/building-a-json-tree-view-component-in-vue-js-from-scratch-in-six-steps-ce0c05c2fdd8#.9r9dxy8cr"}]},//...
```

## Contribute

PRs are welcome.

## License

MIT © Dmitri Kunin
