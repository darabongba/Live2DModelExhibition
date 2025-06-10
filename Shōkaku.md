---
title: Shōkaku
---



<script setup>
import Live2DViewer from './.vitepress/theme/Live2DViewer.vue'
import { ref,computed } from 'vue'
import { charData,charDataNames,charDataIds } from './.vitepress/theme/charData'
const characterData = ref(charData)
</script>

<Live2DViewer :char-data="characterData" :live2dmodel="charDataIds[37]"/>