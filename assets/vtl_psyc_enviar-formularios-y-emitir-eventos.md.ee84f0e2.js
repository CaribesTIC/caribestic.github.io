import{_ as n,c as s,o as a,a as t}from"./app.6d5336e7.js";const g='{"title":"Enviar formularios y emitir eventos","description":"","frontmatter":{},"headers":[],"relativePath":"vtl/psyc/enviar-formularios-y-emitir-eventos.md"}',p={},o=t(`<h1 id="enviar-formularios-y-emitir-eventos" tabindex="-1">Enviar formularios y emitir eventos <a class="header-anchor" href="#enviar-formularios-y-emitir-eventos" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">Prueba</p><p><a href="https://www.youtube.com/watch?v=Iye52prfleQ&amp;list=PLC2LZCNWKL9YdD4Z4V6guveajQoKN8rui&amp;index=7" target="_blank" rel="noopener noreferrer">Esta lecci\xF3n en video</a></p></div><p>Hasta ahora nuestra prueba se ve bastante bien.</p><div class="language-js"><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button when data is entered&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
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
</code></pre></div><p>Lo siguiente que haremos es enviar el formulario y asegurarnos que se emita el evento correcto.</p><p>Esto significa que debemos activar el evento <code>@submit.prevent</code>, el cual llamar\xE1 a un m\xE9todo <code>submit</code> que hasta ahora no hemos creado. As\xED que creemos este m\xE9todo de envio.</p><p>Por ahora, solo voy a hacer un <code>console.log</code> para asegurarnos que est\xE1 siendo invocado.</p><div class="language-vue"><div class="highlight-lines"><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
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
</code></pre></div><p>Esto ilustrar\xE1 un error muy sutil y algo que necesitamos para tener en cuenta.</p><p>Guardemos esto y actualicemos nuestra prueba para enviar este formulario.</p><p>En dicha prueba, lo primero que haremos ser\xE1 hacer click en el respectivo bot\xF3n. Como ya hemos visto antes el uso de <code>fireEven</code>, simplemente haremos click en el bot\xF3n y seguir adelante.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br></div><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button when data is entered&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
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


 PASS  Waiting for file changes...
       press h to show help, press q to quit
</code></pre></div><p>Podemos ver aqu\xED, que aunque estamos activando el m\xE9todo <code>submit</code> no estamos recibiendo el <code>console.log</code>, como es de esperar. Ahora la pregunta: \xBFpor qu\xE9 sucede esto?</p><p>Hagamos un <code>console.log</code> en la l\xEDnea 18 y otro <code>console.log</code> en la l\xEDnea 21 solo indicando el n\xFAmero de l\xEDnea.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><div class="highlighted">\xA0</div><br><br><br></div><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button when data is entered&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
    <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>

    <span class="token keyword">const</span> button <span class="token operator">=</span> screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&quot;button&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span>
    <span class="token punctuation">)</span>

    <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span>    
      <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">21</span><span class="token punctuation">)</span>    
    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Si guardamos esto veremos algo un poco sorprendente:</p><div class="language-"><pre><code>stdout | tests/components/myform.spec.js &gt; MyForm.vue &gt; enable button when data is entered
18
21
18

 \u221A tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  118ms


 PASS  Waiting for file changes...
       press h to show help, press q to quit
</code></pre></div><p>Tenemos el n\xFAmero 18, luego tenemos el n\xFAmero 21 y luego tenemos el n\xFAmero 18 nuevamente.</p><p>Lo que sucede aqu\xED es que estamos esperando el siguiente <em>tick</em> para asegurarnos de que el bot\xF3n se haya actualizado correctamente y, en este punto, no se ha actualizado. Luego, ejecutando <code>fireEvent.click</code> y debido a que el bot\xF3n a\xFAn est\xE1 deshabilitado, no se enviar\xE1. Entonces, en la pr\xF3xima ejecuci\xF3n del la devoluci\xF3n de llamada, dentro del m\xE9todo <code>waitFor</code> se volver\xE1 a mostrar el n\xFAmero 18. Pero en este punto ya hicimos nuestro <code>fireEvent.click</code>, por lo que no obtendremos el <code>console.log</code> como cabr\xEDa esperar.</p><p>Es un poco sorprendente y es una especie de error sutil que debemos tener en cuenta. Vamos a ver una mejor forma de escribir esta prueba para evitar este error.</p><p>m 1.26</p>`,23),e=[o];function c(u,l,i,r,k,d){return a(),s("div",null,e)}var b=n(p,[["render",c]]);export{g as __pageData,b as default};
