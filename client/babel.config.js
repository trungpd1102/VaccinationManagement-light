const plugins = process.env.VUE_APP_MODE === 'PRODUCTION' ? ['transform-remove-console'] : [];

module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	plugins: plugins,
};
