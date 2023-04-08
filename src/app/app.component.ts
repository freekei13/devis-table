import { Component } from '@angular/core';
import { MAINROW, TOTALS } from './db';
import { MainRow, SubRow, Row } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  datasource = MAINROW;
  totals = TOTALS;
  isPressed:boolean; 
  addPressed:boolean;
  isEmpty:boolean = true;
  
  isPress() {
    this.isPressed = true;
  }

// ------------------------------------------------------------------------------------------------------------------------------//

  addMain() {
    let mainname = new MainRow();
    mainname.name;
    mainname.id = this.datasource.length;
    mainname.total = 0;
    mainname.isMainPress = true;
    this.addPressed = true;
    this.datasource.push(mainname);
    if(this.datasource.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }
  
  mainConf() {
    if(!this.datasource[this.datasource.length - 1].name) {
      alert('Entrer un nom !');
    } else {
      this.datasource[this.datasource.length - 1].isMainPress = false;
      this.isPressed = false;
      this.addPressed = false;
    }
  }

  mainCanc() {
    this.datasource[this.datasource.length - 1].isMainPress = false;
    this.isPressed = false;
    this.addPressed = false;
    this.datasource.pop();
    if(this.datasource.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  mainRemove(id:number) {
    this.datasource.splice(id, 1)
    if(this.datasource.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }
// ------------------------------------------------------------------------------------//

  subOrRow(id:number) {
    this.addPressed = true;
    this.datasource[id].rowChoice = true;
  }

  addRowSub(id:number) {
    let rowname = new SubRow();
    if(!this.datasource[id].sub) {
      this.datasource[id].sub = [];
    }
    this.datasource[id].rowChoice = false;
    this.addPressed = true;
    rowname.isRow = true;
    rowname.isSubPress = true;
    rowname.id = this.datasource[id].sub.length;
    rowname.name;
    rowname.quantity = 0;
    rowname.unity;
    rowname.pu = 0;
    rowname.total = this.rowSum(rowname);
    this.datasource[id].sub.push(rowname);
  }

//--------------------------------------------------------------------------------------------------//

  addSub(id:number) {
    let subname = new SubRow();
    let datasub = this.datasource[id];
    if(!datasub.sub) {
      datasub.sub = [];
    }
    this.datasource[id].rowChoice = false;
    this.addPressed = true;
    subname.isSubPress = true;
    subname.id = this.datasource[id].sub.length;
    subname.name;
    subname.total = 0;
    this.datasource[id].sub.push(subname);
  }
  
  subConf(id:number) {
    let datasub = this.datasource[id];
    if(!datasub.sub[datasub.sub.length - 1].name) {
      alert('Entrer un nom !');
    } else {
      datasub.sub[datasub.sub.length - 1].isSubPress = false;
      this.isPressed = false;
      this.addPressed = false;
    }
  }

  subCanc(id:number) {
    let datasub = this.datasource[id];
    datasub.sub[datasub.sub.length - 1].isSubPress = false;
    this.isPressed = false;
    this.addPressed = false;
    datasub.sub.pop();
  }

  subRemove(id:number, id2:number) {
    this.datasource[id].sub.splice(id2, 1)
  }

  addRow(id:number, id2:number) {
    let rowname = new Row();
    let datasub = this.datasource[id].sub;
    let datarow = datasub[id2].sub;
    if(!datarow) {
      datasub[id2].sub = [];
    }
    this.addPressed = true;
    rowname.isRowPress = true;
    rowname.id = datasub[id2].sub.length;
    rowname.name;
    rowname.quantity = 0;
    rowname.unity;
    rowname.pu = 0;
    rowname.total = this.rowSum(rowname);
    datasub[id2].sub.push(rowname);
  }
  
  rowConf(id:number, id2:number) {
    let datasub = this.datasource[id].sub;
    if(!datasub[id2].sub[datasub[id2].sub.length - 1].name) {
      alert('Entrer un nom !');
    } else {
      datasub[id2].sub[datasub[id2].sub.length - 1].isRowPress = false;
      this.isPressed = false;
      this.addPressed = false;
    }
  }

  rowCanc(id:number, id2:number) {
    let datasub = this.datasource[id].sub;
    datasub[id2].sub[datasub[id2].sub.length - 1].isRowPress = false;
    this.isPressed = false;
    this.addPressed = false;
    datasub[id2].sub.pop();
  }

  rowRemove(id:number, id2:number, id3:number) {
    this.datasource[id].sub[id2].sub.splice(id3, 1)
  }

  rowSum (row:any) {
    if(!row) {
      row.total = 0;
      return row.total;
    } else {
      row.total = row.quantity * row.pu;
      return row.total;
    }
  }  

  subSum(rows:any ,ss:any) {
    rows.total = 0;
    if(ss.length>0) {
      for(let j=0; j<ss.length; j++) {
          rows.total += ss[j].total;
      } 
    } else {
      rows.total = 0;
    }
  } 

  mainSum(mainrows:any) {
    mainrows.total = 0;
    if(mainrows.sub.length>0) {
      for(let j=0; j<mainrows.sub.length; j++) {
          mainrows.total += mainrows.sub[j].total;
      } 
    } else {
      mainrows.total = 0;
    }
  }
  
  allSum() {
    let l = this.datasource.length;
    let t = this.totals.length -1;
    this.totals[t].brutTotal = 0;
    if(l>0) {
      for(let j=0; j<l; j++) {
        this.totals[t].brutTotal += this.datasource[j].total;
        this.totals[t].tvaMontant = Number((this.totals[t].brutTotal * this.totals[t].tva / 100).toFixed(3));
        this.totals[t].netTotal = (Math.ceil((this.totals[t].brutTotal + this.totals[t].tvaMontant) * 10) / 10).toFixed(2);
      } 
    } else {
        this.totals[t].brutTotal = 0;
    }
  }
}
