import{_ as n,c as s,o as a,a as t}from"./app.1bf5b695.js";const m='{"title":"Ejemplos","description":"","frontmatter":{},"headers":[{"level":2,"title":"Ejemplo B\xE1sico","slug":"ejemplo-basico"},{"level":2,"title":"Ejemplo usando v-model:","slug":"ejemplo-usando-v-model"},{"level":2,"title":"M\xE1s ejemplos","slug":"mas-ejemplos"}],"relativePath":"vtl/documentacion/ejemplos.md"}',p={},e=t(`<h1 id="ejemplos" tabindex="-1">Ejemplos <a class="header-anchor" href="#ejemplos" aria-hidden="true">#</a></h1><h2 id="ejemplo-basico" tabindex="-1">Ejemplo B\xE1sico <a class="header-anchor" href="#ejemplo-basico" aria-hidden="true">#</a></h2><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Times clicked: {{ count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>increment<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>increment<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span>render<span class="token punctuation">,</span> fireEvent<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@testing-library/vue&#39;</span>
<span class="token keyword">import</span> Component <span class="token keyword">from</span> <span class="token string">&#39;@/Component.vue&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;increments value on click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// The render method returns a collection of utilities to query your component.</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByText<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>Component<span class="token punctuation">)</span>

  <span class="token comment">// getByText returns the first matching node for the provided text, and</span>
  <span class="token comment">// throws an error if no elements match or if more than one match is found.</span>
  <span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;Times clicked: 0&#39;</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> button <span class="token operator">=</span> <span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">)</span>

  <span class="token comment">// Dispatch a native click event to our button element.</span>
  <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>
  <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>

  <span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;Times clicked: 2&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="ejemplo-usando-v-model" tabindex="-1">Ejemplo usando <code>v-model</code>: <a class="header-anchor" href="#ejemplo-usando-v-model" aria-hidden="true">#</a></h2><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Hi, my name is {{ user }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>username<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Username:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>user<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>username<span class="token punctuation">&quot;</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>username<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">&#39;Alice&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span>render<span class="token punctuation">,</span> fireEvent<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@testing-library/vue&#39;</span>
<span class="token keyword">import</span> Component <span class="token keyword">from</span> <span class="token string">&#39;@/Component.vue&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;properly handles v-model&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByLabelText<span class="token punctuation">,</span> getByText<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>Component<span class="token punctuation">)</span>

  <span class="token comment">// Asserts initial state.</span>
  <span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;Hi, my name is Alice&#39;</span><span class="token punctuation">)</span>

  <span class="token comment">// Get the input DOM node by querying the associated label.</span>
  <span class="token keyword">const</span> usernameInput <span class="token operator">=</span> <span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">username</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">)</span>

  <span class="token comment">// Updates the &lt;input&gt; value and triggers an \`input\` event.</span>
  <span class="token comment">// fireEvent.input() would make the test fail.</span>
  <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>usernameInput<span class="token punctuation">,</span> <span class="token string">&#39;Bob&#39;</span><span class="token punctuation">)</span>

  <span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;Hi, my name is Bob&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="mas-ejemplos" tabindex="-1">M\xE1s ejemplos <a class="header-anchor" href="#mas-ejemplos" aria-hidden="true">#</a></h2><p>Encontrar\xE1 ejemplos de pruebas con diferentes bibliotecas en <a href="https://github.com/testing-library/vue-testing-library/tree/main/src/__tests__" target="_blank" rel="noopener noreferrer">el directorio de pruebas</a>.</p><p>Algunos incluidos son:</p><ul><li><a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/vuex.js" target="_blank" rel="noopener noreferrer"><code>vuex</code></a></li><li><a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/vue-router.js" target="_blank" rel="noopener noreferrer"><code>vue-router</code></a></li><li><a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/validate-plugin.js" target="_blank" rel="noopener noreferrer"><code>vue-validate</code></a></li><li><a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/translations-vue-i18n.js" target="_blank" rel="noopener noreferrer"><code>vue-i18n</code></a></li><li><a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/vuetify.js" target="_blank" rel="noopener noreferrer"><code>vuetify</code></a></li></ul>`,11),o=[e];function c(l,u,i,r,k,g){return a(),s("div",null,o)}var v=n(p,[["render",c]]);export{m as __pageData,v as default};
