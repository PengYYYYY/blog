# 组件单元测试

做组件库的时候，老板要求写单元测试，于是就整起了。

## 为什么要做单元测试

- 提供描述组件行为的文档（看开源项目可以从单元测试看起）
- 节省手动测试的时间
- 有利于平稳升级
- 改进组件设计
- 有助于代码重用

## 单元测试主要类型

- 展示型业务组件
- 功能型组件

### 展示型测试

- class 类的判断
- 样式的判读（如颜色，位置等）

### 功能型测试

- Props传入
- 组件分支渲染逻辑
- 事件调用和参数传递

## 单元测试的局限和问题

- 测试逻辑基本没什么问题，但是UI呈现上还得人肉测试。
- 编写麻烦，可能组件写10分钟，单元测试得写20分钟，增加了开发成本。

所以单元测试在业务需求中基本上不会有，主要应用在编写代码库中。

## 测试覆盖率

测试覆盖率则是衡量测试完整性的一种手段：通过已执行代码的覆盖率，用于评测代码的可靠性和稳定性，可以及时发现没有被测试用例执行到的代码块，提前发现可能的逻辑错误。

伊斯坦布尔（以下简称 Istanbul）是一个基于 JavaScript 的测试覆盖率统计工具，目前绝大多数测试框架比如 jest mocha 等都是使用 Istanbul 来统计覆盖率的。

覆盖率维度:

- Statements: 语句覆盖率，所有语句的执行率；
- Branches: 分支覆盖率，所有代码分支如 if、三目运算的执行率；
- Functions: 函数覆盖率，所有函数的被调用率；
- Lines: 行覆盖率，所有有效代码行的执行率，和语句类似，但是计算方式略有差别；

## 实践

使用到的库

```js
@vue/test-utils, @vue/server-test-utils, jest, jest-html-reporter, jest-serializer-vue, vue-jest, sinon, sinon-chai
```

```js
// jest.config.js
module.exports = {
    setupFiles: ['<rootDir>/test/jest.init.js'],
    moduleFileExtensions: ['js', 'vue', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    testEnvironment: 'jsdom',
    modulePaths: [
        '<rootDir>/src',
        '<rootDir>/node_modules'
    ],
    moduleNameMapper: {
        'siskin': `<rootDir>/src/index`
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testURL: 'http://localhost/',
    collectCoverage: true,
    coverageDirectory: '<rootDir>/test/coverage',
    coverageReporters: ['html', 'lcov', 'text-summary'],
    testPathIgnorePatterns: ['<rootDir>/build', '<rootDir>/test/e2e'],
    collectCoverageFrom: ['packages/*/*.{js,vue}'],
    coverageThreshold: {
        'global': {
            'branches': 90,
            'functions': 95,
            'lines': 95,
            'statements': 95
        }
    },
    reporters: [
        'default',
        [
            '<rootDir>/node_modules/jest-html-reporter',
            {
                pageTitle: 'tc-siskin-test',
                includeFailureMsg: true,
                outputPath: '<rootDir>/test/test-report.html',
                includeConsoleLog: true
            }
        ]
    ]
}
```

配置参数：

- setupFiles:初始化文件
- moduleFileExtensions: 文件类型
- transform：文件转换配置
- testEnvironment：测试环境
- moduleNameMapper: 测试包名
- snapshotSerializers：快照配置（通过快照可以对比前后的dom节点变化）
- collectCoverage：测试覆盖率相关配置
- reporters：测试报告

```js
// jest.init.js
import Vue from 'vue'
import pkg from '../package.json'

Vue.config.silent = true

global.MAN_VERSION = pkg.version

```

### 一个InputNumber组件的单元测试编写

