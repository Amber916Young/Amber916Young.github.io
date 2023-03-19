---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
lastmod: {{ .Date }}
subTitle: "subTitle"
description: "this is description"
draft: false
featured: true
type: posts
label: "orginal"
author: {{ .Site.Params.author}}
tags: ["tag1", "tag2"]
categories: ["cate1","cate2"]
cover:
    position: <left,right>
    image: ""
    alt: "<alt text>"
    caption: "<text>"
---

