import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('passwordRequired', {
	...required,
	message: 'Yêu cầu mật khẩu',
});

extend('fullNameRequired', {
	...required,
	message: 'Yêu cầu họ tên',
});

extend('usernameRequired', {
	...required,
	message: 'Yêu cầu tên đăng nhập',
});

extend('phoneNumberRequired', {
	...required,
	message: 'Yêu cầu số điện thoại',
});

extend('cstcRequired', {
	...required,
	message: 'Yêu cầu cơ sở tiêm chủng',
});

extend('khoRequired', {
	...required,
	message: 'Yêu cầu kho',
});

extend('notContainsSpace', {
	validate(value) {
		const notContainsSpace = new RegExp(/^\S*$/);
		return notContainsSpace.test(value);
	},
	message: 'Không chứa dấu cách',
});

extend('confirmPassword', {
	params: ['target'],
	validate(value, { target }) {
		return value === target;
	},
	message: 'Mật khẩu và xác nhận mật khẩu không khớp',
});

extend('minPasswordLength', {
	params: ['target'],
	validate(value, { target }) {
		const length = value.length;
		return length >= target || !target;
	},
	message: 'Mật khẩu tối thiểu 6 ký tự',
});

extend('confirmPasswordSignupRequired', {
	...required,
	message: 'Bắt buộc nhập xác nhận mật khẩu',
});

extend('emailSignupRequired', {
	...required,
	message: 'Email không được để trống',
});

extend('emailSignuValid', {
	...email,
	message: 'Email không hợp lệ',
});

extend('emailSignuLatinValid', {
	validate(value) {
		//check only latin characters are allowed
		const emailSignuLatinValid = new RegExp(/^[a-zA-Z0-9.]+(?!-.)@[a-zA-Z0-9.-]+$/);

		return emailSignuLatinValid.test(value);
	},
	message: 'Email không hợp lệ',
});
