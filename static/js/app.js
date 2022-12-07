let selGoods = {}
let currTr = ''
let currCount
let tCount = 0

$(document).ready(function() {
    switch (document.location.pathname) {
        case '/':
            selGoods = []
            $('.table').css('cursor', 'pointer')
            $('#datepicker').datepicker({
                format: 'dd.mm.yyyy',
                autoclose: true,
                language: 'ru',
                locale: 'ru',
                clearBtn: true,
                todayHighlight: true
            });
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
            let currId = currTr.slice(2)
            let currGood = $('#name').val()
            let currArt = $('#art' + currId).text()
            let currPlu = $('#plu' + currId).text()
            let currCns = $('#cns' + currId).text()
            let currCnd = $('#cnd' + currId).text()
            let currPer = $('#per' + currId).text()
            let currNut = $('#nut' + currId).text()
            let currTxt = $('#txt' + currId).text()
            currCount = $('#count').val()
            selGoods[currGood] = currCount
            $('#addItem').modal('hide')
            $('#selItems').append(
                '<tr><th scope="row">' + currId + '</th>' + '<td class="col-5">' + currGood + '</td>' +
                '<td>' + currCount + '</td>' + '<td style="display: none">' + currArt + '</td>' +
                '<td style="display: none">' + currPlu + '</td>' + '<td style="display: none">' + currPlu + '</td>' +
                '<td style="display: none">' + currCns + '</td>' + '<td style="display: none">' + currPlu + '</td>' +
                '<td style="display: none">' + currCnd + '</td>' + '<td style="display: none">' + currPer + '</td>' +
                '<td style="display: none">' + currNut + '</td>' + '<td style="display: none">' + currTxt + '</td>' + '</tr>'
            )
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
                // for (let row in selGoods) {
                //     console.log(typeof row)
                //     $('#prevRow').append(
                //         '<div class="col-6 border">' + row + '</div>'
                //     )
                // }

$("#selItems tr").each(function(){
console.log(this);
  $("td",this).each(function(){
    console.log(this.text());
   });
});

                $('#preView').modal('show')
            }
    }
})