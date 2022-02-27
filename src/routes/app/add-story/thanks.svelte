<script lang="ts">
	import Link from '$src/components/buttons/Link.svelte';
	import SvgArror from '$src/components/svg/SVGArror.svelte';
</script>

<div class="mt-10">
	<div class="mb-10">
		<h2>Thanks !</h2>
		<p>Your story will be reviewd and published soon!</p>
	</div>
	<div>
		<Link href={'/app/search'}>back to search <span name="icon"><SvgArror /></span></Link>
	</div>
</div>
