---
title: "Hugo introduction"
subTitle : "Quick start: Know the project's structure"
date: 2023-03-07T23:14:26Z
description: "this is introduction of this template"
draft: false
author: Author Name
label: "original"
type: posts
tags: ["entry" , "introduction"]
categories: ["tutorial","hugo"]
cover:
    position: left
    image: "https://i.328888.xyz/2023/03/19/M3hzw.png"
    alt: "<alt text>"
    caption: "<text>"
    relative: false # To use relative path for cover image, used in hugo Page-bundles
---
## Hugo Introduction

### Basic Description

Hugo is a popular open-source static site generator that allows you to create fast and efficient websites without relying on a database or server-side scripting. The structure of a Hugo site includes the following elements:

1. Content folder: This folder contains all the content of your website, including pages, blog posts, images, and other media. The content is typically written in Markdown, which is a lightweight markup language.
2. Static folder: This folder contains all the static assets of your website, including CSS stylesheets, JavaScript files, images, and other media files. These assets are not generated dynamically and are instead served as-is.
3. Archetypes folder: This folder contains templates for creating new content files. You can create templates for different types of content, such as blog posts or pages, to make it easy to create new content quickly.
4. Themes folder: This folder contains all the templates, stylesheets, and other assets for your website's theme. You can choose from a variety of pre-built themes or create your own.
5. Config file: This file contains configuration settings for your Hugo site, such as the site title, language, and other global settings.
6. Layouts folder: This folder contains templates for generating the HTML output of your website. You can create templates for different types of pages, such as the homepage, blog index, or individual blog posts.
7. Data folder: This folder contains data files that are used to generate your website, such as site configuration settings, lists of authors or categories, or other metadata.
<div class="polaroid">
 <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/15/JZSfx.png">
        <img src="https://i.328888.xyz/2023/03/15/JZSfx.png"/>
    </a>
  <div class="container">
    <p>Project structure </p>
  </div>
</div>


**In this case, we need to introduce our theme in theme folder, in terms of structure of theme, logically it the same as the default one.**

It's worth to notice that Config file [config.toml] we define a lot of global variables, I will reveal in the next section, including how to introduce custom theme.

### Hugo Theme

Hugo themes are collections of templates, stylesheets, and other assets that determine the appearance and behavior of a Hugo website. The structure of a Hugo theme typically includes the following elements:

1. Layouts folder: This folder contains the templates that generate the HTML output of your website. It is organized by the content type (e.g., posts, pages) and can include a variety of template files, such as base templates, list templates, and single templates.
2. Static folder: This folder contains all the static assets of the theme, including CSS stylesheets, JavaScript files, images, and other media files. These assets are not generated dynamically and are instead served as-is.
3. Assets folder: This folder contains the source files for the theme's stylesheets and scripts, as well as any other assets that need to be compiled or processed before being served to the browser.
4. Config file: This file contains configuration settings for the theme, such as the theme name, author, and other global settings.
5. Archetypes folder: This folder contains templates for creating new content files using the theme.
6. i18n folder: This folder contains translation files for the theme in different languages.
7. Shortcodes folder: This folder contains reusable snippets of code that can be used in content files to add custom functionality to the website.
8. Partials folder: This folder contains smaller, reusable template files that can be included in other templates to reduce duplication and improve maintainability.

By following this structure, Hugo themes can be easily shared and reused, allowing developers to quickly create new websites with a consistent look and feel.

## How hugo run the application?
We mainly focus on **layouts** folder. In _default folder, baseof.html is the entry port, index.html is the home

