---
title: 碧蓝航线Live2D - 绫波 | 重樱驱逐舰
description: 碧蓝航线绫波Live2D预览，性格内向但实力强大的鬼神，重樱驱逐舰的代表。
keywords: 碧蓝航线, Live2D, 绫波, 重樱驱逐舰, Ayanami, Azur Lane
head:
  - - meta
    - name: keywords
      content: 碧蓝航线, Live2D, 绫波, 重樱驱逐舰, Ayanami, Azur Lane
---



<script setup>
import Live2DViewer from './.vitepress/theme/Live2DViewer.vue'
import { ref,computed } from 'vue'
import { charData,charDataNames,charDataIds } from './.vitepress/theme/charData'
const characterData = ref(charData)
</script>

<Live2DViewer :char-data="characterData" :live2dmodel="charDataIds[21]"/>