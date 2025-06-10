import { defineConfig } from 'vitepress'
import {charDataNames } from './theme/charData'
export default defineConfig({
  title: "Affordable Stylish Live2D animation Online",
  description: "Collect awesome Live2D Models including anime,game,movie,etc.Find your favorite one today!",
  themeConfig: {
    // nav: [  
    //   ...charDataNames.map((charName) => {
    //     return { text: charName, link: charName==='irius (MidsSummer Seirios)'?'/':`/${charName}` }
    //   })
    // ],
    sidebar: [
      {
        text: 'Directory',
        items: [
          ...charDataNames.map((charName) => {
            return { text: charName, link: charName==='Sirius (Midsummer Seirios)'?'/':`/${charName}` }
          })
        ]
      }
    ]
  }
})