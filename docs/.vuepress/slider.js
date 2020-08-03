exports.getFontEndBar = (title) => {
	return [{
		title: title,
		collapsable: false,
		children: [
			'js',
			'html',
			'css',
			'browser',
			'babel',
			'webpack',
			'vue',
			'react',
			'optimize',
			'array',
			'string',
		]
	}]
}

exports.getNodeBar = (title) => {
	return [{
		title: title,
		collapsable: false,
		children: [
			'egg',
		]
	}]
}

exports.getNetWorkBar = (title) => {
	return [{
		title: title,
		collapsable: false,
		children: [
			'',
		]
	}]
}

exports.getInterestBar = (title) => {
	return [{
		title: title,
		collapsable: false,
		children: [
			'computerOrganization',
		]
	}]
}

exports.getAlgorithmBar = (title) => {
	return [{
		title: title,
		collapsable: false,
		children: [
			'dataStructure',
			'skills',
			'search',
			'sort',
			'complexity',
		]
	}]
}

exports.getArticles = (title) => {
	return [{
		title: title,
		collapsable: false,
		children: [
			'vueSkill'
		]
	}]
}
