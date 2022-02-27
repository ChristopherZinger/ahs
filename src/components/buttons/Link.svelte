<script lang="ts">
	export let href = '#';
	export let size: 'xs' | 's' | 'm' | 'l' = 's';
	export let style: string = '';
	export let underline = true;
</script>

<a {href} class:underline class={`${size} flex gap-x-2 items-center`} {style}
	><slot />
	{#if $$slots.icon}
		<span class="icon"><slot name="icon" /></span>
	{/if}
</a>

<style>
	a,
	a:visited {
		color: var(--color-black);
	}

	.underline {
		text-decoration: underline;
	}

	a.xs {
		font-size: 12px;
	}

	a.s {
		font-size: 18px;
	}

	a.m {
		font-size: 20px;
	}
	a.s .icon {
		width: 15px;
	}

	a.l {
		font-size: 26px;
	}

	a:hover .icon {
		margin-left: 15px;
	}

	.icon {
		display: inline-block;
		width: 20px;
		margin-left: 5px;
		transition-duration: 0.3s;
	}
</style>
