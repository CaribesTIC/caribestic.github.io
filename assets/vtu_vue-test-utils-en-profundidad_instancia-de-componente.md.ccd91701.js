import{_ as n,c as s,o as a,a as e}from"./app.1bf5b695.js";const g='{"title":"Instancia de Componente","description":"","frontmatter":{},"headers":[{"level":2,"title":"Un Ejemplo Simple","slug":"un-ejemplo-simple"},{"level":2,"title":"Uso con getComponent y findComponent","slug":"uso-con-getcomponent-y-findcomponent"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vtu/vue-test-utils-en-profundidad/instancia-de-componente.md"}',o={},t=e(`<h1 id="instancia-de-componente" tabindex="-1">Instancia de Componente <a class="header-anchor" href="#instancia-de-componente" aria-hidden="true">#</a></h1><p><code>mount</code> devuelve un <code>VueWrapper</code> con muchos m\xE9todos convenientes para probar los componentes de Vue. A veces, es posible que desee acceder a la instancia subyacente de Vue. Puede acceder a eso con la propiedad <code>vm</code>.</p><h2 id="un-ejemplo-simple" tabindex="-1">Un Ejemplo Simple <a class="header-anchor" href="#un-ejemplo-simple" aria-hidden="true">#</a></h2><p>Aqu\xED hay un componente simple que combina accesorios y datos para representar un saludo:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;renders a greeting&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> Comp <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;{{ msg1 }} {{ msg2 }}&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;msg1&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">msg2</span><span class="token operator">:</span> <span class="token string">&#39;world&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Comp<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg1</span><span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token comment">// console.log(wrapper.vm)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Echemos un vistazo a lo que est\xE1 disponible en <code>vm</code> con <code>console.log(wrapper.vm)</code>:</p><div class="language-"><pre><code>{
  msg1: [Getter/Setter],
  msg2: [Getter/Setter],
  hasOwnProperty: [Function]
}
</code></pre></div><p>\xA1Podemos ver tanto <code>msg1</code> como <code>msg2</code>! Tambi\xE9n se mostrar\xE1n cosas como <code>methods</code> y propiedades <code>computed</code>, si est\xE1n definidas. Al escribir una prueba, si bien generalmente se recomienda afirmar contra el DOM (usando algo como <code>wrapper.html()</code>), en algunas circunstancias excepcionales es posible que necesite acceso a la instancia de Vue subyacente.</p><h2 id="uso-con-getcomponent-y-findcomponent" tabindex="-1">Uso con <code>getComponent</code> y <code>findComponent</code> <a class="header-anchor" href="#uso-con-getcomponent-y-findcomponent" aria-hidden="true">#</a></h2><p><code>getComponent</code> y <code>findComponent</code> devuelven un <code>VueWrapper</code>, muy parecido al que se obtiene de <code>mount</code>. Esto significa que tambi\xE9n puede acceder a las mismas propiedades, incluida <code>vm</code>, en el resultado de <code>getComponent</code> o <code>findComponent</code>.</p><p>Aqu\xED hay un ejemplo simple:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;asserts correct props are passed&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;msg&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;{{ msg }}&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> Comp <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> Foo <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;&lt;foo msg=&quot;hello world&quot; /&gt;&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Comp<span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">getComponent</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span><span class="token punctuation">.</span>vm<span class="token punctuation">.</span>msg<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toBe</span><span class="token punctuation">(</span><span class="token string">&#39;hello world&#39;</span><span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">getComponent</span><span class="token punctuation">(</span>Foo<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">props</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toEqual</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;hello world&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Una forma m\xE1s completa de probar esto ser\xEDa afirmar contra el contenido renderizado. Hacer esto significa que afirma que se pasa <em>y</em> se procesa la propiedad correcta.</p><div class="tip custom-block"><p class="custom-block-title">CONSEJO</p><p>Nota: si est\xE1 utilizando un componente <code>&lt;script setup&gt;</code>, <code>vm</code> no estar\xE1 disponible. Esto se debe a que los componentes de <code>&lt;script setup&gt;</code> est\xE1n cerrados <a href="https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md#exposing-components-public-interface" target="_blank" rel="noopener noreferrer">de forma predeterminada</a>. Para estos componentes, y en general, considere evitar <code>vm</code> y afirmar contra el marcado renderizado.</p></div><div class="warning custom-block"><p class="custom-block-title">ADVERTENCIA</p><p>Tipo WrapperLike cuando se usa el selector CSS</p><p>Al usar <code>wrapper.findComponent(&#39;.foo&#39;)</code>, por ejemplo, VTU devolver\xE1 el tipo <code>WrapperLike</code>. Esto se debe a que los componentes funcionales necesitar\xEDan un <code>DOMWrapper</code>, de lo contrario, un <code>VueWrapper</code>. Puede forzar la devoluci\xF3n de un <code>VueWrapper</code> proporcionando el tipo de componente correcto:</p><div class="language-ts"><pre><code>wrapper<span class="token punctuation">.</span><span class="token function">findComponent</span><span class="token punctuation">(</span><span class="token string">&#39;.foo&#39;</span><span class="token punctuation">)</span> <span class="token comment">// returns WrapperLike</span>
wrapper<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">findComponent</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">typeof</span> FooComponent<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&#39;.foo&#39;</span><span class="token punctuation">)</span> <span class="token comment">// returns VueWrapper</span>
wrapper<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">findComponent</span><span class="token generic class-name"><span class="token operator">&lt;</span>DefineComponent<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&#39;.foo&#39;</span><span class="token punctuation">)</span> <span class="token comment">// returns VueWrapper</span>
</code></pre></div></div><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Use <code>vm</code> para acceder a la instancia interna de Vue</li><li><code>getComponent</code> y <code>findComponent</code> devuelven un contenedor Vue. Esas instancias de Vue tambi\xE9n est\xE1n disponibles a trav\xE9s de <code>vm</code></li></ul>`,17),p=[t];function c(l,r,i,u,d,k){return a(),s("div",null,p)}var f=n(o,[["render",c]]);export{g as __pageData,f as default};