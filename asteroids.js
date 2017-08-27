let manager, windowHeight, windowWidth, ctx;
  
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MovingObject {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
  }

  update(velocity) {
    this.position = {
      x: this.position.x + this.velocity.x,
      y: this.position.y + this. velocity.y
    };
  }

  offScreen() {
    if (this.position.x > windowWidth || this.position.x < 0) {
      return true;
    } else if (this.position.y > windowHeight || this.position.y < 0) {
      return true;
    } else {
      return false;
    }
  }

  fixOffScreen() {
    if (this.position.x < 0) {
        this.position.x += windowWidth;
    } else if(this.position.x > windowWidth) {
        this.position.x -= windowWidth;
    } else if(this.position.y < 0) {
        this.position.y += windowHeight;
    } else if(this.position.y > windowHeight) {
        this.position.y -= windowHeight;
    }
  }
}

class Asteroid extends MovingObject {
  constructor(position, velocity, radius) {
    super(position, velocity);
    this.radius = radius;
  }

  draw(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
    ctx.beginPath();
  
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  
    ctx.fill();
  }
}

class Asteroids {
  constructor(numAsteroids, el) {
    manager = nipplejs.create({
      // zone: document.querySelector('#control'),
      color: 'blue',
      // mode: 'static'
    });
    windowHeight = window.innerHeight;
    windowWidth = document.body.clientWidth;
    document.querySelector(el).height = windowHeight - 20;
    document.querySelector(el).width = document.body.scrollWidth - 10;
    ctx = document.querySelector(el).getContext('2d');

    this.asteroids = [];
    // this.ship = new Ship(
    //   { x: windowWidth / 2, y: windowHeight / 2 },
    //   { x: 0, y: 0 }
    // );

    // manager.on('move', (evt, data) => {
    //   if (data.angle) {
    //     this.ship.angle = -1 * (data.angle.radian - (Math.PI / 2));
    //     this.ship.power(
    //       data.force * 0.1 * Math.cos(this.ship.angle - (Math.PI / 2)),
    //       data.force * 0.1 * Math.sin(this.ship.angle - (Math.PI / 2))
    //     );
    //   }

    //   this.bullets.push(new Bullet(
    //     this.ship.position,
    //     {
    //       x: Math.cos(this.ship.angle - (Math.PI / 2)) * 10,
    //       y: Math.sin(this.ship.angle - (Math.PI / 2)) * 10
    //     },
    //     1
    //   ));

    // })
    // this.bullets = [];
  
    for(var i = 0; i < numAsteroids; i++){
      this.asteroids.push(new Asteroid(
        {
          x : getRandomInt(0, windowWidth),
          y : getRandomInt(0, windowHeight),
        },
        {
          x : getRandomInt(-3, 3),
          y : getRandomInt(-3, 3),
        },
        getRandomInt(5, 30)
      ));
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, windowWidth, windowHeight);
    this.asteroids.forEach(asteroid => asteroid.draw(ctx));
    // this.ship.draw(ctx);
    this.bullets.forEach(bullet => bullet.draw(ctx));
  }

  update(ctx) {
    this.asteroids.forEach(asteroid => {
      asteroid.update(asteroid.velocity);

      if (asteroid.offScreen()) {
        asteroid.fixOffScreen();
      }
    });

    // this.ship.update(this.ship.velocity);
    
    // if (this.ship.offScreen()) {
    //   this.ship.fixOffScreen();
    // }

    // this.bullets.forEach(bullet => {
    //   bullet.update(bullet.velocity);
      
    //   if (bullet.offScreen()) {
    //     bullet = null;
    //     // bullet.fixOffScreen();
    //   } else {
    //     let asteroid = this.asteroids.find(asteroid => {
    //       return (
    //         bullet.position.x < asteroid.position.x + asteroid.radius &&
    //         bullet.position.x > asteroid.position.x - asteroid.radius &&
    //         bullet.position.y < asteroid.position.y + asteroid.radius &&
    //         bullet.position.y > asteroid.position.y - asteroid.radius
    //       );
    //     });
    //     if (asteroid) {
    //       this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
    //       this.asteroids.push(new Asteroid(
    //         {
    //           x : getRandomInt(0, windowWidth),
    //           y : getRandomInt(0, windowHeight),
    //         },
    //         {
    //           x : getRandomInt(-3, 3),
    //           y : getRandomInt(-3, 3),
    //         },
    //         getRandomInt(5, 30)
    //       ));
    //       bullet = null;
    //     }
    //   }
    // });

    // this.bullets = this.bullets.filter(bullet => bullet);
    
  }

  start() {
    window.setInterval(() => {
      this.update(ctx);
      this.draw(ctx);
    }, 30);
  }
}

class Ship extends MovingObject {
  constructor(position, velocity) {
    super(position, velocity)
    this.angle = 0 * Math.PI;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(15, 27);
    ctx.lineTo(-15, 27);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  power(dx, dy) {
    this.velocity = {
      x: this.velocity.x += dx,
      y: this.velocity.y += dy
    };
  }
}

class Bullet extends Asteroid {
  constructor(position, velocity, radius) {
    super(position, velocity, radius);
  }
}
