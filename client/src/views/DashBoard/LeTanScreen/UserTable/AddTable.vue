<template>
	<div class="add-table">
		<div class="mx-3 mb-4 add-table" style="font-size: 14px">
			<div class="add-header row mb-4 border-bottom border-white">
				<div class="col-7 mb-3 left">
					<h5>HỌ TÊN()</h5>
				</div>

				<div class="col-5 mb-3">
					<button @click="save" type="button" class="btn btn-primary col-sm-6 col-md-3 rounded-1">
						<i class="fa-solid fa-save" style="color: #ebedef"></i>&nbsp;LƯU
					</button>

					<button
						@click="saveAndRegister"
						type="button"
						class="btn btn-primary col-sm-6 col-md-4 mx-1 rounded-1"
					>
						<i class="fa-solid fa-save" style="color: #ebedef"></i>&nbsp;LƯU VÀ ĐĂNG KÝ
					</button>

					<button
						type="button"
						class="btn btn-danger col-sm-6 col-md-4 rounded-1"
						@click="CloseAdd"
					>
						<i class="fa-solid fa-close" style="color: #ebedef"></i>&nbsp;ĐÓNG
					</button>
				</div>
			</div>

			<div class="add-content row left">
				<div class="col-4">
					<label class="form-label">Họ và tên<span style="color: red">(*)</span></label>
					<input
						v-model="khachHang.hoTen"
						type="text"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-4">
					<label class="form-label">Ngày sinh <span style="color: red">(*)</span></label>
					<input
						v-model="khachHang.ngaySinh"
						type="date"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-4">
					<div class="row">
						<div class="col-6 mr-3">
							<label class="form-label">Giới tính <span style="color: red">(*)</span></label>

							<select
								v-model="khachHang.gioiTinh"
								class="form-select"
								aria-label="Default select example"
							>
								<option v-for="(gioiTinh, key) of GIOI_TINH" :key="key" :value="key">
									{{ gioiTinh }}
								</option>
							</select>
						</div>
						<div class="col-6">
							<label class="form-label">Dân tộc <span style="color: red">(*)</span></label>
							<SeachableDropdown
								:maxItem="100"
								:options="danTocs"
								v-on:filter="getDanToc"
								:disabled="false"
								placeholder="Chọn"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="add-content row mt-2 left">
				<div class="col-4">
					<label class="form-label"
						>Nơi ở hiện tại (Tạm trú): Tỉnh/ Tp <span style="color: red">(*)</span></label
					>
					<div @click="getTinhThanhs">
						<SeachableDropdown
							:maxItem="100"
							:options="tinhThanhs"
							v-on:selected="onTinhThanh($event, ADDRESS_TYPE.TAM_TRU)"
							:disabled="false"
							placeholder="Chọn"
						/>
					</div>
				</div>
				<div class="col-4">
					<label class="form-label">Quận/ Huyện<span style="color: red">(*)</span></label>
					<div @click="getQuanHuyens({ type: ADDRESS_TYPE.TAM_TRU })">
						<SeachableDropdown
							:maxItem="100"
							:options="tamTru.quanHuyens"
							v-on:selected="onQuanHuyen($event, ADDRESS_TYPE.TAM_TRU)"
							:disabled="false"
							placeholder="Chọn"
						/>
					</div>
				</div>
				<div class="col-4">
					<div class="row">
						<div class="col-12 mr-3">
							<label class="form-label">Xã/ Phường <span style="color: red">(*)</span></label>
							<div @click="getXaPhuongs({ type: ADDRESS_TYPE.TAM_TRU })">
								<SeachableDropdown
									:maxItem="100"
									:options="tamTru.xaPhuongs"
									v-on:selected="onXaPhuong($event, ADDRESS_TYPE.TAM_TRU)"
									:disabled="false"
									placeholder="Chọn"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="add-content row mt-2 left">
				<div class="col-8">
					<label class="form-label">Địa chỉ chi tiết (Tạm trú)</label>
					<input
						v-model="khachHang.tamTru.chiTiet"
						type="text"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>

				<div class="col-4 d-flex align-items-end">
					<div class="row w-100">
						<div class="col-12 mr-3 w-100 mb-2">
							<input
								v-model="isThuongTruSimilarTamTru"
								type="checkbox"
								id="checkbox-dia-chi"
								class="col-1"
							/>
							<label for="checkbox-dia-chi" class="form-label mb-0"
								>Địa chỉ thường trú giống địa chỉ tạm trú</label
							>
						</div>
					</div>
				</div>
			</div>

			<div v-if="!isThuongTruSimilarTamTru" class="add-content row mt-2 left">
				<div class="col-4">
					<label class="form-label"
						>Nơi ở hiện tại (Thường trú): Tỉnh/ Tp <span style="color: red">(*)</span></label
					>
					<div @click="getTinhThanhs">
						<SeachableDropdown
							:maxItem="100"
							:options="tinhThanhs"
							v-on:selected="onTinhThanh($event, ADDRESS_TYPE.THUONG_TRU)"
							:disabled="false"
							placeholder="Chọn"
						/>
					</div>
				</div>
				<div class="col-4">
					<label class="form-label">Quận/ Huyện<span style="color: red">(*)</span></label>
					<div @click="getQuanHuyens({ type: ADDRESS_TYPE.THUONG_TRU })">
						<SeachableDropdown
							:maxItem="100"
							:options="thuongTru.quanHuyens"
							v-on:selected="onQuanHuyen($event, ADDRESS_TYPE.THUONG_TRU)"
							:disabled="false"
							placeholder="Chọn"
						/>
					</div>
				</div>
				<div class="col-4">
					<div class="row">
						<div class="col-12 mr-3">
							<label class="form-label">Xã/ Phường <span style="color: red">(*)</span></label>
							<div @click="getXaPhuongs({ type: ADDRESS_TYPE.THUONG_TRU })">
								<SeachableDropdown
									:maxItem="100"
									:options="thuongTru.xaPhuongs"
									v-on:selected="onXaPhuong($event, ADDRESS_TYPE.THUONG_TRU)"
									:disabled="false"
									placeholder="Chọn"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="!isThuongTruSimilarTamTru" class="add-content row mt-2 left">
				<div class="col-8">
					<label class="form-label">Địa chỉ chi tiết (Thường trú)</label>
					<input
						v-model="khachHang.thuongTru.chiTiet"
						type="text"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
			</div>

			<div class="add-content row mt-2 left">
				<div class="col-2">
					<label class="form-label">Mã tiêm chủng<span style="color: red">(*)</span></label>
					<input
						v-model="khachHang.maTiemChung"
						type="number"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-3">
					<label class="form-label"
						>Điện thoại liên hệ khi cần<span style="color: red">(*)</span></label
					>
					<input
						v-model="khachHang.dienThoai"
						type="number"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-3">
					<label class="form-label">CMT/CCCD</label>
					<input
						v-model="khachHang.cccd"
						type="number"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-4">
					<div class="row">
						<div class="col-6 mr-3">
							<label class="form-label">Email</label>
							<input
								v-model="khachHang.email"
								type="email"
								class="form-control"
								aria-describedby="emailHelp"
							/>
						</div>
						<div class="col-6">
							<label class="form-label">Mã hợp đồng</label>
							<input disabled type="text" class="form-control" aria-describedby="emailHelp" />
						</div>
					</div>
				</div>
			</div>

			<div class="add-content row mt-2 left">
				<div class="col-3">
					<label class="form-label">Hộ chiếu</label>
					<input disabled type="text" class="form-control" aria-describedby="emailHelp" />
				</div>
				<div class="col-3">
					<label class="form-label">Nghề nghiệp</label>
					<input
						v-model="khachHang.ngheNghiep"
						type="text"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-3">
					<div class="row">
						<div class="col-12">
							<label class="form-label">Đơn vị công tác</label>
							<input disabled type="text" class="form-control" aria-describedby="emailHelp" />
						</div>
					</div>
				</div>

				<div class="col-3">
					<div class="row">
						<div class="col-12 mr-3">
							<label class="form-label">Nhóm đối tượng ưu tiên(Covid19)</label>
							<select disabled class="form-select" aria-label="Default select example">
								<option selected>Chọn đối nhóm đối tượng ưu tiên....</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div
				class="add-content row mt-2 left"
				v-for="(nguoiBaoHo, idx) in khachHang.nguoiBaoHo"
				:key="idx"
			>
				<div class="col-2">
					<label class="form-label">Người bảo hộ<span style="color: red">(*)</span> </label>
					<input
						v-model="nguoiBaoHo.loai"
						type="text"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-3">
					<label class="form-label">Họ tên<span style="color: red">(*)</span></label>
					<input
						v-model="nguoiBaoHo.hoTen"
						type="text"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-2">
					<label class="form-label">Năm Sinh</label>
					<input
						v-model="nguoiBaoHo.namSinh"
						type="text"
						class="form-control"
						aria-describedby="emailHelp"
					/>
				</div>
				<div class="col-2">
					<div class="row">
						<div class="col-12">
							<label class="form-label">Số điện thoại</label>
							<input
								v-model="nguoiBaoHo.dienThoai"
								type="text"
								class="form-control"
								aria-describedby="emailHelp"
							/>
						</div>
					</div>
				</div>

				<div class="col-2">
					<div class="row">
						<div class="col-12">
							<label class="form-label">CMT/CCCD</label>
							<input
								v-model="nguoiBaoHo.cccd"
								type="text"
								class="form-control"
								aria-describedby="emailHelp"
							/>
						</div>
					</div>
				</div>
				<div class="col-1 d-flex align-items-end justify-content-between">
					<button type="button" class="btn btn-success" @click="addNguoiBaoHo">
						<i class="fa-solid fa-plus"></i>
					</button>
					<button type="button" class="btn btn-danger" @click="removeNguoiBaoHo(idx)">
						<i class="fa-solid fa-minus"></i>
					</button>
				</div>
			</div>

			<div class="add-content row mt-2 left">
				<div class="col-12">
					<label class="form-label">Ghi chú</label>
					<textarea
						v-model="khachHang.ghiChu"
						type="text"
						class="form-control"
						aria-describedby="emailHelp"
					></textarea>
				</div>
			</div>

			<div class="add-content row mt-4 mb-3">
				<div class="col-7"></div>
				<div class="col-5 mb-3">
					<button @click="save" type="button" class="btn btn-primary col-sm-6 col-md-3 rounded-1">
						<i class="fa-solid fa-save" style="color: #ebedef"></i>&nbsp;LƯU
					</button>

					<button
						@click="saveAndRegister"
						type="button"
						class="btn btn-primary col-sm-6 col-md-4 mx-1 rounded-1"
					>
						<i class="fa-solid fa-save" style="color: #ebedef"></i>&nbsp;LƯU VÀ ĐĂNG KÝ
					</button>

					<button
						type="button"
						class="btn btn-danger col-sm-6 col-md-4 rounded-1"
						@click="CloseAdd"
					>
						<i class="fa-solid fa-close" style="color: #ebedef"></i>&nbsp;ĐÓNG
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./AddTable.js"></script>
<style>
#checkbox-dia-chi {
	transform: scale(1.5);
}

.add-table {
	background: #dcdcdc;
	padding-top: 8px;
	padding: 10px;
	border-radius: 4px;
}

.left {
	text-align: left;
}
.form-label {
	margin-bottom: 0.5rem;
	font-weight: 700;
}
</style>
