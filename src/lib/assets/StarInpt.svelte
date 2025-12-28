<script>
	export let value = 1; // 1-10 integer
	let hoverValue = 0;
	$: activeValue = hoverValue || value;

	function handleSet(v) {
		value = v;
	}

	function handleHover(v) {
		hoverValue = v;
	}
	function handleReset() {
		hoverValue = 0;
	}
</script>

<style>
    .stars {
        display: flex;
        gap: 6px;
        font-size: 2.3rem;
        cursor: pointer;
        user-select: none;
    }
    .star-container {
        position: relative;
        width: 1.15em;
        height: 1.15em;
        display: inline-block;
    }
    .star-bg {
        color: #eee;
        z-index: 0;
        position: absolute; left: 0; top: 0;
        width: 100%; height: 100%;
        pointer-events: none;
    }
    .star-half {
        color: gold;
        z-index: 1;
        position: absolute; left: 0; top: 0;
        width: 45%; height: 100%;
        overflow: hidden;
        pointer-events: none;
    }
    .star-half.right {
        left: 50%;
    }
    .star-full {
        color: gold;
        z-index: 2;
        position: absolute; left: 0; top: 0;
        width: 100%; height: 100%;
        pointer-events: none;
    }
    .star-zone {
        position: absolute;
        top: 0; height: 100%; width: 50%;
        z-index: 10;
        background: transparent;
        cursor: pointer;
    }
    .star-zone.left { left: 0; }
    .star-zone.right { left: 50%; }
</style>

<div class="stars">
	{#each Array(5) as _, i}
    <span class="star-container">
      <span class="star-bg">★</span>
			{#if activeValue >= (i*2+2)}
        <span class="star-full">★</span>
      {:else if activeValue === (i*2 + 1)}
        <span class="star-half">★</span>
      {/if}
      <span
				class="star-zone left"
				aria-label={`Half star: ${i*2+1}`}
				on:mouseover={() => handleHover(i*2+1)}
				on:mouseout={handleReset}
				on:click={() => handleSet(i*2+1)}
			></span>
      <span
				class="star-zone right"
				aria-label={`Full star: ${i*2+2}`}
				on:mouseover={() => handleHover(i*2+2)}
				on:mouseout={handleReset}
				on:click={() => handleSet(i*2+2)}
			></span>
    </span>
	{/each}
</div>