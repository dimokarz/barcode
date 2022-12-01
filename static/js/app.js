let selGoods = []

$('.tdGoods').on('click', function(e) {
    let url = '/sel/?id=' + e.target.id
    $.ajax({
        url: url,
        type: 'GET',
        success: function (request) {
            selGoods.push(request)
            $('#selItems').append('<tr><td>1</td><td>' + request +'</td></tr>')
            let req = JSON.parse(request)
            alert(req['id'])
        }
    })
})