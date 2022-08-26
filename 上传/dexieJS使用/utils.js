class aa{
  constructor(table) { 
    this.db = R.db
     if (!this.db[table]){
      throw new Error('表不存在，请先添加表');
    }
    this.table = this.db.table(table)
  }
  filterDataByTableField(){
     var V = {}
     this['tableField']['forEach'](function(W) {
                U['hasOwnProperty'](W) && '' !== U[W] && (V[W] = !isNaN(U[W]) && U[W] ? parseFloat(U[W]) : U[W]);
            }),
        return V;
  }
}