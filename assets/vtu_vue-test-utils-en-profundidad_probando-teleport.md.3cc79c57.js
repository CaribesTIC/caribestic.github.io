import{_ as n,c as s,o as a,a as t}from"./app.2425fff2.js";const m='{"title":"Probando Teleport","description":"","frontmatter":{},"headers":[{"level":2,"title":"Ejemplo","slug":"ejemplo"},{"level":2,"title":"Montando el Componente","slug":"montando-el-componente"},{"level":2,"title":"Interactuando con el Componente Teletransportado","slug":"interactuando-con-el-componente-teletransportado"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vtu/vue-test-utils-en-profundidad/probando-teleport.md"}',p={},e=t(`<h1 id="probando-teleport" tabindex="-1">Probando Teleport <a class="header-anchor" href="#probando-teleport" aria-hidden="true">#</a></h1><p>Vue 3 viene con un nuevo componente integrado: <code>&lt;Teleport&gt;</code>, que permite a los componentes &quot;teleport&quot; su contenido mucho m\xE1s all\xE1 de su propio <code>&lt;template&gt;</code>. La mayor\xEDa de las pruebas escritas con Vue Test Utils tienen como alcance el componente pasado a <code>mount</code>, lo que presenta cierta complejidad cuando se trata de probar un componente que se teletransporta fuera del componente donde se representa inicialmente.</p><p>Aqu\xED hay algunas estrategias y t\xE9cnicas para probar componentes usando <code>&lt;Teleport&gt;</code>.</p><div class="tip custom-block"><p class="custom-block-title">CONSEJO</p><p>Si desea probar el resto de su componente, ignorando el teletransporte, puede bloquear el <code>teleport</code> pasando <code>teleport: true</code> en la <a href="https://test-utils.vuejs.org/api/#global-stubs" target="_blank" rel="noopener noreferrer">opci\xF3n global de stubs</a>.</p></div><h2 id="ejemplo" tabindex="-1">Ejemplo <a class="header-anchor" href="#ejemplo" aria-hidden="true">#</a></h2><p>En este ejemplo estamos probando un componente <code>&lt;Navbar&gt;</code>. Representa un componente <code>&lt;Signup&gt;</code> dentro de un <code>&lt;Teleport&gt;</code>. El accesorio de destino de <code>&lt;Teleport&gt;</code> es un elemento ubicado fuera del componente <code>&lt;Navbar&gt;</code>.</p><p>Este es el componente <code>Navbar.vue</code>:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Teleport</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>#modal<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Signup</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Teleport</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> Signup <span class="token keyword">from</span> <span class="token string">&#39;@/Signup.vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    Signup
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Simplemente teletransporta un <code>&lt;Signup&gt;</code> a otro lugar. Es simple para el prop\xF3sito de este ejemplo.</p><p><code>Signup.vue</code> es un formulario que valida si <code>username</code> tiene m\xE1s de 8 caracteres. Si es as\xED, cuando se env\xEDa, emite un evento de <code>signup</code> con el <code>username</code> como carga \xFAtil. Probar eso ser\xE1 nuestro objetivo.</p><h2 id="montando-el-componente" tabindex="-1">Montando el Componente <a class="header-anchor" href="#montando-el-componente" aria-hidden="true">#</a></h2><p>Comenzando con una prueba m\xEDnima:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> Navbar <span class="token keyword">from</span> <span class="token string">&#39;@/Navbar.vue&#39;</span>
<span class="token keyword">import</span> Signup <span class="token keyword">from</span> <span class="token string">&#39;@/Signup.vue&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;emits a signup event when valid&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Navbar<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Ejecutar esta prueba le dar\xE1 una advertencia: <code>[Vue warn]: Failed to locate Teleport target with selector &quot;#modal&quot;</code>. Vamos a crearlo:</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> Navbar <span class="token keyword">from</span> <span class="token string">&#39;@/Navbar.vue&#39;</span>
<span class="token keyword">import</span> Signup <span class="token keyword">from</span> <span class="token string">&#39;@/Signup.vue&#39;</span>

<span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// create teleport target</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
  el<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token string">&#39;modal&#39;</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// clean up</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>outerHTML <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;emits a signup event when valid&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Navbar<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Estamos usando Vitest para este ejemplo, que no restablece el DOM en cada prueba. Por esta raz\xF3n, es bueno limpiar despu\xE9s de cada prueba con <code>afterEach</code>.</p><h2 id="interactuando-con-el-componente-teletransportado" tabindex="-1">Interactuando con el Componente Teletransportado <a class="header-anchor" href="#interactuando-con-el-componente-teletransportado" aria-hidden="true">#</a></h2><p>Lo siguiente que debe hacer es completar la entrada de <code>username</code>. Desafortunadamente, no podemos usar <code>wrapper.find(&#39;input&#39;)</code>. \xBFPor qu\xE9 no? Un r\xE1pido <code>console.log(wrapper.html())</code>:</p><div class="language-js"><div class="highlight-lines"><br><br><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;emits a signup event when valid&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Navbar<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Nos muestra:</p><div class="language-html"><pre><code><span class="token comment">&lt;!--teleport start--&gt;</span>
<span class="token comment">&lt;!--teleport end--&gt;</span>
</code></pre></div><p>Vemos algunos comentarios utilizados por Vue para manejar <code>&lt;Teleport&gt;</code>, pero no <code>&lt;input&gt;</code>. Esto se debe a que el componente <code>&lt;Signup&gt;</code> (y su HTML) ya no se representa dentro de &lt;<code>Navbar&gt;</code>: se teletransport\xF3 al exterior.</p><p>Aunque el HTML real se teletransporta al exterior, resulta que el DOM virtual asociado con <code>&lt;Navbar&gt;</code> mantiene una referencia al componente original. Esto significa que puede usar <code>getComponent</code> y <code>findComponent</code>, que operan en el DOM virtual, no en el DOM normal.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;teleport&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Navbar<span class="token punctuation">)</span>

  wrapper<span class="token punctuation">.</span><span class="token function">getComponent</span><span class="token punctuation">(</span>Signup<span class="token punctuation">)</span> <span class="token comment">// got it!</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p><code>getComponent</code> devuelve un VueWrapper. Ahora puede usar m\xE9todos como <code>get</code>, <code>find</code> y <code>trigger</code>.</p><p>Terminemos la prueba:</p><div class="language-js"><div class="highlight-lines"><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br></div><pre><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;teleport&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Navbar<span class="token punctuation">)</span>

  <span class="token keyword">const</span> signup <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">getComponent</span><span class="token punctuation">(</span>Signup<span class="token punctuation">)</span>
  <span class="token keyword">await</span> signup<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token string">&#39;valid_username&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> signup<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;form&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;submit.prevent&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>signup<span class="token punctuation">.</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>signup<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;valid_username&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>\xA1Pas\xF3!</p><p>La prueba completa:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> Navbar <span class="token keyword">from</span> <span class="token string">&#39;@/Navbar.vue&#39;</span>
<span class="token keyword">import</span> Signup <span class="token keyword">from</span> <span class="token string">&#39;@/Signup.vue&#39;</span>

<span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// create teleport target</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
  el<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token string">&#39;modal&#39;</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// clean up</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>outerHTML <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;emits a signup event when valid&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Navbar<span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> signup <span class="token operator">=</span> wrapper<span class="token punctuation">.</span><span class="token function">getComponent</span><span class="token punctuation">(</span>Signup<span class="token punctuation">)</span>
  <span class="token keyword">await</span> signup<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token string">&#39;valid_username&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> signup<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;form&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;submit.prevent&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>signup<span class="token punctuation">.</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>signup<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;valid_username&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Crea un <em>teleport target</em> con <code>document.createElement</code>.</li><li>Encuentre componentes teletransportados usando <code>getComponent</code> o <code>findComponent</code> que operan en el nivel de Virtual DOM.</li></ul>`,32),o=[e];function c(l,u,i,r,k,d){return a(),s("div",null,o)}var v=n(p,[["render",c]]);export{m as __pageData,v as default};
