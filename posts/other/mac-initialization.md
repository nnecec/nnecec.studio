---
title: '从零配置Macbook Pro, 2023.02 update'
date: '2023-02-17'
tags: ['Tutorial']
description: '介绍如何从零配置 Macbook Pro。最终配置完成时是前端开发的必要环境，以及配好常用工具。'
---

## 前言

一些系统及 App 配置可以参考[Mac Setup for Web Development [2023]](https://www.robinwieruch.de/mac-setup-web-development/)。这位作者自定义了很多配置，并且安装了很多不一定用得上的 App。所以别人的配置最好作为参考，自己从中取需要的部分。不要照搬配置，配置了一大堆用不着的。

本文的配置几乎是（中国大陆前端）开发人员最小的配置清单了。记得把 nnecec 替换成你自己的 ID！

## 流程

### 0. 调整系统配置

按个人习惯配置 mac 系统配置

- 触摸板：调快速度，开启轻点，开启 App Expose 手势
- 键盘快捷键：关掉不用的快捷键，重设截图快捷键
- 锁屏：调整锁屏时间
- Dock: 调小图标，开启自动隐藏
- Spotlight: 感觉没太大用，快捷键关掉

### 1. 配置代理

从[Clash Premium 图形用户界面版](https://github.com/Loyalsoldier/clash-rules#clash-premium-%E5%90%84%E7%89%88%E6%9C%AC%E4%B8%8B%E8%BD%BD%E5%9C%B0%E5%9D%80)下载 Clash X Pro。并安装配置 config，该链接同时有 rule 配置，按需使用。

在控制台执行:

```bash
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

或配置`.zshrc`

```shell
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```

> 如果你没有代理，可以通过[这个链接](https://mojie.nl/#/register?code=xzSjSYO6)注册。这个代理是不限时间设备数量，只计算使用流量的，如果不经常看视频会非常省钱。从 2021 年用到现在一直都很稳定，速度也不错，试了一下 youtube 1440p 不会卡。

### 2. 安装 [Brew](https://brew.sh/)

在控制台执行:

```bash
# 开启使用第三方App权限
sudo spctl--master-disable

# 安装 brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完成后，可以安装应用了。

```bash
brew install fnm git pnpm starship

brew install --cask appcleaner arc bitwarden docker figma google-chrome iina microsoft-edge notion obsidian raycast sourcetree telegram visual-studio-code warp wechat

# optional
brew install --case item2 firefox licecap

fnm install 18
```

### 3. 配置 zsh

安装 on-my-zsh：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安装插件

```bash
git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone --depth=1 https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions
git clone --depth=1 https://github.com/ntnyq/omz-plugin-pnpm.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/pnpm
```

配置 .zshrc，仅列出几个必备配置：

```bash
plugins=(
  git z vscode
  node yarn pnpm
  zsh-autosuggestions
  zsh-completions
)
fpath+=${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions/src
source $ZSH/oh-my-zsh.sh
eval "$(starship init zsh)"
eval "$(fnm env)"

# pnpm
export PNPM_HOME="/Users/nnecec/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
```

我的最终 .zshrc 可以在[该链接](https://gist.github.com/nnecec/254eef8da4df74d5c577983accd82747)查看

### 4. 配置 git 及 ssh

```bash
git config --global user.name "nnecec"
git config --global user.email "nnecec@outlook.com"
```

参考[该链接](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)配置ssh，或者把老的 ssh 复制过来，这样就不用重新配置了。复制过来之后还需要执行一下 `ssh-add --apple-use-keychain ~/.ssh/{your file}`

### 5. 安装字体

我用的编程字体是 `iosevka`，中文字体是`霞鹜文楷`。安装后可以到 Warp，

```bash
brew tap homebrew/cask-fonts
brew install font-iosevka font-roboto font-roboto-mono font-lxgw-wenkai
```

### 6. 配置 App

- Edge/Chrome: 设置默认浏览器，登陆 google, github 等账号，其他平台一键登录会很方便
- Raycase: 配置 Window Management - presets - magnet，配置剪贴板快捷键(我配置的是 `cmd+control+v`)
  - magnet 预设方案如果有冲突，可以自定义快捷键，我是改成了 `control + option + cmd + KEY` 组合。
- Telegram: 配置 Proxy: 127.0.0.1:7890
- Warp/VSCode: `font: Iosevka, Roboto Mono, LXGW WenKai Mono`
