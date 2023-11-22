<script src="./SideBar.js"></script>
<style src="./SideBar.css"></style>

<template>
	<div class="sidebar" :class="isOpened ? 'open' : ''" :style="cssVars">
		<div class="logo-details">
			<img v-if="menuLogo" :src="menuLogo" alt="menu-logo" class="menu-logo icon" />
			<img v-else :src="menuIcon" class="bx icon" />
			<div class="logo_name">
				<div>Tiêm Chủng</div>
				<div></div>
				Hoàng Gia
			</div>
			<i
				class="bx"
				:class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'"
				id="btn"
				@click="isOpened = !isOpened"
			/>
		</div>

		<div
			style="
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex-grow: 1;
				max-height: calc(100% - 60px);
			"
		>
			<div id="my-scroll" style="margin: 6px 14px 0 14px">
				<ul class="nav-list" style="overflow: visible">
					<!-- <li id="links_search" v-if="isSearch" @click="isOpened = true">
						<i class="bx bx-search" />
						<input
							type="text"
							:placeholder="searchPlaceholder"
							@input="$emit('search-input-emit', $event.target.value)"
						/>
						<span data-target="links_search" class="tooltip">{{ searchTooltip }}</span>
					</li> -->

					<li
						v-for="(menuItem, index) in menuItems"
						:key="index"
						:id="'links_' + index"
						v-show="hasCommonElement(menuItem.allowPermissions, $store.getters.userPermissions)"
					>
						<router-link v-if="isUsedVueRouter" :to="menuItem.link">
							<i class="bx fs-4" :class="menuItem.icon || 'bx-square-rounded'" />
							<span class="links_name">{{ menuItem.name }}</span>
						</router-link>
						<a
							v-else
							@click.stop.prevent="$emit('menuItemClcked', menuItem.link)"
							:href="menuItem.link"
						>
							<i class="bx fs-4" :class="menuItem.icon || 'bx-square-rounded'" />
							<span class="links_name">{{ menuItem.name }}</span>
						</a>
						<span :data-target="'links_' + index" class="tooltip">{{
							menuItem.tooltip || menuItem.name
						}}</span>
					</li>
				</ul>
			</div>

			<div v-if="isLoggedIn" class="profile">
				<div class="profile-details">
					<img v-if="profileImg" :src="profileImg" alt="profileImg" />
					<i v-else class="bx bxs-user-rectangle" />
					<div class="name_job">
						<div class="name">
							{{ profileName }}
						</div>
						<div class="job">
							{{ profileRole }}
						</div>
					</div>
				</div>
				<i
					v-if="isExitButton"
					class="bx bx-log-out"
					id="log_out"
					@click.stop="$emit('button-exit-clicked')"
				/>
			</div>
		</div>
	</div>
</template>
