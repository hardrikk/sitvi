$(document).ready(function () {

    //datapicker dos formularios
    var today = new Date();
    $('#sandbox-container input').datepicker({
        format: "dd/mm/yyyy",
        language: "pt-BR",
        orientation: "bottom left",
        todayHighlight: true,
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });

    //data tables de todas as paginas
    $('#tablepag').DataTable({
        order: false,
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });

    $("#dtinicio").blur(function () {
        var dtAuto = $("#dtinicio").val();
        $("#dtfinal").val(dtAuto);
    });

    $(".modalhr").mask("99:99");
    $("#hrinicio").blur(function () {
        var horario = $("#hrinicio").val();
        var hora = horario.substring(0, 2);
        if (hora < 8) {
            $('.hrierros').html("<ul class=\"list-unstyled\"><li>Hora não pode ser inferior à 08:00</li></ul>");
            $('#hrinicio').val("");
        } else if (hora > 18) {
            $('.hrierros').html("<ul class=\"list-unstyled\"><li>Hora não pode ser superior à 18:00</li></ul>");
            $('#hrinicio').val("");
        } else {
            $('.hrierros').hide();
            var minuto = horario.substring(3, 6);
            var somahora = parseInt(hora) + 2;
            if (somahora > 9) {
                var horafim = somahora + ":" + minuto;
            } else {
                var horafim = "0" + somahora + ":" + minuto;
            }
        }
        $('#hrfinal').val(horafim);
    });
    $("#hrfinal").blur(function () {
        var horario = $("#hrfinal").val();
        var hora = parseInt(horario.substring(0, 2));
        var horai = $('#hrinicio').val();
        var horai = parseInt(horai.substring(0, 2));
        if (hora > horai) {
            var dif = hora - horai;
            if (dif < 2) {
                $('.hrferros').html("<ul class=\"list-unstyled\"><li>Duração mínima de 2 horas</li></ul>");
                $('#hrfinal').val("");
                $('#hrfinal').focus();
            } else {
                $('.hrferros').hide();
            }
        }
    });

    $("#telefone").mask("(99) 9999-9999");
    $("#celular").mask("(99) 99999-9999");

    $("#uorg").change(function () {
        var select = $("#uorg").val();
        if (select != '') {
            $('#local').removeAttr("disabled");
            $(".NU").prop("hidden", "hidden");
            $(".1").prop("hidden", "hidden");
            var uf = $("#uorg").find(':selected').prop('class');
            uf = '.' + uf;
            $(".0").prop("selected", "selected");
            $(uf).removeAttr("hidden");
            $(".NU").removeAttr("hidden");
        } else {
            $(".0").prop("selected", "selected");
            $("#local").prop("disabled", "disabled");
        }
    });

//    $("#reprovar").click(function () {
//        $("#avaliarForm").removeAttr("onsubmit");
//        $("#avaliarForm").submit();
//    });

    if (!$("#webcast").prop("checked")) {
        $('#webexterna').attr("disabled", "disabled");
    }

    $("#webcast").change(function () {
        var checkedWeb = $('#webcast').prop("checked");

        if (checkedWeb) {
            $('#webexterna').removeAttr("disabled");
        } else {
            $('#webexterna').attr("disabled", "disabled");
        }
    });

    $(".loader").click(function () {
        $('#loader').modal('show');
    });

    $(".arquivarButton").click(function () {
        var id = $(this).prop("name");
        var action = "?p=aqm&id=" + id;
        $("#arquivarForm").prop("action", action);
    });

    $('#assismodal').on('hide.bs.modal', function () {
        $("#video").prop("src", "");
    });
});
//setInterval(function () {
//    if ($("#assismodal").prop("class") === "modal fade") {
//        $("#video").prop("src", "");
//    }
//}, 1800);
function mudarsrc(te) {
    var src = $(te).val();
    $("#video").prop("src", src);
    $("#divvideo").prop("style", "");
}