### Preparation
Before go through the custom theme, here are some MUST TO READ documents you need to read.
* [Templating](https://gohugo.io/templates/)
* [page-bundles](https://gohugo.io/content-management/page-bundles/)
* [Hugo menu](https://gohugo.io/content-management/menus/)
* [Pagination](https://gohugo.io/templates/pagination/)
* [Partial Templates](https://gohugo.io/templates/partials/)
* [Single Page Templates](https://gohugo.io/templates/single-page-templates/)
* [Content View Templates](https://gohugo.io/templates/views/)
* [Taxonomies](https://gohugo.io/content-management/taxonomies/)
* [Variables and Params](https://gohugo.io/variables/)
* [Function .Format](https://gohugo.io/functions/format/)
* [Function .Param](https://gohugo.io/functions/param/)

- - - 
## Config.toml file

In config.toml, we can setup theme and define all the global variables, such as website url, website name, your name as the author, social media and so on.

### Introduce theme

{{< highlight Toml "linenos=table" >}}
theme = 'dark-theme'  # the name should match your theme's name in the theme folder
{{< /highlight >}}


### Setup menu
{{< highlight Toml "linenos=table" >}}
# setup menu
sectionPagesMenu = "main"
[menu]
  [[menu.main]]
    name = "Home"
    pre = "home"
    url = "/"
    weight = 1
  [[menu.main]]
    name = "My Project"
    pre = "posts"
    url = "/posts/"
    identifier = "posts"
    weight = 2
  [[menu.main]]
    name = "Tags"
    pre = "tag"
    identifier = "tags"
    url = "/tags/"
    weight = 3
  [[menu.main]]
    name = "Abouts"
    pre = "about"
    identifier = "about"
    url = "/about/"
    weight = 4
{{< /highlight >}}

Hugo provides some default menu: **[posts,tags and categories](https://gohugo.io/content-management/taxonomies/)**. For the posts, generally it shows all your articles(blog), we will define the posts structure later.
- - - 
## Common js and css
<div class="polaroid" style="width:30%" >
 <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/18/MCUmJ.png">
        <img src="https://i.328888.xyz/2023/03/18/MCUmJ.png"/>
    </a>
  <div class="container">
    <p>HTML structure </p>
  </div>
</div>
Every html page contains some same css files and js files, such as same header and footer. In Layout/partials folder, hugo helps us to generate head.html, footer.html already, but we can create another two html to write js and css.
<div class="polaroid">
<a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/18/MCHPq.png">
        <img src="https://i.328888.xyz/2023/03/18/MCHPq.png"/>
    </a>
</div>

Head and footer we use to write common navigation and footer parts;
<div class="polaroid">
  <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/18/MCrNk.png">
        <img src="https://i.328888.xyz/2023/03/18/MCrNk.png"/>
    </a>
</div>
Header and footer-script are for common css and js.
<div class="polaroid">
  <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/18/MOHcX.png">
        <img src="https://i.328888.xyz/2023/03/18/MOHcX.png"/>
    </a>
</div>


- - - 


## Default HTML
### Entry Point --- baseof.html
In layouts/_default folder, **baseof.html** is the main entrance, so we import the common HTML in the baseof.html, such as header, footer and main body. 
<div class="polaroid">
  <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/18/MO88c.png">
        <img src="https://i.328888.xyz/2023/03/18/MO88c.png"/>
    </a>
  <div class="container">
    <p> baseof.html</p>
  </div>
</div>

This part is the dynamic content we reuse in each html, in other words, when user click different HTML page, it'll show different content, but the header(navigation menu) and footer are the same.
{{< highlight js "linenos=table" >}}
  {{- block "main" .}}xxxxxx{{- end}}
{{< /highlight >}}
<div class="polaroid">
  <a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/18/MOq4t.png">
      <img src="https://i.328888.xyz/2023/03/18/MOq4t.png"/>
  </a>
  <div class="container">
    <p> display different content </p>
  </div>
</div>

### homepage --- index.html

<div class="polaroid" style="width:50%" >
 <a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/18/MbL5w.png">
      <img src="https://i.328888.xyz/2023/03/18/MbL5w.png"/>
  </a>
  <div class="container">
    <p> index.html</p>
  </div>
</div>
<div class="polaroid" style="width:50%" >
<a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/18/Mjl3X.png">
      <img src="https://i.328888.xyz/2023/03/18/Mjl3X.png"/>
  </a>
  <div class="container">
    <p> _index.md</p>
  </div>
</div>

<div class="polaroid">
<a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/18/Mj5V5.png">
      <img src="https://i.328888.xyz/2023/03/18/Mj5V5.png"/>
  </a>
</div>

If we want to use the parameters we define in the md file, the syntax is
{{< highlight js "linenos=table" >}}
{{.Params.typed_names }}
{{< /highlight >}}
If we want to use the parameters we define in the config file(Global parameters), the syntax is
{{< highlight js "linenos=table" >}}
 {{ $.Site.Params.homepage }}
{{< /highlight >}}

### Article/post page --- single.html
In Hugo, the **single.html** file is a template file used to display individual content pages, such as a single blog post or a single page on your website.

The single.html template can include Hugo variables and functions to display dynamic content, such as the title, date, author, and content of the page. You can also add custom CSS styles or JavaScript scripts to enhance the layout and functionality of your pages.

Once you have created the single.html template in your theme's layouts directory, Hugo will automatically use it to display individual content pages on your website. If you want to customize the layout for specific types of content, you can create additional templates with different names, such as single-blog.html or single-page.html, and specify their usage in your Hugo configuration file.

<div class="polaroid">
<a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/18/M8Ufz.png">
      <img src="https://i.328888.xyz/2023/03/18/M8Ufz.png"/>
  </a>
  <div class="container">
    <p> single.html </p>
  </div>
</div>


- - - 


