import{_ as n,c as s,o as a,a as p}from"./app.d3783ab4.js";const g='{"title":"Reusabilidad & Composici\xF3n","description":"","frontmatter":{},"headers":[{"level":2,"title":"Probando componibles","slug":"probando-componibles"},{"level":2,"title":"Proveer / Inyectar","slug":"proveer-inyectar"},{"level":2,"title":"Probando provide","slug":"probando-provide"},{"level":2,"title":"Probando inject","slug":"probando-inject"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vtu/vue-test-utils-en-profundidad/reusabilidad-y-composicion.md"}',t={},o=p(`<h1 id="reusabilidad-composicion" tabindex="-1">Reusabilidad &amp; Composici\xF3n <a class="header-anchor" href="#reusabilidad-composicion" aria-hidden="true">#</a></h1><p>Mayoritariamente:</p><ul><li><code>global.mixins</code>.</li><li><code>global.directives</code>.</li></ul><h2 id="probando-componibles" tabindex="-1">Probando componibles <a class="header-anchor" href="#probando-componibles" aria-hidden="true">#</a></h2><p>Cuando se trabaja con la API de composici\xF3n y se crean componibles, a menudo desea probar solo los componibles. Comencemos con un ejemplo simple:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

  <span class="token keyword">function</span> <span class="token function">increase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    counter<span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> counter<span class="token punctuation">,</span> increase <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>En este caso, en realidad no necesita <code>@vue/test-utils</code>. Aqu\xED est\xE1 la prueba correspondiente:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useCounter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/Composable&quot;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;increase counter on call&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> counter<span class="token punctuation">,</span> increase <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

  <span class="token function">increase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Para componibles m\xE1s complejos, que usan ganchos de ciclo de vida como <code>onMounted</code> o manejo de <code>provide</code>/<code>inject</code>, puede crear un componente auxiliar de prueba simple. El siguiente componible obtiene los datos del usuario dentro del gancho <code>onMounted</code>.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;axios&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useUser</span><span class="token punctuation">(</span><span class="token parameter">userId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token keyword">function</span> <span class="token function">fetchUser</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">response</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>user<span class="token punctuation">.</span>value <span class="token operator">=</span> response<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">fetchUser</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span> user <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Para probar este componible, puede crear un <code>TestComponent</code> simple dentro de las pruebas. <code>TestComponent</code> debe usar el componible exactamente de la misma manera en que lo usar\xEDan los componentes reales.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount<span class="token punctuation">,</span> flushPromises <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useUser <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@/Composable&quot;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;axios&quot;</span>

<span class="token comment">// Mock API request</span>
axios<span class="token punctuation">.</span>get <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mockResolvedValue</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;User&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;fetch user on mount&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> TestComponent <span class="token operator">=</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div v-if=&quot;user&quot;&gt;{{user.name}}&lt;/div&gt;&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// Define props, to test the composable with different input arguments</span>
      <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
        <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">setup</span> <span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token comment">// Call the composable and expose all return values into our</span>
        <span class="token comment">// component instance so we can access them with wrapper.vm</span>
        <span class="token operator">...</span><span class="token function">useUser</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>userId<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>TestComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">userId</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span>vm<span class="token punctuation">.</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeUndefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> <span class="token function">flushPromises</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span>vm<span class="token punctuation">.</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;User&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="proveer-inyectar" tabindex="-1">Proveer / Inyectar <a class="header-anchor" href="#proveer-inyectar" aria-hidden="true">#</a></h2><p>Vue ofrece una forma de pasar accesorios a todos los componentes secundarios con <code>provide</code> e <code>inject</code>. La mejor manera de probar este comportamiento es probar todo el \xE1rbol (padre + hijos). Pero a veces esto no es posible porque el \xE1rbol es demasiado complejo o solo desea probar un solo componible.</p><h2 id="probando-provide" tabindex="-1">Probando <code>provide</code> <a class="header-anchor" href="#probando-provide" aria-hidden="true">#</a></h2><p>Supongamos que desea probar el siguiente componente:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> provide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
  
<span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">&#39;my-key&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;some-data&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>En este caso, puede representar un componente secundario real y probar el uso correcto de <code>provide</code> o puede crear un componente auxiliar de prueba simple y pasarlo a la ranura predeterminada.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> h<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
<span class="token keyword">import</span> ParentComponent <span class="token keyword">from</span> <span class="token string">&quot;@/ParentComponent.vue&quot;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;provides correct data&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> TestComponent <span class="token operator">=</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;span id=&quot;provide-test&quot;&gt;{{value}}&lt;/span&gt;&#39;</span><span class="token punctuation">,</span>
    <span class="token function">setup</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&#39;my-key&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> value <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>ParentComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>TestComponent<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;#provide-test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&#39;some-data&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Si su componente no contiene una ranura, puede usar un <code>stub</code> y reemplazar un componente secundario con su ayudante de prueba:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> provide <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
<span class="token keyword">import</span> SomeChild <span class="token keyword">from</span> <span class="token string">&#39;@/SomeChild.vue&#39;</span>
  
<span class="token function">provide</span><span class="token punctuation">(</span><span class="token string">&#39;my-key&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;some-data&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SomeChild</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Y la prueba:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> h<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
<span class="token keyword">import</span> ParentComponent <span class="token keyword">from</span> <span class="token string">&quot;@/ParentComponent.vue&quot;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;provides correct data&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> TestComponent <span class="token operator">=</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;span id=&quot;provide-test&quot;&gt;{{value}}&lt;/span&gt;&#39;</span><span class="token punctuation">,</span>
    <span class="token function">setup</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&#39;my-key&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span> value <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>ParentComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">SomeChild</span><span class="token operator">:</span> TestComponent
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;#provide-test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&#39;some-data&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="probando-inject" tabindex="-1">Probando <code>inject</code> <a class="header-anchor" href="#probando-inject" aria-hidden="true">#</a></h2><p>Cuando su Componente usa <code>inject</code> y necesita pasar datos con <code>provide</code>, entonces puede usar la opci\xF3n <code>global.provide</code>.</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token string">&#39;my-key&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    {{ value }}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>La prueba unitaria podr\xEDa verse simplemente como:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> MyComponent <span class="token keyword">from</span> <span class="token string">&quot;@/MyComponent.vue&quot;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;renders correct data&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">provide</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token string-property property">&#39;my-key&#39;</span><span class="token operator">:</span> <span class="token string">&#39;some-data&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&#39;some-data&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Probar componibles simples sin un componente y <code>@vue/test-utils</code></li><li>Crear un componente de ayuda de prueba para probar componibles m\xE1s complejos</li><li>Crear un componente auxiliar de prueba para probar su componente proporcionando los datos correctos con <code>provide</code></li><li>Use <code>global.provide</code> para pasar datos a su componente que usa <code>inject</code></li></ul>`,30),e=[o];function c(u,l,i,r,k,d){return a(),s("div",null,e)}var y=n(t,[["render",c]]);export{g as __pageData,y as default};
