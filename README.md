[toc]

# 简介
## 小白接口+微信小程序示例一
众所周知，小程序搭配小白接口简直就是BUG一样的存在。不花一分钱就能发布自己的专属小程序。免费套餐强大到足以支撑一个私人小应用啦。 可免费调用15万次/月真的是很良心了。

# 环境准备
## 前端靠微信，后端靠小白！

1. 后台：使用小白接口，主要调用的接口有：
+ [App.Table.FreeQuery](http://hn216.api.okayapi.com/docs.php?service=App.Table.FreeQuery&detail=1&type=fold)
+ [App.Table.Create](http://hn216.api.okayapi.com/docs.php?service=App.Table.Create&detail=1&type=fold)
+ [App.Table.CheckCreate](http://hn216.api.okayapi.com/docs.php?service=App.Table.CheckCreate&detail=1&type=fold)
+ [App.CDN.UploadImg](http://hn216.api.okayapi.com/docs.php?service=App.CDN.UploadImg&detail=1&type=fold)
2. 开发工具：微信开发者工具(v1.02.1903292)

# 快速部署

## 查询个人域名
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
+ 接下来做一步十分重要的操作，打开根目录下的app.js拉到下面，把okayapiHost，okayApiAppKey，okayApiAppSecrect填写成自己的信息，具体可以在小白开放平台[系统设置 - 我的套餐](http://open.yesapi.cn/?r=App/Mine)查看，记得是**https**不是http
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190410233038109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
+ 现在离完成整个部署只差**填充后端数据**了！
+ 打开源代码目录下CSV文件夹里modelBulid.csv。可以查看本示例所需要的六个模型，在小白开放平台建立对应的模型，添加相应字段。
+ 或者将里面的json文件通过导入模型一键导入到自己的小白账号哦。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019041112331355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411123403497.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

## 建立模型
以首页轮播图为例，现在带大家[建第一个模型tea_swiper](http://open.yesapi.cn/?r=Data/MyModelsCreate)
+ 新建模型
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411124126799.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
+ 之后在[我的模型数据](http://open.yesapi.cn/?r=Data/MyModelsManager)内找到模型点击管管模型并加入modelBuild.csv文件内的字段名称/类型/备注
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411124526213.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411124818450.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
+ 添加数据，如无想放在轮播图的照片可以按照tea_swiper.csv内的地址添加。添加后效果如图。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411125156580.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
+ 接下来点击开发者工具-编译，即可看到轮播图已经成功调用啦！！！（您的小程序已经成功调用出放在小白数据库的数据了）
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019041112543320.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
>如果用户模型也建好，细心的同学会发现tea_user里面也已经拿到了登录的人的微信昵称以及openID，新用户登录这个小程序并且授权，就会新增一条数据。（微信的openID是微信用户唯一标识符，如有需求也可以增加省份，语言，用户头像等字段记录用户信息，调整模型跟pages/login.js代码即可）

>注意要改动login.js里面的appid&secret，换成自己的小程序appid&secret
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411130107303.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](http://cdn7.okayapi.com/0D19F4F8568B4232213F87FC45C03253_20190601142658_dd1fd1289482b5d0cf269365e6575766.png)
+ 接下来根据CSV文件夹里的tea.csv按操作添加相应的数据即可拥有自己的小程序啦（小白会员可直接用该csv文件导入到数据库哦（疯狂暗示）），tea_user，tea_order,tea_shopcar以及tea_moment都不用添加数据，下订单，发朋友圈等操作会自动添加。

# 演示效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411131910500.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411131922979.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411131947796.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411132011254.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/201904111320314.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411132040671.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjkzMjM2OQ==,size_16,color_FFFFFF,t_70)

# 联系我们
如有问题，欢迎提交Issue到这里，我们会尽快回复您的，或者联系我们[@sHuXnHs](https://github.com/shuxnhs) [@WillFang1997](https://github.com/WillFang1997)

如果喜欢，那就点个小心心呗，biu~~~


## 开源不易，需要鼓励。您的支持就是我们最大的前进动力！


# PowerBy——YesAPI
