import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutenticacaoService} from '../../../services/autenticacao.service';
import {Router} from '@angular/router';
import {ComponentMessageService} from '../../../services/component-message.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  formLogin: FormGroup;
  mensagemErro = '';

  erroLogin = false;
  enviadoMain = false;

  modalRef: BsModalRef;

  @ViewChild('boasvindas') public boasvindas: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private autenticacaoServico: AutenticacaoService,
              private messageService: ComponentMessageService,
              private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      senha: this.formBuilder.control('', [Validators.required]),
    });


  }

  public realizaLogin(): void {

    this.resetaErro();

    const email: string = this.formLogin.value.email.trim();
    const senha: string = this.formLogin.value.senha.trim();

    if (email === '') {
      this.erroLogin = true;
      this.mensagemErro = 'O e-mail deve ser preenchido\n';
      return;
    }

    if (senha === '') {
      this.erroLogin = true;
      this.mensagemErro += 'A senha deve ser preenchida\n';
      return;
    }

    this.enviadoMain = true;

    this.autenticacaoServico
      .autenticar(email, senha)
      .subscribe(async (jwtResponse) => {

        this.autenticacaoServico.setToken(JSON.stringify(jwtResponse));
        const permissaoUsuario = this.autenticacaoServico.permissaoUsuario;

        if (permissaoUsuario === 'ROLE_USER') {

          this.abrirModal();
          await this.router.navigate(['home']);


        } else {

          await this.router.navigate(['admin']);
        }


      }, error => {

        this.erroLogin = true;
        this.mensagemErro = 'Ocorreu um erro ao realizar login. Verifique seus dados';
      });


  }


  public resetaErro(): void {
    this.erroLogin = false;
    this.mensagemErro = '';
  }


  public abrirModal(): void {


    this.modalRef = this.modalService.show(this.boasvindas);

  }


  public fecharModal(): void {
    this.modalRef.hide();
  }


}
