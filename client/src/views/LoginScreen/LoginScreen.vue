<script src="./LoginScreen.js"></script>
<style src="./LoginScreen.css" scoped></style>

<template>
	<div class="container container__login">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="card card__login">
					<div class="card-header card-header__login">Đăng nhập</div>
					<div class="card-body">
						<form>
							<div class="form-group">
								<label for="email">Tên đăng nhập hoặc email</label>
								<input
									type="text"
									v-model="emailOrUsername"
									class="form-control"
									id="email"
									aria-describedby="emailHelp"
									placeholder="Tên đăng nhập"
								/>
							</div>
							<div class="form-group">
								<label for="password">Mật Khẩu</label>
								<input
									v-model="password"
									type="password"
									class="form-control"
									id="password"
									placeholder="Mật khẩu"
									autocomplete="off"
								/>
							</div>
							<b-button size="lg" variant="success" @click.prevent="submit">Đăng Nhập</b-button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
