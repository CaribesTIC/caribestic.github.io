import{_ as e,c as a,o,a as r}from"./app.2425fff2.js";const g='{"title":"Desarrollo Dirigido por Pruebas","description":"","frontmatter":{},"headers":[{"level":2,"title":"Test Driven Development (TDD)","slug":"test-driven-development-tdd"},{"level":2,"title":"Las tres leyes de TDD","slug":"las-tres-leyes-de-tdd"},{"level":2,"title":"El ciclo Rojo-Verde-Refactor","slug":"el-ciclo-rojo-verde-refactor"},{"level":2,"title":"Limitaciones de TDD","slug":"limitaciones-de-tdd"}],"relativePath":"comenzar/tdd.md"}',s={},i=r('<h1 id="desarrollo-dirigido-por-pruebas" tabindex="-1">Desarrollo Dirigido por Pruebas <a class="header-anchor" href="#desarrollo-dirigido-por-pruebas" aria-hidden="true">#</a></h1><h2 id="test-driven-development-tdd" tabindex="-1">Test Driven Development (TDD) <a class="header-anchor" href="#test-driven-development-tdd" aria-hidden="true">#</a></h2><p>Es una t\xE9cnica de ingenier\xEDa de software, que dirige el desarrollo de un producto a trav\xE9s de la escritura de pruebas, generalmente pruebas unitarias.</p><p>TDD fue desarrollado por Kent Beck a fines de la d\xE9cada de 1990 y es parte de la metodolog\xEDa XP (Programaci\xF3n eXtrema). Su autor y los seguidores de la TDD aseguran que con esta t\xE9cnica se obtiene un c\xF3digo m\xE1s tolerante al cambio, robusto, seguro, m\xE1s econ\xF3mico de mantener e, incluso, una vez que te acostumbras a aplicarlo, promete mayor velocidad a la hora de desarrollar.</p><h2 id="las-tres-leyes-de-tdd" tabindex="-1">Las tres leyes de TDD <a class="header-anchor" href="#las-tres-leyes-de-tdd" aria-hidden="true">#</a></h2><ul><li>No escribir\xE1 c\xF3digo de producci\xF3n sin antes escribir una prueba que falle.</li><li>No escribir\xE1 m\xE1s de una prueba de unidad suficiente para fallar (y no compilar es fallar).</li><li>No escribir\xE1s m\xE1s c\xF3digo del necesario para pasar la prueba.</li></ul><p>Estas tres leyes conducen a la repetici\xF3n de lo que se conoce como el ciclo Rojo-Verde-Refactor. Veamos en qu\xE9 consiste:</p><h2 id="el-ciclo-rojo-verde-refactor" tabindex="-1">El ciclo Rojo-Verde-Refactor <a class="header-anchor" href="#el-ciclo-rojo-verde-refactor" aria-hidden="true">#</a></h2><p>El ciclo Red-Green-Refactor, tambi\xE9n conocido como algoritmo TDD, se basa en:</p><ol><li><strong>Rojo:</strong> Escribir una prueba que falla, es decir, tenemos que realizar la prueba antes de escribir la implementaci\xF3n. Normalmente se utilizan pruebas unitarias, aunque en algunos contextos puede tener sentido hacer TDD con pruebas de integraci\xF3n.</li><li><strong>Verde:</strong> Una vez creada la prueba que falla, implementaremos el c\xF3digo m\xEDnimo necesario para que la prueba pase.</li><li><strong>Refactor:</strong> finalmente, despu\xE9s de que nuestro c\xF3digo pase la prueba, debemos examinarlo para ver si hay alguna mejora que podamos hacer.</li></ol><ul><li>Una vez que hemos cerrado el ciclo, comenzamos de nuevo con el siguiente requisito.</li></ul><p>Esta forma de programar ofrece dos ventajas principales. La primera y m\xE1s obvia es que obtenemos c\xF3digo con buena cobertura de prueba, lo cual es positivo hasta cierto punto. Recuerde, nos pagan para escribir c\xF3digo que funcione, no para probar.</p><p>El segundo beneficio es que escribir las pruebas primero nos ayuda a dise\xF1ar la API que va a tener nuestro componente, ya que nos obliga a pensar c\xF3mo queremos usarlo. Esto a menudo termina dando lugar a componentes con responsabilidades bien definidas y poco acoplamiento.</p><h2 id="limitaciones-de-tdd" tabindex="-1">Limitaciones de TDD <a class="header-anchor" href="#limitaciones-de-tdd" aria-hidden="true">#</a></h2><p>Por muchos beneficios inherentes que tenga (o se prometan), la t\xE9cnica TDD no debe entenderse como una religi\xF3n o una f\xF3rmula m\xE1gica que sirve para todo. Seguir TDD al pie de la letra y en todos los contextos no garantiza que su c\xF3digo sea m\xE1s tolerante al cambio, robusto o seguro, ni siquiera garantiza que ser\xE1 m\xE1s productivo al dise\xF1ar software.</p><p>Seg\xFAn el punto de vista de algunos expertos, aplicar TDD no encaja bien en todos los contextos. Por ejemplo, si hay una implementaci\xF3n obvia para un caso de uso, la escribo directamente y luego hago las pruebas. En el caso de trabajar en el frontend, tampoco considero hacer TDD para dise\xF1ar componentes de UI. Incluso es discutible si se deben realizar pruebas unitarias para probar los elementos de la interfaz de usuario. Los grandes desarrolladores han comentado en repetidas ocasiones que no es conveniente hacer pruebas automatizadas sobre estos, ya que es muy cambiante y las pruebas quedan desactualizadas con demasiada frecuencia.</p><p>El consejo es que lo pruebes, intentes aplicarlo en tu d\xEDa a d\xEDa durante un tiempo y luego decidas por ti mismo.</p>',17),n=[i];function t(d,l,c,u,p,m){return o(),a("div",null,n)}var h=e(s,[["render",t]]);export{g as __pageData,h as default};
