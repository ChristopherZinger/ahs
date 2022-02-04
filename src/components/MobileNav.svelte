<script lang="ts">
	import Link from './buttons/Link.svelte';
	import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
	import SvgCross from './svg/SVGCross.svelte';
	import SvgHamburger from './svg/SVGHamburger.svelte';

	let isOpen = false;
	const toggle = (onOrOff: 'on' | 'off') => {
		isOpen = onOrOff === 'on';
		isOpen ? disableBodyScroll('body') : enableBodyScroll('body');
	};
</script>

<div class="toggle" on:click={() => toggle('on')}>
	<div class="hamburger-icon">
		<SvgHamburger />
	</div>
</div>

<nav class:isOpen class="slide-nav">
	<div on:click={() => toggle('off')} class="cross">
		<SvgCross color="white" />
	</div>
	<div class="options">
		<Link href="#about" style="color: white" size="l">about</Link>
		<Link href="#survey" style="color: white" size="l">your story</Link>
	</div>
</nav>

<style>
	.cross,
	.hamburger-icon {
		width: 30px;
		height: 30px;
		margin: 30px;
	}

	.cross {
		align-self: flex-end;
	}

	.toggle {
		width: 100%;
		position: fixed;
		display: flex;
		justify-content: right;
	}

	.options {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		column-gap: var(--spacing-l);
		row-gap: var(--spacing-l);
		height: 100%;
	}

	.slide-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		transition-duration: 0.3s;
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		transform: translate(-100%);
		background-color: var(--color-black);
		z-index: 2;
	}

	.slide-nav.isOpen {
		transform: translate(0%);
	}

	@media only screen and (min-width: 786px) {
		.slide-nav,
		.toggle {
			display: none;
		}
	}
</style>
