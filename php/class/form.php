<?php

class form {

    public $titulo = "<input type=\"text\" class=\"form-control\" id=\"titulo\" name=\"titulo\" placeholder=\"Título do evento\" maxlength=\"100\" required ";
    public $uorg = "<select class=\"form-control\" id=\"uorg\" name='uorg' required>
                        <option value=\"\">Selecione uma opção</option>";
    public $locais = "<select class=\"form-control\" id=\"local\" name=\"local\" disabled required>
                        <option value=\"\" class=\"0\">Selecione uma opção</option>";
    public $locais2 = "<select class=\"form-control\" id=\"local\" name=\"local\" required>
                        <option value=\"\" class=\"0\">Selecione uma opção</option>";
    public $dtinicio = "<input name=\"dtinicio\" id=\"dtinicio\" type=\"text\" class=\"form-control\" placeholder=\"dd/mm/aaaa\"  required ";
    public $dtfinal = "<input name=\"dtfinal\" id=\"dtfinal\" type=\"text\" class=\"form-control\" placeholder=\"dd/mm/aaaa\"  required ";
    public $hrinicio = "<input name=\"hrinicio\" id=\"hrinicio\" data-format=\"hh:mm\" type=\"text\" class=\"form-control modalhr\" placeholder=\"hh:mm\"  required ";
    public $hrfinal = "<input name=\"hrfinal\" id=\"hrfinal\" data-format=\"hh:mm\" type=\"text\" class=\"form-control modalhr\" placeholder=\"hh:mm\" title=\"Duração mínima de 2 horas\" required ";
    public $desc_evento = "<textarea name=\"desc_evento\" id=\"desc_evento\" class=\"form-control col-sm-12\" placeholder=\"Descrição do evento\" maxlength=\"800\" required>";
    public $responsavel = "<input type=\"text\" name=\"responsavel\" id=\"responsavel\" class=\"form-control\" placeholder=\"Nome do responsável\" pattern=\"^[ _A-z]{1,}$\" required ";
    public $email = "<input type=\"email\" name=\"email\" id=\"email\" class=\"form-control\" placeholder=\"E-mail do responsável\" required ";
    public $telefone = "<input type=\"text\" name=\"telefone\" id=\"telefone\" class=\"form-control\" pattern=\"^[ 0-9()-]{1,}$\" placeholder=\"Telefone de contato\" ";
    public $ramal = "<input type=\"text\" name=\"ramal\" id=\"ramal\" class=\"form-control\" pattern=\"^[0-9]{1,}$\" maxlength=\"4\" placeholder=\"Ramal de contato\" ";
    public $celular = "<input type=\"text\" name=\"celular\" id=\"celular\" class=\"form-control\" pattern=\"^[ 0-9()-]{1,}$\" placeholder=\"Celular de contato\" ";
    public $chat = "<input type=\"checkbox\" name=\"chat\" id=\"chat\" class=\"custom-control-input\" ";
    public $slide = "<input type=\"checkbox\" name=\"slide\" id=\"slide\" class=\"custom-control-input\" ";
    public $enquete = "<input type=\"checkbox\" name=\"enquete\" id=\"enquete\" class=\"custom-control-input\" ";
    public $pergunta = "<input type=\"checkbox\" name=\"perguntas\" id=\"perguntas\" class=\"custom-control-input\" ";
    public $observacao = "<textarea name=\"observacao\" id=\"observacao\" class=\"form-control col-sm-12\" placeholder=\"Observação sobre as ferramentas\">";
    public $sede = "<input name=\"sede\" id=\"sede\" type=\"checkbox\" class=\"custom-control-input\" ";
    public $ues = "<input name=\"ue\" id=\"ue\" type=\"checkbox\" class=\"custom-control-input\" ";
    public $agencia = "<input name=\"agencia\" id=\"agencia\" type=\"checkbox\" class=\"custom-control-input\" ";
    public $externo = "<input name=\"externo\" id=\"externo\" type=\"checkbox\" class=\"custom-control-input\" ";
    public $desc_publico = "<textarea name=\"desc_publico\" id=\"desc_publico\" class=\"form-control col-sm-12\" placeholder=\"Descrição do público\">";
    
    public $usuario = "<input type=\"text\" class=\"form-control\" id=\"usuario\" name=\"usuario\" placeholder=\"Usuário\" maxlength=\"15\" required ";
    public $senha = "<input type=\"password\" class=\"form-control\" id=\"senha\" name=\"senha\" placeholder=\"Senha\" maxlength=\"100\" required ";

    public function formAgendar() {
        $this->titulo .= "/>";
        $this->uorg .= form::gerarUorg();
        $this->locais .= form::gerarLocal();
        $this->dtinicio .= "/>";
        $this->dtfinal .= "/>";
        $this->hrinicio .= "/>";
        $this->hrfinal .= "/>";
        $this->desc_evento .= "</textarea>";
        $this->responsavel .= "/>";
        $this->email .= "/>";
        $this->telefone .= "/>";
        $this->ramal .= "/>";
        $this->celular .= "/>";
        $this->chat .= "/>";
        $this->slide .= "/>";
        $this->enquete .= "/>";
        $this->pergunta .= "/>";
        $this->observacao .= "</textarea>";
        $this->sede .= "/>";
        $this->ues .= "/>";
        $this->agencia .= "/>";
        $this->externo .= "/>";
        $this->desc_publico .= "</textarea>";
    }

