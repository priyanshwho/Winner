"use client";

import React, { useEffect, useRef } from "react";

class Petal {
  customClass: string;
  x: number;
  y: number;
  z: number;
  xSpeedVariation: number;
  ySpeed: number;
  rotation: {
    axis: "X" | "Y" | "Z";
    value: number;
    speed: number;
    x: number;
  };
  el: HTMLDivElement;

  constructor(config: { customClass: string }) {
    this.customClass = config.customClass || "";
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.xSpeedVariation = 0;
    this.ySpeed = 0;
    this.rotation = {
      axis: "X",
      value: 0,
      speed: 0,
      x: 0,
    };

    this.el = document.createElement("div");
    this.el.className = "petal " + this.customClass;
    this.el.style.position = "absolute";
    this.el.style.backfaceVisibility = "visible";
  }
}

class BlossomScene {
  container: HTMLElement;
  placeholder: HTMLDivElement;
  petals: Petal[];
  numPetals: number;
  petalsTypes: { customClass: string }[];
  gravity: number;
  windMaxSpeed: number;
  windMagnitude: number;
  windDuration: number;
  width: number;
  height: number;
  timer: number;
  isPaused: boolean;
  resizeListener?: () => void;
  mouseX: number;
  mouseY: number;
  pointerListener?: (e: PointerEvent) => void;
  pointerLeaveListener?: () => void;
  animationFrameId?: number;

