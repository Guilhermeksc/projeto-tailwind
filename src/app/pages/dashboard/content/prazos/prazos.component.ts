import { Component, OnInit } from '@angular/core';
import { ApiContratoService } from './api/api-contrato.service';
import { LoginService } from '../../../../core/auth/login/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesContratoComponent } from './detalhes-contrato/detalhes-contrato.component';

@Component({
  selector: 'app-prazos',
  templateUrl: './prazos.component.html',
  styleUrls: ['./prazos.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class PrazosComponent implements OnInit {
  unidade_compra: string = '';
  dadosOriginais: any[] = []; // Armazena todos os dados originais da API
  dadosFiltrados: any[] = []; // Dados exibidos na tabela (filtrados ou completos)
  colunas: string[] = [];
  visibleColumns: string[] = ['numero', 'tipo', 'processo', 'prorrogavel', 'fornecedor_nome', 'valor_global', 'vigencia_fim'];
  columnLabels: { [key: string]: string } = {
    numero: 'Número',
    tipo: 'Tipo',
    processo: 'NUP',
    prorrogavel: 'Prorrogável',
    fornecedor_nome: 'Nome do Fornecedor',
    valor_global: 'Valor Global',
    vigencia_fim: 'Vigência',
    dias: 'Dias Restantes',
  };
  isLoading: boolean = false;
  erro: string | null = null;

  constructor(
    private apiContratoService: ApiContratoService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.unidade_compra = this.loginService.getunidade_compra() || ''; // Obter a unidade_compra do serviço de login
    this.carregarContratos();
  }

  carregarContratos(): void {
    if (!this.unidade_compra) {
      this.erro = 'unidade_compra não encontrada.';
      return;
    }
  
    this.isLoading = true; // Indicador de carregamento
    this.apiContratoService.getContratosByunidade_compra(this.unidade_compra).subscribe({
      next: (response) => {
        this.isLoading = false; // Finaliza o indicador de carregamento
        console.log('Resposta da API:', response); // Log completo da resposta
  
        if (response.success && response.data) {
          // Atualize as colunas visíveis
          this.colunas = [...this.visibleColumns, 'dias'];
  
          const hoje = new Date();
          this.dadosOriginais = response.data.map((linha: any) => {
            const vigenciaFim = new Date(linha.vigencia_fim);
            const dias = Math.ceil(
              (vigenciaFim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
            );
            const valorGlobal = linha.valor_global 
            ? parseFloat(linha.valor_global.toString().replace(/\./g, '').replace(',', '.')) 
            : 0;
            
            return {
              ...linha,
              dias,
              valor_global: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(valorGlobal),
              vigencia_fim: new Date(linha.vigencia_fim).toLocaleDateString('pt-BR'),
            };
          });
  
          // Log dos dados processados
          console.log('Dados originais processados:', this.dadosOriginais);
  
          // Ordena os dados pela coluna "dias"
          this.dadosOriginais.sort((a, b) => b.dias - a.dias);
  
          // Atualiza os dados filtrados para exibição
          this.dadosFiltrados = this.dadosOriginais.map((linha: any) =>
            this.colunas.reduce((acc: any, col: string) => {
              acc[col] = linha[col];
              return acc;
            }, {})
          );
  
          // Log dos dados filtrados
          console.log('Dados filtrados para exibição:', this.dadosFiltrados);
        } else {
          console.error('Resposta inesperada da API:', response);
          this.erro = 'Erro: Dados inválidos ou inexistentes.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao carregar contratos:', err);
        this.erro = 'Erro ao carregar os contratos. Tente novamente mais tarde.';
      },
    });
  }
  
  
  abrirDetalhes(dadosVisiveis: any): void {
    // Encontra os dados originais correspondentes à linha clicada
    const dadosCompletos = this.dadosOriginais.find((linha: any) =>
      Object.keys(dadosVisiveis).every(
        (key) => dadosVisiveis[key] === linha[key]
      )
    );
  
    if (dadosCompletos) {
      this.dialog.open(DetalhesContratoComponent, {
        height: '600px', // Altura padrão
        width: '80%', // Largura padrão (adaptável)
        maxWidth: '1200px', // Largura máxima
        minWidth: '600px', // Largura mínima
        minHeight: '400px', // Altura mínima
        data: dadosCompletos, // Passa os dados completos para o modal
      });
    } else {
      console.error('Dados completos não encontrados para a linha:', dadosVisiveis);
    }
  }
  

  onInputChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const filtro = event.target.value; // Garantido como string
      this.onFiltrarDados(filtro);
    }
  }

  
  onFiltrarDados(filtro: string): void {
    if (!filtro.trim()) {
      // Se o campo de filtro estiver vazio, restaura os dados originais
      this.dadosFiltrados = this.dadosOriginais.map((linha: any) =>
        this.colunas.reduce((acc: any, col: string) => {
          acc[col] = linha[col];
          return acc;
        }, {})
      );
      return;
    }
  
    // Aplica o filtro em todos os valores de cada linha dos dados originais
    const filtroNormalizado = filtro.toLowerCase();
    const dadosFiltradosCompletos = this.dadosOriginais.filter((linha: any) =>
      JSON.stringify(linha).toLowerCase().includes(filtroNormalizado)
    );

    // Mapeia os dados filtrados completos para incluir as colunas visíveis e a coluna "dias"
    this.dadosFiltrados = dadosFiltradosCompletos.map((linha: any) => {
      const novaLinha: any = this.colunas.reduce((acc: any, col: string) => {
        acc[col] = linha[col];
        return acc;
      }, {});

      // Preserva a coluna "dias"
      if (!novaLinha.dias && linha.dias !== undefined) {
        novaLinha.dias = linha.dias;
      }

      return novaLinha;
    });

    // Ordena os dados pela coluna "dias" do maior para o menor
    this.dadosFiltrados.sort((a, b) => (b.dias || 0) - (a.dias || 0));
  }

  getDiasClass(dias: number): string {
    // console.log('Dias:', dias);
    if (dias < 0) {
      return 'dias-restantes negativo';
    } else if (dias < 30) {
      return 'dias-restantes vermelho';
    } else if (dias < 60) {
      return 'dias-restantes laranja';
    } else if (dias < 120) {
      return 'dias-restantes amarelo';
    } else if (dias < 180) {
      return 'dias-restantes verde';
    } else {
      return 'dias-restantes azul';
    }
  }
  
  getCellClass(coluna: string, valor: any): string {
    if (coluna === 'dias') {
      return this.getDiasClass(valor);
    } else if (coluna === 'fornecedor_nome') {
      return 'nome-fornecedor';
    } else if (coluna === 'processo') { // Considerando "processo" como a coluna "NUP"
      return 'nup-nowrap';
    } else if (coluna === 'valor_global') { // Considerando "processo" como a coluna "NUP"
      return 'valor-global-right';
    }
    return '';
  }
  
}