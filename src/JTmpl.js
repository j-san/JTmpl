(function(){
	var templates = {};

	$(function(){
		$('script[type=jtmpl]').each(function() {
			JTmpl.register(this.id, '<div>' + this.innerHTML + '</div>');
		});
	});


	var JTmpl = function(id) {
		
	}

	JTmpl.register = function(id,html) {
		templates[id] = $(html);
	}
	JTmpl.call = function(id,data) {
		return transform(templates[id].clone(),data);
	}
	
	function transform($elem,data) {
		console.log('transform', data);
		$elem.find('*[data-jtmpl-each]').each(function() {
			var $this = $(this);
			console.log('each', this);
			if(!$this.parents('*[data-jtmpl-each]').length) {
				data.q($this.data('jtmplEach'),function(i,e) {
					var res = transform($this.clone().removeAttr('data-jtmpl-each'), e)
					console.log('res',res)
					$this.after(res);
				})
			}
			$this.remove();
		});
		
		$elem.find('*[data-jtmpl-select], test*[data-jtmpl-test]').each(function() {
			var $this = $(this);
			if(!$this.parents('*[data-jtmpl-each]').length) {
				if($this.data('jtmplTest')) {
					test = data.q($this.data('jtmplTest'));
					if(!test) {
						$this.remove();
					}
				}
				if($this.data('jtmplSelect')) {
					var selector = $this.data('jtmplSelect')
					var value = data.q(selector).valueOf()
					console.log(selector, '=', value)
					$this.html(value).removeAttr('data-jtmpl-select');
				}
				console.log(this)
			}
		});
		return $elem;
	}
	
	window.JTmpl = JTmpl;
}());

