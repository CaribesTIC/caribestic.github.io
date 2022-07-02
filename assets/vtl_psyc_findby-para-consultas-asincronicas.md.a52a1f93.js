import{_ as n,c as s,o as a,a as t}from"./app.8171c9f3.js";const g='{"title":"findBy para consultas asincr\xF3nicas","description":"","frontmatter":{},"headers":[],"relativePath":"vtl/psyc/findby-para-consultas-asincronicas.md"}',e={},o=t(`<h1 id="findby-para-consultas-asincronicas" tabindex="-1"><code>findBy</code> para consultas asincr\xF3nicas <a class="header-anchor" href="#findby-para-consultas-asincronicas" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">Prueba</p><p><a href="https://www.youtube.com/watch?v=6UypB6LRysc&amp;list=PLC2LZCNWKL9YdD4Z4V6guveajQoKN8rui&amp;index=5" target="_blank" rel="noopener noreferrer">Esta lecci\xF3n en video</a></p></div><p>Hasta ahora hemos visto algunas formas en que Vue Testing Library difiere de Vue Test Utils. Cuando llamamos <code>fireEventet</code> en lugar de usar <code>trigger</code> y <code>waitFor</code> en lugar usar <code>nextTick</code>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>    
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&#39;show-text&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    
    <span class="token keyword">await</span> <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
      <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 
</code></pre></div><p>Lo que vamos a hacer ahora es un peque\xF1o refactor para hacer esto a\xFAn mejor. Vamos a comentar estas tres l\xEDneas para que a\xFAn podamos tenerlas.</p><div class="language-js"><pre><code><span class="token comment">// await waitFor(() =&gt;</span>
<span class="token comment">//   expect(screen.getByText(msg)).toBeInTheDocument()</span>
<span class="token comment">// )</span>
</code></pre></div><p>Lo que haremos ser\xE1 cambiar ligeramente nuestras afirmaciones. En lugar de usar <code>waitFor</code>, ahora usaremos el selector <code>findByText</code>, del que hablamos previamente. Recordemos que este funciona de forma <a href="https://developer.mozilla.org/en-US/docs/Glossary/Asynchronous" target="_blank" rel="noopener noreferrer">as\xEDncrona</a>, es decir, devuelve una <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer">promesa</a>. Esto nos permitir\xE1 esperar a que aparezca ese elemento.</p><p>Lo que tenemos que hacer aqu\xED es colocarlo con <code>await</code> y esta prueba pasar\xE1.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&#39;show-text&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    
    <span class="token comment">// await waitFor(() =&gt;</span>
    <span class="token comment">//  expect(screen.getByText(msg)).toBeInTheDocument()</span>
    <span class="token comment">//)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token keyword">await</span> screen<span class="token punctuation">.</span><span class="token function">findByText</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 
</code></pre></div><p>En realidad es muy similar a lo que est\xE1bamos haciendo antes. Deciamos, <code>waitFor</code> y luego deciamos <code>getByText</code>. Muy similar a lo que estamos haciendo ahora. Sin embargo, <code>findByText</code> es un poco m\xE1s conciso y un poco m\xE1s legible.</p><p>Si nos dirigimos a la documentaci\xF3n de Vue Testing Library y leemos <a href="https://testing-library.com/docs/dom-testing-library/api-async/#findby-queries" target="_blank" rel="noopener noreferrer">findBy</a>, podemos ver lo que hace internamente. Se trata solo de una combinaci\xF3n simple de <code>getBy</code> y <code>waitFor</code>. Hacer esto es tan com\xFAn, que por eso nos proporcionan este m\xE9todo <code>findBy</code>. Por lo que definitivamente, es una mejora desde cualquier punto de vista.</p><p>Solo para enfatizar lo que estaba sucediendo antes, vamos a dar un paso atr\xE1s y a hacer un <code>console.log(&quot;HI&quot;)</code> dentro de <code>waitFor</code> para mostrar lo que sucede.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&#39;show-text&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    
     <span class="token keyword">await</span> <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;HI&quot;</span><span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
     <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token keyword">await</span> screen<span class="token punctuation">.</span><span class="token function">findByText</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Guardemos y veamos qu\xE9 pasa.</p><div class="language-"><pre><code>stdout | tests/components/helloworld.spec.js &gt; HelloWorld.vue &gt; renders props.msg when passed
HI
HI

 \u221A tests/components/helloworld.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  102ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
</code></pre></div><p>Vamos a obtener dos veces <code>HI</code>.</p><p>Lo que est\xE1 pasando aqu\xED es que estamos llamando <code>waitFor</code> y esta est\xE1 ejecutando la funci\xF3n de devoluci\xF3n de llamada la primera vez fallando, as\xED que espera 50 milisegundos e intenta repetir la funci\xF3n de devoluci\xF3n de llamada nuevamente hasta que pasa. Es por eso que nos devuelve <code>HI</code> dos veces.</p><p>Algo muy similar est\xE1 sucediendo internamente con <code>findBy</code>. Sin embargo, al usar <code>findBy</code> estamos abstrayendo esa complejidad desde el punto de vista del usuario y del lector. Por lo que definitivamente es preferible usar <code>findBy</code> en lugar de usar <code>waitFor</code>.</p><p>Probablemente haya algunos casos de uso para <code>waitFor</code>, pero en general querr\xE1 usar un <code>findBy</code> siempre que se pueda.</p>`,19),p=[o];function c(u,l,r,i,k,d){return a(),s("div",null,p)}var b=n(e,[["render",c]]);export{g as __pageData,b as default};