function loader() {
    $('#loader').modal('show');
}
function loadermodal() {
    $('#sessaomodal').modal('hide');
    $('#loader').modal('show');
}
function validarAvaliar() {
    var tvibge = $('#tvibge').prop("checked");
    var webcast = $('#webcast').prop("checked");
    if (!webcast && !tvibge) {
        $('.alert').html("Selecione ao menos um serviço.");
        $('.servicoerror').attr("style", "");
        return false;
    } else if (webcast) {
        var externa = $("#webexterna").val().length;
        if (externa < 53) {
            $('.alert').html("Informe o endereço do webcast.");
            $('.servicoerror').attr("style", "");
            return false;
        } else {
            $('#loader').modal('show');
        }
    } else {
        $('#loader').modal('show');
    }
}

function validarEditarAdm() {
    var unisede = $('#sede').prop("checked");
    var ue = $('#ue').prop("checked");
    var agencia = $('#agencia').prop("checked");
    var externo = $('#externos').prop("checked");
    if (!unisede && !ue && !agencia && !externo) {
        $('.alert').html("<ul class=\"list-unstyled\"><li>Selecionar ao menos um público alvo</li></ul>");
        $('.checkerros').attr("style", "");
        return false;
    } else {
        $('#loader').modal('show');
    }

    var tvibge = $('#tvibge').prop("checked");
    var webcast = $('#webcast').prop("checked");
    if (!webcast && !tvibge) {
        $('.alert').html("Selecione ao menos um serviço.");
        $('.servicoerror').attr("style", "");
        return false;
    } else if (webcast) {
        var externa = $("#webexterna").val().length;
        if (externa < 53) {
            $('.alert').html("Informe o endereço do webcast.");
            $('.servicoerror').attr("style", "");
            return false;
        } else {
            $('#loader').modal('show');
        }
    } else {
        $('#loader').modal('show');
    }
}

function validar() {
    var unisede = $('#sede').prop("checked");
    var ue = $('#ue').prop("checked");
    var agencia = $('#agencia').prop("checked");
    var externo = $('#externos').prop("checked");
    if (!unisede && !ue && !agencia && !externo) {
        $('.alert').html("<ul class=\"list-unstyled\"><li>Selecionar ao menos um público alvo</li></ul>");
        $('.checkerros').attr("style", "");
        return false;
    } else {
        $('#loader').modal('show');
    }
}

$('#avaliarForm').validator();
$('#agendarForm').validator();
$('#loginForm').validator();

var principal = {};
principal.start = function () {
    $('#footer').css('position', 'static');
};
$(window).scroll(function () {
    var s = $(document.body)[0].scrollHeight;
    var h = $(window).height();
    s > h ? $('#footer').css('position', 'static') : $('#footer').css('position', 'fixed');
    ;
    //$('#footer').css('top',h-42); // CASO PRECISE DESCONTAR O NAVBAR
    $('#footer').css('top', h); // PARA FIXAR O FOOTER NA PARTE INFERIOR DA PAGINA
});
principal.start();
























