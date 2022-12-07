let selGoods = []
let currStr = {}
let currTr = ''
let currCount
let tCount = 0

$(document).ready(function() {
    switch (document.location.pathname) {
        case '/':
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
            currStr = {}
            let currId = currTr.slice(2)
            currStr['currId'] = currId
            currStr['currGood'] = $('#name').val()
            currStr['currArt'] = $('#art' + currId).text()
            currStr['currPlu'] = $('#plu' + currId).text()
            currStr['currCns'] = $('#cns' + currId).text()
            currStr['currCnd'] = $('#cnd' + currId).text()
            currStr['currPer'] = $('#per' + currId).text()
            currStr['currNut'] = $('#nut' + currId).text()
            currStr['currTxt'] = $('#txt' + currId).text()
            currStr['currCnt'] = $('#count').val()
            selGoods.push(currStr)
            $('#addItem').modal('hide')
            $('#selItems').append(
                '<tr><th scope="row">' + currStr['currId'] + '</th>' + '<td>' + currStr['currGood'] + '</td>' +
                '<td>' + currStr['currCnt'] + '</td>' + '</tr>'
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
                let org = $('#org').text()
                let currDate = new Date();
                console.log(selGoods)
                // for (let row in selGoods) {
                //     console.log(typeof row)
                //     $('#prevRow').append(
                //         '<div class="col-6 border">' + row + '</div>'
                //     )
                // }
                for (let i=0; i < selGoods.length; i++) {
                    $('#prevRow').append(
                        `<div class="col-6 border">
                            <div class="row border-bottom"><b>${selGoods[i]['currGood']}</b></div>
                            <div class="row">
                                <div class="col-6"><b>PLU:</b>${selGoods[i]['currPlu']}</div>
                                <div class="col-6"><b>Код:</b>${selGoods[i]['currArt']}</div>
                            </div>
                            <div class="row"><div class="col"><b>Состав:</b>${selGoods[i]['currCns']}</div></div>
                            <div class="row"><div class="col"><b>Пищевая ценность:</b>${selGoods[i]['currNut']}</div></div>
                            <div class="row"><div class="col"><b>Изготовитель:</b>${org}</div></div>
                            <div class="row"><div class="col"><b>Дата производства и упаковки:</b>${currDate}</div></div>
                        </div>`
                    )
                }
                $('#preView').modal('show')
            }
    }
})