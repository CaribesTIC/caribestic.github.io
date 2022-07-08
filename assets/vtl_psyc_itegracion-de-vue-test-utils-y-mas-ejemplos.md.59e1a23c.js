import{_ as n,c as s,o as a,a as t}from"./app.1bf5b695.js";const f='{"title":"Integraci\xF3n de Vue Test Utils y m\xE1s ejemplos","description":"","frontmatter":{},"headers":[],"relativePath":"vtl/psyc/itegracion-de-vue-test-utils-y-mas-ejemplos.md"}',o={},p=t(`<h1 id="integracion-de-vue-test-utils-y-mas-ejemplos" tabindex="-1">Integraci\xF3n de Vue Test Utils y m\xE1s ejemplos <a class="header-anchor" href="#integracion-de-vue-test-utils-y-mas-ejemplos" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">Prueba</p><p><a href="https://www.youtube.com/watch?v=fi4gwBkryxE&amp;list=PLC2LZCNWKL9YdD4Z4V6guveajQoKN8rui&amp;index=8" target="_blank" rel="noopener noreferrer">Esta lecci\xF3n en video</a></p></div><p>Hasta ahora hemos visto varias caracter\xEDsticas de Vue Testing Library. Hemos visto:</p><ul><li>C\xF3mo podemos desestructurar el retorno de la funci\xF3n <code>render</code>.</li><li>C\xF3mo poder usar el m\xE9todo <code>screen.getByRole</code> para encontrar algo de una manera amigable y accesible.</li><li>C\xF3mo personalizar aserciones, por ejemplo <code>toBeDisabled</code>.</li><li>C\xF3mo podemos activar eventos como <code>fireEvent.update</code>.</li><li>C\xF3mo hacer click en el bot\xF3n con <code>fireEvent.click</code>.</li><li>C\xF3mo podemos afirmar contra eventos emitidos y verificar el env\xEDo de la carga \xFAtil.</li></ul><div class="language-js"><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
    <span class="token keyword">const</span> <span class="token punctuation">{</span> emitted <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>

    <span class="token keyword">const</span> button <span class="token operator">=</span> screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&quot;button&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span>
    <span class="token punctuation">)</span>
            
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>submit<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;John&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,5),e=[p];function c(u,i,l,r,k,d){return a(),s("div",null,e)}var y=n(o,[["render",c]]);export{f as __pageData,y as default};