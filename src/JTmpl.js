(function(){
	var templates = {};

	$(function(){
		$('script[type=jtmpl]').each(function() {
			JTmpl.register(this.id, this.innerHTML);
		});
	});


	var JTmpl = function(id) {
		
	}

	JTmpl.register = function(id, tmpl) {
		if(typeof tmpl === 'string'){
			templates[id] = $('<div>' + tmpl + '</div>');
		} else {
			templates[id] = tmpl;
		}
	}
	JTmpl.call = function(id,data) {
		var tmpl = templates[id];
		if(tmpl instanceof jQuery){
			return transform(tmpl.clone(), data).children();
		} else {
			return tmpl(data);
		}
	}
	
	function transform($elem,data) {
		$elem.find('*[data-jtp-each]').each(function() {
			var $this = $(this);
			console.log('each', this);
			if(!$this.parents('*[data-jtp-each]').length) {
				data.q($this.data('jtpEach'),function(i,e) {
					var res = transform($this.clone().removeAttr('data-jtp-each'), e)
					$this.before(res);
				})
			}
			$this.remove();
		});
		
		$elem.find('*[data-jtp-test]').each(function() {
			var $this = $(this),
			 	selector = $this.data('jtp-test'),
				test = data.q(selector);
			
			if(!test.length || !test[0]) {
				$this.remove();
			}
			$this.removeAttr('data-jtp-test');
		});
		
		$elem.find('*[data-jtp-select]').each(function() {
			var $this = $(this),
			 	selector = $this.data('jtp-select'),
			 	value = data.q(selector).valueOf();
			
			$this.html(value).removeAttr('data-jtp-select');
		});
	
		$elem.find('*[data-jtp-call]').each(function() {
			var $this = $(this),
			 	tmpl = $this.data('jtp-call'),
			 	value = JTmpl.call(tmpl, data);

			$this.html(value).removeAttr('data-jtp-call');
		});

		return $elem;
	}
	
	window.JTmpl = JTmpl;
}());

