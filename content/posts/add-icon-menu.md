---
title: "Add Icon/Active class In Menu"
date: 2023-03-19T15:03:08Z
lastmod: 2023-03-19T15:03:08Z
subTitle: "How to custom Icon in menu"
description: "In this section, you can learn how to add icon in your menu navigation and how to highlight menu when you click"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["hugo","menu"]
categories: ["tutorial","hugo"]
cover:
    position: right
    image: "https://i.328888.xyz/2023/03/19/PfLvU.png"
    alt: "<alt text>"
    caption: "<text>"
---
## How to custom Icon in menu
In the [Hugo introduction] blog, I have shown how the menu is added in hugo. Following the previous article on how to customize social media, did you think that to display the menu you would need to add an icon property? 😂😂😂 <br>
Head to config.toml file,
{{< highlight Toml "linenos=table" >}}
# setup menu
sectionPagesMenu = "main"
[menu]
  [[menu.main]]
    name = "Home"
    pre = '<i class="fa-solid fa-house"></i>'
    url = "/"
    weight = 1
  [[menu.main]]
    name = "My Blog"
    pre = '<i class="fa-solid fa-paper-plane"></i>'
    url = "/posts/"
    identifier = "posts"
    weight = 2
  [[menu.main]]
    name = "Tags"
    pre = '<i class="fa-solid fa-tag"></i>'
    identifier = "tags"
    url = "/tags/"
    weight = 3
  [[menu.main]]
    name = "Abouts"
    pre = '<i class="fa-sharp fa-solid fa-medal"></i>'
    identifier = "about"
    url = "/about/"
    weight = 4
{{< /highlight >}}
We add icon in "pre". The icon library I use is the common fontawesome. <br>
In the menu.html, just using hugo syntax {{.Pre}} to display icon.
{{< highlight html "linenos=table" >}}
{{ range .Site.Menus.main }}
<a href="{{ .URL }}" title="{{ .Name }}">
  <li class="hover">
    {{ .Pre }}
    {{ .Name }}
  </li>
</a>
{{ end }}
{{< /highlight >}}

## How to add active class in menu
This is an additional attribute that highlights a menu when it is clicked on.
<div class="polaroid">
    <a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/20/PALvN.png">
    <img src="https://i.328888.xyz/2023/03/20/PALvN.png"/>
    </a>
</div>
<div class="polaroid">
    <a
        data-fancybox="gallery"
        data-src="https://i.328888.xyz/2023/03/20/PAP4V.png">
    <img src="https://i.328888.xyz/2023/03/20/PAP4V.png"/>
    </a>
</div>

We need to use the built-in syntax, such as "eq" "delimit" "split". [More infomation](https://gohugo.io/functions)
{{< highlight html "linenos=table" >}}
{{ $currentPage := . }}
{{ range .Site.Menus.main }}
{{ $menu_item_url := .URL | relLangURL }}
{{ $page_url:= $currentPage.RelPermalink | relLangURL }}

{{ $segments1 :=   delimit (split $menu_item_url "/") "/" }}
{{ $segments2 :=   delimit (split $page_url "//") "/" }}

{{ $section1 := first 6 $segments1  }}
{{ $section2 := first 6 $segments2  }}

<!-- {{ printf "segments1 = %s "   $section1  }}
{{ printf "segments2 = %s " $section2 }} -->

<a href="{{ $menu_item_url }}" title="{{ .Name }}">
    <li class="hover  {{if eq  $section2 $section1  }}  active {{end}}">
      {{ .Pre }}
      {{ .Name }}
    </li>
</a>
{{ end }}
{{< /highlight >}}
In tailwind.css, I add a new class name active. You can overwrite your active attributes, such as color, box-shadow, size and so on.
{{< highlight css "linenos=table" >}}

#menu .active {
  color: #ffb703;
  font-size: 1.15rem;
}
{{< /highlight >}}