import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AutenticacaoService} from '../../../services';

@Component({
  selector: 'app-valida-email',
  templateUrl: './valida-email.component.html',
  styleUrls: ['./valida-email.component.css']
})
export class ValidaEmailComponent implements OnInit {

  token: string;
  haErros = null;
  conteudoBotao: string;


  constructor(private Activatedroute: ActivatedRoute,
              private router: Router,
              private autenticacaoService: AutenticacaoService
  ) {
  }

  ngOnInit(): void {

    this.Activatedroute.paramMap.subscribe(params => {

      this.token = params.get('token');
      this.autenticacaoService.confirmarEmail(this.token).subscribe(
        res => {
          this.conteudoBotao = 'Realize seu login';
          this.haErros = false;
        },
        error => {

          this.conteudoBotao = 'Ir para o início';
          this.haErros = true;
        }
      );

    });

  }

  ngOnDestroy(): void {
    this.conteudoBotao = '';
    this.haErros = null;
  }

}
