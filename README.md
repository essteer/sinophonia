<h1 align="center" id="title">SINOPHONIA 華品</h1>

<p align="center">
  <a href="https://sinophonia.com/"><img src="https://img.shields.io/github/deployments/essteer/sinophonia/production?name=Vercel&?style=flat&logo=Vercel&label=Vercel"></a>
  <a href="https://snyk.io/test/github/essteer/sinophonia"><img src="https://snyk.io/test/github/essteer/sinophonia/badge.svg?name=Snyk&style=flat&logo=Snyk"></a>
</p>

<p align="center">
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&labelColor=555&logo=HTML5&logoColor=white"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-1572B6.svg?style=flat&labelColor=555&logo=CSS3&logoColor=white"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&labelColor=555&logo=JavaScript&logoColor=white"></a>
  <a href="https://ejs.co/"><img src="https://img.shields.io/badge/EJS-A91E50.svg?style=flat&labelColor=555&logo=EJS&logoColor=white"></a>
  <a href="https://daringfireball.net/projects/markdown/"><img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&labelColor=555&logo=Markdown&logoColor=white"></a>
  <a href="https://nodejs.org/en"><img src="https://img.shields.io/badge/Node.js-5FA04E.svg?style=flat&labelColor=555&logo=nodedotjs&logoColor=white"></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-000000.svg?style=flat&labelColor=555&logo=Vercel&logoColor=white"></a>
</p>

I built Sinophonia as an ongoing project to introduce Chinese-language writing, recordings and other media, as well as to share information on where to find physical books, Chinese-supported podcast platforms, and related resources.

This is and was my first effort at developing a public-facing website, and makes use of standard HTML and CSS tools. A less common component is the use of Embedded JavaScript, a templating tool that enables JavaScript to be written directly into HTML. More recently I've experimented with rendering content from Markdown pages as well.

## Contents

