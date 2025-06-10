---
title:  碧蓝航线Live2D- 吸血鬼 | 皇家驱逐舰
description: 碧蓝航线吸血鬼Live2D预览，可爱的小吸血鬼少女，皇家驱逐舰的代表。
keywords: 碧蓝航线, Live2D, 吸血鬼, 皇家驱逐舰, Vampire, Azur Lane
head:
  - - meta
    - name: keywords
      content: 碧蓝航线, Live2D, 吸血鬼, 皇家驱逐舰, Vampire, Azur Lane
---


<script setup>
import Live2DViewer from './.vitepress/theme/Live2DViewer.vue'
import { ref,computed } from 'vue'
import { charData,charDataNames,charDataIds } from './.vitepress/theme/charData'
const characterData = ref(charData)
</script>

<Live2DViewer :char-data="characterData" :live2dmodel="charDataIds[38]"/>