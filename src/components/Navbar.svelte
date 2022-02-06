<script lang="ts">
	import Link from './buttons/Link.svelte';
	import MobileNav from './MobileNav.svelte';
</script>

<div class="nav-container">
	<nav class="main-nav">
		<Link href="#about">about</Link>
		<Link href="#survey">your story</Link>
	</nav>

	<MobileNav />
</div>

<style>
	.main-nav {
		display: none;
	}

	@media only screen and (min-width: 786px) {
		.main-nav {
			display: flex;
			justify-content: flex-end;
			column-gap: var(--spacing-l);
		}

		.nav-container {
			margin: 50px 120px;
		}

		nav {
			display: flex;
			align-items: center;
			row-gap: 16px;
			font-family: 'DM Serif Display';
			font-size: 18px;
			color: var(--color-black);
			text-decoration: none;
			column-gap: 50px;
			justify-content: right;
		}
	}
</style>
