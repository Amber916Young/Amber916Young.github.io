---
title: "使用XAMPP本地部署Flarum在MAC环境中"
date: 2023-06-13T18:20:07+01:00
lastmod: 2023-06-13T18:20:07+01:00
subTitle: ""
description: "本文主要介绍在MacOs中本地部署Flarum，这么做的目的主要是便于修改文件，和云端保持一致性，避免出错。虽然感觉也不太完美，但实现本地部署只是第一步。"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["MacOS","LocalDepoly"]
categories: ["Flarum","Apache"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---

简单的流程只有三个，不过部署会遇到很多问题，mac自带apache的配置我实在是没弄好，还是下载了XAMPP来部署。

1. 下载XAMPP
2. 下载composer
3. 下载Flarum

## 1️⃣ Download XAMPP

进入[官网](https://www.apachefriends.org/)，选择OS X操作系统。
双击dmg可能会出现不允许安装的情况。如果出现这种情况需要进入安全&隐私，输入密码点击同意就可以继续安装了。

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKCcU.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKCcU.png"/>
    </a>
</div>

傻瓜安装，完成后运行。
<div class="polaroid" style="width:40%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHK2f3.png">
        <img src="https://i.imgloc.com/2023/06/14/VHK2f3.png"/>
    </a>
</div>

### 🌲Config in XAMPP
也许你的电脑已经运行了mysql，那么在XAMPP中，数据库就不会运行。

<div class="polaroid" style="width:40%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKOF5.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKOF5.png"/>
    </a>
</div>
如果出现这种情况，点击数据库的配置，把端口号修改为4306，
<div class="polaroid" style="width:40%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHK8wZ.png">
        <img src="https://i.imgloc.com/2023/06/14/VHK8wZ.png"/>
    </a>
</div>

另外点击【Open Conf File】，修改端口号。
<div class="polaroid" style="width:80%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKbY8.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKbY8.png"/>
    </a>
</div>
保存退出后，点击start即可。

做完上面两个步骤，Apache和数据库都是运行状态，点击[本地运行链接](http://localhost/dashboard/)，如果能看到XAMPP主页说明目前没有问题。
<div class="polaroid" style="width:60%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKIxF.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKIxF.png"/>
    </a>
</div>

点击phpmyadmin，进入数据库配置。前一篇文章的数据库信息直接搬过来，直接运行sql语句创建数据库以及用户。
{{< highlight mysql "linenos=table" >}}
CREATE DATABASE flarum_db;
CREATE USER 'flarum_user'@'localhost' IDENTIFIED BY 'flarum_pass';
GRANT ALL PRIVILEGES ON flarum_db.* TO 'flarum_user'@'localhost';
FLUSH PRIVILEGES;
{{< /highlight >}}

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKRcE.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKRcE.png"/>
    </a>
</div>
创建完成后可以在左侧看到相关的数据库，只不过这个时候，数据库是空的。
到目前为止，XAMPP基础部署已经完成，接下来需要下载Composer。如果已经下载过那么就跳过这一步。

## 2️⃣ Download Composer

点击[主页](https://getcomposer.org/download/)，直接跟着命令走一遍就可以了。
输入命令查看是否安装成功
{{< highlight bash "linenos=table" >}}
composer -v
{{< /highlight >}}
<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKcsC.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKcsC.png"/>
    </a>
</div>


## 3️⃣ Download Flarum
首先，这个框架放在哪里，apache服务器怎么配置需要弄明白。找到XAMPP的安装路径，在MAC中，此路径是  **/Applications/XAMPP**

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKXGt.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKXGt.png"/>
    </a>
</div>
命令pwd查看路径。
<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKgYJ.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKgYJ.png"/>
    </a>
</div>

### 👉 Download Flarum in correct path

Flarum框架下载的位置在 /Applications/XAMPP/xamppfiles/htdocs/flarum，htdocs文件夹下没有flarum这个文件夹，所以需要创建一个。

{{< highlight bash "linenos=table" >}}
cd /Applications/XAMPP/xamppfiles/htdocs/
mkdir flarum
{{< /highlight >}}
创建完成后，进入此文件夹，输入下载命令。
{{< highlight bash "linenos=table" >}}
cd /flarum
// 检查路径是否正确
pwd
// 下载
composer create-project flarum/flarum . --stability=beta
{{< /highlight >}}

### 👉Apache config edit
返回XAMPP界面，点击Apache服务配置，点击【Open Config File】，找到 「<Directory」标签，默认的路径是“/Applications/XAMPP/xamppfiles/htdocs”
<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKhyb.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKhyb.png"/>
    </a>
</div>
{{< highlight bash "linenos=table" >}}
<Directory "/Applications/XAMPP/xamppfiles/htdocs">
    Options Indexes FollowSymLinks ExecCGI Includes
    AllowOverride All
    Require all granted
</Directory>
{{< /highlight >}}
你可以选择不修改，因为Flarum文件夹就在htdocs文件下下面，那这样子的访问路径就是“http://localhost/flarum/public/”。如果Flarum框架的下载地址不在htdocs文件夹下，那么需要指定正确的文件夹路径。

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/14/VHKoqw.png">
        <img src="https://i.imgloc.com/2023/06/14/VHKoqw.png"/>
    </a>
</div>

如果你没有出现这个界面，而是出现了xxx权限不够情况是非常正常的。需要给Flarum文件夹赋予读写权限。
进入flarum文件夹下，给定777权限。
注意777是危险操作！如果在本地不考虑安全因素可以完全赋予777权限。
{{< highlight bash "linenos=table" >}}
cd /Applications/XAMPP/xamppfiles/htdocs/flarum
// . 的意思是该文件夹下所有的文件都有读写权限
sudo chmod -R 777  .
// 或者根据提示文件夹赋予权限
sudo chmod -R 777  [文件夹名/文件名]
{{< /highlight >}}

重启服务器，刷新页面就能看到一个全新的flarum界面。如上图，数据库的信息就是之前配置的（和云端部署的信息最好保持一致）
{{< highlight bash "linenos=table" >}}
// 重启服务器
sudo apachectl restart
{{< /highlight >}}



## Common Apache CLI

{{< highlight bash "linenos=table" >}}
// 启动服务器
sudo apachectl start

// 重启服务器
sudo apachectl restart

// 停止服务器
sudo apachectl stop
{{< /highlight >}}

## 🍀 Summary
虽然在本地部署的是一个全新的flarum框架，在实际开发过程中大概率是不能次次重新部署的，所以下一步的计划就是云端和本地的来回迁移，更新。
另外，考虑将数据库与服务器分开部署。也许会增加一些费用，但灵活性更高。
