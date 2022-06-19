import{_ as n,c as s,o as a,a as t}from"./app.8e010d71.js";const b='{"title":"Filtrando Pruebas","description":"","frontmatter":{},"headers":[{"level":2,"title":"CLI","slug":"cli"},{"level":2,"title":"Especificando de un Timeout","slug":"especificando-de-un-timeout"},{"level":2,"title":"Saltarse suites y pruebas","slug":"saltarse-suites-y-pruebas"},{"level":2,"title":"Selecci\xF3n de suites y pruebas para ejecutar","slug":"seleccion-de-suites-y-pruebas-para-ejecutar"},{"level":2,"title":"Suites y pruebas no implementadas","slug":"suites-y-pruebas-no-implementadas"}],"relativePath":"vitest/filtrando-pruebas.md"}',p={},e=t(`<h1 id="filtrando-pruebas" tabindex="-1">Filtrando Pruebas <a class="header-anchor" href="#filtrando-pruebas" aria-hidden="true">#</a></h1><p>Filtrado, tiempos de espera, concurrente para suite y pruebas</p><h2 id="cli" tabindex="-1">CLI <a class="header-anchor" href="#cli" aria-hidden="true">#</a></h2><p>Puede usar CLI para filtrar archivos de prueba por nombre:</p><div class="language-"><pre><code>$ vitest basic
</code></pre></div><p>Solo ejecutar\xE1 archivos de prueba que contengan <code>basic</code>, ejemplo.</p><div class="language-"><pre><code>basic.test.ts
basic-foo.test.ts
</code></pre></div><h2 id="especificando-de-un-timeout" tabindex="-1">Especificando de un Timeout <a class="header-anchor" href="#especificando-de-un-timeout" aria-hidden="true">#</a></h2><p>Opcionalmente, puede pasar un tiempo de espera en milisegundos como tercer argumento para las pruebas. El valor predeterminado es 5 segundos.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> test <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitest&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre></div><p>Los ganchos tambi\xE9n pueden recibir un tiempo de espera, con el mismo valor predeterminado de 5 segundos.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> beforeAll <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitest&#39;</span>

<span class="token function">beforeAll</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="saltarse-suites-y-pruebas" tabindex="-1">Saltarse suites y pruebas <a class="header-anchor" href="#saltarse-suites-y-pruebas" aria-hidden="true">#</a></h2><p>Use <code>.skip</code> para evitar ejecutar ciertas suites o pruebas</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> assert<span class="token punctuation">,</span> describe<span class="token punctuation">,</span> it <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitest&#39;</span>

describe<span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token string">&#39;skipped suite&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Suite skipped, no error</span>
    assert<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;suite&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  it<span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token string">&#39;skipped test&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Test skipped, no error</span>
    assert<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="seleccion-de-suites-y-pruebas-para-ejecutar" tabindex="-1">Selecci\xF3n de suites y pruebas para ejecutar <a class="header-anchor" href="#seleccion-de-suites-y-pruebas-para-ejecutar" aria-hidden="true">#</a></h2><p>Use <code>.only</code> para ejecutar solo ciertas suites o pruebas</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> assert<span class="token punctuation">,</span> describe<span class="token punctuation">,</span> it <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitest&#39;</span>

<span class="token comment">// Only this suite (and others marked with only) are run</span>
describe<span class="token punctuation">.</span><span class="token function">only</span><span class="token punctuation">(</span><span class="token string">&#39;suite&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    assert<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;another suite&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;skipped test&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Test skipped, as tests are running in Only mode</span>
    assert<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  it<span class="token punctuation">.</span><span class="token function">only</span><span class="token punctuation">(</span><span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Only this test (and others marked with only) are run</span>
    assert<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="suites-y-pruebas-no-implementadas" tabindex="-1">Suites y pruebas no implementadas <a class="header-anchor" href="#suites-y-pruebas-no-implementadas" aria-hidden="true">#</a></h2><p>Use <code>.todo</code> para agregar conjuntos y pruebas que deben implementarse</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> describe<span class="token punctuation">,</span> it <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vitest&#39;</span>

<span class="token comment">// An entry will be shown in the report for this suite</span>
describe<span class="token punctuation">.</span><span class="token function">todo</span><span class="token punctuation">(</span><span class="token string">&#39;unimplemented suite&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// An entry will be shown in the report for this test</span>
<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;suite&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  it<span class="token punctuation">.</span><span class="token function">todo</span><span class="token punctuation">(</span><span class="token string">&#39;unimplemented test&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,21),o=[e];function c(u,i,l,r,k,d){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{b as __pageData,h as default};
