<?php
function endereco($pg){
    switch ($pg){
        case 'pv':
            return 'view/proxView';
            break;
        case 'atv':
            return 'view/anteView';
            break;
        case 'agv':
            return 'view/aguarView';
            break;
        case 'av':
            return 'view/agendarView';
            break;
        case 'am':
            return 'model/agendarModel';
            break;
        case 'lv':
            return 'view/loginView';
            break;
        case '404':
            return 'view/404';
            break;
        default :
            return 'view/404';
    }
}