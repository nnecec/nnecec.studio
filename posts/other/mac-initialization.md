---
title: '从零配置Macbook Pro, 2023.02 update'
date: '2023-02-17'
tags: ['Tutorial']
description: '介绍如何从零配置 Macbook Pro。最终配置完成时是前端开发的必要环境，以及具备常用工具。'
---

##

## 流程

> 一些系统及App配置可以参考[Mac Setup for Web Development [2023]](https://www.robinwieruch.de/mac-setup-web-development/)

### 0. 调整系统配置

按个人习惯配置 mac 系统配置

- 触摸板：开启轻点，开启 App Expose 手势
- 键盘快捷键：关掉不用的快捷键，重设截图快捷键
- 锁屏：调整锁屏时间
- Dock：自动隐藏

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

brew install --cask appcleaner arc docker figma google-chrome iina microsoft-edge notion obsidian raycast sourcetree telegram visual-studio-code warp wechat

# optional
brew install --case bitwarden

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

### 4. 配置 git 及 ssh

```bash
git config --global user.name "nnecec"
git config --global user.email "nnecec@outlook.com"
```

### 5. 安装字体

我用的编程字体是 `iosevka`，中文字体是`霞鹜文楷`。

```bash
brew tap homebrew/cask-fonts
brew install font-iosevka font-roboto font-roboto-mono font-lxgw-wenkai
```

### 6. 配置 App

- Raycase: 配置 Window Management，配置剪贴板快捷键(我配置的是 `cmd+control+v`)
- Telegram: 配置 Proxy
