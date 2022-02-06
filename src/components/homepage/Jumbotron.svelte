<script lang="ts">
	import Navbar from '$src/components/Navbar.svelte';
	import SVGBlod from '$src/components/svg/SVGBlod.svelte';
</script>

<section class="jumbotron with-border">
	<Navbar />
	<div class="container ">
		<div class="logo">
			<h1 class="h5">ARCHITECTURE<br />HORROR <br />STORIES</h1>
			<div class="svg-blod">
				<SVGBlod />
			</div>
		</div>
	</div>
</section>

<style>
	.jumbotron {
		border-color: #393939;
		background: radial-gradient(57.82% 50% at 50% 50%, #ffc700 0%, #ffd600 95.31%);
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.container {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 125px;
	}

	.logo {
		position: relative;
		width: 280px;
		display: flex;
		justify-content: center;
		flex-grow: 0;
	}
	.logo h1 {
		z-index: 1;
		font-family: 'Alata';
		color: var(--color-white);
		font-size: 2em;
		line-height: 0.8em;
	}

	.svg-blod {
		position: absolute;
		top: 65px;
		left: 0px;
		width: 100%;
	}

	@media only screen and (min-width: 786px) {
		.logo {
			width: 338px;
		}

		.logo h1 {
			z-index: 1;
			font-size: 3em;
		}

		.svg-blod {
			top: 90px;
		}
	}
</style>
