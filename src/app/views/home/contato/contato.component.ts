import {Component, OnInit} from '@angular/core';
import {AutenticacaoService} from '../../../services';
import {ComponentMessageService} from '../../../services/component-message.service';
import {UsuarioJwt} from '../../../models/jwtPayload/dadosUsuario';
import {MensagemService} from '../../../services/mensagem.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MensagemSaveDto} from '../../../models/dtos/mensagem-save.dto';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  idusuario: number;
  categoriaMensagem = [{display: 'Crítica', value: 'CRITICA'}, {
    display: 'Dúvida',
    value: 'DUVIDA'
  }, {display: 'Sugestão', value: 'SUGESTAO'}];

  formMensagem: FormGroup;
  haErros = false;
  haSucesso = false;
  enviado = false;
  mensagemConteudo = '';


  constructor(private autenticacaoService: AutenticacaoService,
              private formBuilder: FormBuilder,
              private mensagemService: MensagemService,
              private messageService: ComponentMessageService) {
  }

  ngOnInit(): void {
    this.enviaNomeMenu();
    this.carregaDadosUsuario();

    this.inicializaCampos();

  }

  public carregaDadosUsuario(): void {

    const usuario: UsuarioJwt = this.autenticacaoService.dadosUsuarioJWT();
    this.idusuario = usuario.id;

  }


  enviaNomeMenu(): void {

    this.messageService.sendMessage('contato', 'navbar');
  }


  public enviarMensagem(): void {
    const categoriaMensagem = this.formMensagem.value.categoriaMensagem;
    const conteudo = this.formMensagem.value.conteudoMensagem;

    const data: Date = new Date();

    const mensagem: MensagemSaveDto = {
      autorMensagem: this.idusuario,
      dataMensagem: data.toLocaleDateString(),
      categoriaMensagem,
      conteudo
    };

    console.log(mensagem);


    this.inserir(mensagem);

  }


  public inserir(mensagemSaveDto: MensagemSaveDto): void {
    this.mensagemService.criar(mensagemSaveDto).subscribe(
      res => {
        this.haSucesso = true;
        this.mensagemConteudo = 'Mensagem enviada! Em breve retornaremos.';
        this.resetaCampos();
      },
      error => {
        this.haErros = true;
        this.mensagemConteudo = 'Falha ao inserir novo registro';
      }
    );
  }

  public resetaCampos(): void {

    this.inicializaCampos();
  }

  public inicializaCampos(): void {
    this.formMensagem = this.formBuilder.group({
      categoriaMensagem: this.formBuilder.control('0', [Validators.required]),
      conteudoMensagem: this.formBuilder.control('', [Validators.required])
    });
  }


  resetaMensagens(): void {
    this.haErros = false;
    this.haSucesso = false;
  }

}
