---
title: "Flarum:部署到云端(ubuntu 22.04)"
date: 2023-06-10T19:31:49+01:00
lastmod: 2023-06-10T19:31:49+01:00
subTitle: ""
description: "本文记录所有配置命令，包括php环境，数据库环境，apache服务，以及框架配置。"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Tutorial","Cloud", "Linux","Ubuntu"]
categories: ["Flarum"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---

>> 关于如何部署Flarum这个论坛框架有多种方法，1）直接linux命令 2）Docker部署 3）宝塔。 本文选第一种方法，因为简单，省内存。另外，建议所有的版本号最好都做记录，便于未来迁移。

>> 此配置不包含SSL


## 1️⃣ Deployment preparation
1. 一台服务器，选择ubuntu系统。
2. 域名（可选，如果没有域名可以直接用ip访问）。

## 2️⃣ Login to the server

不论用什么服务商，点击连接到服务器。请直接输入一下命令，如果出现permission deny错误，请用 sudo命令。

### 👉 Environment configuration
{{< highlight bash "linenos=table" >}}
sudo apt update
sudo apt upgrade -y

sudo apt install wget unzip curl nano git -y
sudo apt install apache2 -y
sudo systemctl enable --now apache2
sudo a2enmod rewrite
sudo systemctl restart apache2


# php 环境

sudo apt install php php-curl
sudo apt install php php-dom
sudo apt install php php-gd
sudo apt install php php-json 
sudo apt install php php-mbstring
sudo apt install php php-mysql
sudo apt install php php-tokenizer
sudo apt install php php-zip

# 数据库， 当然也可以安装mysql

sudo apt install mariadb-server -y
sudo systemctl enable --now mariadb
sudo mysql_secure_installation

# 登陆数据库，创建schema，数据库名flarum_db，可以自定义

sudo mysql

# 以下 是数据库sql
CREATE DATABASE flarum_db;
CREATE USER 'flarum_user'@'localhost' IDENTIFIED BY 'flarum_pass';
GRANT ALL PRIVILEGES ON flarum_db.* TO 'flarum_user'@'localhost';
FLUSH PRIVILEGES;
exit

{{< /highlight >}}

以上就是php以及数据库必要环境，接下来是下载Composer，Composer是一个在PHP中进行依赖性管理的工具。

### 👉 Composer download

{{< highlight bash "linenos=table" >}}
curl -sS https://getcomposer.org/installer -o composer-setup.php

sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
# 查看版本
composer -V
{{< /highlight >}}



### 👉 Flarum Framework download
首先创建一个文件夹，在 */var/www/html/forum/* 路径下
{{< highlight bash "linenos=table" >}}
sudo mkdir /var/www/html/forum/

# 跳转到此路径下进行下载
cd /var/www/html/forum/

sudo composer create-project flarum/flarum . --stability=beta

# 此命令是给予Read权限
sudo chown -R www-data:www-data /var/www/html/forum/
sudo chmod -R 755 /var/www/html/forum/

{{< /highlight >}}

### 👉 Apache configuration
此配置的目的是为了指定域名，已经框架部署路径，在Ubuntu环境下，操作文件的命令是nano（Linux下是Vim）

{{< highlight bash "linenos=table" >}}
# 跳转到此路径下进行创建 flarum.conf 文件
sudo nano /etc/apache2/sites-available/flarum.conf
{{< /highlight >}}

因为是新的文件，打开后切换编辑状态，复制以下内容：
主要改动的地方是 DocumentRoot 和 ServerName

{{< highlight yml "linenos=table" >}}
<VirtualHost *:80>
    ServerAdmin admin@example.com
    DocumentRoot /var/www/html/forum/public
    ServerName www.youngbird97.top

    DirectoryIndex index.php

<Directory /var/www/html/forum/public/>
    Options +FollowSymLinks
    AllowOverride All
    Order allow,deny
    allow from all

</Directory>

    ErrorLog /var/log/apache2/flarum-error_log
    CustomLog /var/log/apache2/flarum-access_log common

</VirtualHost>

{{< /highlight >}}

保存文件并且退出。

接下来，启用Flarum虚拟主机。
{{< highlight bash "linenos=table" >}}
sudo  a2ensite flarum
{{< /highlight >}}

启用Apache重写模块，并且重启Apache服务。
{{< highlight bash "linenos=table" >}}
sudo a2enmod rewrite
sudo systemctl restart apache2

# 检查一下apache服务状态
systemctl status apache2
{{< /highlight >}}

到目前为止，必要配置已经完成✅

### 👉 Enabling the Ubuntu Firewall
{{< highlight bash "linenos=table" >}}
sudo ufw enable
{{< /highlight >}}
<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/11/V2a9pF.png">
        <img src="https://i.imgloc.com/2023/06/11/V2a9pF.png"/>
    </a>
</div>


检查防火墙的状态。确保你将使用的端口（SSH - 端口 22, HTTP - 端口 80）是允许的。
{{< highlight bash "linenos=table" >}}
sudo ufw enable
{{< /highlight >}}

如果返回内容只有active，请输入一下命令:
{{< highlight bash "linenos=table" >}}
sudo ufw allow 22,80/tcp
{{< /highlight >}}


## 3️⃣ Check that all installations are successful

输入自己配置域名或者ip，正常情况下会看到这个页面，输入之前配置的数据库名称和密码，
再创建一个论坛账户（此账户是管理员账户）进行登陆。

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/11/V2aL4Q.png">
        <img src="https://i.imgloc.com/2023/06/11/V2aL4Q.png"/>
    </a>
</div>

如果一切顺利，会直接进去到论坛首页。下图实际上已经配置了很多组建，特别是配置了中文插件，总之大概是这个样子。

<div class="polaroid" style="width:100%" >
   <a data-fancybox="gallery" data-src="https://i.imgloc.com/2023/06/11/V2aMNE.png">
        <img src="https://i.imgloc.com/2023/06/11/V2aMNE.png"/>
    </a>
</div>




## 参考
1. https://www.vultr.com/docs/how-to-install-flarum-forum-on-ubuntu-20-04/ 配置文档
2. https://extiverse.com/ 组件库
3. https://builtwithflarum.com/ 模板

此配置文档也许会在某一天因版本更新而失效，仅供参考（2023）。


