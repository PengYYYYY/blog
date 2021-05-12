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
				// 'react/question',
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
			title: '前端',
			children: [
				'fe/inheritance',
				'fe/functional',
				'fe/eventLoop',
				'fe/mobile-adapter'
			]
		},
		{
			title: 'vue',
			children: [
				'vue/vueProtocol',
				'vue/ssr',
				'vue/vue-loader'
			]
		},
		{
			title: '工程与实践',
			children: [
				'engineering/siskinImport',
				'engineering/siskinStyle',
				'engineering/buildSystem',
				'engineering/unitTest',
				'engineering/jwt'
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
			title: '杂物与思考',
			children: [
				'clutter/24岁的程序员',
				'clutter/engineering',
			]
		},
	]
}
