[documentation](http://j-san.github.com//JTmpl)
goals
-----
- No text based parser, no language to learn, all known html/javascript
- Streight to the point
- Simple to use
- Power of the XPath sintax serving javascript

usage
-----
	<script id="contact-list" type="jtmpl">
		<div jtmpl-each="contacts">
			<p jtmpl-test="info/firstname or info/lastname">
	    		<span jtmpl-select="info/firstname">Default value</span>
	    		<span jtmpl-select="info/lastname">Default value</span>
			</p>
			<p jtmpl-test="info/company">
	    		<span jtmpl-select="info/company">Default value</span>
			</p>
			<span jtmpl-test="category='work'">(work)</span>
		</div>
	</script>


