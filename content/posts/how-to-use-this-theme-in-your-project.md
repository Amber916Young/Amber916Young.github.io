---
title: "How to Use This Theme in Your Project"
date: 2023-03-20T11:12:16Z
lastmod: 2023-03-20T11:12:16Z
subTitle: ""
description: "In this section, you can learn how to install hugo env, download this theme and import to your project"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["tag1", "tag2"]
categories: ["tutorial","hugo"]
cover:
    position: right
    image: "https://i.328888.xyz/2023/03/21/TZChz.png"
    alt: "<alt text>"
    caption: "<text>"
---
## Downlaod vscode
Navigate to [VsCode](https://code.visualstudio.com/) website, just download in your pc.

## Install Hugo environment
In hugo offical website, there are four options to install hugo env which depends on your operation system(OS).
<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://s1.ax1x.com/2023/03/20/ppN3i8g.png">
        <img src="https://s1.ax1x.com/2023/03/20/ppN3i8g.png"/>
    </a>
</div>


1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Install [Go](https://go.dev/doc/install) version 1.18 or later
3. Update your PATH environment variable as described in the [Go documentation](https://go.dev/doc/code#Command)

## Hugo CLI

### Create a new site

{{< highlight toml "linenos=table" >}}
hugo new site mywebsiteName

# naviagate to the new folder, open in VScode
cd mywebsiteName

{{< /highlight >}}

### Download theme and import to themes folder

You can clone theme project or download zip directly.

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/21/amN8L.png">
        <img src="https://i.328888.xyz/2023/03/21/amN8L.png"/>
    </a>
</div>

After move the "dark-theme" to themes folder, don't forget setting in config.toml
{{< highlight toml "linenos=table" >}}
theme="theme's name"
{{< /highlight >}}

<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/21/am3qU.png">
        <img src="https://i.328888.xyz/2023/03/21/am3qU.png"/>
    </a>
</div>

### Run project
{{< highlight toml "linenos=table" >}}
hugo server -D
{{< /highlight >}}
If the project runs successfully, you will see these info below:


<div class="polaroid" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/21/amcwv.png">
        <img src="https://i.328888.xyz/2023/03/21/amcwv.png"/>
    </a>
</div>


[http://localhost:1313/](http://localhost:1313/) is your loacal running port.

### Create a post

If you want to write a blog, the command line is:
{{< highlight toml "linenos=table" >}}
hugo new posts/xxxxx.md
{{< /highlight >}}
Then, you can notice hugo help you create a blog in posts folder.


### Compile and Upload to the cloud
If it's your first time to commit your changes.
{{< highlight toml "linenos=table" >}}
hugo
cd public
git init
git add ./
git commit -m "inital commit"
git checkout -b master
git branch -M master
git remote add origin https://xxxx.git
git push - u origin master
{{< /highlight >}}

otherwise, you just commit and push again

{{< highlight toml "linenos=table" >}}
hugo
cd public
git add ./
git commit -m "xx update"
git checkout master
git push -
{{< /highlight >}}

Here is tutorial about [how to deploy to the github](/posts/how-to-deploy-to-github/)