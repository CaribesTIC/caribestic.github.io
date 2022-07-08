import{_ as n,c as s,o as a,a as t}from"./app.1bf5b695.js";const b='{"title":"Enviar formularios y emitir eventos","description":"","frontmatter":{},"headers":[],"relativePath":"vtl/psyc/enviar-formularios-y-emitir-eventos.md"}',p={},o=t(`<h1 id="enviar-formularios-y-emitir-eventos" tabindex="-1">Enviar formularios y emitir eventos <a class="header-anchor" href="#enviar-formularios-y-emitir-eventos" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">Prueba</p><p><a href="https://www.youtube.com/watch?v=Iye52prfleQ&amp;list=PLC2LZCNWKL9YdD4Z4V6guveajQoKN8rui&amp;index=7" target="_blank" rel="noopener noreferrer">Esta lecci\xF3n en video</a></p></div><p>Hasta ahora nuestra prueba se ve bastante bien.</p><div class="language-js"><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
    <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>

    <span class="token keyword">const</span> button <span class="token operator">=</span> screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&quot;button&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span>
    <span class="token punctuation">)</span>

    <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>      
      <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Lo siguiente que haremos es enviar el formulario y asegurarnos que se emita el evento correcto.</p><p>Esto significa que debemos activar el evento <code>@submit.prevent</code>, el cual llamar\xE1 a un m\xE9todo <code>submit</code> que hasta ahora no hemos creado. As\xED que creemos este m\xE9todo de envio.</p><p>Por ahora, en el m\xE9todo <code>submit</code> solo vamos a hacer un <code>console.log</code> para asegurarnos que est\xE1 siendo invocado. Esto ilustrar\xE1 un error muy sutil y algo que necesitamos para tener en cuenta.</p><div class="language-vue"><div class="highlight-lines"><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">submit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;...&quot;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">@submit.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:disabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>!name.length<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Submit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>  
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Guardemos esto y actualicemos nuestra prueba para enviar este formulario.</p><p>En dicha prueba, lo primero que haremos ser\xE1 hacer click en el respectivo bot\xF3n. Como ya hemos visto antes el uso de <code>fireEven</code>, simplemente haremos click en el bot\xF3n y seguir adelante.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
    <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>

    <span class="token keyword">const</span> button <span class="token operator">=</span> screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&quot;button&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span>
    <span class="token punctuation">)</span>

    <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>      
      <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Es posible que esperemos que el <code>console.log</code> se active, guard\xE9moslo y veremos que sucede.</p><div class="language-"><pre><code> \u221A tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  121ms
</code></pre></div><p>Podemos ver aqu\xED, que aunque estamos activando el m\xE9todo <code>submit</code> no estamos recibiendo el <code>console.log</code>, como es de esperar. Ahora la pregunta: \xBFpor qu\xE9 sucede esto?</p><p>Hagamos un <code>console.log</code> en la l\xEDnea 18 y otro <code>console.log</code> en la l\xEDnea 21 solo indicando el n\xFAmero de l\xEDnea.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token comment">// omitted for brevity ...</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
    <span class="token comment">// omitted for brevity ...</span>

    <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span>    
      <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">21</span><span class="token punctuation">)</span>    
    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Si guardamos esto veremos algo un poco sorprendente:</p><div class="language-"><pre><code>stdout | tests/components/myform.spec.js &gt; MyForm.vue &gt; enable button and emit event
18
21
18

 \u221A tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  118ms
</code></pre></div><p>Tenemos el n\xFAmero 18, luego tenemos el n\xFAmero 21 y luego tenemos el n\xFAmero 18 nuevamente.</p><p>Lo que sucede aqu\xED es que estamos esperando el siguiente <em>tick</em> para asegurarnos de que el bot\xF3n se haya actualizado correctamente y, en este punto, no se ha actualizado. Luego, ejecutando <code>fireEvent.click</code> y debido a que el bot\xF3n a\xFAn est\xE1 deshabilitado, no se enviar\xE1. Entonces, en la pr\xF3xima ejecuci\xF3n del la devoluci\xF3n de llamada, dentro del m\xE9todo <code>waitFor</code> se volver\xE1 a mostrar el n\xFAmero 18. Pero en este punto ya hicimos nuestro <code>fireEvent.click</code>, por lo que no obtendremos el <code>console.log</code> como cabr\xEDa esperar.</p><p>Es un poco sorprendente y es una especie de error sutil que debemos tener en cuenta. Vamos a ver una mejor forma de escribir esta prueba para evitar este error.</p><p>Lo que haremos ser\xE1, antes remover los <code>console.log</code> que pusimos en nuestra prueba porque ya no los necesitaremos. Entonces, colocaremos un <code>await</code> justo antes del m\xE9todo <code>waitFor</code> para que se quede ah\xED esperando hasta que termine antes de disparar el pr\xF3ximo <code>fireEvent.click</code>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br></div><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>

    <span class="token keyword">const</span> button <span class="token operator">=</span> screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&quot;button&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">await</span> <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
      <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Si guardamos, veremos que ahora si estar\xE1 funcionando correctamente, mostrando el <code>console.log</code> que declaramos previamente en el m\xE9todo <code>submit</code> del componente que estamos probando.</p><div class="language-"><div class="highlight-lines"><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br></div><pre><code>stdout | tests/components/myform.spec.js &gt; MyForm.vue &gt; enable button and emit event
...

 \u221A tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  118ms
</code></pre></div><p>Una mejor manera de hacer esto es colocando el <code>await</code> antes del m\xE9todo <code>fireEvent.update</code>. Haci\xE9ndolo as\xED, ahora podemos deshacernos del m\xE9todo <code>waitFor</code> y esto nos dar\xE1 el mismo resultado.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><div class="highlighted">\xA0</div><br><br><br><br></div><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
    <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>

    <span class="token keyword">const</span> button <span class="token operator">=</span> screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&quot;button&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span>
    <span class="token punctuation">)</span>
            
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Es bueno tener en cuenta las dos formas en que se puede hacer. Ambas maneras ser\xE1n \xFAtiles dependiendo de la prueba que queremos lograr. En fin, dej\xE9moslo as\xED y emitamos el evento asegurandonos que funcione correctamente.</p><p>As\xED que vayamos a nuestro componente y coloquemos el m\xE9todo <code>emit</code> dentro del correspondiente m\xE9todo <code>submit</code>. Pasemos el nombre del m\xE9todo que queremos llamar, que ser\xE1 <code>submit</code> y pasemos una carga \xFAtil que ser\xE1 un objero con la propiedad <code>name</code> pas\xE1ndole el valor de nuestra constante reactiva <code>name</code> que ser\xE1 el nombre del usuario que haya llenado la entrada correctamente.</p><div class="language-vue"><div class="highlight-lines"><br><br><br><div class="highlighted">\xA0</div><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token keyword">const</span> emit <span class="token operator">=</span> <span class="token function">defineEmits</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;submit&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token function-variable function">submit</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;submit&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> name<span class="token punctuation">.</span>value <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">@submit.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>name<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:disabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>!name.length<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Submit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>  
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Regresemos a nuestra prueba y afirmemos que el evento se emita correctamente. Para ello, primero desestructuremos el objeto que regresa el m\xE9todo <code>render</code> el cual tiene la propiedad <code>emitted</code>, esto nos dar\xE1 todos los eventos emitidos. Si ha usado Vue Test Utils, reconocer\xE1 que esto hace exactamente lo mismo.</p><div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token punctuation">{</span> emitted <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>
</code></pre></div><p>Ahora hagamos un <code>console.log</code> simplemente para ilustrar lo que est\xE1 sucediendo.</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
  <span class="token comment">// omitted for brevity ...</span>
  fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>    
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>emitted<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Por lo que deber\xEDa de darnos una lista de todos los eventos que se han emitido desde el componente.</p><div class="language-"><pre><code>stdout | tests/components/myform.spec.js &gt; MyForm.vue &gt; enable button and emit event
[Function: emitted]

 \u2713 tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  71ms
</code></pre></div><p>En este caso nos dar\xE1 una funci\xF3n a la que invocaremos.</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
  <span class="token comment">// omitted for brevity ...</span>
  fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>    
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Ahora si nos deber\xEDa de arrojar la lista correcta de todos los eventos.</p><div class="language-"><pre><code>stdout | tests/components/myform.spec.js &gt; MyForm.vue &gt; enable button and emit event
{
  input: [ [ [InputEvent] ] ],
  click: [ [ [MouseEvent] ] ],
  submit: [ [ [Object] ] ]
}

 \u2713 tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  73ms
</code></pre></div><p>Y efectivamente, vamos a obtener nuestro evento <code>submit</code>.</p><div class="language-js"><pre><code><span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>  
  <span class="token comment">// omitted for brevity ...</span>
  fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>    
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>submit<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>El cual tiene una carga \xFAtil, la cual es la correcta.</p><div class="language-"><pre><code>stdout | tests/components/myform.spec.js &gt; MyForm.vue &gt; enable button and emit event
[ [ { name: &#39;John&#39; } ] ]

 \u2713 tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  75ms
</code></pre></div><p>As\xED que sigamos adelante y escribamos nuestra afirmaci\xF3n contra la carga \xFAtil correcta.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br></div><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
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

    <span class="token comment">// console.log(emitted().submit)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>submit<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;John&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Esto deber\xEDa de pasar, as\xED que guardemos.</p><div class="language-"><pre><code> \u2713 tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  70ms
</code></pre></div><p>Y efectivamente pas\xF3.</p>`,49),e=[o];function c(u,l,i,r,k,d){return a(),s("div",null,e)}var g=n(p,[["render",c]]);export{b as __pageData,g as default};
