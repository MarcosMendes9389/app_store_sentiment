import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { GeneralService } from '../../../@core/services/general.service';
import { Application } from '../../../@core/models/application';

@Component({
  selector: 'ass-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent {

  //application
  applications: Application[] = [];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true

    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true

    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      store: {
        title: 'Loja',
        type: 'string',
      },
      name: {
        title: 'Nome',
        type: 'string', 
      },
      id: {
        title: 'App ID',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private servicegeneral : GeneralService,) { }

  ngOnInit() {

    this.servicegeneral.listApps().subscribe(result => {
      this.applications = result;  
      this.source.load(this.applications);

    });

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      console.log(event.data._id)
      this.servicegeneral.delete(event.data._id).subscribe(()=>{
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (window.confirm('Tem certeza que deseja editar?')) {
      this.servicegeneral.update(event.newData).subscribe(()=>{
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Tem certeza que deseja salvar?')) {
      this.servicegeneral.save(event.newData).subscribe(()=>{
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

}
