import{_ as n,c as a,o as s,a as t}from"./app.3b8232bf.js";const h='{"title":"Vuex Acciones","description":"","frontmatter":{},"headers":[{"level":2,"title":"Probando Acciones","slug":"probando-acciones"},{"level":2,"title":"Creando la Acci\xF3n","slug":"creando-la-accion"},{"level":2,"title":"Escribiendo la Prueba","slug":"escribiendo-la-prueba"},{"level":2,"title":"Prueba del Error de la API","slug":"prueba-del-error-de-la-api"},{"level":2,"title":"Mejoras","slug":"mejoras"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vth/vuex-acciones.md"}',o={},e=t(`<h1 id="vuex-acciones" tabindex="-1">Vuex Acciones <a class="header-anchor" href="#vuex-acciones" aria-hidden="true">#</a></h1><h2 id="probando-acciones" tabindex="-1">Probando Acciones <a class="header-anchor" href="#probando-acciones" aria-hidden="true">#</a></h2><p>Probar acciones de forma aislada es muy sencillo. Es muy similar a probar mutaciones de forma aislada; consulte <a href="./../vth/vuex-mutaciones.html">aqu\xED</a> para obtener m\xE1s informaci\xF3n sobre las pruebas de mutaciones. Probar acciones en el contexto de un componente es discutida correctamente <a href="./../vth/probando-vuex-en-componentes-mutaciones-y-acciones.html">aqu\xED</a>.</p><p>El c\xF3digo fuente de la prueba descrita en esta p\xE1gina se puede encontrar <a href="https://github.com/lmiller1990/vue-testing-handbook/blob/master/demo-app/tests/unit/actions.spec.js" target="_blank" rel="noopener noreferrer">aqu\xED</a>.</p><h2 id="creando-la-accion" tabindex="-1">Creando la Acci\xF3n <a class="header-anchor" href="#creando-la-accion" aria-hidden="true">#</a></h2><p>Escribiremos una acci\xF3n que siga un patr\xF3n Vuex com\xFAn:</p><ol><li>Hacer una llamada as\xEDncrona a una API</li><li>Hacer alg\xFAn procesamiento en los datos (opcional)</li><li>Cometer una mutaci\xF3n con el resultado como carga \xFAtil</li></ol><p>Esta es una acci\xF3n de <code>authenticate</code>, que env\xEDa un nombre de usuario y una contrase\xF1a a una API externa para verificar si coinciden. Luego, el resultado se usa para actualizar el estado al realizar una mutaci\xF3n <code>SET_AUTHENTICATED</code> con el resultado como carga \xFAtil.</p><div class="language-js"><pre><code><span class="token comment">// store/actions.js</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;axios&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> authenticated <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/api/authenticate&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      username<span class="token punctuation">,</span> password
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&quot;SET_AUTHENTICATED&quot;</span><span class="token punctuation">,</span> authenticated<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>La prueba de acci\xF3n debe afirmar:</p><ol><li>\xBFSe utiliz\xF3 el punto final de la API correcto?</li><li>\xBFLa carga \xFAtil es correcta?</li><li>Fue la mutaci\xF3n correcta cometida con el resultado</li></ol><p>Avancemos y escribamos la prueba, y dejemos que los mensajes de error nos gu\xEDen.</p><h2 id="escribiendo-la-prueba" tabindex="-1">Escribiendo la Prueba <a class="header-anchor" href="#escribiendo-la-prueba" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token keyword">import</span> actions <span class="token keyword">from</span> <span class="token string">&quot;@/store/actions.js&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;authenticate&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;authenticated a user&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> commit <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> username <span class="token operator">=</span> <span class="token string">&quot;alice&quot;</span>
    <span class="token keyword">const</span> password <span class="token operator">=</span> <span class="token string">&quot;password&quot;</span>

    <span class="token keyword">await</span> actions<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&quot;/api/authenticate&quot;</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>commit<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span>
      <span class="token string">&quot;SET_AUTHENTICATED&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Dado que <code>axios</code> es as\xEDncrono, para garantizar que Vitest espere a que finalice la prueba, debemos declararla como <code>async</code> y luego esperar la llamada a <code>actions.authenticate</code>. De lo contrario, la prueba terminar\xE1 antes de la afirmaci\xF3n <code>expect</code> y tendremos una prueba perenne - una prueba que nunca puede fallar.</p><p>Ejecutar la prueba anterior nos da el siguiente mensaje de falla:</p><div class="language-"><pre><code>FAIL  tests/unit/actions.spec.js
  \u25CF authenticate \u203A authenticated a user

    SyntaxError: The string did not match the expected pattern.

      at XMLHttpRequest.open (node_modules/jsdom/lib/jsdom/living/xmlhttprequest.js:482:15)
      at dispatchXhrRequest (node_modules/axios/lib/adapters/xhr.js:45:13)
      at xhrAdapter (node_modules/axios/lib/adapters/xhr.js:12:10)
      at dispatchRequest (node_modules/axios/lib/core/dispatchRequest.js:59:10)

</code></pre></div><p>Este error proviene de alg\xFAn lugar dentro de <code>axios</code>. Estamos haciendo una solicitud a <code>/api...</code>, y dado que estamos ejecutando en un entorno de prueba, ni siquiera hay un servidor para realizar una solicitud, por lo tanto, el error. Tampoco definimos la <code>url</code> o el <code>body</code> - lo haremos mientras resolvemos el error de <code>axios</code>.</p><p>Como estamos usando Vitest, podemos simular f\xE1cilmente la llamada API usando <code>vi.mock</code>. Usaremos un <code>axios</code> simulado en lugar del real, lo que nos dar\xE1 m\xE1s control sobre su comportamiento. Vitest proporciona <a href="https://jestjs.io/docs/es6-class-mocks" target="_blank" rel="noopener noreferrer">simulacros de clase ES6</a>, que son perfectos para simular <code>axios</code>.</p><p>El simulacro de <code>axios</code> se ve as\xED:</p><div class="language-js"><pre><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;axios&quot;</span>

<span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token keyword">let</span> body <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

axios<span class="token punctuation">.</span>post <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">_url<span class="token punctuation">,</span> _body</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> 
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      url <span class="token operator">=</span> _url
      body <span class="token operator">=</span> _body
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Guardamos la <code>url</code> y el <code>body</code> en las variables para poder afirmar que el punto final correcto est\xE1 recibiendo la carga \xFAtil correcta. Dado que en realidad no queremos llegar a un punto final real, resolvemos la promesa de inmediato, lo que simula una llamada API exitosa.</p><p>\xA1La prueba ahora produce una aprobaci\xF3n!</p><h2 id="prueba-del-error-de-la-api" tabindex="-1">Prueba del Error de la API <a class="header-anchor" href="#prueba-del-error-de-la-api" aria-hidden="true">#</a></h2><p>Solo probamos el caso en el que la llamada a la API tuvo \xE9xito. Es importante probar todos los resultados posibles. Escribamos una prueba para el caso en que ocurra un error. Esta vez, primero escribiremos la prueba, seguida de la implementaci\xF3n.</p><p>La prueba se puede escribir as\xED:</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;catches an error&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> mockError <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token keyword">await</span> <span class="token function">expect</span><span class="token punctuation">(</span>actions<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">commit</span><span class="token operator">:</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>rejects<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token string">&quot;API Error occurred.&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Necesitamos encontrar una manera de forzar el simulacro de <code>axios</code> para que arroje un error. Para eso est\xE1 la variable <code>mockError</code>. Actualice el simulacro de <code>axios</code> de esta manera:</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;axios&quot;</span>

<span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token keyword">let</span> body <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> mockError <span class="token operator">=</span> <span class="token boolean">false</span>

axios<span class="token punctuation">.</span>post <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">_url<span class="token punctuation">,</span> _body</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> 
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>mockError<span class="token punctuation">)</span> 
        <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      url <span class="token operator">=</span> _url
      body <span class="token operator">=</span> _body
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Vitest solo permitir\xE1 acceder a una variable fuera del alcance en un simulacro de clase ES6 si el nombre de la variable est\xE1 precedido por <code>mock</code>. Ahora podemos simplemente hacer <code>mockError = true</code> y <code>axios</code> arrojar\xE1 un error.</p><p>Ejecutar esta prueba nos da este error fallido:</p><div class="language-"><pre><code>FAIL  tests/unit/actions.spec.js
\u25CF authenticate \u203A catchs an error

  expect(function).toThrow(string)

  Expected the function to throw an error matching:
    &quot;API Error occurred.&quot;
  Instead, it threw:
    Mock error
</code></pre></div><p>Detect\xF3 con \xE9xito un error... pero no el que esper\xE1bamos. Actualice <code>authenticate</code> para arrojar el error que espera la prueba:</p><div class="language-js"><pre><code><span class="token comment">// store/actions.js</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;axios&quot;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> authenticated <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/api/authenticate&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        username<span class="token punctuation">,</span> password
      <span class="token punctuation">}</span><span class="token punctuation">)</span>

      <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&quot;SET_AUTHENTICATED&quot;</span><span class="token punctuation">,</span> authenticated<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&quot;API Error occurred.&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Ahora la prueba est\xE1 pasando. Aqu\xED el ejemplo completo:</p><div class="language-js"><pre><code><span class="token keyword">import</span> actions <span class="token keyword">from</span> <span class="token string">&quot;@/store/actions.js&quot;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&quot;axios&quot;</span>

<span class="token keyword">let</span> url <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token keyword">let</span> body <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">let</span> mockError <span class="token operator">=</span> <span class="token boolean">false</span>

axios<span class="token punctuation">.</span>post <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">_url<span class="token punctuation">,</span> _body</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> 
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>mockError<span class="token punctuation">)</span> 
        <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      url <span class="token operator">=</span> _url
      body <span class="token operator">=</span> _body
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;authenticate&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;authenticated a user&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> commit <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   
    
    <span class="token keyword">const</span> username <span class="token operator">=</span> <span class="token string">&quot;alice&quot;</span>
    <span class="token keyword">const</span> password <span class="token operator">=</span> <span class="token string">&quot;password&quot;</span>

    <span class="token keyword">await</span> actions<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&quot;/api/authenticate&quot;</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>commit<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span>
      <span class="token string">&quot;SET_AUTHENTICATED&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;catches an error&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    mockError <span class="token operator">=</span> <span class="token boolean">true</span>

    <span class="token keyword">await</span> <span class="token function">expect</span><span class="token punctuation">(</span>actions<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">commit</span><span class="token operator">:</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>rejects<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token string">&quot;API Error occurred.&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="mejoras" tabindex="-1">Mejoras <a class="header-anchor" href="#mejoras" aria-hidden="true">#</a></h2><p>Ahora ya sabe c\xF3mo probar acciones de forma aislada. Hay al menos una mejora potencial que se puede hacer, que es implementar el simulacro de <code>axios</code> como un <a href="https://jestjs.io/docs/manual-mocks" target="_blank" rel="noopener noreferrer">simulacro manual</a>. Esto implica crear un directorio <code>__mocks__</code> en el mismo nivel que <code>node_modules</code> e implementar el m\xF3dulo simulado all\xED. Al hacer esto, puede compartir la implementaci\xF3n simulada en todas sus pruebas. Vitest usar\xE1 autom\xE1ticamente una implementaci\xF3n simulada de <code>__mocks__</code>. Hay muchos ejemplos en el sitio web de Vitest y en Internet sobre c\xF3mo hacerlo. La refactorizaci\xF3n de esta prueba para usar un simulacro manual se deja como ejercicio para el lector.</p><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><p>Esta gu\xEDa discuti\xF3:</p><ul><li>Usando simulacros de clase Vitest ES6</li><li>Probando los casos de \xE9xito y fracaso de una acci\xF3n</li></ul><p>El c\xF3digo fuente de la prueba descrita en esta p\xE1gina se puede encontrar <a href="https://github.com/lmiller1990/vue-testing-handbook/blob/master/demo-app/tests/unit/actions.spec.js" target="_blank" rel="noopener noreferrer">aqu\xED</a>.</p>`,42),p=[e];function c(u,l,r,i,k,d){return s(),a("div",null,p)}var b=n(o,[["render",c]]);export{h as __pageData,b as default};
