<script src="./DashBoard.js"></script>

<style src="./DashBoard.css"></style>

<template>
	<div class="dashboard">
		<SideBar
			bgColor="#185d4c"
			secondaryColor="#00425A"
			:menuIcon="require('@/assets/Icons/logo.jpg')"
			@button-exit-clicked="logout"
			:profileName="user.hoTen"
			:isUsedVueRouter="true"
		/>
		<div class="mainContainer">
			<b-nav class="mainContainer__header bg-light border-bottom nav-bar sticky-top-98">
				<router-link
					v-for="item in navItems"
					:key="item.id"
					:to="item.routeName"
					class="nav-bar__item"
					active-class="nav-bar__item--active"
					@click.native="onNavNavigate(item)"
					exact
				>
					<i :class="item.icon"></i><label>&nbsp;{{ item.label }}</label>
				</router-link>
			</b-nav>
			<div class="mainContainer__body">
				<transition>
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>
