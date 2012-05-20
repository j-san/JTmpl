QUnit.module('basic');


function runTest(JTmpl) {
    var data = new JPath({
        directory:{
            testfamily:[{
                    firstname:'Steven',
                    lastname:'Test'
                },{
                    firstname:'Brian',
                    lastname:'Test',
                    category:'work'
                },{
                    firstname:'Kely',
                    lastname:'Test'
                },{
                    firstname:'Jason',
                    lastname:'Test'
                }],
            'ateam':[{
                    nickname:'Hannibal',
                    actor:'George Peppard',
                    rank:'Colonel'
                },{
                    nickname:'Futé',
                    actor:'Dirk Benedict',
                    rank:'Lieutenant'
                },{
                    nickname:'Looping',
                    actor:'Dwight Schultz',
                    rank:'Capitaine'
                },{
                    nickname:'Barracuda',
                    actor:'Mister T',
                    rank:'Sergent'
                }]
            
        }
    });

    test('Basic template',function(){

        JTmpl.register('example1','<div>\
            <p data-jtp-each="directory/testfamily">\
                <span data-jtp-select="firstname">Default value</span>\
                <strong data-jtp-select="lastname">Default value</strong>\
                <span data-jtp-test="category=\'work\'">(work)</span>\
            </p>\
        </div>');
        $res = JTmpl.call('example1', data);
        console.log($res.html());
        //$('#qunit-fixture').append($res);
        equal($res.find('p').length, 4);
        equal($res.find('p:nth-child(1) *:nth-child(1)').text(), 'Steven');
        // equal($res.find('p:nth-child(2)').children().length, 3);
        equal($res.find('p:nth-child(3) *:nth-child(2)').text(), 'Test');
    });

    test('Basic template 2',function(){
        expect(7);
        JTmpl.register('actor',
            '<span data-jtp-select="actor">nobody</span>');
        JTmpl.register('function',function(){
            ok(true);
            return 'function called';
        });
        JTmpl.register('example2','<div>\
            <p data-jtp-each="directory/ateam">\
                <strong data-jtp-select="nickname">None</strong>\
                (<span data-jtp-call="actor">nobody</span>)\
                <span data-jtp-select="rank">soldier</span>\
                <span data-jtp-call="function">test</span>\
            </p>\
        </div>');
        $res = JTmpl.call('example2',data);
        //$('#qunit-fixture').append($res);
        equal($res.find('p').length, 4);
        equal($res.find('p:nth-child(1) > *:nth-child(1)').text(), 'Hannibal');
        // equal($res.find('p:nth-child(2)').children().length, 3);
        equal($res.find('p:nth-child(3) > *:nth-child(3)').text(), 'Capitaine');
    });

};
if (typeof load != 'undefined') {
    load(function(JTmpl) {
        runTest(JTmpl);
    });
} else {
    runTest(JTmpl);
}
