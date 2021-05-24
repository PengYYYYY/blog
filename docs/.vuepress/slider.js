exports.getFontEndBar = () => {
	return [
		{
			title: 'vue',
			children: [
				'vue/lifeCycle',
				'vue/vue3',
				'vue/vue-router',
				'vue/vuex'
				// 'vue/vue-question',
			]
		},
		{
			title: 'react',
			children: [
				'react/core',
				// 'react/redux',
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
			]
		},
		{
			title: '性能优化',
			children: [
				'optimize/base',
				'optimize/engineering',
				'optimize/indicators',
			]
		},
		{
			title: '浏览器',
			children: [
				'browser/base',
				'browser/process',
				'browser/jsExecute',
			]
		},
		{
			title: 'HTML && CSS',
			children: [
				'html/html',
				'html/load',
				'html/css',
			]
		},
	]
}

exports.getBackendBar = () => {
	return [
		{
			title: 'node',
			children: [
				'node/base',
				'node/koa',
				// 'node/egg',
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
				'db/mysql',
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
			title: '工程与实践',
			children: [
				'engineering/engineering',
				'engineering/siskinImport',
				'engineering/siskinStyle',
				'engineering/unitTest',
				'engineering/buildSystem',
				'engineering/bridge',
				'engineering/mp',
				'engineering/jwt'
			]
		},
		{
			title: '框架原理',
			children: [
				'frame/vue-loader',
				'frame/ssr',
				'frame/logicReuse',
				'frame/vueProtocol'
			]
		},
		{
			title: 'javaScript',
			children: [
				'fe/inheritance',
				'fe/functional',
				'fe/eventLoop',
				'fe/mobile-adapter',
				'fe/AJAX',
			]
		},
		{
			title: '杂七杂八的',
			children: [
				'other/nat',
				'other/currentLimiting',
				'other/howComputerRun',
				'other/designMode',
				'other/threadsAndProcesses',
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
