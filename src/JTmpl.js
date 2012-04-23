(function(){
	var templates = {};

	$(function(){
		$('script[type=jtmpl],script[type=text/jtmpl]').each(function() {
			JTmpl.register(this.id, this.innerHTML);
		});
	});


	var JTmpl = function() {}

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
			return transform(tmpl.clone(), new JPath(data)).children();
		} else {
			return tmpl(new JPath(data));
		}
	}
	
	function transform($elem,data) {
		$elem.find('*[data-jtp-each]').each(function() {
			var $this = $(this);
			if(!$this.parents('*[data-jtp-each]').length) {
				data.q($this.data('jtp-each'),function(i,e) {
					var res = transform($this.clone().removeAttr('data-jtp-each'), new JPath(e))
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
		
		//attr
		//retain
		
		$elem.find('*[data-jtp-attr]').each(function() {
			var $this = $(this),
			 	attr = $this.data('jtp-attr');
			if(typeof attr != 'object') {
				throw Error(attr + ' is not a clean json');
			}
			for(var name in attr) {
				var value = data.q(attr[name]) || '';
				$this.attr(name, value);
			}
			$this.removeAttr('data-jtp-attr');
		});

		$elem.find('*[data-jtp-call]').each(function() {
			var $this = $(this),
			 	tmpl = $this.data('jtp-call'),
			 	value = JTmpl.call(tmpl, data) || '';
			//select

			$this.html(value).removeAttr('data-jtp-call');
		});

		$elem.find('*[data-jtp-select]').each(function() {
			var $this = $(this),
			 	selector = $this.data('jtp-select'),
			 	value = data.q(selector).valueOf();
			
			$this.html(value).removeAttr('data-jtp-select');
		});
	


		return $elem;
	}
	
	window.JTmpl = JTmpl;
}());

