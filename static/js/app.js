let selGoods = {}
let currTr = ''
let currCount
let tCount = 0

$(document).ready(function() {
    switch (document.location.pathname) {
        case '/':
            selGoods = []
            $('.table').css('cursor', 'pointer')
            break
        case '/prn/':
            console.log(currGood)
            for (let row in selGoods) {
                alert(row[0])
            }
            break
    }
})

$('.tdGoods').on('click', function(e) {
    let url = '/sel/?id=' + e.target.id
    currTr = e.target.id.replace('d', 'r')
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
            let currGood = $('#name').val()
            currCount = $('#count').val()
            selGoods[currGood] = currCount
            $('#addItem').modal('hide')
            $('#selItems').append('<tr><th scope="row">' + ++tCount + '</th><td class="col-5">' + currGood +'</td><td>' + currCount + '</td></tr>')
            $('#' + currTr).remove()
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
                console.log(selGoods)
                for (let row in selGoods) {
                    console.log(typeof row)
                    $('#prevRow').append(
                        '<div class="col-6 border">' + row + '</div>'
                    )
                }
                $('#preView').modal('show')
            }
    }
})