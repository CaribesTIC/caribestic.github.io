import{_ as n,c as a,o as s,a as t}from"./app.2425fff2.js";const g='{"title":"Pasando Datos a Componentes","description":"","frontmatter":{},"headers":[{"level":2,"title":"El Componente Password","slug":"el-componente-password"},{"level":2,"title":"Usando props para establecer una longitud m\xEDnima","slug":"usando-props-para-establecer-una-longitud-minima"},{"level":2,"title":"Usando setProps","slug":"usando-setprops"},{"level":2,"title":"Conclusi\xF3n","slug":"conclusion"}],"relativePath":"vtu/esencial/pasando-datos-a-componentes.md"}',e={},o=t(`<h1 id="pasando-datos-a-componentes" tabindex="-1">Pasando Datos a Componentes <a class="header-anchor" href="#pasando-datos-a-componentes" aria-hidden="true">#</a></h1><p>Vue Test Utils proporciona varias formas de establecer datos y accesorios en un componente, para permitirle probar completamente el comportamiento del componente en diferentes escenarios.</p><p>En esta secci\xF3n, exploramos las opciones de montaje <code>data</code> y <code>props</code>, as\xED como <code>VueWrapper.setProps()</code> para actualizar din\xE1micamente los accesorios que recibe un componente.</p><h2 id="el-componente-password" tabindex="-1">El Componente Password <a class="header-anchor" href="#el-componente-password" aria-hidden="true">#</a></h2><p>Demostraremos las funciones anteriores creando un componente <code>&lt;Password&gt;</code>. Este componente verifica que una contrase\xF1a cumpla con ciertos criterios, como la longitud y la complejidad. Comenzaremos con lo siguiente y agregaremos funciones, as\xED como pruebas para asegurarnos de que las funciones trabajen correctamente:</p><div class="language-js"><pre><code><span class="token keyword">const</span> Password <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;input v-model=&quot;password&quot;&gt;
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>El primer requisito que agregaremos es una longitud m\xEDnima.</p><h2 id="usando-props-para-establecer-una-longitud-minima" tabindex="-1">Usando <code>props</code> para establecer una longitud m\xEDnima <a class="header-anchor" href="#usando-props-para-establecer-una-longitud-minima" aria-hidden="true">#</a></h2><p>Queremos reutilizar este componente en todos nuestros proyectos, cada uno de los cuales puede tener requisitos diferentes. Por esta raz\xF3n, haremos de <code>minLength</code> un <strong>accesorio</strong> que le pasaremos a <code>&lt;Password&gt;</code>:</p><p>Mostraremos un error si <code>password</code> es inferior a <code>minLength</code>. Podemos hacer esto creando una propiedad calculada <code>error</code> y renderiz\xE1ndola condicionalmente usando <code>v-if</code>:</p><div class="language-js"><pre><code><span class="token keyword">const</span> Password <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;
      &lt;input v-model=&quot;password&quot;&gt;
      &lt;div v-if=&quot;error&quot;&gt;{{ error }}&lt;/div&gt;
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">minLength</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Number
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>password<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>minLength<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Password must be at least </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>minLength<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> characters.</span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Para probar esto, necesitamos configurar <code>minLength</code>, as\xED como un <code>password</code> que sea menor que ese n\xFAmero. Podemos hacer esto usando las opciones de montaje <code>data</code> y <code>props</code>. Finalmente, afirmaremos que se muestra el mensaje de error correcto:</p><div class="language-js"><pre><code><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;renders an error if length is too short&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Password<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">minLength</span><span class="token operator">:</span> <span class="token number">10</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;short&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Password must be at least 10 characters&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Escribir una prueba para una regla <code>maxLength</code> se deja como ejercicio para el lector. Otra forma de escribir esto ser\xEDa usar <code>setValue</code> para actualizar la entrada con una contrase\xF1a demasiado corta. Puede obtener m\xE1s informaci\xF3n en <a href="./../esencial/formularios.html">Formularios</a>.</p><h2 id="usando-setprops" tabindex="-1">Usando <code>setProps</code> <a class="header-anchor" href="#usando-setprops" aria-hidden="true">#</a></h2><p>A veces, es posible que deba escribir una prueba para un efecto secundario del cambio de un accesorio. Este componente simple <code>&lt;Show&gt;</code> renderiza un saludo si el accesorio <code>show</code> es <code>true</code>.</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>show<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ greeting }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">greeting</span><span class="token operator">:</span> <span class="token string">&#39;Hello&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Para probar esto completamente, es posible que deseemos verificar que <code>greeting</code> se renderiza de manera predeterminada. Podemos actualizar el accesorio <code>greeting</code> usando <code>setProps()</code>, lo que hace que <code>greeting</code> se oculte:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/test-utils&#39;</span>
<span class="token keyword">import</span> Show <span class="token keyword">from</span> <span class="token string">&#39;@/Show.vue&#39;</span>

<span class="token function">test</span><span class="token punctuation">(</span><span class="token string">&#39;renders a greeting when show is true&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> wrapper <span class="token operator">=</span> <span class="token function">mount</span><span class="token punctuation">(</span>Show<span class="token punctuation">)</span>
  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span>

  <span class="token keyword">await</span> wrapper<span class="token punctuation">.</span><span class="token function">setProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">show</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">expect</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toContain</span><span class="token punctuation">(</span><span class="token string">&#39;Hello&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Tambi\xE9n usamos la palabra clave <code>await</code> cuando llamamos a <code>setProps()</code>, para asegurarnos de que el DOM se haya actualizado antes de que se ejecuten las afirmaciones.</p><h2 id="conclusion" tabindex="-1">Conclusi\xF3n <a class="header-anchor" href="#conclusion" aria-hidden="true">#</a></h2><ul><li>Use las opciones de montaje <code>props</code> y <code>data</code> para preestablecer el estado de un componente.</li><li>Use <code>setProps()</code> para actualizar un accesorio durante una prueba.</li><li>Use la palabra clave <code>await</code> antes de <code>setProps()</code> para asegurarse de que Vue actualice el DOM antes de que contin\xFAe la prueba.</li><li>La interacci\xF3n directa con su componente puede brindarle una mayor cobertura. Considere usar <code>setValue</code> o <code>trigger</code> en combinaci\xF3n con <code>data</code> para asegurarse de que todo funcione correctamente.</li></ul>`,22),p=[o];function c(r,l,u,i,d,k){return s(),a("div",null,p)}var h=n(e,[["render",c]]);export{g as __pageData,h as default};
