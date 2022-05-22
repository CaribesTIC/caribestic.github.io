import{_ as n,c as s,o as a,a as t}from"./app.3b8232bf.js";const m='{"title":"Ranuras","description":"","frontmatter":{},"headers":[{"level":2,"title":"Un Ejemplo Sencillo","slug":"un-ejemplo-sencillo"},{"level":2,"title":"Ranuras nombradas","slug":"ranuras-nombradas"},{"level":2,"title":"M\xFAltiples ranuras","slug":"multiples-ranuras"},{"level":2,"title":"Uso avanzado","slug":"uso-avanzado"},{"level":2,"title":"Ranuras con alcance","slug":"ranuras-con-alcance"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vtu/vue-test-utils-en-profundidad/ranuras.md"}',p={},o=t(`<h1 id="ranuras" tabindex="-1">Ranuras <a class="header-anchor" href="#ranuras" aria-hidden="true">#</a></h1><p>Vue Test Utils proporciona algunas caracter\xEDsticas \xFAtiles para probar componentes usando <code>slots</code>.</p><h2 id="un-ejemplo-sencillo" tabindex="-1">Un Ejemplo Sencillo <a class="header-anchor" href="#un-ejemplo-sencillo" aria-hidden="true">#</a></h2><p>Es posible que tenga un componente gen\xE9rico <code>&lt;layout&gt;</code> que use una ranura predeterminada para representar alg\xFAn contenido. Por ejemplo:</p><div class="language-js"><pre><code><span class="token keyword">const</span> Layout <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;h1&gt;Welcome!&lt;/h1&gt;
      &lt;main&gt;
        &lt;slot /&gt;
      &lt;/main&gt;
      &lt;footer&gt;
        Thanks for visiting.
      &lt;/footer&gt;
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>Es posible que desee escribir una prueba para asegurarse de que se represente el contenido de ranura predeterminado. VTU proporciona la opci\xF3n de montaje de <code>slots</code> para este prop\xF3sito:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;layout default slot&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Layout<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;Main Content&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Main Content&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>\xA1Pas\xF3! En este ejemplo, estamos pasando alg\xFAn contenido de texto a la ranura predeterminada. Si desea ser a\xFAn m\xE1s espec\xEDfico y verificar que el contenido de la ranura predeterminada se muestra dentro de <code>&lt;main&gt;</code>, puede cambiar la afirmaci\xF3n:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;layout default slot&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Layout<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;Main Content&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;main&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Main Content&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="ranuras-nombradas" tabindex="-1">Ranuras nombradas <a class="header-anchor" href="#ranuras-nombradas" aria-hidden="true">#</a></h2><p>Puede tener un componente <code>&lt;layout&gt;</code> m\xE1s complejo con algunas ranuras con nombre. Por ejemplo:</p><div class="language-js"><pre><code><span class="token keyword">const</span> Layout <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;header&gt;
        &lt;slot name=&quot;header&quot; /&gt;
      &lt;/header&gt;

      &lt;main&gt;
        &lt;slot name=&quot;main&quot; /&gt;
      &lt;/main&gt;
      &lt;footer&gt;
        &lt;slot name=&quot;footer&quot; /&gt;
      &lt;/footer&gt;
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>VTU tambi\xE9n es compatible con esto. Puedes escribir una prueba de la siguiente manera. Tenga en cuenta que en este ejemplo estamos pasando HTML en lugar de contenido de texto a las ranuras.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;layout full page layout&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Layout<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">header</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;Header&lt;/div&gt;&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;Main Content&lt;/div&gt;&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">footer</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;Footer&lt;/div&gt;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;Header&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;Main Content&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;Footer&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="multiples-ranuras" tabindex="-1">M\xFAltiples ranuras <a class="header-anchor" href="#multiples-ranuras" aria-hidden="true">#</a></h2><p>Tambi\xE9n puede pasar un arreglo de ranuras, observe este ejemplo:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> Layout <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;h1&gt;Welcome!&lt;/h1&gt;
      &lt;main&gt;
        &lt;slot /&gt;
      &lt;/main&gt;
      &lt;footer&gt;
        Thanks for visiting.
      &lt;/footer&gt;
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;layout full page layout&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Layout<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;&lt;div id=&quot;one&quot;&gt;One&lt;/div&gt;&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;&lt;div id=&quot;two&quot;&gt;Two&lt;/div&gt;&#39;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;#one&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;#two&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="uso-avanzado" tabindex="-1">Uso avanzado <a class="header-anchor" href="#uso-avanzado" aria-hidden="true">#</a></h2><p>Tambi\xE9n puede pasar una funci\xF3n de renderizado, un objeto con plantilla o incluso un SFC importado desde un archivo <code>vue</code> a una opci\xF3n de montaje de ranura:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>Header<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> h <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> Header <span class="token keyword">from</span> <span class="token string">&#39;@/Header.vue&#39;</span>

<span class="token keyword">const</span> Layout <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;header&gt;
        &lt;slot name=&quot;header&quot; /&gt;
      &lt;/header&gt;     
      &lt;div&gt;
        &lt;slot name=&quot;sidebar&quot; /&gt;
      &lt;/div&gt;
      &lt;main&gt;
        &lt;slot name=&quot;main&quot; /&gt;
      &lt;/main&gt;
      &lt;footer&gt;
        &lt;slot name=&quot;footer&quot; /&gt;
      &lt;/footer&gt;
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;layout full page layout&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Layout<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">header</span><span class="token operator">:</span> Header<span class="token punctuation">,</span>
      <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Main Content&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;Sidebar&lt;/div&gt;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">footer</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;Footer&lt;/div&gt;&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;Header&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;Main Content&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;Footer&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p><a href="https://github.com/vuejs/test-utils/blob/9d3c2a6526f3d8751d29b2f9112ad2a3332bbf52/tests/mountingOptions/slots.spec.ts#L124-L167" target="_blank" rel="noopener noreferrer">Consulte las pruebas</a> para ver m\xE1s ejemplos y casos de uso.</p><h2 id="ranuras-con-alcance" tabindex="-1">Ranuras con alcance <a class="header-anchor" href="#ranuras-con-alcance" aria-hidden="true">#</a></h2><p>Tambi\xE9n se admiten enlaces y <a href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank" rel="noopener noreferrer">ranuras con alcance</a>.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> ComponentWithSlots <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div class=&quot;scoped&quot;&gt;
      &lt;slot name=&quot;scoped&quot; v-bind=&quot;{ msg }&quot; /&gt;
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;world&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;scoped slots&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>ComponentWithSlots<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">slots</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">scoped</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;template #scoped=&quot;params&quot;&gt;
        Hello {{ params.msg }}
        &lt;/template&gt;
      </span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Hello world&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Use la opci\xF3n de montaje <code>slots</code> para probar que los componentes que usan <code>&lt;slot&gt;</code> est\xE1n procesando el contenido correctamente.</li><li>El contenido puede ser una cadena, una funci\xF3n de representaci\xF3n o un SFC importado.</li><li>Use <code>default</code> para la ranura predeterminada y el nombre correcto para las ranuras con nombre.</li><li>Tambi\xE9n se admiten las ranuras con \xE1mbito y la abreviatura <strong>(<code>#</code>)</strong>.</li></ul>`,27),e=[o];function c(l,u,i,r,k,d){return a(),s("div",null,e)}var f=n(p,[["render",c]]);export{m as __pageData,f as default};
