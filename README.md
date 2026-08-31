# EthStaker Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/eff4589c-f0ec-46d3-8f5e-14d5e6e0fee1/deploy-status)](https://app.netlify.com/sites/ethstaker/deploys)

This is the source code for EthStaker's website, <https://ethstaker.org>.

**Table of Contents**

- [Local Development](#local-development)
- [Theme](#theme)
- [Directory Structure](#directory-structure)
- [Editing Existing Content](#editing-existing-content)
    - [Adding Resources](#adding-resources)
- [Creating A New Page](#creating-a-new-page)
- [Markdown Examples](#markdown-examples)
- [Rhino Review Redirect](#rhino-review-redirect)



---



## Local Development

1. Clone the repo
1. Install dependencies: `bundle install`
    - Ruby may need to be installed first if not already packaged with your OS
1. Create a feature branch off of the `main` branch
1. Start the local server: `bundle exec jekyll serve --config _config.yml,_config_dev.yml --incremental`
    - The `site.environment` variable can be used to only run certain operations in production vs development
        - The `--config` flag uses development variables in `_config_dev.yml` to override those in `_config.yml`
    - When running the local server, saving a file automatically triggers a build so you can see the changes
        - The `--incremental` flag speeds up the build time by caching the builds and only updating files that were edited
1. Go to <http://localhost:4400/> to view changes

To build the site, use `bundle exec jekyll build`.

Resources:

- [Jekyll Docs](https://jekyllrb.com/docs/)
- [Liquid Syntax](https://shopify.github.io/liquid/basics/introduction/)



## Theme

The site shares the [EthCoordinate](https://ethcoordinate.org) design system: JetBrains Mono, cyan/purple accents on a near-black background, and a matching light palette. Everything lives in `assets/css/main.css` (tokens, Bootstrap variable remaps, nav, hero, footer, components) and `assets/css/markdown.css` (long-form content). Bootstrap 5 still handles layout, so existing utility classes and partials keep working.

Dark mode is the default unless the OS prefers light or the visitor toggles the theme; the choice is stored in `localStorage` (`darkModeEnabled`) and applied before first paint by the inline script in `_includes/partials/components/head.html`.


## Directory Structure

- root - Contains site pages
- `_data` - Contains data files, such as resources
- `_includes` - This folder is [designated by Jekyll](https://jekyllrb.com/docs/includes/) for files that can be "included" into other files
    - `js` - Contains javascript files, most of which are compiled in `assets/js/main.js`
    - `partials`
        - `components` - Contains reusable non-content components, including the thml head, nav, and footer
        - `content` - Contains sections of html content
        - `embeds` - Contains embed content
    - `tools` - Contains include-based tools
- `_layouts` - Contains layout templates used to build pages
- `_plugins` - Contains custom [Jekyll plugins](https://jekyllrb.com/docs/plugins/), which have usage instructions at the top of each file
- `_posts` - Contains blog posts (unused, using [Paragraph](https://paragraph.xyz/) instead)
- `assets` - Contains js, css, images, and files



## Editing Existing Content

To find the content you want to edit, first visit the markdown page in the root folder. Some content is directly in this file, like with `about.md`. Other content like the stewards section is pulled in from `_includes/partials/content/steward.html`. Pages with html content are segmented into `_includes/partials/content` pages for ease of maintenance.

The `steward.html` file contains the html for the stewards section, but as noted at the top of the page the actual data is pulled from `_data/stewards.yml`. 

Some pages that use data files include stewards, branding, resources, support, and the staking method quiz.

Page images can be found in a folder named after the page under `assets/img/`. For example, the image used in `about.md` can be found in `assets/img/about/`.


### Adding Resources

Adding new resources is easy! 

1. Go to `_data/resources.yml`
1. Copy the template for new entries from the top of the page
1. Remove the `#` to activate (uncomment) the lines, making sure to maintain the indentation
1. Fill out the entry using the field descriptions specified at the top of the page
    - You can also use the other entries for additional guidance



## Creating A New Page

1. In the root folder, create a new markdown file. For example, `staking-research.md`.
2. At the top of the page add the following "frontmatter". This is page metadata used when building the site. Only the layout is required but you should also specify the title and permalink (for explicitly). Use `default` as the layout for html content and `markdown` for markdown content. If using the `markdown` layout then a `subheader` and a button link can also be specified.
    ```
    ---
    layout: markdown
    title: 
    permalink: 
    subheader: 

    buttons:
      - link: 
        text: 
    ---
    ```
3. Fill out the frontmatter. Here's an example of what it looks like for `about.md`:
    ```
    ---
    layout: markdown
    title: About EthStaker
    permalink: /about
    subheader: '*"Welcoming first, knowledgable second"*'

    buttons:
      - link: '#stewards'
        text: View Stewards
    ---
    ```
4. Fill out the rest of the page with your content using markdown. If writing html content then break out the page into one or more sections within `_includes/partials/content` as html pages.
5. For any images, create a folder under `assets/img/` to place them in.



## Markdown Examples

```
# H1

## H2

### H3

#### H4

##### H5

###### H6

[link](/)

**bold text**

*italic text*

__*bold and italic text*__

`inline code`


` ` `
code block, remove spaces between the ticks
` ` `


Section divider:

---


Unordered list:

- this is an
- unordered
    - list


Ordered list:

1. this is an
1. ordered
    1. list


Table:

header 1      | header 2
--------------|--------------
row 1, cell 1 | row 1, cell 2
row 2, cell 1 | row 2, cell 2
row 3, cell 1 | row 3, cell 2


Collapsible content:

<details markdown="1">
<summary>Expandable content</summary>
Peek a boo!

- I
    - see
        - you
</details>


Image:

![](/assets/img/logo-black.svg)

{:class="caption"}
This is an image caption


{% include partials/components/callout.html 
  type="info"
  title="Info Callout"
  content="This is a callout element."
%}

{% include partials/components/callout.html 
  type="warning"
  title="Warning Callout"
  content="This is a callout element."
%}

{% include partials/components/callout.html 
  type="danger"
  title="Danger Callout"
  content="This is a callout element."
%}


Small button:
{% include partials/components/button.html
  link="https://example.com"
  text="View test link"
  size="sm"
%}

Normal button (default):
{% include partials/components/button.html
  link="https://example.com"
  text="View test link"
%}

Large button:
{% include partials/components/button.html
  link="https://example.com"
  text="View test link"
  size="lg"
%}
```



## Rhino Review Redirect

Since X (formerly Twitter) is banning substack links, [ethstaker.org/rhino-review](https://ethstaker.org/rhino-review) can be used as a redirect using the `url=` parameter. For security, this only works for `rhinoreview.substack.com` links.

1. Encode the substack post URL: <https://www.urlencoder.org/>
    - Example: `https://rhinoreview.substack.com/p/rhino-review-ethereum-staking-journal` becomes `https%3A%2F%2Frhinoreview.substack.com%2Fp%2Frhino-review-ethereum-staking-journal`
1. Append that URL to the end of: `https://ethstaker.org/rhino-review/?url=`
    - Example: `https://ethstaker.org/rhino-review/?url=https%3A%2F%2Frhinoreview.substack.com%2Fp%2Frhino-review-ethereum-staking-journal`

In this example, `https://ethstaker.org/rhino-review/?url=https%3A%2F%2Frhinoreview.substack.com%2Fp%2Frhino-review-ethereum-staking-journal` will be forwarded to `https://rhinoreview.substack.com/p/rhino-review-ethereum-staking-journal`
