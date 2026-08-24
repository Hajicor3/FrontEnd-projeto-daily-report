import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpresaService } from '../../../../services/empresa.service';
import { EmpresaRequest } from '../../models/empresa-request.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  selector: 'app-empresas-form',
  styleUrl: './empresas-form.scss',
  templateUrl: './empresas-form.html',
})
export class EmpresasForm implements OnInit {
  empresaService: EmpresaService;
  route: ActivatedRoute;
  router: Router;

  empresaId: number | null = null;

  form = new FormGroup({
    nome: new FormControl('', { nonNullable: true, validators: Validators.required }),
    descricao: new FormControl('', { nonNullable: true }),
  });

  constructor(empresaService: EmpresaService, route: ActivatedRoute, router: Router) {
    this.empresaService = empresaService;
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return; // modo criação
    }

    this.empresaId = Number(idParam);
    this.loadEmpresaData(this.empresaId);
  }

  loadEmpresaData(id: number) {
    this.empresaService.buscarEmpresaPorId(id).subscribe({
      next: (response) => {
        if (response) {
          console.log('✅ Empresa carregada com sucesso!');
          this.form.patchValue({
            nome: response.nome as string,
            descricao: response.descricao as string,
          });
        }
      },
      error: (erro) => {
        console.error("❌ Falha ao carregar empresa: " + erro.message);
      }
    });
  }

  campoInvalido(nome: string): boolean {
    const controle = this.form.get(nome);
    return !!controle && controle.invalid && (controle.touched || controle.dirty);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.getRawValue();

    const request: EmpresaRequest = {
      nome: valores.nome!,
      descricao: valores.descricao || undefined,
    };

    if (this.empresaId) {
      this.empresaService.atualizarEmpresa(this.empresaId, request).subscribe({
        next: () => {
          console.log('✅ Empresa atualizada com sucesso!');
          this.router.navigate(['/empresa', this.empresaId]);
        },
        error: (erro) => {
          console.error('❌ Erro ao atualizar empresa:', erro.message);
        }

      });

    } else {
      this.empresaService.criarEmpresa(request).subscribe({
        next: () => {
          console.log('✅ Empresa criada com sucesso!');
          this.router.navigate(['/empresas']);
        },
        error: (erro) => {
          console.error('❌ Erro ao criar empresa:', erro.message);
        }

      });

    }
  }

  deletarEmpresa(id:number) {
    this.empresaService.deletarEmpresa(id).subscribe({
      next: () => {
        console.log('✅ Empresa deletada com sucesso!');
        this.router.navigate(['/empresas']);
      },
      error: (erro) => {
        console.error('❌ Erro ao deletar empresa:', erro.message);
      }
    })
  }
}
