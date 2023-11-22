<template>
	<b-modal
		:id="modalId"
		hide-footer
		hide-header
		no-close-on-backdrop
		:centered="centered"
		body-class="base-modal__body"
		content-class="base-modal__content"
		:dialog-class="{ 'base-modal__dialog': true, 'base-modal__dialog--top': !centered }"
	>
		<slot name="modal-content"></slot>
	</b-modal>
</template>

<script>
export default {
	props: {
		modalId: String,
		centered: { type: Boolean, default: true },
	},
};
</script>

<style>
.base-modal__body {
	padding: 0;
	display: flex;
	flex-direction: column;
	align-self: center;
	justify-content: center;
	border: none;
	height: 100%;
}
.base-modal__content {
	padding: 0;
	width: fit-content;
	border: none;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.base-modal__dialog {
	justify-content: center;
	max-width: unset;
	margin: 0px;
	border: none;
}

.base-modal__dialog--top {
	display: flex;
	align-items: flex-start;
	padding: 20px 0;
}
.modal-backdrop {
	--bs-backdrop-bg: #3333337b;
}
</style>
