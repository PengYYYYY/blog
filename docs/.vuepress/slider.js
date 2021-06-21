exports.getFontEndBar = () => {
	return [
		{
			title: 'vue',
			children: [
				'vue/core',
				'vue/vue3',
				'vue/reactive',
				'vue/vue-router',
				'vue/vuex',
				'vue/vue-question',
				'vue/vite',
			]
		},
		{
			title: 'react',
			children: [
				'react/core',
				'react/redux',
				'react/router',
				'react/question',
			]
		},
		{
			title: '框架对比',
			children: [
				// 'architecture/contrast工程化思考',
				'architecture/lifeCycle',
				'architecture/data',
				'architecture/diff',
				'architecture/component',
				'architecture/event',
				// 'architecture/render',
				'architecture/state',
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
				'engineering/monitoring',
			]
		},
		{
			title: '性能优化',
			children: [
				'optimize/overview',
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
		'security',
		'http',
		'httpCode',
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
		'mind',
		'linkedList',
		'tree',
		'sort',
		'binarySearch',
		'doublePointer',
		'dynamicPlan',
		'grammar',
		'complexity'
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
			title: '面试题',
			children: [
				
			]
		}
	]
}
