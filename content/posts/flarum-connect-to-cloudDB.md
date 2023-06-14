---
title: "Flarum框架如何连接云端数据库，保证数据一致性"
date: 2023-06-14T18:37:01+01:00
lastmod: 2023-06-14T18:37:01+01:00
subTitle: ""
description: "本文主要是实现本地的Flarum连接云端数据库，以及在开发过程中更快的数据备份，迁移。"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["database"]
categories: ["Flarum","Cloud"]
cover:
    position: right
    image: "https://i.imgloc.com/2023/06/15/VOejip.png"
    alt: "<alt text>"
    caption: "<text>"
---

**本文基于作者的理解，如有错误，欢迎指正**

考虑到未来数据量过大的情况下，数据迁移会很麻烦，本地部署每次都是重新创建。所以本地和云端必须要保持数据一致，并且定期做整个数据库的备份。
<p>
简单的思路就是，在本地搭建一个新的框架并且运行起来 (<a href="https://amber916young.github.io/posts/depoly-locally-macos-apache2/">本地搭建</a>), 连接云端数据库或者吧云端数据库拷贝本地运行。并且需要把插件包本地安装一遍，来保证云端和本地的数据一致性。
</p>

1. 连接云端数据库
2. 同步插件库
3. 云端数据库下载到本地运行

为了简化操作才直接连云端数据库的，实际上在开发环境不允许直接操作生产环境的数据。所以可以省略第一步。

## 1️⃣ Connect CloudDB
根据上文，在首页输入数据库信息，flarum框架会自动创建默认的所有表。在项目文件中，**config.php**就是存放数据库信息的配置文件。

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/15/VOeN13.png">
        <img src="https://i.imgloc.com/2023/06/15/VOeN13.png"/>
    </a>
    <div class="container">
        <p> 默认生成的配置文件 </p>
    </div>
</div>

要连接Flarum到云数据库，你需要进行以下步骤：
1. 获取云数据库的连接信息，包括主机名（IP地址或域名）、端口号、数据库名称、用户名和密码。
2. 打开Flarum的配置文件。默认情况下，该文件位于Flarum根目录下的config.php文件。
3. 在配置文件中，找到数据库相关的配置部分。这是默认的结构：

{{< highlight php "linenos=table" >}}
    'database' => [
        'driver'    => 'mysql',
        'host'      => 'localhost',
        'database'  => 'flarum',
        'username'  => 'root',
        'password'  => '',
        'charset'   => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix'    => '',
        'strict'    => false,
    ],
{{< /highlight >}}

4. 根据云数据库提供的连接信息，将上述代码中的主机名、数据库名称、用户名和密码等信息进行相应的更改。

{{< highlight php "linenos=table" >}}
    'database' => [
        'driver'    => 'mysql',
        'host'      => 'your-cloud-db-hostname',
        'database'  => 'your-cloud-db-name',
        'username'  => 'your-cloud-db-username',
        'password'  => 'your-cloud-db-password',
        'charset'   => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix'    => '',
        'strict'    => false,
    ],
{{< /highlight >}}
配置完成后重启apache本地服务器就能看到你在云端的一些修改。

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/15/VOecK8.png">
        <img src="https://i.imgloc.com/2023/06/15/VOecK8.png"/>
    </a>
</div>

## 2️⃣ Sync plugin
光连接数据库访问主页也许会出错，特别是在项目已经很大的情况下，所以必须同步插件库。
1. 在云端Flarum根目录中，找到以下两个文件 ：**composer.json & composer.lock**
2. 将这两个文件复制到本地Flarum的根目录中。

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/15/VOepUZ.png">
        <img src="https://i.imgloc.com/2023/06/15/VOepUZ.png"/>
    </a>
</div>

3. 打开命令行终端，进入本地Flarum的根目录。

4. 运行以下命令，以安装或更新本地Flarum所需的文件包：

{{< highlight bash "linenos=table" >}}
composer install
{{< /highlight >}}

同步完成后刷新页面，此时云端和本地的数据保持一致。

## 3️⃣ download cloud DB and run locally
直接在本地连接数据库是有风险的，比如端口暴露，防火墙关闭，不安全操作数据等。所以最好的办法就是把数据库下载下来。

### ❌ Mysql error 2002
不出意外，使用navicat连接云端失败。
**MySQL远程连接报错：ERROR 2002 (HY000): Can‘t connect to server on ‘ip‘**

显然，访问被拦截。
这篇[文章](https://blog.csdn.net/single_g_l/article/details/126216066)可以完美的解决这个问题。

### 🍀 .sql to loacalDB

我用navicat来连接数据库，直接export数据和结构的sql文件。

<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/15/VOe7bE.png">
        <img src="https://i.imgloc.com/2023/06/15/VOe7bE.png"/>
    </a>
</div>

再在进入XMAPP数据库界面，运行即可。⚠️注意，别忘记修改conf.php数据库配置文件。

<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/15/VOeE6C.png">
        <img src="https://i.imgloc.com/2023/06/15/VOeE6C.png"/>
    </a>
</div>

