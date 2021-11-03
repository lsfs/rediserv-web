import {Component, OnInit} from '@angular/core';
import {AutenticacaoService} from '../../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioSenhaReset} from '../../../models/utils/usuarioSenhaReset.model';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {


  formReset: FormGroup;
  sucesso = null;


  constructor(private autenticacaoService: AutenticacaoService,
              private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.formReset = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required])
    });

  }

  public solicitaResetSenha(): void {
    const email = this.formReset.controls.email.value;

    const usuarioSenhaReset: UsuarioSenhaReset = {
      email
    };

    this.autenticacaoService.solicitaNovaSenha(usuarioSenhaReset).subscribe(
      res => {
        this.sucesso = true;
        this.formReset.reset();
      },
      error => {
        this.sucesso = false;
        this.formReset.reset();
      }
    );

  }
}
