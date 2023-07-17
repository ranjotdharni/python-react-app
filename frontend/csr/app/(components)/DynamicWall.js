'use client'
import styles from './component.module.css';
import { useEffect } from 'react';

export default function DynamicWall() {

  const unit = '%';
  var particles;

  class Particle {
    constructor(id, x, y, moveX, moveY, minX, maxX, minY, maxY)
    {
      this.id = id;
      this.x = x;
      this.y = y;
      this.baseSpeedX = Math.abs(moveX);
      this.baseSpeedY = Math.abs(moveY);
      this.moveX = moveX;
      this.moveY = moveY;
      this.minX = minX;
      this.maxX = maxX;
      this.minY = minY;
      this.maxY = maxY;

      document.getElementById(this.id).style.left = this.x + unit;
      document.getElementById(this.id).style.top = this.y + unit;
    }

    updateParticle()
    {
      var div = document.getElementById(this.id);

      if ((this.x >= this.maxX) || (this.x <= this.minX))
      {
        this.moveX = this.moveX * -1;
      }

      if ((this.y >= this.maxY) || (this.y <= this.minY))
      {
        this.moveY = this.moveY * -1;
      }

      this.x = this.x + this.moveX;
      this.y = this.y + this.moveY;

      div.style.left = this.x + unit;
      div.style.top = this.y + unit;
    }
  }

  class ParticleSystem{

    constructor(canvas, particleCount, minX, maxX, minY, maxY, moveMaxX, moveMaxY)
    {
      this.particles = [];

      for (var i = 0; i < particleCount; i++)
      {
        const particleDiv = document.createElement('div');
        particleDiv.id = 'particle' + (i + 1);
        particleDiv.classList.add(styles.particle);

        document.getElementById(canvas).appendChild(particleDiv);

        const particle = new Particle(
          particleDiv.id, 
          getRandomDecimal(minX, maxX), 
          getRandomDecimal(minY, maxY), 
          getRandomDecimal(-moveMaxX, moveMaxX), 
          getRandomDecimal(-moveMaxY, moveMaxY),
          minX, 
          maxX, 
          minY, 
          maxY
        );

        this.particles[i] = particle;
      }
    }
  }

  function updateParticles()
  {

    particles.particles.forEach(particle => {
      particle.updateParticle();
    });

    requestAnimationFrame(() => updateParticles());
  }

  function getRandomDecimal(start, end) {
    var randomValue = Math.random() * (end - start) + start;
    return Number(randomValue.toFixed(2));
  }

  useEffect(() => {
    particles = new ParticleSystem('subject', (screen.width >= 1920 ? 300 : 150), 0, 100, 0, 100, 0.03, 0.02);
    requestAnimationFrame(() => {updateParticles()});
  }, []);

  return (
    <div id='subject' className={styles.background}></div>
  );
}