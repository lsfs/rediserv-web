import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Estado} from 'src/app/models/estado.model';
import {EstadoService} from 'src/app/services/estado.service';
import {AutenticacaoService, InstituicaoService, UnidadeService} from '../../../services';
import {Instituicao} from '../../../models/instituicao.model';
import {Unidade} from '../../../models/unidade.model';
import {CadastroRequest} from '../../../models/jwtPayload/cadastroRequest';
import {Router} from '@angular/router';
import {NivelService} from '../../../services/nivel.service';
import {Nivel} from '../../../models/nivel.model';
import {TecnicoService} from '../../../services/tecnico.service';
import {Professor} from '../../../models/professor.model';
import {Tecnico} from '../../../models/tecnico.model';
import {ProfessorService} from '../../../services/professor.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  form: FormGroup;

  dadosIncorretos = false;
  enviadoRecu = false;

  erroCadastro = true;


  cargos: any[] = [];
  tecnicos: Tecnico[] = [];
  niveis: Nivel[] = [];
  professores: Professor[] = [];
  estados: Estado[] = [];
  instituicoes: Instituicao[] = [];
  unidades: Unidade[];
  areaSelecionada = false;
  cargoProfessor = false;
  cargoTecnico = false;
  professorCriado: Professor;

  constructor(private formBuilder: FormBuilder,
              private estadoService: EstadoService,
              private instituicaoService: InstituicaoService,
              private unidadeService: UnidadeService,
              private auteticacaoService: AutenticacaoService,
              private nivelService: NivelService,
              private tecnicoService: TecnicoService,
              private professorService: ProfessorService,
              private router: Router) {

  }

  ngOnInit(): void {

    this.getListaCargos();

    this.form = this.formBuilder
      .group({
        nome: this.formBuilder.control('', [Validators.required]),
        email: this.formBuilder.control('', [Validators.required]),
        cargo: this.formBuilder.control('', [Validators.required]),
        area: this.formBuilder.control('', [Validators.required]),
        nivel: this.formBuilder.control('', [Validators.required]),
        funcao: this.formBuilder.control('', [Validators.required]),
        estado: this.formBuilder.control('', [Validators.required]),
        instituicao: this.formBuilder.control({value: '', disabled: true}, [Validators.required]),
        unidade: this.formBuilder.control({value: '', disabled: true}, [Validators.required]),
        senha: this.formBuilder.control('', [Validators.required]),
        senhaConfirm: this.formBuilder.control('', [Validators.required]),
      });


    this.getListaEstados();


  }


  public getListaAreasProfessores(): void {
    this.professorService.listar().subscribe(
      (res: Professor[]) => {
        this.professores = res;
      });
  }

  public getListaCargos(): void {
    this.cargos = [{
      nome: 'Professor'
    },
      {
        nome: 'Tecnico'
      }];

  }

  public getListaEstados(): void {
    this.estadoService.listar().subscribe(
      (res: Estado[]) => {
        this.estados = res;
      }
    );
  }

  public getListaNiveis(): void {
    this.nivelService.listar().subscribe(
      (res: Nivel[]) => {
        this.niveis = res;
      }
    );
  }

  public getInstituicoesPorEstado(sigla: string): void {
    this.instituicaoService.buscarPorEstado(sigla).subscribe(
      (res: Instituicao[]) => {
        this.instituicoes = res;
      }
    );
  }

  public getUnidadesInstituicao(idinstituicao: number): void {
    this.unidadeService.buscarPorInstituicao(idinstituicao).subscribe(
      (res: Unidade[]) => {
        this.unidades = res;
      }
    );
  }

  public getTecnicosNivel(idNivel: number): void {
    this.tecnicoService.listarPorNivel(idNivel).subscribe(
      (res: Tecnico[]) => {
        this.tecnicos = res;
      }
    );
  }

  public selectCargoOnChange($event: any): void {
    const cargo = $event.target.value;

    switch (cargo) {
      case 'Professor':
        this.cargoProfessor = true;
        this.cargoTecnico = false;
        this.getListaAreasProfessores();
        break;
      case 'Tecnico':
        this.cargoProfessor = false;
        this.cargoTecnico = true;
        this.getListaNiveis();
        break;
    }


  }

  public selectEstadoOnChange($event: any): void {
    const sigla = $event.target.value;
    this.getInstituicoesPorEstado(sigla);
    this.form.controls.instituicao.enable();


  }


  public selectInstituicaOnChange($event: any): void {
    const instituicaoId = $event.target.value;
    this.getUnidadesInstituicao(instituicaoId);
    this.form.controls.unidade.enable();
  }

  public selectNivelOnChange($event: any): void {
    const idNivel = $event.target.value;
    this.getTecnicosNivel(idNivel);
  }


  public async realizarCadastro(): Promise<any> {


    let cargo;

    cargo = this.cargoProfessor ? this.form.controls.area.value : this.form.controls.funcao.value;

    if (this.cargoProfessor) {

      const professor: Professor = {
        area: cargo,
        classe: 'CLASSE_PROFESSOR_D'
      };

      this.professorService.criar(professor).subscribe(
        (res: Professor) => {
          this.professorCriado = res;
          this.cadastraUsuario(this.professorCriado.id);
        }
      );

    } else {
      this.cadastraUsuario(cargo);
    }

  }

  private cadastraUsuario(cargo: number): void {

    const nome = this.form.controls.nome.value;
    const email = this.form.controls.email.value;
    const unidade = this.form.controls.unidade.value;
    const senha = this.form.controls.senhaConfirm.value;

    const role: string[] = [];
    role.push('user');

    const requisicao: CadastroRequest =
      {
        nome,
        email,
        cargo,
        unidade,
        role,
        senha
      };


    this.auteticacaoService.cadastraUsuario(requisicao).subscribe(
      (res: any) => {
        this.router.navigate(['auth/confirmar']);
      },
      error => {
        this.enviadoRecu = true;
        this.erroCadastro = true;
      }
    );

  }



  private validarSenhas(): boolean {
    return true;
  }


}
