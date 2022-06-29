import{_ as s,c as n,o as a,a as t}from"./app.9b0c39a4.js";const m='{"title":"getBy, queryBy y findBy","description":"","frontmatter":{},"headers":[],"relativePath":"vtl/psyc/getby-queryby-findby.md"}',o={},e=t(`<h1 id="getby-queryby-y-findby" tabindex="-1"><code>getBy</code>, <code>queryBy</code> y <code>findBy</code> <a class="header-anchor" href="#getby-queryby-y-findby" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">Prueba</p><p><a href="https://www.youtube.com/watch?v=B6BdCKStmFQ&amp;list=PLC2LZCNWKL9YdD4Z4V6guveajQoKN8rui&amp;index=3" target="_blank" rel="noopener noreferrer">Esta lecci\xF3n en video</a></p></div><p>Hasta ahora hemos visto solo una forma de seleccionar elementos del DOM y es usando el selector <code>getBy</code>.</p><p>En realidad hay tres selectores que usaremos con mucha frecuencia: <code>getBy</code>, <code>queryBy</code> y <code>findBy</code>. Y hay muchas variedades diferentes. Hemos visto la variedad <code>byText</code>, pero vamos a ver ahora por <code>byRoll</code> y un mont\xF3n de otras tambi\xE9n.</p><p>Antes de saltar y ver las diferentes variedades, sigamos adelante y veamos c\xF3mo hacer que <code>get</code>, <code>query</code> y <code>find</code> trabajen un poco diferente antes de que hagamos eso.</p><p>Mostraremos un peque\xF1o truco con esto. Sigamos adelante y eliminemos la afirmaci\xF3n y simplemente mantengamos el selector de <code>getByText</code>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>    
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">//expect(screen.getByText(msg)).toBeInTheDocument()</span>
    screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Y si guardamos esto, por supuesto, la prueba est\xE1 en marcha para continuar pasando porque tenemos este texto en el DOM.</p><div class="language-"><pre><code> \u221A tests/components/helloworld.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  50ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
</code></pre></div><p>Veamos qu\xE9 sucede si lo cambiamos y lo guardamos.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">//expect(screen.getByText(msg)).toBeInTheDocument()</span>
    screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;asdf&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Aunque no tenemos una afirmaci\xF3n aqu\xED, pero la prueba en realidad fallar\xE1.</p><div class="language-"><pre><code>\u276F tests/components/helloworld.spec.js:15:12
     13| 
     14|     //expect(screen.getByText(msg)).toBeInTheDocument()                                                                     
     15|     screen.getByText(&#39;asdf&#39;)                                                                                                
       |            ^                                                                                                                
     16|   })                                                                                                                        
     17| })                                                                                                                          

\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF[1/1]\u23AF

Test Files  1 failed (1)
     Tests  1 failed (1)
      Time  58ms


 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
</code></pre></div><p>Y esta es una de las caracter\xEDsticas de <code>getByText</code>. Va a fallar si no encuentra el <em>nodo</em> correcto e incluso, le mostrar\xE1 una visualizaci\xF3n del DOM y le mostrar\xE1 lo que existe y lo que no.</p><div class="language-js"><pre><code> <span class="token constant">FAIL</span>  tests<span class="token operator">/</span>components<span class="token operator">/</span>helloworld<span class="token punctuation">.</span>spec<span class="token punctuation">.</span>js <span class="token operator">&gt;</span> HelloWorld<span class="token punctuation">.</span>vue <span class="token operator">&gt;</span> renders props<span class="token punctuation">.</span>msg when passed
<span class="token literal-property property">TestingLibraryElementError</span><span class="token operator">:</span> Unable to find an element <span class="token keyword">with</span> the text<span class="token operator">:</span> asdf<span class="token punctuation">.</span> This could be because the text is broken up by multiple elements<span class="token punctuation">.</span> In <span class="token keyword">this</span> <span class="token keyword">case</span><span class="token punctuation">,</span> you can provide a <span class="token keyword">function</span> <span class="token keyword">for</span> your text matcher to make your matcher more flexible<span class="token punctuation">.</span>

Ignored nodes<span class="token operator">:</span> comments<span class="token punctuation">,</span> <span class="token operator">&lt;</span>script <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token operator">&lt;</span>style <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
                                                                                                                                     
    <span class="token operator">&lt;</span>h1
      data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                             
    <span class="token operator">&gt;</span>                                                                                                                                
      <span class="token keyword">new</span> <span class="token class-name">message</span>                                                                                                                    
    <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>p                                                                                                                               
      data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                             
    <span class="token operator">&gt;</span>                                                                                                                                
       Recommended <span class="token constant">IDE</span> <span class="token literal-property property">setup</span><span class="token operator">:</span>                                                                                                        
      <span class="token operator">&lt;</span>a
        data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                           
        href<span class="token operator">=</span><span class="token string">&quot;https://code.visualstudio.com/&quot;</span>                                                                                        
        target<span class="token operator">=</span><span class="token string">&quot;_blank&quot;</span>                                                                                                              
      <span class="token operator">&gt;</span>                                                                                                                              
        <span class="token constant">VS</span> Code                                                                                                                      
      <span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>
       <span class="token operator">+</span>                                                                                                                             
      <span class="token operator">&lt;</span>a
        data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                           
        href<span class="token operator">=</span><span class="token string">&quot;https://github.com/johnsoncodehk/volar&quot;</span>                                                                                
        target<span class="token operator">=</span><span class="token string">&quot;_blank&quot;</span>                                                                                                              
      <span class="token operator">&gt;</span>                                                                                                                              
        Volar                                                                                                                        
      <span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>                                                                                                                             
    <span class="token operator">&lt;</span>p                                                                                                                               
      data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                             
    <span class="token operator">&gt;</span>                                                                                                                                
      <span class="token operator">&lt;</span>a                                                                                                                             
        data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                           
        href<span class="token operator">=</span><span class="token string">&quot;https://vitejs.dev/guide/features.html&quot;</span>                                                                                
        target<span class="token operator">=</span><span class="token string">&quot;_blank&quot;</span>                                                                                                              
      <span class="token operator">&gt;</span>                                                                                                                              
         Vite Documentation                                                                                                          
      <span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>
       <span class="token operator">|</span>                                                                                                                             
      <span class="token operator">&lt;</span>a
        data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                           
        href<span class="token operator">=</span><span class="token string">&quot;https://v3.vuejs.org/&quot;</span>                                                                                                 
        target<span class="token operator">=</span><span class="token string">&quot;_blank&quot;</span>                                                                                                              
      <span class="token operator">&gt;</span>                                                                                                                              
        Vue <span class="token number">3</span> Documentation                                                                                                          
      <span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>                                                                                                                             
    <span class="token operator">&lt;</span>button                                                                                                                          
      data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                             
      type<span class="token operator">=</span><span class="token string">&quot;button&quot;</span>                                                                                                                  
    <span class="token operator">&gt;</span>                                                                                                                                
      count is<span class="token operator">:</span> <span class="token number">0</span>                                                                                                                    
    <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>p                                                                                                                               
      data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                             
    <span class="token operator">&gt;</span>                                                                                                                                
       Edit                                                                                                                          
      <span class="token operator">&lt;</span>code
        data<span class="token operator">-</span>v<span class="token operator">-</span>469af010<span class="token operator">=</span><span class="token string">&quot;&quot;</span>                                                                                                           
      <span class="token operator">&gt;</span>                                                                                                                              
        components<span class="token operator">/</span>HelloWorld<span class="token punctuation">.</span>vue                                                                                                    
      <span class="token operator">&lt;</span><span class="token operator">/</span>code<span class="token operator">&gt;</span>
       to test hot module replacement<span class="token punctuation">.</span>                                                                                               
    <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
                                                                                                                                     
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span>                                                                                                                              
 \u276F Object<span class="token punctuation">.</span>getElementError node_modules<span class="token operator">/</span>@testing<span class="token operator">-</span>library<span class="token operator">/</span>dom<span class="token operator">/</span>dist<span class="token operator">/</span>config<span class="token punctuation">.</span>js<span class="token operator">:</span><span class="token number">40</span><span class="token operator">:</span><span class="token number">19</span>
 \u276F node_modules<span class="token operator">/</span>@testing<span class="token operator">-</span>library<span class="token operator">/</span>dom<span class="token operator">/</span>dist<span class="token operator">/</span>query<span class="token operator">-</span>helpers<span class="token punctuation">.</span>js<span class="token operator">:</span><span class="token number">90</span><span class="token operator">:</span><span class="token number">38</span>
 \u276F node_modules<span class="token operator">/</span>@testing<span class="token operator">-</span>library<span class="token operator">/</span>dom<span class="token operator">/</span>dist<span class="token operator">/</span>query<span class="token operator">-</span>helpers<span class="token punctuation">.</span>js<span class="token operator">:</span><span class="token number">62</span><span class="token operator">:</span><span class="token number">17</span>
 \u276F node_modules<span class="token operator">/</span>@testing<span class="token operator">-</span>library<span class="token operator">/</span>dom<span class="token operator">/</span>dist<span class="token operator">/</span>query<span class="token operator">-</span>helpers<span class="token punctuation">.</span>js<span class="token operator">:</span><span class="token number">111</span><span class="token operator">:</span><span class="token number">19</span>
</code></pre></div><p>Por lo que en realidad es una especie de prueba de una manera muy impl\xEDcita. Aunque no hemos escrito la afirmaci\xF3n, esto va a fallar en la prueba si el elemento no existe.</p><p>Es preferible de esta manera que es m\xE1s explicito.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.js</span>
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
    <span class="token comment">//screen.getByText(&#39;asdf&#39;)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Sin embargo, esto plantea la pregunta: \xBFC\xF3mo podemos escribir una afirmaci\xF3n para decir que algo no existe y siga adelante?</p><p>Veremos c\xF3mo podemos hacer eso, as\xED que avancemos y cambiemos esto. Vamos a decir que obtendr\xE1 el mensaje <code>asdf</code>, y por supuesto, esto va a fallar.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;asdf&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 

</code></pre></div><p>Pero queremos hacer que esta prueba pase. En lugar de usar <code>getByText</code> usaremos <code>queryByText</code> y lo que esto realizar\xE1 ser\xE1 buscar, pero por su tipado, retornar\xE1 un <code>HTMLElement | null</code> en lugar de obtener por texto.</p><p>Ya que es solo un elemento HTML, por lo que puede devolver un elemento nulo, eso nos va permitir escribir lo contrario como aserci\xF3n, diciendo que este texto no existe. Todo lo que necesitamos ahora es decir que no est\xE9 en el DOM.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;asdf&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 
</code></pre></div><p>Guardemos y esto pasar\xE1.</p><div class="language-"><pre><code> RERUN  rerun all

 \u2713 tests/components/helloworld.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  29ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
</code></pre></div><p>Por lo que la principal diferencia entre <code>queryByText</code> y <code>getByText</code> es que <code>getByText</code> va a fallar si no encuentra el elemento correcto mientras que <code>queryByText</code> no. Podemos confirmar eso, una vez m\xE1s, con solo mirar los tipos de devoluci\xF3n de <code>getByText</code>, que solo puede ser un <code>HTMLElement</code>, mientras que <code>queryByText</code> puede ser <code>HTMLElement | null</code>.</p><p>Por lo que generalmente usaremos el m\xE9todo <code>getByText</code>, la \xFAnica raz\xF3n por la que realmente deseamos usar <code>queryByText</code> es si estamos afirmando que algo no existe. De lo contrario, seguiremos con el <code>getByText</code>. Por la raz\xF3n de que es m\xE1s claro y en realidad nos dar\xE1 un buen resultado si nuestra prueba sigue adelante.</p><p>Hay uno m\xE1s del cual vamos a hablar, que es <code>findByText</code> y este es realmente as\xEDncrono, una de las caracter\xEDstica realmente agradables de Vue Testing Library. Y esto resuelve uno de los problemas de Vue Test Utils, donde normalmente tendr\xEDamos que usar <code>nextTick</code>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">// tests/components/helloworld.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&quot;@/components/HelloWorld.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;HelloWorld.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;renders props.msg when passed&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">&quot;new message&quot;</span>
    <span class="token function">render</span><span class="token punctuation">(</span>HelloWorld<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> msg <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>screen<span class="token punctuation">.</span><span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;asdf&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// findByText...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 
</code></pre></div><p>Vamos a seguir y profundizar eso m\xE1s adelante.</p>`,31),p=[e];function c(r,l,u,i,k,d){return a(),n("div",null,p)}var b=s(o,[["render",c]]);export{m as __pageData,b as default};
