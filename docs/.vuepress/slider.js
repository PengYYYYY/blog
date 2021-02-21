exports.getFontEndBar = () => {
	return [
		{
			title: 'javascript',
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
				'vue/vue-question',
				'vue/vue-router',
				'vue/vuex'
			]
		},
		{
			title: 'react',
			children: [
				'react/LogicReuse',
				'react/question',
			]
		},
		{
			title: '工程化',
			children: [
				'engineering/npm',
				'engineering/webpack',
				'engineering/modular',
				'engineering/babel',
				'engineering/unitTest',
			]
		},
		'html',
		'css',
		'browser',
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
		'connectionProcess',
		'cache',
		'crossDomain',
		'httpCode',
		'security',
		'https'
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
		'linkedList',
		'framework',
		'tree',
		'mind',
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
				'fe/eventLoop',
				'fe/mobileadapter',
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
		{
			title: '工程与实践',
			children: [
				'engineering/build-system',
			]
		},
	]
}
