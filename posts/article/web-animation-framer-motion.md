---
marp: true
class: invert
title: '动画'
date: '2023-05-06'
tags: ['Introduction']
description: ''
---

# 动画

---

## 什么是动画

动画（Animation）是一种通过定时拍摄一系列多个静止的固态图像（帧）以一定频率连续变化、运动（播放）的速度（如每秒 16 张）而导致肉眼的视觉残象产生的错觉——而误以为图画或物体（画面）活动的作品及其视频技术。

---

从史前文明到如今的信息时代，在人类文化中几乎都贯穿着动画的身影。现在，我们特别关注动画的一个分支: Web Animation 网页动画。

---

## Web Animation 简史

---

![First website](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ejhnnrSPdNcBLSQncuzrrw.png)

在能够编写动画之前，网站只是只能链接到其他普通文档的普通文档。这就是有史以来创建的第一个网站的样子，当时甚至缺少 CSS。

---

![GIF Demo](https://miro.medium.com/v2/resize:fit:964/1*Ry53XOSQR16hQtKbr5hC1w.gif)

1987 年，CompuServe 推出了图像互换格式(Graphics Interchange Format)，以其首字母缩略词 GIF 而闻名。Netscape Navigator 于 1995 年支持了 GIF 在浏览器中的使用。

---

![Flash demo](https://s3.ifanr.com/wp-content/uploads/2017/08/xiaoxaio.gif)

90 年代后期，Flash 被发明并被逐渐使用，网络上的所有内容都变得动画化。随后 Flash 在网络上流行了很多年。

---

在 2010 年的 4 月，当时苹果公司的 CEO 乔布斯发表一篇题为“对 Flash 的思考”的文章，指出随着 HTML5 的发展，观看视频或其它内容时，Adobe Flash 将不再是必须的。

2014 年 10 月 28 日，W3C 正式发布 HTML5 推荐标准。

CSS3 标准自 1999 年开始制定，采用了模块化的规范制定方式。在 2009 年发布了与动画相关的 Animations 和 transform 模块公开草案。

---

随着移动互联网的快速发展，HTML/CSS/JavaScript 的新标准的落地，以及 Flash 慢慢的死亡，使用前端技术开发 Web Animation 成为后来的主流开发方式。

---

## Web Animation 技术

- CSS Animation
- JavaScript Animation

---

### CSS Animations

- transition

  ```css
  transition: margin-right 4s ease-in-out 1s;
  ```

- animation

  ```css
  animation: 4s linear 0s infinite alternate move_eye;

  @keyframes move_eye {
    from {
      margin-left: -20%;
    }
    to {
      margin-left: 100%;
    }
  }
  ```

---

### JavaScript Animations

- setInterval

  ```js
  setInterval(function () {
    // set element style
  }, 16)
  ```

- requestAnimationFrame
- Web Animations API (WAAPI)

---

#### [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)

`requestAnimationFrame(callback: (time: number) => void)`

该方法需要传入 callback 作为参数，该回调函数会在浏览器下一次重绘之前执行。这个 API 在 2012 年之后主流浏览器已基本支持。

```js
function step() {
  if (ele.style.left < 200) {
    // set element style
    requestAnimationFrame(step)
  }
}
requestAnimationFrame(step)
```

---

### [Web Animations API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API)

JavaScript 最新的动画支持称为 Web Animations API (WAAPI)。

```ts
function animate(
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  options?: number | KeyframeAnimationOptions,
): Animation
```

接受 2 个参数，第一个是关键帧定义，第二个是一些自定义配置。

返回值为 Animation 实例，提供 pause, play, reverse 等方法从而达到控制动画的能力。

---

### CSS Animation 与 JavaScript Animation 的性能差异

根据[CSS 动画与 JavaScript 动画的性能](https://developer.mozilla.org/zh-CN/docs/Web/Performance/CSS_JavaScript_animation_performance)的结论，CSS 与 JavaScript 在动画方面的性能差异不大。CSS 动画性能总体上要优于 JavaScript 的动画性能，但其只能定义简单的动画。当需要处理复杂动画时，可能仍需要选择 JavaScript 动画来完成。

---

## Animation 的工作原理

定义动画始终需要定义两个基本状态，即开始和结束状态。通过计算插值状态，实现动画效果。

`Progression = f(Time)`

Time 为从 0 到 1 匀速变化的时间状态，根据时间状态计算动画的完成比例 Progression。

---

- linear: `f = (x) => x`
- Accelerating from zero velocity: `f = (x) => x * x`
- [ts-easing](https://github.com/streamich/ts-easing/blob/master/src/index.ts)
- [easing.net](https://easings.net/zh-cn#)

---

### cubic-bezier()

贝塞尔曲线的概念

---

### 实现一个简单的动画方法 useMotion

```ts
const useMotion = (duration: number, easing?: string): Percent => {}
```

---

## 流行动画库

- react-spring
- framer-motion
- gsap
- matter.js

---

### framer-motion

能力介绍

---

## 参考

- [The History of Web Animation.](https://medium.com/@milberferreira/the-history-of-web-animation-63b106c97fdf)
- [How Web Animation Works.](https://medium.com/@milberferreira/how-web-animation-works-e133e486d013)
- [Cubic Bézier: from math to motion](https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion/)
