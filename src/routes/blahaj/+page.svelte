<script lang="ts">
    import { onMount } from 'svelte';
    import { db } from '$lib/server/db'
    import { blahajsTable } from '$lib/server/db/schema';
    import { eq } from 'drizzle-orm';

    let containsId: boolean = false;
    let urlParams: undefined | URLSearchParams;
    onMount(() => {
        urlParams = new URLSearchParams(window.location.search);
        containsId = urlParams.has('id');
        console.log(db.select().from(blahajsTable).where(eq(blahajsTable.uuid , (urlParams?.get('id')))));
    });
</script>

{#if containsId}
    <h1>Current id is {urlParams?.get('id')}</h1>
{:else}
    <h1>uhm this is missing an ID so what am i supposed to do? I don't have any profile to show you...</h1>
{/if}