module.exports = {
	examples: {
		files: [ 'src/**/*' ],
		tasks: 'build'
	},
	sass: {
		files: [ 'src/css/**/*.scss' ],
		tasks: 'sass:main'
	}
};