  constructor(config: {
    container: HTMLElement;
    numPetals: number;
    gravity: number;
    windMaxSpeed: number;
  }) {
    this.container = config.container;
    this.placeholder = document.createElement("div");
    this.petals = [];
    this.numPetals = config.numPetals;
    this.petalsTypes = [
      { customClass: "petal-style1" },
      { customClass: "petal-style2" },
      { customClass: "petal-style3" },
      { customClass: "petal-style4" },
    ];
    this.gravity = config.gravity;
    this.windMaxSpeed = config.windMaxSpeed;
    this.windMagnitude = 0.2;
    this.windDuration = 0;
    this.width = this.container.offsetWidth || window.innerWidth;
    this.height = this.container.offsetHeight || window.innerHeight;
    this.timer = 0;
    this.isPaused = false;

    this.container.style.overflow = "hidden";
    this.placeholder.style.transformStyle = "preserve-3d";
    this.placeholder.style.width = this.width + "px";
    this.placeholder.style.height = this.height + "px";
    this.placeholder.style.position = "absolute";
    this.placeholder.style.top = "0";
    this.placeholder.style.left = "0";
    this.placeholder.style.pointerEvents = "none";
    this.mouseX = -1000;
    this.mouseY = -1000;

    this.createPetals();
    this.container.appendChild(this.placeholder);
    this.animationFrameId = requestAnimationFrame(this.updateFrame.bind(this));

    this.resizeListener = () => {
      this.width = this.container.offsetWidth || window.innerWidth;
      this.height = this.container.offsetHeight || window.innerHeight;
      this.placeholder.style.width = this.width + "px";
      this.placeholder.style.height = this.height + "px";
    };
    window.addEventListener("resize", this.resizeListener);

    this.pointerListener = (e: PointerEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    };
    window.addEventListener("pointermove", this.pointerListener);

    this.pointerLeaveListener = () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    };
    document.addEventListener("pointerleave", this.pointerLeaveListener);
  }

  resetPetal(petal: Petal) {
    this.width = this.container.offsetWidth || window.innerWidth;
    this.height = this.container.offsetHeight || window.innerHeight;

    petal.x = Math.random() * this.width * 1.5 - this.width * 0.75;
    petal.y = petal.el.offsetHeight * -1;
    petal.z = Math.random() * 200;

    if (petal.x < 0) {
      petal.x = -petal.el.offsetWidth - Math.random() * 50;
      petal.y = Math.random() * this.height;
    }

    petal.rotation.speed = Math.random() * 10;
    let randomAxis = Math.random();
    if (randomAxis > 0.5) {
      petal.rotation.axis = "X";
    } else if (randomAxis > 0.25) {
      petal.rotation.axis = "Y";
      petal.rotation.x = Math.random() * 180 + 90;
    } else {
      petal.rotation.axis = "Z";
      petal.rotation.x = Math.random() * 360 - 180;
      petal.rotation.speed = Math.random() * 3;
    }

    petal.xSpeedVariation = Math.random() * 0.8 - 0.4;
    petal.ySpeed = Math.random() + this.gravity;

    return petal;
  }

  calculateWindSpeed(t: number, y: number) {
    let a = ((this.windMagnitude / 2) * (this.height - (2 * y) / 3)) / this.height;
    return a * Math.sin((2 * Math.PI / this.windDuration) * t + (3 * Math.PI / 2)) + a;
  }

  updatePetal(petal: Petal) {
    let petalWindSpeed = this.calculateWindSpeed(this.timer, petal.y);
    let xSpeed = petalWindSpeed + petal.xSpeedVariation;

    petal.x += xSpeed;
    petal.y += petal.ySpeed;
    petal.rotation.value += petal.rotation.speed;

    // Cursor repulsion physics
    if (this.mouseX !== -1000 && this.mouseY !== -1000) {
      let dx = petal.x - this.mouseX;
      let dy = petal.y - this.mouseY;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let radius = 120; // 120px interaction radius

      if (distance < radius) {
        let force = (radius - distance) / radius; // 0 to 1
        let angle = Math.atan2(dy, dx);
        let pushForce = force * 6; // push velocity
        petal.x += Math.cos(angle) * pushForce;
        petal.y += Math.sin(angle) * pushForce;

        // Aerodynamic spin boost
        petal.rotation.value += petal.rotation.speed * 1.5;
      }
    }

    let t =
      "translateX( " +
      petal.x +
      "px ) translateY( " +
      petal.y +
      "px ) translateZ( " +
      petal.z +
      "px ) rotate" +
      petal.rotation.axis +
      "( " +
      petal.rotation.value +
      "deg )";
    if (petal.rotation.axis !== "X") {
      t += " rotateX(" + petal.rotation.x + "deg)";
    }
    petal.el.style.transform = t;

    if (petal.x > this.width + 10 || petal.y > this.height + 10) {
      this.resetPetal(petal);
    }
  }

  updateWind() {
    this.windMagnitude = Math.random() * this.windMaxSpeed;
    this.windDuration = this.windMagnitude * 50 + (Math.random() * 20 - 10);
  }

  createPetals() {
    for (let i = 0; i < this.numPetals; i++) {
      let tmpPetalType =
        this.petalsTypes[Math.floor(Math.random() * this.petalsTypes.length)];
      let tmpPetal = new Petal({ customClass: tmpPetalType.customClass });

      this.resetPetal(tmpPetal);
      // Pre-scatter petals randomly across the screen boundaries on load
      tmpPetal.x = Math.random() * this.width;
      tmpPetal.y = Math.random() * this.height;
      this.petals.push(tmpPetal);
      this.placeholder.appendChild(tmpPetal.el);
    }
  }

  updateFrame() {
    if (this.isPaused) return;

    if (this.timer >= this.windDuration) {
      this.updateWind();
      this.timer = 0;
    }

    let petalsLen = this.petals.length;
    for (let i = 0; i < petalsLen; i++) {
      this.updatePetal(this.petals[i]);
    }

    this.timer++;
    this.animationFrameId = requestAnimationFrame(this.updateFrame.bind(this));
  }

  destroy() {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener);
    }
    if (this.pointerListener) {
      window.removeEventListener("pointermove", this.pointerListener);
    }
    if (this.pointerLeaveListener) {
      document.removeEventListener("pointerleave", this.pointerLeaveListener);
    }
    this.petals.forEach((petal) => petal.el.remove());
    this.placeholder.remove();
  }
}

export function CherryBlossom() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new BlossomScene({
      container: containerRef.current,
      numPetals: 70,
      gravity: 0.65,
      windMaxSpeed: 12,
    });

    return () => {
      scene.destroy();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .petal {
          background: url("https://talktofill.surge.sh/cherry-blossom.png") no-repeat;
          pointer-events: none;
          z-index: 1;
        }
        .petal.petal-style1 {
          width: 45px;
          height: 20px;
          background-position: -31px 0;
        }
        .petal.petal-style2 {
          width: 42px;
          height: 22px;
          background-position: 0 -23px;
        }
        .petal.petal-style3 {
          width: 37px;
          height: 24px;
          background-position: 0 -50px;
        }
        .petal.petal-style4 {
          width: 26px;
          height: 34px;
          background-position: -49px -35px;
        }
      `}</style>
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full"
      />
    </>
  );
}
