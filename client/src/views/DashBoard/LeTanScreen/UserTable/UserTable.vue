<template>
	<div class="h-85vh">
		<transition>
			<add-table v-if="showModalAddUser" @CloseAddUser="toggleAddUser"></add-table>

			<div class="mb-3 h-100 padding d-flex flex-column" v-else>
				<div class="row g-0 mb-3 header-content">
					<!-- input tìm kiếm -->
					<div class="col-lg-5 col-md-3">
						<input
							v-model="searchText"
							type="text"
							class="form-control"
							placeholder="Tìm kiếm theo Mã tiêm chủng/Họ tên/CMND/Số điện thoại"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
						/>
					</div>

					<!-- nút tìm kiếm -->
					<button
						type="button"
						class="btn btn-primary col-sm-6 col-md-1 rounded-1"
						@click="search({ page: 1, isStart: true })"
					>
						<i class="fa-solid fa-magnifying-glass" style="color: #ebedef"></i>Tìm kiếm
					</button>

					<!-- Nângcao -->
					<button
						class="btn btn-primary col-sm-6 col-md-1 rounded-1 border-start"
						@click="showModalNangcao"
					>
						Nâng cao
					</button>

					<transition>
						<modal-filter v-if="isshowModalNangcao" @on-tim-kiem-nang-cao="onTimKiemNangCao"></modal-filter>
					</transition>

					<!-- xoá thông tin -->
					<button
						type="button"
						class="btn btn-secondary col rounded-1 border-start"
						@click="onXoaThongTin"
					>
						<i class="fa-solid fa-xmark gray-200" style="color: #f6f7f9"></i>
						Xoá thông tin
					</button>

					<!-- thêm thông tin -->
					<div class="col"></div>
					<button
						type="button"
						class="btn btn-primary btn-sm col-sm-4 col-md-2 border-start rounded-1"
						@click="toggleAddUser"
					>
						<i class="fa-solid fa-plus" style="color: #fcfcfd"></i>&nbsp;Thêm thông tin
					</button>
				</div>
				<div class="table-wrapper flex-1 d-flex flex-column border">
					<table class="table table-hover">
						<thead class="table-light">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Mã tiêm chủng</th>
								<th scope="col">Họ tên</th>
								<th scope="col">Giới tính</th>
								<th scope="col">Ngày sinh</th>
								<th scope="col">Địa chỉ thường trú</th>
								<th scope="col">Người bảo hộ</th>
								<th scope="col">Thao tác</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in items" :key="index">
								<td scope="row">{{ index + 1 }}</td>
								<td>{{ item.maTiemChung }}</td>
								<td @click="ShowModalDetail(item)" class="clickable-info">
									{{ item.hoTen }}
								</td>
								<td class="col-xs-0">
									<i
										v-if="GIOI_TINH[item.gioiTinh] === 'Nữ'"
										class="fa-solid fa-venus"
										style="color: #f882c7"
									></i>

									<i
										v-if="GIOI_TINH[item.gioiTinh] === 'Nam'"
										class="fa-solid fa-mars"
										style="color: #65c3ec"
									></i>
								</td>
								<td>{{ item.ngaySinh | formatDateForInput }}</td>
								<!-- eslint-disable no-mixed-spaces-and-tabs -->
								<td>
									{{ item.thuongTru | formatAddressObj }}
								</td>
								<td>
									{{
										item.nguoiBaoHo[0]
											? item.nguoiBaoHo[0].loai
												? item.nguoiBaoHo[0].loai + ':'
												: ''
											: ''
									}}
									<b>{{ item.nguoiBaoHo[0] ? item.nguoiBaoHo[0].hoTen : '' }}</b>
								</td>

								<td>
									<i
										class="fa-solid fa-circle-plus --cursor-pointer --gray"
										title="Đăng ký khám"
										@click="register(item)"
									></i>
									<i
										class="fa-solid fa-pen mx-3 --cursor-pointer --gray"
										title="Sửa"
										@click="ShowModalDetail(item)"
									></i>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="d-flex padding border">
					<b-pagination
						v-model="currentPage"
						:total-rows="totalPages"
						:per-page="perPage"
						last-number
					></b-pagination>
				</div>

				<registration-form v-if="isShowRegForm" @CloseShowRegForm="ShowRegForm"></registration-form>
			</div>
		</transition>

		<BaseModal :modalId="khachHangModalId">
			<ModalDetail slot="modal-content" :isShowFunctionButton="true"></ModalDetail>
		</BaseModal>

		<BaseModal :modalId="dangKyModalId">
			<RegistrationForm slot="modal-content" @CloseShowRegForm="CloseShowRegForm" />
		</BaseModal>
	</div>
</template>
<script src="./UserTable"></script>
<style src="./UserTable.css" scoped></style>
