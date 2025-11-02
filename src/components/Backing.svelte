<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let layers = 3;
  export let speed = 60;
  export let pulseSpeed = 5;

  let container: HTMLDivElement;

  function randomGradient(index: number, total: number) {
    const hueOffset = (index / total) * 360;
    return {
      from: [(250 + hueOffset) % 360, 80, 50],
      via: [(180 + hueOffset) % 360, 80, 50],
      to: [(270 + hueOffset) % 360, 80, 50],
      angle: (index * (360 / total)) % 360,
    };
  }

  let gradients: { from: number[]; via: number[]; to: number[]; angle: number }[] = [];

  onMount(() => {
    if (!container) return;

    gradients = Array.from({ length: layers }, (_, i) => randomGradient(i, layers));

    container.style.background = buildGradient();

    gsap.to(gradients, {
      duration: speed,
      repeat: -1,
      angle: "+=360",
      ease: "none",
      onUpdate: () => {
        container.style.background = buildGradient();
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

  function buildGradient() {
    return gradients
      .map(
        (g) =>
          `linear-gradient(${g.angle}deg, hsl(${g.from[0]},${g.from[1]}%,${g.from[2]}%) 0%, hsl(${g.via[0]},${g.via[1]}%,${g.via[2]}%) 50%, hsl(${g.to[0]},${g.to[1]}%,${g.to[2]}%) 100%)`
      )
      .join(", ");
  }
</script>

<div bind:this={container} class="backing"></div>
<div class="grid-overlay"></div>

<style>
  .backing {
    position: fixed;
    inset: 0;
    z-index: -10;
    overflow: hidden;
    width: 100%;
    height: 100%;
    filter: blur(6rem);
    transform: translateZ(0);
    background-size: auto;
    opacity: 0.25;
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
