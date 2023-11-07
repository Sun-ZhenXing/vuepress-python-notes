import{_ as c,r as o,o as D,c as t,b as s,a,w as p,d as n,e as i}from"./app-69c72c30.js";const r={},d=s("h1",{id:"7-pyside6-样式和动画",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#7-pyside6-样式和动画","aria-hidden":"true"},"#"),n(" 7. PySide6 样式和动画")],-1),y={class:"table-of-contents"},v=s("h2",{id:"qss-基本语法",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#qss-基本语法","aria-hidden":"true"},"#"),n(" QSS 基本语法")],-1),u={class:"hint-container tip"},C=s("p",{class:"hint-container-title"},"参考文档",-1),b={href:"https://doc.qt.io/qt-6/stylesheet-reference.html#list-of-properties",target:"_blank",rel:"noopener noreferrer"},m={href:"https://doc.qt.io/qt-6/stylesheet-examples.html",target:"_blank",rel:"noopener noreferrer"},_=i(`<p>类似 CSS，QSS 每一条都是由一个选择器和一组声明构成：</p><ul><li>选择器选出要对哪种控件进行样式修改</li><li>每个声明都是键值对，键为属性，值为属性值</li></ul><div class="language-css" data-ext="css"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#D4D4D4;">QWidget {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#000</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">background-color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#fff</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式" aria-hidden="true">#</a> 使用方式</h2><p>为降低耦合，往往把 QSS 写在一个单独的 <code>style.qss</code> 文件中，然后在 <code>main.py</code> 的 <code>QMainWindow</code> 中加载样式。</p><p>新建一个扩展名为 <code>.qss</code> 的文件，如 <code>style.qss</code>，编辑内容。</p><div class="language-css" data-ext="css"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#D4D4D4;">QWidget {</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#e34fff</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#9CDCFE;">background-color</span><span style="color:#D4D4D4;">: </span><span style="color:#CE9178;">#000</span><span style="color:#D4D4D4;">;</span></span>
<span class="line"><span style="color:#D4D4D4;">}</span></span>
<span class="line"></span></code></pre></div><p>在 <code>main.py</code> 中加载样式：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> sys</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> PySide6.QtCore </span><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> QFile, Qt</span></span>
<span class="line"><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> PySide6.QtWidgets </span><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> QApplication, QLabel, QMainWindow</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">QSSLoader</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">def</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">__init__</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">self</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">path</span><span style="color:#D4D4D4;">: </span><span style="color:#4EC9B0;">str</span><span style="color:#D4D4D4;">) -&gt; </span><span style="color:#569CD6;">None</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._path = path</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">def</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">load</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">self</span><span style="color:#D4D4D4;">) -&gt; </span><span style="color:#4EC9B0;">str</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">        f = QFile(</span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._path)</span></span>
<span class="line"><span style="color:#D4D4D4;">        f.open(QFile.ReadOnly | QFile.Text)</span></span>
<span class="line"><span style="color:#D4D4D4;">        stylesheet = f.readAll()</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">return</span><span style="color:#D4D4D4;"> stylesheet.data().decode(</span><span style="color:#CE9178;">&quot;utf-8&quot;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">MainWindow</span><span style="color:#D4D4D4;">(</span><span style="color:#4EC9B0;">QMainWindow</span><span style="color:#D4D4D4;">):</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">def</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">__init__</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">self</span><span style="color:#D4D4D4;">):</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#4EC9B0;">super</span><span style="color:#D4D4D4;">().</span><span style="color:#DCDCAA;">__init__</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.setWindowTitle(</span><span style="color:#CE9178;">&quot;QSS Demo&quot;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.resize(</span><span style="color:#B5CEA8;">400</span><span style="color:#D4D4D4;">, </span><span style="color:#B5CEA8;">300</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        label = QLabel(</span><span style="color:#CE9178;">&quot;Hello World&quot;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">        label.setAlignment(Qt.AlignCenter)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.setCentralWidget(label)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">__name__</span><span style="color:#D4D4D4;"> == </span><span style="color:#CE9178;">&quot;__main__&quot;</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">    app = QApplication(sys.argv)</span></span>
<span class="line"><span style="color:#D4D4D4;">    window = MainWindow()</span></span>
<span class="line"><span style="color:#D4D4D4;">    window.setStyleSheet(QSSLoader(</span><span style="color:#CE9178;">&quot;style.qss&quot;</span><span style="color:#D4D4D4;">).load())</span></span>
<span class="line"><span style="color:#D4D4D4;">    window.show()</span></span>
<span class="line"><span style="color:#D4D4D4;">    sys.exit(app.exec())</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动态修改" tabindex="-1"><a class="header-anchor" href="#动态修改" aria-hidden="true">#</a> 动态修改</h2>`,10),E={href:"https://github.com/hektorprofe/curso-qt-pyside-udemy",target:"_blank",rel:"noopener noreferrer"},f=i(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="shiki dark-plus" style="background-color:#1E1E1E;" tabindex="0"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> sys</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">from</span><span style="color:#D4D4D4;"> PySide6.QtWidgets </span><span style="color:#C586C0;">import</span><span style="color:#D4D4D4;"> (</span></span>
<span class="line"><span style="color:#D4D4D4;">    QApplication,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QCheckBox,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QFormLayout,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QLabel,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QLineEdit,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QMainWindow,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QPlainTextEdit,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QPushButton,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QRadioButton,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QSpinBox,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QVBoxLayout,</span></span>
<span class="line"><span style="color:#D4D4D4;">    QWidget,</span></span>
<span class="line"><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">STYLE = </span><span style="color:#CE9178;">&quot;&quot;&quot;QMainWindow {</span></span>
<span class="line"><span style="color:#CE9178;">    background-color: #212121;</span></span>
<span class="line"><span style="color:#CE9178;">}</span></span>
<span class="line"><span style="color:#CE9178;">QLabel {</span></span>
<span class="line"><span style="color:#CE9178;">    color: #e9e9e9;</span></span>
<span class="line"><span style="color:#CE9178;">}</span></span>
<span class="line"><span style="color:#CE9178;">QPushButton {</span></span>
<span class="line"><span style="color:#CE9178;">    background-color: orange;</span></span>
<span class="line"><span style="color:#CE9178;">    font-family: &#39;Arial&#39;;</span></span>
<span class="line"><span style="color:#CE9178;">    font-size: 14px;</span></span>
<span class="line"><span style="color:#CE9178;">    font-weight: bold;</span></span>
<span class="line"><span style="color:#CE9178;">}</span></span>
<span class="line"><span style="color:#CE9178;">&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">QSSEditor</span><span style="color:#D4D4D4;">(</span><span style="color:#4EC9B0;">QWidget</span><span style="color:#D4D4D4;">):</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">def</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">__init__</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">self</span><span style="color:#D4D4D4;">, </span><span style="color:#9CDCFE;">parent</span><span style="color:#D4D4D4;">: QWidget | </span><span style="color:#569CD6;">None</span><span style="color:#D4D4D4;"> = </span><span style="color:#569CD6;">None</span><span style="color:#D4D4D4;">):</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#4EC9B0;">super</span><span style="color:#D4D4D4;">().</span><span style="color:#DCDCAA;">__init__</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._parent = parent</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.resize(</span><span style="color:#B5CEA8;">480</span><span style="color:#D4D4D4;">, </span><span style="color:#B5CEA8;">320</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.setWindowTitle(</span><span style="color:#CE9178;">&quot;QSS Editor&quot;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._editor = QPlainTextEdit()</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._editor.setStyleSheet(</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#CE9178;">&quot;background-color: #212121;color: #e9e9e9;&quot;</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#CE9178;">&quot;font-family: Consolas; font-size: 16px; &quot;</span></span>
<span class="line"><span style="color:#D4D4D4;">        )</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._editor.setFont(</span><span style="color:#CE9178;">&quot;Consolas&quot;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._editor.setPlainText(STYLE)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._editor.textChanged.connect(</span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.update_style)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        layout = QVBoxLayout()</span></span>
<span class="line"><span style="color:#D4D4D4;">        layout.addWidget(</span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._editor)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.setLayout(layout)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.show()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">def</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">update_style</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">self</span><span style="color:#D4D4D4;">):</span></span>
<span class="line"><span style="color:#D4D4D4;">        qss = </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._editor.toPlainText()</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">try</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._parent.setStyleSheet(qss)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#C586C0;">except</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">            </span><span style="color:#C586C0;">pass</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">class</span><span style="color:#D4D4D4;"> </span><span style="color:#4EC9B0;">MainWindow</span><span style="color:#D4D4D4;">(</span><span style="color:#4EC9B0;">QMainWindow</span><span style="color:#D4D4D4;">):</span></span>
<span class="line"><span style="color:#D4D4D4;">    </span><span style="color:#569CD6;">def</span><span style="color:#D4D4D4;"> </span><span style="color:#DCDCAA;">__init__</span><span style="color:#D4D4D4;">(</span><span style="color:#9CDCFE;">self</span><span style="color:#D4D4D4;">):</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#4EC9B0;">super</span><span style="color:#D4D4D4;">().</span><span style="color:#DCDCAA;">__init__</span><span style="color:#D4D4D4;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        layout = QFormLayout()</span></span>
<span class="line"><span style="color:#D4D4D4;">        layout.addRow(</span><span style="color:#CE9178;">&quot;QCheckBox&quot;</span><span style="color:#D4D4D4;">, QCheckBox())</span></span>
<span class="line"><span style="color:#D4D4D4;">        layout.addRow(</span><span style="color:#CE9178;">&quot;QRadioButton&quot;</span><span style="color:#D4D4D4;">, QRadioButton())</span></span>
<span class="line"><span style="color:#D4D4D4;">        layout.addRow(</span><span style="color:#CE9178;">&quot;QLabel&quot;</span><span style="color:#D4D4D4;">, QLabel(</span><span style="color:#CE9178;">&quot;QLabel&quot;</span><span style="color:#D4D4D4;">))</span></span>
<span class="line"><span style="color:#D4D4D4;">        layout.addRow(</span><span style="color:#CE9178;">&quot;QPushButton&quot;</span><span style="color:#D4D4D4;">, QPushButton(</span><span style="color:#CE9178;">&quot;QPushButton&quot;</span><span style="color:#D4D4D4;">))</span></span>
<span class="line"><span style="color:#D4D4D4;">        layout.addRow(</span><span style="color:#CE9178;">&quot;QLineEdit&quot;</span><span style="color:#D4D4D4;">, QLineEdit(</span><span style="color:#CE9178;">&quot;QLineEdit&quot;</span><span style="color:#D4D4D4;">))</span></span>
<span class="line"><span style="color:#D4D4D4;">        layout.addRow(</span><span style="color:#CE9178;">&quot;QSpinBox&quot;</span><span style="color:#D4D4D4;">, QSpinBox())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        widget = QWidget()</span></span>
<span class="line"><span style="color:#D4D4D4;">        widget.setLayout(layout)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.setCentralWidget(widget)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        label = QLabel(</span><span style="color:#CE9178;">&quot;QLabel&quot;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">        label.setObjectName(</span><span style="color:#CE9178;">&quot;label&quot;</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">        layout.addRow(label)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">._qss_editor = QSSEditor(</span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">)</span></span>
<span class="line"><span style="color:#D4D4D4;">        </span><span style="color:#569CD6;">self</span><span style="color:#D4D4D4;">.setStyleSheet(STYLE)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0;">if</span><span style="color:#D4D4D4;"> </span><span style="color:#9CDCFE;">__name__</span><span style="color:#D4D4D4;"> == </span><span style="color:#CE9178;">&quot;__main__&quot;</span><span style="color:#D4D4D4;">:</span></span>
<span class="line"><span style="color:#D4D4D4;">    app = QApplication(sys.argv)</span></span>
<span class="line"><span style="color:#D4D4D4;">    window = MainWindow()</span></span>
<span class="line"><span style="color:#D4D4D4;">    window.show()</span></span>
<span class="line"><span style="color:#D4D4D4;">    sys.exit(app.exec())</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function h(Q,q){const l=o("router-link"),e=o("ExternalLinkIcon");return D(),t("div",null,[d,s("nav",y,[s("ul",null,[s("li",null,[a(l,{to:"#qss-基本语法"},{default:p(()=>[n("QSS 基本语法")]),_:1})]),s("li",null,[a(l,{to:"#使用方式"},{default:p(()=>[n("使用方式")]),_:1})]),s("li",null,[a(l,{to:"#动态修改"},{default:p(()=>[n("动态修改")]),_:1})])])]),v,s("div",u,[C,s("ul",null,[s("li",null,[s("a",b,[n("QSS 可用属性：官方文档"),a(e)])]),s("li",null,[s("a",m,[n("QSS 官方示例"),a(e)])])])]),_,s("p",null,[n("部分参考了 "),s("a",E,[n("hektorprofe/curso-qt-pyside-udemy"),a(e)]),n(" 的代码。")]),f])}const g=c(r,[["render",h],["__file","index.html.vue"]]);export{g as default};
