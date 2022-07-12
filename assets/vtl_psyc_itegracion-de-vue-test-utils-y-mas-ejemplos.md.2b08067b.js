import{_ as n,c as s,o as a,a as t}from"./app.1bf5b695.js";const m='{"title":"Integraci\xF3n de Vue Test Utils y m\xE1s ejemplos","description":"","frontmatter":{},"headers":[],"relativePath":"vtl/psyc/itegracion-de-vue-test-utils-y-mas-ejemplos.md"}',p={},o=t(`<h1 id="integracion-de-vue-test-utils-y-mas-ejemplos" tabindex="-1">Integraci\xF3n de Vue Test Utils y m\xE1s ejemplos <a class="header-anchor" href="#integracion-de-vue-test-utils-y-mas-ejemplos" aria-hidden="true">#</a></h1><div class="info custom-block"><p class="custom-block-title">Prueba</p><p><a href="https://www.youtube.com/watch?v=fi4gwBkryxE&amp;list=PLC2LZCNWKL9YdD4Z4V6guveajQoKN8rui&amp;index=8" target="_blank" rel="noopener noreferrer">Esta lecci\xF3n en video</a></p></div><p>Hasta ahora hemos visto las siguientes caracter\xEDsticas de Vue Testing Library:</p><ul><li>Desestructurar lo que devuelve la funci\xF3n <code>render</code>.</li><li>Usar el m\xE9todo <code>screen.getByRole</code> para encontrar algo de manera amigable y accesible.</li><li>Personalizar aserciones, por ejemplo <code>toBeDisabled</code>.</li><li>Activar eventos como <code>fireEvent.update</code>.</li><li>Hacer click en el bot\xF3n con <code>fireEvent.click</code>.</li><li>Afirmar contra eventos emitidos y verificar el env\xEDo de la carga \xFAtil.</li></ul><div class="language-js"><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button and emit event&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// wrapper </span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> emitted <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>

    <span class="token keyword">const</span> button <span class="token operator">=</span> screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&quot;button&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span>
    <span class="token punctuation">)</span>
            
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>
      <span class="token comment">// @ts-ignore</span>
      <span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>submit<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;John&#39;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
    
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Si desea continuar aprendiendo, hay toneladas de recursos disponibles. <a href="https://testing-library.com/docs/vue-testing-library/intro" target="_blank" rel="noopener noreferrer">Vue-Testing Library</a> es bastante grande. Por lo que tendr\xE1 que revisar y leer la documentaci\xF3n.</p><p>Por otro lado, existe dentro de las pruebas del c\xF3digo fuente de Vue Testing Library un <a href="https://github.com/testing-library/vue-testing-library/tree/main/src/__tests__" target="_blank" rel="noopener noreferrer">directorio de ejemplos</a> donde hay muchas pruebas diferentes que muestran c\xF3mo hacer diferentes cosas.</p><p>Por ejemplo, el siguiente c\xF3digo trata sobre las pruebas a las directivas <code>v-if</code> y <code>v-else</code>, que se est\xE1n usando en el componente <a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/components/Disappearance.vue" target="_blank" rel="noopener noreferrer"><code>Disappearance.vue</code></a>.</p><div class="language-vue"><div class="highlight-lines"><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>loading<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Loading...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">v-else</span> <span class="token attr-name">data-testid</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>message<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    Loaded this message: {{ data.returnedMessage }}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> <span class="token function-variable function">fetchAMessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
  <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// we are using random timeout here to fireEvent a real-time example</span>
    <span class="token comment">// of an async operation calling a callback at a non-deterministic time</span>
    <span class="token keyword">const</span> randomTimeout <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">returnedMessage</span><span class="token operator">:</span> <span class="token string">&#39;Hello World&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> randomTimeout<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">returnedMessage</span><span class="token operator">:</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchAMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Veamos <a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/disappearance.js" target="_blank" rel="noopener noreferrer">el archivo de prueba</a> llamado desaparici\xF3n, el cual tiene un m\xE9todo muy bueno llamado <a href="https://testing-library.com/docs/dom-testing-library/api-async/#waitforelementtoberemoved" target="_blank" rel="noopener noreferrer"><code>waitForElementToBeRemoved</code></a>.</p><div class="language-js"><div class="highlight-lines"><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token comment">// tests/components/disappearance.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> waitForElementToBeRemoved <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@testing-library/vue&#39;</span>
<span class="token keyword">import</span> Disappearance <span class="token keyword">from</span> <span class="token string">&#39;@/components/Disappearance.vue&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;@testing-library/jest-dom&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;waits for the data to be loaded&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByText<span class="token punctuation">,</span> queryByText<span class="token punctuation">,</span> queryByTestId<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>Disappearance<span class="token punctuation">)</span>

  <span class="token comment">// Assert initial state</span>
  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;Loading...&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">queryByText</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Loaded this message</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeInTheDocument</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// Following line reads as follows:</span>
  <span class="token comment">// &quot;Wait until element with text &#39;Loading...&#39; is gone.&quot;</span>
  <span class="token keyword">await</span> <span class="token function">waitForElementToBeRemoved</span><span class="token punctuation">(</span><span class="token function">queryByText</span><span class="token punctuation">(</span><span class="token string">&#39;Loading...&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">// It is equivalent to:</span>
  <span class="token comment">//</span>
  <span class="token comment">// await waitFor(() =&gt; {</span>
  <span class="token comment">//   expect(queryByText(&#39;Loading...&#39;)).not.toBeInTheDocument()</span>
  <span class="token comment">// })</span>

  <span class="token comment">// After &#39;Loading...&#39; is gone, we can assert that fetched data is rendered.</span>
  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">queryByTestId</span><span class="token punctuation">(</span><span class="token string">&#39;message&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveTextContent</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Hello World</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>

  <span class="token comment">// Read more about async utilities:</span>
  <span class="token comment">// https://testing-library.com/docs/dom-testing-library/api-async</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Esta es una muy buena manera de esperar a que se elimine un elemento con <code>v-if</code>. Es muy legible y expresivo.</p><p>Otra prueba bastante interesante es esta llamada <a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/fire-event.js" target="_blank" rel="noopener noreferrer">fire-event</a>, la cual muestra c\xF3mo hacer todos los diferentes tipos de eventos que nos gustar\xEDa disparar.</p><div class="language-js"><pre><code><span class="token comment">// tests/components/fire-event.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>h<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>render<span class="token punctuation">,</span> fireEvent<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@testing-library/vue&#39;</span>
<span class="token keyword">import</span> Button <span class="token keyword">from</span> <span class="token string">&#39;@/components/Button.vue&#39;</span>

<span class="token keyword">const</span> eventTypes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Clipboard&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;copy&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;cut&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;paste&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Composition&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;compositionEnd&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;compositionStart&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;compositionUpdate&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Keyboard&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;keyDown&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;keyPress&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;keyUp&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">init</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">keyCode</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Focus&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;focus&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;blur&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;focusIn&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;focusOut&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Focus&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;submit&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;form&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Form&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;change&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;invalid&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;submit&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;reset&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Mouse&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;contextMenu&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;drag&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;dragEnd&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;dragEnter&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;dragExit&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;dragLeave&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;dragOver&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;dragStart&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;drop&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;mouseDown&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;mouseEnter&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;mouseLeave&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;mouseMove&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;mouseOut&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;mouseOver&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;mouseUp&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;button&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Selection&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;select&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Touch&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;touchCancel&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;touchEnd&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;touchMove&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;touchStart&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;button&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;UI&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;scroll&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Wheel&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;wheel&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Media&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;abort&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;canPlay&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;canPlayThrough&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;durationChange&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;emptied&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;encrypted&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;ended&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;loadedData&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;loadedMetadata&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;loadStart&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;pause&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;play&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;playing&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;progress&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;rateChange&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;seeked&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;seeking&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;stalled&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;suspend&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;timeUpdate&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;volumeChange&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;waiting&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;video&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Image&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;img&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Animation&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;animationStart&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;animationEnd&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;animationIteration&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Transition&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;transitionEnd&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Pointer&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">events</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;pointerOver&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;pointerEnter&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;pointerDown&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;pointerMove&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;pointerUp&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;pointerCancel&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;pointerOut&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;pointerLeave&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;gotPointerCapture&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;lostPointerCapture&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">elementType</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  vi<span class="token punctuation">.</span><span class="token function">spyOn</span><span class="token punctuation">(</span>console<span class="token punctuation">,</span> <span class="token string">&#39;warn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mockImplementation</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span>warn<span class="token punctuation">.</span><span class="token function">mockRestore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">capitalize</span> <span class="token operator">=</span> <span class="token parameter">str</span> <span class="token operator">=&gt;</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment">// For each event type, we assert that the right events are being triggered</span>
<span class="token comment">// when the associated fireEvent method is called.</span>
eventTypes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>type<span class="token punctuation">,</span> events<span class="token punctuation">,</span> elementType <span class="token operator">=</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> init<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">describe</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> Events</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    events<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">eventName</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">it</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">triggers </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>eventName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> testId <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>eventName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
        <span class="token keyword">const</span> spy <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">const</span> eventNameHandler <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">on</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">capitalize</span><span class="token punctuation">(</span>
          eventName<span class="token punctuation">.</span><span class="token function">toLocaleLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>

        <span class="token keyword">const</span> componentWithEvent <span class="token operator">=</span> <span class="token punctuation">{</span>
          <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>elementType<span class="token punctuation">,</span> <span class="token punctuation">{</span>
              <span class="token punctuation">[</span>eventNameHandler<span class="token punctuation">]</span><span class="token operator">:</span> spy<span class="token punctuation">,</span>
              <span class="token string-property property">&#39;data-testid&#39;</span><span class="token operator">:</span> testId<span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Render an element with a listener of the event under testing and a</span>
        <span class="token comment">// test-id attribute, so that we can get the DOM node afterwards.</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span>getByTestId<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>componentWithEvent<span class="token punctuation">)</span>

        <span class="token keyword">const</span> elem <span class="token operator">=</span> <span class="token function">getByTestId</span><span class="token punctuation">(</span>testId<span class="token punctuation">)</span>

        <span class="token keyword">await</span> fireEvent<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">(</span>elem<span class="token punctuation">,</span> init<span class="token punctuation">)</span>
        <span class="token function">expect</span><span class="token punctuation">(</span>spy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// The event is called \`dblclick\`, but fireEvent exposes a &quot;doubleClick&quot; method</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;triggers dblclick on doubleClick&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> spy <span class="token operator">=</span> vi<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> componentWithDblClick <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">onDblclick</span><span class="token operator">:</span> spy<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;Click me&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByRole<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>componentWithDblClick<span class="token punctuation">)</span>

  <span class="token keyword">const</span> elem <span class="token operator">=</span> <span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">doubleClick</span><span class="token punctuation">(</span>elem<span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>spy<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// fireEvent(node, event) is also a valid API</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;calling \`fireEvent\` directly works too&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByRole<span class="token punctuation">,</span> emitted<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>Button<span class="token punctuation">)</span>

  <span class="token keyword">const</span> button <span class="token operator">=</span> <span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> <span class="token function">fireEvent</span><span class="token punctuation">(</span>button<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Event</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveProperty</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

test<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;change&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">(</span>
  <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">fireEvent.%s prints a warning message to use fireEvent.update instead</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token parameter">event</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>getByRole<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input type=&quot;text&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">await</span> fireEvent<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&#39;textbox&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span>

    <span class="token function">expect</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>warn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledTimes</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>warn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toHaveBeenCalledWith</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Using &quot;fireEvent.</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>event<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot; may lead to unexpected results. Please use fireEvent.update() instead.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;does not warn when disabled via env var&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VTL_SKIP_WARN_EVENT_UPDATE</span> <span class="token operator">=</span> <span class="token string">&#39;true&#39;</span>

  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByTestId<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input type=&quot;text&quot; data-testid=&quot;test-update&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">input</span><span class="token punctuation">(</span><span class="token function">getByTestId</span><span class="token punctuation">(</span><span class="token string">&#39;test-update&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>warn<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;fireEvent.update does not trigger warning messages&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByTestId<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input type=&quot;text&quot; data-testid=&quot;test-update&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token function">getByTestId</span><span class="token punctuation">(</span><span class="token string">&#39;test-update&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>warn<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;fireEvent.update does not crash if non-input element is passed in&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByText<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;Hi&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;Hi&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span><span class="token function">getByText</span><span class="token punctuation">(</span><span class="token string">&#39;Hi&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatchInlineSnapshot</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      Hi
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>warn<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;fireEvent.update handles input file&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span>getByTestId<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;input type=&quot;file&quot; data-testid=&quot;test-update&quot; /&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;(\u2310\u25A1_\u25A1)&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&#39;chucknorris.png&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;image/png&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> inputEl <span class="token operator">=</span> <span class="token function">getByTestId</span><span class="token punctuation">(</span><span class="token string">&#39;test-update&#39;</span><span class="token punctuation">)</span>

  <span class="token comment">// You could replace the lines below with</span>
  <span class="token comment">// userEvent.upload(inputEl, file)</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>inputEl<span class="token punctuation">,</span> <span class="token string">&#39;files&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>inputEl<span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>warn<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toHaveBeenCalled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Esta prueba importa el componente <a href="https://github.com/testing-library/vue-testing-library/blob/main/src/__tests__/components/Button.vue" target="_blank" rel="noopener noreferrer"><code>Button.vue</code></a>.</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleClick<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ text }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;Button Text&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">emits</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">click</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token parameter">_e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Como podemos ver <a href="https://github.com/testing-library/vue-testing-library/tree/main/src/__tests__" target="_blank" rel="noopener noreferrer">aqu\xED hay muchos ejemplos</a>.</p><p>Otra cosa interesante que vale la pena mencionar es el m\xE9todo de depuraci\xF3n <a href="https://testing-library.com/docs/queries/about/#screendebug" target="_blank" rel="noopener noreferrer">screen.debug()</a>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br></div><pre><code><span class="token comment">// tests/components/myform.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen<span class="token punctuation">,</span> fireEvent<span class="token punctuation">,</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyForm <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyForm.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyForm.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;enable button when data is entered&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
    <span class="token keyword">const</span> <span class="token punctuation">{</span>emitted<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>MyForm<span class="token punctuation">)</span>

    <span class="token keyword">const</span> button <span class="token operator">=</span> screen<span class="token punctuation">.</span><span class="token function">getByRole</span><span class="token punctuation">(</span><span class="token string">&quot;button&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;Submit&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">await</span> fireEvent<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>
      screen<span class="token punctuation">.</span><span class="token function">getByLabelText</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;John&#39;</span>
    <span class="token punctuation">)</span>
    
    screen<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            
    <span class="token function">expect</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toBeDisabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fireEvent<span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span>
    
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">emitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>submit<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Este m\xE9todo <code>screen.debug()</code> lo que hace es simplemente mostrarnos el estado actual del DOM. Esto nos permitir\xE1 depurar cosas a veces y ver que est\xE1 pasando. Esto puede ser muy \xFAtil para depurar errores o descubrir que lo que est\xE1 sucediendo.</p><div class="language-"><pre><code>&lt;body&gt;
  &lt;div&gt;
    &lt;form&gt;
      &lt;label
        for=&quot;name&quot;
      &gt;
        Name
      &lt;/label&gt;
      &lt;input
        id=&quot;name&quot;
      /&gt;
      &lt;button
        role=&quot;button&quot;
      &gt;
        Submit
      &lt;/button&gt;
    &lt;/form&gt;
  &lt;/div&gt;
&lt;/body&gt;

 \u221A tests/components/myform.spec.js (1)

Test Files  1 passed (1)
     Tests  1 passed (1)
      Time  116ms
</code></pre></div><p>Otra cosa que vale la pena destacar es que Vue Testing Library es un envoltorio de Vue Test Utils. Lo que eso significa es que podemos usar casi todas la opciones de montaje que esperar\xEDamos ser capaz de usar.</p><p>Por ejemplo, la opci\xF3n de montaje <code>global</code> est\xE1 disponible y dentro de ella podemos establecer cosas como <a href="./../../vth/simulando-objetos-globales.html">simular objetos globales</a> o <a href="./../../vth/talonando-componentes.html">talonar componentes</a>. Tambi\xE9n hay muchas otras opciones como pasar <code>props</code> y <code>data</code>.</p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><div class="highlighted">\xA0</div><br><br><br><br><br></div><pre><code><span class="token comment">// tests/components/mycomponent.spec.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> screen <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@testing-library/vue&quot;</span>
<span class="token keyword">import</span> <span class="token string">&quot;@testing-library/jest-dom&quot;</span>
<span class="token keyword">import</span> MyComponent <span class="token keyword">from</span> <span class="token string">&quot;@/components/MyComponent.vue&quot;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&quot;MyComponent.vue&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&quot;should do something&quot;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>    
    <span class="token function">render</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">global</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">mocks</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token literal-property property">stubs</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Por lo tanto, si h\xE9mos utilizado Vue Test Utils antes, podemos usar la mayor parte de todo ese conocimiento con Vue Testing Library simplemente transmitiendo las opciones de montaje habituales que normalmente usar\xEDamos.</p><p>Una de las diferencias es que, en Vue Testing Library, el montaje es siempre completo, por lo que no existe el <code>shallowMount</code>. Por lo que, si tenemos un componente complejo muy grande que nos est\xE1 causando problemas, es posible que deseemos usar <code>stubs</code> para talonar ese componente y poder continuar escribiendo nuestras pruebas.</p>`,26),e=[o];function c(l,u,i,k,r,d){return a(),s("div",null,e)}var y=n(p,[["render",c]]);export{m as __pageData,y as default};
