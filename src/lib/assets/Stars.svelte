<script>
	import { onMount } from "svelte";
	export let rating = 0;
	export let isIndicatorActive = true;
	export let style = {
		styleStarWidth: 24,
		styleEmptyStarColor: "#737373",
		styleFullStarColor: "#ffd219"
	};
	let emptyStar = 0;
	let fullStar = 1;
	let totalStars = 5;
	let stars = [];
	function getStarPoints() {
		let centerX = style.styleStarWidth / 2;
		let centerY = style.styleStarWidth / 2;
		let innerCircleArms = 5; // a 5 arms star
		let innerRadius = style.styleStarWidth / innerCircleArms;
		let innerOuterRadiusRatio = 2.5; // Unique value - determines fatness/sharpness of star
		let outerRadius = innerRadius * innerOuterRadiusRatio;
		return calcStarPoints(
			centerX,
			centerY,
			innerCircleArms,
			innerRadius,
			outerRadius
		);
	}
	function calcStarPoints(
		centerX,
		centerY,
		innerCircleArms,
		innerRadius,
		outerRadius
	) {
		let angle = Math.PI / innerCircleArms;
		let angleOffsetToCenterStar = 60;
		let totalArms = innerCircleArms * 2;
		let points = "";
		for (let i = 0; i < totalArms; i++) {
			let isEvenIndex = i % 2 == 0;
			let r = isEvenIndex ? outerRadius : innerRadius;
			let currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r;
			let currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r;
			points += currX + "," + currY + " ";
		}
		return points;
	}
	function initStars() {
		stars = [];
		for (let i = 0; i < totalStars; i++) {
			stars.push({
				raw: emptyStar,
				percent: emptyStar + "%"
			});
		}
	}
	function calcStarFullness(starData) {
		let starFullnessPercent = starData.raw * 100 + "%";
		return starFullnessPercent;
	}
	function setStars() {
		let fullStarsCounter = Math.floor(rating);
		for (let i = 0; i < stars.length; i++) {
			if (fullStarsCounter !== 0) {
				stars[i].raw = fullStar;
				stars[i].percent = calcStarFullness(stars[i]);
				fullStarsCounter--;
			} else {
				let surplus = Math.round((rating % 1) * 10) / 10; // Support just one decimal
				let roundedOneDecimalPoint = Math.round(surplus * 10) / 10;
				stars[i].raw = roundedOneDecimalPoint;
				return (stars[i].percent = calcStarFullness(stars[i]));
			}
		}
	}
	function getFullFillColor(starData) {
		return starData.raw !== emptyStar
			? style.styleFullStarColor
			: style.styleEmptyStarColor;
	}
	onMount(() => {
		initStars();
		setStars();
	});
	$: rating, style, () => {
		initStars();
		setStars();
	};
</script>

<style>
    .stars-inline {
        display: inline-flex;
        align-items: baseline;
        vertical-align: middle;
        gap: 2px;
    }
    .star-svg {
        display: inline-block;
        vertical-align: middle;
        margin-right: 2px;
    }
    .indicator {
        font-size: 1rem;
        margin-left: 6px;
        vertical-align: middle;
        display: inline;
    }
</style>

<span class="stars-inline">
    {#each stars as star}
        <svg
					class="star-svg"
					style="fill: url(#gradient{star.raw}); height:{style.styleStarWidth}px; width:{style.styleStarWidth}px;">
            <polygon points={getStarPoints()} style="fill-rule:nonzero;" />
            <defs>
                <linearGradient id="gradient{star.raw}">
                    <stop
											id="stop1"
											offset={star.percent}
											stop-opacity="1"
											stop-color={getFullFillColor(star)} />
                    <stop
											id="stop2"
											offset={star.percent}
											stop-opacity="0"
											stop-color={getFullFillColor(star)} />
                    <stop
											id="stop3"
											offset={star.percent}
											stop-opacity="1"
											stop-color={style.styleEmptyStarColor} />
                    <stop
											id="stop4"
											offset="100%"
											stop-opacity="1"
											stop-color={style.styleEmptyStarColor} />
                </linearGradient>
            </defs>
        </svg>
    {/each}
	{#if isIndicatorActive}
        <span class="indicator">{rating}</span>
    {/if}
</span>