[toc]

# 简介
## 小白接口+微信小程序示例一
众所周知，小程序搭配小白接口简直就是BUG一样的存在。不花一分钱就能发布自己的专属小程序。免费套餐强大到足以支撑一个私人小应用啦。 可免费调用15万次/月真的是很良心了。

# 环境准备
## 前端靠微信，后端靠小白！

1. 后台：使用小白接口，主要调用的接口有：
+ 查询接口[App.Table.FreeQuery](http://api.okayapi.com/docs.php?service=App.Table.FreeQuery&detail=1&type=fold)
+ 新建接口[App.Table.Create](http://api.okayapi.com/docs.php?service=App.Table.Create&detail=1&type=fold)
+ 效验新建接口[App.Table.CheckCreate](http://api.okayapi.com/docs.php?service=App.Table.CheckCreate&detail=1&type=fold)
+ 上传图片接口[App.CDN.UploadImg](http://api.okayapi.com/docs.php?service=App.CDN.UploadImg&detail=1&type=fold)
2. 开发工具：微信开发者工具(v1.02.1903292)

# 快速部署

## 查询个人域名(用来配置小程序域名)
+ 登录小白开放平台，进入：[系统设置 - 我的套餐](http://open.yesapi.cn/?r=App/Mine)，查看接口域名。如：
![在这里插入图片描述](http://cdn7.phalapi.net/20180325092043_7568a614a5ac0011c2eaafa8ca473754)

## 开发者平台配置域名
下载好源码之后需配置服务器域名（已配置过的可以跳过这一步）

+ 登录微信公众号平台
+ 设置 - 开发设置 - 服务器域名，修改request合法域名，uploadFile合法域名，修改为你当前所在的小白接口域名(小白接口已支持HTTPS访问)。如下：
![在这里插入图片描述](http://cdn7.phalapi.net/20180325091907_c20c1b1cb2a0f9822c4faad47557be7c)

> 特别注意！在微信服务器域名配置request合法域名时，一定要注意，域名前后不能有空格，最后不能有斜杠！！
否则会出现类似以下的错误提示：
![在这里插入图片描述](http://cdn7.okayapi.com/20180820224318_af9c1b0360728a590ce0879a2a6f0c93.png)


## 代码配置
+ 用微信小程序开发者工具打开源码
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190410232055437.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
+ 点击授权登录，会看到以下页面
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190410232320408.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
+ 接下来做一步十分重要的操作，打开根目录下的app.js拉到下面，把yesapiHost，yesApiAppKey，yesApiAppSecrect填写成自己的信息，具体可以在小白开放平台[系统设置 - 我的套餐](http://open.yesapi.cn/?r=App/Mine)查看，记得是**https**不是http
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190410233038109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
+ 现在离完成整个部署只差**填充后端数据**了！(只需一键)

## 建立模型
想调用官方数据的童鞋可以[一键生成官方案例所需六大模型](http://open.yesapi.cn/?r=Data/DemoModelsInstallOnce&model_name=mini)

> **注意**，同时安装六个模型（顶部轮播图，用户，购物车，商品列表，订单，朋友圈等）和示例数据需要一些时间，请耐心等待。

安装完后就可以看到下面的演示效果了

# 演示效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411131910500.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411131922979.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411131947796.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411132011254.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/201904111320314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411132040671.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

# 联系我们
如有问题，欢迎提交Issue到这里，我们会尽快回复您的，或者联系我们[@sHuXnHs](https://github.com/shuxnhs) [@WillFang1997](https://github.com/WillFang1997)

如果喜欢，那就点个小心心呗，biu~~~


## 开源不易，需要鼓励。您的支持就是我们最大的前进动力！


# PowerBy——YesAPI
