import{_ as n,c as a,o as s,a as p}from"./app.6d5336e7.js";const b='{"title":"Propiedades Calculadas","description":"","frontmatter":{},"headers":[{"level":2,"title":"Prueba de Propiedades Calculadas","slug":"prueba-de-propiedades-calculadas"},{"level":2,"title":"Escribiendo la prueba","slug":"escribiendo-la-prueba"},{"level":2,"title":"Probando renderizando el valor","slug":"probando-renderizando-el-valor"},{"level":2,"title":"Prueba con call","slug":"prueba-con-call"},{"level":2,"title":"\xBFLlamar o Montar?","slug":"\xBFllamar-o-montar"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vth/propiedades-calculadas.md"}',e={},t=p(`<h1 id="propiedades-calculadas" tabindex="-1">Propiedades Calculadas <a class="header-anchor" href="#propiedades-calculadas" aria-hidden="true">#</a></h1><h2 id="prueba-de-propiedades-calculadas" tabindex="-1">Prueba de Propiedades Calculadas <a class="header-anchor" href="#prueba-de-propiedades-calculadas" aria-hidden="true">#</a></h2><p>Puede encontrar la prueba descrita en esta p\xE1gina <a href="https://github.com/lmiller1990/vue-testing-handbook/blob/master/demo-app-vue-3/tests/unit/NumberRenderer.spec.js" target="_blank" rel="noopener noreferrer">aqu\xED</a></p><p>Probar las propiedades calculadas es especialmente simple, ya que son simplemente funciones tradicionales de JavaScript.</p><p>Comencemos mirando dos formas diferentes de probar una propiedad <code>computed</code>. Desarrollaremos un componente <code>&lt;NumberRenderer&gt;</code>, que representa n\xFAmeros pares o impares, en funci\xF3n de una propiedad calculada de <code>numbers</code>.</p><h2 id="escribiendo-la-prueba" tabindex="-1">Escribiendo la prueba <a class="header-anchor" href="#escribiendo-la-prueba" aria-hidden="true">#</a></h2><p>El componente <code>&lt;NumberRenderer&gt;</code> recibir\xE1 una propiedad <code>even</code>, que es un valor booleano. Si <code>even</code> es <code>true</code>, el componente debe generar 2, 4, 6 y 8. Si es <code>false</code>, debe generar 1, 3, 5, 7 y 9. La lista de valores se calcular\xE1 en una propiedad <code>computed</code> llamada <code>numbers</code>.</p><h2 id="probando-renderizando-el-valor" tabindex="-1">Probando renderizando el valor <a class="header-anchor" href="#probando-renderizando-el-valor" aria-hidden="true">#</a></h2><p>La prueba:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@vue/test-utils&quot;</span>
<span class="token keyword">import</span> NumberRenderer <span class="token keyword">from</span> <span class="token string">&quot;@/components/NumberRenderer.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;NumberRenderer&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders even numbers&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>NumberRenderer<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">even</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&quot;2, 4, 6, 8&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Antes de ejecutar la prueba, declaremos <code>&lt;NumberRenderer&gt;</code>:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;NumberRenderer&quot;</span><span class="token punctuation">,</span>

  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">even</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Ahora comenzamos el desarrollo y dejamos que los mensajes de error gu\xEDen nuestra implementaci\xF3n:</p><div class="language-"><pre><code>\u25CF NumberRenderer \u203A renders even numbers

  expect(received).toBe(expected) // Object.is equality

  Expected: &quot;2, 4, 6, 8&quot;
  Received: &quot;&quot;
</code></pre></div><p>Parece que todo est\xE1 enganchado correctamente. Comencemos implementando <code>numbers</code>:</p><div class="language-js"><pre><code><span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">numbers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> evens <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        evens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> evens
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Y actualice la plantilla para usar la nueva propiedad calculada:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    {{ numbers }}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>La prueba ahora produce:</p><div class="language-"><pre><code>FAIL  tests/unit/NumberRenderer.spec.js
\u25CF NumberRenderer \u203A renders even numbers

  expect(received).toBe(expected) // Object.is equality

  Expected: &quot;2, 4, 6, 8&quot;
  Received: &quot;[
    2,
    4,
    6,
    8
  ]&quot;
</code></pre></div><p>Los n\xFAmeros son correctos, pero queremos que la lista tenga un buen formato. Actualicemos el valor <code>return</code>:</p><div class="language-js"><pre><code><span class="token keyword">return</span> evens<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">)</span>
</code></pre></div><p>\xA1Ahora la prueba pasa!</p><h2 id="prueba-con-call" tabindex="-1">Prueba con <code>call</code> <a class="header-anchor" href="#prueba-con-call" aria-hidden="true">#</a></h2><p>Ahora agregaremos una prueba para el caso de <code>even: false</code>. Esta vez, veremos una forma alternativa de probar una propiedad calculada, sin renderizar el componente.</p><p>La prueba, primero:</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders odd numbers&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> localThis <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">even</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>NumberRenderer<span class="token punctuation">.</span>computed<span class="token punctuation">.</span><span class="token function">numbers</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>localThis<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&quot;1, 3, 5, 7, 9&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>En lugar de renderizar el componente y hacer una afirmaci\xF3n en <code>wrapper.text()</code>, estamos usando <code>call</code> para proporcionar el contexto <code>this</code> alternativo a <code>numbers</code>. Veremos qu\xE9 sucede si no usamos <code>call</code> despu\xE9s de que pasemos la prueba.</p><p>Ejecutar la prueba actual produce:</p><div class="language-"><pre><code>FAIL  tests/unit/NumberRenderer.spec.js
\u25CF NumberRenderer \u203A renders odd numbers

  expect(received).toBe(expected) // Object.is equality

  Expected: &quot;1, 3, 5, 7, 9&quot;
  Received: &quot;2, 4, 6, 8&quot;
</code></pre></div><p>Actualizar <code>numbers</code>:</p><div class="language-js"><pre><code><span class="token function">numbers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> evens <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> odds <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      evens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      odds<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>even <span class="token operator">===</span> <span class="token boolean">true</span> <span class="token operator">?</span> evens<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">)</span> <span class="token operator">:</span> odds<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\xA1Ahora ambas pruebas pasan! Pero, \xBFy si no hubi\xE9ramos usado <code>call</code> en la segunda prueba? Intenta actualizarlo as\xED:</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders odd numbers&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> localThis <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">even</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>NumberRenderer<span class="token punctuation">.</span>computed<span class="token punctuation">.</span><span class="token function">numbers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&quot;1, 3, 5, 7, 9&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>La prueba ahora falla:</p><div class="language-"><pre><code>FAIL  tests/unit/NumberRenderer.spec.js
\u25CF NumberRenderer \u203A renders odd numbers

  expect(received).toBe(expected) // Object.is equality

  Expected: &quot;1, 3, 5, 7, 9&quot;
  Received: &quot;2, 4, 6, 8&quot;
</code></pre></div><p>vue vincula autom\xE1ticamente las <code>props</code> a <code>this</code>. Sin embargo, no estamos renderizando el componente con <code>mount</code>, por lo que Vue no vincula nada a <code>this</code>. Si haces <code>console.log(this)</code>, puedes ver que el contexto es simplemente el objeto <code>computed</code>:</p><div class="language-"><pre><code>{ numbers: [Function: numbers] }
</code></pre></div><p>Entonces necesitamos usar <code>call</code>, lo que nos permite vincular un objeto alternativo a <code>this</code>, en nuestro caso, uno con una propiedad <code>even</code>.</p><p>Aqu\xED el ejemplo completo del componente <code>NumberRenderer.vue</code>:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    {{ numbers }}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;NumberRenderer&quot;</span><span class="token punctuation">,</span>

  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">even</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">numbers</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> evens <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token keyword">const</span> odds <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          evens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          odds<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>even <span class="token operator">===</span> <span class="token boolean">true</span> <span class="token operator">?</span> evens<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">)</span> <span class="token operator">:</span> odds<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Y las dos pruebas en <code>NumberRenderer.spec.js</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@vue/test-utils&quot;</span>
<span class="token keyword">import</span> NumberRenderer <span class="token keyword">from</span> <span class="token string">&quot;@/components/NumberRenderer.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;NumberRenderer&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders even numbers&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>NumberRenderer<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">even</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&quot;2, 4, 6, 8&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders odd numbers&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> localThis <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">even</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>

    <span class="token comment">// console.log(this)    </span>
    <span class="token comment">// expect(NumberRenderer.computed.numbers()).toBe(&quot;1, 3, 5, 7, 9&quot;)    </span>
    
    <span class="token function">expect</span><span class="token punctuation">(</span>NumberRenderer<span class="token punctuation">.</span>computed<span class="token punctuation">.</span><span class="token function">numbers</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>localThis<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&quot;1, 3, 5, 7, 9&quot;</span><span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="\xBFllamar-o-montar" tabindex="-1">\xBFLlamar o Montar? <a class="header-anchor" href="#\xBFllamar-o-montar" aria-hidden="true">#</a></h2><p>Ambas t\xE9cnicas presentadas son \xFAtiles para probar propiedades calculadas. La llamada puede ser \xFAtil cuando:</p><ul><li>Est\xE1 probando un componente que realiza algunas operaciones que consumen mucho tiempo en un m\xE9todo de ciclo de vida que le gustar\xEDa evitar ejecutar en su prueba de unidad computada.</li><li>Desea extraer algunos valores de <code>this</code>. Usar <code>call</code> y pasar un contexto personalizado puede ser \xFAtil.</li></ul><p>Por supuesto, tambi\xE9n desea asegurarse de que el valor se renderice correctamente, as\xED que aseg\xFArese de elegir la t\xE9cnica correcta al probar sus propiedades calculadas y pruebe todos los casos extremos.</p><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Las propiedades calculadas pueden usar <code>mount</code> haciendo aserciones en el marcado renderizado</li><li>Las propiedades calculadas complejas se pueden probar de forma independiente mediante el uso de <code>call</code></li></ul>`,49),o=[t];function c(u,l,r,i,k,d){return s(),a("div",null,o)}var g=n(e,[["render",c]]);export{b as __pageData,g as default};
