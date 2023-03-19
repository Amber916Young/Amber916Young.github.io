---
title: "Taxonomy"
subTitle : "What's the Taxonomy, Tags, Category?"
description: "This is section will introduce how hugo organize your blog or posts"
date: 2023-03-11T11:53:09Z
lastmod:  2023-03-11T11:53:09Z
draft: false
author: Tothemoon
label: "original"
tags: ["taxonomy"]
categories: ["tutorial","hugo"]
type: posts
cover:
    position: right
    image: "https://i.328888.xyz/2023/03/19/M3o0x.png"
    alt: "<alt text>"
    caption: "<text>"
---
# 👀 what's the Taxonomy
In Hugo, a taxonomy is a way of organizing your content based on specific attributes or categories. Taxonomies are used to create grouping mechanisms for your content, allowing you to easily organize, sort, and filter your pages based on common characteristics.

Hugo supports several types of taxonomies, including:

* Tags: A list of keywords or phrases that describe the content of a page. Tags are typically used to group related content together, regardless of the page's location or content type.

* Categories: A hierarchical grouping of pages based on their subject matter. Categories are typically used to group pages within a specific content type, such as blog posts or documentation pages.

* Series: A grouping of related pages that are part of a larger series or sequence. Series are typically used to organize content that is meant to be read in a specific order, such as chapters of a book or episodes of a podcast.

To create a taxonomy in Hugo, you need to define it in your site's configuration file and specify the content types that it applies to. You can then add taxonomy terms to your content files using front matter or other methods, allowing you to categorize and organize your content according to your desired taxonomy.

{{< highlight Toml "linenos=table" >}}
[taxonomies]
  tag = "tags"
  category = "categories"
  archive = "archives"
{{< /highlight >}}

Once you have created a taxonomy and assigned terms to your content, you can use Hugo's built-in functions to generate taxonomy pages that display all the pages associated with a particular term. You can also use taxonomies to create navigation menus, filtering options, or other dynamic features that make it easier for users to explore and discover your content.

## Add tags and categories in posts template
Head to archetypes/posts.md, in Hugo, archetypes are pre-defined templates for new content files. They are used to create new content files with a specific structure and pre-populated metadata, such as the title, date, and author. 

Archetypes are useful for maintaining consistency in the structure and metadata of your content files, and for saving time when creating new content. When you create a new content file using an archetype, the file will already have the necessary metadata and structure, so you can focus on writing the content itself.

Here I define some parameters in posts template, we mainly foucs on tags and categories, hugo can help us to category by categories and tags. 
**The name (tags and categories) must match the params defined in config.toml.**

{{< highlight yml "linenos=table" >}}
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
lastmod: {{ .Date }}
subTitle: "subTitle"
description: "this is description"
draft: false
type: posts
label: "orginal"
author: {{ .Site.Params.author}}
tags: [tag1, tag2, tag3]
categories: [cate1,cate2]
cover:
    position: <left,right>
    image: ""
    alt: "<alt text>"
    caption: "<text>"
{{< /highlight >}}

Additionally, If the draft is false, the post will not display in the list page.




- - -

# Where to display all my blogs/posts/articles?

list.html is a template file used in Hugo, which is a popular static site generator. In Hugo, a list page refers to a page that displays a list of content items from a specific section or taxonomy.

The list.html template is used to render these list pages in Hugo. It typically includes elements such as a header, footer, and navigation menu, as well as a loop that iterates through the list of content items and displays them in a specific format.

The exact content and structure of the list.html template will depend on the specific requirements of your website or project. However, in general, it should provide a clear and organized way for visitors to navigate and browse through the content on your site.


<div class="polaroid" style="width:50%" >
   <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/19/MNjQZ.png">
        <img src="https://i.328888.xyz/2023/03/19/MNjQZ.png"/>
    </a>
  <div class="container">
    <p> list.html(to display all the posts) </p>
  </div>
</div>
Go to the layouts folder, we create a posts folder and list.html( In fact the list template is also created automatically by hugo, I just move to posts folder make it easier to understand ), hugo can directly find the HTML file name list.html.
<div class="polaroid" style="width:50%" >
   <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/19/MrlMo.png">
        <img src="https://i.328888.xyz/2023/03/19/MrlMo.png" />
    </a>
  <div class="container">
    <p> my project </p>
  </div>
</div>
How to display all the posts, you can overwrite css or change the layout.

### Define how many posts shows in a page
In config.toml, we add this configuration below:
{{< highlight Toml "linenos=table" >}}
# Pagination
paginate = 10
paginatePath = "page"
{{< /highlight >}}

### List all the post by time
In hugo, the synatx of [Iterates](https://gohugo.io/functions/range/) is {range (xxxx) end}

{{< highlight html "linenos=table" >}}
  {{ range (.Paginate (.Pages.GroupByDate "2006-01")).PageGroups }}
  <div class="result" role="group">
      {{ $month := printf "%s%s" .Key "-01"}}
      <h2 class="result__title">{{ $month | time.Format "January 2006" }}</h2>
      {{ range .Pages }}

      {{ partial "archiveItem.html" (dict "context" .) }}

      {{ end }}
  </div>
  {{ end }}
{{< /highlight >}}

archiveItem.html is another template, you also write your post list in the same HTML.


---

# Where to display my blogs/posts/articles according to a tag or category?
After we add [taxonomies] to config.toml, Hugo will help us to category, still use list.html to display some specific posts.
<div class="flex">
  <div class="polaroid" style="width:40%" >
   <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/19/Mreq5.png">
        <img src="https://i.328888.xyz/2023/03/19/Mreq5.png"/>
    </a>
    <div class="container">
      <p> list.html </p>
    </div>
  </div>
  <div class="polaroid" style="width:40%" >
    <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/19/MrFEZ.png">
        <img src="https://i.328888.xyz/2023/03/19/MrFEZ.png"/>
    </a>
    <div class="container">
      <p> list.html </p>
    </div>
  </div>
</div>


