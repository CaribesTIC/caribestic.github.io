import{_ as n,c as s,o as a,a as t}from"./app.3b8232bf.js";const y='{"title":"Un poco m\xE1s sobre Vuex","description":"","frontmatter":{},"headers":[{"level":2,"title":"Prueba de Mutaciones","slug":"prueba-de-mutaciones"},{"level":2,"title":"Prueba de Acciones","slug":"prueba-de-acciones"},{"level":2,"title":"Pruebas de Captadores","slug":"pruebas-de-captadores"},{"level":2,"title":"Ejecuci\xF3n de Pruebas","slug":"ejecucion-de-pruebas"}],"relativePath":"vtu/vue-test-utils-en-profundidad/un-poco-mas-sobre-vuex.md"}',p={},o=t(`<h1 id="un-poco-mas-sobre-vuex" tabindex="-1">Un poco m\xE1s sobre Vuex <a class="header-anchor" href="#un-poco-mas-sobre-vuex" aria-hidden="true">#</a></h1><p>Las partes principales que queremos probar unitariamente en Vuex son mutaciones y acciones.</p><h2 id="prueba-de-mutaciones" tabindex="-1">Prueba de Mutaciones <a class="header-anchor" href="#prueba-de-mutaciones" aria-hidden="true">#</a></h2><p>Las mutaciones son muy sencillas de probar, porque son solo funciones que dependen completamente de sus argumentos. Un truco es que si est\xE1 utilizando m\xF3dulos ES2015 y coloca sus mutaciones dentro de su archivo <code>store.js</code>, adem\xE1s de la exportaci\xF3n predeterminada, tambi\xE9n debe exportar las mutaciones como una exportaci\xF3n con nombre:</p><div class="language-js"><pre><code><span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>

<span class="token comment">// export \`mutations\` as a named export</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> mutations <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  state<span class="token punctuation">,</span>
  mutations
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Ejemplo probando una mutaci\xF3n usando Vitest (puede usar cualquier biblioteca de framework/assertion que desee):</p><div class="language-js"><pre><code><span class="token comment">// mutations.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> mutations <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>count<span class="token operator">++</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">// mutations.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mutations <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/store/mutations&#39;</span>

<span class="token comment">// destructure assign \`mutations\`</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> increment <span class="token punctuation">}</span> <span class="token operator">=</span> mutations

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;mutations&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;INCREMENT&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// mock state</span>
    <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span>
    <span class="token comment">// apply mutation</span>
    <span class="token function">increment</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span>
    <span class="token comment">// assert result</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="prueba-de-acciones" tabindex="-1">Prueba de Acciones <a class="header-anchor" href="#prueba-de-acciones" aria-hidden="true">#</a></h2><p>Las acciones pueden ser un poco m\xE1s complicadas porque pueden llamar a API externas. Cuando probamos acciones, generalmente necesitamos hacer alg\xFAn nivel de simulaci\xF3n; por ejemplo, podemos abstraer las llamadas a la API en un servicio y simular ese servicio dentro de nuestras pruebas. Para simular f\xE1cilmente las dependencias, podemos usar alg\xFAn m\xF3dulo <em>mock</em> para agrupar nuestros archivos de prueba.</p><p>Ejemplo probando una acci\xF3n as\xEDncrona:</p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>    
  <span class="token function">incrementAsync</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit<span class="token punctuation">,</span> state <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">,</span> state<span class="token punctuation">)</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">// actions.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> actions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/store/actions&quot;</span>

<span class="token keyword">const</span> <span class="token function-variable function">testAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">action<span class="token punctuation">,</span> payload<span class="token punctuation">,</span> state<span class="token punctuation">,</span> expectedMutations<span class="token punctuation">,</span> done</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token comment">// mock commit</span>
  <span class="token keyword">const</span> <span class="token function-variable function">commit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> payload</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> mutation <span class="token operator">=</span> expectedMutations<span class="token punctuation">[</span>count<span class="token punctuation">]</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span>mutation<span class="token punctuation">.</span>type<span class="token punctuation">)</span>      
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">done</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    count<span class="token operator">++</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;=</span> expectedMutations<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// call the action with mocked store and arguments</span>
  <span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">{</span> commit<span class="token punctuation">,</span> state <span class="token punctuation">}</span><span class="token punctuation">,</span> payload<span class="token punctuation">)</span>

  <span class="token comment">// check if no mutations should have been dispatched</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>expectedMutations<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token function">done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;actions&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;incrementAsync&#39;</span><span class="token punctuation">,</span> <span class="token parameter">done</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">testAction</span><span class="token punctuation">(</span>actions<span class="token punctuation">.</span>incrementAsync<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;increment&#39;</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> done<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Con los esp\xEDas disponibles en su entorno de prueba, puede usarlos en lugar del ayudante <code>testAction</code>:</p><div class="language-js"><pre><code><span class="token comment">// actions.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> actions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/store/actions&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;actions&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;incrementAsync&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
    <span class="token keyword">const</span> commit <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">spyOn</span><span class="token punctuation">(</span>actions<span class="token punctuation">,</span> <span class="token string">&#39;incrementAsync&#39;</span><span class="token punctuation">)</span>    
    <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    actions<span class="token punctuation">.</span><span class="token function">incrementAsync</span><span class="token punctuation">(</span><span class="token punctuation">{</span> commit<span class="token punctuation">,</span> state<span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>commit<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="pruebas-de-captadores" tabindex="-1">Pruebas de Captadores <a class="header-anchor" href="#pruebas-de-captadores" aria-hidden="true">#</a></h2><p>Si sus <em>getters</em> tienen c\xE1lculos complicados, vale la pena probarlos. Los <em>getters</em> tambi\xE9n son muy sencillos de probar por la misma raz\xF3n que los <em>mutations</em>.</p><p>Ejemplo probando un <em>getters</em>:</p><div class="language-js"><pre><code><span class="token comment">// getters.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> getters <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">filteredProducts</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> <span class="token punctuation">{</span> filterCategory <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> state<span class="token punctuation">.</span>products<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">product</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> product<span class="token punctuation">.</span>category <span class="token operator">===</span> filterCategory
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">// getters.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> getters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/store/getters&#39;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;getters&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;filteredProducts&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// mock state</span>
    <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">products</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Apple&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">category</span><span class="token operator">:</span> <span class="token string">&#39;fruit&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Orange&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">category</span><span class="token operator">:</span> <span class="token string">&#39;fruit&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Carrot&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">category</span><span class="token operator">:</span> <span class="token string">&#39;vegetable&#39;</span> <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// mock getter</span>
    <span class="token keyword">const</span> filterCategory <span class="token operator">=</span> <span class="token string">&#39;fruit&#39;</span>

    <span class="token comment">// get the result from the getter</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> getters<span class="token punctuation">.</span><span class="token function">filteredProducts</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> <span class="token punctuation">{</span> filterCategory <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// assert the result</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">.</span>deep<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Apple&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">category</span><span class="token operator">:</span> <span class="token string">&#39;fruit&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Orange&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">category</span><span class="token operator">:</span> <span class="token string">&#39;fruit&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="ejecucion-de-pruebas" tabindex="-1">Ejecuci\xF3n de Pruebas <a class="header-anchor" href="#ejecucion-de-pruebas" aria-hidden="true">#</a></h2><p>Si sus mutaciones y acciones est\xE1n escritas correctamente, las pruebas no deber\xEDan depender directamente de las API del navegador despu\xE9s de una simulaci\xF3n adecuada.</p>`,22),e=[o];function c(u,l,r,i,k,d){return a(),s("div",null,e)}var g=n(p,[["render",c]]);export{y as __pageData,g as default};
