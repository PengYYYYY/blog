exports.getFontEndBar = () => {
	return [
		{
			title: 'js',
			children: [
				'js/js',
				'js/typeScript',
				'js/array',
				'js/string',
			]
		},
		{
			title: 'vue',
			children: [
				'vue/vue',
				'vue/vue3',
			]
		},
		{
			title: 'react',
			children: [
				'react/react',
			]
		},
		{
			title: 'webpack',
			children: [
				'webpack/webpack',
			]
		},
		'html',
		'css',
		'browser',
		'babel',
		'optimize',
	]
}

exports.getNodeBar = () => {
	return [
		'egg',
	]
}

exports.getNetWorkBar = () => {
	return [
		'link',
		'cache',
	]
}

exports.getOthersBar = () => {
	return [
		'computerOrganization',
	]
}

exports.getAlgorithmBar = () => {
	return [
		'dataStructure',
		'tree',
		'skills',
		'search',
		'sort',
		'complexity',
	]
}

exports.getArticlesBar = () => {
	return [
		{
			title: '前端',
			children: [
				'fe/inheritance',
				'fe/functional',
				'fe/eventLoop'
			]
		},
		{
			title: 'vue',
			children: [
				'vue/vue-protocol',
				'vue/ssr',
				'vue/simple-vue',
				'vue/vue-loader'
			]
		},
		'mobileadapter',
		{
			title: '兴趣',
			children: [
				'other/nat',
				'other/db',
				'other/howComputerRun',
				'other/flutter',
				'other/react-native',
				'other/docker',
				'other/cicd',
				'other/setUpPlatform',
			]
		},
	]
}
