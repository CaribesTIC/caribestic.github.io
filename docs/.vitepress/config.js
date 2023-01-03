export default {
  title: 'CaribesTIC',
  description: 'Desarrolo Web',
  base: '/',
  themeConfig: {
    logo: '/logo.png',  
    siteTitle: 'CaribesTIC',
    nav: [
      {
        text: 'Books',
        items: [
          { text: 'Kanban en Acción', link: 'https://madexblog.wordpress.com/2020/06/19/kanban-en-accion/' },
          { text: 'Metodología Ágil de Desarrollo eXtremo', link: 'https://madexblog.wordpress.com/2016/06/21/13/' }          
        ]
      },
      {
        text: 'Methodologies',
        items: [
          { text: 'eXtreme Programming', link: 'https://caribestic.github.io/xp/' },
          { text: 'Refactorizar ya?', link: 'https://caribestic.github.io/refactor-now/' },
          { text: 'Scrum', link: 'https://caribestic.github.io/scrum/' }
        ]
      },{
        text: 'Scaffolding',
        items: [
          { text: 'LaraVuel-ApiSpa', link: 'https://caribestic.github.io/laravuel-apispa/' }        
        ]
      }, {
        text: 'Tutorials',
        items: [
          { text: 'Vue-Docker', link: 'https://caribestic.github.io/vue-docker/' },        
          { text: 'Vue-Forms', link: 'https://caribestic.github.io/vue-forms/' },
          { text: 'Vue-TDD', link: 'https://caribestic.github.io/vue-tdd/' }          
        ]
      }, {
        text: 'GitHub', link: 'https://github.com/CaribesTIC/caribestic.github.io/'
      }
    ]
  }
}

