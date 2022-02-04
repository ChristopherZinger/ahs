<script lang="ts">
	export let h: 1 | 2 | 3 | 4 | 5 | 6;
	export let size: 1 | 2 | 3 | 4 | 5 | 6 | undefined = undefined;
	export let italic: boolean = false;
	export let style: string = '';
</script>

{#if h === 1}
	<h1 class:italic {style} class={size ? `h${size}` : ''}><slot /></h1>
{/if}

{#if h === 2}
	<h2 class:italic {style} class={size ? `h${size}` : ''}><slot /></h2>
{/if}

{#if h === 3}
	<h3 class:italic {style} class={size ? `h${size}` : ''}><slot /></h3>
{/if}

{#if h === 4}
	<h4 class:italic {style} class={size ? `h${size}` : ''}><slot /></h4>
{/if}

{#if h === 5}
	<h5 class:italic {style} class={size ? `h${size}` : ''}><slot /></h5>
{/if}

{#if h === 6}
	<h6 class:italic {style} class={size ? `h${size}` : ''}><slot /></h6>
{/if}

<style>
	.italic {
		font-style: italic;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: 'Poppins Bold';
		margin: 0;
	}
</style>
