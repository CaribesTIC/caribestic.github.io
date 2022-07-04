import{_ as n,c as s,o as a,a as t}from"./app.6d5336e7.js";const m='{"title":"fireEvent y waitFor","description":"","frontmatter":{},"headers":[],"relativePath":"vtl/psyc/fireevent-waitfor.md"}',e={},p=t(`<h1 id="fireevent-y-waitfor" tabindex="-1"><code>fireEvent</code> y <code>waitFor</code> <a class="header-anchor" href="#fireevent-y-waitfor" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">Prueba</p><p><a href="https://www.youtube.com/watch?v=JEHkTcZyL6o&amp;list=PLC2LZCNWKL9YdD4Z4V6guveajQoKN8rui&amp;index=4" target="_blank" rel="noopener noreferrer">Esta lecci\xF3n en video</a></p></div><p>Ahora que hemos visto los conceptos b\xE1sicos de Vue Testing Library, podemos comensar a conocer algunas de las caracter\xEDsticas m\xE1s interesantes. As\xED que lo primero que haremos es actualizar nuestro componente para ver algo un poco m\xE1s interesante en este ejemplo.</p><p>Vamos a dirigirnos a nuestro <code>@/components/Helloworld.vue</code> y cambiarlo para que sea un poco diferente. Eliminemos todo el estilo y tambi\xE9n todo el marcado que no necesitaremos. Tampoco necesitaremos la variable <code>count</code>. Dejemos la importaci\xF3n de la funci\xF3n <code>ref</code> de Vue y la propiedad <code>msg</code> que si las necesitaremos m\xE1s adelante.</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">msg</span><span class="token operator">:</span> String
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>{{ msg }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Lo que haremos ser\xE1 crear un elemento <code>&lt;button&gt;</code> que revele un texto cuando se haga click en \xE9l. As\xED que tendremos un bot\xF3n que al hacer click establecer\xE1 la variable <code>show</code> en <code>true</code>.</p><div class="language-vue"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br></div><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">msg</span><span class="token operator">:</span> String
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>{{ msg }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show = true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Mostrar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Tambi\xE9n necesitaremos alguna manera de seleccionar este bot\xF3n y lo haremos agregando el atributo <code>role</code>. Esto es algo que Vue Testing Library realmente nos alienta a hacer.</p><blockquote><p>Los roles son buenos para la accesibilidad y lamentablemente es algo que muchos no acostumbran usar. Anim\xE1ndonos a usar roles en nuestras pruebas har\xE1 que nuestros componentes sean m\xE1s accesibles, sobre todo para las personas que usan lectores de pantalla.</p></blockquote><p>A este <code>role</code> vamos a llamarlo <code>show-text</code> porque esa es la funci\xF3n de este bot\xF3n, mostrar el texto.</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show = true<span class="token punctuation">&quot;</span></span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show-text<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Mostrar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Guardemos esto y por supuesto la prueba a\xFAn se aprobar\xE1 porque todav\xEDa estamos representando el mensaje.</p><div class="language-"><pre><code> \u221A tests/components/helloworld.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  39ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
</code></pre></div><p>As\xED que sigamos adelante creando la variable reactiva <code>show</code> establecida en <code>false</code> y condicionando el respectivo elemento para que muestre el mensaje correspondiente.</p><div class="language-vue"><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">msg</span><span class="token operator">:</span> String
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> show <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ msg }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show = true<span class="token punctuation">&quot;</span></span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show-text<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Mostrar<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Por supuesto, esta condici\xF3n har\xE1 que nuestra prueba falle.</p><div class="language-"><pre><code> FAIL  tests/components/helloworld.spec.js &gt; HelloWorld.vue &gt; renders props.msg when passed
TestingLibraryElementError: Unable to find an element with the text: new message. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

Ignored nodes: comments, &lt;script /&gt;, &lt;style /&gt;
&lt;body&gt;
  &lt;div&gt;
                                                                                                                                     
    &lt;button
      role=&quot;show-text&quot;                                                                                                               
    &gt;                                                                                                                                
      Mostrar                                                                                                                        
    &lt;/button&gt;
                                                                                                                                     
  &lt;/div&gt;
&lt;/body&gt;                                                                                                                              
 \u276F Object.getElementError node_modules/@testing-library/dom/dist/config.js:40:19
 \u276F node_modules/@testing-library/dom/dist/query-helpers.js:90:38
 \u276F node_modules/@testing-library/dom/dist/query-helpers.js:62:17
 \u276F node_modules/@testing-library/dom/dist/query-helpers.js:111:19
 \u276F tests/components/helloworld.spec.js:14:19
     12|     })
     13|                                                                                                                             
     14|     expect(screen.getByText(msg)).toBeTruthy()                                                                              
       |                   ^                                                                                                         
     15|   })                                                                                                                        
     16| })                                                                                                                          

\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF[1/1]\u23AF

Test Files  1 failed (1)
     Tests  1 failed (1)
      Time  44ms


 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
</code></pre></div><p>Revisemos nuestra prueba para determinar porque est\xE1 fallando.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>    
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 
</code></pre></div><p>Esperamos que exista el texto y no existe.</p><p>As\xED que lo que debemos hacer primero es hacer click en el bot\xF3n antes de afirmar que el texto existe. La forma que podemos hacer click en el bot\xF3n es importando el m\xE9todo <code>fireEvent</code> de Vue Testing Library.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>

<span class="token comment">// ...</span>

fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>
  <span class="token comment">// element</span>
<span class="token punctuation">)</span>
</code></pre></div><p>Ahora podemos disparar un evento click. Necesitamos pasarle el elemento en el que nos gustar\xEDa hacer click. En este caso, nos gustar\xEDa hacer click en el bot\xF3n y tenemos una manera excelente de seleccionarlo. Recuerde que agregamos un <code>role</code> igual a <code>show-text</code>. Vamos a seleccionar dicho elemento usando ese <code>role</code>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&#39;show-text&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 
</code></pre></div><p>Guardemos y veamos que sucede. Podemos ver que obtenemos la misma falla de que el texto no existe.</p><p>Lo que har\xEDamos tradicionalmente es importar el <code>nextTick</code> de Vue y luego llamarlo.</p><div class="language-js"><pre><code><span class="token comment">// ...</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> nextTick <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue</span><span class="token template-punctuation string">\`</span></span>
<span class="token comment">// ...</span>
<span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">await</span> <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Lo que esto har\xE1 ser\xE1 esperar a que el DOM se actualice y eso garantizar\xE1 que una vez que el DOM se haya actualizado el texto sea revelado seg\xFAn la condici\xF3n del <code>v-if</code>.</p><p>Se podr\xEDa hacer algo as\xED:</p><div class="language-js"><div class="highlight-lines"><br><br><div class="highlighted">\xA0</div><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> nextTick <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
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

    <span class="token keyword">await</span> <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Esta es una caracter\xEDstica de Vue Test Utils la cual debemos comprender como funciona Vue internamente. Esto es algo en lo que quiz\xE1 no quisieramos pensar mientras estamos escribiendo pruebas.</p><p>Afortunadamente, Vue Testing Library tiene otra manera de solucionar esto, ya que en realidad hay varias maneras de hacerlo.</p><p>Vamos a ver otro m\xE9todo de Vue Testing Library el cual se llama <code>waitFor</code>.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token comment">// ...</span>
<span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">await</span> <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>B\xE1sicamente, esto nos permitir\xE1 esperar a que suceda algo antes de progresar.</p><p>Veamos c\xF3mo funciona.</p><div class="language-js"><div class="highlight-lines"><br><div class="highlighted">\xA0</div><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>
    <span class="token comment">// wrapper</span>
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
</code></pre></div><p><code>waitFor</code> recibe una devoluci\xF3n de llamada la cual su retorno ser\xE1 nuestra afirmaci\xF3n.</p><p>Hay una mejora que se puede hacer, la cual veremos m\xE1s adelante...</p>`,39),o=[p];function c(l,u,i,r,k,d){return a(),s("div",null,o)}var b=n(e,[["render",c]]);export{m as __pageData,b as default};
