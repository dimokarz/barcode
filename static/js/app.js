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
            selGoods.push(currStr)
            $('#addItem').modal('hide')
            tCount = tCount + Number(currStr['currCnt'])
            $('#footer').text('Будет напечатано ' + tCount + ' этикеток')
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
                let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
                lDate = new Date(lDate.replace(pattern,'$3-$2-$1'));
                let dd = lDate.getDate()
                let mm = lDate.getMonth()
                let yy = lDate.getFullYear()
                for (let i=0; i < selGoods.length; i++) {
                    for (let k=1; k<=selGoods[i]['currCnt']; k++) {
                        $('#prevRow').append(
                            `<div class="col-12 border" id="prn${i+1}" style="page-break-after: always;">
                                <div class="row border-bottom" style="font-size: 10pt;"><b>${selGoods[i]['currGood']}</b></div>
                                <hr>
                                <div class="row">
                                    <b>PLU:</b>${selGoods[i]['currPlu']}&nbsp;&nbsp;<b>Код:</b>${selGoods[i]['currArt']}                            
                                </div>
                                <div class="row"><div class="col"><b>Состав: </b>${selGoods[i]['currCns']}</div></div>
                                <div class="row"><div class="col"><b>Пищевая ценность: </b>${selGoods[i]['currNut']}</div></div>
                                <div class="row"><div class="col"><b>Изготовитель: </b>${org}</div></div>
                                <div class="row"><div class="col"><b>Дата производства и упаковки: </b>${$('#datepicker').val()}</div></div>
                                <div class="row"><div class="col"><b>Годен до: </b>${dd}.${mm}.${yy}</div></div>                         
                                <div class="row justify-content-center"><svg id="barcode" style="width: 30%;"></svg></div> 
                                <div class="row"><div class="col"><b>${selGoods[i]['currTxt']}</b></div></div>                               
                            </div>`
                        )
                        let ean = selGoods[i]['currArt']
                        ean = ean.replace(/\s/g,'')
                        JsBarcode("#barcode", ean, {
                          format: "EAN13",
                          lineColor: "#000000",
                          // width: 2,
                          height: 20,
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
        // case 'prnStart':
        //     $('body').css('font-size', '7pt')
        //     $('body').css('font-family', 'Courier New')
        //     const printContents = document.getElementById('prevRow').innerHTML;
        //     const originalContents = document.body.innerHTML;
        //     document.body.innerHTML = printContents;
        //     window.print();
        //     document.body.innerHTML = originalContents;
        //     window.open('/', '_self')
        //     $('body').css('font-size', '100%')
        //     break
    }
})