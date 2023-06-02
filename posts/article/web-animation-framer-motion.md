---
marp: true
class: invert
title: 'Web Animation'
date: '2023-05-06'
tags: ['Introduction']
description: ''
---

# Web Animation 网页动画

---

1. 什么是动画？
2. Web Animation 简史
3. Web Animation 技术
4. Animation 的工作原理
5. Framer Motion 简介

---

## 什么是动画？

动画（Animation）是一种通过定时拍摄一系列多个静止的固态图像（帧）以一定频率连续变化、运动（播放）的速度（如每秒 16 张）而导致肉眼的视觉残象产生的错觉——而误以为图画或物体（画面）活动的作品及其视频技术。

---

从史前文明到如今的信息时代，在人类文化中几乎都贯穿着动画的身影。现在，我们特别关注关于前端的动画:

**Web Animation 网页动画**

---

## Web Animation 简史

---

![First website](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ejhnnrSPdNcBLSQncuzrrw.png)

在能够编写动画之前，网站只是只能链接到其他普通文档的普通文档。这就是有史以来创建的第一个网站的样子，当时甚至缺少 CSS。

---

![GIF Demo](https://miro.medium.com/v2/resize:fit:964/1*Ry53XOSQR16hQtKbr5hC1w.gif)

1987 年，CompuServe 公司推出了图像互换格式(Graphics Interchange Format)，以其首字母缩略词 GIF 而闻名。Netscape Navigator 于 1995 年支持了 GIF 在浏览器中的使用。

---

![Flash demo](https://s3.ifanr.com/wp-content/uploads/2017/08/xiaoxaio.gif)

90 年代后期，Flash 被发明并被逐渐使用，网络上的所有内容都变得动画化。随后 Flash 在网络上流行了很多年。

---

在 2010 年的 4 月，当时苹果公司的 CEO 乔布斯发表一篇题为“对 Flash 的思考”的文章，指出随着 HTML5 的发展，观看视频或其它内容时，Adobe Flash 将不再是必须的。

> [iOS 不支持 Flash 的真实原因是什么？](https://www.zhihu.com/question/19609079/answer/60053891)

2014 年 10 月 28 日，W3C 正式发布 HTML5 推荐标准。

CSS3 标准自 1999 年开始制定，采用了模块化的规范制定方式。在 2009 年发布了与动画相关的 Animations 和 transform 模块公开草案。

<!-- 伴随着 iPhone 的登场，一个即将占领未来大部分市场的移动设备宣布了 flash 的死亡。在2010年前后，HTML/JavaScript 对动画的新标准的发布，也提供了更强的对动画支持的能力。 -->

---

随着移动互联网的快速发展，HTML/CSS/JavaScript 标准的更新，Flash 的慢性死亡，使用前端技术开发 Web Animation 越来越成为主流的开发方式。

---

## Web Animation 技术

- CSS Animation
- JavaScript Animation

---

### CSS Animations

- transition

  ```css
  transition: opacity 4s ease-in-out 1s;
  ele {
    opacity: 0.5;
  }
  ele:hover {
    opacity: 1;
  }
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

<!-- CSS 动画主要有 2 种实现方式，一种是通过 transition 属性编写，需要定义产生动画的属性、动画时长、渐变动画函数、延时属性，当切换 hover active 等伪类状态时，动画将会在定义 transition 的属性上产生响应的动画。

第二种是 通过 @keyframe 定义动画帧，并通过 animation 将页面元素与动画帧建立关联。同时 animation 可以定义 动画循环方式、动画时长、动画方向、结束状态等。 -->

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

通过

---

#### [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)

`requestAnimationFrame(callback: (time: number) => void)`

```js
function step() {
  if (ele.style.left < 200) {
    // set element style
    requestAnimationFrame(step)
  }
}
requestAnimationFrame(step)
```

<!-- 该方法需要传入 callback 作为参数，该回调函数会在浏览器下一次重绘之前执行。这个 API 在 2012 年之后主流浏览器已基本支持。 -->

---

### [Web Animations API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API)

JavaScript 最新的动画支持称为 Web Animations API (WAAPI)。

```ts
function animate(
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  options?: number | KeyframeAnimationOptions,
): Animation
```

<!-- 接受 2 个参数，第一个是关键帧定义，第二个是一些自定义动画配置。

关键帧 https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API/Keyframe_Formats

返回值为 Animation 实例，提供 timeline startTime 等属性， pause, play, reverse 等方法从而达到控制动画的能力。 -->

---

```ts
const cake = document.getElementById('#cake')

const animateCake = cake.animate(
  [{ transform: 'translateY(0)' }, { transform: 'translateY(-80%)' }],
  {
    easing: 'steps(4, end)',
    duration: aliceChange.effect.timing.duration / 2,
  },
)

animateCake.pause()
animateCake.play()
animateCake.cancel()
animateCake.finish()
```

---

[Demo](https://vueuse.org/core/useAnimate/)

vueuse 基于 WAAPI 实现了 useAnimation 方法

<!-- 从 Vue 的这个方法 可以大概一览能通过 WAAPI 拿到哪些属性及使用哪些方法 -->

---

### CSS 与 JavaScript 的性能差异

根据[CSS 动画与 JavaScript 动画的性能](https://developer.mozilla.org/zh-CN/docs/Web/Performance/CSS_JavaScript_animation_performance)的结论

> 事实上，大多数场景下，基于 CSS 的动画几乎是跟 JavaScript 动画表现一致。一些基于 Javascript 的动画库，甚至声称他们在性能上可以做得比原生 CSS transition/animation 更好。
> 这是可能的，因为在重绘事件发生之前，CSS transition 和 animation 在 UI 线程仅仅是重新采集元素的样式，这跟通过 requestAnimationFrame() 回调获取重新采集元素样式是一样的，也是在下一次重绘之前触发。假如二者都是在主 UI 线程创建的动画，那它们在性能方面没有差异。

---

## Animation 的工作原理

定义动画始终需要定义两个基本状态，即开始和结束状态。通过计算插值状态，实现动画效果。

`Progression = f(Time)`

<!-- Time 为从 0 到 1 匀速变化的时间状态，根据时间状态计算动画的完成比例 Progression。 -->

---

- linear: `f = (x) => x`
- Accelerating from zero velocity: `f = (x) => x * x`

> 访问 [ts-easing](https://github.com/streamich/ts-easing/blob/master/src/index.ts) 查看一些常见的插值动画函数

---

### cubic-bezier()

贝塞尔曲线的概念

> 访问 [easing.net](https://easings.net/zh-cn#) 查看贝塞尔曲线对应的动画效果

---

### useOffsetMotion

```ts
const useOffsetMotion = (
  animation: { x: number; y: number },
  options?: { duration?: number },
): React.Ref => {
  // ...
}

const App = () => {
  const ref = useOffsetMotion({ x: 200, y: 200 })

  return <div ref={ref} />
}
```

[Demo](https://codesandbox.io/p/sandbox/collections-mi2c3u?file=%2Fhooks%2Fuse-offset-motion.ts%3A17%2C1)

<!-- 了解完动画计算的基本原理后，基于 requestAnimationFrame 实现一个简单的控制 x/y 方向的动画方法 -->

---

## 流行动画库

- react-spring
- framer-motion
- gsap
- matter.js

<!-- 主要介绍一下 framer-motion -->

---

### Framer Motion

Framer Motion 提供了一系列基础组件及 hooks 方法供开发者方便地使用动画。

- `motion` 支持动画效果的组件
- `whileTap` `whileHover` 等，支持动画效果的事件
- `variants` 支持切换不同的动画帧状态
- `layout` 支持布局动画，

<!-- Framer Motion 主要概念有如下几个，
motion 可以为 DOM 元素或自定义组件提供处理动画的能力，如设置动画帧、过渡选项。
事件方法 如 whileHover 提供在相应手势时
variants 为开发者提供自定义的动画帧状态，当切换这些状态时，framer motion 会自动通过动画切换到对应的状态
layout 则是无法通过 css js 实现的一种动画能力，如对于位置相关的样式 flex, position or grid ，framer motion 提供了简单易用的使用方式
-->

---

#### Layout Animation

```jsx
<div className="flex" style={{ justifyContent: position }}>
  <motion.div layout></motion.div>
</div>
```

[Demo]()

<!-- 当布局样式 如 flex grid position 或尺寸 width height 会影响 HTML 布局时，为会变动位置或大小的 DOM 元素增加 layout 属性，就会提供动画的能力 -->

---

#### FLIP

FLIP: First, Last, Inverse, Play

[Article](https://www.nan.fyi/magic-motion#introducing-flip)

---

## 参考

- [The History of Web Animation.](https://medium.com/@milberferreira/the-history-of-web-animation-63b106c97fdf)
- [How Web Animation Works.](https://medium.com/@milberferreira/how-web-animation-works-e133e486d013)
- [Cubic Bézier: from math to motion](https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion/)
- [Guide to creating animations that spark joy with Framer Motion](https://blog.maximeheckel.com/posts/guide-animations-spark-joy-framer-motion/)
- [Everything about Framer Motion layout animations](https://blog.maximeheckel.com/posts/framer-motion-layout-animations/)
- [Inside Framer's Magic Motion](https://www.nan.fyi/magic-motion)
