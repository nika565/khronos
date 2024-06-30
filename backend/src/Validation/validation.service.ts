// Classe para validações de dados
import { Injectable } from "@nestjs/common";

@Injectable()
export class Validation {

    dataEmptyValidate(array: string[]): boolean {

        // Validando se algum dos dados estão vazios
        for(let data of array) {
            if(!data) return false
        }

        return true
    }

    emailValidate(email: string): boolean {

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regex.test(email);
    }

    passwordValidate(password: string): boolean {

        /*
            A senha deve possuir:
            - Uma letra maiúscula
            - Uma letra minúscula
            - Um caractere numérico
            - tamanho entre 6 e 12 caracteres
        */
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$/;

        return regex.test(password);

    }

    timeValidate(dateStart: string, dateFinish: string): boolean {

        // dateStart e dateFinish vem no formato "YYYY-MM-DD";

        // Pegando data atual para comparar com a data de inicio e fim
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        // Pegando as datas dos parâmetros (yyyy-mm-dd)
        const [yearStart, monthStart, dayStart] = dateStart.split('-').map(Number);
        const [yearFinish, monthFinish, dayFinish] = dateFinish.split('-').map(Number);

        
        // O ano de finalização do projeto não pode ser anterior ao ano de criação
        if(yearFinish < yearStart || yearFinish < currentYear) return false;

        // O ano de criação não pode ser anterior que o ano atual
        if(yearStart < currentYear) return false;

        /*
            Caso o ano de criação e finalização da terefa / projeto seja igual ao ano atual, 
            deve se verificar o mês para não salvar no mês que ja passou
        */
        if(yearStart === currentYear && yearFinish === currentYear) {
            if(monthStart < currentMonth || monthFinish < currentMonth) return false;

            /*
                Caso o mês de inicio e fim da tarefa / projeto seja igual
                é necessário fazer a verificação dos dias
            */
           if(monthStart === currentMonth && monthFinish === currentMonth && dayStart < currentDay && dayFinish < currentDay) return false
        }

        // Passou em todas as validações
        return true
    }

}