Asteroids!
=========

[Demo](https://kevincolten.github.io/asteroids)

```html
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <canvas id="canvas"></canvas>
  <script src="https://cdn.jsdelivr.net/gh/yoannmoinet/nipplejs@master/dist/nipplejs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/kevincolten/asteroids@master/asteroids.js"></script>
  <script>
    const game = new Asteroids(10, 'canvas');
    game.start();
  </script>
</body>
</html>
```
