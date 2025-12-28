<script lang="ts">
    import { onMount } from 'svelte';

    let containsId: boolean = false;
    let urlParams: undefined | URLSearchParams;
    let blahaj: undefined | Response;

    onMount(async () => {
        urlParams = new URLSearchParams(window.location.search);
        containsId = urlParams.has('id');
        blahaj = await fetch(`/api/getblahaj?uuid=${urlParams.get('id')}`)
    });
</script>

{#if containsId}
    <h1>Current id is {urlParams?.get('id')}</h1>
    {console.log(blahaj)}
{:else}
    <h1>uhm this is missing an ID so what am i supposed to do? I don't have any profile to show you...</h1>
{/if}