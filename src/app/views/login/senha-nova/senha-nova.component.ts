import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutenticacaoService} from '../../../services';
import {NovaSenhaRequest} from '../../../models/utils/novaSenhaRequest.model';

@Component({
  selector: 'app-senha-nova',
  templateUrl: './senha-nova.component.html',
  styleUrls: ['./senha-nova.component.css']
})
export class SenhaNovaComponent implements OnInit {

  token = '';

  formSenha: FormGroup;
  sucesso: boolean;
  mensagemErro = '';

  constructor(private activatedroute: ActivatedRoute,
              private autenticacaoService: AutenticacaoService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.activatedroute.paramMap.subscribe(params => {
      this.token = params.get('token');
    });


    this.formSenha = this.formBuilder.group({
        senha: this.formBuilder.control('', [Validators.required]),
        senhaConfirmacao: this.formBuilder.control('', [Validators.required])
      }
    );

  }

  public cadastraNovaSenha(): void {

    const senhaNova = this.formSenha.controls.senha.value;
    const senhaNovaConfirmacao = this.formSenha.controls.senhaConfirmacao.value;

    if (senhaNova !== senhaNovaConfirmacao || senhaNova === '' || senhaNovaConfirmacao === '') {
      this.sucesso = false;
      this.mensagemErro = 'As senhas não coincidem';
      return;
    }

    const novaSenhaRequest: NovaSenhaRequest = {
      senhaNova,
      senhaNovaConfirmacao
    };

    this.salvaNovaSenha(novaSenhaRequest);


  }

  public salvaNovaSenha(novaSenhaRequest: NovaSenhaRequest): void {
    this.autenticacaoService.enviaNovaSenha(novaSenhaRequest, this.token).subscribe(
      res => {
        this.sucesso = true;
        this.formSenha.reset();
      },
      error => {
        this.sucesso = false;
        this.mensagemErro = 'Houve uma falha na sua solicitação. Verifique seus dados';
      }
    );
  }


}