    public function formEditar($id) {
        $evento = evento::gerarEventoID($id);
        extract($evento);

        $dt_inicio = convertData($dt_inicio);
        $dt_final = convertData($dt_final);

        $this->titulo .= " value=\"$titulo\" />";
        $this->uorg .= form::gerarUorgID($fkuorg);
        $this->locais2 .= form::gerarLocalID($fklocal);
        $this->dtinicio .= " value=\"$dt_inicio\" />";
        $this->dtfinal .= " value=\"$dt_final\" />";
        $this->hrinicio .= " value=\"$hr_inicio\" />";
        $this->hrfinal .= "  value=\"$hr_final\" />";
        $this->desc_evento .= "$desc_evento</textarea>";
        $this->responsavel .= " value=\"$responsavel\" />";
        $this->email .= " value=\"$email\" />";
        $this->telefone .= " value=\"$telefone\" />";
        $this->ramal .= " value=\"$ramal\" />";
        $this->celular .= " value=\"$celular\" />";
        $this->chat .= form::check($chat);
        $this->slide .= form::check($slide);
        $this->enquete .= form::check($enquete);
        $this->pergunta .= form::check($pergunta);
        $this->observacao .= "$observacao</textarea>";
        $this->sede .= form::check($sede);
        $this->ues .= form::check($ue);
        $this->agencia .= form::check($agencia);
        $this->externo .= form::check($externo);
        $this->desc_publico .= "$desc_publico</textarea>";
    }

    public function formLogin(){
        $this->usuario .= "/>";
        $this->senha .= "/>";
    }
    static function gerarUorg() {
        $pdo = conectar();

        $query = selectUorg();
        $sql = $pdo->query($query)->fetchAll();

        $listaUorg = " ";
        foreach ($sql as $assoc) {
            $id = $assoc['id'];
            $nome = $assoc['nome'];
            $uf = $assoc['uf'];
            $listaUorg = $listaUorg . "<option value=\"$id\" class=\"$uf\">$nome</option>";
        }
        $listaUorg .= "</select>";
        $pdo = null;
        return $listaUorg;
    }

    static function gerarLocal() {
        $pdo = conectar();

        $query = selectLocais();
        $sql = $pdo->query($query)->fetchAll();

        $listaLocal = " ";
        $cont = 1;
        foreach ($sql as $assoc) {
            $id = $assoc['id'];
            $local = $assoc['local'];
            $opcao = $assoc['uf'];
            $listaLocal = $listaLocal . "<option value=\"$id\" class=\"$opcao 1\">$local</option>";
            $cont++;
        }
        $listaLocal .= "</select>";
        $pdo = null;
        return $listaLocal;
    }

    static function gerarUorgID($fk) {
        $pdo = conectar();

        $query = selectUorg();
        $sql = $pdo->query($query)->fetchAll();

        $listaUorg = " ";
        foreach ($sql as $assoc) {
            $id = $assoc['id'];
            $nome = $assoc['nome'];
            $uf = $assoc['uf'];
            if ($id == $fk) {
                $listaUorg = $listaUorg . "<option value=\"$id\" class=\"$uf\" selected >$nome</option>";
            } else {
                $listaUorg = $listaUorg . "<option value=\"$id\" class=\"$uf\">$nome</option>";
            }
        }
        $listaUorg .= "</select>";
        $pdo = null;
        return $listaUorg;
    }

    static function gerarLocalID($fk) {
        $pdo = conectar();

        $query = selectLocais();
        $sql = $pdo->query($query)->fetchAll();

        $listaLocal = " ";
        foreach ($sql as $assoc) {
            $id = $assoc['id'];
            $local = $assoc['local'];
            $opcao = $assoc['uf'];
            if ($id == $fk) {
                $listaLocal = $listaLocal . "<option value=\"$id\" class=\"$opcao 1\" selected >$local</option>";
            } else {
                $listaLocal = $listaLocal . "<option value=\"$id\" class=\"$opcao 1\">$local</option>";
            }
        }
        $listaLocal .= "</select>";
        $pdo = null;
        return $listaLocal;
    }

    static function check($val) {
        return $val == 1 ? "checked />" : "/>";
    }

    static function btnEnviar() {
        echo "<input class=\"btn btn-primary center-block\" type=\"submit\" value=\"Enviar\" id=\"enviar\" name=\"enviar\">";
    }

    static function btnSalvar() {
        echo "<input class=\"btn btn-primary\" type=\"submit\" value=\"Salvar\" id=\"salvar\" name=\"salvar\">";
    }
    static function btnVoltarAguar() {
        echo "<a href=\"?p=agv\" class=\"btn btn-default\" role=\"button\">Voltar</a>";
    }

}
