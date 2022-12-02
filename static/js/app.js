let selGoods = []

$('.tdGoods').on('click', function(e) {
    let url = '/sel/?id=' + e.target.id
    $.ajax({
        url: url,
        type: 'GET',
        success: function (request) {
            selGoods.push(request['data'][0])
            // $('#selItems').append('<tr><td>1</td><td>' + request['data'][0]['good_name'] +'</td></tr>')
            // alert(request['data'][0]['good_name'])
            // $('#name').text(request['data'][0]['good_name'])
            $('#name').val(request['data'][0]['good_name'])
            $('#count').focus().val(1)
            $('#addItem').modal('show')
        }
    })
})