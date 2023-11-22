<template>
	<div>
		<div class="row g-0 mb-1 border header border-top-0">
			<div
				v-for="(item, idx) in componentItems"
				:key="idx"
				class="col-sm-6 col-md-1 --cursor-pointer header__item"
				:class="{ 'sub-nav-activated': currentComponent.alias === item.alias }"
				@click="onSelectComponent(item)"
			>
				{{ item.label }}
			</div>
		</div>
		<transition>
			<!-- <keep-alive> -->
			<component :is="currentComponent.alias"></component>
			<!-- </keep-alive> -->
		</transition>
	</div>
</template>

<script src="./LeTanScreen.js"></script>

<style src="./LeTanScreen.css"></style>
