<template>
	<div>
		<div class="portlet light p-3 pt-0">
			<div class="row portlet-title">
				<div
					class="caption col-md-6 fs-5 d-flex justify-content-start align-items-center font-green"
				>
					<i class="fa-solid fa-list mx-3"></i>
					<span class="bold uppercase portlet-title_header">{{ headerName }}</span>
				</div>
				<div class="col-lg-6 col-md-6 portlet-title__btn">
					<div v-if="buttonKho">
						<button v-if="showButton" class="btn btn-primary mx-2" @click="ShowModalKho">
							<em class="fa fa-plus"></em> {{ nameBtn }}
						</button>

						<b-dropdown
							v-else
							size="lg"
							variant="primary"
							id="dropdown-right"
							text="Thêm mới"
							class="m-md-2"
							:class="{'d-none':displayNone}"
						>
							<slot name="btn-dropdown_option"></slot>
						</b-dropdown>

						<slot name="excel-header"></slot>
					</div>
					<slot v-else name="excel-header"></slot>
					<i
						class="fa-solid fa-circle-arrow-left turn-back --cursor-pointer"
						@click="backToDanhMuc"
						title="Trở về"
					></i>
				</div>
			</div>
			<div class="row p-2 mb-2">
				<slot name="add-button"></slot>

				<div v-if="buttonKho" class="col-md-4 p-1 text-left">
					<slot name="search-area"></slot>

					<!-- <div class="input-group">
						<input
							type="text"
							class="form-control col-sm-10"
							name="Keyword"
							v-model="searchKeyword"
							:placeholder="placeholder"
						/>
						<div id="frmSearch" class="input-group-btn dropdown">
							<button tabindex="-1" class="btn btn-primary" type="button" @click="search">
								<em class="fa fa-search"></em>
							</button>
							<button id="button1" type="button" class="btn btn-primary dropdown-toggle"></button>
							<div class="dropdown-menu theme-panel pull-right dropdown-custom" role="menu"></div>
						</div>
					</div> -->
				</div>
				<div class="col-md-4">
					<slot name="button"></slot>
				</div>
			</div>
			<div class="portlet-body">
				<!-- content-modal -->
				<slot name="danhsach"></slot>
			</div>
		</div>
	</div>
</template>
<script src="./ModalDanhMuc.js"></script>
<style src="./ModalDanhMuc.css" scoped></style>
