import{_ as o,r as p,o as c,c as r,b as s,a as l,w as e,d as n,e as D}from"./app-VcvQJWSe.js";const i={},t=s("h1",{id:"sqlalchemy-连接池中的连接失效",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#sqlalchemy-连接池中的连接失效","aria-hidden":"true"},"#"),n(" SQLAlchemy 连接池中的连接失效")],-1),y={class:"table-of-contents"},d=D(`<h2 id="1-问题复现" tabindex="-1"><a class="header-anchor" href="#1-问题复现" aria-hidden="true">#</a> 1. 问题复现</h2><p>在使用 SQLAlchemy 连接 MySQL 时，如果 MySQL 服务端主动断开连接，那么 SQLAlchemy 会报错。</p><p>查看 MySQL 连接超时时间 <code>wait_timeout</code>，如未进行配置，默认值为 28800，即 8 小时。</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#D4D4D4;">show </span><span style="color:#569CD6;">global</span><span style="color:#D4D4D4;"> variables </span><span style="color:#569CD6;">like</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;%timeout%&#39;</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span></code></pre></div><p>设置 MySQL 超时时间为 2 秒：</p><div class="language-sql" data-ext="sql"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#569CD6;">set</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">global</span><span style="color:#D4D4D4;"> wait_timeout=</span><span style="color:#B5CEA8;">2</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"></span></code></pre></div><p>下面是在使用 <code>asyncio-mqtt</code> 时出现的问题，如果取消注释 <code>await asyncio.sleep(3)</code>，连接将被闲置 3 秒，此时 MySQL 已经断开连接，再次发送请求时，就会报错。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> asyncio</span></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> sys</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> asyncio_mqtt </span><span style="color:#C586C0;">as</span><span style="color:#D4D4D4;"> aiomqtt</span></span>
<span class="line"><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> sqlalchemy.ext.asyncio </span><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> async_sessionmaker, create_async_engine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> config</span></span>
<span class="line"><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> src.services.save_data </span><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> select_strategy</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> sys.platform == </span><span style="color:#CE9178;">&#39;win32&#39;</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())</span></span>
<span class="line"><span style="color:#C586C0;">else</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> uvloop</span></span>
<span class="line"><span style="color:#D4D4D4;">    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">engine = create_async_engine(config.DB_URL, </span><span style="color:#9CDCFE;">echo</span><span style="color:#D4D4D4;">=</span><span style="color:#569CD6;">False</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">session = async_sessionmaker(</span></span>
<span class="line"><span style="color:#D4D4D4;">    engine,</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">expire_on_commit</span><span style="color:#D4D4D4;">=</span><span style="color:#569CD6;">False</span></span>
<span class="line"><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">async</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">def</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">main</span><span style="color:#D4D4D4;">():</span></span>
<span class="line"><span style="color:#D4D4D4;">    reconnect_interval = </span><span style="color:#B5CEA8;">1.0</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#C586C0;">while</span><span style="color:#D4D4D4;"> </span><span style="color:#569CD6;">True</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">try</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#C586C0;">async</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">with</span><span style="color:#D4D4D4;"> aiomqtt.Client(config.MQTT_URL) </span><span style="color:#C586C0;">as</span><span style="color:#D4D4D4;"> client:</span></span>
<span class="line"><span style="color:#D4D4D4;">                </span><span style="color:#C586C0;">await</span><span style="color:#D4D4D4;"> client.subscribe(</span><span style="color:#CE9178;">&#39;Home/#&#39;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">                </span><span style="color:#C586C0;">async</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">with</span><span style="color:#D4D4D4;"> client.messages() </span><span style="color:#C586C0;">as</span><span style="color:#D4D4D4;"> messages:</span></span>
<span class="line"><span style="color:#D4D4D4;">                    </span><span style="color:#C586C0;">async</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">for</span><span style="color:#D4D4D4;"> message </span><span style="color:#C586C0;">in</span><span style="color:#D4D4D4;"> messages:</span></span>
<span class="line"><span style="color:#D4D4D4;">                        </span><span style="color:#C586C0;">try</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">                            msg = message.payload.decode()</span></span>
<span class="line"><span style="color:#D4D4D4;">                            </span><span style="color:#DCDCAA;">print</span><span style="color:#D4D4D4;">(message.topic.value, </span><span style="color:#CE9178;">&#39;</span><span style="color:#D7BA7D;">\\t</span><span style="color:#CE9178;">&#39;</span><span style="color:#D4D4D4;">, msg)</span></span>
<span class="line"><span style="color:#D4D4D4;">                            </span><span style="color:#6A9955;"># 这是业务函数入口</span></span>
<span class="line"><span style="color:#D4D4D4;">                            </span><span style="color:#C586C0;">await</span><span style="color:#D4D4D4;"> select_strategy(session, message.topic.value, msg)</span></span>
<span class="line"><span style="color:#D4D4D4;">                        </span><span style="color:#C586C0;">except</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">UnicodeDecodeError</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">                            </span><span style="color:#DCDCAA;">print</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;[ERROR] decode error&#39;</span><span style="color:#D4D4D4;">,</span></span>
<span class="line"><span style="color:#D4D4D4;">                                  message.topic.value, message.payload)</span></span>
<span class="line"><span style="color:#D4D4D4;">                    </span><span style="color:#6A9955;"># await asyncio.sleep(3)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">except</span><span style="color:#D4D4D4;"> aiomqtt.MqttError </span><span style="color:#C586C0;">as</span><span style="color:#D4D4D4;"> error:</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#DCDCAA;">print</span><span style="color:#D4D4D4;">(</span></span>
<span class="line"><span style="color:#D4D4D4;">                </span><span style="color:#569CD6;">f</span><span style="color:#CE9178;">&#39;Error \`</span><span style="color:#569CD6;">{</span><span style="color:#D4D4D4;">error</span><span style="color:#569CD6;">}</span><span style="color:#CE9178;">\`. Reconnecting in </span><span style="color:#569CD6;">{</span><span style="color:#D4D4D4;">reconnect_interval</span><span style="color:#569CD6;">}</span><span style="color:#CE9178;"> seconds.&#39;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#C586C0;">await</span><span style="color:#D4D4D4;"> asyncio.sleep(reconnect_interval)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">except</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">Exception</span><span style="color:#D4D4D4;"> </span><span style="color:#C586C0;">as</span><span style="color:#D4D4D4;"> e:</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#DCDCAA;">print</span><span style="color:#D4D4D4;">(</span><span style="color:#CE9178;">&#39;[ERROR] &#39;</span><span style="color:#D4D4D4;">, e)</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#DCDCAA;">print</span><span style="color:#D4D4D4;">(message.topic.value, message.payload)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">__name__</span><span style="color:#D4D4D4;"> == </span><span style="color:#CE9178;">&#39;__main__&#39;</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">    asyncio.run(main())</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SQLAlchemy 会报错：</p><div class="language-bash" data-ext="sh"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#D4D4D4;">[ERROR]  (</span><span style="color:#DCDCAA;">pymysql.err.OperationalError</span><span style="color:#D4D4D4;">) (</span><span style="color:#DCDCAA;">2013,</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">&#39;Lost connection to MySQL server during query&#39;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">(</span><span style="color:#DCDCAA;">Background</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">on</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">this</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">error</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">at:</span><span style="color:#D4D4D4;"> </span><span style="color:#CE9178;">https://sqlalche.me/e/20/e3q8</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span></code></pre></div><h2 id="2-解决方案" tabindex="-1"><a class="header-anchor" href="#2-解决方案" aria-hidden="true">#</a> 2. 解决方案</h2><p>我们先学习一下 SQLAlchemy 的连接池参数。</p><ul><li><code>pool_size</code>：设置连接池中，保持的连接数。初始化时并不产生连接。</li><li><code>max_overflow</code>：当连接池里的连接数已达到 <code>pool_size</code> 时，且都被使用时。又要求从连接池里获取连接时，<code>max_overflow</code> 就是允许再新建的连接数。</li><li><code>pool_timeout</code>：从连接池里获取连接，如果此时无空闲的连接。且连接数已经到达了 <code>pool_size+max_overflow</code>。此时获取连接的进程会等待 <code>pool_timeout</code> 秒。如果超过这个时间，还没有获得将会抛出异常，默认为 30 秒。</li><li><code>pool_recycle</code>：数据库连接的生存时间。一个连接当连接空闲 <code>pool_recycle</code> 秒后，会被重置。默认为 -1，即永久可用。</li></ul><p>当 <code>pool_recycle</code> 设置为 -1 时，也就是连接池不会主动丢弃这个连接。但是有可能数据库设置了连接超时时间。例如 MySQL，设置的有 <code>wait_timeout</code> 默认为 28800。当连接空闲 8 小时时会自动断开。</p><h3 id="21-不使用连接池" tabindex="-1"><a class="header-anchor" href="#21-不使用连接池" aria-hidden="true">#</a> 2.1 不使用连接池</h3><p>在创建引擎时，设置 <code>poolclass=NullPool</code>，不使用连接池。</p><p>缺点是降低连接效率。</p><div class="language-python" data-ext="py"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#D4D4D4;">engine = create_async_engine(config.DB_URL, </span><span style="color:#9CDCFE;">echo</span><span style="color:#D4D4D4;">=</span><span style="color:#569CD6;">False</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">poolclass</span><span style="color:#D4D4D4;">=NullPool)</span></span>
<span class="line"></span></code></pre></div><h3 id="22-设置连接超时时间" tabindex="-1"><a class="header-anchor" href="#22-设置连接超时时间" aria-hidden="true">#</a> 2.2 设置连接超时时间</h3><p>在创建引擎时，设置 <code>pool_recycle=3600</code>，每 3600 秒（1 小时）回收连接，建议和 <code>pool_pre_ping=True</code> 一起使用。</p><div class="language-python" data-ext="py"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#D4D4D4;">engine = create_async_engine(config.DB_URL, </span><span style="color:#9CDCFE;">echo</span><span style="color:#D4D4D4;">=</span><span style="color:#569CD6;">False</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">pool_recycle</span><span style="color:#D4D4D4;">=</span><span style="color:#B5CEA8;">3600</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span></code></pre></div><h3 id="23-自动重连" tabindex="-1"><a class="header-anchor" href="#23-自动重连" aria-hidden="true">#</a> 2.3 自动重连</h3><p>设置 <code>pool_pre_ping=True</code>，每次从连接池中取出连接时，都会先尝试 ping（相当于 <code>SELECT 1</code>），如果连接已经断开，那么 SQLAlchemy 会自动重连，并放弃所有旧的连接。</p><p>如果出现错误将最多重试 3 次，否则此错误正常抛出。</p><div class="language-python" data-ext="py"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#D4D4D4;">engine = create_async_engine(config.DB_URL, </span><span style="color:#9CDCFE;">echo</span><span style="color:#D4D4D4;">=</span><span style="color:#569CD6;">False</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">pool_pre_ping</span><span style="color:#D4D4D4;">=</span><span style="color:#569CD6;">True</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span></code></pre></div>`,25);function C(v,u){const a=p("router-link");return c(),r("div",null,[t,s("nav",y,[s("ul",null,[s("li",null,[l(a,{to:"#1-问题复现"},{default:e(()=>[n("1. 问题复现")]),_:1})]),s("li",null,[l(a,{to:"#2-解决方案"},{default:e(()=>[n("2. 解决方案")]),_:1}),s("ul",null,[s("li",null,[l(a,{to:"#21-不使用连接池"},{default:e(()=>[n("2.1 不使用连接池")]),_:1})]),s("li",null,[l(a,{to:"#22-设置连接超时时间"},{default:e(()=>[n("2.2 设置连接超时时间")]),_:1})]),s("li",null,[l(a,{to:"#23-自动重连"},{default:e(()=>[n("2.3 自动重连")]),_:1})])])])])]),d])}const _=o(i,[["render",C],["__file","sqlalchemy-lost-connection.html.vue"]]);export{_ as default};