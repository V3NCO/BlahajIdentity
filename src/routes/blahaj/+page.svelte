<script>
    const urlParams = new URLSearchParams(window.location.search);
    const hasId = urlParams.has('id');
</script>

(#if hasId)
    <h1></h1>
(:else)
    <h1>uhm this is missing an ID so what am i supposed to do? I don't have any profile to show you...</h1>
(/if)