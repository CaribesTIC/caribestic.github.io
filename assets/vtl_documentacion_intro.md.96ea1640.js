import{_ as e,c as a,o as r,a as n}from"./app.8171c9f3.js";const h='{"title":"\xBFQu\xE9 es Test Library?","description":"","frontmatter":{},"headers":[{"level":2,"title":"Introducci\xF3n","slug":"introduccion"},{"level":2,"title":"El problema","slug":"el-problema"},{"level":2,"title":"La soluci\xF3n","slug":"la-solucion"},{"level":2,"title":"Lo que esta biblioteca no es","slug":"lo-que-esta-biblioteca-no-es"},{"level":2,"title":"Lo que debes evitar con Testing Library","slug":"lo-que-debes-evitar-con-testing-library"}],"relativePath":"vtl/documentacion/intro.md"}',o={},t=n('<h1 id="\xBFque-es-test-library" tabindex="-1">\xBFQu\xE9 es Test Library? <a class="header-anchor" href="#\xBFque-es-test-library" aria-hidden="true">#</a></h1><h2 id="introduccion" tabindex="-1">Introducci\xF3n <a class="header-anchor" href="#introduccion" aria-hidden="true">#</a></h2><p>La familia de paquetes <a href="https://www.npmjs.com/org/testing-library" target="_blank" rel="noopener noreferrer"><code>@testing-library</code></a> lo ayuda a probar los componentes de la interfaz de usuario de una manera centrada en el usuario.</p><blockquote><p><a href="./guias-de-principios.html">Cuanto m\xE1s se parezcan sus pruebas a la forma en que se usa su software, m\xE1s confianza le pueden brindar.</a></p></blockquote><h2 id="el-problema" tabindex="-1">El problema <a class="header-anchor" href="#el-problema" aria-hidden="true">#</a></h2><p>Desea escribir pruebas mantenibles que le brinden una alta confianza de que sus componentes funcionan para sus usuarios. Como parte de este objetivo, desea que sus pruebas eviten incluir detalles de implementaci\xF3n para que las refactorizaciones de sus componentes (cambios en la implementaci\xF3n pero no en la funcionalidad) no interrumpan sus pruebas y lo ralenticen a usted y a su equipo.</p><h2 id="la-solucion" tabindex="-1">La soluci\xF3n <a class="header-anchor" href="#la-solucion" aria-hidden="true">#</a></h2><p>La biblioteca central, <code>DOM Testing Library</code>, es una soluci\xF3n liviana para probar p\xE1ginas web consultando e interactuando con nodos DOM (ya sea simulados con <a href="https://github.com/jsdom/jsdom" target="_blank" rel="noopener noreferrer"><code>JSDOM</code></a><code>/</code><a href="https://vitest.dev/" target="_blank" rel="noopener noreferrer"><code>Vitest</code></a> o en el navegador). Las principales utilidades que proporciona implican consultar el DOM en busca de nodos de una manera similar a c\xF3mo el usuario encuentra elementos en la p\xE1gina. De esta manera, la biblioteca ayuda a garantizar que sus pruebas le den la confianza de que su aplicaci\xF3n funcionar\xE1 cuando la use un usuario real.</p><p>La biblioteca central se ha envuelto para proporcionar API ergon\xF3micas para varios marcos, incluidos <a href="https://testing-library.com/docs/react-testing-library/intro/" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://testing-library.com/docs/angular-testing-library/intro/" target="_blank" rel="noopener noreferrer">Angular</a> y <a href="https://testing-library.com/docs/vue-testing-library/intro/" target="_blank" rel="noopener noreferrer">Vue</a>. Tambi\xE9n hay un complemento para usar consultas de biblioteca de prueba para pruebas de extremo a extremo en <a href="https://testing-library.com/docs/cypress-testing-library/intro/" target="_blank" rel="noopener noreferrer">Cypress</a> y una implementaci\xF3n para <a href="https://testing-library.com/docs/react-native-testing-library/intro/" target="_blank" rel="noopener noreferrer">React Native</a>.</p><h2 id="lo-que-esta-biblioteca-no-es" tabindex="-1">Lo que esta biblioteca no es <a class="header-anchor" href="#lo-que-esta-biblioteca-no-es" aria-hidden="true">#</a></h2><ol><li>Un corredor de pruebas o marco</li><li>Espec\xEDfico de un marco de pruebas</li></ol><p>La biblioteca de prueba de DOM funciona con cualquier entorno que proporcione API de DOM, como Vitest, Jest, Mocha + JSDOM o un navegador real.</p><h2 id="lo-que-debes-evitar-con-testing-library" tabindex="-1">Lo que debes evitar con Testing Library <a class="header-anchor" href="#lo-que-debes-evitar-con-testing-library" aria-hidden="true">#</a></h2><p>Testing Library lo alienta a evitar probar <a href="https://kentcdodds.com/blog/testing-implementation-details" target="_blank" rel="noopener noreferrer">detalles de implementaci\xF3n</a>, como las partes internas de un componente que est\xE1 probando (aunque todav\xEDa es posible). Las <a href="./guias-de-principios.html">Gu\xEDas de Principios</a> de esta biblioteca enfatizan un enfoque en las pruebas que se asemejan mucho a c\xF3mo los usuarios interact\xFAan con sus p\xE1ginas web.</p><p>Es posible que desee evitar los siguientes detalles de implementaci\xF3n:</p><ol><li>Estado interno de un componente</li><li>M\xE9todos internos de un componente</li><li>M\xE9todos de ciclo de vida de un componente</li><li>Componentes secundarios</li></ol>',16),i=[t];function s(l,c,u,d,p,b){return r(),a("div",null,i)}var g=e(o,[["render",s]]);export{h as __pageData,g as default};