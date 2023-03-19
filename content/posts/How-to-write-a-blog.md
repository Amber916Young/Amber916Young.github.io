---
title: "How to Write a Blog in Hugo"
date: 2023-03-19T17:22:49Z
lastmod: 2023-03-19T17:22:49Z
subTitle: ""
description: "In this section, you will learn how to write an article in hugo, and what's the markdowm file"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["write a blog"]
categories: ["tutorial","hugo"]
cover:
    position: left
    image: "https://i.328888.xyz/2023/03/20/PUOKx.png"
    alt: "<alt text>"
    caption: "<text>"
---

# How to Write a Blog in Hugo
In hugo, the blogs/articles/posts all store in the content/posts/ folder.

<div class="polaroid" style="width:20%" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PU83L.png">
        <img src="https://i.328888.xyz/2023/03/20/PU83L.png"/>
    </a>
  <div class="container">
    <p> Path of Posts folder </p>
  </div>
</div>

{{< highlight bash "linenos=table" >}}
hugo new posts/xxxmd
# such as I create this post
hugo new posts/How-to-write-a-blog.md
# don't use space in filename!!!
{{< /highlight >}}
"posts" means, create a md file under the posts folder(is also default blog folder)


# Structure of Post page

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PUsnA.png">
        <img src="https://i.328888.xyz/2023/03/20/PUsnA.png"/>
    </a>
  <div class="container">
    <p> Structure of Post/blog page </p>
  </div>
</div>

This page is like a jigsaw puzzle with several chapters combined, this is done so that the code can call on different structures on other pages, reducing code repetition.


                


## Count how many words in your blog

This is built-in function [**countwords**](https://gohugo.io/functions/countwords/).

{{< highlight html "linenos=table" >}}
# allow md file shows HTML format
    <i class="fa fa-book"></i>&nbsp;<span>{{ .Content | countwords }} Words</span>
{{< /highlight >}}




# What's the markdowm(MD) file?

In Hugo, Markdown (often abbreviated as MD) is a lightweight markup language used to create content for web pages. It allows you to write content using plain text and simple syntax that can be easily converted to HTML by Hugo. Markdown is a popular format for creating web content because it is easy to learn and write, and can be easily converted to HTML without the need for complex formatting tools. <br>
<br>
In Hugo, you can create Markdown files to define the content of your website. Each Markdown file typically represents a single page or blog post on your site, and contains the content of that page in Markdown format. For example, if you wanted to create a blog post about a topic, you would create a Markdown file with the post's content in it. <br><br>

Markdown files in Hugo typically have a .md extension and are stored in the content directory of your Hugo project. When Hugo builds your website, it processes each Markdown file and converts it to HTML, which can then be served to visitors of your site. <br><br>

Markdown files in Hugo can include additional metadata in the form of front matter, which is written in YAML, TOML or JSON format and placed at the beginning of the Markdown file. This metadata can be used to provide additional information about the content, such as the page's title, author, and publication date. <br><br>

## Using HTML tags in MD file
In hugo, you also can write HTML in MD file. Yeah, super convenient, right? As I mentioned in my first post, to display HTML tags in the md file requires configuration in the configuration file(config.toml).
{{< highlight toml "linenos=table" >}}
# allow md file shows HTML format
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe= true
      hardWraps = false
      xhtml = false
{{< /highlight >}}
In hugo offical website, you also can find this [configuration](https://gohugo.io/getting-started/configuration-markup/#goldmark).

## Output format of post
{{< highlight toml "linenos=table" >}}
[permalinks]
  post = "/:year/:month/:title/"

[frontmatter]
  date = ["date", "publishDate", "lastmod"]
  lastmod = ["lastmod", ":git", "date", "publishDate"]
  publishDate = ["publishDate", "date"]
  expiryDate = ["expiryDate"]
{{< /highlight >}}

### Permalinks
In your site configuration, set a URL pattern for regular pages within a top-level section. This is recursive, affecting descendant regular pages.
<br>
The permalinks defined in your site configuration do not apply to section pages. To adjust the URL for section pages, set url in front matter.
<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PUGQX.png">
        <img src="https://i.328888.xyz/2023/03/20/PUGQX.png"/>
    </a>
  <div class="container">
    <p> Hugo offical doc </p>
  </div>
</div>

[More Information](https://gohugo.io/content-management/urls/#permalinks) you can visit to hugo offical website




---

## Markdowm file editor recommended
[Typora](https://typora.io/) is a great md editor, you can write or organise blog using general format like microsoft word. After you finish the article, just copy paste to the md file.
<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PUcQy.png">
        <img src="https://i.328888.xyz/2023/03/20/PUcQy.png"/>
    </a>
</div>
(Note: free version you can ask for the author)