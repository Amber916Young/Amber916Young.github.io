---
title: "How to Deploy to Github"
date: 2023-03-19T20:19:30Z
lastmod: 2023-03-19T20:19:30Z
subTitle: "If you don't have your personal cloud, github blog is a nice choice"
description: "This section to help you deploy your site to the cloud(github)"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["github","cloud"]
categories: ["tutorial","hugo","github"]
cover:
    position: left
    image: "https://i.328888.xyz/2023/03/20/PnsEy.png"
    alt: "<alt text>"
    caption: "<text>"
---

# How to Deploy to Github
To deploy your Hugo site to GitHub Pages, you can follow these steps:
1. First update baseURL in config.yaml
    baseURL: https://www.username.github.io 
Then compile with hugo
{{< highlight bash "linenos=table" >}}
hugo
{{< /highlight >}}

<div class="polaroid"  >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PtUud.png">
        <img src="https://i.328888.xyz/2023/03/20/PtUud.png"/>
    </a>
</div>

2. Second, create a new repository on GitHub that will hold your website files. Make sure to name the repository in the format yourusername.github.io, where yourusername is your GitHub username.
Don't forget add **github.io**
<div class="polaroid"  >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PtiWJ.png">
        <img src="https://i.328888.xyz/2023/03/20/PtiWJ.png"/>
    </a>
    <div class="container">
        <p>create a new repo for your personal website</P>
    </div>
</div>


<div class="polaroid"  >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PnqEX.png">
        <img src="https://i.328888.xyz/2023/03/20/PnqEX.png"/>
    </a>
    <div class="container">
        <p>Setting: GitHub Pages site to master branch</P>
    </div>
</div>



3. Next, navigate to the root of your Hugo project directory in a terminal window or command prompt.
4. Initialize a new Git repository by running the command:


{{< highlight bash "linenos=table" >}}
git init
{{< /highlight >}}

5. Add all the files in your Hugo project directory to the new Git repository by running the command:

{{< highlight bash "linenos=table" >}}
git add ./
{{< /highlight >}}

6. Commit the changes to the Git repository by running the command:

{{< highlight bash "linenos=table" >}}
git commit -m "Initial commit"
{{< /highlight >}}

7. Set the remote repository to your new GitHub Pages repository by running the command:

{{< highlight bash "linenos=table" >}}
git remote add origin https://github.com/yourusername/yourusername.github.io.git
{{< /highlight >}}
Replace 'yourusername' with your actual GitHub username.

8. Here we need to notice, if the default branch is not the master, please use this command first:
<div class="polaroid"  >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PnP4H.png">
        <img src="https://i.328888.xyz/2023/03/20/PnP4H.png"/>
    </a>
</div>

{{< highlight bash "linenos=table" >}}
git checkout -b master
{{< /highlight >}}

Finally, push the changes to the remote repository by running the command:
{{< highlight bash "linenos=table" >}}
git push -u origin master
{{< /highlight >}}


This will push the changes in your local Git repository to the remote repository on GitHub. You should now see your website files in the GitHub repository.

9. To make your website live, go to your repository settings on GitHub and scroll down to the GitHub Pages section. Select the master branch as your source and click on Save. Your website should now be accessible at https://yourusername.github.io.


Note that it may take a few minutes for GitHub Pages to update and display your website after you have deployed it.

## The full command
{{< highlight bash "linenos=table" >}}
git init
git checkout -b master
git add ./
git commit -m "Initial commit"
git branch -M master
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin master
{{< /highlight >}}


## Visit your site
<div class="polaroid"  >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PtVpc.png">
        <img src="https://i.328888.xyz/2023/03/20/PtVpc.png"/>
    </a>
</div>
<div class="polaroid"  >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/03/20/PtDhV.png">
        <img src="https://i.328888.xyz/2023/03/20/PtDhV.png"/>
    </a>
</div>


## Update your website
When you change some files or write a new blog, you need push your change to github, the command is:
{{< highlight bash "linenos=table" >}}
git add ./
git commit -m "commentxxxx"
git push 
{{< /highlight >}}

# Problem you might meet
## https://yourname.github.io/ is 404
If you're experiencing a 404 error after deploying your Hugo site to GitHub Pages, there are a few things you can try:

* Check the spelling and capitalization of your repository name. Make sure it matches the URL you're using to access your site. For example, if your repository is named my-hugo-site, your site should be accessible at https://yourusername.github.io/my-hugo-site/.

* Verify that you have set the correct repository source in your GitHub Pages settings. If you have multiple branches in your repository, make sure you've selected the correct one as the source for your GitHub Pages site. You can check this in your repository settings under the "GitHub Pages" section.

* Check that you've pushed your Hugo site's content to the correct branch. By default, GitHub Pages serves content from the gh-pages branch, so make sure you've pushed your site's files to that branch. Alternatively, you can configure GitHub Pages to use a different branch or directory by changing the settings in your repository.

* Verify that your site's content has been built correctly by running the hugo command locally and checking the generated files in the public/ directory. If the files are missing or incomplete, you may need to troubleshoot your Hugo configuration.

* If you're using a custom domain, make sure it's set up correctly and that your DNS settings are configured properly. This can sometimes cause issues with GitHub Pages sites.

* Wait a few minutes and try accessing your site again. It can sometimes take a few minutes for changes to propagate through GitHub Pages.

If none of these solutions work, you may need to consult the Hugo documentation or reach out to the GitHub support team for further assistance.