import{_ as n,c as s,o as a,a as t}from"./app.2425fff2.js";const g='{"title":"Talones y Montaje Superficial","description":"","frontmatter":{},"headers":[{"level":2,"title":"Talonando un solo componente hijo","slug":"talonando-un-solo-componente-hijo"},{"level":2,"title":"Talonar todos los componentes secundarios","slug":"talonar-todos-los-componentes-secundarios"},{"level":2,"title":"Talonar todos los componentes secundarios con excepciones","slug":"talonar-todos-los-componentes-secundarios-con-excepciones"},{"level":2,"title":"Talonando un componente as\xEDncrono","slug":"talonando-un-componente-asincrono"},{"level":2,"title":"Ranuras predeterminadas y shallow","slug":"ranuras-predeterminadas-y-shallow"},{"level":2,"title":"mount, shallow y stubs: \xBFcu\xE1l y cu\xE1ndo?","slug":"mount-shallow-y-stubs-\xBFcual-y-cuando"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vtu/vue-test-utils-en-profundidad/talones-y-montaje-superficial.md"}',o={},p=t(`<h1 id="talones-y-montaje-superficial" tabindex="-1">Talones y Montaje Superficial <a class="header-anchor" href="#talones-y-montaje-superficial" aria-hidden="true">#</a></h1><p>Vue Test Utils proporciona algunas funciones avanzadas para talonar componentes. Un <em>stub</em> es donde reemplazas una implementaci\xF3n existente de un componente personalizado con un componente ficticio que no hace nada en absoluto, lo que puede simplificar una prueba compleja. Veamos un ejemplo.</p><h2 id="talonando-un-solo-componente-hijo" tabindex="-1">Talonando un solo componente hijo <a class="header-anchor" href="#talonando-un-solo-componente-hijo" aria-hidden="true">#</a></h2><p>Un ejemplo com\xFAn es cuando desea probar algo en un componente que aparece muy alto en la jerarqu\xEDa de componentes.</p><p>En este ejemplo, tenemos una <code>&lt;App&gt;</code> que muestra un mensaje, as\xED como un componente <code>FetchDataFromApi</code> que realiza una llamada a la API y muestra su resultado.</p><div class="language-js"><pre><code><span class="token keyword">const</span> FetchDataFromApi <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;FetchDataFromApi&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;{{ result }}&lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/api/info&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>result <span class="token operator">=</span> res<span class="token punctuation">.</span>data
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">result</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    FetchDataFromApi
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;h1&gt;Welcome to Vue.js 3&lt;/h1&gt;
    &lt;fetch-data-from-api /&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>No queremos hacer la llamada a la API en esta prueba en particular, solo queremos afirmar que el mensaje se muestra. En este caso, podr\xEDamos usar los <code>stubs</code>, que aparecen en la opci\xF3n de montaje <code>global</code>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> FetchDataFromApi <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;stubs component with custom template&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">FetchDataFromApi</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;span /&gt;&#39;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">// &lt;h1&gt;Welcome to Vue.js 3&lt;/h1&gt;&lt;span&gt;&lt;/span&gt;</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome to Vue.js 3&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Observe que la plantilla muestra <code>&lt;span&gt;&lt;/span&gt;</code> donde estaba <code>&lt;fetch-data-from-api /&gt;</code>. Lo reemplazamos con un <em>stub</em> - en este caso, proporcionamos nuestra propia implementaci\xF3n al pasar un <code>template</code>.</p><p>Tambi\xE9n puede obtener un resguardo predeterminado, en lugar de proporcionar el suyo propio:</p><div class="language-js"><div class="highlight-lines"><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;stubs component&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">FetchDataFromApi</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">/*
    &lt;h1&gt;Welcome to Vue.js 3&lt;/h1&gt;
    &lt;fetch-data-from-api-stub&gt;&lt;/fetch-data-from-api-stub&gt;
  */</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome to Vue.js 3&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Esto talonar\xE1 <em>todos</em> los componentes <code>&lt;FetchDataFromApi /&gt;</code> en todo el \xE1rbol de representaci\xF3n, independientemente del nivel en el que aparezcan. Por eso est\xE1 en la opci\xF3n de montaje <code>global</code>.</p><div class="tip custom-block"><p class="custom-block-title">CONSEJO</p><p>Para talonar, puede usar la clave en <code>components</code> o el nombre de su componente. Si ambos se proporcionan en <code>global.stubs</code>, la clave se usar\xE1 primero.</p></div><h2 id="talonar-todos-los-componentes-secundarios" tabindex="-1">Talonar todos los componentes secundarios <a class="header-anchor" href="#talonar-todos-los-componentes-secundarios" aria-hidden="true">#</a></h2><p>A veces, es posible que desee talonar <em>todos</em> los componentes personalizados. Por ejemplo, podr\xEDa tener un componente como este:</p><div class="language-js"><pre><code><span class="token keyword">const</span> ComplexComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> ComplexA<span class="token punctuation">,</span> ComplexB<span class="token punctuation">,</span> ComplexC <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;h1&gt;Welcome to Vue.js 3&lt;/h1&gt;
    &lt;ComplexA /&gt;
    &lt;ComplexB /&gt;
    &lt;ComplexC /&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>Imagina que cada uno de los <code>&lt;Complex&gt;</code> hace algo complicado, y solo te interesa probar que <code>&lt;h1&gt;</code> est\xE1 emitiendo el saludo correcto. Podr\xEDas hacer algo como:</p><div class="language-js"><pre><code><span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>ComplexComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">ComplexA</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">ComplexB</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">ComplexC</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Pero eso es muy repetitivo. VTU tiene una opci\xF3n de montaje superficial que desconectar\xE1 autom\xE1ticamente todos los componentes secundarios:</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> ComplexA <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token comment">/* Simulating complex component */</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> ComplexB <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token comment">/* Simulating complex component */</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> ComplexC <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token comment">/* Simulating complex component */</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> ComplexComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;shallow stubs out all child components&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>ComplexComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">shallow</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">/*
    &lt;h1&gt;Welcome to Vue.js 3&lt;/h1&gt;
    &lt;complex-a-stub&gt;&lt;/complex-a-stub&gt;
    &lt;complex-b-stub&gt;&lt;/complex-b-stub&gt;
    &lt;complex-c-stub&gt;&lt;/complex-c-stub&gt;
  */</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><div class="tip custom-block"><p class="custom-block-title">CONSEJO</p><p>Si us\xF3 VTU V1, puede recordar esto como <code>shallowMount</code>. Ese m\xE9todo todav\xEDa est\xE1 disponible, es lo mismo que escribir <code>shallow: true</code>.</p></div><h2 id="talonar-todos-los-componentes-secundarios-con-excepciones" tabindex="-1">Talonar todos los componentes secundarios con excepciones <a class="header-anchor" href="#talonar-todos-los-componentes-secundarios-con-excepciones" aria-hidden="true">#</a></h2><p>A veces desea talonar <em>todos</em> los componentes personalizados, <em>excepto</em> uno espec\xEDfico. Consideremos un ejemplo:</p><div class="language-js"><pre><code><span class="token keyword">const</span> ComplexA <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;h2&gt;Hello from real component!&lt;/h2&gt;&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> ComplexComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> ComplexA<span class="token punctuation">,</span> ComplexB<span class="token punctuation">,</span> ComplexC <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;h1&gt;Welcome to Vue.js 3&lt;/h1&gt;
    &lt;ComplexA /&gt;
    &lt;ComplexB /&gt;
    &lt;ComplexC /&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>Mediante el uso de la opci\xF3n de montaje <code>shallow</code> talonar\xE1 autom\xE1ticamente todos los componentes secundarios. Si queremos excluir expl\xEDcitamente el componente espec\xEDfico, podemos proporcionar su nombre en <code>stubs</code> con un valor establecido en <code>false</code>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> ComplexA <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> ComplexB <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token comment">/* Simulating complex component */</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> ComplexC <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token comment">/* Simulating complex component */</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> ComplexComponent <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;shallow allows opt-out of stubbing specific component&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>ComplexComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">shallow</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">ComplexA</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">/*
    &lt;h1&gt;Welcome to Vue.js 3&lt;/h1&gt;
    &lt;h2&gt;Hello from real component!&lt;/h2&gt;
    &lt;complex-b-stub&gt;&lt;/complex-b-stub&gt;
    &lt;complex-c-stub&gt;&lt;/complex-c-stub&gt;
  */</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="talonando-un-componente-asincrono" tabindex="-1">Talonando un componente as\xEDncrono <a class="header-anchor" href="#talonando-un-componente-asincrono" aria-hidden="true">#</a></h2><p>En caso de que desee talonar un componente as\xEDncrono, hay dos comportamientos. Por ejemplo, podr\xEDa tener componentes como este:</p><div class="language-js"><pre><code><span class="token comment">// AsyncComponent.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;AsyncComponent&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;span&gt;AsyncComponent&lt;/span&gt;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>El primer comportamiento es usar la clave definida en su componente que carga el componente as\xEDncrono. En este ejemplo, usamos la clave &quot;MyComponent&quot;. No es necesario usar <code>async/await</code> en el caso de prueba, porque el componente se desconect\xF3 antes de resolverse.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> defineAsyncComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">MyComponent</span><span class="token operator">:</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/AsyncComponent&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;MyComponent/&gt;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;stubs async component without resolving&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">MyComponent</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;my-component-stub&gt;&lt;/my-component-stub&gt;&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>El segundo comportamiento es usar el nombre del componente as\xEDncrono. En este ejemplo, usamos para nombrar &quot;AsyncComponent&quot;. Ahora es necesario usar <code>async/await</code>, porque el componente as\xEDncrono debe resolverse y luego puede desconectarse con el nombre definido en el componente as\xEDncrono.</p><p><strong>\xA1Aseg\xFArese de definir un nombre en su componente as\xEDncrono!</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount<span class="token punctuation">,</span> flushPromises <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> defineAsyncComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>    
    <span class="token literal-property property">AsyncComponent</span><span class="token operator">:</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/AsyncComponent&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;AsyncComponent/&gt;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;stubs async component with resolving&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>App<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">AsyncComponent</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> <span class="token function">flushPromises</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;async-component-stub&gt;&lt;/async-component-stub&gt;&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre></div><h2 id="ranuras-predeterminadas-y-shallow" tabindex="-1">Ranuras predeterminadas y <code>shallow</code> <a class="header-anchor" href="#ranuras-predeterminadas-y-shallow" aria-hidden="true">#</a></h2><p>Debido a que <code>shallow</code> talona todo el contenido de un componente, cualquier <code>&lt;slot&gt;</code> no se renderizar\xE1 cuando se utilice <code>shallow</code>. Si bien esto no es un problema en la mayor\xEDa de los casos, hay algunos escenarios en los que esto no es ideal.</p><div class="language-js"><pre><code><span class="token keyword">const</span> CustomButton <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;button&gt;
      &lt;slot /&gt;
    &lt;/button&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>Y podr\xEDas usarlo as\xED:</p><div class="language-js"><pre><code><span class="token keyword">const</span> AnotherApp <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;authenticated&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> CustomButton <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;custom-button&gt;
      &lt;div v-if=&quot;authenticated&quot;&gt;Log out&lt;/div&gt;
      &lt;div v-else&gt;Log in&lt;/div&gt;
    &lt;/custom-button&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>Si est\xE1 utilizando <code>shallow</code>, la ranura no se renderizar\xE1, ya que la funci\xF3n de renderizado en <code>&lt;custom-button /&gt;</code> est\xE1 desactivada. \xA1Eso significa que no podr\xE1 verificar que se represente el texto correcto!</p><p>Para este caso de uso, puede usar <code>config.renderStubDefaultSlot</code>, que representar\xE1 el contenido de la ranura predeterminada, incluso cuando se usa <code>shallow</code>:</p><div class="language-js"><div class="highlight-lines"><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> config<span class="token punctuation">,</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token keyword">const</span> CustomButton <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> AnotherApp <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// omitted for brevity ...</span>
<span class="token punctuation">}</span>

<span class="token function">beforeAll</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  config<span class="token punctuation">.</span>renderStubDefaultSlot <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">afterAll</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  config<span class="token punctuation">.</span>renderStubDefaultSlot <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;shallow with stubs 1&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>AnotherApp<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">authenticated</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">shallow</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Log out&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;shallow with stubs 2&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>AnotherApp<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">authenticated</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">shallow</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Log in&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Dado que este comportamiento es global, no <code>mount</code> por <code>mount</code>, debe recordar habilitarlo/deshabilitarlo antes y despu\xE9s de cada prueba.</p><div class="tip custom-block"><p class="custom-block-title">CONSEJO</p><p>Tambi\xE9n puede habilitar esto globalmente importando <code>config</code> en su archivo de configuraci\xF3n de prueba y configurando <code>renderStubDefaultSlot</code> en <code>true</code>. Desafortunadamente, debido a limitaciones t\xE9cnicas, este comportamiento no se extiende a otras ranuras que no sean la ranura predeterminada.</p></div><h2 id="mount-shallow-y-stubs-\xBFcual-y-cuando" tabindex="-1"><code>mount</code>, <code>shallow</code> y <code>stubs</code>: \xBFcu\xE1l y cu\xE1ndo? <a class="header-anchor" href="#mount-shallow-y-stubs-\xBFcual-y-cuando" aria-hidden="true">#</a></h2><p>Como regla general, <strong>cuanto m\xE1s se parezcan sus pruebas a la forma en que se usa su software</strong>, m\xE1s confianza le pueden brindar.</p><p>Las pruebas que usan <code>mount</code> representar\xE1n toda la jerarqu\xEDa de componentes, que es m\xE1s cercana a lo que el usuario experimentar\xE1 en un navegador real.</p><p>Por otro lado, las pruebas usando <code>shallow</code> se enfocan en un componente espec\xEDfico. <code>shallow</code> puede ser \xFAtil para probar componentes avanzados en completo aislamiento. Si solo tiene uno o dos componentes que no son relevantes para sus pruebas, considere usar <code>mount</code> en combinaci\xF3n con <code>stubs</code> en lugar de <code>shallow</code>. Cuanto m\xE1s talones, menos parecida a producci\xF3n se vuelve su prueba.</p><p>Tenga en cuenta que, ya sea que est\xE9 realizando un montaje completo o un renderizado superficial, las buenas pruebas se centran en las entradas (<code>props</code> e interacci\xF3n del usuario, como con el <code>trigger</code>) y las salidas (los elementos DOM que se renderizan y los eventos), no en los detalles de implementaci\xF3n.</p><p>Por lo tanto, independientemente del m\xE9todo de montaje que elija, le sugerimos que tenga en cuenta estas pautas.</p><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Uuse <code>global.stubs</code> para reemplazar un componente con uno ficticio para simplificar sus pruebas</li><li>Use <code>shallow: true</code> (o <code>shallowMount</code>) para talonar todos los componentes secundarios</li><li>Use <code>config.renderStubDefaultSlot</code> para representar el <code>&lt;slot&gt;</code> predeterminado para un componente talonado.</li></ul>`,52),e=[p];function c(l,u,r,i,k,d){return a(),s("div",null,e)}var b=n(o,[["render",c]]);export{g as __pageData,b as default};
