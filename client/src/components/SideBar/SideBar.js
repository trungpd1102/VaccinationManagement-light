export default {
	name: 'SidebarMenuAkahon',
	props: {
		//! Menu settings
		isMenuOpen: {
			type: Boolean,
			default: true,
		},
		isUsedVueRouter: {
			type: Boolean,
			default: false,
		},

		menuLogo: {
			type: String,
			default: '',
		},
		menuIcon: {
			type: String,
			default: 'bxl-c-plus-plus',
		},
		isPaddingLeft: {
			type: Boolean,
			default: true,
		},
		menuOpenedPaddingLeftBody: {
			type: String,
			default: '250px',
		},
		menuClosedPaddingLeftBody: {
			type: String,
			default: '78px',
		},

		//! Menu items
		menuItems: {
			type: Array,
			default: () => [
				{
					link: '#',
					name: 'Trang Chủ',
					tooltip: 'Trang Chủ',
					icon: 'bx-grid-alt',
					allowPermissions: [
						'khachHang',
						'kham',
						'tiem',
						'thuNgan',
						'kho',
						'danhMuc',
						'baoCao',
						'quanTri',
					],
				},

				// {
				// 	link: '#',
				// 	name: 'Tin Nhắn',
				// 	tooltip: 'Tin Nhắn',
				// 	icon: 'bx-chat',
				// },
				// {
				// 	link: '#',
				// 	name: 'Analytics',
				// 	tooltip: 'Analytics',
				// 	icon: 'bx-pie-chart-alt-2',
				// },
				{
					link: '/danhmuc',
					name: 'Danh Mục',
					tooltip: 'Danh Mục',
					icon: 'bx-folder-plus',
					allowPermissions: ['danhMuc', 'kho', 'baoCao'],
				},
				{
					link: '/danhmuckho',
					name: 'Kho',
					tooltip: 'Kho',
					icon: 'bx-data',
					allowPermissions: ['danhMuc', 'kho', 'baoCao'],
				},
				{
					link: '/quantri',
					name: 'Quản trị',
					tooltip: 'Quản trị',
					icon: 'bx-cog',
					allowPermissions: ['quanTri'],
				},
				{
					link: '/baocao',
					name: 'Báo cáo',
					tooltip: 'Báo cáo',
					icon: 'bx-file-blank',
					allowPermissions: ['baoCao'],
				},
				// {
				// 	link: '#',
				// 	name: 'Setting',
				// 	tooltip: 'Setting',
				// 	icon: 'bx-cog',
				// },
			],
		},

		//! Search
		isSearch: {
			type: Boolean,
			default: true,
		},
		searchPlaceholder: {
			type: String,
			default: 'Search...',
		},
		searchTooltip: {
			type: String,
			default: 'Search',
		},

		//! Profile detailes
		profileImg: {
			type: String,
			default: '',
		},
		profileName: {
			type: String,
			default: 'Kho Hoàng Gia',
		},
		profileRole: {
			type: String,
		},
		isExitButton: {
			type: Boolean,
			default: true,
		},
		isLoggedIn: {
			type: Boolean,
			default: true,
		},

		//! Styles
		bgColor: {
			type: String,
			default: '#11101d',
		},
		secondaryColor: {
			type: String,
			default: '#1d1b31',
		},
		homeSectionColor: {
			type: String,
			default: '#e4e9f7',
		},
		logoTitleColor: {
			type: String,
			default: '#fff',
		},
		iconsColor: {
			type: String,
			default: '#fff',
		},
		itemsTooltipColor: {
			type: String,
			default: '#e4e9f7',
		},
		searchInputTextColor: {
			type: String,
			default: '#fff',
		},
		menuItemsHoverColor: {
			type: String,
			default: '#fff',
		},
		menuItemsTextColor: {
			type: String,
			default: '#fff',
		},
		menuFooterTextColor: {
			type: String,
			default: '#fff',
		},
	},
	data() {
		return {
			isOpened: false,
		};
	},
	mounted() {
		this.isOpened = this.isMenuOpen;
		this.tooltipAttached();
	},
	computed: {
		cssVars() {
			return {
				// '--padding-left-body': this.isOpened ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody,
				'--bg-color': this.bgColor,
				'--secondary-color': this.secondaryColor,
				'--home-section-color': this.homeSectionColor,
				'--logo-title-color': this.logoTitleColor,
				'--icons-color': this.iconsColor,
				'--items-tooltip-color': this.itemsTooltipColor,
				'--serach-input-text-color': this.searchInputTextColor,
				'--menu-items-hover-color': this.menuItemsHoverColor,
				'--menu-items-text-color': this.menuItemsTextColor,
				'--menu-footer-text-color': this.menuFooterTextColor,
			};
		},
	},
	watch: {
		isOpened() {
			window.document.body.style.paddingLeft =
				this.isOpened && this.isPaddingLeft
					? this.menuOpenedPaddingLeftBody
					: this.menuClosedPaddingLeftBody;
		},
	},
	methods: {
		tooltipAttached() {
			const tooltips = document.querySelectorAll('.tooltip');
			tooltips.forEach((tooltip) => {
				document.body.appendChild(tooltip);
			});
			document.querySelectorAll('.tooltip').forEach((tooltip) => {
				const targetID = tooltip.dataset.target;
				const target = document.querySelector(`#${targetID}`);
				if (!target) return;
				target.addEventListener('mouseenter', () => {
					const targetPosition = target.getBoundingClientRect();
					if (this.isOpened) return;
					tooltip.style.top = `${targetPosition.top + window.scrollY}px`;
					tooltip.style.left = `${targetPosition.left + targetPosition.width + 20}px`;
					tooltip.classList.add('active');
				});
				target.addEventListener('mouseleave', () => {
					tooltip.classList.remove('active');
				});
			});
		},
		/**
		 * To check if at least one item in two arrays is equal
		 * @param {*} arr1
		 * @param {*} arr2
		 * @returns
		 */
		hasCommonElement(arr1, arr2) {
			if (arr1) return arr1.some((item1) => arr2.includes(item1));
		},
	},
};
