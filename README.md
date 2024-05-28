# vite-vue-preview 

## Features

## Requirements

Check example to setup your vite project


## Getting Started

First, create a new vite project

```bash
yarn create vite
cd project
yarn
```

Now we need to add some dependencies

```bash
yarn add vite-plugin-vue-component-preview unplugin-vue-markdown
```

Edit `vite.config.ts`

```diff
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
+ import Preview from 'vite-plugin-vue-component-preview';
+ import Markdown from 'unplugin-vue-markdown/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
+    Markdown({ /* options */ }),
+    // Depending on your project setup you might want to call  Preview.default()
+    Preview(),
    vue()
  ],
})
```

Edit `main.ts`

```diff
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
+import Preview from 'vite-plugin-vue-component-preview/client';

-createApp(App).mount('#app')
+const app = createApp(App);
+app.use(Preview);
+app.mount('#app');

```

Edit this plugin configuration so that it matches vite's port/host and you are ready to code !

### First component preview

To generate a live reload preview bloc append this bloc at the end of HelloWord.vue component

```diff 
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

+ <preview lang="md">
+   ## My component
+   
+   Some markdown documentation
+ 
+   
+   __example__
+   <script setup lang="ts">
+   import HelloWord from "./HelloWord.vue"
+   const props = [
+     {msg: "Vite preview"},
+   ]
+   </script>
+ 
+   <template v-for="prop in props">
+       <HelloWord :msg="prop.msg" />
+   </template>
+ </preview>
```

## TODO

- Use vite.config.ts relative path instead of workspace based paths

## Build

```bash
yarn compile
yarn dlx @vscode/vsce package --no-yarn
```