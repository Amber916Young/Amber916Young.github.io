---
title: "Create a custom page"
subTitle : "how to create about page"
date: 2023-03-08T23:14:26Z
description: "How to custom a page,not blog page"
draft: false
featured: true
author: Author Name
label: "original"
type: posts
tags: ["hugo" , "custom","aboutme"]
categories: ["tutorial","hugo"]
cover:
    position: right
    image: "https://i.328888.xyz/2023/03/19/M35aa.png"
    alt: "<alt text>"
    caption: "<text>"
---
# Create a custom page: about me 
About page is not the default page, easily we can consider about.html is a other type of posts, so we need to create a post: the  command-line interface (CLI) is:
{{< highlight bash "linenos=table" >}}
hugo new posts/<post-name>.md
{{< /highlight >}}
in this case, we need to type:
{{< highlight bash "linenos=table" >}}
hugo new about/_index.md
# create a new folder named about, we separate posts folder(default blog folder) and custom folder
{{< /highlight >}} 
you might ask why is md file not HTML? In fact, md(markdown) file can store the metadata of your article, about page is a special type of blog. when the application runs, the program will search _index file at first. 
## Page structure 

<div class="polaroid">
<a
        data-fancybox="gallery"
        data-src="https://s1.ax1x.com/2023/03/16/pp82nwF.png">
      <img src="https://s1.ax1x.com/2023/03/16/pp82nwF.png"/>
  </a>
  <div class="container">
    <p>Page structure </p>
  </div>
</div>


We can notice, there are some metadatas I have defined in archetype, [title,date, type,layout...], we need to create a about.html for the about page. 


### Create about.html
Head to layout/ folder, create a html file name about, paste the html content to your about page.
{{< highlight html "linenos=table" >}}
{{- define "main" }}
<section class="s:mt-10">
    <div class="container">
      <div class="flex flex-col sm:flex-row gap-8 sm:my-14">          
      <!-- Photo -->
       <div class="sm:w-2/5 sm:mt-10">
        <img src="{{ $.Site.Params.aboutImage }}">
      </div>
        <div class="w-full sm:w-3/5 sm:mt-10">
          <!-- Content -->
          {{ .Content }}
        </div>
      </div>
      </div>
  </section>
{{- end }}
<!-- .Content is the hugo syntax, load the content you write in md file -->
{{< /highlight >}}
The fix HTML structure is, you can use it in any html file.
{{< highlight html "linenos=table" >}}
{{- define "main" }}
<section class="s:mt-10">
    <div class="container">
      <div class="flex flex-col sm:flex-row gap-8 sm:my-14">
          <!--  add you html content or md content -->
      </div>
  </section>
{{- end }}
{{< /highlight >}}
’define "main"‘ you can consider it as a tag which will render in the index page automatically
{{< highlight html "linenos=table" >}}
{{- define "main" }}xxxx{{- end }}
{{< /highlight >}}
<div class="polaroid">
<a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/18/M83wF.png">
      <img src="https://i.328888.xyz/2023/03/18/M83wF.png"/>
  </a>
  <div class="container">
    <p>about page using HTML and md file</p>
  </div>
</div>


### Using HTML tag in md file
In hugo, it provides more flexible way to custom your own HTML page, you can write HTML code in pure HTML file, or you can use HTML tag in MD file. You need add this configuration in config.toml.
{{< highlight toml "linenos=table" >}}
# allow md file shows HTML format
[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe= true
      hardWraps = false
      xhtml = false
{{< /highlight >}}

<div class="polaroid">
<a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/19/M3JDp.png">
      <img src="https://i.328888.xyz/2023/03/19/M3JDp.png"/>
  </a>
  <div class="container">
    <p>about page using HTML</p>
  </div>
</div>
