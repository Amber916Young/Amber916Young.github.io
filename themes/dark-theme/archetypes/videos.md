---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
subTitle: "subTitle"
description: "this is description"
draft: false
type: videos
layout: videos
label: "travle"
author: {{ .Site.Params.author}}
tags: ["tag1"]
categories: ["cate1"]
cover:
    position: <left,right>
    image: "null"
---