```js
import sinon from 'sinon'
import {
    mount
} from '@vue/test-utils'
import {
    InputNumber
} from 'tc-flight-siskin'

describe('InputNumber-Operation', () => {
    afterEach(() => {
        wrapper && wrapper.destroy()
    })
    let wrapper
    test('InputNumber default', () => {
        let value = 0
        wrapper = mount(InputNumber, {
            propsData: {
                value,
            },
            listeners: {
                input(val) {
                    value = val
                    wrapper.setProps({
                        value
                    })
                }
            }
        })
        const eventSpy = sinon.spy(wrapper.vm, '$emit')
        const InputNumberMinus = wrapper.find('.sis-input-number-minus')
        const InputNumberPlus = wrapper.find('.sis-input-number-plus')
        
        expect(wrapper.props().min).toBe(0)
        expect(wrapper.props().max).toBe(99)

        InputNumberMinus.trigger('click')
        expect(eventSpy.calledWith('input')).toBe(false)
        expect(value).toBe(0)
        InputNumberPlus.trigger('click')
        expect(eventSpy.calledWith('input')).toBe(true)
        expect(value).toBe(1)
        InputNumberMinus.trigger('click')
        expect(value).toBe(0)

        eventSpy.resetHistory()
        InputNumberMinus.trigger('click')
        expect(eventSpy.calledWith('input')).toBe(false)
        expect(value).toBe(0)
    })

    test('InputNumber with range', () => {
        let value = 8
        wrapper = mount(InputNumber, {
            propsData: {
                value,
                max: 5
            },
            listeners: {
                input(val) {
                    value = val
                    wrapper.setProps({
                        value
                    })
                }
            }
        })
        const eventSpy = sinon.spy(wrapper.vm, '$emit')
        const InputNumberMinus = wrapper.find('.sis-input-number-minus')
        InputNumberMinus.trigger('click')
        expect(eventSpy.calledWith('input')).toBe(true)
        expect(value).toBe(7)
    })

    test('InputNumber with range', () => {
        let value = 0
        wrapper = mount(InputNumber, {
            propsData: {
                value,
                min: 2
            },
            listeners: {
                input(val) {
                    value = val
                    wrapper.setProps({
                        value
                    })
                }
            }
        })
        const eventSpy = sinon.spy(wrapper.vm, '$emit')
        const InputNumberPlus = wrapper.find('.sis-input-number-plus')
        InputNumberPlus.trigger('click')
        expect(eventSpy.calledWith('input')).toBe(true)
        expect(value).toBe(1)
    })
})
```

### 公共函数的单元测试代码

级联选择器的一些公共方法，通过单元测试可以很快知道这几个方法的用途。

```js
// picker.js
import {
 cascadeDataToNormalDataWithDefault,
 cascadeDataToNormalData,
 getDefaultVal,
 getDefaultDateVal,
 getunitdaymark
} from '../picker'
import {
 padStart
} from '../index'

const nomalData = [
 ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
 ['a', 'b', 'c', 'd', 'e', 'f', 'g']
]
const cascadeData = [
 {
   value: 'A',
   children: [
     { value: 'A-a' },
     { value: 'A-b' },
     { value: 'A-c' }
   ]
 },
 {
   value: 'B',
   children: [
     { value: 'B-a' },
     { value: 'B-b' }
   ]
 },
]
const date = new Date('2020-03-01 11:11:11')

describe('utils-test', () => {
 describe('cascadeDataToNormalData', () => {
  test("base", () => {
   expect(cascadeDataToNormalData(cascadeData)).toEqual([["A", "B"], ["A-a", "A-b", "A-c"]])
  })
 })
 describe('cascadeDataToNormalData', () => {
  test("base", () => {
   expect(cascadeDataToNormalDataWithDefault(cascadeData, [0, 0])).toEqual([["A", "B"], ["A-a", "A-b", "A-c"]])
  })
 })

 describe('getDefaultVal', () => {
  test("base", () => {
  expect(getDefaultVal(nomalData, [{value:'A'},{value:'d'}])).toEqual([0, 3])
  })
 })

 describe('getDefaultDateVal', () => {
  test("date", () => {
   expect(getDefaultDateVal('date', date)).toEqual([
     { value: '2020年' },
     { value: '3月' },
     { value: '1日' }
    ])
  })

  test("date-time", () => {
   expect(getDefaultDateVal('date-time', date)).toEqual([
    { value: '3月1日' },
    { value: '11点' },
    { value: '11分' }
   ])
  }),

  test("time", () => {
   expect(getDefaultDateVal('time', date)).toEqual([
    { value: '11时' },
    { value: '11分' },
    { value: '11秒' }
   ])
  })

  
  test("time", () => {
   const now = new Date()
   expect(getDefaultDateVal('time')).toEqual([
    { value: `${padStart(now.getHours(), 2)}时` },
    { value: `${padStart(now.getMinutes(), 2)}分` },
    { value: `${padStart(now.getSeconds(), 2)}秒` }
   ])
  })

 })

 describe('getunitdaymark', () => {
  test("base", () => {
   expect(getunitdaymark(new Date())).toBe("今天")
   expect(getunitdaymark(new Date(new Date().getTime() - 24 * 60 * 60 * 1000))).toBe("昨天")
   expect(getunitdaymark(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))).toBe("明天")
  })
 })
})
```

### 结果

> 覆盖率报告

![img](../images/riM06e.png)

> 测试报告

![img](../images/R7TxH8.png)

## 结论

写单元测试还是蛮有意义的，一开始可能会觉得没什么意思很无聊，但是他确实可以站在工程的角度上来审视你写的代码。让你的代码更加严谨规范，在提一些开源项目的PR的时候，通常都需要写单元测试，来保证你代码的质量。
