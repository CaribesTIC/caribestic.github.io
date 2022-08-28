export default {
  title: 'CaribesTIC',
  description: 'Desarrolo Web',
  base: '/',
  themeConfig: {
    logo: '/logo.png',  
    siteTitle: 'CaribesTIC',
    nav: [{
        text: 'Methodologies',
        items: [
          { text: 'eXtreme Programming', link: 'https://caribestic.github.io/xp/' },
          { text: 'Refactorizar ya?', link: 'https://caribestic.github.io/refactor-now/' }     
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

