### vue中的自定义属性并获得属性的值

例如： `data-radius` data-属性

vue:

```
<div @mouseover='changeRadius($event)' @mouseout='changeRadius(false)' @click='setlocation($event)'>
          <div data-radius='100'>100m</div>
          <div data-radius='300'>300m</div>
          <div data-radius='500'>500m</div>
          <div data-radius='1000'>1000m</div>
</div>
```

获取属性的值：`ev.target.dataset.radius` methods:

```
setlocation:function(ev){
    this.dispradius = ev.target.dataset.radius + '米'
}
```