$(document).ready(function () {

    $(document).on('click', '#getEvento', function (e) {

        e.preventDefault();

        var uid = $(this).data('id'); // get id of clicked row

        $('.modal-content').html(''); // leave this div blank
        //$('#modal-loader').show();      // load ajax loader on button click

        $.ajax({
            url: 'php/view/proxModalView.php',
            type: 'POST',
            data: 'id=' + uid,
            dataType: 'html'
        })
                .done(function (data) {
                    console.log(data);
                    $('.modal-content').html(''); // blank before load.
                    $('.modal-content').html(data); // load here
                    //   $('#modal-loader').hide(); // hide loader  
                })
                .fail(function () {
                    $('.modal-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
                    //   $('#modal-loader').hide();
                });

    });
});
$(document).ready(function () {

    $(document).on('click', '#pinModalEdit', function (e) {

        e.preventDefault();

        var uid = $(this).data('id'); // get id of clicked row

        $('.modal-content').html(''); // leave this div blank
        //$('#modal-loader').show();      // load ajax loader on button click

        $.ajax({
            url: 'php/view/pinModalView.php?a=ed',
            type: 'POST',
            data: 'id=' + uid,
            dataType: 'html'
        })
                .done(function (data) {
                    console.log(data);
                    $('.modal-content').html(''); // blank before load.
                    $('.modal-content').html(data); // load here
                    //   $('#modal-loader').hide(); // hide loader  
                })
                .fail(function () {
                    $('.modal-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
                    //   $('#modal-loader').hide();
                });

    });
});
$(document).ready(function () {

    $(document).on('click', '#pinModalExc', function (e) {

        e.preventDefault();

        var uid = $(this).data('id'); // get id of clicked row

        $('.modal-content').html(''); // leave this div blank
        //$('#modal-loader').show();      // load ajax loader on button click

        $.ajax({
            url: 'php/view/pinModalView.php?a=ex',
            type: 'POST',
            data: 'id=' + uid,
            dataType: 'html'
        })
                .done(function (data) {
                    console.log(data);
                    $('.modal-content').html(''); // blank before load.
                    $('.modal-content').html(data); // load here
                    //   $('#modal-loader').hide(); // hide loader  
                })
                .fail(function () {
                    $('.modal-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
                    //   $('#modal-loader').hide();
                });

    });
});
$(document).ready(function () {

    $(document).on('click', '#pinModalExcA', function (e) {

        e.preventDefault();

        var uid = $(this).data('id'); // get id of clicked row

        $('.modal-content').html(''); // leave this div blank
        //$('#modal-loader').show();      // load ajax loader on button click

        $.ajax({
            url: 'php/view/pinModalView.php?a=ex&ad=1',
            type: 'POST',
            data: 'id=' + uid,
            dataType: 'html'
        })
                .done(function (data) {
                    console.log(data);
                    $('.modal-content').html(''); // blank before load.
                    $('.modal-content').html(data); // load here
                    //   $('#modal-loader').hide(); // hide loader  
                })
                .fail(function () {
                    $('.modal-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
                    //   $('#modal-loader').hide();
                });

    });
});
$(document).ready(function () {

    $(document).on('click', '#reproEvento', function (e) {

        e.preventDefault();

        var uid = $(this).data('id'); // get id of clicked row

        $('.modal-content').html(''); // leave this div blank
        //$('#modal-loader').show();      // load ajax loader on button click

        $.ajax({
            url: 'php/view/comentModalView.php',
            type: 'POST',
            data: 'id=' + uid,
            dataType: 'html'
        })
                .done(function (data) {
                    console.log(data);
                    $('.modal-content').html(''); // blank before load.
                    $('.modal-content').html(data); // load here
                    //   $('#modal-loader').hide(); // hide loader  
                })
                .fail(function () {
                    $('.modal-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
                    //   $('#modal-loader').hide();
                });

    });
});

$(document).ready(function () {

    $(document).on('click', '#getSessao', function (e) {

        e.preventDefault();

        var uid = $(this).data('id'); // get id of clicked row

        $('.modal-content').html(''); // leave this div blank
        //$('#modal-loader').show();      // load ajax loader on button click

        $.ajax({
            url: 'php/view/sessaoModalView.php',
            type: 'POST',
            data: 'id=' + uid,
            dataType: 'html'
        })
                .done(function (data) {
                    console.log(data);
                    $('.modal-content').html(''); // blank before load.
                    $('.modal-content').html(data); // load here
                    //   $('#modal-loader').hide(); // hide loader  
                })
                .fail(function () {
                    $('.modal-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
                    //   $('#modal-loader').hide();
                });

    });
});

$(document).ready(function () {

    $(document).on('click', '#getAssistir', function (e) {

        e.preventDefault();

        var uid = $(this).data('id'); // get id of clicked row

        $('.modal-content').html(''); // leave this div blank
        //$('#modal-loader').show();      // load ajax loader on button click

        $.ajax({
            url: 'php/view/assistirModalView.php',
            type: 'POST',
            data: 'id=' + uid,
            dataType: 'html'
        })
                .done(function (data) {
                    console.log(data);
                    $('.modal-content').html(''); // blank before load.
                    $('.modal-content').html(data); // load here
                    //   $('#modal-loader').hide(); // hide loader  

                })
                .fail(function () {
                    $('.modal-content').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
                    //   $('#modal-loader').hide();
                });

    });
});
