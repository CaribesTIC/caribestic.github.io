import{_ as n,c as a,o as s,a as t}from"./app.b52f6b7b.js";const g='{"title":"Probando Eventos Emitidos","description":"","frontmatter":{},"headers":[{"level":2,"title":"Escribir un Componente y Prueba","slug":"escribir-un-componente-y-prueba"},{"level":2,"title":"Sintaxis emitted","slug":"sintaxis-emitted"},{"level":2,"title":"Probar eventos sin montar el componente","slug":"probar-eventos-sin-montar-el-componente"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vth/probando-eventos-emitidos.md"}',e={},o=t(`<h1 id="probando-eventos-emitidos" tabindex="-1">Probando Eventos Emitidos <a class="header-anchor" href="#probando-eventos-emitidos" aria-hidden="true">#</a></h1><p>A medida que las aplicaciones crecen, la cantidad de componentes tambi\xE9n crece. Cuando estos componentes necesitan compartir datos, los componentes secundarios pueden <a href="https://vuejs.org/api/#vm-emit" target="_blank" rel="noopener noreferrer">emitir</a> un evento y el componente principal responde.</p><p><code>vue-test-utils</code> proporciona una API de <code>emitted</code> que nos permite hacer afirmaciones sobre eventos emitidos. La documentaci\xF3n para <code>emitted</code> se encuentra <a href="https://test-utils.vuejs.org/api/#emitted" target="_blank" rel="noopener noreferrer">aqu\xED</a>.</p><p>El c\xF3digo fuente de la prueba descrita en esta p\xE1gina se puede encontrar <a href="https://github.com/lmiller1990/vue-testing-handbook/blob/master/demo-app-vue-3/tests/unit/Emitter.spec.js" target="_blank" rel="noopener noreferrer">aqu\xED</a>.</p><h2 id="escribir-un-componente-y-prueba" tabindex="-1">Escribir un Componente y Prueba <a class="header-anchor" href="#escribir-un-componente-y-prueba" aria-hidden="true">#</a></h2><p>Construyamos un componente simple. Cree un componente <code>&lt;Emitter&gt;</code> y agregue el siguiente c\xF3digo.</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Emitter&quot;</span><span class="token punctuation">,</span>

    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span> 
      <span class="token function">emitEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&quot;myEvent&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Agregue una prueba llamada <code>emitEvent</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> Emitter <span class="token keyword">from</span> <span class="token string">&quot;@/components/Emitter.vue&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@vue/test-utils&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;Emitter&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;emits an event with two arguments&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Emitter<span class="token punctuation">)</span>

    wrapper<span class="token punctuation">.</span>vm<span class="token punctuation">.</span><span class="token function">emitEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Agrega una prueba llamada emitUsando la API <a href="https://test-utils.vuejs.org/api/#emitted" target="_blank" rel="noopener noreferrer"><code>emitted</code></a> proporcionada por <code>vue-test-utils</code>, podemos ver f\xE1cilmente los eventos emitidos.</p><p>Ejecute la prueba:</p><div class="language-"><pre><code>PASS  tests/unit/Emitter.spec.js
\u25CF Console

  console.log tests/unit/Emitter.spec.js:10
    { myEvent: [ [ &#39;name&#39;, &#39;password&#39; ] ] }
</code></pre></div><h2 id="sintaxis-emitted" tabindex="-1">Sintaxis emitted <a class="header-anchor" href="#sintaxis-emitted" aria-hidden="true">#</a></h2><p><code>emitted</code> devuelve un objeto. Los eventos emitidos se guardan como propiedades en el objeto. Puede inspeccionar los eventos usando <code>emitted().[event]</code>:</p><div class="language-js"><pre><code><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>myEvent <span class="token comment">//=&gt;  [ [ &#39;name&#39;, &#39;password&#39; ] ]</span>
</code></pre></div><p>Intentemos llamar a <code>emitEvent</code> dos veces.</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;emits an event with two arguments&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Emitter<span class="token punctuation">)</span>

  wrapper<span class="token punctuation">.</span>vm<span class="token punctuation">.</span><span class="token function">emitEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  wrapper<span class="token punctuation">.</span>vm<span class="token punctuation">.</span><span class="token function">emitEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>myEvent<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Ejecute la prueba:</p><div class="language-"><pre><code>console.log tests/unit/Emitter.spec.js:11
  [ [ &#39;name&#39;, &#39;password&#39; ], [ &#39;name&#39;, &#39;password&#39; ] ]
</code></pre></div><p><code>emitted().emitEvent</code> devuelve una matriz. Se puede acceder a la primera instancia de <code>emitEvent</code> mediante <code>emitted().emitEvent[0]</code>. Se puede acceder a los argumentos usando una sintaxis similar, <code>emitted().emitEvent[0][0]</code> y as\xED sucesivamente.</p><p>Hagamos una afirmaci\xF3n real contra el evento emitido.</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;emits an event with two arguments&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Emitter<span class="token punctuation">)</span>

  wrapper<span class="token punctuation">.</span>vm<span class="token punctuation">.</span><span class="token function">emitEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>myEvent<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>La prueba pasa.</p><h2 id="probar-eventos-sin-montar-el-componente" tabindex="-1">Probar eventos sin montar el componente <a class="header-anchor" href="#probar-eventos-sin-montar-el-componente" aria-hidden="true">#</a></h2><p>En ocasiones, es posible que desee probar los eventos emitidos sin montar realmente el componente. Puedes hacer esto usando <code>call</code>. Escribamos otra prueba.</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;emits an event without mounting the component&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">const</span> <span class="token function-variable function">$emit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> events<span class="token punctuation">[</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>args<span class="token punctuation">]</span> <span class="token punctuation">}</span>

  Emitter<span class="token punctuation">.</span>methods<span class="token punctuation">.</span><span class="token function">emitEvent</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">{</span> $emit <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>events<span class="token punctuation">.</span>myEvent<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Dado que <code>$emit</code> es solo un objeto de JavaScript, puede simular <code>$emit</code> y usar <code>call</code> para adjuntarlo a el contexto <code>this</code> de <code>emitEvent</code>. Al usar <code>call</code>, puede llamar a un m\xE9todo sin montar el componente.</p><p>El uso de <code>call</code> puede ser \xFAtil en situaciones en las que tiene un procesamiento pesado en los m\xE9todos del ciclo de vida, como <code>created</code> y <code>mounted</code>, que no desea ejecutar. Dado que no monta el componente, los m\xE9todos del ciclo de vida nunca se llaman. Tambi\xE9n puede ser \xFAtil cuando desea manipular el contexto <code>this</code> de una manera espec\xEDfica.</p><p>En general, no desea llamar al m\xE9todo manualmente como lo estamos haciendo aqu\xED: si su componente emite un evento cuando se hace clic en un bot\xF3n, entonces probablemente desee hacer <code>wrapper.find(&#39;button&#39;).click()</code> en su lugar. Este art\xEDculo es solo para demostrar algunas otras t\xE9cnicas.</p><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>La API <code>emitted</code> de <code>vue-test-utils</code> se usa para hacer afirmaciones contra eventos emitidos.</li><li><code>emitted</code> es un m\xE9todo. Devuelve un objeto con propiedades correspondientes a los eventos emitidos</li><li>Cada propiedad de <code>emitted</code> es una matriz. Puede acceder a cada instancia de un evento emitido utilizando la sintaxis de matriz <code>[0]</code>, <code>[1]</code>.</li><li>Los argumentos de los eventos emitidos tambi\xE9n se guardan como matrices y se puede acceder a ellos mediante la sintaxis de matriz <code>[0]</code>, <code>[1]</code>.</li><li><code>$emit</code> se puede simular usando una llamada, las afirmaciones se pueden hacer sin renderizar el componente.</li></ul><p>El c\xF3digo fuente de la prueba descrita en esta p\xE1gina se puede encontrar <a href="https://github.com/lmiller1990/vue-testing-handbook/blob/master/demo-app-vue-3/tests/unit/Emitter.spec.js" target="_blank" rel="noopener noreferrer">aqu\xED</a>.</p>`,32),p=[o];function c(u,i,l,r,d,k){return s(),a("div",null,p)}var v=n(e,[["render",c]]);export{g as __pageData,v as default};
