---
title: 碧蓝航线Live2D模型预览 | 舰娘Live2D展示
description: 碧蓝航线Live2D模型预览网站，收录多个舰娘的Live2D模型，支持互动预览和动作切换。
keywords: 碧蓝航线, Live2D, 舰娘, 模型预览, Azur Lane, Live2D模型
head:
  - - meta
    - name: keywords
      content: 碧蓝航线, Live2D, 舰娘, 模型预览, Azur Lane, Live2D模型
---


{{charDataNames[0]}}
<script setup>
import Live2DViewer from './.vitepress/theme/Live2DViewer.vue'
import { ref,computed } from 'vue'
import { charData,charDataNames,charDataIds } from './.vitepress/theme/charData'
const characterData = ref(charData)
</script>

 <Live2DViewer :char-data="characterData" :live2dmodel="charDataIds[0]"/>