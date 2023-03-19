---
title: "How to Calculate the Number of Views"
date: 2023-03-19T18:09:16Z
lastmod: 2023-03-19T18:09:16Z
subTitle: ""
description: "In this section, you can know how to use the third-party plugin, and calculate how many visitors view your blog and your website"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["busuanzi","plugin"]
categories: ["tutorial","hugo"]
cover:
    position: right
    image: "https://i.328888.xyz/2023/03/20/PU9oN.png"
    alt: "<alt text>"
    caption: "<text>"
---

# How to Calculate the Number of Views

Busuanzi is a third-party visitor counter and statistics tool that you can use with Hugo to track visitor traffic to your site. Here's how to set up Busuanzi in Hugo:

1. First, go to the Busuanzi website (https://busuanzi.ibruce.info/) and choose the style of the visitor counter you want to use. You can choose from several different styles and customize the text that appears alongside the counter.

2. Once you've selected your counter style, copy the HTML code provided by Busuanzi. This code should look something like this:

{{< highlight html "linenos=table" >}}
<span id="busuanzi_container_site_pv">
Views <span id="busuanzi_value_site_pv"></span>times</span>
{{< /highlight >}}

3. In your Hugo project, open the layout file where you want to add the Busuanzi counter. For example, if you want to add the counter to your site's footer, you might open the footer.html layout file.

4. Paste the Busuanzi HTML code into the layout file where you want the counter to appear. Be sure to replace any existing code in that location, or add it to a new location if you're creating a new element.

5. Save the layout file and rebuild your Hugo site. The Busuanzi counter should now appear on your site.

Note that Busuanzi is a third-party tool and may have limitations or restrictions on usage depending on your site's traffic volume. Be sure to read the Busuanzi documentation carefully and follow any usage guidelines or restrictions to avoid any issues with your site's performance or reliability.

## Add busuanzi in Config.toml


{{< highlight toml "linenos=table" >}}
  [params.busuanzi_count]
    enable = true
    site_uv = true
    site_pv = true
    page_pv = true
{{< /highlight >}}

## Where to use it?
### In footer.html
Go the the footer.html, we add the default html in our custom footer.
<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PUKfV.png">
        <img src="https://i.328888.xyz/2023/03/20/PUKfV.png"/>
    </a>
</div>

{{< highlight html "linenos=table" >}}
<span id="busuanzi_container_site_uv" class="busuanzi_container_site_uv">
    <i class="fa-solid fa-chart-simple"></i>
    TotalView&nbsp;
    <span id="busuanzi_value_site_uv" class="busuanzi_value_site_uv"></span>
    </span>|
    <span id="busuanzi_container_site_pv" class="busuanzi_container_site_pv">
        <i class="fa-solid fa-eye"></i>Visitor&nbsp;<span id="busuanzi_value_site_pv" class="busuanzi_value_site_pv"></span>
</span>
{{< /highlight >}}

**Note** id and class you cannot define by yourself, but you can change the icon.
<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PULjd.png">
        <img src="https://i.328888.xyz/2023/03/20/PULjd.png"/>
    </a>
    <div class="container">
    <p> Implement pulgin successfully </p>
    </div>
</div>

### In post page (post_meta.html)
In blog page, we need to know how many users view our article. Go the post_meta.html,
Just add only one line.
<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PnZoL.png">
        <img src="https://i.328888.xyz/2023/03/20/PnZoL.png"/>
    </a>
</div>

{{< highlight html "linenos=table" >}}
<span id="busuanzi_value_page_pv"> </span>
{{< /highlight >}}