var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var particles = [];
var numParticles = 2000;
var blackhole;
var numSwallowed = 0;
var gravityForce;

Math.hypot = Math.hypot || function() {
  var y = 0;
  var length = arguments.length;

  for (var i = 0; i < length; i++) {
    if (arguments[i] === Infinity || arguments[i] === -Infinity) {
      return Infinity;
    }
    y += arguments[i] * arguments[i];
  }
  return Math.sqrt(y);
};

var Vector = function(x, y) {
  this.x = x;
  this.y = y;
};

Vector.AddVector = function(v1, v2) {
  return new Vector(v1.x + v2.x, v1.y + v2.y);
};

Vector.SubstractVector = function(v1, v2) {
  return new Vector(v1.x - v2.x, v1.y - v2.y);
};

Vector.GetNormalizedDistance = function(v) {
  return Math.hypot(v.x, v.y);
};

Vector.prototype.Distance = function(v) {
  return Math.hypot(v.x - this.x, v.y - this.y);
};

Vector.GetDirectionFromAngle = function(angle, scale) {
  return new Vector(Math.sin(angle) * (Math.random() * scale + 10), Math.cos(angle) * (Math.random() * scale + 10));
};

var Particle = function() {
  var v = new Vector(0, 0);
  v.x = Math.random() * canvas.width * 2 - canvas.width / 2;
  v.y = Math.random() * canvas.height * 2 - canvas.height / 2;
  this.pos = v;
  this.velocityExplosion = null;
  this.isInExplosionPhase = false;
  this.isSwallowed = false;
  var subvector = Vector.SubstractVector(this.pos, blackhole);
  var angle = Math.atan2(subvector.x, subvector.y);
  angle = angle * 180 / Math.PI;
  var distance = this.pos.Distance(blackhole);
  this.alpha = 1;
  this.color = 'hsla(' + angle + ',100%,50%,X)';
};

Particle.prototype.Draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = this.color.replace("X", this.alpha);
  if (this.pos.x < 0 || this.pos.x > canvas.width || this.pos.y < 0 || this.pos.y > canvas.height)
    return;
  ctx.fillRect(this.pos.x, this.pos.y, 5, 5);
  ctx.fill();
};

Particle.prototype.Update = function() {
  var subv = Vector.SubstractVector(this.pos, blackhole);
  var h = Vector.GetNormalizedDistance(subv);
  if (h < 500)
    this.alpha = h / 500;
  var t = new Vector(-1 * (subv.y / h), subv.x / h);

  if (!this.isInExplosionPhase) {
    if (h < 30) {
      if (!this.isSwallowed) {
        this.isSwallowed = true;
        numSwallowed++;
      }
    }
  }

  if (h !== 0) {
    t.x *= gravityForce.x;
    t.y *= gravityForce.y;
    var d = new Vector(t.x - (subv.x / h), t.y - (subv.y / h));
    this.pos = Vector.AddVector(this.pos, d);
  }
  if (this.isInExplosionPhase) {
    this.pos.x += this.velocityExplosion.x;
    this.pos.y += this.velocityExplosion.y;
    this.velocityExplosion.x *= 0.99;
    this.velocityExplosion.y *= 0.99;
    if (Math.abs(this.velocityExplosion.x) < 0.5 && Math.abs(this.velocityExplosion.y) < 0.5)
      this.isInExplosionPhase = false;
  }
};

function StartExplosion() {
  for (var i = 0; i < particles.length; i++) {
    var angle = Math.random() * (Math.PI * 2);
    particles[i].pos.x = blackhole.x;
    particles[i].pos.y = blackhole.y;
    particles[i].velocityExplosion = Vector.GetDirectionFromAngle(angle, 5);
    particles[i].isInExplosionPhase = true;
    particles[i].isSwallowed = false;
    particles[i].alpha = 1;
    particles[i].color = 'hsla(' + (angle * 180 / Math.PI) + ',100%,50%,X)';
  }
  numSwallowed = 0;
}

canvas.addEventListener("mousemove", function(e) {
  blackhole.x = e.clientX;
  blackhole.y = e.clientY;
});

function loop(currentTime) {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particles.length; i++) {
    if (!particles[i].isSwallowed) {
      particles[i].Update();
      particles[i].Draw(ctx);
    }
  }
  if (numSwallowed >= numParticles)
    StartExplosion();
  requestAnimationFrame(loop);
}
blackhole = new Vector(canvas.width / 2, canvas.height / 2);
gravityForce = new Vector(5, 2);
for (var i = 0; i < numParticles; i++)
  particles.push(new Particle());
loop();