- [Development](#development)
  - [Installation](#installation)
  - [Operation](#operation)
- [Deployment](#deployment)
- [Content](#content)
  - [Fonts](#fonts)
  - [Images](#images)
  - [Vertical text](#vertical-text)
  - [Writing](#writing)
- [Acknowledgements](#acknowledgements)

## Development

### Installation

[![Git](https://img.shields.io/badge/Git-F05032.svg?style=flat&labelColor=555&logo=Git&logoColor=white)](https://github.com/essteer/sinophonia)

Clone the repo from GitHub:

```console
$ git clone git@github.com:essteer/sinophonia
```

Navigate to the root directory and install the packages using `npm`:

```console
$ cd sinophonia
$ npm install
```

### Operation

[![Node](https://img.shields.io/badge/Node.js-5FA04E.svg?style=flat&labelColor=555&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)

To run on a local machine for local development, navigate to the root directory and run:

```console
$ npx nodemon src/index.js
[nodemon] 3.1.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Serving on port 3000
```

`nodemon` is used to render changes made during development without needing to re-launch the server.

<h3 align="center">
  <a href="#title"><img src="https://img.shields.io/badge/▲%20Top%20▲-0466c8.svg?style=flat"></a>
</h3>

## Deployment

[![GitHub](https://img.shields.io/badge/GitHub-181717.svg?style=flat&labelColor=555&logo=GitHub&logoColor=white)](https://github.com/essteer/sinophonia)
[![Vercel](https://img.shields.io/badge/Vercel-000000.svg?style=flat&labelColor=555&logo=Vercel&logoColor=white)](https://vercel.com)

The website is deployed via [Vercel](https://vercel.com/) using a `CI/CD` workflow integrated with the GitHub repository.

A major benefit of integrating with `Vercel` in this way is the ability to view preview deployments from pull requests.

Basic settings for `Vercel` are contained in `vercel.json` in the project root.

<h3 align="center">
  <a href="#title"><img src="https://img.shields.io/badge/▲%20Top%20▲-0466c8.svg?style=flat"></a>
</h3>

## Content

Notes on the website content and frontend decisions.

### Fonts

[![GoogleFonts](https://img.shields.io/badge/Google%20Fonts-4285F4.svg?style=flat&labelColor=555&logo=Google-Fonts&logoColor=white)](https://fonts.google.com/)

The site uses [Google Fonts](https://fonts.google.com/) for title text (`Oswald`: Latin script | `ZCOOL QingKe HuangYou`: Chinese script) and body text (`Source Serif Pro`: Latin script | `Noto Serif TC`: Chinese script).

`ZCOOL QingKe HuangYou` is primarily designed for simplified Chinese character sets, though it contains traditional variants for most &mdash; but not all &mdash; characters.

Sinophonia makes use of traditional characters, most of which are featured in `ZCOOL QingKe HuangYou`. There are a small number of exceptions for which I have had to make use of simplified variants. This isn't ideal, but I love the design of the font and decided it is worth the trade-off. Purists please 諒解 - or better yet, release more fonts! There aren't enough creative designs for Chinese scripts.

#### Optimisation

To optimise use of web fonts, practices have been adopted from [CSS Wizardy](https://csswizardry.com/2020/05/the-fastest-google-fonts/)'s additive method:

- `&display=swap` at the end of the href link is now default with Google Fonts - this allows the system font to load if there is a delay in fetching the web font.
- `media="print"` to fetch Google Fonts File asynchronously.
- Preload the CSS file to make the asynchronous fetch high priority.
- Preconnect fonts.gstatic.com, disabling the default fonts.googleapis.com preconnect.
- A `noscript` fallback is also included for instances where JavaScript is disabled.

### Images

[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5.svg?style=flat&labelColor=555&logo=Cloudinary&logoColor=white)](https://cloudinary.com)

Images are hosted on [Cloudinary](https://cloudinary.com/), and include artworks, photographs, official logos and so on.

Attributions are explicit and I have sought permission from owners to use their images &mdash; many have kindly granted this permission, but if you are the author of content here that you would like to be removed or amended then contact me directly on [editor@sinophonia.com](editor@sinophonia.com).

### Vertical text

[![CSS](https://img.shields.io/badge/CSS3-1572B6.svg?style=flat&labelColor=555&logo=CSS3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

A challenge arose when designing a page that contains Chinese text displayed in vertical format. I wanted to present two text-boxes that showed the same passage rendered horizontally and then vertically.

Horizontal display that adapts to screen size changes is easily achieved through standard tools and attributes such as flexbox.

Vertical display is less straightforward. A W3C article "[Styling vertical Chinese, Japanese, Korean and Mongolian text](https://www.w3.org/International/articles/vertical-text/)" got me started with wrapping text in columns, but achieving a responsive display proved more difficult.

I initially wanted to begin with a fixed height for the text-box on screens wide enough to achieve a given number of columns, but then extend the height of the columns as the screen narrowed. The text often slipped off one side of the screen, or resulted in too much whitespace when trying to find a balance between height and width for wider screens.

In the end I opted to use overflow on the x-axis with a fixed height, so that users could scroll horizontally to view any text not immediately visible (in the same we we scroll down on a typical website).

The key attributes used &mdash; ignoring colours and dimensions &mdash; are:

```css
.vertical-panel {
  writing-mode: vertical-rl;
  overflow-x: auto;
}
```

The end result is [here](https://sinophonia.com/typography#text-direction) in the second text-box.

I may revisit this another time or experiment with vertical rendering elsewhere.

### Writing

All text-based content is my own unless otherwise indicated. The core of the website is organised as follows:

| Section    | Description                                      |
| ---------- | ------------------------------------------------ |
| 墨 INK     | Introductions to writers and books               |
| 嗓 VOICE   | Introductions to podcast series                  |
| 源 SOURCES | Where to get hold of content and study materials |

More content will be added to these sections over time, with new sections also planned - watch this space!

<h3 align="center">
  <a href="#title"><img src="https://img.shields.io/badge/▲%20Top%20▲-0466c8.svg?style=flat"></a>
</h3>

## Acknowledgements

[![Udemy](https://img.shields.io/badge/Udemy-A435F0.svg?style=flat&labelColor=555&logo=Udemy&logoColor=white)](https://www.udemy.com/course/the-web-developer-bootcamp/)

I learnt many of the skills needed to build this website by completing [Colt Steele's](https://www.youtube.com/channel/UCrqAGUPPMOdo0jfQ6grikZw) excellent [Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) on Udemy.

<h3 align="center">
  <a href="#title"><img src="https://img.shields.io/badge/▲%20Top%20▲-0466c8.svg?style=flat"></a>
</h3>
