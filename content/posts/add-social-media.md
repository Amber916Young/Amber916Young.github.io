---
title: "Add Social Media in hugo"
date: 2023-03-18T23:29:22Z
lastmod: 2023-03-18T23:29:22Z
subTitle: ""
description: "this is a custom feature we need to define in config.toml"
draft: false
featured: true
type: posts
label: "orginal"
author: Author Name
tags: ["custom","hugo"]
categories: ["tutorial","hugo"]
cover:
    position: left
    image: "https://i.328888.xyz/2023/03/19/PizTo.png"
    alt: "<alt text>"
    caption: "<text>"
---
# Add your social media in config.toml
You can add social media in HTML directly, also, can use config file which is easy to change every time you want to update.

{{< highlight toml "linenos=table" >}}
[params]
 [[params.social]]
      url   = "https://twitter.com/"
      icon  = "fa-brands fa-twitter fa-lg"
  [[params.social]]
      url   = "https://facebook.com/"
      icon  = "fa-brands fa-facebook fa-lg" 
  [[params.social]]
      url   = "https://linkedin.com/"
      icon  = "fa-brands fa-linkedin fa-lg"
  [[params.social]]
      url = "https://linkedin.com/"  
      icon = "fa-brands fa-instagram fa-lg" 

{{< /highlight >}}
## Using in HTML page
Because header and footer both show social media, we just write a singe HTML, them import to some places you want to display.
{{< highlight html "linenos=table" >}}
{{ with $.Site.Params.social }}
  {{ range . }}
    <a href="{{ .url }}">
      <i class="{{ .icon}}"></i>
    </a>
  {{ end }}
{{ end }}
{{< /highlight >}}



### Import to somewhere
<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/03/19/M3qXF.png">
        <img src="https://i.328888.xyz/2023/03/19/M3qXF.png" />
    </a>
  <div class="container">
    <p>How to import social-media template to header </p>
  </div>
</div>
In hugo, if you want to use global var, the synatx is $.Site.xxx. In this case is [$.Site.Params.social ]; <br>
Range is the loop function.

### Icon Source
In this project, I choose [fontawesome](https://fontawesome.com/icons) as the icon source.
You also can determine which icon library you want to use. Popular choices include Font Awesome, Material Icons, and Bootstrap Icons. You can either download the icon library and include it in your Hugo project or use a CDN link.