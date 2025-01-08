import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule]
})
export class AddItemModalComponent {
  itemData: any = {
    id_processo: '',
    material_servico: '',
    nup: '',
    objeto: '',
    unidade_compra: '',
    valor_total: null,
    etapa: 'Planejamento', // Valor fixo
    situacao: 'Planejamento', // Valor fixo
  };

  nupPattern = '^\\d{6}\\.\\d{6}/\\d{4}-\\d{2}$'; // Regex para NUP

  hasInteractedWithNup: boolean = false;

  errorMessages: any = {
    material_servico: '',
    nup: '',
    unidade_compra: '',
    valor_total: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  isFormValid(): boolean {
    return (
      this.itemData.id_processo &&
      this.itemData.material_servico &&
      new RegExp(this.nupPattern).test(this.formatNup(this.itemData.nup)) &&
      /^\d{6}$/.test(this.itemData.unidade_compra) &&
      this.itemData.valor_total > 0
    );
  }



  isValidNup(): boolean {
    const nupPattern = /^\d{6}\.\d{6}\/\d{4}-\d{2}$/;
    return nupPattern.test(this.formatNup(this.itemData.nup));
  }
  
  isValidunidade_compra(): boolean {
    return /^\d{6}$/.test(this.itemData.unidade_compra);
  }
  
  isValidValorTotal(): boolean {
    return this.itemData.valor_total !== null && this.itemData.valor_total > 0;
  }
  
  validateFields(): boolean {
    return this.isValidNup() && this.isValidunidade_compra() && this.isValidValorTotal();
  }
  
  onNupChange(): void {
    this.itemData.nup = this.formatNup(this.itemData.nup);
  }
  
  showErrorNup(): boolean {
    const cleanNup = this.itemData.nup.replace(/\D/g, '');
    return this.hasInteractedWithNup && cleanNup.length !== 20;
  }
  formatNup(nup: string): string {
    const cleanNup = nup.replace(/\D/g, '');
    if (cleanNup.length >= 18) {
      return `${cleanNup.slice(0, 6)}.${cleanNup.slice(6, 12)}/${cleanNup.slice(12, 16)}-${cleanNup.slice(16, 18)}`;
    }
    throw new Error('O NUP deve conter pelo menos 18 caracteres numéricos.');
  }
  
  
  save(): void {
    if (!this.isFormValid()) {
      this.snackBar.open('Erro: Preencha todos os campos corretamente!', 'Fechar', {
        duration: 3000,
        panelClass: ['snack-bar-error'],
      });
      return;
    }

    // Formatar NUP antes de salvar
    this.itemData.nup = this.formatNup(this.itemData.nup);

    this.dialogRef.close(this.itemData); // Retorna os dados para o componente pai
  }


  cancel(): void {
    this.dialogRef.close(null); // Cancela e fecha o modal
  }
}