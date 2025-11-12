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
    from: [245 + Math.random() * 40, 65, 18 + Math.random() * 6],
    via: [195 + Math.random() * 30, 50, 22 + Math.random() * 6],
    to: [265 + Math.random() * 40, 72, 27 + Math.random() * 5],
    angle: (index * (360 / total) + Math.random() * 20) % 360,
  });

  let gradients = Array.from({ length: layers }, (_, i) => randomGradient(i, layers));

  let gradientStrings = gradients.map((g) => {
    const from = hsl(g.from);
    const via = hsl(g.via);
    const to = hsl(g.to);
    return `linear-gradient(0deg, ${from} 0%, ${via} 50%, ${to} 100%)`;
  });

  function buildGradient() {
    return gradients
      .map((g, i) => {
        return gradientStrings[i].replace("0deg", `${g.angle.toFixed(1)}deg`);
      })
      .join(", ");
  }

  const initialBackground = buildGradient();

  onMount(() => {
    if (!container) return;

    let rafScheduled = false;

    gsap.to(gradients, {
      duration: speed,
      repeat: -1,
      angle: "+=360",
      ease: "none",
      onUpdate: () => {
        if (!rafScheduled) {
          rafScheduled = true;
          requestAnimationFrame(() => {
            container.style.background = buildGradient();
            rafScheduled = false;
          });
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
    will-change: opacity, transform;
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
