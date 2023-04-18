import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'CaribesTIC',
  description: 'Desarrolo Web',
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',  
    siteTitle: 'CaribesTIC',
nav: [
      {
        text: 'Books',
        items: [
          { text: 'Kanban en Acción', link: 'https://madexblog.wordpress.com/2020/06/19/kanban-en-accion/' },
          { text: 'Metodología Ágil de Desarrollo eXtremo', link: 'https://madexblog.wordpress.com/2016/06/21/13/' }          
        ]
      }, {
        text: 'Methodologies',
        items: [
          { text: 'eXtreme Programming', link: 'https://caribestic.github.io/xp/' },
          { text: 'Refactorizar ya?', link: 'https://caribestic.github.io/refactor-now/' },
          { text: 'Scrum', link: 'https://caribestic.github.io/scrum/' }
        ]
      },{
        text: 'Scaffolding',
        items: [
          { text: 'LaraVuel-ApiSpa', link: 'https://caribestic.github.io/laravuel-apispa/' },
          { text: 'ShopCart-Nuxt', link: 'https://caribestic.github.io/shopcart/' }      
        ]
      }, {
        text: 'Tutorials',
        items: [
          { text: 'Laravel-Docker', link: 'https://caribestic.github.io/laravel-docker/' },
          { text: 'Patrones Probados de Pinia', link: 'https://caribestic.github.io/proven-pinia-patterns/' },
          { text: 'Vue-Docker', link: 'https://caribestic.github.io/vue-docker/' },        
          { text: 'Vue-Forms', link: 'https://caribestic.github.io/vue-forms/' },
          { text: 'Vue-TDD', link: 'https://caribestic.github.io/vue-tdd/' }          
        ]
      }, {
        text: 'Caciques', link: 'https://caribestic.github.io/caciques/'
      },
    ],    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CaribesTIC/caribestic.github.io/' }
    ]
  }
})
