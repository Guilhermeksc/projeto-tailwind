import { Component, OnInit } from '@angular/core';
import { ComprasnetContratosService } from './comprasnet-contratos.service';
import { LoginService } from '../../../../core/auth/login/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesContratoComponent } from './detalhes-contrato/detalhes-contrato.component';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-comprasnet-contratos',
  templateUrl: './comprasnet-contratos.component.html',
  styleUrl: './comprasnet-contratos.component.scss',
  imports: [CommonModule, FormsModule],
})
export class ComprasnetContratosComponent implements OnInit {
    @ViewChild(MatTable) table!: MatTable<any>; 
  
  mensagemLoading: string = '';
  unidade_compra: string = '';
  dadosOriginais: any[] = []; // Armazena todos os dados originais da API
  dadosFiltrados: any[] = []; // Dados exibidos na tabela (filtrados ou completos)
  colunas: string[] = [];
  visibleColumns: string[] = [
    'numero',
    'tipo',
    'processo',
    'prorrogavel',
    'fornecedor_nome',
    'valor_global',
    'vigencia_fim',
    'dias', // Dias restantes
  ];
  columnLabels: { [key: string]: string } = {
    numero: 'Número',
    tipo: 'Tipo',
    processo: 'NUP',
    prorrogavel: 'Prorrogável',
    fornecedor_nome: 'Fornecedor',
    valor_global: 'Valor Global',
    vigencia_fim: 'Fim Vigência',
    dias: 'Dias Restantes',
  };
  
  isLoading: boolean = false;
  erro: string | null = null;

  constructor(
    private ComprasnetContratosService: ComprasnetContratosService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.unidade_compra = this.loginService.getunidade_compra() || ''; // Obter a unidade_compra do serviço de login
    this.carregarContratos();
  }

  loadProcessos(): void {
    if (!this.unidade_compra) {
      this.erro = 'unidade_compra não encontrada.';
      return;
    }
  
    this.isLoading = true;
    this.ComprasnetContratosService.getContratosByunidade_compra(this.unidade_compra).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (Array.isArray(response) && response.length > 0) {
          this.processarDados(response);
          console.log('Processos carregados:', this.dadosOriginais);
        } else {
          console.error('Erro: Dados inválidos ou inexistentes:', response);
          this.erro = 'Erro: Dados inválidos ou inexistentes.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao carregar processos:', err);
        this.erro = 'Erro ao carregar os processos. Tente novamente mais tarde.';
      },
    });
  }

  atualizarDados(): void {
    if (!this.unidade_compra) {
      this.erro = 'unidade_compra não encontrada.';
      return;
    }
  
    this.isLoading = true; // Ativa o estado de carregamento
  
    this.ComprasnetContratosService.atualizarContratos().subscribe({
      next: () => {
        console.log('Dados atualizados com sucesso.');
        this.carregarContratos(); // Recarrega os dados após a atualização
      },
      error: (err) => {
        console.error('Erro ao atualizar:', err.message);
        this.erro = 'Erro ao atualizar os dados. Tente novamente mais tarde.';
      },
      complete: () => {
        this.isLoading = false; // Desativa o estado de carregamento
      },
    });
  }
  

  
  carregarContratos(): void {
    if (!this.unidade_compra) {
      this.erro = 'unidade_compra não encontrada.';
      return;
    }
  
    this.isLoading = true;
    this.mensagemLoading = 'Carregando contratos...';
  
    this.ComprasnetContratosService.getContratosByunidade_compra(this.unidade_compra).subscribe({
      next: (data) => {
        this.mensagemLoading = 'Contratos carregados com sucesso.';
        this.processarDados(data); // Processa os dados
      },
      error: (err) => {
        this.erro = 'Erro ao carregar os contratos. Tente novamente mais tarde.';
        console.error('Erro ao carregar contratos:', err);
        this.mensagemLoading = 'Erro ao carregar contratos.';
      },
      complete: () => {
        this.isLoading = false;
        this.mensagemLoading = ''; // Limpa a mensagem
      },
    });
  }
  
  processarDados(data: any[]): void {
    const hoje = new Date();
  
    this.dadosOriginais = data.map((linha) => {
      const vigenciaFim = linha.vigencia_fim ? new Date(linha.vigencia_fim) : null;
      const dias = vigenciaFim
        ? Math.ceil((vigenciaFim.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
        : null;
  
      const valorGlobal = linha.valor_global
        ? parseFloat(linha.valor_global)
        : 0;
  
      return {
        ...linha,
        dias,
        valor_global: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valorGlobal),
        vigencia_fim: vigenciaFim ? vigenciaFim.toLocaleDateString('pt-BR') : null,
      };
    });
  
    // Ordena os dados pela coluna "dias" do maior para o menor
    this.dadosOriginais.sort((a, b) => (b.dias || 0) - (a.dias || 0));
  
    // Atualiza os dados filtrados para exibição inicial
    this.dadosFiltrados = [...this.dadosOriginais];
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
      this.dadosFiltrados = [...this.dadosOriginais];
      return;
    }
  
    // Normaliza o filtro para buscar de forma insensível a maiúsculas e minúsculas
    const filtroNormalizado = filtro.toLowerCase();
  
    // Filtra os dados originais, verificando todas as colunas (visíveis e invisíveis)
    this.dadosFiltrados = this.dadosOriginais.filter((linha) =>
      Object.entries(linha).some(([chave, valor]) =>
        valor?.toString().toLowerCase().includes(filtroNormalizado)
      )
    );
  }
  
  getDiasClass(dias: number): string {
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
    } else if (coluna === 'processo') { // "NUP" não quebra linha
      return 'nup-nowrap';
    } else if (coluna === 'valor_global') {
      return 'valor-global-right';
    }
    return '';
  }
  
}