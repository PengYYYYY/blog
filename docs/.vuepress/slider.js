exports.getFontEndBar = () => {
	return [
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
				// 'react/question',
			]
		},
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
			title: '工程化',
			children: [
				'engineering/webpackBase',
				'engineering/webpackAdvance',
				'engineering/npm',
				'engineering/modular',
				'engineering/babel',
				'engineering/optimize'
			]
		},
		{
			title: '浏览器',
			children: [
				'browser/base',
				'browser/process',
			]
		},
		{
			title: 'HTML',
			children: [
				'html/html',
				'html/load',
			]
		},
		'mp',
		'css'
	]
}

exports.getBackendBar = () => {
	return [
		{
			title: 'node',
			children: [
				// 'node/egg',
				// 'node/base',
				'node/koa',
			]
		},
		{
			title: 'devops',
			children: [
				'devops/git-flow',
				'devops/docker',
				'devops/nginx',
			]
		},
		{
			title: 'db',
			children: [
				// 'db/mysql',
				'db/redis',
			]
		},
	]
}

exports.getNetWorkBar = () => {
	return [
		'connectionProcess',
		'crossDomain',
		'httpCode',
		'security',
		'http',
		'https',
		'http-next',
		'cache',
		'network-question'
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
			title: 'vue',
			children: [
				'vue/vue-loader',
				'vue/ssr',
				'vue/vueProtocol'
			]
		},
		{
			title: 'javaScript',
			children: [
				'fe/inheritance',
				'fe/functional',
				'fe/eventLoop',
				'fe/mobile-adapter',
				'engineering/jwt'
			]
		},
		{
			title: '工程与实践',
			children: [
				'engineering/engineering',
				'engineering/siskinImport',
				'engineering/siskinStyle',
				'engineering/unitTest',
				'engineering/buildSystem',
				'engineering/bridge',
			]
		},
		{
			title: '杂七杂八的',
			children: [
				'other/AJAX',
				'other/nat',
				'other/howComputerRun',
				'other/designMode',
				'other/threadsAndProcesses',
				'other/currentLimiting',
			]
		},
		{
			title: '个人思考',
			children: [
				'clutter/24岁的程序员',
				'clutter/心态',
			]
		},
	]
}
