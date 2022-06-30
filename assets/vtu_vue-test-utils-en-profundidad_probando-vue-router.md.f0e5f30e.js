import{_ as n,c as s,o as a,a as t}from"./app.7cdb76e5.js";const g='{"title":"Probando Vue Router","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usar un Enrutador Simulado","slug":"usar-un-enrutador-simulado"},{"level":2,"title":"Usar un Enrutador Real","slug":"usar-un-enrutador-real"},{"level":2,"title":"Uso de un enrutador simulado con la Composition API","slug":"uso-de-un-enrutador-simulado-con-la-composition-api"},{"level":2,"title":"Usando un enrutador real con la Composition API","slug":"usando-un-enrutador-real-con-la-composition-api"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vtu/vue-test-utils-en-profundidad/probando-vue-router.md"}',p={},o=t(`<h1 id="probando-vue-router" tabindex="-1">Probando Vue Router <a class="header-anchor" href="#probando-vue-router" aria-hidden="true">#</a></h1><p>Este art\xEDculo presentar\xE1 dos formas de probar una aplicaci\xF3n usando Vue Router:</p><ul><li>Usar el enrutador Vue real, que es m\xE1s parecido a la producci\xF3n pero tambi\xE9n puede generar complejidad al probar aplicaciones m\xE1s grandes</li><li>Usar un enrutador simulado, lo que permite un control m\xE1s detallado del entorno de prueba.</li></ul><p>Tenga en cuenta que Vue Test Utils no proporciona ninguna funci\xF3n especial para ayudar con la prueba de componentes que dependen de Vue Router.</p><h2 id="usar-un-enrutador-simulado" tabindex="-1">Usar un Enrutador Simulado <a class="header-anchor" href="#usar-un-enrutador-simulado" aria-hidden="true">#</a></h2><p>Puede usar un enrutador simulado para evitar preocuparse por los detalles de implementaci\xF3n de Vue Router en sus pruebas unitarias.</p><p>En lugar de usar una instancia real de Vue Router, podemos crear una versi\xF3n simulada que solo implemente las funciones que nos interesan. Podemos hacer esto usando una combinaci\xF3n de <code>vi.mock</code> (si est\xE1 usando Vitest) y <code>global.components</code>.</p><p>Cuando nos burlamos de una dependencia, normalmente es porque <strong>no estamos interesados en probar su comportamiento</strong>. No queremos probar que hacer click en <code>&lt;router-link&gt;</code> navega a la p\xE1gina correcta, \xA1por supuesto que s\xED! Sin embargo, podr\xEDamos estar interesados en asegurarnos de que <code>&lt;a&gt;</code> tenga el atributo correcto.</p><p>\xA1Veamos un ejemplo m\xE1s realista! Este componente muestra un bot\xF3n que redirigir\xE1 a un usuario autenticado a la p\xE1gina de edici\xF3n de publicaci\xF3n (seg\xFAn los par\xE1metros de ruta actuales). Un usuario no autenticado debe ser redirigido a una ruta <code>/404</code>.</p><div class="language-js"><pre><code><span class="token keyword">const</span> Component <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;button @click=&quot;redirect&quot;&gt;Click to Edit&lt;/button&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;isAuthenticated&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">redirect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isAuthenticated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/posts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Podr\xEDamos usar un enrutador real, luego navegar a la ruta correcta para este componente, luego, despu\xE9s de hacer click en el bot\xF3n, afirmar que se muestra la p\xE1gina correcta... sin embargo, esta es una gran cantidad de configuraci\xF3n para una prueba relativamente simple. En esencia, la prueba que queremos escribir es &quot;si est\xE1 autenticado, redirigir a X, de lo contrario, redirigir a Y&quot;. Veamos c\xF3mo podr\xEDamos lograr esto burl\xE1ndonos del enrutamiento usando la propiedad <code>global.mocks</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> Component <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;allows authenticated user to edit a post&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> mockRoute <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> mockRouter <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">push</span><span class="token operator">:</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Component<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">isAuthenticated</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">mocks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">$route</span><span class="token operator">:</span> mockRoute<span class="token punctuation">,</span>
        <span class="token literal-property property">$router</span><span class="token operator">:</span> mockRouter
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>mockRouter<span class="token punctuation">.</span>push<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>mockRouter<span class="token punctuation">.</span>push<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token string">&#39;/posts/1/edit&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;redirect an unauthenticated user to 404&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> mockRoute <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> mockRouter <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">push</span><span class="token operator">:</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Component<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">isAuthenticated</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">mocks</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">$route</span><span class="token operator">:</span> mockRoute<span class="token punctuation">,</span>
        <span class="token literal-property property">$router</span><span class="token operator">:</span> mockRouter
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>mockRouter<span class="token punctuation">.</span>push<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>mockRouter<span class="token punctuation">.</span>push<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Usamos <code>global.mocks</code> para proporcionar las dependencias necesarias (<code>this.$route</code> y <code>this.$router</code>) para establecer un estado ideal para cada prueba.</p><p>Entonces pudimos usar <code>vi.fn()</code> para monitorear cu\xE1ntas veces, y con qu\xE9 argumentos, se llam\xF3 a <code>this.$router.push</code>. \xA1Lo mejor de todo es que no tenemos que lidiar con la complejidad o las advertencias de Vue Router en nuestra prueba! Solo nos preocupamos por probar la l\xF3gica de la aplicaci\xF3n.</p><div class="tip custom-block"><p class="custom-block-title">CONSEJO</p><p>Es posible que desee probar todo el sistema de forma integral. Podr\xEDa considerar un marco como <a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer">Cypress</a> para pruebas completas del sistema utilizando un navegador real.</p></div><h2 id="usar-un-enrutador-real" tabindex="-1">Usar un Enrutador Real <a class="header-anchor" href="#usar-un-enrutador-real" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">Recordatorio</p><p>Para probar ejemplos con el <a href="https://router.vuejs.org/installation.html" target="_blank" rel="noopener noreferrer">VueRouter</a> real es necesario tenerlo instalado:</p><div class="language-"><pre><code>npm i vue-router@4
</code></pre></div></div><p>Ahora que hemos visto c\xF3mo usar un enrutador simulado, echemos un vistazo al uso del Vue Router real.</p><p>Vamos a crear una aplicaci\xF3n de blogs b\xE1sica que use Vue Router. Las publicaciones se enumeran en la ruta <code>/posts</code>:</p><div class="language-js"><pre><code><span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;router-link to=&quot;/posts&quot;&gt;Go to posts&lt;/router-link&gt;
    &lt;router-view /&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Posts <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;h1&gt;Posts&lt;/h1&gt;
    &lt;ul&gt;
      &lt;li v-for=&quot;post in posts&quot; :key=&quot;post.id&quot;&gt;
        {{ post.name }}
      &lt;/li&gt;
    &lt;/ul&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">posts</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Testing Vue Router&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>La ra\xEDz de la aplicaci\xF3n muestra un <code>&lt;router-link&gt;</code> que conduce a <code>/posts</code>, donde enumeramos las publicaciones.</p><p>El enrutador real se ve as\xED. Tenga en cuenta que estamos exportando las rutas por separado de la ruta, de modo que podamos crear una instancia de un nuevo enrutador para cada prueba individual m\xE1s adelante.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;Welcome to the blogging app&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/posts&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> Posts
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">history</span><span class="token operator">:</span> <span class="token function">createWebHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  routes
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>La mejor manera de ilustrar c\xF3mo probar una aplicaci\xF3n usando Vue Router es dejar que las advertencias nos gu\xEDen. La siguiente prueba m\xEDnima es suficiente para ponernos en marcha:</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Posts <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;routing&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome to the blogging app&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>La prueba falla. Tambi\xE9n imprime dos advertencias:</p><div class="language-"><pre><code>console.warn node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:39
  [Vue warn]: Failed to resolve component: router-link

console.warn node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:39
  [Vue warn]: Failed to resolve component: router-view
</code></pre></div><p>No se encuentran los componentes <code>&lt;router-link&gt;</code> y <code>&lt;router-view&gt;</code>. \xA1Necesitamos instalar Vue Router! Dado que Vue Router es un complemento, lo instalamos usando la opci\xF3n de montaje <code>global.plugins</code>:</p><div class="language-js"><div class="highlight-lines"><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Posts <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;routing&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>router<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome to the blogging app&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Esas dos advertencias ya no est\xE1n, pero ahora tenemos otra advertencia:</p><div class="language-"><pre><code>console.warn node_modules/vue-router/dist/vue-router.cjs.js:225
  [Vue Router warn]: Unexpected error when starting the router: TypeError: Cannot read property &#39;_history&#39; of null
</code></pre></div><p>Aunque no est\xE1 del todo claro en la advertencia, est\xE1 relacionado con el hecho de que <strong>Vue Router 4 maneja el enrutamiento de forma as\xEDncrona</strong>.</p><p>Vue Router proporciona una funci\xF3n <code>isReady</code> que nos dice cu\xE1ndo el enrutador est\xE1 listo. Luego podemos usar <code>await</code> para asegurarnos de que se haya realizado la navegaci\xF3n inicial.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Posts <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;routing&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>

  <span class="token comment">// After this line, router is ready</span>
  <span class="token keyword">await</span> router<span class="token punctuation">.</span><span class="token function">isReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// omitted for brevity ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome to the blogging app&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>\xA1La prueba ahora est\xE1 pasando! Fue bastante trabajo, pero ahora nos aseguramos de que la aplicaci\xF3n navegue correctamente a la ruta inicial.</p><p>Ahora naveguemos a <code>/posts</code> y asegur\xE9monos de que el enrutamiento funcione como se esperaba:</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Posts <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;routing&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>

  <span class="token comment">// After this line, router is ready</span>
  <span class="token keyword">await</span> router<span class="token punctuation">.</span><span class="token function">isReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// omitted for brevity ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome to the blogging app&#39;</span><span class="token punctuation">)</span>
    
  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Testing Vue Router&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Nuevamente, otro error algo cr\xEDptico:</p><div class="language-"><pre><code>console.warn node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:39
  [Vue warn]: Unhandled error during execution of native event handler
    at &lt;RouterLink to=&quot;/posts&quot; &gt;

console.error node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:211
  TypeError: Cannot read property &#39;_history&#39; of null
</code></pre></div><p>Nuevamente, debido a la nueva naturaleza as\xEDncrona de Vue Router 4, necesitamos <code>await</code> para que se complete el enrutamiento antes de hacer cualquier afirmaci\xF3n.</p><p>En este caso, sin embargo, no hay un enlace <em>hasNavigated</em> en el que podamos esperar. Una alternativa es utilizar la funci\xF3n <code>flushPromises</code> exportada desde Vue Test Utils:</p><div class="language-js"><div class="highlight-lines"><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount<span class="token punctuation">,</span> flushPromises <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Posts <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;routing&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>

  <span class="token comment">// After this line, router is ready</span>
  <span class="token keyword">await</span> router<span class="token punctuation">.</span><span class="token function">isReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token comment">// omitted for brevity ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome to the blogging app&#39;</span><span class="token punctuation">)</span>
    
  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> <span class="token function">flushPromises</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Testing Vue Router&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p><em>Finalmente</em> pasa. \xA1Estupendo! Sin embargo, todo esto es muy manual, y esto es para una aplicaci\xF3n peque\xF1a y trivial. Esta es la raz\xF3n por la que usar un enrutador simulado es un enfoque com\xFAn cuando se prueban componentes de Vue usando Vue Test Utils. En caso de que prefiera seguir usando un enrutador real, tenga en cuenta que cada prueba debe usar su propia instancia del enrutador de la siguiente manera:</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount<span class="token punctuation">,</span> flushPromises <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;router-link to=&quot;/posts&quot;&gt;Go to posts&lt;/router-link&gt;
    &lt;router-view /&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> Posts <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;h1&gt;Posts&lt;/h1&gt;
    &lt;ul&gt;
      &lt;li v-for=&quot;post in posts&quot; :key=&quot;post.id&quot;&gt;
        {{ post.name }}
      &lt;/li&gt;
    &lt;/ul&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">posts</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Testing Vue Router&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;Welcome to the blogging app&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/posts&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> Posts
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> router<span class="token punctuation">;</span>
<span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">history</span><span class="token operator">:</span> <span class="token function">createWebHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span> routes<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;routing&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>

  <span class="token comment">// After this line, router is ready</span>
  <span class="token keyword">await</span> router<span class="token punctuation">.</span><span class="token function">isReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>router<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome to the blogging app&#39;</span><span class="token punctuation">)</span>
  
  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> <span class="token function">flushPromises</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Testing Vue Router&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="uso-de-un-enrutador-simulado-con-la-composition-api" tabindex="-1">Uso de un enrutador simulado con la Composition API <a class="header-anchor" href="#uso-de-un-enrutador-simulado-con-la-composition-api" aria-hidden="true">#</a></h2><p>Vue router 4 permite trabajar con el enrutador y la ruta dentro de la funci\xF3n de configuraci\xF3n con la Composition API.</p><p>Considere el mismo componente de demostraci\xF3n reescrito usando la Composition API.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useRouter<span class="token punctuation">,</span> useRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> Component <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;button @click=&quot;redirect&quot;&gt;Click to Edit&lt;/button&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;isAuthenticated&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">setup</span> <span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">useRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token function">useRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token function-variable function">redirect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>props<span class="token punctuation">.</span>isAuthenticated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/posts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      redirect
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Esta vez, para probar el componente, usaremos la capacidad de Vitest para simular un recurso importado, <code>vue-router</code> y simular tanto el enrutador como la ruta directamente.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount<span class="token punctuation">,</span> flushPromises <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useRouter<span class="token punctuation">,</span> useRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> Component <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

vi<span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token string">&#39;vue-router&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">useRoute</span><span class="token operator">:</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">useRouter</span><span class="token operator">:</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function-variable function">push</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;allows authenticated user to edit a post&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  useRoute<span class="token punctuation">.</span><span class="token function">mockImplementationOnce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> push <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  useRouter<span class="token punctuation">.</span><span class="token function">mockImplementationOnce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    push
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Component<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">isAuthenticated</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;router-link&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;router-view&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// Stubs for router-link and router-view in case they&#39;re rendered in your template</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>push<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>push<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token string">&#39;/posts/1/edit&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;redirect an unauthenticated user to 404&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  useRoute<span class="token punctuation">.</span><span class="token function">mockImplementationOnce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> push <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  useRouter<span class="token punctuation">.</span><span class="token function">mockImplementationOnce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    push
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Component<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">isAuthenticated</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;router-link&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;router-view&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// Stubs for router-link and router-view in case they&#39;re rendered in your template</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>push<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>push<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="usando-un-enrutador-real-con-la-composition-api" tabindex="-1">Usando un enrutador real con la Composition API <a class="header-anchor" href="#usando-un-enrutador-real-con-la-composition-api" aria-hidden="true">#</a></h2><p>El uso de un enrutador real con la Composition API funciona igual que el uso de un enrutador real con la Options API. Tenga en cuenta que, al igual que ocurre con la Options API, se considera una buena pr\xE1ctica crear una instancia de un nuevo objeto de enrutador para cada prueba, en lugar de importar el enrutador directamente desde su aplicaci\xF3n.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount<span class="token punctuation">,</span> flushPromises <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter<span class="token punctuation">,</span> createWebHistory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useRouter<span class="token punctuation">,</span> useRoute <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>

<span class="token keyword">const</span> Component <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;button @click=&quot;redirect&quot;&gt;Click to Edit&lt;/button&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;isAuthenticated&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function">setup</span> <span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">useRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token function">useRoute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token function-variable function">redirect</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>      
      <span class="token keyword">if</span> <span class="token punctuation">(</span>props<span class="token punctuation">.</span>isAuthenticated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/posts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      redirect
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;Welcome to the blogging app&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/posts/:id/edit&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> router<span class="token punctuation">;</span>

<span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">history</span><span class="token operator">:</span> <span class="token function">createWebHistory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    routes<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> router<span class="token punctuation">.</span><span class="token function">isReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;allows not authenticated user to edit a post&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Component<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">isAuthenticated</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>      
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>router<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> pushSpy <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">spyOn</span><span class="token punctuation">(</span>router<span class="token punctuation">,</span> <span class="token string">&#39;push&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>pushSpy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>pushSpy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;allows authenticated user to edit a post&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Component<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">isAuthenticated</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span>     
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>router<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> pushSpy <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">spyOn</span><span class="token punctuation">(</span>router<span class="token punctuation">,</span> <span class="token string">&#39;push&#39;</span><span class="token punctuation">)</span>
  
  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>pushSpy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>pushSpy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span><span class="token string">&#39;/posts/1/edit&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Para aquellos que prefieren un enfoque no manual, la biblioteca <a href="https://github.com/posva/vue-router-mock" target="_blank" rel="noopener noreferrer">vue-router-mock</a> creada por Posva tambi\xE9n est\xE1 disponible como alternativa.</p><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Puede usar una instancia de enrutador real en sus pruebas.</li><li>Sin embargo, hay algunas advertencias: Vue Router 4 es as\xEDncrono y debemos tenerlo en cuenta al escribir pruebas.</li><li>Para aplicaciones m\xE1s complejas, considere simular la dependencia del enrutador y conc\xE9ntrese en probar la l\xF3gica subyacente.</li><li>Utilice la funcionalidad de creaci\xF3n de <em>stubbing/mocking</em> de su ejecutor de pruebas siempre que sea posible.</li><li>Use <code>global.mocks</code> para simular dependencias globales, como <code>this.$route</code> y <code>this.$router</code>.</li></ul>`,56),e=[o];function c(u,l,r,i,k,d){return a(),s("div",null,e)}var y=n(p,[["render",c]]);export{g as __pageData,y as default};
