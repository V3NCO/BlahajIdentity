<script lang="ts">
    import { onMount } from 'svelte';
    import Time from "svelte-time";
    import Stars from "$lib/assets/Stars.svelte"

    type BlahajType = {
        id: number;
        uuid: string;
        name: string ;
        date: string | null;
        size: string;
        location: string | null;
        description: string | null;
        pronouns: string;
        gender: string;
        floof: number | null;
        squish: number | null;
        lastwashed: string | null;
        mloftearsabsorbed: number | null;
    }
    let containsId: boolean = false;
    let urlParams: undefined | URLSearchParams;
    let blahaj: BlahajType | undefined = undefined;

    let floofRating: number = 0;
    let squishRating: number = 0;

    onMount(async () => {
        urlParams = new URLSearchParams(window.location.search);
        containsId = urlParams.has('id');
        if (containsId) {
            const blahaj_res = await fetch(`/api/blahaj?uuid=${urlParams.get('id')}`, {method: 'GET'});
            blahaj = await blahaj_res.json()
            floofRating = (blahaj?.floof ?? 0) / 2;
            squishRating = (blahaj?.squish ?? 0) / 2;
        }
    });
</script>

{#if containsId}
    {#if blahaj}
        <p><strong>Name:</strong> {blahaj.name}</p>
        <p><strong>Size:</strong> {blahaj.size}</p>
        <p><strong>Date of adoption:</strong> {new Date(blahaj.date).toDateString()} - <Time relative timestamp="{blahaj.date}"/></p>
        <p><strong>Place of adoption:</strong> {blahaj.location}</p>
        <p><strong>Pronouns:</strong> {blahaj.pronouns}</p>
        <p><strong>Gender:</strong> {blahaj.gender}</p>
        <span style="display: inline-block; margin-top: 0.3em;">
            <strong>Floofiness rating:</strong>
            <Stars rating={floofRating} isIndicatorActive={true} />
        </span> <br/>
        <span style="display: inline-block;">
            <strong>Squishiness rating:</strong>
            <Stars rating={squishRating} isIndicatorActive={true} />
        </span>
        <p><strong>Last time washed:</strong> {new Date(blahaj.lastwashed).toDateString()} - <Time relative timestamp="{blahaj.lastwashed}"/></p>
        <p><strong>Description:</strong> {blahaj.description}</p>
    {/if}
{:else}
    <h1>uhm this is missing an ID so what am i supposed to do? I don't have any profile to show you...</h1>
{/if}