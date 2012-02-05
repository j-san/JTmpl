module('add')
test('',function(){
	data = new JPath({
		directory:[{
			firstname:'Steven',
			lastname:'Test'
		}]
	});
	$('#test-fixture').append(JTmpl.call('example1',data));
})