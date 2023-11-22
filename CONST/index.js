const Pages = {
	CapNhapApi: { displayName: 'Cài đặt tài khoản TCQG', checked: false },

	DanhMuc: {
		displayName: 'Danh mục',
		checked: false,
		children: {
			ChietKhau: { displayName: 'Chiết khấu', checked: false },
			ChucVu: { displayName: 'Chức vụ', checked: false },
			CoSoTiemChung: { displayName: 'Danh mục cơ sở tiêm chủng', checked: false },
			DichVu: { displayName: 'Danh mục dịch vụ', checked: false },
			DuongTiem: { displayName: 'Danh mục đường tiêm', checked: false },
			ThongTinKho: { displayName: 'Danh mục kho', checked: false },
			LoaiHangHoa: { displayName: 'Danh mục loại hàng hóa', checked: false },
			PhanLoaiKhachHang: { displayName: 'Danh mục loại hợp đồng', checked: false },
			LyDo: { displayName: 'Danh mục lý do', checked: false },
			NhaCungCap: { displayName: 'Danh mục nhà cung cấp', checked: false },
			PhanUngSauTiem: { displayName: 'Danh mục phản ứng sau tiêm', checked: false },
			PhongBan: { displayName: 'Danh mục phòng ban', checked: false },
			VacxinDatTruoc: { displayName: 'Danh mục Vắc xin đặt trước', checked: false },
			ViTriTiem: { displayName: 'Danh mục vị trí tiêm', checked: false },
			GoidichVu: { displayName: 'Gói tiêm dịch vụ', checked: false },
			HanMucDatVacxin: { displayName: 'Hạn mức đặt tiêm online', checked: false },
			LoaigoidichVu: { displayName: 'Loại gói tiêm dịch vụ', checked: false },
			MembershipType: { displayName: 'Loại thành viên', checked: false },
			NgayLe: { displayName: 'Ngày lễ và khung thời gian', checked: false },
			PhacDoHenTiem: { displayName: 'Phác đồ hẹn tiêm', checked: false },
			PhiDichVuTiemChung: { displayName: 'Phí tiêm chủng dịch vụ', checked: false },
			Thue: { displayName: 'Thuế', checked: false },
			HangHoa: { displayName: 'Vật tư Vacxin', checked: false },
		},
	},
	DanhSachDatTiem: { displayName: 'Danh sách đặt tiêm', checked: false },

	DichVuNangCao: {
		displayName: 'Dịch vụ nâng cao',
		checked: false,
		children: {
			ChuDongHoanThanhMuiTiemDatTruoc: {
				displayName: 'Chủ động hoàn thành mũi tiêm',
				checked: false,
			},
			HuyDatTruoc: { displayName: 'Hủy đặt trước', checked: false },
			SuaGiaDatTruoc: { displayName: 'Sửa giá đặt trước', checked: false },
		},
	},

	DangKyDatTruoc: { displayName: 'Đăng ký đặt trước Vắc xin', checked: false },

	DangKyGoi: {
		displayName: 'Đăng ký gói tiêm dịch vụ',
		checked: false,
		children: {
			Sua: { displayName: 'Sửa đăng ký gói tiêm dịch vụ', checked: false },
			SuaHSD: { displayName: 'Sửa hạn sử dụng gói đã mua', checked: false },
			BoSung: { displayName: 'Cho phép nhập bổ sung gói', checked: false },
		},
	},

	HienThiSoDuTaiKhoan: { displayName: 'Hiển thị số dư tài khoản', checked: false },
	HoaDonDienTu: { displayName: 'Hóa đơn điện tử', checked: false },
	KiemKho: { displayName: 'Kiểm kho chỉ định', checked: false },
	KhachHang: {
		displayName: 'Khách hàng',
		checked: false,
		children: {
			Edit: { displayName: 'Sửa', checked: false },
			Create: { displayName: 'Tạo mới', checked: false },
			Register: { displayName: 'Đăng ký', checked: false },
			RegisterMember: { displayName: 'Đăng ký thành viên', checked: false },
			DonTiepDoan: { displayName: 'Tiêm hợp đồng', checked: false },
			Delete: { displayName: 'Xóa', checked: false },
		},
	},

	Kham: {
		displayName: 'Khám',
		checked: false,
		children: {
			HienThiGiaNhapVXChiDinh: {
				displayName: 'Hiển thị giá nhập khi chọn dịch vụ chỉ định là hàng hóa vật tư',
				checked: false,
			},
		},
	},
	LichCongTac: { displayName: 'Lịch làm việc', checked: false },

	ManHinhGoiSo: { displayName: 'Màn Hình', checked: false },

	UserLog: { displayName: 'Nhật ký thao tác', checked: false },

	Kho: {
		displayName: 'Quản lý kho',
		checked: false,
		children: {
			PhieuLinh: {
				Create: { displayName: 'Tạo phiếu dự trù cấp phát vắc xin', checked: false },
			},
			KiemKho: { displayName: 'Tồn kho', checked: false },
			ThongKeTheKhoChiTiet: { displayName: 'Thống kê thẻ kho chi tiết', checked: false },
			XuatHuy: { displayName: 'Xuất hủy', checked: false },
			XuatKho: { displayName: 'Xuất kho', checked: false },
			DieuChuyen: { displayName: 'Xuất kho cấp phát', checked: false },
			DieuChuyenPhongTiem: { displayName: 'Xuất kho phòng tiêm', checked: false },
			XuatTraLai: { displayName: 'Xuất trả lại', checked: false },
		},
	},

	Administration: {
		displayName: 'Quản trị',
		checked: false,
		children: {
			Settings: {
				displayName: 'Cài đặt',
				checked: false,
				children: {
					Orther: { displayName: 'Cài đặt khác', checked: false },
					Admin: {
						displayName: 'Cài đặt logo, css - Quản lý người dùng - Mật khẩu bảo vệ',
						checked: false,
					},
				},
			},
			Languages: {
				displayName: 'Ngôn ngữ',
				checked: false,
				children: {
					Create: { displayName: 'Tạo ngôn ngữ mới', checked: false },
					ChangeTexts: { displayName: 'Thay đổi văn bản', checked: false },
					Delete: { displayName: 'Xóa ngôn ngữ', checked: false },
				},
			},
			Users: {
				displayName: 'Người dùng',
				checked: false,
				children: {
					Create: { displayName: 'Tạo người dùng mới', checked: false },
					ChangePermissions: { displayName: 'Thay đổi quyền truy cập', checked: false },
					Delete: { displayName: 'Xóa người dùng', checked: false },
				},
			},
			OrganizationUnits: {
				displayName: 'Đơn vị tổ chức',
				checked: false,
				children: {
					ManageOrganizationTree: { displayName: 'Quản lý cây tổ chức', checked: false },
					ManageMembers: { displayName: 'Quản lý thành viên', checked: false },
				},
			},
			AuditLogs: { displayName: 'Nhật kí', checked: false },
			Roles: {
				displayName: 'Vai trò',
				checked: false,
				children: {
					Delete: { displayName: 'Xóa vai trò', checked: false },
				},
			},
		},
	},
	SoQuyPhongTiem: { displayName: 'Sổ quỹ phòng tiêm', checked: false },
	Tiem: {
		displayName: 'Tiêm',
		checked: false,
		children: {
			TiemHuyPhieuChoTiem: { displayName: 'Hủy phiếu chờ tiêm', checked: false },
			TiemHuyPhieuDaTiem: { displayName: 'Hủy phiếu đã tiêm', checked: false },
			TiemKhamLai: { displayName: 'Khám lại', checked: false },
		},
	},
	TinNhan: {
		displayName: 'Tin Nhắn',
		checked: false,
		children: {
			MauTinNhan: { displayName: 'Mẫu tin nhắn', checked: false },
			TinNhanHenTiem: { displayName: 'Gửi tin hẹn tiêm', checked: false },
			ThongKeDichVuVAS: { displayName: 'Dịch vụ tin nhắn', checked: false },
			ThongKeLuotGuiTin: { displayName: 'Thống kê lượt gửi tin', checked: false },
			ThongKeNapTien: { displayName: 'Thống kê nạp tiền', checked: false },
		},
	},
	TheoDoi: { displayName: 'Theo dõi', checked: false },

	ThongKe: {
		displayName: 'Thống kê',
		checked: false,
		children: {
			ThongKeKhachHang: { displayName: '[Thống kê khách hàng]', checked: false },
			BaoGiaVacXin: { displayName: 'Bảng giá Vacxin', checked: false },
			BangKeChungCuoiNgay: { displayName: 'Bảng kê chung cuối ngày', checked: false },
			ThongKeGoiDichVu: {
				displayName: 'Bảng kê doanh thu gói tiêm dịch vụ',
				checked: false,
			},
			BangKeDoanhThuNgay: { displayName: 'Bảng kê doanh thu ngày', checked: false },
			ThongKeDoanhThuTheoThang: { displayName: 'Bảng kê doanh thu tháng', checked: false },
			DoanhThuVacxinDatTruoc: {
				displayName: 'Bảng kê doanh thu vắc xin đặt trước',
				checked: false,
			},
			BangKeNopNganSach: { displayName: 'Bảng kê nộp ngân sách', checked: false },
			BaoCaoChietKhau: { displayName: 'Báo cáo chiết khấu', checked: false },
			BaoCaoHoatDongPhongTiem: {
				displayName: 'Báo cáo hoạt động phòng tiêm',
				checked: false,
			},
			BaoCaoLoiNhuan: { displayName: 'Báo cáo lợi nhuận', checked: false },
			ThongTu12: { displayName: 'Thông Tư 34', checked: false },
			BaoCaoTiemNgua: { displayName: 'Báo cáo tiêm ngừa', checked: false },
			BaoCaoTongHopKeToan: { displayName: 'Báo cáo tổng hợp kế toán', checked: false },
			BaoCaoThongKeTiemDai: { displayName: 'Báo cáo thống kê tiêm dại', checked: false },
			BaoCaoTinhHinhSuDungVatTuHangHoa: {
				displayName: 'Báo cáo thống kê tình hình sử dụng vật tư/hàng hóa',
				checked: false,
			},
			BaoCaoThongKeTinhHinhTraMuiDatTruoc: {
				displayName: 'Báo cáo thống kê tình hình trả mũi đặt trước',
				checked: false,
			},
			DoiSoatThuChi: { displayName: 'Đối soát thu chi', checked: false },
			SoChiTietDoanhThu: { displayName: 'Sổ chi tiết doanh thu', checked: false },
			BienDongSoDu: { displayName: 'Thống kê biến động số dư', checked: false },
			ThongKeDanhSachHenTiem: {
				displayName: 'Thống kê danh sách hẹn tiêm',
				checked: false,
			},
			ThongKeDoanhThu: { displayName: 'Thống kê doanh thu', checked: false },
			ThongKeDoanhThuCoThue: { displayName: 'Thống kê doanh thu có thuế', checked: false },
			ThongKeDoanhThuChuoi: { displayName: 'Thống kê doanh thu chuỗi', checked: false },
			DoanhThuTheoDoiTuong: {
				displayName: 'Thống kê doanh thu theo đối tượng',
				checked: false,
			},
			DoanhThuTheoLoaiKhachHang: {
				displayName: 'Thống kê doanh thu theo loại khách hàng',
				checked: false,
			},
			DuTruVacxin: { displayName: 'Thống kê dự trù Vacxin', checked: false },
			ThongKeHoanTien: { displayName: 'Thống kê hoàn tiền', checked: false },
			ThongKeKhachHangSuDungMuiTiemChuDong: {
				displayName: 'Thống kê khách hàng sử dụng mũi tiêm chủ động',
				checked: false,
			},
			ThongKeLuotDangKyTiem: { displayName: 'Thống kê lượt đăng ký tiêm', checked: false },
			ThongKeLuotTiem: { displayName: 'Thống kê lượt tiêm', checked: false },
			ThongKeLuotTiemCovid: { displayName: 'Thống kê lượt tiêm COVID-19', checked: false },
			ThongKePhieuKham: { displayName: 'Thống kê phiếu khám', checked: false },
			ThongKeSinhNhat: { displayName: 'Thống kê sinh nhật trong tháng', checked: false },
			ThongKeTinhHinhSuDungHDDT: {
				displayName: 'Thống kê tình hình sử dụng HĐĐT',
				checked: false,
			},
			ThongKeXuatHang: { displayName: 'Thống kê xuất hàng', checked: false },
		},
	},

	ThuNgan: {
		displayName: 'Thu ngân',
		checked: false,
		children: {
			ThuNganChoPhepHuyPhieuDaThu: {
				displayName: 'Cho phép hủy phiếu đã thu',
				checked: false,
			},
			ThuNganDoiChietKhau: {
				displayName: 'Cho phép sửa chiết khấu khi thanh toán',
				checked: false,
			},
			ThuNganKhamLai: { displayName: 'Khám lại', checked: false },
		},
	},
	Dashboard: { displayName: 'Trang chủ', checked: false },
};

export default {
	Pages,
};
