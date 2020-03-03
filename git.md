# Git
一个分布式的版本控制工具

将版本库分为两部分：
* 本地版本库（git init 初始化的本地版本库）
* 远程版本库(github)

* git常用指令
  * git init 初始化一个git本地空仓库
  * git add xxx 将文件从工作区添加到暂存区中
    * git add index.html 一个工作区文件
    * git add . 所有工作区文件
    * git add * 所有工作区文件
    * git add -A 所有工作区文件
  * git commit -m xxx 将文件从暂存区提交到版本区进行版本控制
  * git status 查看文件的状态（哪个区）
    * 红色：位于工作区
    * 绿色：位于暂存区
    * 没有显示（没有颜色）：位于版本区

* 本地仓库操作
  * git init 将当前文件夹变成git仓库（多一个.git文件夹）
  * 创建本地文件 
  * 需求: 将本地文件添加到git的版本库去
    * git add 文件名
    * git commit -m '提交的注释'

* git的三区（git将本地仓库分为三个区域）
  * 工作区：开发代码的地方（没有版本控制）
    * 新建了一个文件
    * 修改了一个文件
  * 暂存区：暂时保存代码的地方（没有版本控制）
    * git add 文件 
  * 版本区：代码进行git版本控制的地方
    * git commit -m 'xxx'
  
* git版本还原
  * git log 查看完整的版本历史记录
  * git reflog 查看简版版本历史记录
  * git reset --hard HEAD^ 回退到上一个版本
  * git reset --hard xxx 回退到指定版本

* git分支操作
  * git branch xxx 新建一个xxx分支
  * git checkout xxx 切换到xxx分支
  * git branch 查看当前有哪些分支
  * git checkout -b xxx 新建并切换分支 
  * git branch -d xxx 删除xxx分支
  * git merge xxx 合并xxx分支

* 注意：初始化仓库其实默认是没有分支的，当你add/commit提交一个版本，此时才会默认创建分支master

* github操作
  * 最终目的：将本地版本库代码推送到远程版本库保管
  
  * 本地有版本库，远程没有
  * 本地有本地版本库，远程也有远程版本库
    * 先要创建本地版本库
    * 再要创建远程版本库
    * 先要将本地仓库和远程仓库关联起来
      * git remote add origin xxx
        * 注意：关联仓库只能做一次，第二次就会失效报错
        * git remote remove origin 删除关联的仓库地址
    * 将本地仓库代码推送到远程仓库保管
      * git push origin xxx 将本地仓库xxx分支代码推送到远程仓库保管
        * 首次推送可以加上 -u 参数，第二次不需要  git push -u origin xxx
        * 注意：提交代码时，一定要先进行本地版本控制
    * 问题：可能存在部分同学没有自动保存用户名密码。
      * git config --global credential.helper store
  
  * 远程有版本库，本地没有(大家第一次进公司)
    * 将远程仓库克隆到本地来
      * git clone xxx
      * 一旦克隆下来，会自动关联
    * 修改本地仓库代码
    * 提交到远程仓库
      * 先进行本地版本控制
      * 再推送提交 git push origin xxx

  * 远程有版本库，本地没有(大家第一次进公司), 需要拉取远程仓库的dev分支内容
    * 将远程仓库克隆到本地来
      * git clone xxx
      * 本地默认只有master分支
    * 需要拉取远程仓库的dev分支内容
      * git fetch origin dev1:dev2 拉取远程仓库dev1分支到本地仓库的dev2分支
      * 只需要做一次
    * 切换到dev分支
      * git checkout dev

  * 远程仓库有更新，本地要拉取更新
    * git pull origin xxx 拉取远程仓库xxx分支到本地xxx分支来
    * 前提：本地仓库关联过远程仓库

  * git remote add origin xxx 关联远程仓库
  * git push origin xxx 将本地仓库xxx分支推送到远程仓库
  * git pull origin xxx 将远程仓库xxx分支拉取到本地仓库
  * git clone xxx 克隆远程仓库到本地
  * git fetch origin dev1:dev2 拉取远程仓库dev1分支到本地仓库的dev2分支

* 公司：
  * https方案
    * 仓库地址、用户名/密码、分支名称
      * 没有分支，自己创建
  * ssh方案
    * 仓库地址
    * 开发者需要提供给公司：一个ssh公钥
