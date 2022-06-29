import{_ as n,c as s,o as a,a as e}from"./app.9b0c39a4.js";const g='{"title":"Entorno de prueba","description":"","frontmatter":{},"headers":[{"level":2,"title":"Crear proyecto con Vite","slug":"crear-proyecto-con-vite"},{"level":2,"title":"Instalar Vitest","slug":"instalar-vitest"},{"level":2,"title":"Probar el Entorno","slug":"probar-el-entorno"}],"relativePath":"vitest/entorno-de-prueba.md"}',t={},o=e(`<h1 id="entorno-de-prueba" tabindex="-1">Entorno de prueba <a class="header-anchor" href="#entorno-de-prueba" aria-hidden="true">#</a></h1><h2 id="crear-proyecto-con-vite" tabindex="-1">Crear proyecto con Vite <a class="header-anchor" href="#crear-proyecto-con-vite" aria-hidden="true">#</a></h2><p>Para preparar su proyecto y el entorno de prueba, empezaremos creando un nuevo proyecto con <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer">Vite</a>. Ejecute lo siguiente en la l\xEDnea de comando:</p><div class="language-"><pre><code>npm init vite@latest
</code></pre></div><p>Seguidamente aparecer\xE1 el sieguiente di\xE1logo:</p><div class="language-"><pre><code>Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) 
</code></pre></div><p>Luego de aceptar para continuar, nos preguntar\xE1:</p><div class="language-"><pre><code>? Project name: \u203A vite-project
</code></pre></div><p>Si lo desea, cambie el nombre del proyecto <code>vite-project</code>, en nuestro caso se llamar\xE1 as\xED: <code>vue-tdd</code></p><div class="language-"><pre><code>? Project name: \u203A vue-tdd
</code></pre></div><p>Inmediatamente preguntar\xE1:</p><div class="language-"><pre><code>? Select a framework: \u203A - Use arrow-keys. Return to submit.
\u276F   vanilla
    vue
    react
    preact
    lit
    svelte
</code></pre></div><p>Con la decla de desplazamiento hacia abajo seleccione <code>vue</code> y presione <code>enter</code>.</p><div class="language-"><pre><code>? Select a framework: \u203A - Use arrow-keys. Return to submit.
    vanilla
\u276F   vue
    react
    preact
    lit
    svelte
</code></pre></div><p>Preguntar\xE1 si deseamos usar Vue con TypeScrip. Por lo que enfocados en el prop\xF3sito de aprender sobre TDD usaremos simplemente Vue.</p><div class="language-"><pre><code>? Select a variant: \u203A - Use arrow-keys. Return to submit.
\u276F   vue
    vue-ts
</code></pre></div><p>Entonces, aparecer\xE1 lo siguiente:</p><div class="language-"><pre><code>Done. Now run:

  cd vue-tdd
  npm install
  npm run dev
</code></pre></div><p>Ya est\xE1 creado el proyecto con Vite, solo hace falta ejecutar las 3 instrucciones anteriores. Llegado a este punto, el archivo <code>package.json</code> lucira se la siguiente manera:</p><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vue-tdd&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;private&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite build&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;preview&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite preview&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.2.25&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;@vitejs/plugin-vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.3.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;vite&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.9.5&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>El archivo <code>vite.config.js</code> lucira as\xED:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>

<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="instalar-vitest" tabindex="-1">Instalar Vitest <a class="header-anchor" href="#instalar-vitest" aria-hidden="true">#</a></h2><p>Para instalar <a href="https://vitest.dev/guide/" target="_blank" rel="noopener noreferrer">Vitest</a> hay que ejecutar la siguiente l\xEDnea de comando:</p><div class="language-"><pre><code>npm i -D vitest
</code></pre></div><p>Despues de instalar Vitest hay que agregar la siguiente l\xEDnea en el archivo <code>package.json</code> para ejecutar las pruebas:</p><div class="language-json"><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vue-tdd&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;private&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite build&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;preview&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite preview&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vitest&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;coverage&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vitest --coverage&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^3.2.25&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;@vitejs/plugin-vue&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.3.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;vite&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.9.5&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;vitest&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^0.10.0&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Solo falta entonar el proyecto realizando los siguientes cambios en el archivo <code>vite.config.js</code></p><div class="language-js"><div class="highlight-lines"><div class="highlighted">\xA0</div><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">/// &lt;reference types=&quot;vitest&quot; /&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vite&#39;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&#39;@vitejs/plugin-vue&#39;</span>
<span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">&#39;path&#39;</span>

<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;@&#39;</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./src&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">globals</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">environment</span><span class="token operator">:</span> <span class="token string">&quot;jsdom&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="probar-el-entorno" tabindex="-1">Probar el Entorno <a class="header-anchor" href="#probar-el-entorno" aria-hidden="true">#</a></h2><p><strong>Comencemos</strong> escribiendo una prueba para una funci\xF3n hipot\xE9tica que suma dos n\xFAmeros.</p><p>Dentro de la carpeta raiz del proyecto, creemos la carpeta <code>tests</code>. Aqu\xED colocaremos todos nuestros archivos de pruebas. Nuestra estructura de carpetas deber\xEDa lucir de la siguiente manera:</p><div class="language-"><pre><code>vue-tdd/
\u251C\u2500\u2500 node_modules/
\u251C\u2500\u2500 public/
\u251C\u2500\u2500 src/
\u2514\u2500\u2500 tests/
</code></pre></div><p>Creemos un archivo <code>sum.js</code> dentro de la carpeta del proyecto (<code>src/</code>):</p><div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> sum<span class="token punctuation">;</span>
</code></pre></div><p>Luego, cree un archivo llamado <code>sum.test.js</code> dentro de la carpeta para las pruebas (<code>tests/</code>). Esto contendr\xE1 nuestra prueba real:</p><div class="language-js"><pre><code><span class="token keyword">import</span> sum <span class="token keyword">from</span> <span class="token string">&#39;@/sum&#39;</span><span class="token punctuation">;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;adds 1 + 2 to equal 3&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Ejecute en su terminal:</p><div class="language-"><pre><code>npm run test
</code></pre></div><p>No se sorprenda si en la terminal aparece un di\xE1logo como el siguiente:</p><div class="language-"><pre><code>&gt; vue-tdd@0.0.0 test
&gt; vitest

 MISSING DEP  Can not find dependency &#39;jsdom&#39;
                                                                                                                                     
? Do you want to install jsdom? \u203A (y/N)
</code></pre></div><p>La terminal nos dice que dentro de nuestros paquetes no se encuentra <code>jsdom</code>. Recordemos que en el archivo <code>config.vite.js</code> declaramos una secci\xF3n llamada <code>test</code> la cual contiene el valor <code>&quot;jsdom&quot;</code> establecido en la propiedad <code>environment</code>.</p><p><a href="https://www.npmjs.com/package/jsdom" target="_blank" rel="noopener noreferrer">jsdom</a> es una implementaci\xF3n de JavaScript puro de muchos est\xE1ndares web, para usar con Node.js. En general, el objetivo del proyecto es emular lo suficiente de un subconjunto de un navegador web para que sea \xFAtil para probar y extraer aplicaciones web del mundo real.</p><p>Por las razones antes mencionadas, dig\xE1mosle a la maquina que s\xED queremos instalar <code>jsdom</code> y esperemos que efectue su instalaci\xF3n.</p><p>Una vez instalado <code>jsdom</code> la terminal nos pedir\xE1 que volvamos a ejecutar el comando para comenzar. Es decir, <code>npm run test</code>.</p><p>Una vez hecho esto, en pocos segundos aparecer\xE1 en su terminal lo siguiente:</p><div class="language-"><pre><code>&gt; vue-tdd@0.0.0 test
&gt; vitest

 WATCH  /vue-tdd

 \u221A tests/sum.test.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  2.12s (in thread 3ms, 64979.60%)


 PASS  Waiting for file changes...
       press h to show help, press q to quit
</code></pre></div><p>Excelente, ya realizamos nuestra primera prueba, ahora es momento de profundizar sobre el tema.</p><div class="warning custom-block"><p class="custom-block-title">Advertencia</p><p>Para probar algunos ejemplos relacionados con <a href="https://developer.mozilla.org/es/docs/Web/HTTP/Messages" target="_blank" rel="noopener noreferrer">Mensajes HTTP</a> es necesario instalar <a href="https://axios-http.com/docs/intro" target="_blank" rel="noopener noreferrer">Axios</a>:</p><div class="language-"><pre><code>npm i axios
</code></pre></div></div>`,49),p=[o];function r(c,l,i,u,d,k){return a(),s("div",null,p)}var m=n(t,[["render",r]]);export{g as __pageData,m as default};
