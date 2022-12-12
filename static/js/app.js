let selGoods = []
let currStr = {}
let currTr = ''
let currCount
let tCount = 0

const stikers = (cnt) => {
    let stickerCnt
    if (cnt > 20) {
        cnt = cnt.toString()
        cnt = Number(cnt.slice(-1))
    }
    if (cnt === 1) {
        stickerCnt = `этикетка`
    }
    else if (cnt > 1 && cnt < 5) {
        stickerCnt = 'этикетки'
    }
    else if (cnt > 4 && cnt < 21) {
        stickerCnt = 'этикеток'
    }
    return stickerCnt
}

const nDate = (dt, per) => {
    dt.setDate(dt.getDate() + Number(per))
    let dd = dt.getDate().toString()
    if (dd.length === 1) {
        dd = '0' + dd
    }
    let mm = dt.getMonth() + 1
    mm = mm.toString()
    if (mm.length === 1) {
        mm = '0' + mm
    }
    let yy = dt.getFullYear()
    return `${dd}.${mm}.${yy}`
}

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
            $('#datepicker').datepicker('setDate', new Date());
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
    $('#btnPrint').prop('disabled', false)
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
            currStr['currWei'] = $('#wei' + currId).text()
            selGoods.push(currStr)
            $('#addItem').modal('hide')
            tCount = tCount + Number(currStr['currCnt'])

            $('#footer').text(tCount + ' ' + stikers(tCount))
            for (let i=0; i<2; i++) {
                $('#footer').fadeTo('slow', 0.0).fadeTo('slow', 1.0);
            }
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
            JsBarcode(".barcode").init()
            if (document.location.pathname === '/') {
                let org = $('#org').text()
                let lDate = $('#datepicker').val();
                let pattern = /(\d{2})\.(\d{2})\.(\d{4})/
                let dt = new Date(lDate.replace(pattern,'$3-$2-$1')); //!!!
                // dt.setDate(dt.getDate() + 30)
                // let dd = dt.getDate().toString()
                // if (dd.length === 1) {
                //     dd = '0' + dd
                // }
                // let mm = dt.getMonth() + 1
                // mm = mm.toString()
                // if (mm.length === 1) {
                //     mm = '0' + mm
                // }
                // let yy = dt.getFullYear()
                // let nDate = `${dd}.${mm}.${yy}` // !!!
                for (let i=0; i < selGoods.length; i++) {
                    for (let k=1; k<=selGoods[i]['currCnt']; k++) {
                        let currArt = selGoods[i]['currArt'].replace(/\s/g,'')
                        currArt = currArt.slice(0, 7)
                        $('#prevRow').append(
                            `<div class="col-12 border" id="prn${i+1}" style="page-break-after: always;">
                                <div class="row border-bottom" style="font-size: 9pt;"><b>${selGoods[i]['currGood']}</b></div>
                                <div class="row">
                                    <b>PLU:</b>${selGoods[i]['currPlu']}&nbsp;&nbsp;<b>Код: </b>${currArt}                           
                                </div>
                                <div class="row"><div class="col"><b>Состав: </b>${selGoods[i]['currCns']}</div></div>
                                <div class="row"><div class="col"><b>Пищевая ценность: </b>${selGoods[i]['currNut']}</div></div>
                                <div class="row"><div class="col"><b>Изготовитель: </b>${org}</div></div>
                                <div class="row"><div class="col"><b>Дата производства и упаковки: </b>${$('#datepicker').val()}</div></div>
                                <div class="row"><div class="col"><b>Годен до: </b>${nDate(dt, selGoods[i]['currPer'])}<b> Масса НЕТТО: </b>${selGoods[i]['currWei']}кг.</div></div>                       
                                <div class="row justify-content-center" style="margin-left: -5px;"><svg id="barcode${i}" style="width: 30%;"></svg></div>  
                                <div class="row"><div class="col"><b>${selGoods[i]['currTxt']}</b></div></div>                                                             
                            </div>`
                        )
                        let ean = selGoods[i]['currArt']
                        ean = ean.replace(/\s/g,'')
                        JsBarcode("#barcode" + i, ean, {
                          format: "EAN13",
                          lineColor: "#000000",
                          // width: 2,
                          height: 25,
                          displayValue: true,
                          fontSize: 10,
                          flat: true,
                        });
                    }
                }
                // $('#preView').modal('show')
                printJS('prevRow', 'html')
                setTimeout(function () {window.open('/', '_self')}, 2000)
            }
            break
    }
})