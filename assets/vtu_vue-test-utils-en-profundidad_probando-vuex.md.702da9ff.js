import{_ as n,c as a,o as s,a as e}from"./app.d9e2b096.js";const y='{"title":"Probando Vuex","description":"","frontmatter":{},"headers":[{"level":2,"title":"Un Ejemplo Simple","slug":"un-ejemplo-simple"},{"level":2,"title":"Prueba con una Tienda Vuex Real","slug":"prueba-con-una-tienda-vuex-real"},{"level":2,"title":"Prueba con una Tienda Simulada","slug":"prueba-con-una-tienda-simulada"},{"level":2,"title":"Probar Vuex de forma aislada","slug":"probar-vuex-de-forma-aislada"},{"level":2,"title":"Preestablecimiento del Estado de Vuex","slug":"preestablecimiento-del-estado-de-vuex"},{"level":2,"title":"Pruebas con la Composition API","slug":"pruebas-con-la-composition-api"},{"level":2,"title":"Prueba de Componentes que Utilizan useStore sin una Clave de Inyecci\xF3n","slug":"prueba-de-componentes-que-utilizan-usestore-sin-una-clave-de-inyeccion"},{"level":2,"title":"Ejemplo para proporcionar useStore sin clave","slug":"ejemplo-para-proporcionar-usestore-sin-clave"},{"level":2,"title":"Prueba de Componentes que Utilizan useStore con una Clave de Inyecci\xF3n","slug":"prueba-de-componentes-que-utilizan-usestore-con-una-clave-de-inyeccion"},{"level":2,"title":"Proporcionar el useStore con clave usando global.provide","slug":"proporcionar-el-usestore-con-clave-usando-global-provide"},{"level":2,"title":"Proporcionar el useStore con Clave usando global.plugins","slug":"proporcionar-el-usestore-con-clave-usando-global-plugins"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vtu/vue-test-utils-en-profundidad/probando-vuex.md"}',t={},p=e(`<h1 id="probando-vuex" tabindex="-1">Probando Vuex <a class="header-anchor" href="#probando-vuex" aria-hidden="true">#</a></h1><p>Vuex es solo un detalle de implementaci\xF3n; no se requiere ning\xFAn tratamiento especial para probar componentes usando Vuex. Dicho esto, existen algunas t\xE9cnicas que pueden hacer que sus pruebas sean m\xE1s f\xE1ciles de leer y escribir. Los veremos aqu\xED.</p><p>Esta gu\xEDa asume que est\xE1 familiarizado con Vuex. Vuex 4 es la versi\xF3n que funciona con Vue.js 3. Lea los documentos <a href="https://vuex.vuejs.org/" target="_blank" rel="noopener noreferrer">aqu\xED</a>. Recuerde haberlo instalado para probar algunos ejemplos relacionados:</p><div class="language-"><pre><code>npm i vuex@next --save
</code></pre></div><h2 id="un-ejemplo-simple" tabindex="-1">Un Ejemplo Simple <a class="header-anchor" href="#un-ejemplo-simple" aria-hidden="true">#</a></h2><p>Aqu\xED hay una tienda Vuex simple y un componente que se basa en que una tienda Vuex est\xE9 presente:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>count <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>La tienda simplemente almacena un contador, aument\xE1ndolo cuando se confirma la mutaci\xF3n de <code>increment</code>. Este es el componente que probaremos:</p><div class="language-js"><pre><code><span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;button @click=&quot;increment&quot; /&gt;
      Count: {{ count }}
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>count
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="prueba-con-una-tienda-vuex-real" tabindex="-1">Prueba con una Tienda Vuex Real <a class="header-anchor" href="#prueba-con-una-tienda-vuex-real" aria-hidden="true">#</a></h2><p>Para probar completamente que este componente y la tienda Vuex est\xE1n funcionando, haremos click en el <code>&lt;button&gt;</code> y afirmaremos que el conteo aumenta. En sus aplicaciones Vue, generalmente en <code>main.js</code>, instala Vuex as\xED:</p><div class="language-js"><pre><code><span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span>
</code></pre></div><p>Esto se debe a que Vuex es un complemento. Los complementos se aplican llamando a <code>app.use</code> y pasando el complemento.</p><p>Vue Test Utils tambi\xE9n le permite instalar complementos, utilizando la opci\xF3n de montaje <code>global.plugins</code>.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">state</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>count <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;vuex&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>store<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Count: 1&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Despu\xE9s de instalar el complemento, usamos <code>trigger</code> para hacer click en el bot\xF3n y afirmar que <code>count</code> aumente. Este tipo de prueba, que cubre la interacci\xF3n entre diferentes sistemas (en este caso, el Componente y la tienda), se conoce como prueba de integraci\xF3n.</p><h2 id="prueba-con-una-tienda-simulada" tabindex="-1">Prueba con una Tienda Simulada <a class="header-anchor" href="#prueba-con-una-tienda-simulada" aria-hidden="true">#</a></h2><p>Por el contrario, una prueba unitaria podr\xEDa aislar y probar el componente y la tienda por separado. Esto puede ser \xFAtil si tiene una aplicaci\xF3n muy grande con una tienda compleja. Para este caso de uso, puede simular las partes de la tienda que le interesan usando <code>global.mocks</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;button @click=&quot;increment&quot; /&gt;
      Count: {{ count }}
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>count
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;vuex using a mock store&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> $store <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">25</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">commit</span><span class="token operator">:</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">mocks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        $store
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Count: 25&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>$store<span class="token punctuation">.</span>commit<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>En lugar de usar una tienda Vuex real e instalarla a trav\xE9s de <code>global.plugins</code>, creamos nuestra propia tienda simulada, implementando solo las partes de Vuex utilizadas en el componente (en este caso, las funciones de <code>state</code> y <code>commit</code>).</p><p>Si bien puede parecer conveniente probar la tienda de forma aislada, tenga en cuenta que no le avisar\xE1 si rompe su tienda Vuex. Considere cuidadosamente si quiere simular la tienda Vuex o usar una real, y comprenda las compensaciones.</p><h2 id="probar-vuex-de-forma-aislada" tabindex="-1">Probar Vuex de forma aislada <a class="header-anchor" href="#probar-vuex-de-forma-aislada" aria-hidden="true">#</a></h2><p>Es posible que desee probar sus mutaciones o acciones de Vuex en total aislamiento, especialmente si son complejas. No necesita Vue Test Utils para esto, ya que una tienda Vuex es solo JavaScript normal. As\xED es como puede probar la mutaci\xF3n de <code>increment</code> sin Vue Test Utils:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;increment mutation&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">increment</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>count <span class="token operator">+=</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="preestablecimiento-del-estado-de-vuex" tabindex="-1">Preestablecimiento del Estado de Vuex <a class="header-anchor" href="#preestablecimiento-del-estado-de-vuex" aria-hidden="true">#</a></h2><p>A veces puede ser \xFAtil tener la tienda Vuex en un estado espec\xEDfico para una prueba. Una t\xE9cnica \xFAtil que puede usar, adem\xE1s de <code>global.mocks</code>, es crear una funci\xF3n que envuelva <code>createStore</code> y tome un argumento para inicializar el estado inicial. En este ejemplo, extendemos <code>increment</code> para tomar un argumento adicional, que se agregar\xE1 a <code>state.count</code>. Si no se proporciona, simplemente incrementamos <code>state.count</code> en 1.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token keyword">const</span> <span class="token function-variable function">createVuexStore</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">initialState</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
  <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token operator">...</span>initialState
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">increment</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> value <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>count <span class="token operator">+=</span> value
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;increment mutation without passing a value&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createVuexStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">20</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">21</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;increment mutation with a value&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createVuexStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Al crear una funci\xF3n <code>createVuexStore</code> que toma un estado inicial, podemos establecer f\xE1cilmente el estado inicial. Esto nos permite probar todos los casos extremos, mientras simplificamos nuestras pruebas.</p><p>El <a href="https://lmiller1990.github.io/vue-testing-handbook/testing-vuex.html" target="_blank" rel="noopener noreferrer">Manual de Pruebas de Vue</a> tiene m\xE1s ejemplos para probar Vuex. Nota: los ejemplos pertenecen a Vue.js 2 y Vue Test Utils v1. Las ideas y los conceptos son los mismos, y el Manual de pruebas de Vue se actualizar\xE1 para Vue.js 3 y Vue Test Utils 2 en un futuro pr\xF3ximo.</p><h2 id="pruebas-con-la-composition-api" tabindex="-1">Pruebas con la Composition API <a class="header-anchor" href="#pruebas-con-la-composition-api" aria-hidden="true">#</a></h2><p>Se accede a Vuex a trav\xE9s de una funci\xF3n <code>useStore</code> cuando se usa la Composition API. <a href="https://next.vuex.vuejs.org/guide/composition-api.html" target="_blank" rel="noopener noreferrer">Lea m\xE1s sobre esto aqu\xED</a>.</p><p><code>useStore</code> se puede usar con una clave de inyecci\xF3n \xFAnica y opcional, como se explica <a href="https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function" target="_blank" rel="noopener noreferrer">en la documentaci\xF3n de Vuex</a>.</p><p>Se ve as\xED:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token comment">// create a globally unique symbol for the injection key</span>
<span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// use unique key to access store</span>
    <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// specify key as second argument when calling app.use(store)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
</code></pre></div><p>Para evitar repetir el paso del par\xE1metro clave cada vez que se usa <code>useStore</code>, la documentaci\xF3n de Vuex recomienda extraer esa l\xF3gica en una funci\xF3n auxiliar y reutilizar esa funci\xF3n en lugar de la funci\xF3n <code>useStore</code> predeterminada. <a href="https://next.vuex.vuejs.org/guide/typescript-support.html#typing-usestore-composition-function" target="_blank" rel="noopener noreferrer">Lea m\xE1s sobre esto aqu\xED</a>. El enfoque que proporciona una tienda usando Vue Test Utils depende de la forma en que se usa la funci\xF3n <code>useStore</code> en el componente.</p><h2 id="prueba-de-componentes-que-utilizan-usestore-sin-una-clave-de-inyeccion" tabindex="-1">Prueba de Componentes que Utilizan useStore sin una Clave de Inyecci\xF3n <a class="header-anchor" href="#prueba-de-componentes-que-utilizan-usestore-sin-una-clave-de-inyeccion" aria-hidden="true">#</a></h2><p>Sin una clave de inyecci\xF3n, los datos almacenados pueden simplemente inyectarse en el componente a trav\xE9s de la opci\xF3n de montaje de <code>provide</code> global. El nombre de la tienda inyectada debe ser el mismo que el del componente, e.g. &quot;store&quot;.</p><h2 id="ejemplo-para-proporcionar-usestore-sin-clave" tabindex="-1">Ejemplo para proporcionar <code>useStore</code> sin clave <a class="header-anchor" href="#ejemplo-para-proporcionar-usestore-sin-clave" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">provide</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">store</span><span class="token operator">:</span> store
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="prueba-de-componentes-que-utilizan-usestore-con-una-clave-de-inyeccion" tabindex="-1">Prueba de Componentes que Utilizan <code>useStore</code> con una Clave de Inyecci\xF3n <a class="header-anchor" href="#prueba-de-componentes-que-utilizan-usestore-con-una-clave-de-inyeccion" aria-hidden="true">#</a></h2><p>Al usar la tienda con una clave de inyecci\xF3n, el enfoque anterior no funcionar\xE1. <code>useStore</code> no devolver\xE1 la instancia de la tienda. Para acceder a la tienda correcta, se debe proporcionar el identificador.</p><p>Tiene que ser la clave exacta que se pasa a <code>useStore</code> en la funci\xF3n <code>setup</code> del componente o al <code>useStore</code> dentro de la funci\xF3n auxiliar personalizada. Dado que los s\xEDmbolos de JavaScript son \xFAnicos y no se pueden volver a crear, es mejor exportar la clave desde la tienda real.</p><p>Puede usar <code>global.provide</code> con la clave correcta para inyectar la tienda, o <code>global.plugins</code> para instalar la tienda y especificar la clave:</p><h2 id="proporcionar-el-usestore-con-clave-usando-global-provide" tabindex="-1">Proporcionar el <code>useStore</code> con clave usando <code>global.provide</code> <a class="header-anchor" href="#proporcionar-el-usestore-con-clave-usando-global-provide" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token comment">// store.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">// app.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> key <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./store&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">provide</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token operator">:</span> store
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="proporcionar-el-usestore-con-clave-usando-global-plugins" tabindex="-1">Proporcionar el <code>useStore</code> con Clave usando <code>global.plugins</code> <a class="header-anchor" href="#proporcionar-el-usestore-con-clave-usando-global-plugins" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token comment">// store.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">// app.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> key <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./store&#39;</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// to pass options to plugins, use the array syntax.</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span>store<span class="token punctuation">,</span> key<span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Use <code>global.plugins</code> para instalar Vuex como un complemento</li><li>Use <code>global.mocks</code> para simular un objeto global, como Vuex, para casos de uso avanzado</li><li>Considere probar mutaciones y acciones complejas de Vuex de forma aislada</li><li>Envuelva <code>createStore</code> con una funci\xF3n que toma un argumento para configurar escenarios de prueba espec\xEDficos</li></ul>`,51),o=[p];function c(u,l,r,i,k,d){return s(),a("div",null,o)}var g=n(t,[["render",c]]);export{y as __pageData,g as default};
