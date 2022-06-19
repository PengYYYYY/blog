# CompositionAPI 组件开发范式

## 代码组织

每个贡献者的代码风格都是不同的，在认同 `CompositionAPI` 理念的情况下。我们希望能够有较为标准的代码组织结构。让整体的代码保持一个大概的代码块风格，组件的维护会更加清晰，避免代码的堆积。

### 合理的拆分

以 `upload` 组件为例，代码块应该是分层设计的。第一步先进行合理的组件拆分，拆分的原则：

1. 按表现类型拆分出子组件：`upload` 组件存在多种表现类型，因此会衍生出4个子组件：`Dragger`、`ImageCard`、`FlowList`、`SingleFile`
2. 按不同的逻辑处理, 内聚出不同的 `hook` 与表现层代码挂钩：`useComponentsStatus`, `useImgPreview`, `useRemove`, `useDragger`, `useActions`。

### 组件状态管理

1. 组件参数状态，[双向绑定语法糖，受控，非受控](https://github.com/Tencent/tdesign-vue-next/wiki/%E4%BD%BF%E7%94%A8-CompositionAPI-%E5%BC%80%E5%8F%91-TDesign-%E7%BB%84%E4%BB%B6#%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E8%AF%AD%E6%B3%95%E7%B3%96%E5%8F%97%E6%8E%A7%E9%9D%9E%E5%8F%97%E6%8E%A7)
2. 一个组件内置状态的上下文，集中管理组件内置的状态。散落在各个代码块的内部变量难以维护。这样会很清晰的知道组件的内置状态存在哪些。这一部分的代码可以通过 `provider` 向子组件注入，也可以使用 `context` 向子组件传递。

### 注意事项

- 类似这种简短计算的代码必要性不是很强

```js
const isSingle = computed(() => props.theme === 'single')
```

- 组件事件简化，因为 `TD` 的 `API` 在多个框架下使用，会融合一些 `react API` 的设计,在事件方面 `XXX evnt` 通常会伴随一个 `onXXX` 的函数参数,[组件事件](https://github.com/Tencent/tdesign-vue-next/wiki/TDesign--CompositionAPI-%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83#%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6)

- 在 `options API` 中，`methods` 可以直接暴露出去，不需要 `expose`，而 `setup` 中，需要按需 `expose` 相关函数。

- 注意逻辑的拆分，不要写长篇代码。做到高内聚，低耦合。

### 组件代码示例

```js
import { defineComponent } from 'vue';
import { TdUploadProps } from './type'; // 标准的type文件
import props from './props'; // 标准的props文件
import { xxx } from './interface' // 如果需要自定义一些 `interface`, 则统一放到 `interface` 文件当中

// 子组件
import Dragger from './dragger';
import ImageCard from './image';
import FlowList from './flow-list';
import SingleFile from './single-file';

// hooks
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig'; // 全局的config配置, classPrefix, commonClass
import useVModel from '../hooks/useVModel'; // 语法糖与受控处理
import { useLogicHook } from './hook'; // 纯逻辑代码的组件内部hook，按逻辑区分，方便后续的维护

export default defineComponent({
  name: "TUpload",
  props,
  setup(props: TdUploadProps) {
    const { classPrefix: prefix, global } = useConfig('upload');
    const COMPONENT_NAME = usePrefixClass('upload');
    const { STATUS } = useCommonClassName();

    const { files, modelValue } = toRefs(props);
    // `files` 的更新统一使用 `setUploadValue`
    const [uploadValue, setUploadValue] = useVModel(
      files,
      modelValue,
      props.defaultFiles || [],
      props.onChange,
    );

    // 组件上下文，集中管理组件内置的状态
    const uploadCtx: UploadCtxType = reactive({
      uploadValue,
      setUploadValue,
      loadingFile: null, // 加载中的文件
      toUploadFiles: [], // 等待上传的文件队列
      errorMsg: '',
    });


    // 逻辑层 `hook` 导出表现层需要的变量, 相关的effect函数。
    const { logicVar, logicHandler } = useLogicHook(props, uploadCtx)
    
    // 表现层 `render` 函数, 按模块拆分，避免主 `render` 函数内容过多。
    const renderContent = () => {
      <div class={[COMPONENT_NAME.value, {
         STATUS.disabled: props.disabled
       }]} onClick={logicHandler}>
        {logicVar}
      </div>
    }

    // 可以直接在setup返回render函数，不需要再单独写 `render` 函数。同时 `setup render` 函数里面也有很完整的类型支持。需要对外暴露的方法可以使用 `ctx.expose`
    return () => (
      <div>{renderContent()}</div>
    )
  },
})
```

## TNode渲染

[TNode 介绍](https://github.com/Tencent/tdesign-vue-next/wiki/%E4%B8%A4%E7%A7%8D-renderTNode-%E5%87%BD%E6%95%B0%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)

为 `TNode` 的 `API` 中，需要使用 `useTNodeJSX` 得到渲染函数进行渲染，函数内会处理好 `props` `function props` 与插槽的关系。

```js
import { useTNodeJSX } from '../hooks/tnode';

defineComponent({
  setup() {
    const renderTNode = useTNodeJSX();
    const renderChild = () => {
      return renderTNode('default')
    }
    return () => (
      <div>
        // 两种写法
        {renderTNode('TNodeName', options)}
        {renderChild()}
      </div>
    )
  },
})

```

## 组件库配置项

统一使用 `useConfig`, `useConfig` 会导出 `global`, `classPrefix`, `t`。

在很多情况下你可能只需要导出一个带prefix的类名，你可以使用 `usePrefixClass`。

```js
const COMPONENT_NAME = usePrefixClass('componentName');

// 也可以只得到一个classPrefix
const classPrefix = usePrefixClass();
```

`commonClass` 集合了一些公用的 `class`。分为 `SIZE` 和 `STATUS`。

```js
const { SIZE, STATUS } = useCommonClassName()
```

`ConfigReceiverMixins` 会被废弃。

## 双向绑定语法糖，受控，非受控

逐渐放弃使用高阶函数 `mapProps`。实现 `v-model` 使用 `useVModel`, 实现 `v-model:xx` 使用 `useDefaultValue`。这两个 `hook` 在内部会处理好受控与非受控，组件内部使用暴露出来的值即可，同时对外的参数更新也需要使用暴露出的函数进行更新。

### useVModel

用于实现主参数的双向绑定 `v-model`，受控与非受控

```js
import useVModel from '../hooks/useVModel';

const { value, modelValue } = toRefs(props)
const [innerValue, setInnerValue] = useVModel(
  value,
  modelValue,
  props.defaultValue,
  props.onChange,
  'propsName' // 可选参数，用于类似 `files` 这种别名主双向绑定参数的处理
);
```

### useDefaultValue

用于实现辅助参数的双向绑定`v-model:visible`，受控与非受控

```js
import useDefaultValue from '../hooks/useDefaultValue';

const { visible } = toRefs(props)
const [innerVisible, setInnerVisible] = useDefaultValue(
  visible,
  props.defaultVisible,
  props.onVisibleChange,
  'visible',
);
```

## 组件事件

在 `TDesign vue` 中事件都会存在 `onXXX` 的 `props` 函数，可以通过 `props.onXXX` 的方法进行处理。对于 `props` 中定义了的事件不需要再调用 `emit('xxx')`.

```js
// props
{
  onChange?: (...args) => {};
}

// tsx
setup(props) {
  props.onChange?.(args)
}
```

## Provide与inject

1. 合理使用 `Provide` 与 `inject`，按需 `provide`，避免 `children` 调用 `$parent` 这类代码.
2. 合理的 `InjectionKey`，需要注意 `InjectionKey` 的导出位置，避免循环引用。

```js
import { InjectionKey } from 'vue';

const CheckboxGroupInjectionKey: InjectionKey<{
  name: string;
  componentProps: string,
  xxxProvideProps: string,
}> = Symbol('componentName');
```
