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

  function randomGradient(index: number, total: number) {
    const hueOffset = (index / total) * 360;
    const from = [(250 + hueOffset) % 360, 80, 50];
    const via = [(180 + hueOffset) % 360, 80, 50];
    const to = [(270 + hueOffset) % 360, 80, 50];
    const angle = (index * (360 / total)) % 360;
    return { from, via, to, angle };
  }

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
