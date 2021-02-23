exports.getFontEndBar = () => {
	return [
		{
			title: 'Javascript',
			children: [
				'js/js',
				'js/typeScript',
				'js/array',
				'js/string',
				'js/storage',
				'js/handwritten'
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
				'engineering/optimize',
			]
		},
		{
			title: '浏览器',
			children: [
				'browser/base',
			]
		},
		'html',
		'css',
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
				'fe/mobileAdapter',
			]
		},
		{
			title: 'vue',
			children: [
				'vue/vueProtocol',
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
				'other/howComputerRun'
			]
		},
		{
			title: '工程与实践',
			children: [
				'engineering/buildSystem',
				'engineering/componentLibrary'
			]
		},
		{
			title: '杂物与思考',
			children: [
				'clutter/24岁的程序员',
			]
		},
	]
}
