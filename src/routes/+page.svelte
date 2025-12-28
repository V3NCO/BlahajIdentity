<script lang="ts">
	import StarInput from '$lib/assets/StarInpt.svelte'

	let name: string ;
	let date: string | null;
	let size: string;
	let sizeothr: string;
	let location: string | null;
	let description: string | null;
	let pronouns: string;
	let gender: string;
	let floof: number | null;
	let squish: number | null;
	let lastwashed: string | null;
	let mloftearsabsorbed: number | null = null;
</script>

<h1>Welcome to BlahajIdentity!</h1>

<label for="name">Name: </label> <input id="name" class="txtinput" type="text" bind:value={name} placeholder="Jane" /><br/>
<label for="date">Date of adoption: </label> <input id="date" class="dateinput" type="date" bind:value={date} /><br/>
<label for="size">Size: </label> <select id="size" class="size" bind:value={size}>
	<option value="55cm">55 cm</option>
	<option value="100cm">100 cm</option>
	<option value="other">Other</option>
</select><br/>
{#if size === "other"}
	<label for="advancedsize">Please write the size: </label> <input id="advancedsize" class="txtinput" placeholder="120cm" type="text" bind:value={sizeothr} /><br/>
{/if}
<label for="location">Location: </label> <input class="txtinput" id="location" type="text" bind:value={location} placeholder="IKEA San Francisco" /><br/>
<textarea rows="4" cols="50" placeholder="A happy blahaj :3!" bind:value={description}></textarea><br/>
<label for="pronouns">Pronouns: </label> <input id="pronouns" class="txtinput" type="text" bind:value={pronouns} placeholder="they/them" /><br/>
<label for="gender">Gender: </label> <input id="gender" class="txtinput" type="text" bind:value={gender} placeholder="Agender" /><br/>
<span>Floofiness level: </span><StarInput bind:value={floof} /><br/>
<span>Squishiness level: </span><StarInput bind:value={squish} /><br/>
<label for="lastwashed">Last time it was washed: </label> <input id="lastwashed" class="dateinput" type="date" bind:value={lastwashed} /><br/>
