<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let layers = 2;
  export let speed = 60;
  export let pulseSpeed = 5;

  let container: HTMLDivElement;

  function hsl([h, s, l]: number[]) {
    return `hsl(${h},${s}%,${l}%)`;
  }

  const randomGradient = (index: number, total: number) => ({
    from: [250 + Math.random() * 30, 60, 15 + Math.random() * 10],
    via: [200 + Math.random() * 25, 45, 21 + Math.random() * 10],
    to: [270 + Math.random() * 30, 70, 25 + Math.random() * 10],
    angle: (index * (360 / total) + Math.random() * 20) % 360,
  });

  let gradients = Array.from({ length: layers }, (_, i) => randomGradient(i, layers));

  let gradientStrings = gradients.map((g) => {
    const from = hsl(g.from);
    const via = hsl(g.via);
    const to = hsl(g.to);
    return { from, via, to };
  });

  function buildGradient() {
    return gradients
      .map((g, i) => {
        const { from, via, to } = gradientStrings[i];
        return `linear-gradient(${g.angle}deg, ${from} 0%, ${via} 50%, ${to} 100%)`;
      })
      .join(", ");
  }

  const initialBackground = buildGradient();

  onMount(() => {
    if (!container) return;

    let lastUpdate = 0;

    gsap.to(gradients, {
      duration: speed,
      repeat: -1,
      angle: "+=360",
      ease: "none",
      onUpdate: () => {
        const now = performance.now();
        if (now - lastUpdate > 16) {
          // throttle
          container.style.background = buildGradient();
          lastUpdate = now;
        }
      },
    });

    gsap.to(container, {
      duration: pulseSpeed,
      opacity: 0.25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
</script>

<div bind:this={container} class="backing" style="background: {initialBackground}"></div>
<div class="grid-overlay"></div>

<style>
  .backing {
    position: fixed;
    inset: 0;
    z-index: -10;
    width: 100%;
    height: 100%;
    filter: blur(4rem);
    transform: translateZ(0);
    opacity: 0.25;
    will-change: opacity, transform, background;
    pointer-events: none;
  }

  .grid-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -5; /* above gradient but below content */
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px);
    background-size: 40px 40px;
  }
</style>
