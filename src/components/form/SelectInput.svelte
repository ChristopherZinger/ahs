<script lang="ts">
	export let label: string;
	export let id: string;
	export let name: string;
	export let options: { name: string; value: string }[];
</script>

<div>
	<label for={id}>{label}</label>
	<div>
		<select {name} {id}>
			{#each options as { name, value }}
				<option {value}>{name}</option>
			{/each}
		</select>
	</div>
</div>

<style>
	select,
	select:active,
	select:focus {
		width: 100%;
		border: 0;
		border-bottom: 2px solid var(--color-black);
		outline: none;
		padding: 10px 0px;
	}
</style>
