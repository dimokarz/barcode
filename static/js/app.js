selGoods = []
currGood = {}
tCount = 0

$(document).ready(function() {
    switch (document.location.pathname) {
        case '/':
            selGoods = []
            break
        case '/prn/':
            console.log(currGood)
            for (let row in selGoods) {
                alert(row[0])
            }
    }
})

$('.tdGoods').on('click', function(e) {
    let url = '/sel/?id=' + e.target.id
    $.ajax({
        url: url,
        type: 'GET',
        success: function (request) {
            // selGoods.push(request['data'][0])
            $('#name').val(request['data'][0]['good_name'])
            $('#count').focus().val(1)
            $('#btnDec').prop("disabled", true)
            $('#addItem').modal('show')
        }
    })
})

$('.btn').on('click', function (e) {
    let btn = e.target.id
    switch (btn) {
        case 'addBtn':
            currGood['name'] = $('#name').val()
            currGood['count'] = $('#count').val()
            selGoods.push(currGood)
            $('#addItem').modal('hide')
            $('#selItems').append('<tr><th scope="row">' + ++tCount + '</th><td class="col-5">' + currGood['name'] +'</td><td>' + currGood['count'] + '</td></tr>')
            break
        case 'btnInc':
            currCount = $('#count').focus().val()
            $('#btnDec').prop("disabled", false)
            $('#count').focus().val(++currCount)
            break
        case 'btnDec':
            currCount = $('#count').focus().val()
            $('#count').focus().val(--currCount)
            if (currCount < 2) {
                $('#btnDec').prop("disabled", true)
            }
            break
        case 'btnPrint':
            if (document.location.pathname === '/') {
                window.open('/prn/?sel=' + selGoods, '_self')
            }
    }
})