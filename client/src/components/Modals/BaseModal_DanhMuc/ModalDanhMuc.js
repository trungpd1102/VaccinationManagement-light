export default {
	props: {
		headerName: {
			type: String,
		},
		modalId: {
			type: String,
		},
		placeholder: {
			type: String,
		},
		showButton: {
			type: Boolean,
			default: true,
		},
		buttonKho: {
			type: Boolean,
			default: true,
		},
		displayNone: {
			type: Boolean,
			default: false,
		},
		nameBtn: {
			type: String,
			default:"Thêm mới"
		}
	},
	data() {
		return { searchKeyword: '' };
	},

	methods: {
		ShowModalKho() {
			this.$bvModal.show(this.modalId);
		},
		backToDanhMuc() {
			this.$router.back();
		},
		search() {
			this.$emit('on-search', this.searchKeyword);
		},
	},
};
