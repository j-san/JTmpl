(function(){
	$('script[type=jtmpl]').each(function(){
		...
	})
	
	function transform($elem){
		$elem.find('*[data-jtmpl-each]').each(function() {
			var $this = $(this)
			if(!$this.closest('*[data-jtmpl-each]').length) {
				$this.clone()
				transform($this)
			}
		})
		$elem.find('*[data-jtmpl-select], test*[data-jtmpl-test]').each(function(){
			if(!test) {
				$this.remove()
			}
			if(select) {
				$this.html(select)
			}
		})
	}
}())

